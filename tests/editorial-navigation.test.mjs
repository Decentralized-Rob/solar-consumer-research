import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("Connecticut settlement is linked from all discovery routes", async () => {
  for (const path of ["/", "/stories", "/lawsuits-settlements", "/companies/sunrun"]) {
    const html = await render(path);
    assert.ok(html.includes('href="/cases/connecticut-attorney-general-sunrun-lawsuit"'), path);
  }
});
test("search finds Connecticut settlement by name", async () => {
  const html = await render("/search?q=connecticut%20sunrun%20settlement");
  assert.match(html, /href="\/cases\/connecticut-attorney-general-sunrun-lawsuit"/);
});
test("articles have persistent navigation and Read next", async () => {
  const html = await render("/research/sunrun-25-year-solar-contracts");
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /Read next/);
  assert.match(html, /href="\/stories"/);
});

test("search includes bankruptcy trackers and consumer guides", async () => {
  for (const [query, href] of [
    ["goodleap", "/goodleap"],
    ["titan warranty", "/cases/titan-solar-power/warranty-after-bankruptcy"],
    ["massachusetts complaint", "/guides/massachusetts-solar-complaint"],
    ["freedom forever", "/cases/freedom-forever"],
  ]) {
    const html = await render(`/search?q=${encodeURIComponent(query)}`);
    assert.ok(html.includes(`href="${href}"`), `missing ${href} for ${query}`);
  }
});

test("standalone company and bankruptcy pages have primary navigation", async () => {
  for (const path of ["/goodleap", "/cases/titan-solar-power", "/cases/titan-solar-power/customer-help", "/cases/freedom-forever"]) {
    const html = await render(path);
    assert.match(html, /aria-label="Primary navigation"/, path);
    assert.match(html, /href="\/stories"/, path);
    assert.match(html, /href="\/search"/, path);
  }
});

test("standalone pages show a single brand header and retain in-page navigation", async () => {
  for (const path of ["/goodleap", "/cases/titan-solar-power", "/cases/titan-solar-power/customer-help", "/cases/freedom-forever"]) {
    const html = await render(path);
    const headers = [...html.matchAll(/class="site-header"/g)];
    assert.equal(headers.length, 1, `${path} must have one shared brand header`);
    assert.doesNotMatch(html, /class="(?:gl-header|tt-header|th-header|ffr-header)"/);
  }
  const titan = await render("/cases/titan-solar-power");
  assert.match(titan, /Titan research sections/);
  const freedom = await render("/cases/freedom-forever");
  assert.match(freedom, /Freedom Forever research center/);
});

test("newsroom story cards are image-free, link to articles, and retain recommendations", async () => {
  for (const page of ["/", "/stories", "/cases/connecticut-attorney-general-sunrun-lawsuit"]) {
    const html = await render(page);
    assert.doesNotMatch(html, /\/editorial\/(court-records|financial-records|solar-roof|consumer-records|solar-research)\.svg/);
  }
  const home = await render("/");
  assert.match(home, /href="\/cases\/connecticut-attorney-general-sunrun-lawsuit"/);
  assert.match(home, /data-engagement-placement="homepage_story"/);
  const archive = await render("/stories");
  assert.match(archive, /class="editorial-archive-card"/);
  assert.match(archive, /data-engagement-placement="story_archive"/);
  const article = await render("/cases/connecticut-attorney-general-sunrun-lawsuit");
  assert.match(article, /Read next/);
  assert.match(article, /data-engagement-placement="read_next"/);
});

test("click and visibility events are instrumented in the discovery surfaces", async () => {
  const home = await render("/");
  assert.match(home, /data-engagement-placement="homepage_story"/);
  assert.match(home, /data-engagement-impression="homepage_story"/);
  const archive = await render("/stories");
  assert.match(archive, /data-engagement-placement="story_archive"/);
  const casePage = await render("/cases/connecticut-attorney-general-sunrun-lawsuit");
  assert.match(casePage, /data-engagement-placement="read_next"/);
  const search = await render("/search?q=connecticut");
  assert.match(search, /data-engagement-placement="search_result"/);
});

test("first-party events are logged without a new Cloudflare dataset dependency", async () => {
  const { readFile } = await import("node:fs/promises");
  const worker = await readFile(new URL("../worker/index.ts", import.meta.url), "utf8");
  const config = await readFile(new URL("../vite.config.ts", import.meta.url), "utf8");
  assert.match(worker, /solar_navigation/);
  assert.match(worker, /parseNavigationEvent/);
  assert.doesNotMatch(config, /analytics_engine_datasets/);
});


