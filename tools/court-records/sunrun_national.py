#!/usr/bin/env python3
"""Investigative nationwide Sunrun federal RECAP discovery; no invented roof-permit matches.

Output is a candidate index only. Search results are NOT findings about liability.
Original PDF bytes are saved separately when documented public URLs resolve.
"""
import hashlib
import json
import os
import re
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

API = "https://www.courtlistener.com/api/rest/v4/search/"
OUT = Path("sunrun-recap-national")
START = "2021-11-22"
END = "2026-11-22"
QUERIES = [
    ("sunrun_dockets", "d", 'caseName:Sunrun'),
    ("sunrun_guilmartin", "d", 'caseName:Sunrun AND attorney:Guilmartin'),
    ("sunrun_grsm", "d", 'caseName:Sunrun AND attorney:"Gordon Rees"'),
    ("roof_permit_filings", "r", 'Sunrun AND "roof permit"'),
    ("roof_filings", "r", 'Sunrun AND roofing'),
    ("change_orders", "r", 'Sunrun AND "change order"'),
    ("signature_dispute", "r", 'Sunrun AND "signature"'),
    ("guilmartin_filings", "r", 'Sunrun AND Guilmartin'),
    ("grsm_filings", "r", 'Sunrun AND "Gordon Rees"'),
]
MAX_PAGES_PER_QUERY = 2
MAX_PDFS = 6
MAX_BYTES_PER_PDF = 20_000_000


def get_json(url):
    token = os.environ.get("COURTLISTENER_API_TOKEN", "")
    if not token:
        raise ValueError("CourtListener token missing")
    req = Request(url, headers={"Authorization": "Token " + token,
         "Accept": "application/json", "User-Agent": "SCR-case-records-research/0.1"})
    with urlopen(req, timeout=40) as response:
        return json.load(response)


def public_pdf_url(doc):
    # Trust only a documented public storage key from CourtListener. Never invent PACER IDs.
    key = str(doc.get("filepath_local") or "")
    if key and not urlsplit(key).scheme and not key.startswith("//") and ".." not in key.split("/") and "\\" not in key:
        return "https://storage.courtlistener.com/" + key.lstrip("/")
    ia = str(doc.get("filepath_ia") or "")
    parsed = urlsplit(ia)
    if parsed.scheme == "https" and parsed.hostname in ("archive.org", "www.archive.org"):
        return ia
    return None


def get_pdf(url):
    with urlopen(Request(url, headers={"User-Agent": "SCR-case-records-research/0.1"}), timeout=55) as res:
        data = res.read(MAX_BYTES_PER_PDF + 1)
    if len(data) > MAX_BYTES_PER_PDF or b"%PDF-" not in data[:1024]:
        raise ValueError("Not a verified PDF or file over 20MB")
    return data


