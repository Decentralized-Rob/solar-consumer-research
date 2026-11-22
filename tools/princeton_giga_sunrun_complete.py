"""Exact Princeton public PermitPro full scan with verified limited schema."""
import asyncio,copy,json,re
from pathlib import Path
from urllib.parse import parse_qs
from collections import defaultdict
from playwright.async_api import async_playwright
BASE="https://princeton.patriotpermitpro.com/"
OUT=Path("princeton_giga_sunrun_search");OUT.mkdir(exist_ok=True)
FIELDS=["applicantCompany","contractorCompany","applicantName","contractorName","authorizedAgent","contractorLicenseName"]
def address(s):
 return re.sub(r"[^A-Z0-9]","",str(s or "").upper().replace("ROAD","RD").replace("STREET","ST").replace("DRIVE","DR"))
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context()
  pg=await ctx.new_page()
  template=[]
  def seen(req):
   if "mode=getResults" in req.url:
    try:template.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
    except:pass
  pg.on("request",seen)
  await pg.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await pg.wait_for_timeout(1600)
  print("TEMPLATES",len(template),flush=True)
  t=template[0]
  meta=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  fs={f["fieldName"]:f for f in meta if isinstance(f,dict) and f.get("fieldName")}
  selected=list(dict.fromkeys(t["activeDashboardView"]["selectedFieldNames"]+FIELDS))
  d=copy.deepcopy(t)
  d["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[]})
  for name in FIELDS:
   if name in fs and name not in [f.get("fieldName") for f in d["resultsSettings"]["fieldData"]]:
    d["resultsSettings"]["fieldData"].append(fs[name])
  d["resultsSettings"].update({"skip":0,"limit":100})
  rows=[]
  count=None
  for skip in range(0,80000,100):
   d["resultsSettings"]["skip"]=skip
   res=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=25000)
   if not res.ok:raise RuntimeError(f"HTTP_{res.status}_skip_{skip}")
   j=await res.json()
   if count is None:
    count=int(j["resultsSettings"]["totalSearchResults"])
    print("TOTAL_RECORDS",count,"FIELDS",selected,flush=True)
   part=j.get("resultsData",[])
   rows.extend(part)
   if skip%1000==0:print("PROGRESS",skip,len(rows),flush=True)
   if skip+100>=count or not part:break
  if len(rows)!=count:print("INCOMPLETE",len(rows),count,flush=True)
  giga=[x for x in rows if re.search(r"\bgiga\b|espigar|giga property",json.dumps(x,ensure_ascii=False),re.I)]
  sun=[x for x in rows if re.search(r"sun[\s-]*run",json.dumps(x,ensure_ascii=False),re.I)]
  ag={address(x.get("address")) for x in giga}
  both=[x for x in sun if address(x.get("address")) in ag]
  print("GIGA_COUNT",len(giga),"SUNRUN_COUNT",len(sun),"SUNRUN_PROPERTIES",len({address(x.get("address")) for x in sun}),"CROSS_MATCH",len(both),flush=True)
  for label,arr in [("GIGA",giga),("CROSS",both)]:
   for x in arr:print(label,json.dumps({k:x.get(k) for k in ["address","applicantCompany","contractorCompany","applicantName","contractorName","authorizedAgent","contractorLicenseName","number","type","status","_id"]},ensure_ascii=False),flush=True)
  (OUT/"results.json").write_text(json.dumps({"records_scanned":len(rows),"expected":count,"giga_rows":giga,"sunrun_rows":sun,"cross_matches":both},ensure_ascii=False,indent=2))
  await b.close()
asyncio.run(main())
