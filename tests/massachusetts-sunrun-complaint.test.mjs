import assert from "node:assert/strict";
import test from "node:test";

async function fetchPage(path) {
  const { default: worker } = await import("../dist/server/index.js");
  return worker.fetch(
    new Request(`https://solarcomplaint.com${path}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

const path = "/guides/massachusetts-sunrun-complaint";

test("Massachusetts Sunrun complaint center serves indexable HTML at its own canonical URL", async () => {
  const response = await fetchPage(path);
  assert.equal(response.status, 200);
  assert.doesNotMatch(response.headers.get("x-robots-tag") ?? "", /noindex/i);
  const html = await response.text();
  assert.match(html, /<h1[^>]*>Massachusetts Sunrun Complaints: How to File (?:&amp;|&) What to Check<\/h1>/);
  assert.match(html, /<title>Massachusetts Sunrun Complaints:/);
  assert.ok(html.includes(`rel="canonical" href="https://solarcomplaint.com${path}"`));
  assert.doesNotMatch(html, /<meta[^>]*content="[^"]*noindex/i);
  assert.ok(html.includes('href="https://www.mass.gov/how-to/file-a-consumer-complaint"'));
});

test("complaint center appears once in the sitemap and is linked from relevant hubs", async () => {
  const sitemap = await (await fetchPage("/sitemap.xml")).text();
  assert.equal(sitemap.split(`<loc>https://solarcomplaint.com${path}</loc>`).length - 1, 1);
  for (const hub of ["/companies/sunrun", "/states/massachusetts", "/guides", "/guides/massachusetts-solar-complaint"]) {
    const response = await fetchPage(hub);
    assert.equal(response.status, 200, hub);
    assert.ok((await response.text()).includes(`href="${path}"`), `Complaint center linked from ${hub}`);
  }
});
