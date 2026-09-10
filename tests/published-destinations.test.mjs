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

test("published Research menu destinations are unique and resolve", async () => {
  const worker = await loadWorker();
  const { response, html } = await fetchHtml(worker, "/");

  assert.equal(response.status, 200);

  const submenu = html.match(/id=["']research-navigation-submenu["'][\s\S]*?<\/div>/i)?.[0];
  assert.ok(submenu, "Research submenu should render in the home HTML");

  const hrefs = [...submenu.matchAll(/href=["']([^"']+)["']/gi)].map((match) => match[1]);
  assert.ok(hrefs.includes("/cases/freedom-forever"), "Freedom Forever should be a published Research destination");
  assert.equal(new Set(hrefs).size, hrefs.length, "Research menu destinations must be unique");

  for (const href of hrefs) {
    const destination = await worker.fetch(
      new Request(`http://localhost${href}`, { headers: { accept: "text/html" } }),
      env,
      ctx,
    );
    assert.equal(destination.status, 200, `${href} should resolve from the Research menu`);
  }
});

test("major published destination sitemap URLs are emitted once", async () => {
  const worker = await loadWorker();
  const response = await worker.fetch(new Request("http://localhost/sitemap.xml"), env, ctx);

  assert.equal(response.status, 200);
  const sitemap = await response.text();
  const urls = [
    "https://solarcomplaint.com/companies/sunrun",
    "https://solarcomplaint.com/cases/freedom-forever",
    "https://solarcomplaint.com/cases/titan-solar-power",
    "https://solarcomplaint.com/cases/connecticut-attorney-general-sunrun-lawsuit",
  ];

  for (const url of urls) {
    const occurrences = sitemap.split(`<loc>${url}</loc>`).length - 1;
    assert.equal(occurrences, 1, `${url} should appear exactly once in the sitemap`);
  }
});
