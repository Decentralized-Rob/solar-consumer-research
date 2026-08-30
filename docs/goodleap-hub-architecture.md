# GoodLeap Consumer Resource Hub Architecture

Status: development scaffold only. Do not publish or merge without explicit approval.

## Current route tree

- `/goodleap/`
- `/goodleap/issues/`
- `/goodleap/issues/system-installer/`
- `/goodleap/issues/loan-payments/`
- `/goodleap/issues/expectations/`
- `/goodleap/issues/next-steps/`
- `/goodleap/states/`
- `/goodleap/research/`
- `/goodleap/lawsuits/`
- `/goodleap/resources/`

## Reserved future routes

Create only when supported by substantive source material.

- `/goodleap/states/minnesota/`
- `/goodleap/states/texas/`
- `/goodleap/states/[state]/`
- `/goodleap/research/court-filings/`
- `/goodleap/research/regulatory-actions/`
- `/goodleap/research/company-documents/`
- `/goodleap/research/consumer-complaints/`

Do not pre-create 50 state pages or large numbers of thin issue pages.

## Source model

Substantive pages should separate and label source types clearly:

1. Government and regulator records
2. Court filings and orders
3. GoodLeap official statements and documents
4. Reputable independent reporting
5. Public consumer complaints, explicitly presented as allegations rather than verified facts

## Internal linking model

The GoodLeap hub is intended to remain part of SolarComplaint.com rather than becoming an isolated microsite.

Examples:

- GoodLeap state page -> matching SolarComplaint.com state hub -> official state regulator or Attorney General
- SolarComplaint.com state hub -> relevant GoodLeap state or financing page
- GoodLeap financing page -> federal source -> state page -> relevant lawsuit or research record

## Research assistance

The future GoodLeap research-assistance form should reuse the existing SolarComplaint.com form architecture where practical. Expected fields include state, installer/company if known, broad issue category, short description, and email.

The form is intentionally not implemented in this scaffold.

## Development indexing

The `app/goodleap/layout.tsx` metadata currently sets `robots.index` and `robots.follow` to false. Remove or revise this only when the hub is content-complete enough for deliberate publication and indexing.

## Architecture concern before content expansion

The current SolarComplaint.com repository mixes broad state hubs, guides, company pages, and case hubs directly under the App Router. GoodLeap is large enough to justify its own top-level `/goodleap/` namespace and shared layout, which this scaffold establishes. Before adding substantial research data, decide whether source records will live directly in page components or in a structured data/content layer. A structured source layer is preferable if the same court filing, regulator action, or source needs to appear across multiple GoodLeap pages and SolarComplaint.com state pages.
