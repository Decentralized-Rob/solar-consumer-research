"""Find ONE Barnstable property with an earlier roofing permit and subsequent Sunrun solar permit.
Read original public monthly permit PDFs; preserve exact source and row page numbers.
No inferred pairs. This replaces a broken prior PDF extraction script.
"""
from __future__ import annotations
import concurrent.futures, datetime as dt, json, re, unicodedata
from pathlib import Path
import requests
import fitz

OUT = Path("barnstable_roof_before_sunrun")
OUT.mkdir(exist_ok=True)
BASE = "https://tobweb.town.barnstable.ma.us/Departments/Building/Office_Resources/"
MONTHS = "January February March April May June July August September October November December".split()
SOURCES = [{"year":year, "month":m, "url":BASE + f"{month}-{year}.pdf"}
           for year in (2024, 2025, 2026) for m, month in enumerate(MONTHS, 1)
           if not (year == 2026 and m > 10)]
PERMIT_RE = re.compile(r"(EXPR|BLDR|BLDC)(2[0-9])([0-9]+)", re.I)
SUNRUN_RE = re.compile(r"sun\s*run|ste(?:ph|v)en\s*kelly", re.I)
ROOF_RE = re.compile(r"re[\s-]?roof|roofing|shingl|replace.{0,30}roof|strip.{0,30}roof|roof.{0,30}replace", re.I)
VILLAGES = ["MARSTONS MILLS", "WEST BARNSTABLE", "BARNSTABLE", "CENTERVILLE", "HYANNIS", "COTUIT", "OSTERVILLE"]

def clean(s):
    return re.sub(r"\s+", " ", s or "").strip()

def normalize_address(addr):
    addr = unicodedata.normalize("NFKD", addr or "").upper()
    addr = addr.split(",")[0].strip()
    # Table text frequently has no spaces: "45AMESWAY Centerville".
    addr = re.sub(r"[\s,.-]+", "", addr)
    for village in VILLAGES:
        v = re.sub(r"[^A-Z]", "", village)
        if addr.endswith(v):
            addr = addr[:-len(v)]
    for old,new in (("ROAD","RD"),("STREET","ST"),("AVENUE","AVE"),("DRIVE","DR"),("LANE","LN")):
        addr = addr.replace(old,new)
    return addr

def permit_date(raw):
    match = re.search(r"(\d{1,2})/(\d{1,2})/(20\d\d)", raw or "")
    if not match: return None
    try: return dt.date(int(match[3]),int(match[1]),int(match[2]))
    except ValueError: return None

def fetch_report(source):
    url = source["url"]
    try:
        resp = requests.get(url, timeout=28, headers={"User-Agent":"Mozilla/5.0"})
        if resp.status_code != 200 or resp.content[:4] != b"%PDF":
            return {**source, "status":resp.status_code, "error":"No PDF", "records":[]}
        pdf = fitz.open(stream=resp.content, filetype="pdf")
        extracted = []
        for ix, page in enumerate(pdf):
            txt = page.get_text("text")
            if not re.search(r"sun\s*run|ste(?:ph|v)en\s*kelly|giga|espigar|roof|shingle",txt,re.I):
                continue
            try:
                tables = page.find_tables().tables
            except Exception:
                continue
            for table in tables:
                for cells in table.extract():
                    if not cells or len(cells)<8: continue
                    permit = re.sub(r"[^A-Z0-9]","",cells[0].upper() if cells[0] else "")
                    match = PERMIT_RE.search(permit)
                    if not match: continue
                    applicant, description, addr = [clean(x) for x in cells[5:8]]
                    if not addr: continue
                    record = {"permit":f"{match[1]}-{match[2]}-{match[3]}",
                              "date":clean(cells[2]),"applicant":applicant,
                              "description":description,"address":addr,
                              "page":ix+1,"source":url}
                    if SUNRUN_RE.search(applicant) and re.search(r"solar|photovoltaic|panel",description,re.I):
                        record["kind"]="sunrun"
                    elif ROOF_RE.search(description) and (record["permit"].startswith("EXPR-") or "roof" in description.lower()):
                        record["kind"]="roof"
                    else: continue
                    extracted.append(record)
        print("REPORT",source["year"],source["month"],"SUNRUN",sum(x["kind"]=="sunrun" for x in extracted),"ROOF",sum(x["kind"]=="roof" for x in extracted),flush=True)
        return {**source,"status":200,"pages":len(pdf),"records":extracted}
    except Exception as exc:
        print("ERROR_REPORT",source["year"],source["month"],repr(exc)[:250],flush=True)
        return {**source,"error":repr(exc)[:200],"records":[]}

with concurrent.futures.ThreadPoolExecutor(max_workers=6) as pool:
    reports = list(pool.map(fetch_report,SOURCES))
all_records = [r for s in reports for r in s["records"]]
solar = [x for x in all_records if x["kind"]=="sunrun"]
roof = [x for x in all_records if x["kind"]=="roof"]
roof_by_address = {}
for item in roof:
    roof_by_address.setdefault(normalize_address(item["address"]), []).append(item)
matches = []
for sun in solar:
    key = normalize_address(sun["address"])
    sun_date = permit_date(sun["date"])
    if not sun_date: continue
    for pre in roof_by_address.get(key, []):
        roof_date = permit_date(pre["date"])
        if roof_date and roof_date < sun_date:
            matches.append({"address": sun["address"],
                            "roof":pre,"solar":sun,
                            "days_between":(sun_date-roof_date).days,
                            "giga_roof":bool(re.search(r"giga|espigar",pre["applicant"],re.I))})
matches.sort(key=lambda x:(x["giga_roof"], permit_date(x["solar"]["date"]) or dt.date.min),reverse=True)
print("TOTALS", "reports",len(reports),"solar",len(solar),"roof",len(roof),"same_address_prior_roof",len(matches),flush=True)
for result in matches[:8]:
    print("CONFIRMED_MATCH",json.dumps(result,ensure_ascii=False),flush=True)
(OUT/"MATCHES.json").write_text(json.dumps(matches[:10],indent=2,ensure_ascii=False))
(OUT/"SUMMARY.json").write_text(json.dumps({"reports_checked":len(reports),"sunrun":len(solar),"roof":len(roof),"matched":len(matches),"first_match":matches[0] if matches else None},indent=2,ensure_ascii=False))
