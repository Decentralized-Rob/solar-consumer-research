"""Find next Brimfield Sunrun property that has an actual historical roofing permit."""
import asyncio,copy,json,re
from collections import defaultdict
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://brimfield.patriotpermitpro.com/"
EXCLUDE={"285BROOKFIELDRD","30STGEORGERD"}
def addr(s):return re.sub(r"[^A-Z0-9]","",str(s or "").upper()).replace("STREET","ST").replace("ROAD","RD")
async def main():
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(headless=True)
  ctx=await browser.new_context()
  page=await ctx.new_page()
  templates=[]
  def onreq(q):
   if "mode=getResults" in q.url:
    try:templates.append(json.loads(parse_qs(q.post_data or "").get("jsonData",["{}"])[0]))
    except Exception as ex:print("TEMPLATE_PARSE",repr(ex),flush=True)
  page.on("request",onreq)
  resp=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
  await page.wait_for_timeout(1400)
  template=templates[0]
  meta=await (await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData")).json()
  fields={d["fieldName"]:d for d in meta if isinstance(d,dict) and "fieldName" in d}
  selected=list(dict.fromkeys(template["activeDashboardView"]["selectedFieldNames"]+["applicantName","applicantCompany","contractorName","contractorCompany","location-parcelID","proposedWorkDescription"]))
  fdata=template["resultsSettings"]["fieldData"][:]
  for name in selected:
   if name not in [d.get("fieldName") for d in fdata]:
    fdata.append(fields.get(name,{"fieldName":name,"friendlyName":name,"dataType":"string","collection":"formData"}))
  async def fetch(skip=0,limit=250,field=None,term=None):
   obj=copy.deepcopy(template)
   obj["activeDashboardView"].update({"selectedFieldNames":selected,"modified":True,"filters":[]})
   if field:
    x=fields.get(field,{})
    obj["activeDashboardView"]["filters"]=[{"what":field,"operator":"contains","where":term,"show":True,"collection":x.get("collection","formData"),"dataType":x.get("dataType","string"),"valueType":"string"}]
   obj["resultsSettings"].update({"skip":skip,"limit":limit,"fieldData":fdata})
   r=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(obj)},timeout=40000)
   j=await r.json()
   return j.get("resultsData",[]),j.get("resultsSettings",{}).get("totalSearchResults")
  data,tot=await fetch(0,200)
  allrows=list(data)
  for start in range(200,int(tot),200):
   rows,_=await fetch(start,200)
   allrows.extend(rows)
  print("INDEX",len(allrows),flush=True)
  names=defaultdict(list)
  for r in allrows:names[addr(r.get("address"))].append(r)
  sunrun=[r for r in allrows if re.search(r"sun\s*[-]?\s*run",str(r.get("applicantCompany",""))+" "+str(r.get("applicantName",""))+" "+str(r.get("contractorCompany",""))+" "+str(r.get("contractorName","")),re.I)]
  sunrun.sort(key=lambda r:r.get("Application Date",""),reverse=True)
  print("SUNRUN_TOTAL",len(sunrun),flush=True)
  ordered=[]
  visited=set()
  for r in sunrun:
   if str(r.get("Application Date",""))>"2025-06-03":continue
   key=addr(r.get("address"))
   if key in visited or key in EXCLUDE:continue
   visited.add(key)
   ordered.append(r)
  print("PROPERTIES",len(ordered),flush=True)
  print("PROPERTY_ORDER",json.dumps([{"address":x.get("address"),"date":x.get("Application Date"),"app":x.get("Application ID")} for x in ordered],ensure_ascii=False)[:15000],flush=True)
  count=0
  for solar in ordered:
   key=addr(solar.get("address"))
   related=sorted(names[key],key=lambda r:r.get("Application Date",""),reverse=True)
   # include permit history, focusing on roof-affecting categories, not solar or electrical.
   possible=[r for r in related if re.search(r"envelope|residential|roof|building|repair|renovat",str(r.get("type","")),re.I) and r.get("_id")!=solar.get("_id")]
   solar_date=solar.get("Application Date")
   print("NEXT_SUNRUN",json.dumps({"address":solar.get("address"),"application":solar.get("Application ID"),"date":solar_date,"type":solar.get("type"),"other_permits":[{"app":r.get("Application ID"),"date":r.get("Application Date"),"type":r.get("type")} for r in possible]},ensure_ascii=False),flush=True)
   saw_roof=False
   for candidate in possible:
    if str(candidate.get("Application Date",""))>str(solar_date):continue
    id=str(candidate.get("_id"))
    try:
     res=await page.goto(BASE+"index.php?act=process&id="+id,wait_until="domcontentloaded",timeout=26000)
     txt=(await page.locator("body").inner_text())
     mat=re.search(r"Proposed Work:\s*(.*?)\s*Status History",txt,re.I|re.S)
     scope=(mat.group(1).strip() if mat else "")
     page_status=res.status if res else 0
     urls=await page.locator('a[href*="act=form/view"]').evaluate_all("(as)=>as.map(a=>a.href)")
     form_scope=""
     if urls:
      try:
       fr=await page.goto(urls[0],wait_until="domcontentloaded",timeout=26000)
       ftext=(await page.locator("body").inner_text())
       if re.search("Building Envelope",str(candidate.get("type")),re.I):
        m=re.search(r"Roofing Material\s*(.*?)\s*(?:Type of Siding|Will the project)",ftext,re.I|re.S)
        if m: form_scope="Roofing material: "+m.group(1).strip()
       else:
        m=re.search(r"Brief Description of Proposed Work[^:]*:\s*(.*?)(?:SECTION 4:|SECTION 4\b)",ftext,re.I|re.S)
        if m: form_scope=m.group(1).strip()
       print("FORM_READ",candidate.get("Application ID"),"HTTP",fr.status if fr else 0,"FORM_SCOPE",repr(form_scope[:550]),"FORM_START",repr(ftext[:500]),flush=True)
      except Exception as e:print("FORM_ERROR",candidate.get("Application ID"),repr(e)[:230],flush=True)
     effective=scope+" | "+form_scope
     roof=bool(re.search(r"re.?roof|roof replacement|replace.{0,50}roof|roof.{0,35}replac|roof repair|repair.{0,25}roof|shingl|standing.seam|roofing material:\s*[A-Z0-9]",effective,re.I))
     if roof and re.search(r"roof.?top.{0,45}(solar|photo|pv)",effective,re.I) and not re.search(r"shingl|re.?roof|roof replacement|replace.{0,50}roof|roof.{0,35}replac|roof repair|roofing material:\s*[A-Z0-9]",effective,re.I):
      roof=False
     if not roof and re.search("Building Envelope",str(candidate.get("type")),re.I):
      print("ENVELOPE_NOT_ROOF",candidate.get("Application ID"),repr(effective[:800]),flush=True)
     scope=effective.strip(" |")
     print("HISTORY",json.dumps({"solar_address":solar.get("address"),"solar_date":solar_date,"application":candidate.get("Application ID"),"permit":candidate.get("Permit Number"),"date":candidate.get("Application Date"),"type":candidate.get("type"),"roof_work":roof,"scope":scope[:1200],"url":BASE+"index.php?act=process&id="+id},ensure_ascii=False),flush=True)
     if roof:
      saw_roof=True
      print("FOUND_ROOF_HISTORY",json.dumps({"address":solar.get("address"),"solar_date":solar_date,"solar_application":solar.get("Application ID"),"roof_application":candidate.get("Application ID"),"roof_permit":candidate.get("Permit Number"),"roof_date":candidate.get("Application Date"),"scope":scope[:1200],"roof_url":BASE+"index.php?act=process&id="+id},ensure_ascii=False),flush=True)
    except Exception as e:print("RECORD_ERROR",id,repr(e)[:220],flush=True)
   if saw_roof:
    print("SELECTED",solar.get("address"),solar.get("Application ID"),flush=True)
    break
   count+=1
   if count>=30:print("STOP_NO_ROOF_IN_FIRST",count,flush=True);break
  await ctx.close();await browser.close()
asyncio.run(main())
