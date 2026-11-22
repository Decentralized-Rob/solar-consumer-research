"""One new MA PermitEyes case: earlier roof permit, later Sunrun solar permit.
Output requires a real downloadable original PDF attachment for BOTH permits.
Public PermitEyes records only; no login, guessed download urls, or access bypass.
"""
import asyncio, hashlib, json, re
from pathlib import Path
from datetime import datetime
from playwright.async_api import async_playwright

OUT=Path("one_case_original_permit_pdfs")
OUT.mkdir(exist_ok=True)
MUNICIPALITY="milton"
URL="https://permiteyes.us/milton/publicview.php"
RESULT={"municipality":MUNICIPALITY,"source":URL,"paired":None,"downloaded":[],"probes":[],"errors":[]}
def parsedate(raw):
    for pattern in [r"\d{1,2}/\d{1,2}/\d{4}",r"\d{1,2}/\d{1,2}/\d{2}(?!\d)",r"\d{4}-\d{2}-\d{2}"]:
        found=re.search(pattern, raw or "")
        if found:
            try:return datetime.strptime(found.group(), ("%m/%d/%Y" if len(found.group().split("/")[-1])==4 else "%m/%d/%y") if "/" in found.group() else "%Y-%m-%d")
            except:pass
    return None
def norm(addr):
    addr=(addr or "").upper()
    addr=re.sub(r"[^A-Z0-9]+","",addr)
    for old,new in [("STREET","ST"),("ROAD","RD"),("AVENUE","AVE"),("DRIVE","DR"),("LANE","LN")]:
        addr=addr.replace(old,new)
    return addr
def rowdata(c):
    if len(c)<12:return None
    offset=1 if len(c)>=14 else 0
    return {"application":c[3].strip(),"application_date":c[4].strip(),
            "issued_date":c[5].strip(),"address":c[6].strip(),
            "applicant":c[7].strip(),"work":c[8+offset].strip(),
            "type":c[9+offset].strip(),"permit":c[10+offset].strip(),"status":c[11+offset].strip()}
def roof(rec):
    txt=rec["type"]+" "+rec["work"]
    return bool(re.search(r"roof|reroof|re-roof|shingl",txt,re.I)) and not bool(re.search(r"solar|photovoltaic|PV panel",txt,re.I))
def sunrun(rec):
    return bool(re.search(r"sun\s*run|stephen\s+kelly",rec["applicant"],re.I)) and bool(re.search(r"solar|panel|photovoltaic",rec["work"],re.I))
async def waitdraw(page):
    await page.wait_for_timeout(900)
async def setsearch(page,term):
    await page.evaluate("""v => {
      let t=window.__tbl;
      if(!t)throw Error('no initialized PermitEyes Building table');
      t.search(v).draw();
    }""", term)
    await waitdraw(page)
async def pagesnapshot(page):
    return await page.evaluate("""() => {
        let t=window.__tbl;
        let info=t.page.info();
        return {info:info,cols:[...t.settings()[0].nTable.querySelectorAll("thead th")].map(x=>x.innerText),
          rows:[...t.settings()[0].nTable.querySelectorAll("tbody tr")].map(tr=>[...tr.querySelectorAll('td')].map(td=>td.innerText))};
    }""")
async def collect(page,limit_pages=10):
    snap=await pagesnapshot(page)
    print("TABLE_PAGEINFO",json.dumps(snap["info"]),"COLS",snap["cols"],flush=True)
    records=[]
    maxpages=min((snap["info"] or {}).get("pages",1),limit_pages)
    for i in range(maxpages):
        if i>0:
            await page.evaluate("(i)=>window.__tbl.page(i).draw('page')",i)
            await waitdraw(page)
            snap=await pagesnapshot(page)
        for c in snap["rows"]:
            record=rowdata(c)
            if record:records.append(record)
    return records
async def extract_attachments(page,rec,kind):
    # Search by application number, not owner name
    aid=rec["application"]
    await setsearch(page,aid)
    rows=page.locator("#PublicHome tbody tr")
    count=await rows.count()
    located=None
    for n in range(min(count,15)):
        cells=await rows.nth(n).locator("td").all_inner_texts()
        if len(cells)>11 and cells[3].strip()==aid and norm(cells[6])==norm(rec["address"]):
            located=rows.nth(n)
            break
    if located is None:
        print("APPLICATION_NOT_LOCATED",aid,flush=True)
        return []
    anchor=located.locator("a.Attachmentclass")
    if await anchor.count()==0:
        print("NO_PUBLIC_ATTACHMENTS",aid,kind,flush=True)
        return []
    await anchor.first.click(timeout=11000)
    await page.wait_for_timeout(1000)
    all_links=await page.locator('#AttachmentModal a.downloadLink[data-href]').evaluate_all("""(es)=>es.map(e=>({name:e.dataset.download||e.innerText,path:e.dataset.href}))""")
    unique=list({v["path"]:v for v in all_links if v.get("path")}.values())
    print("ATTACHMENT_LIST",aid,kind,json.dumps(unique,ensure_ascii=False)[:13000],flush=True)
    files=[]
    for i,file in enumerate(unique):
        if not re.search(r"\.pdf$",file["name"],re.I):continue
        link=page.locator('#AttachmentModal a.downloadLink[data-href]').filter(has_text=file["name"]).first
        if await link.count()==0:
            link=page.locator('#AttachmentModal a.downloadLink[data-href]').nth(i)
        safe=re.sub(r"[^A-Za-z0-9_.-]+","_",file["name"])
        dest=OUT/f"{kind}_{aid}_{safe}"
        try:
            async with page.expect_download(timeout=30000) as dl:
                await link.click(timeout=11000)
            download=await dl.value
            await download.save_as(dest)
            data=dest.read_bytes()
            if not data.startswith(b"%PDF"):
                print("NOT_ACTUAL_PDF",kind,aid,file["name"],len(data),flush=True)
                dest.unlink()
                continue
            entry={"permit":rec["permit"],"application":aid,"type":kind,"original_name":file["name"],
                   "saved":dest.name,"sha256":hashlib.sha256(data).hexdigest(),"bytes":len(data),
                   "public_attachment_ref":file["path"]}
            print("VERIFIED_PDF",json.dumps(entry),flush=True)
            files.append(entry)
            if len(files)>=8:break
        except Exception as ex:
            print("DOWNLOAD_FAILURE",kind,aid,file["name"],str(ex)[:200],flush=True)
    try:await page.locator("#AttachmentModal button.close").first.click(timeout=3000)
    except:pass
    return files

