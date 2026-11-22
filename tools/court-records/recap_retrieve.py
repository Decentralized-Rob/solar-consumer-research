#!/usr/bin/env python3
"""Collect PUBLIC original RECAP filing PDFs for a specific federal docket.

No PACER credentials or guessed archive paths. Sunrun/roofing permit eligibility
is never inferred from the existence of a federal docket.
"""
import argparse
import hashlib
import json
import os
import re
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlsplit
from urllib.request import Request, urlopen

API = "https://www.courtlistener.com/api/rest/v4/"
ARCHIVE = "https://storage.courtlistener.com/"
START = "2021-11-22"
END = "2026-11-22"


def api_get(url, token):
    h = {"Accept": "application/json", "User-Agent": "SolarConsumerResearch evidence collector/0.2"}
    if token:
        h["Authorization"] = "Token " + token
    with urlopen(Request(url, headers=h), timeout=35) as r:
        return json.load(r)


def similar_case(a, b):
    # Match ordinary court numbering formats (e.g. 4:2026cv14283 and 4:26-cv-14283).
    def normalize(value):
        m = re.search(r"(\d+):(?:20)?(\d{2})-?cv-?0*(\d+)", str(value), re.I)
        return (m.group(1), m.group(2), int(m.group(3))) if m else None
    return normalize(a) is not None and normalize(a) == normalize(b)


def find_docket(number, court, token):
    # Public search API is a discovery layer; a docket ID must be verified
    # against the docket detail, not merely trusted from the first search hit.
    queries = [f'docketNumber:"{number}"', number]
    candidates = []
    for q in queries:
        url = API + "search/?" + urlencode({"type": "r", "q": q})
        data = api_get(url, token)
        for hit in data.get("results", []):
            found_number = hit.get("docketNumber") or hit.get("docket_number")
            hit_court = str(hit.get("court") or hit.get("court_id") or "")
            if not similar_case(found_number, number):
                continue
            if hit_court and court not in (hit_court, hit_court.rsplit("/", 2)[-2]):
                continue
            url_path = hit.get("absolute_url") or ""
            match = re.search(r"/docket/(\d+)/", url_path)
            docket_id = hit.get("docket_id") or (int(match.group(1)) if match else None)
            if docket_id:
                candidates.append({"id": int(docket_id), "case_name": hit.get("caseName") or hit.get("case_name"),
                                   "docket_number": found_number, "court": hit_court,
                                   "filed_date": hit.get("dateFiled") or hit.get("date_filed"),
                                   "source_url": "https://www.courtlistener.com" + url_path})
        if candidates:
            break
    seen = set()
    return [x for x in candidates if not (x["id"] in seen or seen.add(x["id"]))]


def each_entry(docket_id, token):
    url = API + "docket-entries/?" + urlencode({"docket": docket_id, "page_size": 100})
    while url:
        data = api_get(url, token)
        yield from data.get("results", [])
        url = data.get("next")


def pdf_sources(doc):
    paths = []
    local = str(doc.get("filepath_local") or "").strip()
    # CourtListener filepath_local is a relative archive key, NEVER a URL.
    # Reject absolute URLs, authority-style paths, backslashes and traversal.
    if local and not urlsplit(local).scheme and not local.startswith("//") and "\\" not in local and ".." not in local.split("/"):
        paths.append(ARCHIVE + local.lstrip("/"))
    if doc.get("filepath_ia"):
        paths.append(str(doc["filepath_ia"]))
    result = []
    for path in paths:
        p = urlsplit(path)
        if p.scheme == "https" and p.hostname in {"storage.courtlistener.com", "archive.org", "www.archive.org"}:
            result.append(path)
    return list(dict.fromkeys(result))


def get_pdf(url):
    req = Request(url, headers={"User-Agent": "SolarConsumerResearch evidence collector/0.2"})
    with urlopen(req, timeout=75) as response:
        data = response.read(50_000_001)
    if len(data) > 50_000_000 or b"%PDF-" not in data[:1024]:
        raise ValueError("PDF validation failed or document exceeds 50MB")
    return data


