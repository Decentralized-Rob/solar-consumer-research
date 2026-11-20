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
