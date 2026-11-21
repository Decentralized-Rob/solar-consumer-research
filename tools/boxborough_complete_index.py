"""Scan Boxborough's entire *public* PermitPro index in paginated batches.
Independently identify Giga and Sunrun from all company/name fields, then verify PDFs.
"""
import asyncio,copy,json,re,hashlib
from pathlib import Path
from urllib.parse import parse_qs,urljoin
from playwright.async_api import async_playwright

BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_complete_results");OUT.mkdir(exist_ok=True)
CHUNK=1500
FIELDS=["contractorCompany","contractorName","applicantName","applicantCompany","proposedWorkDescription"]
def clean(s):return re.sub(r"[^A-Z0-9]","",str(s or "").upper())
def record(row,which):
 values={k:str(row.get(k) or "") for k in FIELDS}
 return {"_id":str(row.get("_id","")),"application_id":str(row.get("Application ID","")),
 "date":str(row.get("Application Date","")),"address":str(row.get("address","")),
 "type":row.get("type") or row.get("_type"),"matched_fields":{k:v for k,v in values.items() if re.search(which,v,re.I)}}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  reqs=[]
  def listen(r):
   if "mode=getResults" in r.url:
    try:reqs.append(json.loads(parse_qs(r.post_data or "").get("jsonData",["{}"])[0]))
    except:pass
  page.on("request",listen)
  savedpdfs=[]
  try:
   await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(2400)
   if not reqs:raise RuntimeError("Cannot obtain original public dashboard request")
   tpl=reqs[0]
   resp=await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData",timeout=30000)
   defs={x["fieldName"]:x for x in await resp.json() if isinstance(x,dict) and "fieldName" in x}
   for x in FIELDS:
    if x not in defs:raise RuntimeError(f"Missing known public field: {x}")
   payload=copy.deepcopy(tpl)
   payload["activeDashboardView"]["selectedFieldNames"]+=FIELDS
   payload["resultsSettings"]["fieldData"]+=[defs[k] for k in FIELDS]
   payload["activeDashboardView"]["filters"]=[]
   payload["resultsSettings"]["limit"]=CHUNK
   allrows=[]
   short_pages=[]
   skip=0
   total=9500
   while skip<total:
    payload["resultsSettings"]["skip"]=skip
    res=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(payload)},timeout=55000)
    if res.status!=200:raise RuntimeError("PermitPro getResults returned HTTP "+str(res.status))
    j=await res.json()
    rows=j.get("resultsData")
    if not isinstance(rows,list):raise RuntimeError("Missing resultsData array")
    total=int(j.get("resultsSettings",{}).get("totalSearchResults",total))
    allrows+=rows
    print("INDEX_PAGE","skip",skip,"received",len(rows),"all",total,flush=True)
    if len(rows)<min(CHUNK,total-skip):short_pages.append({"offset":skip,"received":len(rows),"expected":min(CHUNK,total-skip)})
    skip+=CHUNK
    if not rows:print("EMPTY_BACKEND_PAGE","at",skip-CHUNK,flush=True)
   print("SCANNED",len(allrows),"EXPECTED",total,flush=True)
   print("SHORT_PAGES",json.dumps(short_pages),flush=True)
   date_cutoff="2021-11-21"
   target=[r for r in allrows if str(r.get("Application Date",""))>=date_cutoff]
   giga=[record(r,r"giga|espigar") for r in target if any(re.search(r"giga|espigar",str(r.get(k) or ""),re.I) for k in FIELDS)]
   sunrun=[record(r,r"sun[\s-]*run") for r in target if any(re.search(r"sun[\s-]*run",str(r.get(k) or ""),re.I) for k in FIELDS)]
   gi={}
   for x in giga:gi.setdefault(clean(x["address"]),[]).append(x)
   si={}
   for x in sunrun:si.setdefault(clean(x["address"]),[]).append(x)
   matched=[{"address":g[0]["address"],"giga":g,"sunrun":si[k]} for k,g in gi.items() if k and k in si]
   summary={"portal":"Boxborough PermitPro","total_public_index":total,"records_examined":len(target),"public_rows_returned":len(allrows),"expected_index_total":total,"short_pages":short_pages,
    "cutoff":date_cutoff,"giga":giga,"sunrun":sunrun,"same_address_matches":matched}
   (OUT/"separate_company_search.json").write_text(json.dumps(summary,indent=2))
   print("SEPARATE_FULL_INDEX_RESULTS","GIGA",len(giga),"SUNRUN",len(sunrun),"SAME_ADDRESS",len(matched),flush=True)
   for name,data in (("GIGA",giga),("SUNRUN",sunrun)):
    for x in data[:20]:print(name,"PERMIT",x["application_id"],x["date"],x["address"],x["matched_fields"],flush=True)
   # Verify an original PDF using the same address->application->S3 method as Upton.
   # Prefer confirmed Giga/Sunrun property, otherwise one first solar permit only.
   appids=[]
   for x in matched[:1]:
    appids+=[r["_id"] for r in x["giga"]+x["sunrun"]]
   if not appids:
    solar=[r for r in target if "solar" in str(r.get("type") or r.get("_type") or "").lower()]
    if solar:appids=[str(solar[0].get("_id",""))]
   print("SAMPLE_IDS",appids[:4],flush=True)
   for recordid in list(dict.fromkeys(appids))[:4]:
    if not recordid:continue
    url=BASE+"index.php?act=process&id="+recordid
    res=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(1000)
    obj=await page.evaluate("""()=>({text:document.body.innerText.slice(0,14000),urls:[...document.querySelectorAll('a[href]')].map(x=>x.href)})""")
    (OUT/("process_"+recordid+".json")).write_text(json.dumps(obj,indent=2))
    urls=list(dict.fromkeys(x for x in obj["urls"] if ".s3.amazonaws.com/" in x or x.lower().endswith(".pdf")))
    print("PUBLIC_RECORD",recordid,"HTTP",res.status if res else None,"PDF_LINKS",len(urls),"PAGE_CHARS",len(obj["text"]),flush=True)
    for link in urls[:20]:
     try:
      r=await ctx.request.get(link,timeout=30000)
      data=await r.body()
      if not data.startswith(b"%PDF-"):continue
      sha=hashlib.sha256(data).hexdigest()
      file=OUT/(recordid+"_"+sha[:12]+".pdf");file.write_bytes(data)
      savedpdfs.append({"record":recordid,"url":url,"document_url":link,"filename":file.name,"bytes":len(data),"sha256":sha})
      print("ORIGINAL_PDF",recordid,len(data),flush=True)
     except Exception as e:print("PDF_ERROR",repr(e)[:200],flush=True)
   (OUT/"verified_original_pdfs.json").write_text(json.dumps(savedpdfs,indent=2))
  except Exception as e:
   print("ERROR",repr(e)[:1200],flush=True)
   (OUT/"error.txt").write_text(repr(e))
  finally:await ctx.close();await browser.close()
asyncio.run(main())
