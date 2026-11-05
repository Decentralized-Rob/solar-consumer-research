import assert from "node:assert/strict";
import test from "node:test";

async function render(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", String(process.pid) + "-" + Date.now() + "-" + Math.random());
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost" + path, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200, path);
  return response.text();
}

test("original Sunrun earnings preview links to November 5 contract investigation", async () => {
  const html = await render("/research/sunrun-q3-2026-earnings");
  assert.match(html, /November 5 update:/);
  assert.match(html, /\$38\.9 billion/);
  assert.ok(html.includes('href="/research/sunrun-38-billion-contract-validity"'));
  assert.match(html, /"dateModified":"2026-11-05"/);
  assert.match(html, /"datePublished":"2026-11-02"/);
});
