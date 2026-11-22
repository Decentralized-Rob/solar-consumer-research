"""One-property verification: prior roof permits at 285 Brookfield Rd, parcel 3 B 11."""
import asyncio,copy,json,re
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context()
  page=await ctx.new_page();templates=[]
  def onreq(q):
   if "mode=getResults" in q.url:
    try: templates.append(json.loads(parse_qs(q.post_data).get("jsonData",["{}"])[0]))
    except:pass
  page.on("request",onreq)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=35000)
  await page.wait_for_timeout(1300)
  metadata=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  defs={d["fieldName"]:d for d in metadata if isinstance(d,dict) and "fieldName" in d}
  template=templates[0]
  selected=list(dict.fromkeys(template["activeDashboardView"]["selectedFieldNames"]+["location-parcelID","address","applicantCompany","applicantName","contractorName","proposedWorkDescription"]))
  fielddata=template["resultsSettings"]["fieldData"][:]
  for k in selected:
   if k not in [x.get("fieldName") for x in fielddata]:
    fielddata.append(defs.get(k,{"fieldName":k,"friendlyName":k,"collection":"formData","dataType":"string"}))
  async def query(field,term):
   data=copy.deepcopy(template)
   data["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[{"what":field,"operator":"contains","where":term,"show":True,"collection":defs.get(field,{}).get("collection","formData"),"dataType":defs.get(field,{}).get("dataType","string"),"valueType":"string"}]})
   data["resultsSettings"].update({"skip":0,"limit":200,"fieldData":fielddata})
   resp=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(data)},timeout=30000)
   j=await resp.json()
   rows=j.get("resultsData",[])
   print("QUERY",field,repr(term),"HTTP",resp.status,"TOTAL",j.get("resultsSettings",{}).get("totalSearchResults"),"ROWS",len(rows),flush=True)
   for r in rows:
    if field=="address" and "285" not in r.get("address",""):continue
    if field=="location-parcelID" and str(r.get("location-parcelID","")).strip().lower().replace(" ","")!="3b11":continue
    print("PROPERTY_RECORD",json.dumps({"application":r.get("Application ID"),"permit":r.get("Permit Number"),"date":r.get("Application Date"),"issued":r.get("Date Issued"),"address":r.get("address"),"parcel":r.get("location-parcelID"),"type":r.get("type"),"work":r.get("proposedWorkDescription"),"id":r.get("_id")},ensure_ascii=False),flush=True)
  for f,t in [("address","285 BROOKFIELD"),("address","BROOKFIELD"),("location-parcelID","3 B 11")]:
   try:await query(f,t)
   except Exception as e:print("QUERY_ERROR",f,repr(e)[:280],flush=True)
  await ctx.close();await browser.close()
asyncio.run(main())
