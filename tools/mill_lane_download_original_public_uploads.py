"""Download every original public attachment for 15 Mill Lane, Brimfield.

Preserve exact public S3 PDF bytes, not browser printouts. Also retain process
metadata for context. Includes all three matching permit records.
"""
import asyncio,hashlib,json,re,csv
from pathlib import Path
from urllib.parse import unquote,urlparse
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
RECORDS={"solar_building":("22-00441","2282")}
ROOT=Path("mill_lane_solar_original_attachments");ROOT.mkdir(parents=True,exist_ok=True)
entries=[]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  for kind,(app,record) in RECORDS.items():
   url=BASE+f"index.php?act=process&id={record}"
   await page.goto(url,wait_until="domcontentloaded",timeout=40000)
   try:
    await page.locator('a[href*="act=form/view/"]').first.wait_for(timeout=15000)
   except Exception as ex: print("FORM_WAIT_TIMEOUT",kind,repr(ex)[:150],flush=True)
   await page.wait_for_timeout(1200)
   data=await page.evaluate("""()=>({
    url:location.href,text:document.body?.innerText||"",
    docs:[...document.querySelectorAll('a[href]')].filter(a=>(a.href.includes('s3.amazonaws.com/')||a.href.includes('act=form/view/')||a.href.includes('act=form/certificate/'))).map(a=>({url:a.href,label:(a.closest('tr')?.innerText||a.innerText||'').slice(0,220)}))
   })""")
   (ROOT/f"{app}_{kind}_record.json").write_text(json.dumps(data,indent=2,ensure_ascii=False))
   print("RECORD",kind,app,len(data["docs"]),"ATTACHMENTS",sum("s3.amazonaws.com/" in d["url"] for d in data["docs"]),flush=True)
   for ix,d in enumerate(data["docs"],1):
    source=d["url"]
    if "s3.amazonaws.com/" not in source:
     entries.append({"kind":kind,"application":app,"type":"town-form-html","name":d["label"],"url":source,"saved_filename":"","status":"LINK_ONLY"})
     continue
    orig=unquote(urlparse(source).path.rsplit("/",1)[-1])
    orig=orig.replace("/","-").replace("\\","-")
    fn=f"{app}_{kind}_{ix:02d}_{orig}"
    fn=fn[:180] if len(fn)>180 else fn
    try:
     r=await ctx.request.get(source,timeout=60000)
     data_bytes=await r.body()
     sha=hashlib.sha256(data_bytes).hexdigest()
     ispdf=data_bytes.startswith(b"%PDF-")
     status=f"HTTP_{r.status}_{'PDF' if ispdf else 'NOT_PDF'}"
     if r.ok and ispdf:
      (ROOT/fn).write_bytes(data_bytes)
     else:
      # diagnostics only; don't store sensitive server error pages
      print("DOWNLOAD_ERROR",app,ix,r.status,r.headers.get("content-type"),repr(data_bytes[:180]),flush=True)
     entries.append({"kind":kind,"application":app,"type":d["label"].split("\t")[0],"name":orig,"url":source,"saved_filename":fn if ispdf and r.ok else "","bytes":len(data_bytes),"sha256":sha,"status":status})
     print("ATTACHMENT",app,ix,status,"SIZE",len(data_bytes),"SHA",sha[:12],"NAME",orig,flush=True)
    except Exception as e:
     entries.append({"kind":kind,"application":app,"type":d["label"].split("\t")[0],"name":orig,"url":source,"saved_filename":"","status":f"ERROR:{e}"})
     print("DOWNLOAD_EXCEPTION",app,ix,repr(e),flush=True)
  with (ROOT/"MANIFEST.csv").open("w",newline="") as f:
   w=csv.DictWriter(f,fieldnames=["kind","application","type","name","url","saved_filename","bytes","sha256","status"],extrasaction="ignore")
   w.writeheader();w.writerows(entries)
  print("SUMMARY",json.dumps({"total":len(entries),"pdf":sum(e.get("status","").endswith("_PDF") for e in entries),"failed":[e["name"] for e in entries if "ERROR" in e.get("status","") or "NOT_PDF" in e.get("status","")]}),flush=True)
  await ctx.close();await browser.close()
asyncio.run(main())