test("high-priority Sunrun pages share one global header and discovery links", async () => {
  for (const path of [
    "/",
    "/companies/sunrun",
    "/research/sunrun-25-year-solar-contracts",
    "/research/sunrun-q3-2026-earnings",
    "/guides/massachusetts-solar-complaint",
    "/cases/connecticut-attorney-general-sunrun-lawsuit",
    "/cases/freedom-forever",
  ]) {
    const html = await render(path);
    assert.equal([...html.matchAll(/class="site-header"/g)].length, 1, path);
    assert.match(html, /aria-label="Primary navigation"/, path);
    assert.ok(html.includes('href="/stories"'), path);
    assert.ok(html.includes('href="/search"'), path);
  }
});

test("Sunrun hub links directly to its distinct research sections", async () => {
  const html = await render("/companies/sunrun");
  const start = html.indexOf('aria-label="Browse Sunrun reporting"');
  assert.ok(start > 0, "Sunrun section navigation appears");
  const end = html.indexOf("</nav>", start);
  assert.ok(end > start);
  const nav = html.slice(start, end);
  for (const id of [
    "sunrun-settlements-title",
    "sunrun-actions-title",
    "sunrun-contract",
    "sunrun-complaint-help",
    "sunrun-research-title",
  ]) {
    assert.ok(nav.includes('href="#' + id + '"'), "missing topic link " + id);
    assert.ok(html.includes('id="' + id + '"'), "missing section target " + id);
  }
  assert.ok(start < html.indexOf('aria-label="Connecticut settlement feature"'));
});


test("every published page template has the same masthead and footer navigation", async () => {
  const representativePages = [
    "/",
    "/stories",
    "/companies/sunrun",
    "/lawsuits-settlements",
    "/search",
    "/research",
    "/research/sunrun-q3-2026-earnings",
    "/guides",
    "/guides/massachusetts-solar-complaint",
    "/guides/massachusetts-30-day-demand-letter",
    "/resources",
    "/states/arizona",
    "/states/florida",
    "/states/michigan",
    "/states/massachusetts",
    "/goodleap",
    "/goodleap/states",
    "/goodleap/states/minnesota",
    "/cases/freedom-forever",
    "/cases/freedom-forever/warning-signs",
    "/cases/freedom-forever/what-happened",
    "/cases/titan-solar-power",
    "/cases/titan-solar-power/customer-help",
    "/cases/titan-solar-power/warranty-after-bankruptcy",
  ];

  for (const path of representativePages) {
    const html = await render(path);
    assert.equal([...html.matchAll(/class="site-header"/g)].length, 1, path + " shared header");
    assert.equal([...html.matchAll(/class="home-footer"/g)].length, 1, path + " shared footer");
    assert.match(html, /aria-label="Primary navigation"/, path);
    assert.match(html, /aria-label="Footer navigation"/, path);
    for (const href of ["/stories", "/companies/sunrun", "/lawsuits-settlements", "/guides", "/resources", "/search"]) {
      assert.ok(html.includes('href="' + href + '"'), path + " missing " + href);
    }
  }
});

test("mobile menu uses the same navigation and a keyboard-accessible native disclosure", async () => {
  const html = await render("/research/sunrun-25-year-solar-contracts");
  assert.match(html, /class="site-header-mobile"/);
  assert.ok(html.includes("<summary>Menu</summary>"));
  const start = html.indexOf('aria-label="Mobile primary navigation"');
  const end = html.indexOf("</nav>", start);
  assert.ok(start > 0 && end > start, "mobile navigation rendered");
  const nav = html.slice(start, end);
  for (const href of ["/stories", "/companies/sunrun", "/lawsuits-settlements", "/guides", "/resources", "/search"]) {
    assert.ok(nav.includes('href="' + href + '"'), "mobile menu missing " + href);
  }
  const { readFile } = await import("node:fs/promises");
  const header = await readFile(new URL("../components/site-header.tsx", import.meta.url), "utf8");
  assert.match(header, /onClick={closeMobileMenu}/, "mobile selection should close the menu");
  assert.match(header, /event.key === "Escape"/, "Escape should dismiss the menu");
  assert.match(header, /closeOnOutsidePointer/, "outside pointer interaction should dismiss the menu");
});
