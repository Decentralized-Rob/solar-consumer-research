# Internal Link Cluster Audit — 2026-09-10

## Goal
Create a consistent internal-link structure between company/case hubs, state hubs, and supporting research so that important pages reinforce each other without creating irrelevant sitewide links.

## Core rule
A company/case hub should link only to states with documented relevance. Every state page listed by that hub should link back to the hub. Supporting research should link to both the relevant hub and state page when the source record supports both relationships.

Do not add all 50 states to every company hub. Relevance has to be supported by the site's source record.

## Verified current structure

### Sunrun cluster

The Sunrun hub currently links directly to these state pages through documented action cards:

- Arizona
- Connecticut
- Florida
- Texas

The existing `tests/sunrun-cluster-links.test.mjs` treats these five state hubs as Sunrun-relevant and verifies that they link back to `/companies/sunrun`:

- Arizona
- Connecticut
- Florida
- Massachusetts
- Texas

This means Massachusetts currently has a state → Sunrun relationship without an equivalent Sunrun → Massachusetts relationship.

The Connecticut case page is already a strong example of reciprocal clustering:

- Connecticut state hub → Connecticut Sunrun case
- Connecticut state hub → Sunrun hub
- Connecticut Sunrun case → Connecticut state hub
- Connecticut Sunrun case → Sunrun hub

Recommended correction: add Massachusetts to a clearly labeled state-resource section on the Sunrun hub without mislabeling it as an enforcement action.

### Titan Solar Power cluster

The Titan state dataset contains 22 state-named bankruptcy affiliates:

AZ, NV, CA, CO, FL, GA, ID, IL, LA, MD, MO, MS, NC, NJ, NM, OH, SC, TN, TX, UT, VA, WI.

The Titan warranty page already implements the strongest hub → state pattern on the site. It generates links to all 22 relevant state pages from the bankruptcy-affiliate dataset.

The generic state-resource template links applicable states back to:

- `/cases/titan-solar-power`
- `/cases/titan-solar-power/warranty-after-bankruptcy`

Arizona and Florida custom state pages also contain Titan links.

Gap: the primary Titan hub currently links directly to Arizona only. The reciprocal state network therefore depends heavily on the warranty page rather than the primary Titan hub.

Recommended correction: add a compact "Titan resources by state" section to the primary Titan hub, generated from the same `titanStateBankruptcyByCode` dataset already used by the warranty page.

### Freedom Forever cluster

The live Freedom Forever hub currently has only 4 internal links and no direct state-page links, despite containing documented source material tied to:

- California — CSLB disciplinary order
- Texas — Attorney General solar investigation
- Massachusetts — SMART compliance record

The Maine state hub separately contains Freedom Forever reporting and links back to `/cases/freedom-forever`.

Verified direct inbound Freedom Forever links also exist from:

- `/cases/freedom-forever/what-happened`
- `/states/maine`
- `/cases/titan-solar-power`

This is the weakest major internal-link cluster currently reviewed.

Recommended initial Freedom Forever state set:

- California
- Maine
- Massachusetts
- Texas

The hub should link to all four state pages. California, Massachusetts, and Texas should gain a contextual reciprocal link to the Freedom Forever hub. Maine already has the return link.

## Proposed implementation model

Create one reusable relationship source, for example `lib/internal-link-relationships.ts`, rather than continuing to hard-code relationships separately inside hubs and state components.

Suggested shape:

```ts
export const hubStateRelationships = {
  sunrun: {
    href: "/companies/sunrun",
    states: ["AZ", "CT", "FL", "MA", "TX"],
  },
  titanSolarPower: {
    href: "/cases/titan-solar-power",
    states: Object.keys(titanStateBankruptcyByCode),
  },
  freedomForever: {
    href: "/cases/freedom-forever",
    states: ["CA", "MA", "ME", "TX"],
  },
};
```

The Titan relationship should continue to derive from the existing bankruptcy dataset rather than duplicating the 22-state list.

## Rendering rules

### Hub → state

Each major hub should have a compact state-resource section using descriptive anchors such as:

- `Arizona Sunrun consumer resources`
- `Florida Titan Solar Power resources`
- `Texas Freedom Forever consumer resources`

Do not use generic anchor text such as `click here`, `learn more`, or repeated `state page` anchors when a more descriptive phrase fits naturally.

### State → hub

State pages should show a "Related company and case research" block only when a documented relationship exists. The block should be rendered from the same relationship source used by the hubs.

This must work for both:

- the generic `StateResourcePage`
- custom state components such as Arizona, Florida, Michigan, and Maine

Custom pages are a current drift risk because they bypass the generic state template.

### Research → hub + state

Research stories already contain `stateCodes` and `companies`, which is a useful foundation. When a story materially covers both a company and a state action, it should link to both destinations.

Example:

`/research/solar-sales-financing-after-complaint` already connects Sunrun with Michigan, Texas, and Arizona and should remain part of that cluster.

## Tests to add

Add reciprocal-link regression tests so a future redesign cannot silently break the clusters.

Minimum checks:

1. Every Sunrun state relationship renders a link from the state page to `/companies/sunrun`.
2. The Sunrun hub renders links back to every state in its relationship set.
3. Every Titan-affiliate state page links to the Titan hub.
4. The Titan hub links to every state generated from `titanStateBankruptcyByCode`.
5. Freedom Forever links to CA, ME, MA, and TX.
6. Those four state pages link back to Freedom Forever.
7. No relationship test should require a link from an unrelated state.

## Priority order

1. Freedom Forever reciprocal state links.
2. Titan primary-hub state links generated from the bankruptcy dataset.
3. Sunrun Massachusetts reciprocal link from the hub.
4. Shared relationship source/component to eliminate hard-coded drift.
5. Regression tests covering reciprocal relationships.
6. Audit research/article cross-links against the same relationship source.

## Live-crawl observations from 2026-09-10

- Freedom Forever hub: 4 internal links.
- Titan hub: 9 internal links.
- Titan warranty page: 27 internal links.
- Sunrun hub: 16 internal links.
- Arizona state hub: 20 internal links.
- Texas state hub: 12 internal links.
- Connecticut state hub: 9 internal links.
- Maine state hub: 4 internal links.

These counts alone are not a ranking score. They are useful because they show how unevenly the current internal-link graph distributes paths between hubs and states.

## SEO principle for this site

The target structure is a set of evidence-backed topic clusters, not a blanket cross-linking scheme:

**Company/case hub ↔ relevant state hubs ↔ supporting research/case pages**

That creates crawl paths and topical relationships while keeping the site's editorial standard intact.