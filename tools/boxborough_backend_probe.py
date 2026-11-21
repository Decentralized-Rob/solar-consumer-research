"""Boxborough PermitPro independent server-side Giga and Sunrun search."""
import asyncio,copy,json,re
from pathlib import Path
from urllib.parse import parse_qs
from playwright.async_api import async_playwright

BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_backend_probe")
OUT.mkdir(exist_ok=True)
fields=["contractorCompany","applicantCompany","contractorName","applicantName","proposedWorkDescription"]
terms={"giga":["Giga","Espigar"],"sunrun":["Sunrun","Sun Run"]}
def shortrows(obj):
    if isinstance(obj,dict):
        for k,v in obj.items():
            if isinstance(v,list) and v and isinstance(v[0],(dict,list,str)):
                print("ARRAY",k,len(v),json.dumps(v[:2],default=str)[:1800],flush=True)
            if isinstance(v,dict):print("OBJ",k,list(v)[:12],flush=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context()
  page=await ctx.new_page()
  captured=[]
  def watch(req):
   if "mode=getResults" in req.url:
    try: captured.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
    except Exception as e: print("CAPTURE_ERROR",str(e),flush=True)
  page.on("request",watch)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
  await page.wait_for_timeout(2300)
  if not captured:
   print("ERROR_NO_INITIAL_REQUEST",flush=True);return
  model=captured[0]
  print("INITIAL_REQUEST",json.dumps(model)[:1400],flush=True)
  async def query(label, filters=None, search="", extras=None,skip=0,limit=100):
   o=copy.deepcopy(model)
   o["activeDashboardView"]["filters"]=filters or []
   o["resultsSettings"]["searchValue"]=search
   o["resultsSettings"]["skip"]=skip
   o["resultsSettings"]["limit"]=limit
   for f in extras or []:
    if f not in o["activeDashboardView"]["selectedFieldNames"]:
     o["activeDashboardView"]["selectedFieldNames"].append(f)
     o["resultsSettings"]["fieldData"].append({"fieldName":f,"friendlyName":f,"dataType":"string","collection":"formdata"})
   try:
    r=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(o)},timeout=35000)
    t=await r.text()
    j=json.loads(t)
    print("QUERY",label,"HTTP",r.status,"BYTES",len(t),"KEYS",list(j),"COUNTS",{k:v for k,v in j.items() if "total" in k.lower() or "count" in k.lower()},"SETTINGS",{k:v for k,v in j.get("resultsSettings",{}).items() if "total" in k.lower() or "count" in k.lower()},flush=True)
    shortrows(j)
    (OUT/(re.sub("[^a-zA-Z0-9_-]","_",label)+".json")).write_text(json.dumps(j,indent=2))
    return j
   except Exception as e: print("QUERY_ERROR",label,str(e)[:500],flush=True)
  await query("sample_default",limit=20)
  for role,variants in terms.items():
   for term in variants:
    for field in fields:
     await query(f"{role}_{term.replace(' ','')}_{field}",filters=[{"what":field,"operator":"contains","where":term,"show":True,"collection":"formdata","dataType":"string","valueType":"string"}],extras=[field],limit=50)
    await query(f"{role}_{term.replace(' ','')}_global",search=term,extras=fields,limit=50)
  await ctx.close()
  await b.close()
asyncio.run(main())
