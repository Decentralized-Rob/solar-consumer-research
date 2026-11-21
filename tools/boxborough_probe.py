"""Boxborough-only PermitPro verification and candidate discovery.
Search public permit index, then open a few individual permit records.
Does not represent metadata as original PDF evidence.
"""
import asyncio,csv,io,json,re,hashlib
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_probe");OUT.mkdir(exist_ok=True)
def n(v):return re.sub(r'[^A-Z0-9]','',str(v).upper())
def field(row,part):
 for k,v in row.items():
  if part.lower() in str(k).lower():return str(v or "")
 return ""
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(accept_downloads=True)
  page=await context.new_page()
  records=[]
  try:
   res=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(2500)
   control=await page.evaluate("""()=>({title:document.title,body:document.body.innerText.slice(0,2500),ids:[...document.querySelectorAll('[id]')].map(x=>x.id).filter(x=>/filter|download|column|report/i.test(x)),links:[...document.querySelectorAll('a[href]')].slice(0,35).map(x=>({text:x.innerText,href:x.getAttribute('href')}))})""")
   (OUT/"portal_controls.json").write_text(json.dumps(control,indent=2))
   print("PORTAL",res.status,control["title"],"IDS",control["ids"],flush=True)
   if not await page.locator("#downloadResultsCSV").count():
    print("NO_CSV_EXPORT_CONTROL",flush=True)
    return
   async with page.expect_download(timeout=90000) as dl:
    await page.locator("#downloadResultsCSV").click()
   download=await dl.value
   raw=await download.path()
   data=Path(raw).read_bytes()
   rows=list(csv.DictReader(io.StringIO(data.decode("utf-8-sig",errors="replace"))))
   print("INDEX",len(rows),"HEADERS",list(rows[0]) if rows else [],flush=True)
   if not rows:return
   direct=[x for x in rows if re.search(r'sunrun|giga property|espigar', " ".join(str(v or "") for v in x.values()),re.I)]
   solar=[x for x in rows if re.search(r'\bsolar\b|photovoltaic|p\.?v\.? |roof.?top energy',field(x,"Proposed Work")+" "+field(x,"Application Type"),re.I)]
   roof=[x for x in rows if re.search(r'\broof(?:ing)?\b|shingles?|reroof|re-roof|minor repairs|roof replacement',field(x,"Proposed Work")+" "+field(x,"Application Type"),re.I)]
   indexed={}
   for x in roof:
    key=n(field(x,"Address"))
    indexed.setdefault(key,[]).append(x)
   pairs=[]
   for s in solar:
    rs=indexed.get(n(field(s,"Address")),[])
    for r in rs:
     if field(s,"Application ID")==field(r,"Application ID"):continue
     pairs.append({"address":field(s,"Address"),"solar":s,"roof":r})
   print("DIRECT",len(direct),"SOLAR",len(solar),"ROOF",len(roof),"PAIRS",len(pairs),flush=True)
   (OUT/"candidate_index.json").write_text(json.dumps({"headers":list(rows[0]),"total":len(rows),"direct":direct[:80],"solar":solar[:200],"roof_solar_pairs":pairs[:150]},indent=2))
   for x in direct[:8]:print("DIRECT_CANDIDATE",field(x,"Application ID"),field(x,"Address"),field(x,"Proposed Work")[:100],flush=True)
   for x in pairs[:15]:print("PAIR",x["address"],field(x["solar"],"Application ID"),field(x["roof"],"Application ID"),flush=True)
   # Select a documented solar permit, and one plausible paired roof permit,
   # solely to test public process-screen and original attachment access.
   sample=[]
   if pairs:
    sample=[pairs[0]["solar"],pairs[0]["roof"]]
   elif direct:sample=direct[:2]
   else:sample=solar[:1] or roof[:1] or rows[:1]
   seen=set()
   for entry in sample:
    app=field(entry,"Application ID")
    if not app or app in seen:continue
    seen.add(app)
    await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(1300)
    await page.locator("#filterWhat").select_option("Application ID")
    await page.locator("#filterOperator").select_option("contains")
    await page.locator("input.filterWhere:visible").first.fill(app)
    await page.locator("#filterShow").click()
    try:
     await page.wait_for_function("""(app)=>[...document.querySelectorAll('tr')].some(x=>x.innerText.includes(app))""",arg=app,timeout=14000)
    except:pass
    found=await page.locator("tr").evaluate_all("""es=>es.map(x=>({text:x.innerText,hrefs:[...x.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}))""")
    match=next((x for x in found if app in x["text"] and any(h and "act=process" in h for h in x["hrefs"])),None)
    if not match:
     print("APP_NOT_FOUND_IN_UI",app,flush=True);continue
    url=urljoin(BASE,next(h for h in match["hrefs"] if h and "act=process" in h))
    response=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(1700)
    obj=await page.evaluate("""()=>({text:document.body.innerText.slice(0,18000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.innerText,title:a.title}))})""")
    (OUT/(app.replace("/","_")+"_record.json")).write_text(json.dumps(obj,indent=2))
    links=list(dict.fromkeys(x["href"] for x in obj["links"] if ".s3.amazonaws.com/" in x["href"] or x["href"].lower().endswith(".pdf")))
    print("PROCESS_RECORD",app,"HTTP",response.status if response else None,"PAGE_CHARS",len(obj["text"]),"DOCUMENT_URLS",len(links),"FIRST",obj["text"][:350].replace("\n"," | "),flush=True)
    valid=0
    for link in links[:4]:
     try:
      r=await context.request.get(link,timeout=25000)
      body=await r.body()
      if body.startswith(b"%PDF-"):
       valid+=1
       sha=hashlib.sha256(body).hexdigest()
       file=OUT/(app.replace("/","_")+"_"+sha[:12]+".pdf")
       file.write_bytes(body)
       records.append({"app":app,"record_url":url,"source_url":link,"filename":file.name,"sha256":sha,"bytes":len(body)})
       print("ORIGINAL_PDF",app,len(body),flush=True)
      else:print("LINK_NOT_PDF",app,r.status,len(body),flush=True)
     except Exception as ex:print("LINK_ERROR",app,str(ex)[:120],flush=True)
    print("RECORD_TOTAL",app,valid,flush=True)
   (OUT/"verified_originals.json").write_text(json.dumps(records,indent=2))
  except Exception as e:
   print("PROBE_ERROR",repr(e)[:700],flush=True)
   (OUT/"probe_error.txt").write_text(repr(e))
  finally:
   await context.close();await browser.close()
asyncio.run(main())
