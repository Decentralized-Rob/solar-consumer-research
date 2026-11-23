"""Retry two intermittent West Boylston permit attachment pages with fresh sessions."""
import asyncio,hashlib,io,json
from pathlib import Path
from playwright.async_api import async_playwright
from pypdf import PdfReader
ROOT=Path("westboylston_retry_evidence")
ROOT.mkdir(exist_ok=True)
TARGETS=[("26-225RB","354 LANCASTER STREET",18574,277),("26-223RB","382 PROSPECT STREET",18630,2045)]
BASE="https://permitlinkusa-online.com/csp/westboylstonma/"
NEEDLES=("giga","sunrun","espigar","lucas oliveira","lucas deoliveira","de oliveira")
async def main():
 data=[]
 async with async_playwright() as pw:
  for permit,address,docid,maid in TARGETS:
   res={"permit":permit,"address":address,"document_id":docid,"attachments":[]}
   for attempt in range(1,4):
    browser=await pw.chromium.launch(headless=True)
    context=await browser.new_context()
    page=await context.new_page()
    try:
     url=f"{BASE}DocumentLink.PublicAttachmentCenter.cls?DocumentId={docid}&QueryId={docid}&Maid={maid}"
     r=await page.goto(url,wait_until="domcontentloaded",timeout=45000)
     await page.wait_for_function("() => !!(window.zenPage && zenPage.getComponentById('table'))",timeout=12000)
     docs=await page.evaluate("""() => {
       const t=zenPage.getComponentById('table');
       return Array.from({length: Math.min(50,Number(t.getProperty('rowCount'))||0)},(_,i)=>t.getRowData(i));
     }""")
     res["count"]=len(docs)
     for doc in docs:
      d={k:doc.get(k) for k in ("ImageId","FileName","Originator","FileDescription","FileType")}
      d["metadata_match"]=[term for term in NEEDLES if term in str(d).lower()]
      if d.get("ImageId") and (str(d.get("FileType","")).lower()=="pdf" or str(d.get("FileName","")).lower().endswith(".pdf")):
       u=f"{BASE}TaxLink.ImageServer.cls?ImageID={d['ImageId']}&Decrypt=0"
       r=await context.request.get(u,timeout=45000)
       blob=await r.body()
       d["verified_pdf"]=blob.startswith(b"%PDF-")
       d["bytes"]=len(blob)
       if d["verified_pdf"]:
        d["sha256"]=hashlib.sha256(blob).hexdigest()
        try:
         pdf=PdfReader(io.BytesIO(blob))
         if pdf.is_encrypted:pdf.decrypt("")
         text=" ".join((p.extract_text() or "") for p in pdf.pages[:30]).lower()
         d["text_chars"]=len(text)
         d["text_match"]=[term for term in NEEDLES if term in text]
        except Exception as e:d["parse_error"]=str(e)[:100]
        if d.get("metadata_match") or d.get("text_match"):
         p=ROOT/f"{permit}_image_{d['ImageId']}.pdf"
         p.write_bytes(blob)
         d["file"]=str(p)
      res["attachments"].append(d)
     res["retrieved"]=True
     break
    except Exception as e:
     res["attempt_"+str(attempt)+"_error"]=repr(e)[:250]
    finally:
     await context.close()
     await browser.close()
   data.append(res)
   print("RETRY",permit,address,"retrieved",res.get("retrieved",False),
         "docs",res.get("count"),"hits",sum(bool(d.get("metadata_match") or d.get("text_match")) for d in res["attachments"]),flush=True)
 (ROOT/"retries.json").write_text(json.dumps(data,indent=2))
 print("SUCCESS",all(r.get("retrieved") for r in data),flush=True)
 return 0 if all(r.get("retrieved") for r in data) else 1
if __name__=="__main__":raise SystemExit(asyncio.run(main()))
