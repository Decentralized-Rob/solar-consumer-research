"""Capture one Brimfield property: original public record views printed to PDF.

15 Mill Lane Road: solar 22-00441, roof 22-00442, electrical 22-00443.
These are faithfully captured HTML view exports, NOT original uploaded PDFs.
"""
import asyncio,hashlib,json,re
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
OUT=Path("brimfield_15_mill_lane");OUT.mkdir(exist_ok=True)
RECORDS=[
 ("22-00441","2282","solar"),
 ("22-00442","2283","roof"),
 ("22-00443","2284","electrical")
]
manifest=[]
async def main():
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(headless=True)
  context=await browser.new_context(accept_downloads=True)
  for app,id,kind in RECORDS:
   page=await context.new_page()
   url=f"{BASE}index.php?act=process&id={id}"
   try:
    res=await page.goto(url,wait_until="domcontentloaded",timeout=32000)
    await page.wait_for_timeout(600)
    data=await page.evaluate("""()=>({
     url:location.href,text:document.body?.innerText||"",
     links:[...document.querySelectorAll('a[href]')].map(a=>({url:a.href,label:(a.closest('tr')?.innerText||a.innerText||'').slice(0,250)}))
    })""")
    print("PROCESS",app,id,kind,"STATUS",res.status if res else 0,"APP_CORRECT",app in data["text"],"ADDRESS","15 MILL LANE" in data["text"].upper(),flush=True)
    print("PROCESS_TEXT",app,json.dumps(data["text"][:9000]),flush=True)
    print("PROCESS_LINKS",app,json.dumps(data["links"][:35]),flush=True)
    if app not in data["text"] or "15 MILL LANE" not in data["text"].upper():
     print("FATAL_MISMATCH",app,flush=True);continue
    (OUT/f"{app}_process.json").write_text(json.dumps(data,indent=2))
    forms=[x for x in data["links"] if "act=form/view/" in x["url"] or "act=form/certificate/" in x["url"]]
    for n,form in enumerate(forms,1):
     fpage=await context.new_page()
     try:
      fresponse=await fpage.goto(form["url"],wait_until="domcontentloaded",timeout=32000)
      await fpage.wait_for_timeout(600)
      detail=await fpage.evaluate("""()=>({
       text:document.body?.innerText||"",
       url:location.href,
       links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,title:a.title||"",text:a.innerText?.slice(0,100)}))
      })""")
      correct=app in detail["text"] or (
        ("certificate" in form["url"]) and "15 MILL LANE" in detail["text"].upper()
      )
      print("DOCUMENT",app,n,"STATUS",fresponse.status if fresponse else 0,"MATCH",correct,"SOURCE",form["url"],"LABEL",form["label"][:120],flush=True)
      print("DOCUMENT_TEXT",app,n,json.dumps(detail["text"][:15000]),flush=True)
      if not correct:continue
      pdf=await fpage.pdf(format="Letter",print_background=True,margin={"top":"0.30in","bottom":"0.30in","left":"0.30in","right":"0.30in"},prefer_css_page_size=False)
      if not pdf.startswith(b"%PDF-"):continue
      digest=hashlib.sha256(pdf).hexdigest()
      typ="permit" if "certificate" in form["url"] else "application"
      filename=f"{app}_{kind}_{typ}_{n:02d}_{digest[:10]}.pdf"
      (OUT/filename).write_bytes(pdf)
      (OUT/f"{app}_{kind}_{typ}_{n:02d}.json").write_text(json.dumps(detail,indent=2))
      manifest.append({"app":app,"kind":kind,"type":typ,"label":form["label"],"source_url":form["url"],"record_url":url,"filename":filename,"bytes":len(pdf),"sha256":digest,"source_type":"Browser-generated PDF export of town's public PermitPro form HTML"})
      print("PDF_CAPTURED",app,filename,len(pdf),digest,flush=True)
     except Exception as e:print("FORM_ERROR",app,n,repr(e)[:280],flush=True)
     finally:await fpage.close()
   except Exception as e:print("PROCESS_ERROR",app,repr(e)[:350],flush=True)
   finally:await page.close()
  (OUT/"manifest.json").write_text(json.dumps(manifest,indent=2))
  print("RESULT",len(manifest),"PDFS",len(RECORDS),"RECORDS",flush=True)
  await context.close();await browser.close()
asyncio.run(main())
