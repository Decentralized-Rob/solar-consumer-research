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

## Editorial presentation

The GoodLeap section should read like a small research publication, not a product landing page.

- Prefer normal prose, source links, definitions, and tables over repeated cards and badges.
- Use visual containers only when they clarify a real distinction, such as a research note or assistance callout.
- Put editorial judgment near the underlying evidence: explain what a filing says, what it does not establish, and why a distinction matters.
- Show review dates and link to methodology and corrections on substantive pages.
- Keep primary-source links close to the claims they support, with a simple source list at the end of state research pages.
- Avoid decorative acronyms, invented metrics, generic icon grids, or UI elements whose main purpose is to make the page look "designed."

AI may assist research organization and drafting under the site-wide methodology. The public page should still show the result of source review and editorial decisions rather than present machine-generated summaries as authority.

## FLAG state model

FLAG means **Financing Litigation & Arbitration involving GoodLeap**.

FLAG is an internal/editorial shorthand, not the primary SEO label. Search-facing titles and headings should use ordinary language such as "GoodLeap solar financing by state," "lawsuits," "arbitration," and "Attorney General actions."

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
- GoodLeap hub -> state tracker, resources, published state pages, and SolarComplaint.com research assistance
- GoodLeap state page -> matching SolarComplaint.com state hub -> official state sources
- GoodLeap resources -> federal resources and published GoodLeap state pages

Future matching SolarComplaint.com state pages should link back to substantive GoodLeap state pages where the overlap materially helps consumers.

## Research assistance

GoodLeap v1 reuses the existing SolarComplaint.com research-assistance workflow at `/#questions`. It does not create a second intake system or duplicate storage path.

## Search and AI discovery

The v1 GoodLeap namespace is indexable. Only the five public v1 routes are added to the sitemap. Empty/deferred routes are absent rather than published with `noindex` placeholders.

Each public v1 page should have:

- a concise search-facing title using ordinary consumer language;
- a unique meta description;
- a canonical URL;
- Open Graph and Twitter metadata;
- one clear H1 and a logical H2/H3 hierarchy;
- crawlable contextual internal links;
- visible source/review information where appropriate.

The homepage, state tracker, and resources page use `CollectionPage` plus breadcrumb structured data. Substantive state research pages use `Article` plus breadcrumb structured data, including published/modified dates and the Solar Consumer Research publisher entity.

Do not add meta keywords, special "AI SEO" schema, or an `llms.txt` file merely for ranking. Machine discoverability should come from clear entities, dates, sources, semantic HTML, structured data that matches visible content, and substantive original analysis.

## Structured research data

The repository already contains GoodLeap licensing, event, company-context, state-priority, and source datasets under `data/goodleap/`. These remain useful as research inputs.

Before expanding the hub substantially, move repeated case and state facts toward a structured content layer so the same record is not maintained independently in multiple page components. The goal is one reviewed source record feeding multiple relevant pages, not duplicated hard-coded claims.
