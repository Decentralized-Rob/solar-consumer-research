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

test("publisher cards show editorial illustrations and article links", async () => {
  const home = await render("/");
  assert.match(home, /\/editorial\/(court-records|financial-records|solar-roof|consumer-records|solar-research)\.svg/);
  assert.match(home, /href="\/cases\/connecticut-attorney-general-sunrun-lawsuit"/);
  const archive = await render("/stories");
  assert.match(archive, /class="editorial-archive-card"/);
  const article = await render("/cases/connecticut-attorney-general-sunrun-lawsuit");
  assert.match(article, /Read next/);
  assert.match(article, /editorial-thumbnail/);
});
