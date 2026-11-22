"""Search public Bellingham PermitEyes table, then inspect record and attachment controls."""
import asyncio,json,re
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://permiteyes.us/bellingham/publicview.php"
OUT=Path("permiteyes_bellingham_search");OUT.mkdir(exist_ok=True)
TERMS=["Giga","Espigar","Sunrun","Sun Run"]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  answers=[]
  def onresp(r):
   if "getbuildingpublichome.php" in r.url:
    answers.append(r)
  page.on("response",onresp)
  await page.goto(BASE,wait_until="domcontentloaded",timeout=45000)
  await page.wait_for_timeout(2200)
  search=page.locator('input[type="search"][aria-controls="BuildingPublicHome"]')
  print("GLOBAL_SEARCH",await search.count(),"INITIAL_INFO",(await page.locator("#BuildingPublicHome_info").all_inner_texts()),flush=True)
  details=[]
  for term in TERMS:
   n=len(answers)
   await search.fill(term)
   await search.press("Enter")
   await page.wait_for_timeout(1900)
   print("TERM",term,"NEW_RESPONSES",len(answers)-n,"INFO",await page.locator("#BuildingPublicHome_info").all_inner_texts(),flush=True)
   if len(answers)>n:
    r=answers[-1]
    try:
     j=await r.json()
     print("JSON_HEAD",term,json.dumps({k:v for k,v in j.items() if k!="data"},default=str)[:850],flush=True)
     print("ROWS_JSON",term,json.dumps(j.get("data",[])[:10],default=str)[:9500],flush=True)
    except Exception as ex:print("RESP_ERR",term,r.status,repr(ex),flush=True)
   rows=await page.locator("#BuildingPublicHome tbody tr").evaluate_all("(es)=>es.map(x=>({text:x.innerText.slice(0,650),html:x.outerHTML.slice(0,1900)}))")
   print("ROW_COUNT",term,len(rows),flush=True)
   for row in rows[:15]:
    print("ROW",term,json.dumps(row,ensure_ascii=False)[:1900],flush=True)
   details.append({"search":term,"info":await page.locator("#BuildingPublicHome_info").all_inner_texts(),"rows":rows})
  (OUT/"search_results.json").write_text(json.dumps(details,ensure_ascii=False,indent=2))
  await browser.close()
asyncio.run(main())
