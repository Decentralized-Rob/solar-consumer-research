"""Preserve public original attachment PDFs for matched Bellingham Giga/Sunrun 46 Pickering Avenue permits."""
import asyncio,re,json,hashlib
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://permiteyes.us/bellingham/publicview.php"
ROOT=Path("bellingham_46_pickering_packet")
ROOT.mkdir(exist_ok=True)
MANIFEST=[]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  popups=[]
  page.on("popup",lambda w:popups.append(w))
  await page.goto(BASE,wait_until="domcontentloaded",timeout=45000)
  await page.wait_for_timeout(2200)
  search=page.locator('input[type="search"][aria-controls="BuildingPublicHome"]')
  await search.fill("46 Pickering");await search.press("Enter")
  await page.wait_for_timeout(1500)
  rows=page.locator("#BuildingPublicHome tbody tr")
  count=await rows.count()
  print("PROPERTY_ROWS",count,flush=True)
  records=[]
  for i in range(count):
   row=rows.nth(i)
   cells=await row.locator("td").all_inner_texts()
   if len(cells)<13:continue
   applicant=cells[7].strip();address=cells[6].strip()
   if not (re.search("Espigar|Sunrun",applicant,re.I) and "Pickering" in address):continue
   data={"application":cells[3].strip(),"application_date":cells[4].strip(),"issue_date":cells[5].strip(),"address":address,"applicant":applicant,"scope":cells[8].strip(),"type":cells[9].strip(),"permit":cells[10].strip(),"status":cells[11].strip()}
   records.append(data)
  print("MATCHED_RECORDS",json.dumps(records,ensure_ascii=False),flush=True)
  for i,rec in enumerate(records):
   recid=rec["application"]
   row=rows.filter(has=page.locator(f'td:nth-child(4) span[data-id="{recid}"]')).first
   if await row.count()==0:
    row=rows.filter(has_text=recid).first
   attach=row.locator("a.Attachmentclass")
   if not await attach.count():
    print("NO_ATTACHMENTS",recid,flush=True);continue
   print("OPEN",recid,"FOUND",await attach.count(),flush=True)
   await attach.first.click(timeout=8000)
   await page.wait_for_timeout(600)
   all_links=await page.locator('#AttachmentModal a.downloadLink[data-href]').evaluate_all("(es)=>es.map(e=>({name:e.dataset.download,path:e.dataset.href}))")
   unique=list({a["path"]:a for a in all_links}.values())
   print("FILE_LIST",recid,json.dumps(unique,ensure_ascii=False)[:8000],flush=True)
   folder=ROOT/(f"{i+1:02d}_{rec['type']}_{recid}_{rec['applicant'].split()[0]}")
   folder.mkdir(exist_ok=True)
   for j,doc in enumerate(unique):
    full=folder/(f"{j+1:02d}_"+re.sub(r'[^A-Za-z0-9._ -]',"_",doc["name"]).strip())
    q=page.locator("#AttachmentModal a.downloadLink[data-href]").filter(has_text=doc["name"]).last
    if not await q.count():
     q=page.locator('#AttachmentModal a.downloadLink[data-href]').filter(has_text=re.compile(re.escape(doc["name"].split(".")[0]),re.I)).last
    try:
     async with page.expect_download(timeout=35000) as di:
      await q.click(timeout=10000)
     d=await di.value
     await d.save_as(full)
     b=full.read_bytes()
     good=b.startswith(b"%PDF")
     if not good:full.unlink()
     ent={"application":recid,"permit":rec["permit"],"applicant":rec["applicant"],"filename":doc["name"],"saved":str(full) if good else None,"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest() if good else None,"pdf":good,"public_attachment_ref":doc["path"]}
     MANIFEST.append(ent)
     print("PDF",recid,j,good,len(b),doc["name"],flush=True)
    except Exception as ex:
     print("ERROR_FILE",recid,doc["name"],repr(ex)[:180],flush=True)
     MANIFEST.append({"application":recid,"filename":doc["name"],"error":str(ex)[:250]})
    for w in popups[:]:
     try:
      if not w.is_closed():await w.close()
     except:pass
     popups.remove(w)
   await page.locator("#AttachmentModal button.close").first.click(timeout=5000)
   await page.wait_for_timeout(350)
  (ROOT/"00_PERMIT_RECORDS.json").write_text(json.dumps(records,indent=2,ensure_ascii=False))
  (ROOT/"00_ORIGINAL_PDFS_MANIFEST.json").write_text(json.dumps(MANIFEST,indent=2,ensure_ascii=False))
  print("SUMMARY",len(records),len(MANIFEST),sum(1 for x in MANIFEST if x.get("pdf")),flush=True)
  await browser.close()
asyncio.run(main())
