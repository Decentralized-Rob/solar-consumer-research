"""One verified address only: 169 Katherine Road, Centerville.
Find public Laserfiche original municipal records (not monthly report) and
download ONLY files that plausibly contain 2025 permits.
"""
import asyncio, json, re, hashlib
from pathlib import Path
from playwright.async_api import async_playwright

OUT=Path("barnstable_169_katherine_originals")
OUT.mkdir(exist_ok=True)
BASE="https://laserweb.town.barnstable.ma.us/WebLink/"
PARAMS="dbid=0&repo=TownOfBarnstable"
TARGET={"address":"169 KATHERINE ROAD, CENTERVILLE, MA 02632",
"roof":"EXPR-25-1450","roof_date":"2025-12-09",
"sunrun":"BLDR-25-1504","solar_date":"2025-12-15"}
R={"target":TARGET,"navigation":[],"documents":[],"downloaded":[],"errors":[]}
async def visit(page,url,stage):
    response=await page.goto(url,wait_until="domcontentloaded",timeout=36000)
    await page.wait_for_timeout(3200)
    links=await page.locator("a[href]").evaluate_all("(es)=>es.map(e=>({text:(e.innerText||'').trim(),href:e.href})).filter(x=>x.href.startsWith('http'))")
    body=(await page.locator("body").inner_text())[:8000]
    R["navigation"].append({"stage":stage,"url":page.url,"status":response.status if response else None,"text":body[:1800],"links":links[:90]})
    print("VISIT",stage,"HTTP",response.status if response else None,"URL",page.url,"BODY",repr(body[:1200]),flush=True)
    return links,body

async def choose(page,links,name,stage):
    matches=[v for v in links if v["text"].strip().upper()==name.upper() and "/Browse.aspx?" in v["href"]]
    if not matches:
        matches=[v for v in links if name.upper() in v["text"].strip().upper() and "/Browse.aspx?" in v["href"]]
    print("FOLDER_SEARCH",stage,name,"MATCHES",json.dumps(matches[:12]),flush=True)
    if not matches:
        print("FOLDER_MISSING",stage,name,"AVAILABLE",json.dumps([x["text"] for x in links[:80]]),flush=True)
        return None
    return await visit(page,matches[0]["href"],stage)

async def inspect_original(page,doc):
    url=doc["href"]
    _,body=await visit(page,url,"document")
    date_hits=re.findall(r"(?:Modified|Created)\s+(\d{1,2}/\d{1,2}/\d{4})",body,re.I)
    doc["metadata_dates"]=date_hits
    doc["preview"]=body[:2200]
    eligible=any(int(x.rsplit("/",1)[1])>=2025 for x in date_hits)
    doc["eligible_for_2025"]=eligible
    print("DOCUMENT_META",doc["text"],"DATES",date_hits,"CANDIDATE",eligible,flush=True)
    if not eligible:
        print("SKIP_OLD_ARCHIVE",url,flush=True)
        return
    try:
        button=page.locator("#STR_DOWNLOAD_PDF")
        if await button.count()==0:
            print("NO_DOWNLOAD_PDF_BUTTON",url,flush=True)
            return
        await button.click(timeout=8000)
        await page.wait_for_timeout(800)
        accept=page.get_by_role("button",name="Download & Print")
        if await accept.count()==0: 
            print("NO_PRINT_CONFIRM_BUTTON",url,flush=True)
            return
        async with page.expect_download(timeout=45000) as item:
            await accept.first.click(timeout=8000)
        download=await item.value
        filename="original_"+re.sub(r"[^A-Za-z0-9._-]","_",download.suggested_filename)
        dest=OUT/filename
        await download.save_as(str(dest))
        b=dest.read_bytes()
        if not b.startswith(b"%PDF"):
            print("NON_PDF_DOWNLOAD",filename,len(b),flush=True)
            dest.unlink()
            return
        entry={"filename":filename,"source":url,"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest(),"metadata_dates":date_hits}
        R["downloaded"].append(entry)
        print("VERIFIED_ORIGINAL_PDF",json.dumps(entry),flush=True)
    except Exception as exc:
        R["errors"].append("download "+repr(exc)[:500])
        print("PDF_EXPORT_ERROR",repr(exc)[:500],flush=True)

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        context=await browser.new_context(accept_downloads=True)
        page=await context.new_page()
        try:
            links,_=await visit(page,BASE+"Browse.aspx?id=652286&"+PARAMS,"Building Division")
            for name,tag in [("CENTERVILLE","village"),("K","letter"),("KATHERINE ROAD","street"),("0169 KATHERINE ROAD","property")]:
                result=await choose(page,links,name,tag)
                if result is None:break
                links,_=result
            else:
                docs=[x for x in links if "/DocView.aspx?" in x["href"]]
                print("PROPERTY_DOCS",json.dumps(docs),flush=True)
                R["documents"]=docs
                for doc in docs[:8]:
                    await inspect_original(page,doc)
        except Exception as exc:
            R["errors"].append("navigation "+repr(exc)[:500])
            print("NAVIGATION_ERROR",repr(exc)[:500],flush=True)
        (OUT/"00_ORIGINAL_FILE_MANIFEST.json").write_text(json.dumps(R,ensure_ascii=False,indent=2))
        print("SUMMARY",len(R["documents"]),"candidate_documents",sum(x.get("eligible_for_2025",False) for x in R["documents"]),"verified_pdfs",len(R["downloaded"]),flush=True)
        await browser.close()
asyncio.run(main())
