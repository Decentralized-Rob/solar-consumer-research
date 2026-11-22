"""Fetch original downloadable permit documents for ONE verified Brimfield Sunrun project.
Never create derivative files in ORIGINALS. Keep browser diagnostics to establish access.
"""
import asyncio,json,hashlib,re
from pathlib import Path
from urllib.parse import urljoin,parse_qs
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
ROOT=Path("brimfield_sunrun_single");ROOT.mkdir(exist_ok=True)
ADDRESS="285 BROOKFIELD ROAD"
APPS={"25-00300","25-00299","25-00313"}
records=[]; files=[]; seen=set()
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  response=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
  await page.wait_for_timeout(1700)
  print("DASHBOARD",response.status if response else None,flush=True)
  opts=await page.locator("#filterWhat option").evaluate_all("""els=>els.map(e=>({value:e.value,text:e.textContent}))""")
  print("FILTER_OPTIONS",json.dumps(opts)[:5000],flush=True)
  await page.locator("#filterWhat").select_option("address")
  await page.locator("#filterOperator").select_option("contains")
  await page.locator("input.filterWhere:visible").first.fill("285 BROOKFIELD")
  await page.locator("#filterShow").click()
  await page.wait_for_timeout(1700)
  body=(await page.locator("body").inner_text())
  print("DASHBOARD_RESULT_TEXT",body[-4500:],flush=True)
  trs=await page.locator("tr").evaluate_all("""els=>els.map(x=>({text:x.innerText,html:x.outerHTML.slice(0,1800),links:[...x.querySelectorAll('a[href]')].map(a=>({url:a.getAttribute('href'),text:a.textContent}))})).filter(x=>/25-00/.test(x.text))""")
  (ROOT/"dashboard_rows.json").write_text(json.dumps(trs,indent=2))
  print("FILTER_ROWS",len(trs),json.dumps(trs[:9])[:9000],flush=True)
  for row in trs:
   app=next((a for a in APPS if a in row["text"]),None)
   if not app:continue
   href=next((a["url"] for a in row["links"] if a["url"] and "act=process" in a["url"]),None)
   if not href:
    print("NO_PROCESS_LINK",app,row["html"][:800],flush=True)
    continue
   url=urljoin(BASE,href)
   resp=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(1050)
   data=await page.evaluate("""()=>({
    title:document.title,url:location.href,
    text:document.body?.innerText||'',
    links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,label:a.closest('tr')?.innerText?.slice(0,300)||a.innerText.slice(0,180),title:a.title||''})),
    iframe:[...document.querySelectorAll('iframe')].map(e=>e.src)
   })""")
   (ROOT/(app+"_record.json")).write_text(json.dumps(data,indent=2))
   print("RECORD",app,"HTTP",resp.status if resp else None,"URL",url,"CHARS",len(data["text"]),"APP_IN_TEXT",app in data["text"],"ADDRESS_IN_TEXT","285 BROOKFIELD" in data["text"].upper(),"LINKS",len(data["links"]),flush=True)
   print("RECORD_TEXT",app,data["text"][:3800].replace("\n"," | "),flush=True)
   print("LINKS",app,json.dumps(data["links"][:55])[:6500],flush=True)
   records.append({"app":app,"record_url":url,"data":data,"http":resp.status if resp else None})
   # PermitPro exposes source application/permit views through act=form/view and
   # act=form/certificate, rather than conventional .pdf links.
   forms=[x["href"] for x in data["links"] if "act=form/" in x["href"]]
   for idx,form_url in enumerate(forms):
    try:
     response=await ctx.request.get(form_url,timeout=35000)
     body=await response.body()
     headers=response.headers
     ispdf=body.startswith(b"%PDF-")
     print("DOCUMENT_ROUTE",app,"URL",form_url,"HTTP",response.status,"CTYPE",headers.get("content-type"),"BYTES",len(body),"PDF",ispdf,"HEAD",repr(body[:140]),flush=True)
     if ispdf:
      digest=hashlib.sha256(body).hexdigest()
      fname=f"{app}_{idx+1:02d}_{digest[:16]}.pdf"
      (ROOT/fname).write_bytes(body)
      files.append({"app":app,"filename":fname,"source":form_url,"bytes":len(body),"sha256":digest,"source_type":"original_server_pdf"})
      print("ORIGINAL_PDF",app,fname,len(body),flush=True)
     else:
      # Record the portal's actual document view and identify print/download commands.
      sub=await ctx.new_page()
      rr=await sub.goto(form_url,wait_until="domcontentloaded",timeout=30000)
      await sub.wait_for_timeout(600)
      detail=await sub.evaluate("""()=>({
       title:document.title,url:location.href,text:(document.body?.innerText||'').slice(0,40000),
       links:[...document.querySelectorAll('a[href]')].map(a=>({url:a.href,text:a.innerText.slice(0,100)})),
       elements:[...document.querySelectorAll('button,input,iframe,embed,object')].slice(0,100).map(x=>({tag:x.tagName,outer:x.outerHTML.slice(0,500)}))
      })""")
      (ROOT/f"{app}_form_{idx+1:02d}.json").write_text(json.dumps(detail,indent=2))
      print("VIEW_DETAIL",app,idx+1,"HTTP",rr.status if rr else None,"TEXT",detail["text"][:2200].replace("\n"," | "),"LINKS",json.dumps(detail["links"][:25])[:2000],"ELEMENTS",json.dumps(detail["elements"][:15])[:2400],flush=True)
      try:
       rendered=await sub.pdf(format="Letter",print_background=True)
       if rendered.startswith(b"%PDF-"):
        digest=hashlib.sha256(rendered).hexdigest()
        fname=f"{app}_portal_export_{idx+1:02d}_{digest[:12]}.pdf"
        (ROOT/fname).write_bytes(rendered)
        files.append({"app":app,"filename":fname,"source":form_url,"bytes":len(rendered),"sha256":digest,"source_type":"browser_export_of_public_portal_document_view"})
        print("PORTAL_PRINT_PDF",app,fname,len(rendered),flush=True)
      except Exception as e:print("PRINT_ERROR",app,repr(e)[:150],flush=True)
      await sub.close()
    except Exception as e:print("FORM_ROUTE_ERROR",app,repr(e)[:250],flush=True)
   urls=list(dict.fromkeys(x["href"] for x in data["links"] if ".s3.amazonaws.com/" in x["href"] or re.search(r"\.pdf($|\?)",x["href"],re.I)))
   print("PDF_CANDIDATES",app,len(urls),flush=True)
   for link in urls:
    if link in seen:continue
    seen.add(link)
    try:
     r=await ctx.request.get(link,timeout=25000)
     content=await r.body()
     if not content.startswith(b"%PDF-"):
      print("NOT_PDF",app,r.status,len(content),link[:180],flush=True)
      continue
     sha=hashlib.sha256(content).hexdigest()
     out=ROOT/(app+"_"+sha[:16]+".pdf")
     out.write_bytes(content)
     record={"app":app,"filename":out.name,"source":link,"bytes":len(content),"sha256":sha}
     files.append(record)
     print("ORIGINAL_PDF",json.dumps(record),flush=True)
    except Exception as e:print("DOWNLOAD_ERROR",app,repr(e)[:240],flush=True)
  (ROOT/"manifest.json").write_text(json.dumps({"municipality":"Brimfield, MA","address":ADDRESS,"application_ids":sorted(APPS),"records":[{"app":r["app"],"url":r["record_url"],"http":r["http"],"text":r["data"]["text"][:3500]} for r in records],"originals":files},indent=2))
  print("FINAL",len(records),"RECORDS",len(files),"ORIGINAL_PDFS",flush=True)
  await ctx.close();await browser.close()
asyncio.run(main())
