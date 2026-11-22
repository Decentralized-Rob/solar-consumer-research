"""Independently search every Boylston PermitPro dashboard row for Giga and Sunrun.
No property qualification inferred from co-occurrence alone.
"""
import asyncio,copy,json,re,csv
from collections import defaultdict
from pathlib import Path
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://boylston.patriotpermitpro.com/"
OUT=Path("boylston_giga_search");OUT.mkdir(exist_ok=True)
def addr(s): return re.sub(r"[^A-Z0-9]","",str(s or "").upper().replace("STREET","ST").replace("ROAD","RD").replace("DRIVE","DR"))
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context()
  page=await ctx.new_page()
  templates=[]
  def req(r):
   if "mode=getResults" in r.url:
    try: templates.append(json.loads(parse_qs(r.post_data or "").get("jsonData",["{}"])[0]))
    except:pass
  page.on("request",req)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await page.wait_for_timeout(1500)
  t=templates[0]
  fieldmeta=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  fields={x["fieldName"]:x for x in fieldmeta if isinstance(x,dict) and "fieldName" in x}
  print("AVAILABLE_FIELDS",json.dumps(list(fields)),flush=True)
  extras=["applicantName","applicantCompany","contractorName","contractorCompany","location-parcelID","proposedWorkDescription","applicantEmail","contactName","businessName"]
  extras += ["authorizedAgent","ownerName"]
  selected=list(dict.fromkeys(t["activeDashboardView"]["selectedFieldNames"]+extras))
  fd=t["resultsSettings"]["fieldData"][:]
  have={x.get("fieldName") for x in fd}
  for k in selected:
   if k not in have:
    fd.append(fields.get(k,{"fieldName":k,"friendlyName":k,"dataType":"string","collection":"formData"}))
  async def get(skip,size):
   d=copy.deepcopy(t)
   d["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[]})
   d["resultsSettings"].update({"skip":skip,"limit":size,"fieldData":fd})
   res=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=45000)
   if not res.ok: raise RuntimeError(f"HTTP_{res.status}_{(await res.text())[:240]}")
   j=await res.json()
   return j.get("resultsData",[]),j.get("resultsSettings",{}).get("totalSearchResults")
  rows,count=await get(0,200)
  for skip in range(200,int(count),200):
   rr,_=await get(skip,200)
   rows.extend(rr)
  print("ALL_ROWS",len(rows),"EXPECTED",count,"SELECTED_FIELDS",len(selected),flush=True)
  if len(rows) != int(count): print("WARNING_INCOMPLETE_PAGINATION",len(rows),count,flush=True)
  names=defaultdict(list)
  for r in rows:names[addr(r.get("address"))].append(r)
  results=[]
  for r in rows:
   payload=" ".join(str(v or "") for k,v in r.items() if isinstance(v,(str,int,float)))
   if re.search(r"\bgi[\s-]*ga\b|giga\s*property|espigar",payload,re.I):
    matches={k:v for k,v in r.items() if re.search("giga|espigar",str(v),re.I)}
    obj={"application":r.get("Application ID"),"permit":r.get("Permit Number"),"date":r.get("Application Date"),"type":r.get("type"),"address":r.get("address"),"id":r.get("_id"),"matches":matches,"related":[{"application":x.get("Application ID"),"date":x.get("Application Date"),"type":x.get("type"),"applicantCompany":x.get("applicantCompany"),"contractorCompany":x.get("contractorCompany"),"id":x.get("_id")} for x in names[addr(r.get("address"))]]}
    results.append(obj)
    print("GIGA_MATCH",json.dumps(obj,ensure_ascii=False),flush=True)
  print("GIGA_RESULTS",len(results),flush=True)
  sun=[r for r in rows if re.search(r"sun[\s-]*run",str(r.get("applicantCompany",""))+" "+str(r.get("contractorCompany",""))+" "+str(r.get("applicantName",""))+" "+str(r.get("contractorName","")),re.I)]
  print("SUNRUN_RESULTS",len(sun),"SUNRUN_UNIQUE_PROPERTIES",len({addr(r.get("address")) for r in sun}),flush=True)
  for r in sun:print("SUNRUN_MATCH",json.dumps({"address":r.get("address"),"application":r.get("Application ID"),"date":r.get("Application Date"),"type":r.get("type"),"id":r.get("_id")},ensure_ascii=False),flush=True)
  matches_addrs={addr(r.get("address")) for r in results}
  pair=[r for r in sun if addr(r.get("address")) in matches_addrs]
  print("SAME_ADDRESS_GIGA_SUNRUN",len(pair),json.dumps([{"address":r.get("address"),"app":r.get("Application ID"),"id":r.get("_id")} for r in pair]),flush=True)
  (OUT/"results.json").write_text(json.dumps({"total_index":len(rows),"expected":count,"selected_fields":selected,"giga_count":len(results),"giga_results":results,"sunrun_count":len(sun),"sunrun_rows":[{"address":r.get("address"),"application":r.get("Application ID"),"date":r.get("Application Date"),"type":r.get("type"),"id":r.get("_id")} for r in sun],"sunrun_giga_same_address":len(pair)},indent=2,ensure_ascii=False))
  await browser.close()
asyncio.run(main())
