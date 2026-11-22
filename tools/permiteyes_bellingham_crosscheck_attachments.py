"""Check Bellingham Espigar addresses against Sunrun and test public original attachment links."""
import asyncio,json,re,hashlib
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://permiteyes.us/bellingham/publicview.php"
OUT=Path("permiteyes_bellingham_originals");OUT.mkdir(exist_ok=True)
ADDRESSES=["103 Salisbury","10 Hilltop","37 Susan","46 Pickering"]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  requests=[]
  def onrequest(r):
   if "permiteyes.us/bellingham" in r.url and ("ajax/" in r.url or "controller/" in r.url):
    requests.append({"url":r.url,"method":r.method,"post":(r.post_data or "")[:1100]})
  page.on("request",onrequest)
  await page.goto(BASE,wait_until="domcontentloaded",timeout=45000)
  await page.wait_for_timeout(1900)
  search=page.locator('input[type="search"][aria-controls="BuildingPublicHome"]')
  findings=[]
  for addr in ADDRESSES:
   await search.fill(addr);await search.press("Enter");await page.wait_for_timeout(1300)
   rows=await page.locator("#BuildingPublicHome tbody tr").evaluate_all("(xs)=>xs.map(e=>({cells:[...e.querySelectorAll('td')].map(x=>x.innerText.trim()),html:e.outerHTML.slice(0,900)}))")
   info=(await page.locator("#BuildingPublicHome_info").all_inner_texts())
   print("ADDRESS",addr,"INFO",info,"ROWS",json.dumps([r["cells"] for r in rows],ensure_ascii=False)[:8000],flush=True)
   findings.append({"address":addr,"info":info,"rows":rows})
  (OUT/"address_crosscheck.json").write_text(json.dumps(findings,ensure_ascii=False,indent=2))
  await search.fill("Espigar");await search.press("Enter");await page.wait_for_timeout(1700)
  count=await page.locator("#BuildingPublicHome tbody tr a.Attachmentclass").count()
  print("ATTACHMENT_ICONS",count,flush=True)
  for i in range(min(count,4)):
   link=page.locator("#BuildingPublicHome tbody tr a.Attachmentclass").nth(i)
   attr=await link.evaluate("(e)=>({html:e.outerHTML,applicationId:e.getAttribute('data-application-id'),id:e.getAttribute('data-id')})")
   before=len(requests)
   print("OPEN_ATTACH",i,json.dumps(attr),flush=True)
   try:
    await link.click(timeout=8000)
    await page.wait_for_timeout(1300)
    vis=page.locator("#AttachmentModal")
    content=(await vis.inner_text())[:3000]
    html=(await vis.inner_html())[:10000]
    links=await vis.locator("a[href]").evaluate_all("(els)=>els.map(e=>({name:e.innerText.slice(0,90),href:e.href,outer:e.outerHTML.slice(0,430)})).slice(0,100)")
    print("MODAL_TEXT",i,repr(content),flush=True)
    print("MODAL_LINKS",i,json.dumps(links)[:8500],flush=True)
    print("MODAL_HTML",i,html[:9000],flush=True)
    print("NETWORK_NEW",i,json.dumps(requests[before:])[-5500:],flush=True)
    (OUT/f"attachment_modal_{attr['id']}.html").write_text(await vis.inner_html())
    (OUT/f"attachment_links_{attr['id']}.json").write_text(json.dumps(links,indent=2))
    await page.keyboard.press("Escape");await page.wait_for_timeout(250)
    if await page.locator("#AttachmentModal").is_visible():
     await page.locator("#AttachmentModal button.close").first.click(timeout=3000)
     await page.wait_for_timeout(250)
   except Exception as ex:print("ATTACH_ERROR",i,repr(ex),flush=True)
  await browser.close()
asyncio.run(main())
