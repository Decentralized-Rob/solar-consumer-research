"""Find same-address Barnstable Sunrun solar + earlier roofing permits from official monthly PDF reports.
Read-only investigation; separate actual matches from unverified near matches.
"""
from __future__ import annotations
import concurrent.futures, datetime as dt, json, re, hashlib, unicodedata
from pathlib import Path
from urllib.parse import urljoin
import requests, fitz

ROOT=Path("barnstable_roof_before_sunrun")
ROOT.mkdir(exist_ok=True)
BASE="https://tobweb.town.barnstable.ma.us/Departments/Building/Office_Resources/"
MONTHS="January February March April May June July August September October November December".split()
SOURCES=[]
for y in (2024,2025,2026):
 for m,month in enumerate(MONTHS,1):
  if y==2026 and m>10:continue
  SOURCES.append({"year":y,"month":m,"url":BASE+f"{month}-{y}.pdf"})
HEADERS={
 "permit": ["Record #","Permit Number","Permit #"],
 "date": ["Date Issued","Issued Date","Permit/License Issued Date","Date / Time"],
 "applicant": ["Applicant Name","Applicant / Contractor","Applicant/Contractor"],
 "description": ["Work Description","Description of Work"],
 "address": ["Full Address","Property Address"]
}
roof_words=re.compile(r'\broof(?:ing|ed|s)?\b|re[ -]?roof|re[ -]?shingl|strip.*shingle|new shingles',re.I)
sunrun_words=re.compile(r'sun\s*run|ste(?:ph|v)en\s+kelly',re.I)
permit_pattern=re.compile(r'(?:EXPR|BLDR|BLDC)[-–]\s*(?:2[0-9])[-–]\s*\d+',re.I)
def find_header(page, choices):
 for word in choices:
  try:
   found=page.search_for(word)
   if found:return found[0]
  except: pass
 return None
def clean(s):return re.sub(r"\s+"," ",s or "").strip()
def normalize_addr(addr):
 addr=unicodedata.normalize('NFKD',addr).upper()
 addr=addr.split(",")[0].strip()
 addr=re.sub(r"\bROAD\b","RD",addr)
 addr=re.sub(r"\bSTREET\b","ST",addr)
 addr=re.sub(r"\bDRIVE\b","DR",addr)
 addr=re.sub(r"\bAVENUE\b","AVE",addr)
 addr=re.sub(r"\bLANE\b","LN",addr)
 addr=re.sub(r"\bWAY\b","WAY",addr)
 addr=re.sub(r"\bROUTE\b","RTE",addr)
 addr=re.sub(r"\bAPT\b.*$","",addr)
 addr=re.sub(r"[^A-Z0-9]","",addr)
 return addr
