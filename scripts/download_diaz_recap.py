#!/usr/bin/env python3
"""Bounded public-archive retrieval for Diaz v. Sunrun (D.N.J. 1:24-cv-11462).
No PACER fetches or payments. No guessed PDF addresses. Court records only.
"""
import csv
import hashlib
import json
import os
from pathlib import Path
import time
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode, urlparse
from urllib.request import Request, urlopen

DOCKET_ID = 69498648
BASE = "https://www.courtlistener.com/api/rest/v4/"
OUT = Path("output/diaz")
TARGETS = {1: 4, 4: 4, 5: 11, 6: 4}
PRIORITY = [(5, 4), (5, 5), (5, 7), (5, 11),
            (5, 0), (4, 0), (1, 0), (6, 0)]
MAX_API_CALLS = 18
MAX_PDFS = 15
MAX_BYTES = 25_000_000
MIN_SPACING = 15.0
token = os.environ.get("COURTLISTENER_API_TOKEN", "").strip()
api_calls = 0
last_call = None


def api_json(url):
    global api_calls, last_call
    parsed = urlparse(url)
    if (parsed.scheme != "https" or parsed.hostname != "www.courtlistener.com"
            or not parsed.path.startswith("/api/rest/v4/")):
        raise ValueError("Untrusted API endpoint")
    if api_calls >= MAX_API_CALLS:
        raise RuntimeError("API request cap reached")
    if last_call is not None:
        time.sleep(max(0, MIN_SPACING - (time.monotonic() - last_call)))
    last_call = time.monotonic()
    api_calls += 1
    req = Request(url, headers={"Authorization": "Token " + token,
                                 "Accept": "application/json",
                                 "User-Agent": "SolarConsumerResearchDiazAudit/1.0"})
    # Deliberately no rapid retry on 429; avoid exhausting shared token limits.
    with urlopen(req, timeout=45) as response:
        return json.load(response)


def pdf_source(doc):
    if doc.get("is_sealed") is True:
        return None
    path = str(doc.get("filepath_local") or "")
    if (path and not urlparse(path).scheme and not path.startswith("/")
            and not path.startswith("//") and ".." not in path.split("/")
            and chr(92) not in path):
        return "https://storage.courtlistener.com/" + path
    archive = str(doc.get("filepath_ia") or "")
    u = urlparse(archive)
    if u.scheme == "https" and u.hostname in ("archive.org", "www.archive.org"):
        return archive
    return None


def fetch_pdf(url):
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.hostname not in (
            "storage.courtlistener.com", "archive.org", "www.archive.org"):
        raise ValueError("Untrusted original-PDF source")
    req = Request(url, headers={"User-Agent": "SolarConsumerResearchDiazAudit/1.0"})
    with urlopen(req, timeout=60) as response:
        if urlparse(response.url).hostname not in (
                "storage.courtlistener.com", "archive.org", "www.archive.org"):
            raise ValueError("Unexpected PDF redirect")
        data = response.read(MAX_BYTES + 1)
    if len(data) > MAX_BYTES or not data.startswith(b"%PDF-"):
        raise ValueError("Not a PDF or exceeds size limit")
    return data


def attachment_number(doc):
    a = doc.get("attachment_number")
    if a in (None, ""):
        return 0
    return int(a)


def resolve_doc(raw):
    if isinstance(raw, str):
        return api_json(raw)
    if not isinstance(raw, dict):
        raise ValueError("Unrecognized nested RECAP document")
    if "filepath_local" in raw or "is_available" in raw:
        return raw
    ref = raw.get("resource_uri") or raw.get("url")
    if not ref and raw.get("id") is not None:
        ref = BASE + "recap-documents/" + str(int(raw["id"])) + "/"
    if ref:
        return api_json(ref)
    raise ValueError("Document metadata not in API entry")


