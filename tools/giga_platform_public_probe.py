"""Public-only probe of municipalities with independently confirmed Giga roof permits."""
import asyncio,json,re
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path("giga_portal_public_probe")
OUT.mkdir(exist_ok=True)
TARGETS=[
 ("barnstable_opengov","https://barnstablema.viewpointcloud.com/","45 Tevyaw Road","EXPR-25-4"),
 ("sudbury_opengov","https://sudburyma.viewpointcloud.com/","54 Rambling Road","B-25-861"),
 ("east_bridgewater_smartgov","https://twn-eastbridgewater-ma.smartgovcommunity.com/Public/Home","130 Eliab Latham Way","BPA-25-234"),
]
async def run():
 entries=[]
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(accept_downloads=True,viewport={"width":1300,"height":900})
  for name,url,addr,permit in TARGETS:
   page=await context.new_page()
   reqs=[]; pdfs=[]
   def response_handler(r):
    if r.request.resource_type in ("xhr","fetch","document"):
     reqs.append({"status":r.status,"resource":r.request.resource_type,"url":r.url[:300],"content_type":r.headers.get("content-type","")})
    if "application/pdf" in r.headers.get("content-type",""):
     pdfs.append(r.url)
   page.on("response",response_handler)
   entry={"municipality_portal":name,"url":url,"target_address":addr,"known_permit":permit}
   try:
    resp=await page.goto(url,wait_until="domcontentloaded",timeout=40000)
    await page.wait_for_timeout(6500)
    data=await page.evaluate("""() => ({
      title:document.title,body:(document.body?.innerText||'').slice(0,14000),
      anchors:[...document.querySelectorAll('a[href]')].slice(0,80).map(x=>({text:(x.innerText||'').trim().slice(0,100),url:x.href})),
      inputs:[...document.querySelectorAll('input')].slice(0,30).map(x=>({id:x.id,placeholder:x.placeholder,type:x.type,aria:x.getAttribute('aria-label')})),
      buttons:[...document.querySelectorAll('button')].slice(0,45).map(x=>({text:(x.innerText||'').trim().slice(0,90),aria:x.getAttribute('aria-label')})),
    })""")
    entry.update({"status":resp.status if resp else None,"final_url":page.url,**data})
    print("PORTAL",name,"STATUS",entry["status"],"URL",page.url,"BODY",repr(data.get("body","")[:1300]),flush=True)
    print("PUBLIC_BUTTONS",name,json.dumps(data.get("buttons",[])[:25]),flush=True)
    print("PUBLIC_LINKS",name,json.dumps(data.get("anchors",[])[:20]),flush=True)
    try:await page.screenshot(path=str(OUT/(name+".png")),full_page=True,timeout=15000)
    except:pass
    # Only public search, no authentication and no guessing identifiers.
    search=page.locator('input[type="search"],input[placeholder*="Search" i],input[aria-label*="Search" i]').first
    if await search.count() and await search.is_visible():
     try:
      await search.fill(addr,timeout=4000)
      await search.press("Enter",timeout=4000)
      await page.wait_for_timeout(4500)
      entry["search_result_text"]=(await page.locator("body").inner_text())[:11000]
      print("PUBLIC_SEARCH",name,"TEXT",repr(entry["search_result_text"][:1000]),flush=True)
     except Exception as e:entry["search_error"]=str(e)[:300]
   except Exception as e:
    entry["error"]=str(e)[:400];print("PORTAL_ERROR",name,entry["error"],flush=True)
   entry["public_request_paths"]=list({x["url"].split("?")[0]:x for x in reqs}.values())[:80]
   entry["pdf_responses"]=pdfs
   entries.append(entry)
   await page.close()
  await browser.close()
 (OUT/"00_PORTAL_MATRIX.json").write_text(json.dumps(entries,indent=2,ensure_ascii=False))
 print("FINAL_PORTAL_MATRIX",len(entries),flush=True)
asyncio.run(run())
