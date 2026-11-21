import asyncio, csv, json, io, re, hashlib
from pathlib import Path
from playwright.async_api import async_playwright
from urllib.parse import urljoin

OUT=Path("permitpro_oct2025");OUT.mkdir(exist_ok=True)
HOSTS={
"boylston":"https://boylston.patriotpermitpro.com/",
"boxborough":"https://boxborough.patriotpermitpro.com/",
"holbrook":"https://holbrook.patriotpermitpro.com/",
"princeton":"https://princeton.patriotpermitpro.com/",
"upton":"https://upton.patriotpermitpro.com/",
"carlisle":"https://carlisle.patriotpermitpro.com/",
"nahant":"https://nahant.patriotpermitpro.com/",
"brimfield":"https://brimfield.patriotpermitpro.com/",
"colrain":"https://colrain.patriotpermitpro.com/",
}
TERMS=re.compile(r"\b(?:Giga(?: Property Solutions)?|Espigar|Sunrun|Lucas (?:De)?Oliveira)\b",re.I)
results={}
sem=asyncio.Semaphore(3)
async def one(browser,town,base):
 async with sem:
  d=OUT/town;d.mkdir(exist_ok=True)
  context=await browser.new_context(accept_downloads=True)
  page=await context.new_page()
  report={"town":town,"url":base,"status":"unknown"}
  try:
   resp=await page.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
   await page.wait_for_timeout(1200)
   report["status"]=resp.status if resp else 0
   report["title"]=await page.title()
   report["csv_button"]=await page.locator("#downloadResultsCSV").evaluate("(x)=>x.outerHTML.slice(0,800)") if await page.locator("#downloadResultsCSV").count() else "none"
   report["selects"]=await page.locator("select").evaluate_all("(els)=>els.map(e=>({id:e.id,name:e.name,values:[...e.options].map(x=>({v:x.value,t:x.textContent.trim()})).slice(0,25)}))")
   print("TOWN",town,"HTTP",report["status"],"BUTTON",report["csv_button"][:150])
   # Request a public CSV using the same button as the website.
   try:
    async with page.expect_download(timeout=26000) as inf:
     await page.locator("#downloadResultsCSV").click(timeout=8000)
    download=await inf.value
    csvpath=d/"applications.csv"
    await download.save_as(csvpath)
    raw=csvpath.read_bytes().decode("utf-8-sig",errors="replace")
    rows=list(csv.DictReader(io.StringIO(raw)))
    report["csv_count"]=len(rows)
    report["columns"]=list(rows[0]) if rows else []
    hits=[{"index":i,**{k:v for k,v in row.items() if k and k.lower() in ("application id","application date","address","contractor company","contractor name","applicant company","applicant name","application type","application status")}} for i,row in enumerate(rows) if TERMS.search("|".join(str(v) for v in row.values()))]
    report["all_hits"]=hits[:500]
    report["giga_hits"]=[x for x in hits if TERMS.search(json.dumps(x)) and re.search("giga|espigar",json.dumps(x),re.I)]
    report["sunrun_oct_hits"]=[x for x in hits if "2025-10" in json.dumps(x) and "sunrun" in json.dumps(x).lower()]
    report["oct_2025"]=[{"index":i,**{k:v for k,v in row.items() if k.lower() in ("application id","application date","address","contractor company","applicant company","contractor name","application type")}} for i,row in enumerate(rows) if "2025-10" in str(row.get("Application Date",""))]
    print("CSV_OK",town,"records",len(rows),"GIGA",len(report["giga_hits"]),"OCT_SUNRUN",len(report["sunrun_oct_hits"]),"oct_count",len(report["oct_2025"]))
    (d/"matches.json").write_text(json.dumps({"giga":report["giga_hits"],"sunrun_oct":report["sunrun_oct_hits"],"oct_2025":report["oct_2025"]},indent=2))
   except Exception as e:
    report["csv_error"]=str(e)[:500]
    print("CSV_FAIL",town,report["csv_error"][:240])
    # Inspect alternate search/filter interface so we can avoid unsupported export.
    await page.locator("#filterWhat").select_option(label="Application Date")
    await page.wait_for_timeout(200)
    report["date_operators"]=await page.locator("#filterOperator option").evaluate_all("(els)=>els.map(x=>({v:x.value,t:x.textContent.trim()}))")
    report["date_controls"]=await page.locator("input,select,button").evaluate_all("(els)=>els.filter(x=>x.offsetWidth||x.offsetHeight).map(x=>x.outerHTML.slice(0,300)).slice(0,50)")
    report["table_html"]=await page.locator("table").evaluate_all("(els)=>els.map(x=>x.outerHTML.slice(0,2000)).slice(0,3)")
    print("DATE_OPS",town,report.get("date_operators"))
  except Exception as e:
   report["error"]=str(e)[:500]
   print("TOWN_ERROR",town,report["error"])
  finally:
   (d/"report.json").write_text(json.dumps(report,indent=2))
   await context.close()
  results[town]=report

async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  await asyncio.gather(*(one(b,t,u) for t,u in HOSTS.items()))
  await b.close()
 (OUT/"summary.json").write_text(json.dumps({t:{k:r.get(k) for k in ("status","csv_count","csv_error","error","giga_hits","sunrun_oct_hits","date_operators")} for t,r in results.items()},indent=2))
 print("DONE",len(results))

asyncio.run(main())