def collect(args):
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    token = os.getenv("COURTLISTENER_API_TOKEN", "")
    manifest = {
        "retrieved_at_utc": datetime.now(timezone.utc).isoformat(),
        "requested_case_number": args.case_number,
        "requested_court": args.court,
        "company": args.company,
        "roofing_permit_verified": False,
        "case_property_match_verified": False,
        "qualifies_for_sunrun_roof_permit_study": False,
        "candidate_case_address": args.address or None,
        "roof_permit_source_url": args.roof_permit_url or None,
        "roof_permit_reference": args.roof_permit_number or None,
        "docket_candidates": [],
        "documents": [],
        "status": "not_started",
        "error": None,
    }
    try:
        if args.court != "mad":
            manifest["status"] = "outside_massachusetts_court_scope"
            return manifest
        if args.company == "sunrun" and not (args.roof_permit_url and args.roof_permit_number and args.address):
            manifest["status"] = "sunrun_roof_permit_evidence_required"
            return manifest
        hits = find_docket(args.case_number, args.court, token)
        manifest["docket_candidates"] = hits
        if not hits:
            manifest["status"] = "not_indexed_in_recap"
            return manifest
        if len(hits) > 1:
            manifest["status"] = "ambiguous_dockets_review_needed"
            return manifest
        found = hits[0]
        docket = api_get(API + f"dockets/{found['id']}/", token)
        if str(docket.get("court_id")) != args.court or not similar_case(docket.get("docket_number"), args.case_number):
            manifest["status"] = "docket_detail_mismatch"
            return manifest
        manifest["verified_docket"] = {
            "id": found["id"], "url": "https://www.courtlistener.com/docket/" + str(found["id"]) + "/",
            "name": docket.get("case_name_full") or docket.get("case_name"),
            "docket_number": docket.get("docket_number"),
            "court": docket.get("court_id"),
            "filed_date": docket.get("date_filed"),
        }
        filed = str(docket.get("date_filed") or "")[:10]
        if filed and (filed < START or filed > END):
            manifest["status"] = "outside_requested_filing_window"
            return manifest
        entries = list(each_entry(found["id"], token))
        manifest["entry_count"] = len(entries)
        for entry in entries:
            for doc in entry.get("recap_documents") or []:
                row = {
                    "entry_number": entry.get("entry_number"),
                    "date_filed": entry.get("date_filed"),
                    "document_id": doc.get("id"),
                    "document_number": doc.get("document_number"),
                    "attachment_number": doc.get("attachment_number"),
                    "description": doc.get("description") or entry.get("description"),
                    "available_in_api": doc.get("is_available"),
                    "is_sealed": doc.get("is_sealed"),
                    "sources": pdf_sources(doc),
                    "status": "unavailable_no_documented_url",
                }
                if doc.get("is_sealed") is True:
                    row["status"] = "sealed_not_fetched"
                elif row["sources"]:
                    row["status"] = "indexed"
                    if args.download:
                        for source in row["sources"]:
                            try:
                                data = get_pdf(source)
                                actual_sha1 = hashlib.sha1(data).hexdigest()
                                expected_sha1 = str(doc.get("sha1") or "").lower()
                                if expected_sha1 and expected_sha1 != actual_sha1:
                                    raise ValueError("CourtListener SHA1 mismatch")
                                fname = f"entry-{entry.get('entry_number')}-doc-{doc.get('id')}.pdf"
                                (out / fname).write_bytes(data)
                                row.update(status="verified_pdf", filename=fname,
                                           byte_length=len(data), sha1=actual_sha1,
                                           sha256=hashlib.sha256(data).hexdigest(), actual_source=source)
                                break
                            except (HTTPError, URLError, OSError, ValueError) as e:
                                row.setdefault("failures", []).append(f"{type(e).__name__}: {str(e)[:160]}")
                        if row["status"] != "verified_pdf":
                            row["status"] = "failed_documented_sources"
                manifest["documents"].append(row)
        if not args.download:
            manifest["status"] = "completed_index_only"
        elif any(item["status"] == "verified_pdf" for item in manifest["documents"]):
            manifest["status"] = "completed_with_pdfs"
        else:
            manifest["status"] = "no_public_pdfs_found"
    except HTTPError as e:
        manifest["status"] = "api_error"
        manifest["error"] = f"HTTP {e.code}: authentication may be needed (no credentials are logged)"
    except (URLError, OSError, ValueError, TypeError, KeyError) as e:
        manifest["status"] = "collector_error"
        manifest["error"] = f"{type(e).__name__}: {str(e)[:250]}"
    finally:
        (out / "MANIFEST.json").write_text(json.dumps(manifest, indent=2, ensure_ascii=False) + "\n")
    return manifest


def main():
    p = argparse.ArgumentParser(description=__doc__)
    p.add_argument("--case-number", required=True)
    p.add_argument("--court", required=True, help="CourtListener court id e.g. mad")
    p.add_argument("--company", choices=("sunrun", "giga"), required=True)
    p.add_argument("--address", default="")
    p.add_argument("--roof-permit-url", default="", help="Official source URL for verified matching roof permit")
    p.add_argument("--roof-permit-number", default="", help="Matching permit reference, manually verified")
    p.add_argument("--out", default="court-recap-output")
    p.add_argument("--download", action="store_true")
    args = p.parse_args()
    m = collect(args)
    print(json.dumps({"status": m["status"], "error": m.get("error"),
          "candidates": m["docket_candidates"],
          "entries": m.get("entry_count", 0), "pdfs": sum(x["status"] == "verified_pdf" for x in m["documents"]),
          "documents_indexed": len(m["documents"])}, indent=2))
    return 0 if m["status"] in ("completed_with_pdfs", "completed_index_only", "not_indexed_in_recap") else 1


if __name__ == "__main__":
    sys.exit(main())
