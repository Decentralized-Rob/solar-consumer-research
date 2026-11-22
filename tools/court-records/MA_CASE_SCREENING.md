# Massachusetts court-case screening — November 22, 2026

Research boundary: **2021-11-22 through 2026-11-22; Massachusetts state trial courts and US District Court for Massachusetts only.** No out-of-state matters and no cases identified solely because a solar system was installed on a roof.

## Required evidence to count a case

**Giga Property Solutions, Inc.** — identifiable litigant/party and a Massachusetts state/federal case number. Search variants include Giga Property Solutions and corporate filings under Luiz G. Espigar, but do NOT equate work by the owner with a case against the company without a documented link.

**Sunrun** — identifiable litigant/party, case number, identified case property, plus a **separate roof-repair or roof-replacement permit** naming that property. A roof-mounted solar/electrical permit does NOT count. Match case address and permit address and validate the permit with municipality. A permit-number string supplied by an operator is an unverified claim until checked against the source.

A qualified record also needs the actual court complaint/exhibit PDF; an index entry is not a downloaded court document.

## Docket leads to screen, **NOT verified matches**

| MA matter | Date / venue | Court document target | What blocks qualification |
|---|---|---|---|
| **Murphy v. Sunrun, Inc. and Sedgwick Claims Management Services** | Worcester Superior: filed May 8, 2025; removed to US District of MA as `4:25-cv-11708` (initial `1:25-cv-11708`) June 11, 2025 | Federal docket entry **1 attachment 1** (state summons & complaint); entry **10 attachments 1–4** (affidavit and three exhibits). Need originals, not summaries | Case-property street address and **roof-replacement/repair permit** are not established by sources checked. Excluded until they are verified |
| **Candida Gomes / Candita Gomes v. Sunrun Incorporated** | Plymouth Superior, filed Aug 14, 2025 | Original complaint and case number from clerk's docket. Trellis labels it a services/labor/materials dispute | No verified roof-permit nexus; state docket number and original PDF not retrieved. Excluded |
| **Giga Property Solutions** | Massachusetts state and federal courts, five-year window | Any real docket naming Giga as a litigant and its publicly accessible complaint/exhibits | No verified litigation docket found in the public search reviewed. This is **not** evidence no such cases exist |

Source links:
- Murphy federal docket: https://dockets.justia.com/docket/massachusetts/madce/4:2025cv11708/285869
- Murphy Worcester Superior listing: https://trellis.law/coverage/massachusetts/worcester/72
- Gomes Plymouth Superior listing: https://trellis.law/coverage/massachusetts/plymouth/21

**No case in this table presently qualifies.**

## Court-document access plan

1. Search the Massachusetts public case-access portal using company variants and identify actual state-court docket numbers. Do not bulk-scrape MassCourts.
2. For an indexed state case, the case docket provides the filing inventory, but the Superior Court generally does not publish PDF images to anonymous remote users. Get nonimpounded, publicly accessible copies from the relevant Superior Court clerk, preferably the native/scanned electronic version where available. Record fees, records requested, and original file metadata.
3. Where the case was removed to federal court, inspect notice-of-removal attachments. A state-court complaint may be mirrored there. In Massachusetts use CourtListener court ID **mad** only, and record an actual PDF byte check and SHA-256.
4. Verify any Sunrun case-property address and roof permit **separately** before marking qualified. Giga litigation does not require a Sunrun roof-permit match.
5. Keep `candidate`, `case_found`, `permit_verified`, `pdf_downloaded`, and `qualified` as different statuses. A blank or inaccessible court portal is never proof of no cases.

Massachusetts public access sources:
- https://www.mass.gov/info-details/how-to-search-court-dockets
- https://www.mass.gov/trial-court-rules/uniform-rules-on-public-access-to-court-records-rule-5-remote-access-to-electronic-court-records
- https://www.mass.gov/trial-court-rules/uniform-rules-on-public-access-to-court-records-rule-2-access-to-court-records-in-a-courthouse

## Municipal permit leads — **not court cases**

The separate Massachusetts permit review already identified roofing work by Giga and a property-level Giga/Sunrun association at 5 Joyce Circle, Randolph. Those documents establish only municipal permit activity; they do not establish litigation. Preserve them for an eventual match with an actual court docket. Do not automatically promote permits into a court-case candidate.
