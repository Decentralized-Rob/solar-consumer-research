"""Download only original PDFs linked in a public Bellingham PermitEyes record."""
import asyncio,json,hashlib,re
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright
BASE="https://permiteyes.us/bellingham/publicview.php"
OUT=Path("permiteyes_original_pdf_test");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  await page.goto(BASE,wait_until="domcontentloaded",timeout=45000)
  await page.wait_for_timeout(1900)
  search=page.locator('input[type="search"][aria-controls="BuildingPublicHome"]')
  await search.fill("46 Pickering")
  await search.press("Enter")
  await page.wait_for_timeout(1600)
  trs=page.locator("#BuildingPublicHome tbody tr")
  ix=None
  for i in range(await trs.count()):
   txt=await trs.nth(i).inner_text()
   if "Luiz Espigar" in txt:ix=i;break
  if ix is None:raise RuntimeError("Luiz Espigar roof record missing at 46 Pickering")
  tr=trs.nth(ix)
  print("TARGET_RECORD",re.sub(r"\s+"," ",await tr.inner_text()),flush=True)
  await tr.locator("a.Attachmentclass").click()
  await page.wait_for_timeout(1300)
  links=await page.locator("#AttachmentModal a.downloadLink[data-href]").evaluate_all("(es)=>es.map(e=>({name:e.getAttribute('data-download'),path:e.getAttribute('data-href')}))")
  docs=list({d["path"]:d for d in links}.values())
  print("ORIGINAL_ATTACHMENT_COUNT",len(docs),flush=True)
  manifest=[]
  for index,doc in enumerate(docs):
   path=doc["path"]
   url=urljoin("https://permiteyes.us/",path)
   try:
    res=await ctx.request.get(url,timeout=28000)
    data=await res.body()
    pdf=data.startswith(b"%PDF")
    headers=dict(res.headers)
    print("GET",index,res.status,len(data),headers.get("content-type"),"PDF_MAGIC",pdf,"NAME",doc["name"],"URL",url,flush=True)
    if res.ok and pdf:
     dst=OUT/(f"{index+1:02d}_"+re.sub(r"[^A-Za-z0-9_. -]","_",doc["name"]))
     dst.write_bytes(data)
     manifest.append({"file":dst.name,"bytes":len(data),"sha256":hashlib.sha256(data).hexdigest(),"original_url":url})
    else:manifest.append({"name":doc["name"],"status":res.status,"bytes":len(data),"header":data[:32].hex(),"original_url":url})
   except Exception as ex:
    print("DOWNLOAD_ERROR",doc["name"],repr(ex)[:400],flush=True)
    manifest.append({"name":doc["name"],"error":repr(ex)})
  (OUT/"manifest.json").write_text(json.dumps(manifest,ensure_ascii=False,indent=2))
  print("DONE_PDFS",sum(1 for d in manifest if "sha256" in d),"TOTAL",len(docs),flush=True)
  await browser.close()
asyncio.run(main())
