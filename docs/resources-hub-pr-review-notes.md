# Resources hub PR review notes

## Goal
Turn `/resources` from a mostly 50-state directory into a decision-oriented solar consumer resource hub while preserving the full state directory.

## Search rationale
Search Console showed `/resources` with 16 impressions in the current early-data window, making it one of the site's most visible URLs. The page previously offered the state directory plus one federal-resource link, so it was not distributing that visibility into the site's stronger company, case, guide, financing, and research content.

## New starting paths
1. Company or installer issue
2. State complaint route
3. Loan or financing issue
4. Federal complaint route
5. Complaint preparation
6. Lawsuit or documented case research

## Internal destinations added
- `/companies/sunrun`
- `/cases/titan-solar-power`
- `/cases/connecticut-attorney-general-sunrun-lawsuit`
- `/research/solar-sales-financing-after-complaint`
- `/research`
- `/federal-resources`
- `/guides`
- standalone complaint-record and Massachusetts guides
- `/updates`
- all existing state hubs

## SEO / structure
- clearer search-facing title and meta description
- one H1 focused on solar complaint resources and starting intent
- semantic H2 sections for each route
- clean canonical retained
- CollectionPage + state ItemList structured data
- existing 50-state directory retained
- sitemap `lastmod` refreshed to 2026-09-07

## Mobile
The six starting paths use a 3-column desktop grid, 2-column tablet grid, and single-column mobile layout. Long resource links remain full-width tap targets on mobile.

## Scope boundary
No new legal, enforcement, bankruptcy, settlement, or company claims are introduced. This PR reorganizes and cross-links existing source-backed material already published on the site.
