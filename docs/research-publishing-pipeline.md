# Research publishing pipeline

Research articles are self-contained files in `content/research/*.tsx`. The generated registries are outputs, not publishing inputs.

## Publishing rule

Adding or updating a normal research story should require editing one article file only.

1. Create or update `content/research/<slug>.tsx`.
2. Export one `story` record containing discovery and SEO metadata.
3. Keep the article-specific config, sources and body in the same file.
4. Export the complete article with `defineResearchArticle({ story, config, Body })`.
5. Run the normal development/build/tests and review the preview.

The generator discovers every research `.tsx` article, rejects duplicate slugs, and writes:

- `lib/research-stories.ts`, the metadata-only registry used by discovery surfaces
- `content/research/index.ts`, the server-side article registry used by the dynamic research route

Generation runs before development, build, lint and tests.

The metadata registry automatically drives:

- homepage latest research
- `/research` story discovery and CollectionPage schema
- related research on state pages
- author story listings for registered bylines
- research sitemap URLs and research-index freshness

## Guardrails

Do not hand-edit the generated registry files. Do not add a normal research article by creating a dedicated `app/research/<slug>/page.tsx` route or by hard-coding its title or URL into discovery surfaces.

If a new destination needs story discovery, add a reusable metadata selector and make that destination query the generated metadata registry.

Company hubs and existing hand-curated company/case tracker content remain outside this article-publishing migration.
