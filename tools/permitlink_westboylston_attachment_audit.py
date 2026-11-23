"""Audit public West Boylston roof+solar attachment metadata and PDF text for Giga and Sunrun.
Only verified original PDF bytes are considered evidence. Scanned unsearchable PDFs are reported.
"""
import asyncio,hashlib,io,json,re,sys,traceback
from pathlib import Path
from urllib.parse import quote
from playwright.async_api import async_playwright
from pypdf import PdfReader

BASE="https://permitlinkusa-online.com/csp/westboylstonma/"
OUT=Path("westboylston_giga_sunrun_audit")
OUT.mkdir(exist_ok=True)
SOURCE=Path("source_index/all_permits.json")
TERMS=["giga","sunrun","espigar","lucas deoliveira","lucas oliveira","sun run"]
ROOF=re.compile(r"roof|re-roof|reroof|replacing shingles|shingle|roofing",re.I)
SOLAR=re.compile(r"\bsolar\b|photovoltaic|\bpv\b|\barray\b|inverter|battery storage|energy storage",re.I)
rows=json.loads(SOURCE.read_text())
targets=[]
seen=set()
for r in rows:
 desc=str(r.get("WorkDescription") or "")
 if ROOF.search(desc) or SOLAR.search(desc):
  key=r["DocumentId"]
  if key not in seen:
   targets.append(r);seen.add(key)
print("CANDIDATES",len(targets),"OF",len(rows),"PUBLIC PERMITS",flush=True)
results=[]
lock=asyncio.Lock()
queue=asyncio.Queue()
for r in targets:queue.put_nowait(r)
for _ in range(4):queue.put_nowait(None)

def filelabel(r,d):
 raw=f"{r['PermitID']}_{r['HouseNumber']}_{r['Location']}_{d.get('FileName','file')}"
 return re.sub(r"[^A-Za-z0-9_.-]+","_",raw).strip("._")[:135]

def analyze_pdf(data):
 if not data.startswith(b"%PDF-") or len(data)<100:
  return {"verified_pdf":False,"bytes":len(data)}
 out={"verified_pdf":True,"bytes":len(data),"sha256":hashlib.sha256(data).hexdigest()}
 try:
  reader=PdfReader(io.BytesIO(data))
  if reader.is_encrypted:
   try:reader.decrypt("")
   except Exception: pass
  out["pages"]=len(reader.pages)
  texts=[]
  for p in reader.pages[:30]:
   try:texts.append(p.extract_text() or "")
   except Exception:pass
  content=" ".join(texts).lower()
  out["text_chars"]=len(content)
  out["matches"]=[term for term in TERMS if term in content]
 except Exception as e:
  out["parse_error"]=str(e)[:180]
 return out

async def worker(workerid,pw):
 browser=await pw.chromium.launch(headless=True)
 context=await browser.new_context(accept_downloads=True)
 page=await context.new_page()
 async def process(r):
  result={k:r.get(k) for k in ["PermitID","HouseNumber","Location","Applied","Issued","DocumentId","Maid","WorkDescription","PermitType"]}
  result["attachments"]=[]
  result["metadata_hits"]=[]
  uri=f"{BASE}DocumentLink.PublicAttachmentCenter.cls?DocumentId={r['DocumentId']}&QueryId={r['DocumentId']}&Maid={r['Maid']}"
  try:
   response=await page.goto(uri,wait_until="domcontentloaded",timeout=45000)
   if not response or response.status!=200:
    raise RuntimeError(f"Attachment page HTTP {response.status if response else 'missing'}")
   # Some servers respond with a loading table; inspect after slight wait.
   await page.wait_for_timeout(150)
   data=await page.evaluate("""() => {
    const tbl=zenPage.getComponentById('table');
    const count=Number(tbl.getProperty('rowCount'))||0;
    const out=[];
    for(let i=0;i<Math.min(count,60);i++){
      try {let row=tbl.getRowData(i);if(row)out.push(row);}
      catch(e) {out.push({error:String(e),i});}
    }
    return {count,rows:out};
   }""")
   result["attachment_count"]=data["count"]
   if len(data["rows"])<data["count"]:
    result["error"]="Only inspected first 60 attachments"
   for d in data["rows"]:
    if not d.get("ImageId"):continue
    meta=" ".join(str(d.get(k,"")) for k in ("FileName","FileDescription","Originator")).lower()
    found=[term for term in TERMS if term in meta]
    item={k:d.get(k) for k in ("ImageId","FileName","FileDescription","DateUploaded","Originator","FileType")}
    if found:item["metadata_matches"]=found
    if str(d.get("FileType","")).lower()!="pdf" and not str(d.get("FileName","")).lower().endswith(".pdf"):
     item["non_pdf"]=True
     result["attachments"].append(item)
     continue
    docurl=f"{BASE}TaxLink.ImageServer.cls?ImageID={d['ImageId']}&Decrypt=0"
    try:
     response=await context.request.get(docurl,timeout=45000)
     item["http_status"]=response.status
     item["content_type"]=response.headers.get("content-type","")
     data=await response.body()
     item.update(analyze_pdf(data))
     if item.get("verified_pdf"):
      if found or item.get("matches"):
       prop=OUT/"matched_original_pdfs"/re.sub("[^A-Za-z0-9_.-]","_",str(r["DocumentId"]))
       prop.mkdir(parents=True,exist_ok=True)
       filename=filelabel(r,d)+".pdf"
       (prop/filename).write_bytes(data)
       item["saved_path"]=str(prop/filename)
     elif data[:100]:
      item["non_pdf_prefix"]=repr(data[:80])
    except Exception as e:
     item["download_error"]=str(e)[:180]
    result["attachments"].append(item)
    if found or item.get("matches"):
     result["metadata_hits"].append({"ImageId":d["ImageId"],"matches":found+item.get("matches",[])})
  except Exception as e:
   result["error"]=str(e)[:400]
  return result
 while True:
  r=await queue.get()
  if r is None:break
  result=await process(r)
  async with lock:
   results.append(result)
   n=len(results)
   if n%15==0 or result["metadata_hits"]:
    hits=[x for x in results if x["metadata_hits"]]
    print(f"SCANNED {n}/{len(targets)} HITS {len(hits)} ERRORS {sum(1 for x in results if x.get('error'))}",flush=True)
    if result["metadata_hits"]:
     print("FOUND MATCH",result["PermitID"],result["HouseNumber"],result["Location"],result["metadata_hits"],flush=True)
   (OUT/"audit_progress.json").write_text(json.dumps({"completed":n,"total":len(targets),"results":results},indent=2))
 await context.close()
 await browser.close()

async def main():
 async with async_playwright() as pw:
  await asyncio.gather(*(worker(i,pw) for i in range(4)))
 matches=[r for r in results if r["metadata_hits"]]
 (OUT/"audit.json").write_text(json.dumps({"total_candidates":len(targets),"scanned":len(results),"matched_properties":matches,"all_results":results},indent=2))
 (OUT/"matched_properties.json").write_text(json.dumps(matches,indent=2))
 print("FINAL",json.dumps({"total":len(targets),"done":len(results),"property_matches":len(matches),
 "pdfs":sum(sum(a.get("verified_pdf",False) for a in r["attachments"]) for r in results),
 "unsearchable_pdfs":sum(sum(a.get("verified_pdf",False) and not a.get("text_chars") for a in r["attachments"]) for r in results),
 "errors":sum(bool(r.get("error")) for r in results)},indent=2),flush=True)
 return 0 if len(results)==len(targets) else 1

if __name__=="__main__":sys.exit(asyncio.run(main()))
