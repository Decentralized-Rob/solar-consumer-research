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
   async with page.expect_download(timeout=70000) as dl:
    await page.locator("#downloadResultsCSV").click()
   download=await dl.value
   f=OUT/"export.csv";await download.save_as(f)
   rows=list(csv.DictReader(io.StringIO(f.read_bytes().decode("utf-8-sig",errors="replace"))))
   print("CSV_ROWS",len(rows),"FIELDS",list(rows[0]) if rows else [],flush=True)
   gigs=[r for r in rows if re.search(r"giga property|luiz.*espigar|luis.*espigar", "|".join(str(r.get(k,"")) for k in r if k and re.search(r"applicant|contractor",k,re.I)),re.I)]
   suns=[r for r in rows if re.search(r"sunrun", "|".join(str(r.get(k,"")) for k in r if k and re.search(r"applicant|contractor",k,re.I)),re.I)]
   print("GIGA",len(gigs),"SUNRUN",len(suns),flush=True)
   for r in gigs:print("GIGA_APPLICATION",r.get("Application Date"),r.get("Application ID"),r.get("Address"),r.get("Application Type"),flush=True)
   def addr(s):return re.sub("[^A-Z0-9]","",s.upper())
   matches=[{"giga":g,"sunrun":s} for g in gigs for s in suns if addr(g.get("Address",""))==addr(s.get("Address",""))]
   print("SAME_ADDRESS",len(matches),flush=True)
   (OUT/"candidate_results.json").write_text(json.dumps({"count_all":len(rows),"giga":gigs,"sunrun":suns,"same_address":matches},indent=2))
   f.unlink()
  except Exception as e:
   print("ERROR",repr(e)[:1300],flush=True)
   (OUT/"error.txt").write_text(str(e))
  finally:await ctx.close();await b.close()
asyncio.run(main())
