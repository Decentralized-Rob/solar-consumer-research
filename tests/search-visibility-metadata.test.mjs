import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";

async function render(path) {
  const { default: worker } = await import("../dist/server/index.js");
  const response = await worker.fetch(new Request("https://solarcomplaint.com" + path, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(response.status, 200, path);
  return response.text();
}

const pages = [
  ["/companies/sunrun", "Sunrun Lawsuits, Class Actions and Settlements", "og-lawsuits.png", "BreadcrumbList"],
  ["/research/sunrun-complaints-what-to-check", "Sunrun Complaints: Common Problems and How to File", "og-complaints.png", "Article"],
  ["/guides/massachusetts-sunrun-complaint", "Massachusetts Sunrun Complaints: How to File &amp; What to Check", "og-ma-complaints.png", "Article"],
  ["/lawsuits-settlements", "Solar Lawsuits, Settlements and State Enforcement", null, "BreadcrumbList"],
];

test("distinct search targets have matching titles, headings, social metadata and canonical URLs", async () => {
  for (const [path, title, image, schema] of pages) {
    const html = await render(path);
    assert.ok(html.includes("<title>" + title + "</title>"), path + " title");
    assert.ok(html.includes("<h1>" + title + "</h1>"), path + " heading");
    assert.ok(html.includes('property="og:title"') && html.includes('content="' + title + '"'), path + " social title");
    assert.ok(html.includes('href="https://solarcomplaint.com' + path + '"'), path + " canonical");
    assert.ok(html.includes('"@type":"' + schema + '"'), path + " schema");
    assert.ok(html.includes('"@type":"Organization"') && html.includes('#publisher'), path + " publisher");
    if (image) {
      assert.ok(html.includes("/sunrun/" + image), path + " preview");
      const png = await readFile(new URL("../public/sunrun/" + image, import.meta.url));
      assert.equal(png.readUInt32BE(16), 1200);
      assert.equal(png.readUInt32BE(20), 630);
    }
  }
});

test("state resources have breadcrumbs and link to the national complaint page", async () => {
  const html = await render("/states/massachusetts");
  assert.ok(html.includes('"@type":"BreadcrumbList"'));
  assert.ok(html.includes('href="/research/sunrun-complaints-what-to-check"'));
});
