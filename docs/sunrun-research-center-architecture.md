# Sunrun Research Center architecture

## Goal

Use Sunrun as the first implementation of a reusable company-research system for SolarComplaint.com. The public product should behave like a mobile-first research database, while the underlying content model can later support GoodLeap, Freedom Forever, Titan, Sunnova, and other companies without duplicating architecture.

## Public information architecture

Primary destination:

- `/sunrun/` — Sunrun Research Center landing page
- `/sunrun/litigation/` — litigation index
- `/sunrun/enforcement/` — government actions and investigations
- `/sunrun/issues/` — issue index
- `/sunrun/issues/[issue]/` — issue-specific research
- `/sunrun/sales-marketing/` — sales and marketing records
- `/sunrun/governance/` — policies, ethics, governance and compliance records
- `/sunrun/sources/` — source library
- `/sunrun/cases/[slug]/` — individual case/matter pages

The existing `/companies/sunrun` route should remain in place until the new center is complete. At cutover, use a permanent redirect or convert it into a compatibility route only after internal links, canonical URLs, sitemap entries, and structured data are updated.

## Mobile hierarchy

1. Search
2. Latest developments
3. Record types
4. Consumer issues
5. Individual matter
6. Primary source

The landing page should avoid long explanatory copy, dense desktop tables, and legal-library styling. Use thumb-sized cards, horizontal issue chips, compact status metadata, and a persistent mobile sub-navigation.

## Reusable data model

Do not store this as Sunrun-specific page copy long-term. The scalable database should normalize:

### companies
- id
- slug
- name
- legal_name
- website_url
- status
- last_verified_at

### research_matters
A matter is a lawsuit, enforcement action, investigation, settlement, corporate-policy record, or other tracked research object.

- id
- company_id
- slug
- matter_type
- title
- summary
- jurisdiction
- court_or_agency
- case_number
- procedural_status
- filed_at
- resolved_at
- publication_status
- last_verified_at
- created_at
- updated_at

### research_sources
One source record per underlying document or canonical source URL.

- id
- slug
- title
- publisher
- source_type: court | government | company | secondary
- source_url
- source_published_at
- last_verified_at
- publication_status
- notes

### matter_sources
Many-to-many relationship between matters and sources.

- matter_id
- source_id
- source_role: primary | supporting | background
- sort_order

### research_topics
Reusable homeowner-facing topics.

Examples: roofing, sales, signatures, service, billing, collections, transfers, financing, telemarketing, complaint-handling.

### matter_topics
Many-to-many relationship between matters and topics.

### developments
Chronological events attached to a matter.

- id
- matter_id
- event_date
- title
- summary
- verification_status
- source_id
- publication_status
- created_at
- updated_at

## Source hierarchy

For public-facing research, preserve this hierarchy:

1. Official government records
2. Primary court/company documents
3. Company statements, clearly labeled
4. Independent reporting as supporting/background material

Secondary docket indexes can be used for discovery and interim tracking, but a matter should not be promoted as a primary-source record until the relevant filing/order is captured or linked from an authoritative source.

## Verification states

Every development should be capable of carrying a verification state:

- verified_primary
- verified_secondary
- pending_primary
- superseded

This prevents a scheduled hearing or filing deadline from being presented as an actual development before the docket confirms what occurred.

## Publishing flow

1. Daily/EOW research discovers a development.
2. Verify the development against the strongest available source.
3. Add/update the source record.
4. Add/update the matter.
5. Add a dated development.
6. Apply issue/topic relationships.
7. Surface it in `/sunrun/` latest developments.
8. If material, publish a deeper research page/update.
9. Use SCR Facebook as distribution back to the permanent SolarComplaint.com record.

## Phase 1 prototype

The current branch intentionally uses a typed local data file so the mobile UI can be evaluated without touching production Supabase. This is temporary.

Before production cutover:

- finalize normalized Supabase migration
- add RLS and public-read policies for published records only
- add search-vector support
- seed verified Sunrun matters/sources
- replace local static data with server-side Supabase reads
- add individual case pages and source-library pages
- update sitemap/canonical/internal-linking strategy
- run accessibility, mobile, build, and structured-data checks

## Guardrail

Do not merge, publish, change production database state, or redirect the existing Sunrun page until the prototype and migration are reviewed.