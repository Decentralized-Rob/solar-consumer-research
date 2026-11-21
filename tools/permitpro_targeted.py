import hashlib, json, re, time
from pathlib import Path
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

ROOT=Path("permitpro_targeted")
ROOT.mkdir(exist_ok=True)
HOST="https://westborough.patriotpermitpro.com/"
TARGETS=[
 ("24-00935","Giga Property Solutions", "5 Vinal Hill Rd"),
 ("26-03700","Sunrun Installation Services","192 West Main St"),
 ("26-03697","Sunrun solar","192 West Main St"),
 ("26-03696","Sunrun fire","192 West Main St"),
 ("26-03682","Sunrun Installation Services","3 Denny St"),
 ("26-03681","Sunrun fire","3 Denny St"),
]
S=requests.Session()
S.headers.update({"User-Agent":"Mozilla/5.0 (compatible; PublicPermitResearch/1.0)"})
CACHE={}
REPORT=[]
FILES=[]
def get_record(id):
    if id in CACHE:return CACHE[id]
    url=f"{HOST}index.php?act=process&id={id}"
    try:
        res=S.get(url,timeout=16)
        soup=BeautifulSoup(res.text,"html.parser")
        text=soup.get_text(" ",strip=True)
        ids=re.findall(r"\b\d{2}-\d{5}\b",text)
        app=ids[0] if ids else None
        pdfs=[urljoin(url,a.get("href")) for a in soup.select('a[href]') if ".s3.amazonaws.com/" in (a.get("href") or "")]
        obj={"id":id,"status":res.status_code,"app":app,"pdfs":pdfs,"text":text[:4500],"url":url}
        CACHE[id]=obj
        print("INDEX",id,"APP",app,"HTTP",res.status_code,"PDFs",len(pdfs))
        return obj
    except Exception as e:
        print("INDEX_ERROR",id,str(e)[:200])
        CACHE[id]={"id":id,"app":None,"status":None,"pdfs":[]}
        return CACHE[id]

def search_app(app_id,low=1,high=44852):
    target=int(app_id.replace("-",""))
    for attempt in range(22):
        if low>high:break
        mid=(low+high)//2
        record=get_record(mid)
        val=record.get("app")
        if not val:
            # Probe neighboring index IDs for a valid application
            for off in [1,-1,2,-2,3,-3]:
                cand=get_record(mid+off)
                if cand.get("app"):
                    record=cand; mid=mid+off; val=record["app"]; break
        if not val:
            print("UNREADABLE_INDEX",mid);break
        num=int(val.replace("-",""))
        if num==target:return record
        if num<target:low=mid+1
        else:high=mid-1
    print("BINARY_NO_EXACT",app_id,"range",low,high)
    # retry with a small linear scan around expected position
    for i in range(max(1,low-15),min(44852,high+15)+1):
        rec=get_record(i)
        if rec.get("app")==app_id:return rec
    return None

S.get(HOST,timeout=16)
baseline=get_record(44852)
print("BASELINE",baseline["app"],baseline["text"][:200])
for app,company,addr in TARGETS:
    rec=search_app(app)
    data={"application_id":app,"company":company,"address":addr,"found":bool(rec),"record":rec}
    if rec:
        for url in rec["pdfs"][:24]:
            try:
                res=S.get(url,timeout=30)
                body=res.content
                if not body.startswith(b"%PDF-"):
                    print("NOT_PDF",app,url,res.status_code,len(body));continue
                digest=hashlib.sha256(body).hexdigest()
                dest=ROOT/f"{app}_{digest[:16]}.pdf"
                dest.write_bytes(body)
                entry={"app":app,"address":addr,"company":company,"filename":dest.name,"url":url,"size":len(body),"sha256":digest,"status":res.status_code}
                FILES.append(entry)
                print("CAPTURED",json.dumps(entry))
            except Exception as e:print("FETCH_ERROR",app,url,str(e)[:200])
    REPORT.append(data)
    (ROOT/"result.json").write_text(json.dumps(REPORT,indent=2))
(ROOT/"manifest.json").write_text(json.dumps(FILES,indent=2))
print("TARGETS_COMPLETE",len(REPORT),"PDF_TOTAL",len(FILES),"INDEX_REQUESTS",len(CACHE))
