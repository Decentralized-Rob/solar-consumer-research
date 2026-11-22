#!/usr/bin/env python3
"""Discover candidate Giga Property Solutions federal dockets in CourtListener.

Discovery only: candidate matches are not verified filings, documents, or permits.
Massachusetts state trial-court cases are NOT covered by this search.
"""
from __future__ import annotations
import argparse
import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

API = "https://www.courtlistener.com/api/rest/v4/search/"
START = "2021-11-22"
END = "2026-11-22"
MAX_PAGES = 6
NAME = "Giga Property Solutions"


def api_search(url: str) -> dict:
    headers = {"Accept": "application/json", "User-Agent": "SolarConsumerResearch RECAP discovery/0.1"}
    token = os.getenv("COURTLISTENER_API_TOKEN", "").strip()
    if token:
        headers["Authorization"] = "Token " + token
    with urlopen(Request(url, headers=headers), timeout=35) as response:
        return json.load(response)


def search(company: str = NAME, court: str = "mad", fetch=api_search) -> dict:
    if company != NAME:
        raise ValueError("This workflow is restricted to the Giga Property Solutions research target")
    if court != "mad":
        raise ValueError("Massachusetts-only scope requires court=mad")
    q = f'caseName:"{company}"'
    # type=d returns federal dockets without truncated nested document matches
    url = API + "?" + urlencode({"type": "d", "q": q, "order_by": "dateFiled desc"})
    pages = 0
    results_seen = 0
    candidates = []
    seen = set()
    while url and pages < MAX_PAGES:
        data = fetch(url)
        pages += 1
        for hit in data.get("results", []):
            results_seen += 1
            title = str(hit.get("caseName") or hit.get("case_name") or "")
            docket = str(hit.get("docketNumber") or hit.get("docket_number") or "")
            filed = str(hit.get("dateFiled") or hit.get("date_filed") or "")[:10]
            court_id = str(hit.get("court_id") or hit.get("court") or "")
            absolute_url = str(hit.get("absolute_url") or "")
            if not re.search(r"\bgiga\s+property\s+solutions\b", title, re.I):
                continue
            if not filed or not START <= filed <= END:
                continue
            if court_id.lower().strip("/") not in ("mad", "https://www.courtlistener.com/api/rest/v4/courts/mad") and not court_id.lower().endswith("/courts/mad/"):
                continue
            match = re.search(r"/docket/(\d+)/", absolute_url)
            docket_id = hit.get("docket_id") or (int(match.group(1)) if match else None)
            if not docket_id or str(docket_id) in seen:
                continue
            seen.add(str(docket_id))
            candidates.append({
                "docket_id": int(docket_id),
                "docket_number": docket,
                "case_title": title,
                "court": court_id,
                "filed_date": filed,
                "source": "https://www.courtlistener.com/docket/" + str(docket_id) + "/",
                "verification": "candidate_only",
            })
        nxt = data.get("next")
        if nxt and not str(nxt).startswith(API):
            raise ValueError("Unexpected external pagination URL")
        url = nxt
    return {
        "searched_at_utc": datetime.now(timezone.utc).isoformat(),
        "scope": "Massachusetts US District Court only (mad). Massachusetts state cases NOT indexed here.",
        "company": company,
        "start_date": START,
        "end_date": END,
        "pages_fetched": pages,
        "results_seen": results_seen,
        "search_complete": not bool(url),
        "matches": candidates,
        "count": len(candidates),
        "status": ("found_candidates" if candidates else
                   "no_candidates_indexed" if not url else
                   "search_incomplete_no_matches"),
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--out", default="court-recap-output")
    p.add_argument("--court", default="mad", choices=("mad",), help="District of Massachusetts federal court only")
    args = p.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    try:
        if not os.getenv("COURTLISTENER_API_TOKEN", "").strip():
            result = {"status": "requires_courtlistener_token", "count": 0,
                      "matches": [], "search_attempted": False, "scope": "District of Massachusetts federal only; state-court cases not checked",
                      "message": "CourtListener API returned HTTP 401 in live GitHub Actions; add COURTLISTENER_API_TOKEN as repository Actions secret."}
        else:
            result = search(court=args.court)
            result["search_attempted"] = True
    except (HTTPError, URLError, OSError, ValueError, TypeError) as e:
        result = {"status": "search_failed", "error_type": type(e).__name__,
                  "message": str(e)[:200], "matches": [], "count": 0}
    (out / "DISCOVERY.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"status": result["status"], "count": result["count"],
                      "pages_fetched": result.get("pages_fetched"),
                      "results_seen": result.get("results_seen"),
                      "search_complete": result.get("search_complete"),
                      "error_type": result.get("error_type")}))
    return 1 if result["status"] == "search_failed" else 0


if __name__ == "__main__":
    sys.exit(main())
