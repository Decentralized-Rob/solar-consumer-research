# Court PDF recovery — research workflow

This is **not part of the production site**. It does not publish cases, generate legal claims, or scrape Massachusetts Trial Court public dockets.

## Case qualification

- Dates: November 22, 2021 through November 22, 2026.
- **Giga Property Solutions**: court cases involving the Massachusetts business. Search federal RECAP and the Massachusetts state-court docket separately.
- **Sunrun**: include only cases with a verified **roofing permit** for the case property. A solar/electrical permit alone does not qualify.
- Need: case number + official court docket + case-property evidence + roof-permit number/source for Sunrun.
- Do not include unrelated house-fire cases.

## What the code does

- `discover_recap.py`: one read-only company-name search against CourtListener's **federal** docket index. Outputs `DISCOVERY.json` with genuine candidates only. Cannot search MA state trial courts.
- `recap_retrieve.py`: given a specific **verified federal** docket number and court ID, enumerate RECAP documents and fetch originals **only from documented archival URLs**. Writes `MANIFEST.json` and validates PDF signatures and hashes.
- Missing/unavailable PDFs remain missing. No guessed PACER IDs, recreation of unseen filings, paid access bypass or sealed-file access.
- For Sunrun, inputs for the permit are mandatory but still require **human verification** before publication. The collector intentionally cannot mark the match independently verified.

## Verified live blocker (Nov 22, 2026)

The first GitHub Actions test reached the CourtListener API, which returned **HTTP 401** because the repository has no `COURTLISTENER_API_TOKEN` secret. This is a credentials problem, **not proof of zero cases**. The run preserved its failure manifest.

To enable the live search:

1. Create a free CourtListener account and obtain your API token at https://www.courtlistener.com/profile/api-token/
2. In GitHub, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Set the secret name to `COURTLISTENER_API_TOKEN` and paste the token as the value. Do not add the word `Token`; the Python client prefixes it.
4. Re-run the research PR's `live-giga-discovery` workflow through GitHub after the secret is set (a new PR update triggers it). Review the resulting artifact rather than relying on the job's green/red badge.

The CourtListener search API documentation: https://wiki.free.law/c/courtlistener/help/api/rest/v4/search

## Actual Massachusetts state-court constraint

The federal RECAP route **does not retrieve Massachusetts state-court filings**. The Trial Court's public search primarily exposes dockets, with case-type-specific remote document-image access. Do not infer that every Superior Court complaint PDF is publicly downloadable. Before building a state-specific method, inspect one qualifying state case with a visible public document and determine whether **that actual image/PDF** can be saved.

Official guidance:
- https://www.mass.gov/info-details/types-of-cases-available-to-the-public-online
- https://www.mass.gov/trial-court-rules/uniform-rules-on-public-access-to-court-records-rule-5-remote-access-to-electronic-court-records
- https://www.mass.gov/info-details/how-to-search-court-dockets

MassCourts public portal terms restrict automated data harvesting. This project does not automate it. Court clerks can provide copies of publicly accessible case documents where remote images are unavailable.

## Tests and outcomes

```sh
python -m unittest discover -s tools/court-records/tests -v
python tools/court-records/discover_recap.py --out court-recap-output
python tools/court-records/recap_retrieve.py --case-number 'VERIFIED_NUMBER' --court mad --company giga --download
```

A software test using fixture PDFs **is not a real case PDF recovery**.

Statuses in manifests: `requires_courtlistener_token`, `search_failed`, `no_candidates_indexed`, `no_public_pdfs_found`, `completed_with_pdfs`, plus document-level retrieval statuses. Only `completed_with_pdfs` and an independently confirmed matching court/permit record count as document recovery.

## Source projects

- https://github.com/judgemind/judgemind
- https://github.com/garycal/courtlistener-drive
- https://github.com/freelawproject/courtlistener/issues/7345
