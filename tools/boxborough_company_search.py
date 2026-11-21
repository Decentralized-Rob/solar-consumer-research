"""Independent Giga and Sunrun searches of Boxborough public PermitPro backend.
Uses the publicly available getResults endpoint and the UI-supplied field definitions.
"""
import asyncio,copy,json
from pathlib import Path
from urllib.parse import parse_qs
from playwright.async_api import async_playwright

BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_company_search");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  requests=[]
  def onreq(r):
   if "mode=getResults" in r.url:
    d=parse_qs(r.post_data or "")
    try:requests.append(json.loads(d.get("jsonData",["{}"])[0]))
    except:pass
  page.on("request",onreq)
  try:
   await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(3200)
   if not requests:
    print("NO_STANDARD_GETRESULTS",flush=True);return
   template=requests[0]
   response=await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData",timeout=35000)
   raw=await response.text()
   print("FIELDS_HTTP",response.status,"LENGTH",len(raw),"FIRST",raw[:1000],flush=True)
   try:fieldpayload=json.loads(raw)
   except:fieldpayload={}
   def finddefs(obj):
    result=[]
    if isinstance(obj,dict):
     if "fieldName" in obj:
      result.append(obj)
     for v in obj.values():result+=finddefs(v)
    if isinstance(obj,list):
     for v in obj:result+=finddefs(v)
    return result
   defs=finddefs(fieldpayload)
   interesting=["contractorCompany","contractorName","applicantName","applicantCompany","firmName","proposedWorkDescription"]
   lookup={str(x["fieldName"]).lower():x for x in defs if "fieldName" in x}
   print("FIELD_COUNT",len(defs),"DESIRED",json.dumps({x:lookup.get(x.lower()) for x in interesting})[:7000],flush=True)
   (OUT/"company_field_metadata.json").write_text(json.dumps({x:lookup.get(x.lower()) for x in interesting},indent=2))
   selected=["Application ID","Application Date","_type","status","address"]
   for x in interesting[:5]:
    if x.lower() in lookup:selected.append(lookup[x.lower()]["fieldName"])
   successes={}
   allresults={}
   searches=[
    ("giga","Giga","contractorCompany"),
    ("giga","Espigar","contractorName"),
    ("giga","Giga","applicantCompany"),
    ("giga","Giga","applicantName"),
    ("sunrun","Sunrun","contractorCompany"),
    ("sunrun","Sun Run","contractorCompany"),
    ("sunrun","Sunrun","applicantCompany"),
    ("sunrun","Sunrun","applicantName"),
   ]
   for company,term,fname in searches:
    f=lookup.get(fname.lower())
    if not f:
     print("SKIP_UNKNOWN_FIELD",company,term,fname,flush=True);continue
    payload=copy.deepcopy(template)
    payload["activeDashboardView"]["selectedFieldNames"]=selected
    payload["activeDashboardView"]["filters"]=[{
      "what":f["fieldName"],"operator":"contains","where":term,
      "show":True,"collection":f.get("collection","formdata"),
      "dataType":f.get("dataType","string"),"valueType":"string"
    }]
    payload["activeDashboardView"]["modified"]=True
    payload["resultsSettings"]["skip"]=0
    payload["resultsSettings"]["limit"]=100
    payload["resultsSettings"]["fieldData"]=template["resultsSettings"]["fieldData"] + [lookup[x.lower()] for x in interesting[:5] if x.lower() in lookup]
    r=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(payload)},timeout=40000)
    body=await r.text()
    try:data=json.loads(body)
    except:data={"raw":body[:3000]}
    record={"status":r.status,"company":company,"term":term,"field":fname,"keys":list(data.keys()),"preview":str(data)[:1800]}
    print("COMPANY_SEARCH",company,term,fname,"HTTP",r.status,"BYTES",len(body),"PREVIEW",str(data)[:1050],flush=True)
    allresults[f"{company}_{term}_{fname}"]=data
    successes[f"{company}_{term}_{fname}"]=record
   (OUT/"search_diagnostics.json").write_text(json.dumps(successes,indent=2))
   (OUT/"all_public_search_results.json").write_text(json.dumps(allresults,indent=2))
   print("SEARCH_QUERIES",len(successes),flush=True)
  except Exception as e:
   print("ERROR",repr(e)[:1300],flush=True)
   (OUT/"error.txt").write_text(repr(e))
  finally:await ctx.close();await browser.close()
asyncio.run(main())
