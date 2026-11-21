"""Boxborough public PermitPro: full server index, two independent company searches.
Original PDFs only; nothing is treated as a signed contract without inspection.
"""
import asyncio,copy,hashlib,html,json,re
from pathlib import Path
from urllib.parse import parse_qs,urljoin
from playwright.async_api import async_playwright
BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_full_index");OUT.mkdir(exist_ok=True)
WORDS={"giga":re.compile(r"\b(?:giga(?:\s+property)?|luiz\s+espigar|espigar)\b",re.I),
       "sunrun":re.compile(r"\bsun[\s-]?run\b",re.I)}
EXTRA=["contractorCompany","contractorName","applicantCompany","applicantName","proposedWorkDescription","authorizedAgent","address"]
def norm(x): return re.sub(r"\W+","",str(x).upper())
def flatten(o):return json.dumps(o,ensure_ascii=False)
def rowlist(o):
 candidates=[]
 def walk(v,path):
  if isinstance(v,dict):
   for k,a in v.items():walk(a,path+"."+k)
  elif isinstance(v,list):
   if len(v)>0 and path not in (".fieldData",):
    if len(v)>2 and any(isinstance(x,(dict,list)) for x in v[:3]):candidates.append((len(v),path,v))
   if not len(v)>100:
    for a in v[:3]:
     if isinstance(a,dict):walk(a,path+"[]")
 walk(o,"")
 candidates.sort(key=lambda x:x[0],reverse=True)
 return candidates
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page(); watched=[]
  def reqwatch(req):
   if "mode=getResults" in req.url:
    try:watched.append(json.loads(parse_qs(req.post_data or "").get("jsonData",["{}"])[0]))
    except Exception:pass
  page.on("request",reqwatch)
  await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
  await page.wait_for_timeout(2700)
  if not watched:print("NO_TEMPLATE",flush=True);return
  template=watched[0]
  raw=await ctx.request.get(BASE+"index.php?act=dashboard&mode=getFieldData",timeout=30000)
  try:metadata=await raw.json()
  except Exception:metadata={}
  def defs(o):
   if isinstance(o,list):
    for x in o:yield from defs(x)
   if isinstance(o,dict):
    if "fieldName" in o:yield o
    for v in o.values():yield from defs(v)
  known={str(d.get("fieldName")).lower():d for d in defs(metadata)}
  print("FIELD_LIST",[(n,n.lower() in known) for n in EXTRA],flush=True)
  selected=list(dict.fromkeys(template["activeDashboardView"]["selectedFieldNames"]+EXTRA))
  fd=template["resultsSettings"]["fieldData"][:]
  exist={d.get("fieldName") for d in fd}
  for f in EXTRA:
   d=known.get(f.lower(),{"fieldName":f,"friendlyName":f,"dataType":"string","collection":"formdata"})
   if f not in exist:fd.append(d);exist.add(f)
  sem=asyncio.Semaphore(8)
  async def fetch(skip=0,limit=250,filterfield=None,term=None):
   async with sem:
    obj=copy.deepcopy(template)
    obj["activeDashboardView"]["selectedFieldNames"]=selected
    obj["activeDashboardView"]["modified"]=True
    if filterfield:
     d=known.get(filterfield.lower(),{})
     obj["activeDashboardView"]["filters"]=[{"what":filterfield,"operator":"contains","where":term,"show":True,"collection":d.get("collection","formdata"),"dataType":d.get("dataType","string"),"valueType":"string"}]
    obj["resultsSettings"].update({"skip":skip,"limit":limit,"fieldData":fd})
    try:
     resp=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(obj)},timeout=35000)
     data=await resp.json()
     return data,resp.status
    except Exception as ex: print("FETCH_ERROR",skip,filterfield,repr(ex)[:200],flush=True);return {},0
  first,st=await fetch(0,250)
  (OUT/"first_response.json").write_text(json.dumps(first,indent=2)[:750000])
  print("FIRST",st,"TOP_KEYS",list(first),"COUNTS",{k:v for k,v in first.get("resultsSettings",{}).items() if "total" in k.lower()},"LISTS",[(n,p) for n,p,_ in rowlist(first)[:10]],flush=True)
  rows=rowlist(first)
  if not rows:
   print("NO_ROW_LIST_FROM_BACKEND",flush=True)
  else:
   count,path,base=rows[0]
   print("ROW_SAMPLE",json.dumps(base[:2])[:2800],flush=True)
   total=int(first.get("resultsSettings",{}).get("totalApplications") or 9500)
   # Use public index pagination; if the service caps page size, use actual count.
   size=len(base)
   print("PAGE_SIZE",size,"TOTAL",total,flush=True)
   if size>=10:
    limits=list(range(size,min(total,10500),size))
    fetched=await asyncio.gather(*(fetch(i,size) for i in limits))
    allrows=base[:]
    for i,(data,status) in zip(limits,fetched):
     other=rowlist(data)
     if other:
      same=next((r for n,p,r in other if p==path),other[0][2])
      allrows.extend(same)
    print("INDEX_ROWS",len(allrows),flush=True)
    # Preserve independent name-match sets.
    for company,regex in WORDS.items():
     hits=[v for v in allrows if regex.search(flatten(v))]
     (OUT/f"{company}_independent_matches.json").write_text(json.dumps(hits,indent=2))
     print("INDEPENDENT",company,len(hits),"SAMPLES",json.dumps(hits[:3])[:1700],flush=True)
    (OUT/"scan_summary.json").write_text(json.dumps({"first_count":len(base),"total_reported":total,"rows_fetched":len(allrows)},indent=2))
  await ctx.close();await browser.close()
asyncio.run(main())
