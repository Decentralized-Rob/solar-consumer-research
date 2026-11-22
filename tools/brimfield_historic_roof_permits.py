"""Inspect the two older Brimfield Building Envelope records at 285 Brookfield Rd."""
import asyncio,json,re
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context()
  page=await context.new_page()
  for id in ["875","1140"]:
   url=BASE+"index.php?act=process&id="+id
   try:
    resp=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(500)
    data=await page.evaluate("""()=>({title:document.title,text:(document.body?.innerText||'').slice(0,20000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,label:a.closest('tr')?.innerText?.slice(0,250)||a.textContent?.trim().slice(0,100)}))})""")
    print("HISTORIC_RECORD",id,"HTTP",resp.status if resp else None,"URL",url,flush=True)
    print("HISTORIC_TEXT",id,json.dumps(data["text"],ensure_ascii=False),flush=True)
    form_links=[x["href"] for x in data["links"] if "act=form/" in x["href"]]
    print("HISTORIC_FORMS",id,json.dumps(form_links),flush=True)
    for ii,link in enumerate(form_links):
     response=await context.request.get(link,timeout=30000)
     raw=await response.body()
     print("FORM_RESPONSE",id,ii,"HTTP",response.status,"CTYPE",response.headers.get("content-type"),"BYTES",len(raw),"PDF",raw.startswith(b"%PDF-"),flush=True)
     if raw.startswith(b"%PDF-"): 
      # PDF indexed text via pypdf if available, but do not display unrelated personal data
      try:
       import fitz
       doc=fitz.open(stream=raw,filetype="pdf")
       txt="\n".join(p.get_text() for p in doc)
       print("FORM_TEXT_PDF",id,ii,json.dumps(txt[:14000],ensure_ascii=False),flush=True)
      except Exception as ex:print("FORM_PDF_TEXT_ERROR",id,ii,repr(ex),flush=True)
     else:
      docpage=await context.new_page()
      try:
       rr=await docpage.goto(link,wait_until="domcontentloaded",timeout=30000)
       await docpage.wait_for_timeout(450)
       detail=await docpage.evaluate("""()=>({text:(document.body?.innerText||'').slice(0,15000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.innerText?.slice(0,90)}))})""")
       print("FORM_TEXT_HTML",id,ii,"HTTP",rr.status if rr else None,json.dumps(detail,ensure_ascii=False)[:17000],flush=True)
      finally:await docpage.close()
   except Exception as ex:print("HISTORIC_ERROR",id,repr(ex)[:400],flush=True)
  await context.close();await browser.close()
asyncio.run(main())
