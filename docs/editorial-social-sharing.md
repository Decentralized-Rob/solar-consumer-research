# Editorial sharing on SolarComplaint.com

## Implementation

- Facebook uses a static anchor to `https://www.facebook.com/sharer/sharer.php?u=<encoded canonical URL>`.
- X uses a static anchor to `https://x.com/intent/post?url=<encoded canonical URL>&text=<encoded article title>`.
- Neither link fetches a Meta or X script or embeds a platform iframe. External requests begin only when a reader opens a share destination.
- Both links are regular `target="_blank"` anchors with `rel="noopener noreferrer"`, so they work without client-side JavaScript.
- Copy Link is an optional first-party client button and has no third-party dependency.
- Use the current Facebook and X marks inline as supplied in the editorial share component. Do not restore the legacy Twitter bird, circular third-party share counters, or provider SDKs.

## Placement

Share links appear on published editorial research articles, the Connecticut settlement investigation, other existing editorial investigations, curated Sunrun research pages and source-backed consumer guides. New `/research/[slug]` posts inherit the article template.

Do not place share controls on the homepage, directories, search, intake forms, privacy/legal pages or publication policy pages. A new standalone editorial route must opt in by passing an explicit canonical path to `ArticleShareButtons` or `InfoPage.shareHref`.

## Publishing checklist

1. Confirm the shared URL is the exact site's canonical public HTTPS URL, with no query string, fragment, UTM source or shortener.
2. Confirm Open Graph `og:type=article`, `og:url`, title, description and image are correct. The shared 1200 x 630 preview image is `/og.png`; ensure it is still publicly accessible and the correct dimensions.
3. Confirm X has `twitter:card=summary_large_image`.
4. Test Facebook and X share destinations from the published article. Both should open only after a click, with recognizable platform icons.
5. For newly published or changed articles, submit the canonical URL to [Meta Sharing Debugger](https://developers.facebook.com/tools/debug/) and inspect the fetched preview. This is an editorial publishing step, not an automated dependency or guaranteed cache refresh.
6. Run the regression tests to prevent share widgets appearing on utility pages.

The Open Graph title and description come from the article metadata, not the Facebook share URL's query parameters. Sharing remains user-initiated; no incentives or share counters are used.
