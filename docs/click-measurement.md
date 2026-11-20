# Measuring internal article clicks

PR #151 instruments first-party article discovery via `POST /api/engagement`. The handler validates same-origin, rate limits requests, and records four event placements.

- `homepage_story`: featured and recent story cards on the homepage
- `read_next`: recommendations displayed at the bottom of an article
- `search_result`: results on `/search`
- `story_archive`: links from `/stories`

Each placement emits `impression` when the placement marker becomes visible and `click` when a tracked link is clicked. The payload contains only the event type, placement and local source/target paths; it never submits IP addresses, cookies, user identifiers, search terms or referrer values.

## Where the records live

The production deployment writes structured JSON to **Cloudflare Workers Logs**, one event per log entry marked `"event":"solar_navigation"`. In Cloudflare, go to **Workers & Pages → solar-consumer-research → Observability → Logs**, ensure Workers Logs is enabled, and filter for `solar_navigation`. You can inspect and count records by `placement` and `kind`, or export results according to your account's available log tools.

No Analytics Engine binding is required for the PR: earlier attempts to add one caused Cloudflare preview deployment failures. The code also supports an optional `NAV_EVENTS` Analytics Engine binding in the future, writing `blobs: [kind, placement, source, target]` and `doubles: [1]`. **Do not add the binding to the Worker deployment config without confirming your Cloudflare account can deploy it.**

If Workers Logs is disabled, events are received but not retained. Confirm logging is enabled before relying on counts; later creation of a dedicated Analytics Engine dataset would provide longer-term queryable measurements.

## Interpreting the results

Count each placement's `click` and `impression` events over comparable periods. `click / impression` is an engagement-intensity ratio, not a distinct-user CTR, because a visitor can click more than once, and browser blocking or bots may affect totals.

For **Google Search CTR**, use Google Search Console (clicks / impressions and average position). Internal click data does not measure Google SERP traffic.

The initial comparison is a 7-day period versus the preceding 7 days for similar pages, also controlling for day-of-week shifts.