def main():
    global api_calls
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "pdfs").mkdir(exist_ok=True)
    report = {
        "case": "Diaz v. Sunrun, Inc.", "case_number": "1:24-cv-11462",
        "docket_id": DOCKET_ID, "docket": "https://www.courtlistener.com/docket/69498648/diaz-v-sunrun-inc/",
        "scope": "Original publicly archived ECF 1, 4, 5, 6 and exhibits; ECF 7 opinion already known and excluded",
        "status": "started", "api_calls": 0, "pdfs_downloaded": 0,
        "complete_docket_entry_scan": False, "items": [], "errors": [],
        "note": "New-to-user status and evidentiary content require independent review; an absent RECAP copy is not a missing court filing."
    }
    discovered = []
    try:
        if not token:
            raise RuntimeError("COURTLISTENER_API_TOKEN is not configured")
        d = api_json(BASE + "dockets/" + str(DOCKET_ID) + "/")
        if ("sunrun" not in str(d.get("case_name") or d.get("case_name_full") or "").lower()
                or "11462" not in str(d.get("docket_number") or "")
                or "diaz" not in str(d.get("case_name") or d.get("case_name_full") or "").lower()):
            raise RuntimeError("CourtListener docket identity mismatch")
        url = BASE + "docket-entries/?" + urlencode({
            "docket": DOCKET_ID, "page_size": 100, "omit": "recap_documents__plain_text"})
        seen = {}
        for _ in range(5):
            if not url:
                break
            page = api_json(url)
            for entry in page.get("results", []):
                try:
                    ecf = int(entry.get("entry_number"))
                except (TypeError, ValueError):
                    continue
                if ecf in TARGETS:
                    seen[ecf] = entry
            url = page.get("next")
        report["complete_docket_entry_scan"] = not bool(url)
        if url:
            report["errors"].append("Docket entry pagination truncated at 5 pages")
        for ecf in TARGETS:
            entry = seen.get(ecf)
            if not entry:
                report["errors"].append("ECF " + str(ecf) + " missing from current RECAP docket-entry response")
                continue
            for raw in entry.get("recap_documents") or []:
                if isinstance(raw, dict):
                    number = attachment_number(raw)
                else:
                    number = None
                discovered.append((ecf, number, raw, entry.get("description") or ""))
        # Resolve strategically important exhibits first; this is not an indiscriminate download.
        def rank(item):
            key = (item[0], item[1])
            return PRIORITY.index(key) if key in PRIORITY else (100 + item[0] * 20 + (item[1] or 0))
        discovered.sort(key=rank)
        counts = 0
        for ecf, hint, raw, entry_desc in discovered:
            row = {"ecf": ecf, "attachment": hint, "description": entry_desc[:250],
                   "status": "", "file": "", "source": "", "sha256": "", "error": ""}
            try:
                doc = resolve_doc(raw)
                number = attachment_number(doc)
                row["attachment"] = number
                row["description"] = str(doc.get("description") or entry_desc)[:250]
                url = pdf_source(doc)
                if not url:
                    row["status"] = "no_documented_public_pdf_url"
                elif counts >= MAX_PDFS:
                    row["status"] = "deferred_max_pdf_cap"
                    row["source"] = url
                else:
                    row["source"] = url
                    data = fetch_pdf(url)
                    expected = str(doc.get("sha1") or "").lower()
                    if len(expected) == 40 and hashlib.sha1(data).hexdigest() != expected:
                        raise ValueError("RECAP SHA-1 checksum mismatch")
                    document_id = str(doc.get("id") or "unknown")
                    filename = f"ECF-{ecf:03d}_{number:02d}_doc-{document_id}.pdf"
                    (OUT / "pdfs" / filename).write_bytes(data)
                    row["file"] = "pdfs/" + filename
                    row["sha256"] = hashlib.sha256(data).hexdigest()
                    row["status"] = "downloaded_public_original"
                    counts += 1
            except HTTPError as ex:
                row["status"] = "unavailable_or_api_error"
                row["error"] = "HTTP " + str(ex.code)
                if ex.code == 429:
                    report["errors"].append("Rate-limited at RECAP API; stopped retrieval")
                    report["items"].append(row)
                    break
            except (URLError, OSError, ValueError, RuntimeError, TypeError) as ex:
                row["status"] = "unavailable_or_api_error"
                row["error"] = type(ex).__name__ + ": " + str(ex)[:130]
                if "API request cap" in str(ex):
                    report["errors"].append("Reached shared API call safety cap")
                    report["items"].append(row)
                    break
            report["items"].append(row)
        represented = {(x["ecf"], x["attachment"]) for x in report["items"]}
        for ecf, max_attachment in TARGETS.items():
            for att in range(max_attachment + 1):
                if (ecf, att) not in represented:
                    report["items"].append({
                        "ecf": ecf, "attachment": att, "description": "",
                        "status": "not_listed_in_recap_response", "file": "",
                        "source": "", "sha256": "", "error": ""})
        report["pdfs_downloaded"] = counts
        report["status"] = "partial" if report["errors"] else "completed"
    except (HTTPError, URLError, OSError, ValueError, RuntimeError) as ex:
        report["errors"].append(type(ex).__name__ + ": " + (("HTTP " + str(ex.code)) if isinstance(ex, HTTPError) else str(ex)[:160]))
        report["status"] = "failed"
    finally:
        report["api_calls"] = api_calls
        (OUT / "manifest.json").write_text(json.dumps(report, indent=2) + "\n")
        with (OUT / "filing_index.csv").open("w", newline="") as f:
            writer = csv.DictWriter(f, fieldnames=[
                "ecf", "attachment", "description", "status", "file", "source", "sha256", "error"])
            writer.writeheader()
            writer.writerows(report["items"])
        (OUT / "START_HERE.txt").write_text(
            "Diaz v Sunrun | D.N.J. 1:24-cv-11462\n"
            "New-target PDFs recovered: " + str(report["pdfs_downloaded"]) + "\n"
            "API calls: " + str(api_calls) + "\n"
            "Read filing_index.csv for specific document availability.\n"
            "The known ECF 7 opinion is not downloaded. All PDF source links come from RECAP metadata.\n"
            "No PACER paid access or sealed record retrieval.\n")
        print(json.dumps({
            "status": report["status"], "pdfs_downloaded": report["pdfs_downloaded"],
            "api_calls": api_calls, "errors": report["errors"]}, indent=2), flush=True)
    return 0 if report["status"] == "completed" else 1


if __name__ == "__main__":
    raise SystemExit(main())