async def main():
    async with async_playwright() as pw:
        browser=await pw.chromium.launch(headless=True)
        ctx=await browser.new_context(accept_downloads=True,viewport={"width":1400,"height":900})
        page=await ctx.new_page()
        try:
            resp=await page.goto(URL,wait_until="domcontentloaded",timeout=55000)
            await page.wait_for_timeout(3500)
            print("PORTAL",page.url,resp.status if resp else "",(await page.locator("body").inner_text())[:800],flush=True)
            print("DIAGNOSTIC_TABLES",await page.locator("table").evaluate_all("(es)=>es.map(e=>({id:e.id,thead:(e.querySelector('thead')?.innerText||'').slice(0,300),visible:!!e.getClientRects().length,cls:e.className}))"),flush=True)
            await page.wait_for_function("""() => {
               if(!window.jQuery || !jQuery.fn.DataTable)return false;
               return [...document.querySelectorAll('table')].some(t => jQuery.fn.DataTable.isDataTable(t) && /Site Address/i.test(t.querySelector('thead')?.innerText || ''));
            }""",timeout=25000)
            await page.evaluate("""() => {
              let t=document.querySelector('#PublicHome');
              if(!t)throw Error('No PermitEyes public table');
              window.__tbl=jQuery(t).DataTable();
              console.log('DATA_TABLE_INFO',window.__tbl.page.info(),window.__tbl.settings().length);
            }""")
            print("TABLE_INIT_DIAGNOSTIC",await page.evaluate("""() => ({
              nodeRows:document.querySelector('#PublicHome')?.querySelectorAll('tbody tr').length,
              tableIds:[...document.querySelectorAll('table')].map(t=>t.id),
              jqDataTables:typeof jQuery?.fn?.DataTable,
              settingsSize:window.__tbl?.settings()?.length,
              pageInfo:window.__tbl?.page?.info?.(),
              firstRows:[...document.querySelectorAll('#PublicHome tbody tr')].slice(0,2).map(tr=>tr.innerText.slice(0,300))
            })"""),flush=True)
            await setsearch(page,"Sunrun")
            print("POST_SEARCH_TABLE",await page.evaluate("""() => ({
              ids:[...document.querySelectorAll('table')].map(t=>t.id),
              dataTablePresent:!!window.__tbl?.settings()?.[0]?.nTable,
              body:(document.body.innerText||'').slice(0,500)
            })"""),flush=True)
            solar_candidates=await collect(page,limit_pages=12)
            solar_candidates=[x for x in solar_candidates if sunrun(x)]
            print("SUNRUN_CANDIDATES",len(solar_candidates),json.dumps(solar_candidates[:8]),flush=True)
            seen_addresses=set()
            for solar in solar_candidates:
                address=solar["address"]
                if not address or norm(address) in seen_addresses:continue
                seen_addresses.add(norm(address))
                await setsearch(page,address)
                at_address=await collect(page,limit_pages=2)
                at_address=[x for x in at_address if norm(x["address"])==norm(address)]
                solar_date=parsedate(solar["issued_date"]) or parsedate(solar["application_date"])
                prev_roofs=[]
                for r in at_address:
                    rdate=parsedate(r["issued_date"]) or parsedate(r["application_date"])
                    if roof(r) and solar_date and rdate and rdate<solar_date:prev_roofs.append(r)
                print("ADDRESS_CHECK",address,"RECORDS",len(at_address),"EARLIER_ROOF",len(prev_roofs),flush=True)
                if not prev_roofs:continue
                for r in prev_roofs:
                    print("PERMIT_SEQUENCE",json.dumps({"roof":r,"solar":solar}),flush=True)
                    roof_files=await extract_attachments(page,r,"ROOF")
                    solar_files=await extract_attachments(page,solar,"SUNRUN")
                    if roof_files and solar_files:
                        RESULT["paired"]={"address":address,"roof":r,"solar":solar}
                        RESULT["downloaded"]=roof_files+solar_files
                        print("ONE_COMPLETE_CASE",json.dumps(RESULT["paired"]),flush=True)
                        break
                    RESULT["probes"].append({"address":address,"roof_application":r["application"],"solar_application":solar["application"],"roof_pdf_count":len(roof_files),"sunrun_pdf_count":len(solar_files)})
                    for f in roof_files+solar_files:
                        try:(OUT/f["saved"]).unlink()
                        except:pass
                if RESULT["paired"]:break
                if len(RESULT["probes"])>=5:break
            print("RUN_COMPLETE",bool(RESULT["paired"]),"total_sunrun_candidates",len(solar_candidates),"candidate_roof_pairs",len(RESULT["probes"])+(1 if RESULT["paired"] else 0),flush=True)
        except Exception as ex:
            RESULT["errors"].append(repr(ex)[:1000])
            print("PORTAL_ERROR",repr(ex),flush=True)
        (OUT/"00_RESULT.json").write_text(json.dumps(RESULT,ensure_ascii=False,indent=2))
        await browser.close()
asyncio.run(main())
