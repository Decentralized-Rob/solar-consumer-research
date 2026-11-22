"""Diagnose Boylston PermitPro dashboard API without assuming Brimfield schema."""
import json,asyncio,copy
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://boylston.patriotpermitpro.com/"
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True);ctx=await b.new_context();page=await ctx.new_page()
  requests=[]
  def cap(r):
   if "mode=getResults" in r.url:
    try: requests.append(json.loads(parse_qs(r.post_data or "").get("jsonData",["{}"])[0]))
    except Exception as ex:print("PARSEERR",repr(ex))
  page.on("request",cap)
  r=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await page.wait_for_timeout(2200)
  print("PAGE",r.status,"templates",len(requests),flush=True)
  if not requests:
   print("PAGE_TEXT",(await page.locator("body").inner_text())[:1800]);return
  t=requests[0]
  print("ORIG_TEMPLATE",json.dumps(t)[:10000],flush=True)
  meta=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  defs={x["fieldName"]:x for x in meta if isinstance(x,dict) and "fieldName" in x}
  tests=[]
  tests.append(("as-is",copy.deepcopy(t)))
  for size in [25,100]:
   d=copy.deepcopy(t);d["resultsSettings"].update({"skip":0,"limit":size});tests.append((f"original-limit-{size}",d))
  d=copy.deepcopy(t)
  d["activeDashboardView"].update({"selectedFieldNames":list(dict.fromkeys(t["activeDashboardView"]["selectedFieldNames"]+["applicantCompany","contractorCompany","applicantName","contractorName"])),"modified":True,"filters":[]})
  d["resultsSettings"].update({"skip":0,"limit":25})
  for name in ["applicantCompany","contractorCompany","applicantName","contractorName"]:
   if name not in [x.get("fieldName") for x in d["resultsSettings"]["fieldData"]]:
    d["resultsSettings"]["fieldData"].append(defs[name])
  tests.append(("small-added-4",d))
  for term in ["Giga","Sunrun"]:
   for field in ["applicantCompany","contractorName"]:
    d=copy.deepcopy(t)
    d["activeDashboardView"].update({"filters":[{"what":field,"operator":"contains","where":term,"show":True,"collection":defs[field].get("collection","formData"),"dataType":defs[field].get("dataType","string"),"valueType":"string"}]})
    d["resultsSettings"].update({"skip":0,"limit":25})
    tests.append((f"filter-{field}-{term}",d))
  for label,d in tests:
   try:
    resp=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=25000)
    raw=await resp.text()
    print("TEST",label,"STATUS",resp.status,"LENGTH",len(raw),"START",raw[:250].replace("\\n"," "),flush=True)
    if resp.ok:
     try:
      js=json.loads(raw)
      print("TOTAL",label,js.get("resultsSettings",{}).get("totalSearchResults"),"ROWS",len(js.get("resultsData",[])),"FIRST",json.dumps(js.get("resultsData",[])[:1])[:400],flush=True)
     except Exception as ex:print("ERRJSON",repr(ex))
   except Exception as ex:print("EXCEPTION",label,repr(ex)[:200],flush=True)
  await b.close()
asyncio.run(main())
