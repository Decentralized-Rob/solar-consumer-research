import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("share-test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("editorial articles render static Facebook and X share links for the canonical URL", async () => {
  const paths = [
    "/research/sunrun-25-year-solar-contracts",
    "/research/sunrun-q3-2026-earnings",
    "/cases/connecticut-attorney-general-sunrun-lawsuit",
    "/cases/freedom-forever/warning-signs",
    "/cases/freedom-forever/what-happened",
    "/companies/sunrun",
    "/companies/sunrun/ethics-compliance",
    "/guides/massachusetts-solar-complaint",
    "/guides/massachusetts-30-day-demand-letter",
    "/guides/solar-complaint-record-checklist",
  ];
  for (const path of paths) {
    const html = await render(path);
    const expected = encodeURIComponent("https://solarcomplaint.com" + path);
    assert.match(html, /aria-label="Share this article"/, path);
    assert.ok(html.includes("https://www.facebook.com/sharer/sharer.php?u=" + expected), path + " missing Facebook canonical share URL");
    assert.ok(html.includes("https://x.com/intent/post?url=" + expected), path + " missing X canonical share URL");
    assert.ok(html.includes("rel=" + String.fromCharCode(34) + "noopener noreferrer" + String.fromCharCode(34)), path);
    assert.ok(html.includes("aria-label=" + String.fromCharCode(34) + "Copy article link" + String.fromCharCode(34)), path);
    assert.doesNotMatch(html, /connect\\.facebook\\.net|platform\\.x\\.com\\/widgets\\.js/, path);
  }
});

test("utility and directory routes do not display share buttons", async () => {
  for (const path of ["/", "/search", "/about", "/privacy", "/disclaimer", "/methodology", "/resources", "/guides", "/stories", "/states/massachusetts"]) {
    const html = await render(path);
    assert.doesNotMatch(html, /aria-label="Share this article"/, path);
    assert.doesNotMatch(html, /sharer\\/sharer\\.php/, path);
  }
});

test("social share URLs match article Open Graph canonical metadata", async () => {
  for (const path of ["/research/sunrun-25-year-solar-contracts", "/cases/connecticut-attorney-general-sunrun-lawsuit"]) {
    const html = await render(path);
    const url = "https://solarcomplaint.com" + path;
    assert.ok(html.includes("content=" + String.fromCharCode(34) + url + String.fromCharCode(34)), path + " missing canonical OG URL");
    assert.match(html, /property="og:type" content="article"/, path);
    assert.match(html, /property="og:image:width" content="1200"/, path);
    assert.match(html, /property="og:image:height" content="630"/, path);
    assert.match(html, /name="twitter:card" content="summary_large_image"/, path);
  }
});

test("social anchors require no third-party SDK or client-side popup", async () => {
  const { readFile } = await import("node:fs/promises");
  const share = await readFile(new URL("../components/article-share.tsx", import.meta.url), "utf8");
  const layout = await readFile(new URL("../app/layout.tsx", import.meta.url), "utf8");
  const pkg = JSON.parse(await readFile(new URL("../package.json", import.meta.url), "utf8"));
  assert.doesNotMatch(share, /"use client"|react-share|window\\.open|navigator\\.share/);
  assert.match(share, /href={facebookHref}/);
  assert.match(share, /href={xHref}/);
  assert.doesNotMatch(layout, /SitewideShareFooter/);
  assert.equal(pkg.dependencies["react-share"], undefined);
});
