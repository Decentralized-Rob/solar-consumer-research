import asyncio,json,hashlib
from pathlib import Path
from playwright.async_api import async_playwright
ROOT=Path("stow_giga_metadata");ROOT.mkdir(exist_ok=True)
BASE="https://permitlinkusa-online.com/csp/stowma/"
items=json.loads(Path("source_index/roof_solar_candidates.json").read_text())
rows=list({x["permit"]["DocumentId"]:x["permit"] for x in items if x["permit"].get("DocumentId") and x["permit"].get("Maid")}.values())
NAMES=("giga","espigar")
queue=asyncio.Queue()
for r in rows:queue.put_nowait(r)
for _ in range(5):queue.put_nowait(None)
results=[];lock=asyncio.Lock()
async def worker(pw):
 browser=await pw.chromium.launch(headless=True)
 context=await browser.new_context()
 page=await context.new_page()
 while True:
  r=await queue.get()
  if r is None:break
  result={k:r.get(k) for k in ("DocumentId","Maid","PermitID","HouseNumber","Location","Applied","WorkDescription")}
  result["hits"]=[]
  try:
   url=f"{BASE}DocumentLink.PublicAttachmentCenter.cls?DocumentId={r['DocumentId']}&QueryId={r['DocumentId']}&Maid={r['Maid']}"
   resp=await page.goto(url,wait_until="domcontentloaded",timeout=20000)
   if not resp or resp.status !=200:raise RuntimeError(f"HTTP {resp.status if resp else 'missing'}")
   files=await page.evaluate("""()=>{
      const t=zenPage.getComponentById('table');
      if(!t)return {error:"no table"};
      const n=Number(t.getProperty('rowCount'))||0;
      return {count:n,rows:Array.from({length:Math.min(n,70)},(_,i)=>t.getRowData(i))};
   }""")
   if files.get("error"):raise RuntimeError(files["error"])
   result["attachment_count"]=files["count"]
   if files["count"]>70:result["warning"]="Over 70 attachments"
   for d in files["rows"]:
    if not d:continue
    desc=" ".join(str(d.get(k,"")) for k in ("FileName","FileDescription","Originator")).lower()
    hits=[name for name in NAMES if name in desc]
    if hits:
     result["hits"].append({k:d.get(k) for k in ("ImageId","FileName","FileDescription","Originator","FileType")})
     print("GIGA METADATA MATCH",result["PermitID"],result["HouseNumber"],result["Location"],hits,flush=True)
     if d.get("ImageId"):
      try:
       response=await context.request.get(f"{BASE}TaxLink.ImageServer.cls?ImageID={d['ImageId']}&Decrypt=0",timeout=20000)
       blob=await response.body()
       if blob.startswith(b"%PDF-"):
        path=ROOT/f"giga_{r['DocumentId']}_{d['ImageId']}.pdf"
        path.write_bytes(blob)
        result["hits"][-1]["original_pdf"]=str(path)
        result["hits"][-1]["sha256"]=hashlib.sha256(blob).hexdigest()
      except Exception as ex:result["hits"][-1]["download_error"]=str(ex)[:150]
  except Exception as ex:result["error"]=str(ex)[:200]
  async with lock:
   results.append(result)
   n=len(results)
   if n%45==0:
    print("PROGRESS",n,"/",len(rows),"matches",sum(bool(x["hits"]) for x in results),"errors",sum(bool(x.get("error")) for x in results),flush=True)
    (ROOT/"progress.json").write_text(json.dumps({"checked":n,"matches":[x for x in results if x["hits"]],"errors":[x for x in results if x.get("error")]},indent=2))
 await browser.close()
async def main():
 async with async_playwright() as pw:await asyncio.gather(*(worker(pw) for _ in range(5)))
 (ROOT/"metadata_results.json").write_text(json.dumps(results,indent=2))
 summary={"candidates":len(rows),"scanned":len(results),"matched":[x for x in results if x["hits"]],"errors":[x for x in results if x.get("error")]}
 (ROOT/"summary.json").write_text(json.dumps(summary,indent=2))
 print("FINAL",json.dumps({"candidates":len(rows),"scanned":len(results),"matches":len(summary["matched"]),"errors":len(summary["errors"])}),flush=True)
asyncio.run(main())
