# GoodLeap v2 launch checklist

Built from current `main`, using PR #47 as research/design reference rather than merging its stale branch.

## Public routes
- `/goodleap/`
- `/goodleap/states/`
- `/goodleap/states/minnesota/`
- `/goodleap/states/virginia/`
- `/goodleap/resources/`

## Required before merge
- Add all five GoodLeap routes to sitemap/current publication discovery.
- Add a crawlable GoodLeap entry from the main Research surface.
- Add reciprocal links from relevant state hubs where GoodLeap-specific research exists or is under active review, without replacing current state-hub design.
- Confirm Minnesota multi-defendant figures remain collective: about $35M / nearly 5,000 loans, not GoodLeap-only.
- Confirm Virginia multi-lender totals remain separate from the complaint's GoodLeap-specific 1,000+ household allegation.
- Verify newer Maryland, Texas and Florida descriptions against primary court/government records before promoting them to full state pages.
- Keep procedural arbitration/contract-formation rulings separate from merits findings.
- Run lint, tests, production build and rendered-link checks.
- Check mobile layout against the current SolarComplaint dark-green / cream / yellow skin.

## Internal-link targets
GoodLeap hub -> state tracker, MN, VA, MD, TX, FL, Titan, Research, Resources, Methodology, Corrections, research assistance.

GoodLeap state pages -> corresponding `/states/...` hub, GoodLeap tracker/resources, research assistance.

Relevant state hubs -> GoodLeap hub or published GoodLeap state page where the link is substantively supported.
