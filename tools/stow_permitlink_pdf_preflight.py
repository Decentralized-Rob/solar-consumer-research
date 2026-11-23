"""One genuine original-PDF download check for Stow MA PermitLink public permits."""
import asyncio, hashlib, json, re, sys
from pathlib import Path
from playwright.async_api import async_playwright

BASE="https://permitlinkusa-online.com/csp/stowma/"
OUT=Path("stow_permitlink_pdf_preflight")
OUT.mkdir(exist_ok=True)

async def main():
 audit={"municipality":"Stow, MA","platform":"PermitLink","tested":[]}
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  try:
   resp=await page.goto(BASE+"DocumentLink.PublicPermitListCenter.cls",wait_until="domcontentloaded",timeout=45000)
   audit["index_status"]=resp.status if resp else None
   await page.wait_for_timeout(900)
   permits=await page.evaluate("""() => {
     if(!window.zenPage)return {error:'No zenPage'};
     const t=zenPage.getComponentById('table');
     if(!t)return {error:'No permit table'};
     const count=Number(t.getProperty('rowCount'))||0;
     return {count,rows:Array.from({length:Math.min(count,22)},(_,i)=>t.getRowData(i))};
   }""")
   audit["public_permits"]=permits.get("count")
   if "rows" not in permits:raise RuntimeError("Permit list: "+json.dumps(permits))
   rows=permits["rows"]
   priority=lambda r: 0 if re.search(r"roof|solar|shingle|photovoltaic",str(r.get("WorkDescription","")),re.I) else 1
   rows=sorted(rows,key=priority)
   print("Index HTTP",audit["index_status"],"rows",audit["public_permits"],flush=True)
   for row in rows[:18]:
    document_id=row.get("DocumentId")
    maid=row.get("Maid")
    if not document_id or not maid:continue
    entry={"permit":row.get("PermitID"),"address":str(row.get("HouseNumber",""))+" "+str(row.get("Location","")),
          "document_id":document_id,"maid":maid,"description":str(row.get("WorkDescription",""))[:180]}
    audit["tested"].append(entry)
    url=BASE+f"DocumentLink.PublicAttachmentCenter.cls?DocumentId={document_id}&QueryId={document_id}&Maid={maid}"
    try:
     res=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
     if not res or res.status!=200:entry["error"]="Attachment page HTTP "+str(res.status if res else "missing");continue
     await page.wait_for_timeout(500)
     at=await page.evaluate("""() => {
       const t=window.zenPage?.getComponentById('table');
       if(!t)return {error:'No attachment table'};
       const count=Number(t.getProperty('rowCount'))||0;
       return {count,rows:Array.from({length:Math.min(count,30)},(_,i)=>t.getRowData(i))};
     }""")
     entry["attachments_count"]=at.get("count")
     if "rows" not in at:entry["error"]=at.get("error");continue
     docs=[d for d in at["rows"] if d and d.get("ImageId")]
     for d in docs[:8]:
      image_id=d["ImageId"]
      link=BASE+f"TaxLink.ImageServer.cls?ImageID={image_id}&Decrypt=0"
      try:
       r=await ctx.request.get(link,timeout=30000)
       raw=await r.body()
       pdf=raw.startswith(b"%PDF-") and len(raw)>100
       entry.setdefault("file_tests",[]).append({"image_id":image_id,"name":d.get("FileName"),"http_status":r.status,"content_type":r.headers.get("content-type"),"bytes":len(raw),"valid_pdf_magic":pdf})
       if pdf:
        path=OUT/f"stow_{document_id}_image_{image_id}.pdf"
        path.write_bytes(raw)
        audit["verified_original_pdf"]={"file":str(path),"source_url":link,"permit":entry["permit"],"address":entry["address"],
          "bytes":len(raw),"sha256":hashlib.sha256(raw).hexdigest(),"image_id":image_id,"document_id":document_id}
        print("PASS PDF",json.dumps(audit["verified_original_pdf"]),flush=True)
        break
      except Exception as e: entry.setdefault("file_errors",[]).append(str(e)[:160])
     if "verified_original_pdf" in audit:break
    except Exception as e:entry["error"]=str(e)[:200]
  except Exception as e:
   audit["fatal_error"]=repr(e)
  finally:
   (OUT/"audit.json").write_text(json.dumps(audit,indent=2))
   try:await page.screenshot(path=str(OUT/"last_page.png"),full_page=True)
   except Exception:pass
   await browser.close()
 print("FINAL RESULT","PASS" if audit.get("verified_original_pdf") else "FAIL",flush=True)
 return 0 if audit.get("verified_original_pdf") else 1

if __name__=="__main__":sys.exit(asyncio.run(main()))
