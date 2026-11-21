import asyncio, hashlib, json
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

OUT=Path("holbrook_35_marion_packet");OUT.mkdir(exist_ok=True)
BASE="https://holbrook.patriotpermitpro.com/"
TARGETS={
 "26-00354":{"type":"Roof shingles replacement","name":"Contractor to verify in originals","date":"2026-04-30"},
 "26-00507":{"type":"Solar building 29 panels 11.89 kW","name":"Sunrun to verify in originals","date":"2026-06-17"},
 "26-00508":{"type":"Solar electrical","name":"Sunrun to verify in originals","date":"2026-06-17"},
 "26-00538":{"type":"Sunrun EV charger electrical","name":"Sunrun","date":"2026-06-25"}
}
manifest=[]
records=[]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(accept_downloads=True)
  page=await context.new_page()
  r=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
  await page.wait_for_timeout(1200)
  print("DASHBOARD",r.status)
  await page.locator("#filterWhat").select_option("address")
  await page.locator("#filterOperator").select_option("contains")
  await page.locator("input.filterWhere:visible").first.fill("35 MARION")
  await page.locator("#filterShow").click()
  await page.wait_for_timeout(1800)
  print("FILTER_TEXT",(await page.locator("body").inner_text())[-4000:])
  rows=await page.locator("tr").evaluate_all("""els=>els.map(tr=>({text:tr.innerText,hrefs:[...tr.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})).filter(x=>x.text.includes('26-0'))""")
  (OUT/"filtered_rows.json").write_text(json.dumps(rows,indent=2))
  print("ROWS",json.dumps(rows)[:14000])
  for app,meta in TARGETS.items():
   match=next((row for row in rows if app in row["text"]),None)
   if not match:
    # Holbrook sometimes takes longer than Upton to replace the dashboard's first page.
    await page.wait_for_timeout(7500)
    rows=await page.locator("tr").evaluate_all("""els=>els.map(tr=>({text:tr.innerText,hrefs:[...tr.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})).filter(x=>x.text.includes('26-0'))""")
    match=next((row for row in rows if app in row["text"]),None)
   if not match:
    # Same PermitPro dashboard workflow, this time by the exact application number.
    await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
    await page.wait_for_timeout(1200)
    await page.locator("#filterWhat").select_option("Application ID")
    await page.locator("#filterOperator").select_option("contains")
    await page.locator("input.filterWhere:visible").first.fill(app)
    await page.locator("#filterShow").click()
    await page.wait_for_timeout(8000)
    rows=await page.locator("tr").evaluate_all("""els=>els.map(tr=>({text:tr.innerText,hrefs:[...tr.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})).filter(x=>x.text.includes('26-0'))""")
    print("APPLICATION_FILTER",app,"ROWS",json.dumps(rows)[:1300])
    match=next((row for row in rows if app in row["text"]),None)
   if not match:
    print("APP_MISSING",app);continue
   href=next((href for href in match["hrefs"] if "act=process" in href),None)
   if not href:print("NO_LINK",app,match);continue
   url=urljoin(BASE,href)
   res=await page.goto(url,wait_until="domcontentloaded",timeout=25000)
   await page.wait_for_timeout(500)
   obj=await page.evaluate("""()=>({text:document.body.innerText.slice(0,22000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,title:a.title,text:a.innerText}))})""")
   folder=OUT/app;folder.mkdir(exist_ok=True)
   (folder/"record.json").write_text(json.dumps(obj,indent=2))
   print("OPEN",app,url,"TEXT",repr(obj["text"][:800]),"HTTP",res.status if res else None)
   good= "35 MARION" in obj["text"].upper() and app in obj["text"]
   if not good:
    print("MISMATCH",app);continue
   found=[a["href"] for a in obj["links"] if ".s3.amazonaws.com/" in a["href"] or (".pdf" in a["href"].lower() and a["href"].startswith("http"))]
   found=list(dict.fromkeys(found))
   print("PDF_URLS",app,len(found),found[:15])
   records.append({**meta,"app":app,"record_url":url,"files_seen":len(found),"record_status":res.status if res else None})
   for link in found[:25]:
    try:
     response=await context.request.get(link,timeout=25000)
     b=await response.body()
     if not b.startswith(b"%PDF-"):
      print("NOT_PDF",app,link,response.status,len(b));continue
     sha=hashlib.sha256(b).hexdigest()
     filename=f"{app}_{sha[:12]}.pdf"
     (folder/filename).write_bytes(b)
     entry={**meta,"app":app,"source_record":url,"document_url":link,"filename":f"{app}/{filename}","sha256":sha,"bytes":len(b),"status":response.status,"content_type":response.headers.get("content-type")}
     manifest.append(entry)
     print("PDF_SAVED",json.dumps(entry))
    except Exception as e:print("PDF_ERROR",app,link,str(e)[:220])
  await context.close();await browser.close()
 (OUT/"records.json").write_text(json.dumps(records,indent=2))
 (OUT/"manifest.json").write_text(json.dumps(manifest,indent=2))
 print("RESULT",len(manifest),"PDFS",len(records),"MATCHING_RECORDS")

asyncio.run(main())
