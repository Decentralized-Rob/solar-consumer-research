"""Fast targeted searches of Westborough public PermitPro application and contractor fields."""
import asyncio,json,copy,re
from pathlib import Path
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://westborough.patriotpermitpro.com/"
OUT=Path("westborough_targeted_search");OUT.mkdir(exist_ok=True)
FIELDS=["applicantCompany","contractorCompany","applicantName","contractorName"]
TERMS=["Giga","Espigar","Sunrun"]
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context()
  page=await ctx.new_page()
  templates=[]
  def capture(r):
   if "mode=getResults" in r.url:
    try:templates.append(json.loads(parse_qs(r.post_data or "").get("jsonData",["{}"])[0]))
    except:pass
  page.on("request",capture)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await page.wait_for_timeout(2000)
  print("TEMPLATES",len(templates),flush=True)
  t=templates[0]
  metadata=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  fielddefs={d["fieldName"]:d for d in metadata if isinstance(d,dict) and d.get("fieldName")}
  selected=list(dict.fromkeys(t["activeDashboardView"]["selectedFieldNames"]+FIELDS+["proposedWorkDescription"]))
  fdata=t["resultsSettings"]["fieldData"][:]
  existing={d.get("fieldName") for d in fdata}
  for field in selected:
   if field not in existing:fdata.append(fielddefs.get(field,{"fieldName":field,"dataType":"string","collection":"formData"}))
  records={}
  for term in TERMS:
   for field in FIELDS:
    d=copy.deepcopy(t)
    fd=fielddefs.get(field,{})
    d["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[{"what":field,"operator":"contains","where":term,"show":True,"collection":fd.get("collection","formData"),"dataType":fd.get("dataType","string"),"valueType":"string"}]})
    d["resultsSettings"].update({"skip":0,"limit":250,"fieldData":fdata})
    try:
     r=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=40000)
     j=await r.json()
     n=int(j.get("resultsSettings",{}).get("totalSearchResults",0))
     rows=j.get("resultsData",[])
     for skip in range(250,n,250):
      d["resultsSettings"]["skip"]=skip
      rr=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=40000)
      rows.extend((await rr.json()).get("resultsData",[]))
     print("FILTER",term,field,"TOTAL",n,"RETURNED",len(rows),flush=True)
     for row in rows:
      ident=row.get("_id") or row.get("Application ID")
      records[str(ident)]=row
      print("MATCH",term,field,json.dumps({"application":row.get("Application ID"),"address":row.get("address"),"id":row.get("_id"),"applicantCompany":row.get("applicantCompany"),"contractorCompany":row.get("contractorCompany")}),flush=True)
    except Exception as e:
     print("ERROR",term,field,repr(e),flush=True)
  arr=list(records.values())
  giga=[r for r in arr if re.search("giga|espigar",json.dumps(r),re.I)]
  sun=[r for r in arr if re.search("sunrun|sun run",json.dumps(r),re.I)]
  normalize=lambda s:re.sub(r"[^a-z0-9]","",str(s or "").lower().replace("road","rd").replace("street","st"))
  gg={normalize(r.get("address")) for r in giga}
  pair=[r for r in sun if normalize(r.get("address")) in gg]
  print("SUMMARY",json.dumps({"union_records":len(arr),"giga":len(giga),"sunrun":len(sun),"pairs":len(pair)}),flush=True)
  (OUT/"matches.json").write_text(json.dumps({"giga":giga,"sunrun":sun,"pairs":pair},indent=2,ensure_ascii=False))
  await b.close()
asyncio.run(main())
