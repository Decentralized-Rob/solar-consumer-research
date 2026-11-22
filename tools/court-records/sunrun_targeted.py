#!/usr/bin/env python3
"""Rate-limited, incremental PUBLIC CourtListener RECAP audit of unreviewed Sunrun cases.

Intended outcomes: original PDF bytes and verifiable, new case-specific document
findings only. Nothing is labeled a verified roof-permit match without a permit.
No CourtListener full-text search requests. No guessed URLs or sealed material.
"""
from __future__ import annotations
import hashlib
import json
import os
import re
import time
from datetime import datetime, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

API = "https://www.courtlistener.com/api/rest/v4/"
OUT = Path("sunrun-targeted-records")
# Cases NOT already listed in the previously collected Sunrun litigation register.
# Case IDs are from the authenticated CourtListener 2026-11-22 inventory.
TARGETS = [
    (73113204, "Wardwell", "ctd"),
    (70578462, "Correa", "txsd"),
    (71488279, "Allen", "utd"),
    (74811921, "Johnson", "ilnd"),
    (74748382, "Yliniemi", "hid"),
    (63136125, "Aguilar", "txsd"),
]
# Exclusions reflect known irrelevant subjects, not negative findings about conduct.
NOT_RELEVANT = re.compile(r"telephone consumer protection|telemarket|robocall|employment|labor|wage|"
                          r"retaliation|discrimination|disability|civil rights|securities fraud|"
                          r"patent infringement|trademark infringement", re.I)
SUBSTANTIVE = re.compile(r"\broof(?:ing)?\b|roof leak|roof damag|forg(?:ed|ery)|"
                         r"\bsignature\b|change order|homeowner authoriz|permit|"
                         r"third.party|subcontract|contractor|misrepresent|arbitrat", re.I)
FILE_TERMS = re.compile(r"\bcomplaint\b|\bdeclaration\b|\bexhibit\b|\baffidavit\b|\bopposition\b|"
                        r"memorandum|motion|order", re.I)
MIN_SECONDS = 13.0
MAX_REQUESTS = 18
MAX_PDFS = 4
MAX_PDF_BYTES = 20_000_000
_last_request = 0.0
_requests = 0


def rest(url: str):
    global _last_request, _requests
    if _requests >= MAX_REQUESTS:
        raise RuntimeError("bounded_request_budget_reached")
    token = os.getenv("COURTLISTENER_API_TOKEN", "").strip()
    if not token:
        raise RuntimeError("CourtListener API token absent")
    headers = {"Authorization": "Token " + token, "Accept": "application/json",
               "User-Agent": "SolarConsumerResearch public RECAP evidence audit/0.3"}
    for attempt in range(3):
        wait = MIN_SECONDS - (time.monotonic() - _last_request)
        if wait > 0:
            time.sleep(wait)
        _last_request = time.monotonic()
        _requests += 1
        try:
            with urlopen(Request(url, headers=headers), timeout=40) as response:
                return json.load(response)
        except HTTPError as e:
            if e.code != 429 or attempt == 2:
                raise
            retry_after = e.headers.get("Retry-After", "45")
            try:
                seconds = min(180, max(45, int(retry_after)))
            except ValueError:
                try:
                    seconds = min(180, max(45, (parsedate_to_datetime(retry_after) -
                                  datetime.now(timezone.utc)).total_seconds()))
                except Exception:
                    seconds = 60
            print("rate_limited_backoff_seconds", int(seconds), flush=True)
            time.sleep(seconds)
    raise RuntimeError("retry_budget_exhausted")


def listed_pdf_urls(document: dict) -> list[str]:
    paths = []
    local = str(document.get("filepath_local") or "")
    if local and not urlsplit(local).scheme and not local.startswith("//") and ".." not in local.split("/") and "\\" not in local:
        paths.append("https://storage.courtlistener.com/" + local.lstrip("/"))
    archive = str(document.get("filepath_ia") or "")
    parsed = urlsplit(archive)
    if parsed.scheme == "https" and parsed.hostname in ("archive.org", "www.archive.org"):
        paths.append(archive)
    return paths


def save_original_pdf(doc, case_id, entry_no, out: Path):
    for url in listed_pdf_urls(doc):
        try:
            with urlopen(Request(url, headers={"User-Agent": "SolarConsumerResearch research/0.3"}),
                         timeout=50) as response:
                blob = response.read(MAX_PDF_BYTES + 1)
            if len(blob) > MAX_PDF_BYTES or b"%PDF-" not in blob[:1024]:
                continue
            digest = hashlib.sha1(blob).hexdigest()
            expected = str(doc.get("sha1") or "").strip().lower()
            if expected and digest != expected:
                continue
            fname = "case-"+str(case_id)+"-entry-"+str(entry_no)+"-doc-"+str(doc.get("id"))+".pdf"
            (out / fname).write_bytes(blob)
            return {"file":fname, "source":url, "bytes":len(blob),
                    "sha1":digest,"sha256":hashlib.sha256(blob).hexdigest()}
        except (HTTPError, URLError, OSError, ValueError):
            continue
    return None


