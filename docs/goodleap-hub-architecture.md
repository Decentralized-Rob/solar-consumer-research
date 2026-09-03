# GoodLeap Consumer Resource Hub Architecture

Status: v1 launch candidate. Keep the pull request unmerged until explicit launch approval and final verification pass.

## Public v1 route tree

The launch version intentionally exposes only substantive routes:

- `/goodleap/`
- `/goodleap/states/`
- `/goodleap/states/minnesota/`
- `/goodleap/states/virginia/`
- `/goodleap/resources/`

The previous empty issue, research-library, and lawsuits scaffold routes were removed before launch. They should not be recreated until they contain useful source-backed material.

## FLAG state model

FLAG means **Financing Litigation & Arbitration involving GoodLeap**.

The public tracker currently contains nine research states. Two state pages are published in v1: Minnesota and Virginia. Seven additional states remain visible as research priorities without empty dedicated pages.

A FLAG designation is a research category, not a finding of wrongdoing.

## Reserved future routes

Create these only when supported by substantive source material:

- `/goodleap/states/[state]/`
- `/goodleap/research/`
- `/goodleap/research/court-filings/`
- `/goodleap/research/regulatory-actions/`
- `/goodleap/research/company-documents/`
- `/goodleap/research/consumer-complaints/`
- `/goodleap/lawsuits/`
- issue-specific consumer pathways

Do not pre-create 50 state pages or large numbers of thin issue pages.

## Source model

Substantive pages should separate and label source types clearly:

1. Government and regulator records
2. Court filings and orders
3. GoodLeap official statements and documents
4. Reputable independent reporting
5. Public consumer complaints, explicitly presented as allegations rather than verified facts

## Internal linking model

The GoodLeap hub remains part of SolarComplaint.com rather than operating as an isolated microsite.

Current v1 linking includes:

- `/research` -> `/goodleap/`
- GoodLeap hub -> FLAG tracker, resources, published state pages, and SolarComplaint.com research assistance
- GoodLeap state page -> matching SolarComplaint.com state hub -> official state sources
- GoodLeap resources -> federal resources and published GoodLeap state pages

Future matching SolarComplaint.com state pages should link back to substantive GoodLeap state pages where the overlap materially helps consumers.

## Research assistance

GoodLeap v1 reuses the existing SolarComplaint.com research-assistance workflow at `/#questions`. It does not create a second intake system or duplicate storage path.

## Indexing and discovery

The v1 GoodLeap namespace is indexable. Only the five public v1 routes are added to the sitemap. Empty/deferred routes are absent rather than published with `noindex` placeholders.

Each public v1 page should have a canonical URL and page-specific search/social metadata. The GoodLeap homepage also exposes CollectionPage and breadcrumb structured data.

## Structured research data

The repository already contains GoodLeap licensing, event, company-context, state-priority, and source datasets under `data/goodleap/`. These remain useful as research inputs.

Before expanding the hub substantially, move repeated case and state facts toward a structured content layer so the same record is not maintained independently in multiple page components. The goal is one reviewed source record feeding multiple relevant pages, not duplicated hard-coded claims.
