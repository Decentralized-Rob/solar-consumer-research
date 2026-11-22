"""Trace official PermitEyes document preview and download interaction (46 Pickering)."""
import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
URL="https://permiteyes.us/bellingham/publicview.php"
OUT=Path("permiteyes_preview_download_test");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context(accept_downloads=True)
  pg=await ctx.new_page()
  reqs=[];responses=[];downloads=[];popups=[]
  def req(r):
   if any(x in r.url.lower() for x in ["attach","doc","download","mys3bucket","preview","view","s3"]):
    reqs.append({"method":r.method,"url":r.url,"data":(r.post_data or "")[:550]})
  def response(r):
   if any(x in r.url.lower() for x in ["attach","doc","download","mys3bucket","preview","view","s3"]):
    responses.append({"status":r.status,"url":r.url,"type":r.headers.get("content-type","")})
  pg.on("request",req);pg.on("response",response)
  pg.on("download",lambda d:downloads.append(d))
  pg.on("popup",lambda w:popups.append(w))
  await pg.goto(URL,wait_until="domcontentloaded",timeout=45000);await pg.wait_for_timeout(2000)
  inp=pg.locator('input[type="search"][aria-controls="BuildingPublicHome"]')
  await inp.fill("46 Pickering");await inp.press("Enter");await pg.wait_for_timeout(1300)
  row=pg.locator("#BuildingPublicHome tbody tr").filter(has_text="Luiz Espigar").first
  await row.locator("a.Attachmentclass").click();await pg.wait_for_timeout(950)
  target=pg.locator('#AttachmentModal a.downloadLink[data-download*="Roofing Contract"]').last
  print("TARGET",await target.count(),await target.evaluate("(e)=>e.outerHTML") if await target.count() else "",flush=True)
  print("INLINE_DOWNLOAD_JS",json.dumps(await pg.locator("script:not([src])").evaluate_all("(es)=>es.map(e=>e.textContent).filter(t=>t.includes('downloadLink')).map(t=>t.slice(Math.max(0,t.indexOf('downloadLink')-700),t.indexOf('downloadLink')+1800)).slice(0,7)"))[:15000],flush=True)
  before=len(reqs)
  try:
   await target.click(timeout=8000)
   await pg.wait_for_timeout(1800)
   print("AFTER_CLICK_PAGE",pg.url,"PREVIEW",await pg.locator("iframe,object,embed").evaluate_all("(es)=>es.map(e=>({tag:e.tagName,src:e.src,data:e.data,outer:e.outerHTML.slice(0,450)}))"),flush=True)
   print("VISIBLE_MODAL_IDS",await pg.locator(".modal:visible").evaluate_all("(es)=>es.map(e=>({id:e.id,text:e.innerText.slice(0,1200),html:e.outerHTML.slice(0,3000)}))"),flush=True)
   print("NEW_REQUESTS",json.dumps(reqs[before:])[:10000],flush=True)
   print("NEW_RESPONSES",json.dumps(responses[-25:])[:8000],flush=True)
   print("POPUPS",len(popups),"DOWNLOADS",len(downloads),flush=True)
   if popups:
    for w in popups:
     try:print("POPUP",w.url,(await w.content())[:2000],flush=True)
     except Exception as e:print("POPUP_ERR",repr(e),flush=True)
   prev=pg.locator("#prevdownload")
   print("PREVDOWNLOAD",await prev.evaluate("(e)=>e.outerHTML"),flush=True)
   if await prev.is_visible():
    before2=len(reqs)
    try:
     await prev.click(timeout=7000)
     await pg.wait_for_timeout(1500)
     print("DOWNLOAD_CLICK_REQUESTS",json.dumps(reqs[before2:])[:9000],"DOWNLOADS",len(downloads),"POPUPS",len(popups),flush=True)
    except Exception as ex:print("PREVDOWNLOAD_ERR",repr(ex),flush=True)
   for i,download in enumerate(downloads):
    try:
     dst=OUT/("download_"+str(i)+"_"+download.suggested_filename)
     await download.save_as(dst)
     print("SAVED",dst.as_posix(),dst.stat().st_size,flush=True)
    except Exception as ex:print("SAVERR",repr(ex),flush=True)
  except Exception as ex:print("ERROR_CLICK",repr(ex),flush=True)
  (OUT/"network.json").write_text(json.dumps({"requests":reqs,"responses":responses},indent=2))
  await b.close()
asyncio.run(main())
