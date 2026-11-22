import asyncio,re,json
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
TARGETS=[("51 WARREN ROAD","1851"),("85 DUNHAMTOWN PALMER RD","2037"),("85 DUNHAMTOWN PALMER RD","1178"),("261 LITTLE ALUM ROAD","1125"),("324 PALMER ROAD","495")]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context()
  for addr,idx in TARGETS:
   page=await ctx.new_page()
   url=BASE+f"index.php?act=process&id={idx}"
   try:
    r=await page.goto(url,wait_until="domcontentloaded",timeout=26000)
    await page.wait_for_timeout(400)
    txt=await page.locator("body").inner_text()
    links=await page.locator("a[href]").evaluate_all("""els=>els.filter(x=>x.href.includes('act=form/')).map(x=>x.href)""")
    print("CHECK_RECORD",addr,idx,"HTTP",r.status if r else None,"CHARS",len(txt),"START",repr(txt[:1100]),"FORM_LINKS",links,flush=True)
    for link in links[:2]:
     try:
      rr=await page.goto(link,wait_until="domcontentloaded",timeout=26000)
      s=await page.locator("body").inner_text()
      for label,pattern in [("ENVELOPE",r"Roofing Material\s*(.*?)\s*(?:Type of Siding|Will the project)"),("RESIDENTIAL",r"Brief Description of Proposed Work.*?:\s*(.*?)(?:SECTION 4|SECTION 5)")]:
       m=re.search(pattern,s,re.S|re.I)
       if m:print("EXTRACT",idx,label,repr(m.group(1)[:500]),flush=True)
      print("FORM",idx,rr.status if rr else None,"CHARS",len(s),"TEXT",repr(s[:6500]),flush=True)
     except Exception as e:print("FORM_ERR",idx,repr(e)[:220],flush=True)
   except Exception as e:print("ERR",idx,repr(e)[:220],flush=True)
   await page.close()
  await ctx.close();await browser.close()
asyncio.run(main())
