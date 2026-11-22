"""Check next Brimfield Sunrun project at 30 St George Rd for roof permits and source docs."""
import asyncio,copy,json,re,hashlib
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
TARGET="30 ST GEORGE ROAD"
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  capture=[]
  def onreq(req):
   if "mode=getResults" in req.url:
    try:capture.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
    except Exception as e:print("CAPTURE_ERROR",repr(e),flush=True)
  page.on("request",onreq)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
  await page.wait_for_timeout(1300)
  tpl=capture[0]
  defs=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  meta={d["fieldName"]:d for d in defs if isinstance(d,dict) and "fieldName" in d}
  names=["address","location-parcelID","applicantCompany","applicantName","contractorCompany","contractorName","proposedWorkDescription"]
  obj=copy.deepcopy(tpl)
  obj["activeDashboardView"]["selectedFieldNames"]=list(dict.fromkeys(obj["activeDashboardView"]["selectedFieldNames"]+names))
  obj["activeDashboardView"]["modified"]=True
  obj["activeDashboardView"]["filters"]=[{"what":"address","operator":"contains","where":"30 ST GEORGE","show":True,"collection":"formdata","dataType":"string","valueType":"string"}]
  fd=obj["resultsSettings"]["fieldData"][:]
  for n in names:
   if n not in [x.get("fieldName") for x in fd]:
    fd.append(meta.get(n,{"fieldName":n,"friendlyName":n,"dataType":"string","collection":"formData"}))
  obj["resultsSettings"].update({"skip":0,"limit":100,"fieldData":fd})
  resp=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(obj)},timeout=30000)
  res=await resp.json()
  print("ADDR_RESULTS",resp.status,res["resultsSettings"].get("totalSearchResults"),len(res.get("resultsData",[])),flush=True)
  hits=[r for r in res.get("resultsData",[]) if r.get("address","").upper().strip().startswith("30 ST GEORGE")]
  for rec in hits:
   print("PERMIT",json.dumps({k:rec.get(k) for k in ["_id","Application ID","Application Date","Permit Number","Date Issued","address","location-parcelID","type","status","applicantCompany","applicantName","contractorCompany","contractorName","proposedWorkDescription"]},ensure_ascii=False),flush=True)
  ids=[str(rec["_id"]) for rec in hits]
  for id in ids:
   url=BASE+"index.php?act=process&id="+id
   try:
    rr=await page.goto(url,wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(400)
    entry=await page.evaluate("""()=>({text:(document.body?.innerText||'').slice(0,30000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,label:(a.closest('tr')?.innerText||a.innerText||'').slice(0,180)}))})""")
    print("PROCESS",id,"HTTP",rr.status if rr else None,"TEXT",json.dumps(entry["text"],ensure_ascii=False)[:7000],flush=True)
    forms=[x for x in entry["links"] if "act=form/view" in x["href"] or "act=form/certificate" in x["href"]]
    print("DOC_LINKS",id,json.dumps(forms,ensure_ascii=False)[:4500],flush=True)
    for form in forms:
     try:
      res2=await ctx.request.get(form["href"],timeout=28000)
      raw=await res2.body()
      print("FORM_HTTP",id,res2.status,res2.headers.get("content-type"),"PDF",raw.startswith(b"%PDF-"),"URL",form["href"],flush=True)
      if raw.startswith(b"%PDF-"):
       print("PDF_SHA",id,hashlib.sha256(raw).hexdigest(),"BYTES",len(raw),flush=True)
      else:
       docpg=await ctx.new_page()
       await docpg.goto(form["href"],wait_until="domcontentloaded",timeout=28000)
       detail=await docpg.evaluate("""()=>({text:(document.body?.innerText||'').slice(0,24000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,label:a.innerText.slice(0,100)}))})""")
       print("FORM_TEXT",id,json.dumps(detail["text"],ensure_ascii=False)[:11500],flush=True)
       print("FORM_EXTRA_LINKS",id,json.dumps([x for x in detail["links"] if "s3.amazonaws" in x["href"] or ".pdf" in x["href"].lower()],ensure_ascii=False),flush=True)
       await docpg.close()
     except Exception as ex:print("FORM_ERROR",id,repr(ex)[:300],flush=True)
   except Exception as ex:print("RECORD_ERROR",id,repr(ex)[:300],flush=True)
  print("FINISHED_RECORDS",len(hits),flush=True)
  await ctx.close();await browser.close()
asyncio.run(main())
