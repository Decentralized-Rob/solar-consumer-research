# Contributing to Solar Consumer Research

Thank you for helping improve Solar Consumer Research.

This project helps residential solar customers find official complaint routes, consumer resources, public records, documented cases, and source-based guides. It is not a forum for individual disputes or legal advice.

## Quick start

There are two ways to contribute:

- **Report a source correction or broken link:** open the appropriate GitHub issue form. No code is required.
- **Fix the website or its documentation:** open a focused pull request.

Before submitting anything, read the privacy and source rules below.

## What we accept

- Corrections to published research that are supported by a direct public source
- Official public sources that fill a documented gap in a state page, guide, or federal resource
- Broken-link reports
- Focused code, accessibility, reliability, or documentation fixes

## What does not belong in this repository

Do not submit or post:

- Personal solar complaints, case histories, or requests for individual help
- Contracts, invoices, screenshots, account numbers, addresses, phone numbers, email addresses, or other personal information
- Non-public documents or records
- Unverified accusations about people or companies
- Legal advice, legal conclusions, or attorney referrals
- Credentials, API keys, security vulnerabilities, or instructions to bypass security controls

For an individual research request, use the private form at [solarcomplaint.com](https://solarcomplaint.com). Security concerns must follow the repository's security policy and must not be reported in a public issue.

## Research correction standard

Every research correction or proposed source must include:

1. **Affected page or state**
2. **The exact statement, link, or record to correct**
3. **A direct public source URL**
4. **Publisher or issuing body**
5. **Publication date, decision date, or retrieval date**, if available
6. **A short explanation of what the source establishes**

Use primary public sources whenever available:

- Government agencies and consumer-protection offices
- Court opinions, dockets, complaints, settlements, and enforcement records
- Statutes, regulations, utility commission records, and official complaint portals
- Original company filings, announcements, or statements

A source must actually support the proposed change. A general article, search-result page, or secondary summary is not enough when an underlying public record is available.

## Accuracy and legal framing

Be precise about what a source says.

- Do not treat an allegation, complaint, or consumer report as a finding of fact.
- Distinguish lawsuits, investigations, enforcement actions, settlements, reported litigation, and consumer allegations.
- Label regional or out-of-state matters accurately. Do not present them as state-specific.
- Do not infer motives, liability, approval, or wrongdoing beyond the cited record.
- Do not submit legal analysis or advice.

Research additions are reviewed by a maintainer before publication. A passing test or merged pull request does not by itself approve a research claim for the public site.

## Reporting a correction without code

Use the **Source correction** issue form.

Keep the issue limited to public material. Do not attach personal documents, screenshots, or correspondence. If a source is not public, do not post it here.

## Submitting a pull request

For a website or research change:

1. Check for an existing issue. Open one first for a material change.
2. Create a branch from `main`.
3. Keep the pull request focused on one correction or one technical fix.
4. Include direct sources for every research or editorial change.
5. Run:

   ```bash
   npm ci
   npm run lint
   npm test
   ```

6. Explain what changed, why it changed, and how you verified it.
7. Do not include unrelated formatting changes, private data, or credentials.

All pull requests require maintainer review before merge.

## AI-assisted contributions

AI-assisted contributions are welcome. This project itself uses an AI-native, human-directed engineering workflow, and contributors may use AI for implementation, research organization, tests, review, and documentation.

The contributor remains responsible for the submitted work. Check code against actual repository behavior, verify research claims and citations against the underlying source, and review generated wording for unsupported conclusions or invented detail.

Disclose material AI assistance in the pull request. AI output is work to review and verify, not evidence or authority by itself.

## License and contribution terms

By submitting a contribution, you confirm that you have the right to submit it and agree that it may be distributed under this repository's license and any applicable content terms.

## Conduct and support

Participation is subject to the repository's Code of Conduct.

For help using the site or reporting an individual situation, see `SUPPORT.md` or use the private form at [solarcomplaint.com](https://solarcomplaint.com).
