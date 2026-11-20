# Measuring article discovery clicks

PR #151 includes first-party, anonymous click and visibility events sent to the Cloudflare Worker route `POST /api/engagement`. The Worker writes to the Analytics Engine dataset `SOLAR_NAV_EVENTS`.

## What is measured

- `homepage_story`: article cards in the Latest Stories section, including the featured Connecticut settlement.
- `read_next`: links to closely related stories at the bottom of research/case pages.
- `search_result`: result links on `/search`.
- `story_archive`: links on `/stories`.

Each placement sends `impression` when its measurement marker first enters the viewport and `click` when a reader follows a tracked link. Events store `kind`, `placement`, on-site `source` path and on-site `target` path. No IP address, referrer, search query, cookie, email or user ID is saved in Analytics Engine.

The worker limits the submission rate and rejects cross-site or malformed requests. The site remains navigable if measurement fails.

## Queries

In the Cloudflare dashboard, open Workers Analytics Engine or use its SQL API with account analytics read permission.

```sql
SELECT blob2 AS placement, blob1 AS action, SUM(_sample_interval) AS events
FROM SOLAR_NAV_EVENTS
GROUP BY placement, action
ORDER BY placement, action
```

To identify which stories receive the most internal clicks:

```sql
SELECT blob2 AS placement, blob4 AS destination, SUM(_sample_interval) AS clicks
FROM SOLAR_NAV_EVENTS
WHERE blob1 = 'click'
GROUP BY placement, destination
ORDER BY clicks DESC
LIMIT 50
```

For each placement, use *click events divided by observed section impressions* as a navigation-intensity indicator. It is **not** a distinct-user click-through rate: one reader can click multiple stories, and bots / blockers may affect counts. For Google Search results clicks, impressions and organic CTR use Google Search Console, not this dataset.

## Before/after comparison

Compare daily clicks into stories from the same placement against section impressions over similar day-of-week traffic. Separately compare Search Console CTR and average position for unchanged URLs. This avoids claiming that site navigation itself caused a change in Google's search results.

The local Analytics Engine binding discards datapoints during local development; Cloudflare branch previews and production write to the dataset when deployed.