def run():
    OUT.mkdir(exist_ok=True)
    report = {"date_utc":datetime.now(timezone.utc).isoformat(),"window":[START,END],
      "scope":"Nationwide federal RECAP, Sunrun only; no state court coverage",
      "status":"started","queries":[],"candidate_dockets":[],"pdf_downloads":[],
      "qualified_roof_permit_cases":0,
      "warnings":["A roof reference in a federal filing is NOT an independently verified municipal roof permit.",
                  "GRSM/Cullen Guilmartin attorney attribution requires verifying docket appearance or original signed filing."]}
    merged = {}
    to_fetch = []
    try:
        for name,kind,query in QUERIES:
            url=API+"?"+urlencode({"type":kind,"q":query})
            result={"name":name,"type":kind,"query":query,"pages":0,"results_seen":0,"matching_sunrun_dockets":0,
                    "reported_count":None,"error":None,"sample":[]}
            try:
                while url and result["pages"] < MAX_PAGES_PER_QUERY:
                    data=get_json(url)
                    if result["pages"]==0:result["reported_count"]=data.get("count")
                    result["pages"]+=1
                    for h in data.get("results",[]):
                        result["results_seen"]+=1
                        title=str(h.get("caseName") or h.get("case_name") or "")
                        if not re.search(r"\bsunrun\b|\bsun\s*run\b",title,re.I):continue
                        filed=str(h.get("dateFiled") or h.get("date_filed") or "")[:10]
                        if not filed or not START<=filed<=END:continue
                        did=h.get("docket_id")
                        if not did:
                            ma=re.search(r"/docket/(\d+)/", str(h.get("absolute_url") or ""))
                            if ma:did=int(ma.group(1))
                        if not did:continue
                        did=str(did)
                        result["matching_sunrun_dockets"]+=1
                        row=merged.setdefault(did,{"id":int(did),"title":title,"date_filed":filed,
                           "court":str(h.get("court_id") or h.get("court") or ""),
                           "docket_number":h.get("docketNumber"),"attorney":h.get("attorney"),
                           "matched_queries":[],"filing_excerpt_samples":[],"roof_permit_verified":False,
                           "qualified":False,
                           "url":"https://www.courtlistener.com/docket/"+did+"/"})
                        if name not in row["matched_queries"]:row["matched_queries"].append(name)
                        if result["pages"]==1 and len(result["sample"])<10:
                            result["sample"].append({"id":int(did),"title":title,"date":filed,
                                                    "court":row["court"],"attorney":row["attorney"]})
                        for doc in (h.get("recap_documents") or []):
                            snippet=str(doc.get("snippet") or "")
                            desc=str(doc.get("description") or "")
                            item={"id":doc.get("id"),"entry":doc.get("document_number"),
                                  "description":desc,"snippet":re.sub(r"<[^>]+>","",snippet)[:600],
                                  "source_pdf":public_pdf_url(doc)}
                            if item not in row["filing_excerpt_samples"] and len(row["filing_excerpt_samples"])<8:
                                row["filing_excerpt_samples"].append(item)
                            if name in ("roof_permit_filings","roof_filings","change_orders","signature_dispute"):
                                if item["source_pdf"] and len(to_fetch)<MAX_PDFS*6:
                                    to_fetch.append((int(did),item))
                    nxt=data.get("next")
                    if nxt and not str(nxt).startswith(API):
                        raise ValueError("Invalid external pagination destination")
                    url=nxt
                    if url:time.sleep(0.4)
                result["complete"]=not bool(url)
            except (HTTPError,URLError,ValueError,OSError,TypeError) as ex:
                result["error"]=f"{type(ex).__name__}: {str(ex)[:180]}"
            report["queries"].append(result)
            time.sleep(0.4)
        # Fetch a small selection of original PDF files from documented public URLs only.
        seen_urls=set()
        for did,item in to_fetch:
            url=item["source_pdf"]
            if len(report["pdf_downloads"])>=MAX_PDFS:break
            if url in seen_urls:continue
            seen_urls.add(url)
            try:
                data=get_pdf(url)
                filename="docket-"+str(did)+"-doc-"+str(item["id"] or len(seen_urls))+".pdf"
                (OUT/filename).write_bytes(data)
                report["pdf_downloads"].append({"docket_id":did,"description":item["description"],
                    "source_url":url,"filename":filename,"bytes":len(data),
                    "sha256":hashlib.sha256(data).hexdigest(),"quote_not_yet_verified":True,
                    "roof_permit_verified":False})
            except (HTTPError,URLError,ValueError,OSError) as ex:
                report.setdefault("download_failures",[]).append({"docket_id":did,"url":url,
                     "error_type":type(ex).__name__})
        report["candidate_dockets"]=list(merged.values())
        report["status"]="complete" if all(q["error"] is None for q in report["queries"]) else "partial_query_errors"
    except Exception as ex:
        report["status"]="fatal_error"
        report["error"]=f"{type(ex).__name__}: {str(ex)[:180]}"
    finally:
        (OUT/"SUNRUN_NATIONAL_RECAP.json").write_text(json.dumps(report,indent=2,ensure_ascii=False)+"\n")
        summary={"status":report["status"],"candidate_dockets":len(report["candidate_dockets"]),
                 "pdfs":len(report["pdf_downloads"]),"query_stats":[{"name":q["name"],"seen":q["results_seen"],
                 "matched":q["matching_sunrun_dockets"],"total":q["reported_count"],"error":q["error"]}
                 for q in report["queries"]]}
        print(json.dumps(summary,indent=2))
    return 0 if report["status"] in ("complete","partial_query_errors") else 1


if __name__=="__main__":
    raise SystemExit(run())
