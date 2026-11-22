"""Probe public Bellingham PermitEyes UI (no login, no bypass), discover search and document links."""
import asyncio,json,re
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://permiteyes.us/bellingham/publicview.php"
OUT=Path("permiteyes_bellingham_probe");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  capture=[]
  def req(r):
   if "permiteyes" in r.url.lower() and ("php" in r.url.lower() or "ajax" in r.url.lower()):
    try: capture.append({"method":r.method,"url":r.url,"data":(r.post_data or "")[:700]})
    except:pass
  page.on("request",req)
  try:
   resp=await page.goto(BASE,wait_until="domcontentloaded",timeout=45000)
   await page.wait_for_timeout(3500)
   print("ENTRY",resp.status if resp else None,page.url,"TITLE",await page.title(),flush=True)
   print("BODY_HEAD",(await page.locator("body").inner_text())[:4500],flush=True)
   print("FRAMES",json.dumps(await page.locator("iframe").evaluate_all("(es)=>es.map(e=>({src:e.src,id:e.id}))")),flush=True)
   print("FORMS",json.dumps(await page.locator("form").evaluate_all("(es)=>es.map(e=>({id:e.id,name:e.name,method:e.method,action:e.action,fields:[...e.querySelectorAll('input,button,select')].map(x=>({tag:x.tagName,name:x.name,id:x.id,type:x.type,value:x.value,title:x.title,placeholder:x.placeholder})).slice(0,45)}))"))[:11000],flush=True)
   print("INPUTS",json.dumps(await page.locator("input,select,button").evaluate_all("(es)=>es.map(e=>({tag:e.tagName,id:e.id,name:e.name,type:e.type,value:e.value,onclick:e.getAttribute('onclick'),outer:e.outerHTML.slice(0,200)})).slice(0,90)"))[:14000],flush=True)
   print("LINKS",json.dumps(await page.locator("a[href]").evaluate_all("(es)=>es.map(e=>({text:e.innerText.trim().slice(0,70),href:e.href})).slice(0,75)"))[:9500],flush=True)
   print("TABLES",json.dumps(await page.locator("table").evaluate_all("(es)=>es.map(e=>({id:e.id,cls:e.className,rowCount:e.rows.length,head:e.innerText.slice(0,400)})).slice(0,12)")),flush=True)
   print("SCRIPTS",json.dumps(await page.locator("script[src]").evaluate_all("(es)=>es.map(e=>e.src).slice(0,40)")),flush=True)
   print("REQUESTS",json.dumps(capture[-35:])[:9000],flush=True)
   (OUT/"entry_html.html").write_text(await page.content())
   for phrase in ["Giga","Sunrun"]:
    search=page.locator('input[type="search"]')
    print("SEARCH_INPUT_COUNT",phrase,await search.count(),flush=True)
   print("DONE",flush=True)
  except Exception as e:
   print("ERROR",repr(e),flush=True)
  await browser.close()
asyncio.run(main())
