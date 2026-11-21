import asyncio, json, re, hashlib, os
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path("boston_originals_probe");OUT.mkdir(exist_ok=True)
BASE="https://scerisecm.boston.gov/ScerIS/CmPublic/"
PERMITS=["SF1747840","SF1725304"]
logs=[]
def note(*args):
 s=" ".join(str(x) for x in args)
 print(s[:1800],flush=True);logs.append(s[:1800])
async def snapshot(page,label):
 try:
  await page.screenshot(path=str(OUT/f"{label}.png"),full_page=True,timeout=20000)
  obj=await page.evaluate("""() => ({
    url:location.href,title:document.title,body:document.body.innerText.slice(0,13000),
    inputs:[...document.querySelectorAll('input,textarea,select')].map(x=>({outer:x.outerHTML.slice(0,450),label:x.closest('div')?.innerText.slice(0,140)})).slice(0,90),
    buttons:[...document.querySelectorAll('button, a[role="button"], [ng-click], [onclick], i, svg')].filter(x=>x.getBoundingClientRect().width>0).map(x=>({text:x.innerText?.slice(0,90),title:x.title,aria:x.getAttribute('aria-label'),outer:x.outerHTML.slice(0,340)})).slice(0,110),
    links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.innerText.slice(0,70)})).slice(0,90)
  })""")
  (OUT/f"{label}.json").write_text(json.dumps(obj,indent=2))
  note("SNAP",label,"URL",obj["url"],"BODY",repr(obj["body"][:1000]),"INPUTS",json.dumps(obj["inputs"])[:2300],"BUTTONS",json.dumps(obj["buttons"])[:1400])
 except Exception as e:note("SNAP_FAIL",label,str(e)[:500])
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True,args=["--disable-dev-shm-usage"])
  c=await b.new_context(accept_downloads=True)
  page=await c.new_page()
  foundpdf={}
  async def response(resp):
   try:
    ctype=resp.headers.get("content-type","")
    if "pdf" in ctype.lower() or ("download" in resp.url.lower() and resp.status==200):
     note("POSSIBLE_PDF",resp.status,ctype,resp.url[:250])
     if "pdf" in ctype.lower() and len(foundpdf)<20:
      raw=await resp.body()
      if raw.startswith(b"%PDF-"):
       sha=hashlib.sha256(raw).hexdigest()
       fn=OUT/(sha[:16]+".pdf");fn.write_bytes(raw)
       foundpdf[sha]={"source":resp.url,"sha256":sha,"file":str(fn),"bytes":len(raw)}
       note("PDF_SAVED",fn,len(raw))
   except Exception as e:note("RESPONSE_ERROR",str(e)[:140])
  page.on("response", lambda r: asyncio.create_task(response(r)))
  try:
   resp=await page.goto(BASE,wait_until="domcontentloaded",timeout=35000)
   note("INITIAL",resp.status if resp else None)
   await page.wait_for_timeout(5500)
   await snapshot(page,"00_home")
   folder=page.get_by_text("ISD - Permit Images",exact=False)
   note("FOLDER_COUNT",await folder.count())
   if await folder.count():
    try:await folder.first.hover(timeout=9000)
    except Exception as e:note("HOVER_FAIL",str(e)[:180])
    await snapshot(page,"01_hover_folder")
    try:await folder.first.click(timeout=8000)
    except Exception as e:note("CLICK_FOLDER_FAIL",str(e)[:180])
    await page.wait_for_timeout(1000)
    await snapshot(page,"02_folder_clicked")
    # In ScerIS, a magnifier shown on hover can launch advanced search
    try:
     target=folder.first.locator("xpath=..")
     icons=await target.locator("button,a,[title],[aria-label],span").evaluate_all("""els=>els.map(x=>({outer:x.outerHTML.slice(0,220)})).slice(0,30)""")
     note("FOLDER_ICON_OPTIONS",json.dumps(icons)[:3000])
    except Exception as e:note("FOLDER_ICON_ERROR",str(e)[:180])
    folder_search=target.locator('a[title="Search"][ng-click*="searchFolder"]')
    note("FOLDER_SEARCH",await folder_search.count())
    if await folder_search.count():
     await folder_search.last.click(timeout=6500)
     await page.wait_for_timeout(1300)
     await snapshot(page,"03_search_icon")
   # Try enter one unique permit number into a visible search field
   locator=page.locator('input[type="text"]:visible:not([disabled])')
   note("VISIBLE_INPUTS",await locator.count())
   meta=await locator.evaluate_all("""xs=>xs.map(x=>({id:x.id,placeholder:x.placeholder,name:x.name,html:x.outerHTML.slice(0,250),parent:x.parentElement?.parentElement?.innerText.slice(0,140)}))""")
   note("INPUT_META",json.dumps(meta)[:4000])
   match_idx=next((i for i,x in enumerate(meta) if re.search("permit.*number|number.*permit",str(x),re.I)),None)
   if match_idx is not None:
    await locator.nth(match_idx).fill(PERMITS[0])
    note("FILLED_INPUT",match_idx)
    await snapshot(page,"04_filled")
    buttons=page.get_by_role("button",name=re.compile("^Search$",re.I))
    if await buttons.count():
     await buttons.first.click(timeout=8000)
    else:
     await locator.nth(match_idx).press("Enter")
    await page.wait_for_timeout(3500)
    await snapshot(page,"05_results")
    for selector in ["tr","[class*='result']","[title*='View']","[title*='Download']"]:
     note("RESULT_SELECTOR",selector,"COUNT",await page.locator(selector).count())
    for sel in ['[title*="View"]','[aria-label*="View"]','a:has-text("View")','button:has-text("View")']:
     if await page.locator(sel).count():
      try:
       await page.locator(sel).last.click(timeout=3000)
       await page.wait_for_timeout(1200)
       await snapshot(page,"06_view_doc")
       break
      except Exception as e:note("VIEW_ERR",str(e)[:150])
   else:note("NO_PERMIT_SEARCH_FIELD")
  except Exception as e:note("FATAL",repr(e)[:1000])
  finally:
   (OUT/"manifest.json").write_text(json.dumps({"pdfs":list(foundpdf.values()),"logs":logs},indent=2))
   await c.close();await b.close()
asyncio.run(main())
