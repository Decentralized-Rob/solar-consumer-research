"""Boylston contractor discovery only; select columns then export municipal CSV, no PDF substitute.
Once exact Giga app/address identified, repeat Upton per-address PDF extraction.
"""
import asyncio, csv, io, json, re
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path("boylston_giga_candidates");OUT.mkdir(exist_ok=True)
BASE="https://boylston.patriotpermitpro.com/"
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context(accept_downloads=True)
  page=await ctx.new_page()
  try:
   await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
   await page.wait_for_timeout(1300)
   opts=await page.locator("#columnList option").evaluate_all("""xs=>xs.map(x=>({v:x.value,t:x.textContent.trim(),s:x.selected}))""")
   selected=[x["v"] for x in opts if x["s"]]
   add=[x["v"] for x in opts if not x["s"] and any(k in x["t"].lower() for k in ("contractor company","contractor name","applicant company","applicant name","proposed work description"))]
   print("FIELDS",selected,"ADDED",add,flush=True)
   await page.locator("#columnList").select_option(selected+add)
   await page.wait_for_timeout(900)
   fields=await page.locator("#filterWhat option").evaluate_all("""xs=>xs.map(x=>({v:x.value,t:x.textContent.trim()}))""")
   print("FILTER_FIELDS",json.dumps(fields)[:10000],flush=True)
   targets=["contractorCompany","contractorName","applicantCompany","applicantName"]
   found=[]
   for field in targets:
    match=next((x for x in fields if x["v"].lower()==field.lower() or x["t"].lower()==field.lower().replace("company"," company").replace("name"," name")),None)
    if not match:
     print("FIELD_UNAVAILABLE",field,flush=True)
     continue
    for term in ("Giga","Espigar") if field in ("contractorCompany","contractorName","applicantName") else ("Giga",):
     try:
      await page.locator("#filterWhat").select_option(match["v"])
      opts2=await page.locator("#filterOperator option").evaluate_all("""xs=>xs.map(x=>({v:x.value,t:x.textContent.trim()}))""")
      op=next((x["v"] for x in opts2 if "contain" in x["t"].lower() or "contain" in x["v"].lower()),None)
      print("SEARCH_FILTER",field,term,"OPTIONS",json.dumps(opts2)[:300],flush=True)
      if not op:continue
      await page.locator("#filterOperator").select_option(op)
      await page.locator("input.filterWhere:visible").first.fill(term)
      await page.locator("#filterShow").click()
      await page.wait_for_timeout(10500)
      rows=await page.locator("tr").evaluate_all("""xs=>xs.map(x=>({text:x.innerText,hrefs:[...x.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})).filter(x=>x.hrefs.some(y=>y&&y.includes('act=process')))""")
      print("FILTER_RESULT",field,term,"COUNT",len(rows),json.dumps(rows)[:4000],flush=True)
      found.extend([{"filter":field,"term":term,**x} for x in rows if term.lower() in x["text"].lower() or re.search("25-|26-|24-",x["text"])])
      await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
      await page.wait_for_timeout(2000)
     except Exception as ex:print("FILTER_ERROR",field,term,str(ex)[:300],flush=True)
   (OUT/"candidate_results.json").write_text(json.dumps(found,indent=2))
  except Exception as e:
   print("ERROR",repr(e)[:1300],flush=True)
   (OUT/"error.txt").write_text(str(e))
  finally:await ctx.close();await b.close()
asyncio.run(main())