def read_one(source):
 u=source['url']
 try:
  r=requests.get(u,timeout=30,headers={"User-Agent":"Mozilla/5.0 (compatible; public records research; GitHub Actions)"})
  if r.status_code!=200 or not r.content.startswith(b'%PDF'):
   return {**source,"status":r.status_code,"pdf":False,"error":"not public PDF"}
  doc=fitz.open(stream=r.content,filetype="pdf")
  records=[]
  for pageno,page in enumerate(doc):
   # Header columns are consistent for public spreadsheet-exported permit lists.
   applicant=find_header(page,HEADERS['applicant']); desc=find_header(page,HEADERS['description']);address=find_header(page,HEADERS['address'])
   date=find_header(page,HEADERS['date'])
   if not (applicant and desc and address and date): continue
   width=page.rect.width
   addr_cut=address.x0-3
   desc_cut=desc.x0-3
   app_cut=applicant.x0-3
   date_cut=date.x0-3
   header_bottom=max(x.y1 for x in (applicant,desc,address,date))
   # Public PDF table uses horizontal separators across most columns.
   draws=page.get_drawings()
   ys=[]
   for shape in draws:
    for part in shape["items"]:
     if part[0]=="l":
      a,b=part[1],part[2]
      if abs(a.y-b.y)<2 and abs(a.x-b.x)>width*.45 and a.y>=header_bottom-10:
       ys.append(round(a.y,1))
     if part[0]=="re":
      rect=part[1]
      if rect.width>width*.45 and rect.height>8 and rect.y0>=header_bottom-10:
       ys.extend([round(rect.y0,1),round(rect.y1,1)])
   ys=sorted(set(ys))
   if len(ys)<2:
    # Try single-page cell-table bounding boxes from the sheet lines.
    print("NO_ROW_GRID",source['year'],source['month'],pageno+1,"lines",len(draws),"headers",round(header_bottom),flush=True)
    continue
   words=page.get_text("words")
   for lo,hi in zip(ys,ys[1:]):
    if hi-lo<13 or hi<=header_bottom or lo>page.rect.height:continue
    selected=[w for w in words if w[1]>=lo-1 and w[3]<=hi+2 and w[1]>=header_bottom-3]
    if not selected:continue
    selected.sort(key=lambda w:(round(w[1]/4)*4,w[0]))
    def col(x0,x1):
     return clean(" ".join(w[4] for w in sorted((w for w in selected if w[0]>=x0 and w[0]<x1),key=lambda v:(round(v[1]/4)*4,v[0]))))
    rec={
     "permit":col(0,date_cut),
     "date":col(date_cut,app_cut-.01),
     "applicant":col(app_cut,desc_cut),
     "description":col(desc_cut,addr_cut),
     "address":col(addr_cut,width+5),
     "page":pageno+1,
     "source":u
    }
    found=permit_pattern.search(rec['permit'])
    if found: rec['permit']=re.sub(r'\s+','',found.group()).upper()
    if rec['address'] and rec['permit'] and (sunrun_words.search(rec['applicant']) or roof_words.search(rec['description'])):
     rec['kind']=("sunrun_solar" if sunrun_words.search(rec['applicant']) and re.search("solar|photovoltaic|panel|battery",rec['description'],re.I) else "roof" if roof_words.search(rec['description']) and re.search("replace|strip|re[ -]?roof|shingle|new roof|roofing|repair",rec['description'],re.I) else "other")
     if rec['kind']!="other":records.append(rec)
  return {**source,"status":200,"pdf":True,"pages":len(doc),"bytes":len(r.content),"records":records}
 except Exception as e:
  return {**source,"pdf":False,"error":str(e)[:250]}
def date_of(s):
 m=re.search(r"\b(\d{1,2})/(\d{1,2})/(20\d\d)",s or "")
 try:return dt.date(int(m[3]),int(m[1]),int(m[2])) if m else None
 except:return None
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as ex:
 results=list(ex.map(read_one,SOURCES))
allrecords=[rec for file in results for rec in file.get("records",[])]
solar=[r for r in allrecords if r['kind']=='sunrun_solar']
roof=[r for r in allrecords if r['kind']=='roof']
matches=[]
for sr in solar:
 da=date_of(sr['date'])
 for rr in roof:
  db=date_of(rr['date'])
  if da and db and db<da and normalize_addr(sr['address'])==normalize_addr(rr['address']):
   matches.append({"solar":sr,"roof":rr,"days_prior":(da-db).days})
matches.sort(key=lambda x:(x["solar"]["date"],-x["days_prior"]),reverse=True)
for f in results:
 print("REPORT",f['year'],f['month'],f.get('status',""),"PAGES",f.get('pages',0),"SOLAR",sum(x['kind']=='sunrun_solar' for x in f.get('records',[])),"ROOF",sum(x['kind']=='roof' for x in f.get('records',[])),f.get("error",""),flush=True)
print("TOTALS","reports",sum(f.get("pdf",False) for f in results),"solar",len(solar),"roof",len(roof),"matches",len(matches),flush=True)
for x in matches[:25]:print("MATCH",json.dumps(x,ensure_ascii=False),flush=True)
print("SOLAR_SAMPLES",json.dumps(solar[:8],ensure_ascii=False)[:14000],flush=True)
print("ROOF_SAMPLES",json.dumps(roof[:5],ensure_ascii=False)[:7000],flush=True)
(ROOT/"MATCHES.json").write_text(json.dumps(matches,indent=2,ensure_ascii=False))
(ROOT/"SUNRUN_SOLAR_RECORDS.json").write_text(json.dumps(solar,indent=2,ensure_ascii=False))
(ROOT/"ROOF_RECORDS.json").write_text(json.dumps(roof,indent=2,ensure_ascii=False))
(ROOT/"REPORT_STATUS.json").write_text(json.dumps([{k:v for k,v in f.items() if k!="records"} for f in results],indent=2))
