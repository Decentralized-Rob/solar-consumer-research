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
   text0=page.get_text("text")
   if not re.search(r'sun\\s*run|ste(?:ph|v)en\\s+kelly|giga|espigar|roof|shingle',text0,re.I):continue
   try:
    tables=page.find_tables()
    rawtables=tables.tables
   except Exception as e:
    print("TABLE_ERROR",source['year'],source['month'],pageno+1,str(e)[:100],flush=True)
    continue
   if not rawtables and pageno==0:
    print("NO_TABLE",source['year'],source['month'],pageno+1,flush=True)
   for t in rawtables:
    try:rows=t.extract()
    except Exception as e:
     print("EXTRACT_ERROR",source['year'],source['month'],pageno+1,str(e)[:100],flush=True)
     continue
    for cellrow in rows:
     if not cellrow or len(cellrow)<8:continue
     row=[clean(c) for c in cellrow]
     permit=clean(row[0])
     if not permit_pattern.search(permit):continue
     found=permit_pattern.search(permit)
     applicant=row[5]
     description=row[6]
     addr=row[7]
     if not addr:continue
     if not (sunrun_words.search(applicant) or roof_words.search(description)):continue
     rec={
       "permit":re.sub(r'\\s+','',found.group()).upper(),
       "date":row[2],
       "applicant":applicant,
       "description":description,
       "address":addr,
       "page":pageno+1,
       "source":u
     }
     if sunrun_words.search(applicant) and re.search(r"solar|photovoltaic|panel|battery",description,re.I):
      rec['kind']="sunrun_solar"
     elif roof_words.search(description) and re.search(r"replace|strip|re[ -]?roof|shingle|new roof|roofing|repair",description,re.I):
      rec['kind']="roof"
     else:continue
     records.append(rec)
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
