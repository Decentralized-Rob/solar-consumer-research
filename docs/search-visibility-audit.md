# Search visibility: BBB comparison

## Target ownership
- /companies/sunrun — Sunrun lawsuits, class actions, settlements.
- /research/sunrun-complaints-what-to-check — national Sunrun complaints and filing routes.
- /guides/massachusetts-sunrun-complaint — company-specific Massachusetts complaint help.
- /guides/massachusetts-solar-complaint — general Massachusetts solar complaint filing.
- /lawsuits-settlements — cross-company lawsuits and enforcement.
- /states/:slug — jurisdiction-specific official resources.

Keep self-referencing canonicals. Do not canonicalize unique complaint and state pages to the company hub. The root layout already emits Organization and WebSite, the research template emits Article and BreadcrumbList, and the Sunrun hub already emits CollectionPage and BreadcrumbList. Generic state resources previously lacked BreadcrumbList; the specialized Arizona, Florida, Michigan and Maine templates already have it. This patch adds missing breadcrumbs to generic states and the lawsuit archive, and Article and BreadcrumbList to the MA Sunrun guide. Collection pages should not be mislabeled Article.

The new preview PNGs are editorial title cards, not photos, and are used only in social/schema metadata. Other articles retain their existing generic preview until appropriate individual assets are available. Preserve intentional editorial titles on unrelated articles. Review remaining standalone page templates and rendered metadata before expanding.

Validation: run npm test and npm run lint; inspect rendered canonical/title/H1/OG/schema, and verify PNG URLs on the preview deployment. Use Google Search Console URL Inspection after deployment; metadata changes do not guarantee rankings.
