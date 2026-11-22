"""Brimfield paired Sunrun + roof permit discovery, retaining full history."""
import asyncio,copy,json,re
from collections import defaultdict
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
SEEN={"285BROOKFIELDRD","30STGEORGERD","15MILLLANERD"}
def key(s):
 s=str(s or "").upper().replace("STREET","ST").replace("ROAD","RD").replace("DRIVE","DR")
 return re.sub("[^A-Z0-9]","",s)
def is_roof_scope(t):
 t=str(t).lower()
 if re.search(r"roof.?top.{0,20}(solar|photovoltaic|pv)|solar.{0,45}roof",t) and not re.search(r"tear.?off|reroof|re.roof|roof replacement|replace.{0,35}roof|roof.{0,30}replace|asphalt shingle|new shingles|shingle replacement",t):return False
 return bool(re.search(r"roof replacement|replace.{0,35}roof|roof.{0,30}replace|roof.{0,25}repair|tear.?off|reroof|re.roof|asphalt shingle|new shingles|shingle replacement|install.{0,35}roofing|roof.{0,20}install",t))
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context()
  pg=await ctx.new_page()
  templates=[]
  def on_req(req):
   if "mode=getResults" in req.url:
    try:templates.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
    except:pass
  pg.on("request",on_req)
  await pg.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await pg.wait_for_timeout(1300)
  if not templates:raise RuntimeError("No dashboard request template")
  tmpl=templates[0]
  meta=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  fields={d["fieldName"]:d for d in meta if isinstance(d,dict) and "fieldName" in d}
  selected=list(dict.fromkeys(tmpl["activeDashboardView"]["selectedFieldNames"]+["applicantName","applicantCompany","contractorName","contractorCompany","location-parcelID","proposedWorkDescription"]))
  fdata=tmpl["resultsSettings"]["fieldData"][:]
  for k in selected:
   if k not in [d.get("fieldName") for d in fdata]:fdata.append(fields.get(k,{"fieldName":k,"dataType":"string","collection":"formData"}))
  async def fetch(skip,limit):
   d=copy.deepcopy(tmpl)
   d["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[]})
   d["resultsSettings"].update({"skip":skip,"limit":limit,"fieldData":fdata})
   resp=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(d)},timeout=45000)
   j=await resp.json()
   return j.get("resultsData",[]),j.get("resultsSettings",{}).get("totalSearchResults")
  rows,n=await fetch(0,200)
  for idx in range(200,int(n),200):
   part,_=await fetch(idx,200)
   rows.extend(part)
  print("INDEX",len(rows),flush=True)
  by_addr=defaultdict(list)
  for r in rows:by_addr[key(r.get("address"))].append(r)
  sun=[r for r in rows if re.search("sun.?run", " ".join(str(r.get(x) or "") for x in ("applicantCompany","applicantName","contractorCompany","contractorName")),re.I)]
  props={}
  for r in sun:
   k=key(r.get("address"))
   if k not in SEEN and (k not in props or str(r.get("Application Date",""))>str(props[k].get("Application Date",""))):
    props[k]=r
  ordered=sorted(props.values(),key=lambda r:r.get("Application Date",""),reverse=True)
  print("SUNRUN",len(sun),"UNSEEN_PROPERTIES",len(ordered),flush=True)
  for sol in ordered:
   k=key(sol.get("address"))
   history=sorted(by_addr[k],key=lambda x:x.get("Application Date",""),reverse=True)
   candidate=[r for r in history if r.get("_id")!=sol.get("_id") and re.search(r"Residential|Building Envelope|Roof",str(r.get("type")),re.I)]
   print("PROPERTY",sol.get("address"),"SOLAR",sol.get("Application Date"),"APPLICATION",sol.get("Application ID"),"CANDIDATE_COUNT",len(candidate),flush=True)
   for c in candidate:
    pid=c.get("_id");url=BASE+"index.php?act=process&id="+str(pid)
    try:
     await pg.goto(url,wait_until="domcontentloaded",timeout=35000)
     await pg.locator("body").wait_for(timeout=10000)
     txt=await pg.locator("body").inner_text(timeout=10000)
     m=re.search(r"Proposed Work\s*:?\s*(.*?)\s*Status History",txt,re.S|re.I)
     scope=(m.group(1).strip() if m else "").replace("\n"," ")[:300]
     roof=is_roof_scope(scope)
     form=""
     if not scope and "Envelope" in str(c.get("type")):
      links=await pg.locator('a[href*="act=form/view/"]').evaluate_all("(a)=>a.map(x=>x.href)")
      if links:
       await pg.goto(links[0],wait_until="domcontentloaded",timeout=35000)
       ftxt=await pg.locator("body").inner_text()
       mt=re.search(r"Roofing Material\s*(.*?)\s*# Existing layers",ftxt,re.S|re.I)
       form=(mt.group(1).strip() if mt else "")
       roof=is_roof_scope(form) or bool(form)
     print("CANDIDATE",json.dumps({"solar_address":sol.get("address"),"solar_app":sol.get("Application ID"),"solar_date":sol.get("Application Date"),"history_app":c.get("Application ID"),"history_type":c.get("type"),"history_date":c.get("Application Date"),"history_permit":c.get("Permit Number"),"scope":scope,"roof_form":form,"roof":roof,"url":url}),flush=True)
     if roof:
      print("QUALIFIED_MATCH",json.dumps({"address":sol.get("address"),"solar_app":sol.get("Application ID"),"solar_date":sol.get("Application Date"),"roof_app":c.get("Application ID"),"roof_date":c.get("Application Date"),"roof_permit":c.get("Permit Number"),"scope":scope,"roof_url":url}),flush=True)
    except Exception as ex:print("FAIL",pid,str(ex)[:150],flush=True)
  await ctx.close();await b.close()
asyncio.run(main())
