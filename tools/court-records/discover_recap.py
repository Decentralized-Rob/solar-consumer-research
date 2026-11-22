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


def search(company: str = NAME, court: str = "", fetch=api_search) -> dict:
    if company != NAME:
        raise ValueError("This workflow is restricted to the Giga Property Solutions research target")
    q = f'caseName:"{company}"'
    # type=d returns federal dockets without truncated nested document matches
    url = API + "?" + urlencode({"type": "d", "q": q})
    pages = 0
    candidates = []
    seen = set()
    while url and pages < MAX_PAGES:
        data = fetch(url)
        pages += 1
        for hit in data.get("results", []):
            title = str(hit.get("caseName") or hit.get("case_name") or "")
            docket = str(hit.get("docketNumber") or hit.get("docket_number") or "")
            filed = str(hit.get("dateFiled") or hit.get("date_filed") or "")[:10]
            court_id = str(hit.get("court_id") or hit.get("court") or "")
            absolute_url = str(hit.get("absolute_url") or "")
            if not re.search(r"\bgiga\s+property\s+solutions\b", title, re.I):
                continue
            if not filed or not START <= filed <= END:
                continue
            if court and court not in court_id.lower().split("/"):
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
        "scope": "Federal RECAP only. Massachusetts state cases excluded.",
        "company": company,
        "start_date": START,
        "end_date": END,
        "pages_fetched": pages,
        "search_complete": not bool(url),
        "matches": candidates,
        "count": len(candidates),
        "status": "found_candidates" if candidates else "no_candidates_indexed",
    }


def main():
    p = argparse.ArgumentParser()
    p.add_argument("--out", default="court-recap-output")
    p.add_argument("--court", default="", help="Optional CourtListener court short-id, e.g. mad")
    args = p.parse_args()
    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)
    try:
        result = search(court=args.court)
    except (HTTPError, URLError, OSError, ValueError, TypeError) as e:
        result = {"status": "search_failed", "error_type": type(e).__name__,
                  "message": str(e)[:200], "matches": [], "count": 0}
    (out / "DISCOVERY.json").write_text(json.dumps(result, indent=2) + "\n")
    print(json.dumps({"status": result["status"], "count": result["count"]}))
    return 1 if result["status"] == "search_failed" else 0


if __name__ == "__main__":
    sys.exit(main())
