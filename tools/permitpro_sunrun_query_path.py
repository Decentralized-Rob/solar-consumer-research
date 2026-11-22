"""Discover the working public PermitPro query path for Sunrun (no private login).
Validate filter semantics with a positive control; compare server filters and paginated index.
"""
import asyncio, copy, json, re
from urllib.parse import parse_qs
from playwright.async_api import async_playwright

TOWNS=["brimfield","upton","lancaster"]
KNOWN=["contractorCompany","contractorName","applicantCompany","applicantName","proposedWorkDescription","address","authorizedAgent"]
def extract_fields(meta):
 found=[]
 def walk(v):
  if isinstance(v,list):
   for x in v:walk(x)
  elif isinstance(v,dict):
   if "fieldName" in v:found.append(v)
   for x in v.values():walk(x)
 walk(meta)
 return found
def preview(x,lim=2600): return json.dumps(x,ensure_ascii=False,default=str)[:lim]
async def town(ctx,town):
 base=f"https://{town}.patriotpermitpro.com/"
 page=await ctx.new_page()
 seen=[]
 def onrequest(req):
  if "mode=getResults" in req.url:
   try:seen.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
   except Exception as e:print("PARSE_TEMPLATE_ERROR",town,repr(e),flush=True)
 page.on("request",onrequest)
 try:
  resp=await page.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=40000)
  await page.wait_for_timeout(2600)
  print("TOWN_START",town,"STATUS",resp.status if resp else "none","CAPTURED",len(seen),flush=True)
  if not seen:return
  template=seen[0]
  print("TEMPLATE",town,preview({k:v for k,v in template.items() if k!="resultsSettings"},1800),flush=True)
  meta_response=await ctx.request.get(base+"index.php?act=dashboard&mode=getFieldData",timeout=35000)
  meta=await meta_response.json()
  defs=extract_fields(meta)
  names={str(d["fieldName"]):d for d in defs}
  print("FIELDS",town,"NUM",len(names),"RELEVANT",preview([(k,str(v.get("collection")),str(v.get("dataType"))) for k,v in names.items() if re.search(r"contract|install|agent|company|name|owner|work|solar|electr|applicant|address|permit|descript|roof",k,re.I)],6000),flush=True)
  print("FIELDS_ALL",town,preview(list(names.keys()),4500),flush=True)
  sample=await page.evaluate("""()=>({inputs:[...document.querySelectorAll('input,select')].map(x=>({tag:x.tagName,type:x.type||'',name:x.name||'',id:x.id||'',placeholder:x.placeholder||''})).slice(0,40),text:(document.body.innerText||'').slice(0,1200)})""")
  print("PAGE_UI",town,preview(sample,2500),flush=True)
  chosen=list(dict.fromkeys([*template["activeDashboardView"].get("selectedFieldNames",[]),*KNOWN,*[n for n in names if re.search(r"contract|install|company|name|agent|description|electr|roof",n,re.I)]]))
  chosen=chosen[:75]
  fd=list(template.get("resultsSettings",{}).get("fieldData",[]))
  existing={d.get("fieldName") for d in fd if isinstance(d,dict)}
  for n in chosen:
   if n not in existing:
    fd.append(names.get(n,{"fieldName":n,"friendlyName":n,"dataType":"string","collection":"formdata"})); existing.add(n)
  async def query(skip=0,limit=50,field=None,term=None):
   obj=copy.deepcopy(template)
   obj["activeDashboardView"]["selectedFieldNames"]=chosen
   obj["activeDashboardView"]["modified"]=True
   obj["activeDashboardView"]["filters"]=[]
   if field:
    d=names.get(field,{})
    obj["activeDashboardView"]["filters"]=[{"what":field,"operator":"contains","where":term,"show":True,"collection":d.get("collection","formdata"),"dataType":d.get("dataType","string"),"valueType":"string"}]
   obj["resultsSettings"].update({"skip":skip,"limit":limit,"fieldData":fd})
   try:
    r=await ctx.request.post(base+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(obj)},timeout=55000)
    j=await r.json()
    return (r.status,j)
   except Exception as e:
    print("QUERY_ERROR",town,field,skip,repr(e)[:250],flush=True)
    return (0,{})
  st,first=await query(limit=60)
  rows=first.get("resultsData",[])
  sets=first.get("resultsSettings",{})
  print("FIRST",town,st,"TOTAL",sets.get("totalApplications"),"SEARCH_TOTAL",sets.get("totalSearchResults"),"ROWS",len(rows),"EXAMPLE",preview(rows[:2],3300),flush=True)
  if not rows:return
  # Confirm the backend supports filtering on a field known to be populated.
  posfield="address"
  posterm=str(rows[0].get("address") or "").split(" ")[-1]
  if not posterm:posfield="proposedWorkDescription";posterm="solar"
  st,ctrl=await query(limit=20,field=posfield,term=posterm)
  print("FILTER_CONTROL",town,posfield,posterm,st,ctrl.get("resultsSettings",{}).get("totalSearchResults"),len(ctrl.get("resultsData",[])),preview(ctrl.get("resultsData",[])[:1],850),flush=True)
  companyfields=[n for n in chosen if re.search(r"contractor|applicant|company|installer|installing|authorized|agent",n,re.I)]
  companyfields=list(dict.fromkeys(companyfields))[:12]
  for name in companyfields:
   st,j=await query(limit=35,field=name,term="Sunrun")
   rr=j.get("resultsData",[])
   total=j.get("resultsSettings",{}).get("totalSearchResults")
   print("SUNRUN_FILTER",town,name,"HTTP",st,"MATCHES",total,"RETURNED",len(rr),"SAMPLE",preview(rr[:3],1750),flush=True)
  # Full index fallback if no material name result. Confirm real occurrences in fields.
  total=int(sets.get("totalApplications") or sets.get("totalSearchResults") or 0)
  if total and total<=18000:
   allrows=[]
   step=200
   for start in range(0,total,step):
    if start==0: batch=rows[:]
    else:
     st,j=await query(skip=start,limit=step)
     batch=j.get("resultsData",[])
    allrows.extend(batch)
    if (start//step)%10==0:print("SCAN_PROGRESS",town,start,total,len(allrows),flush=True)
    if start==0 and len(rows)<step:
     st,j=await query(skip=0,limit=step)
     allrows=j.get("resultsData",[])
   hits=[]
   for r in allrows:
    if re.search(r"sun[\s\-]?run",json.dumps(r,ensure_ascii=False),re.I):
     hits.append(r)
   print("FULL_INDEX",town,"REPORTED",total,"GOT",len(allrows),"SUNRUN",len(hits),"HITS",preview(hits[:15],12000),flush=True)
  else:print("NO_FULL_SCAN",town,total,flush=True)
 except Exception as e:print("TOWN_ERROR",town,repr(e),flush=True)
 finally:await page.close()

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  for townname in TOWNS:
   ctx=await browser.new_context()
   await town(ctx,townname)
   await ctx.close()
  await browser.close()
asyncio.run(main())
