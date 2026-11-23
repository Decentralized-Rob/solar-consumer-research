"""Stow public roofing/solar permit attachment search for Giga.
Only unmodified PDF bytes returned by PermitLink TaxLink.ImageServer are saved.
"""
import asyncio, hashlib, io, json, re, sys
from pathlib import Path
from playwright.async_api import async_playwright
from pypdf import PdfReader

BASE="https://permitlinkusa-online.com/csp/stowma/"
OUT=Path("stow_giga_attachment_audit")
OUT.mkdir(exist_ok=True)
SOURCE=Path("source_index/roof_solar_candidates.json")
TERMS=("giga", "espigar", "giga property solutions", "giga property")
items=json.loads(SOURCE.read_text())
targets=[]
seen=set()
for x in items:
    r=x.get("permit") or {}
    docid=r.get("DocumentId")
    if not docid or not r.get("Maid") or docid in seen: continue
    seen.add(docid)
    targets.append(r)
print("CANDIDATES",len(targets),flush=True)
results=[]
queue=asyncio.Queue()
for r in targets: queue.put_nowait(r)
for _ in range(4): queue.put_nowait(None)
lock=asyncio.Lock()

def parse_pdf(data):
    if not data.startswith(b"%PDF-") or len(data)<100:return {"pdf":False,"bytes":len(data)}
    result={"pdf":True,"bytes":len(data),"sha256":hashlib.sha256(data).hexdigest()}
    try:
        rd=PdfReader(io.BytesIO(data))
        if rd.is_encrypted:
            try:rd.decrypt("")
            except Exception:pass
        result["pages"]=len(rd.pages)
        words=[]
        for pg in rd.pages[:45]:
            try:words.append(pg.extract_text() or "")
            except Exception:pass
        text=" ".join(words).lower()
        result["text_chars"]=len(text)
        result["text_hits"]=sorted(set(t for t in TERMS if t in text))
    except Exception as exc:result["parse_error"]=str(exc)[:200]
    return result

async def worker(wid,pw):
    browser=await pw.chromium.launch(headless=True)
    ctx=await browser.new_context()
    page=await ctx.new_page()
    async def process(r):
        rec={k:r.get(k) for k in ("PermitID","HouseNumber","Location","WorkDescription","Applied","Issued","DocumentId","Maid","PermitType")}
        rec["attachments"]=[]
        rec["hits"]=[]
        url=BASE+f"DocumentLink.PublicAttachmentCenter.cls?DocumentId={r['DocumentId']}&QueryId={r['DocumentId']}&Maid={r['Maid']}"
        try:
            resp=await page.goto(url,wait_until="domcontentloaded",timeout=35000)
            if not resp or resp.status !=200:raise RuntimeError(f"Attachment page HTTP {resp.status if resp else '?'}")
            await page.wait_for_timeout(140)
            attachments=await page.evaluate("""() => {
                const t=window.zenPage?.getComponentById('table');
                if(!t)return {error:'no attachment table'};
                let count=Number(t.getProperty('rowCount'))||0;
                return {count,rows:Array.from({length:Math.min(count,50)},(_,i)=>t.getRowData(i))};
            }""")
            if attachments.get("error"):raise RuntimeError(attachments["error"])
            rec["count"]=attachments["count"]
            if rec["count"]>len(attachments["rows"]):rec["warning"]="More than 50 attachments"
            for doc in attachments["rows"]:
                if not doc or not doc.get("ImageId"):continue
                f={k:doc.get(k) for k in ("ImageId","FileDescription","FileName","Originator","FileType","DateUploaded")}
                text=" ".join(str(f.get(k,"")) for k in ("FileName","FileDescription","Originator")).lower()
                f["metadata_hits"]=sorted(set(t for t in TERMS if t in text))
                if str(f.get("FileType","")).lower()=="pdf" or str(f.get("FileName","")).lower().endswith(".pdf"):
                    link=BASE+f"TaxLink.ImageServer.cls?ImageID={doc['ImageId']}&Decrypt=0"
                    try:
                        resp=await ctx.request.get(link,timeout=30000)
                        f["http_status"]=resp.status
                        raw=await resp.body()
                        f.update(parse_pdf(raw))
                        if f.get("pdf") and (f.get("metadata_hits") or f.get("text_hits")):
                            folder=OUT/"giga_original_pdfs"/str(r["DocumentId"])
                            folder.mkdir(exist_ok=True,parents=True)
                            out=folder/f"{r['PermitID']}_ImageID_{doc['ImageId']}.pdf"
                            out.write_bytes(raw)
                            f["saved_file"]=str(out)
                    except Exception as exc:f["file_error"]=str(exc)[:180]
                if f.get("metadata_hits") or f.get("text_hits"):
                    rec["hits"].append({"ImageId":doc["ImageId"],"filename":f.get("FileName"),
                                        "metadata":f["metadata_hits"],"text":f.get("text_hits",[])})
                rec["attachments"].append(f)
        except Exception as exc:rec["error"]=str(exc)[:240]
        return rec

    while True:
        r=await queue.get()
        if r is None:break
        rec=await process(r)
        async with lock:
            results.append(rec)
            n=len(results)
            if rec["hits"]:
                print("GIGA MATCH",rec["PermitID"],rec["HouseNumber"],rec["Location"],json.dumps(rec["hits"]),flush=True)
            if n%20==0:
                print("CHECKED",n,"/",len(targets),"MATCHES",sum(bool(x["hits"]) for x in results),
                    "ERRORS",sum(bool(x.get("error")) for x in results),flush=True)
                (OUT/"progress.json").write_text(json.dumps({"checked":n,"total":len(targets),"matches":[x for x in results if x["hits"]],"errors":[x for x in results if x.get("error")]},indent=2))
        await asyncio.sleep(0.12)
    await ctx.close()
    await browser.close()

async def main():
    async with async_playwright() as pw:
        await asyncio.gather(*(worker(i,pw) for i in range(4)))
    matched=[x for x in results if x["hits"]]
    (OUT/"all_attachment_results.json").write_text(json.dumps(results,indent=2))
    (OUT/"giga_matches.json").write_text(json.dumps(matched,indent=2))
    summary={
        "total_candidates":len(targets),"processed":len(results),"matches":len(matched),
        "original_pdfs":sum(sum(bool(f.get("pdf")) for f in x["attachments"]) for x in results),
        "unsearchable_pdfs":sum(sum(bool(f.get("pdf")) and not f.get("text_chars",0) for f in x["attachments"]) for x in results),
        "errors":[{"PermitID":x["PermitID"],"DocumentId":x["DocumentId"],"error":x["error"]} for x in results if x.get("error")]
    }
    (OUT/"summary.json").write_text(json.dumps(summary,indent=2))
    print("FINAL SUMMARY",json.dumps(summary),flush=True)
    return 0 if len(results)==len(targets) else 1
if __name__=="__main__":sys.exit(asyncio.run(main()))