def run():
    OUT.mkdir(exist_ok=True)
    report = {"queried_at_utc": datetime.now(timezone.utc).isoformat(),
              "scope":"Unreviewed candidate Sunrun FEDERAL dockets only. A municipal ROOFING permit is required to qualify.",
              "status":"incomplete",
              "documents_new":[],
              "potentially_relevant_unverified":[],
              "excluded_unrelated":0,
              "no_matching_evidence":0,
              "errors":[],
              "requests":0,
              "pdf_count":0,
              "municipal_roof_permit_matches_verified":0}
    pdf_count = 0
    for case_id, short_name, expected_court in TARGETS:
        try:
            docket = rest(API + f"dockets/{case_id}/")
            title = str(docket.get("case_name") or docket.get("case_name_full") or "")
            if "sunrun" not in title.lower() or str(docket.get("court_id")) != expected_court:
                report["errors"].append({"id":case_id,"reason":"docket_identity_mismatch"})
                continue
            nature = str(docket.get("nature_of_suit") or "")
            cause = str(docket.get("cause") or "")
            if NOT_RELEVANT.search(" ".join([nature,cause])):
                report["excluded_unrelated"] += 1
                continue
            url=API + "docket-entries/?" + urlencode({"docket":case_id,"page_size":100})
            data=rest(url)
            entries=list(data.get("results", []))
            total_entries=data.get("count")
            hits=[]
            # No pagination in initial screening; report incomplete coverage explicitly.
            for entry in entries:
                desc=str(entry.get("description") or "")
                docs=entry.get("recap_documents") or []
                if SUBSTANTIVE.search(desc):
                    hits.append({"entry":entry.get("entry_number"),"date":entry.get("date_filed"),
                                 "description":desc[:450],"document_ids":[d.get("id") for d in docs]})
                if pdf_count >= MAX_PDFS or len(report["documents_new"])>=MAX_PDFS:
                    continue
                if not (SUBSTANTIVE.search(desc) or (
                        FILE_TERMS.search(desc) and SUBSTANTIVE.search(cause + " " + nature))):
                    continue
                for doc in docs:
                    if doc.get("is_sealed") is True or not listed_pdf_urls(doc):
                        continue
                    saved=save_original_pdf(doc,case_id,entry.get("entry_number"),OUT)
                    if saved:
                        pdf_count += 1
                        report["documents_new"].append({"case_id":case_id,"case":title,
                            "docket_number":docket.get("docket_number"),
                            "court":expected_court,
                            "entry":entry.get("entry_number"),
                            "filed":entry.get("date_filed"),
                            "description":desc[:450],
                            "verification":"Original archived PDF saved. Novelty/content and municipal roofing permit NOT yet established.",
                            **saved})
                        break
            if hits:
                report["potentially_relevant_unverified"].append({
                    "id":case_id,"case":title, "court":expected_court,
                    "docket_number":docket.get("docket_number"),"nature":nature,"cause":cause,
                    "entries_examined":len(entries),"entries_in_docket":total_entries,
                    "all_entries_checked":not bool(data.get("next")),
                    "matches":hits[:12]})
            else:
                report["no_matching_evidence"] += 1
        except (HTTPError,URLError,OSError,ValueError,RuntimeError,TypeError) as exc:
            err={"case_id":case_id,"error_type":type(exc).__name__}
            if isinstance(exc,HTTPError):err["http_status"]=exc.code
            report["errors"].append(err)
            if isinstance(exc,HTTPError) and exc.code==429:
                break  # stop rate-limited batch; do not hammer service
        if _requests >= MAX_REQUESTS:break
    report["requests"]=_requests
    report["pdf_count"]=pdf_count
    report["status"]="rate_limited_or_partial" if report["errors"] else "completed"
    (OUT/"TARGETED_RESULTS.json").write_text(json.dumps(report,indent=2)+"\n")
    print(json.dumps({
        "status":report["status"],
        "api_requests":_requests,
        "new_pdf_bytes_retrieved":pdf_count,
        "potentially_relevant_unverified":report["potentially_relevant_unverified"],
        "excluded_unrelated_count":report["excluded_unrelated"],
        "no_matching_evidence_count":report["no_matching_evidence"],
        "errors":report["errors"],
    },indent=2),flush=True)
    return 0


if __name__=="__main__":
    raise SystemExit(run())
