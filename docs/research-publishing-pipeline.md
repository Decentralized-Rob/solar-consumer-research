# Research publishing pipeline

Research stories use `lib/research-stories.ts` as the discovery registry.

## Publishing rule

Adding or updating a normal research story should not require hand-editing the homepage, research index, state-page related research, author-page story lists, or research sitemap entries.

1. Add the story page under `app/research/<slug>/page.tsx`.
2. Add one matching record to `lib/research-stories.ts`.
3. Set the story metadata: dates, states, companies, topics, author/byline, section and featured status.
4. Run the normal build/tests and review the preview.

The registry automatically drives:

- homepage latest research
- `/research` story discovery and CollectionPage schema
- related research on state pages
- author story listings for registered bylines
- research sitemap URLs and research-index freshness

## Guardrail

Do not add a new story by hard-coding its title or URL into those discovery surfaces. If a new destination needs story discovery, add a reusable selector to the registry and make the destination query metadata.

Company hubs are the next migration target. Existing hand-curated company/case tracker content is intentionally unchanged by this first infrastructure pass.
