import assert from "node:assert/strict";
import test from "node:test";

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

const env = {
  ASSETS: {
    fetch: async () => new Response("Not found", { status: 404 }),
  },
};

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

async function fetchHtml(worker, path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, { headers: { accept: "text/html" } }),
    env,
    ctx,
  );
  return { response, html: await response.text() };
}

test("primary newsroom navigation destinations resolve", async () => {
  const worker = await loadWorker();
  const { response, html } = await fetchHtml(worker, "/");
  assert.equal(response.status, 200);
  assert.match(html, /aria-label="Primary navigation"/);
  for (const href of ["/stories", "/companies/sunrun", "/lawsuits-settlements", "/guides", "/resources", "/search"]) {
    assert.ok(html.includes(`href="${href}"`), href);
    const destination = await worker.fetch(
      new Request(`http://localhost${href}`, { headers: { accept: "text/html" } }),
      env, ctx,
    );
    assert.equal(destination.status, 200, href);
  }
});

test("published tracker destinations stay synchronized across discovery pages", async () => {
  const worker = await loadWorker();
  const research = await fetchHtml(worker, "/research");
  const updates = await fetchHtml(worker, "/updates");

  assert.equal(research.response.status, 200);
  assert.equal(updates.response.status, 200);

  const trackerHrefs = [
    "/companies/sunrun",
    "/companies/sunrun/ethics-compliance",
    "/cases/freedom-forever",
    "/cases/titan-solar-power",
    "/cases/connecticut-attorney-general-sunrun-lawsuit",
  ];

  for (const href of trackerHrefs) {
    const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const linkPattern = new RegExp(`href=["']${escapedHref}["']`, "i");
    assert.match(research.html, linkPattern, `${href} should be discoverable from /research`);
    assert.match(updates.html, linkPattern, `${href} should be discoverable from /updates`);
  }
});

test("major published destination sitemap URLs are emitted once", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);

  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const urls = [
    "https://solarcomplaint.com/companies/sunrun",
    "https://solarcomplaint.com/companies/sunrun/ethics-compliance",
    "https://solarcomplaint.com/cases/freedom-forever",
    "https://solarcomplaint.com/cases/titan-solar-power",
    "https://solarcomplaint.com/cases/connecticut-attorney-general-sunrun-lawsuit",
  ];

  for (const url of urls) {
    const occurrences = sitemap.split(`<loc>${url}</loc>`).length - 1;
    assert.equal(occurrences, 1, `${url} should appear exactly once in the sitemap`);
  }
});
