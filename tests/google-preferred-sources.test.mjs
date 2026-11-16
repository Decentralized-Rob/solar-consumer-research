import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const layoutPath = new URL("../app/layout.tsx", import.meta.url);
const componentPath = new URL("../components/google-preferred-source.tsx", import.meta.url);
const destinationsPath = new URL("../lib/published-destinations.ts", import.meta.url);
const freedomForeverPath = new URL("../app/cases/freedom-forever/page.tsx", import.meta.url);

test("loads Google's Preferred Sources library when the control approaches the viewport", async () => {
  const layout = await readFile(layoutPath, "utf8");
  const component = await readFile(componentPath, "utf8");
  const freedomForever = await readFile(freedomForeverPath, "utf8");

  assert.doesNotMatch(layout, /publisher\.js/);
  assert.match(component, /IntersectionObserver/);
  assert.match(component, /shouldLoad && \(\s*<Script[\s\S]*?publisher\.js/);
  assert.match(component, /onReady=.*?client\.init\(\)/);
  assert.match(freedomForever, /<GooglePreferredSourceControl \/>/);
});

test("uses Google's standard declarative control and browser-language localization", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /"google-add-preferred-source-btn": ""/);
  assert.match(component, /"data-theme": "light"/);
  assert.doesNotMatch(component, /data-lang/);
});

test("uses the publication registry as the source of truth for published Preferred Sources pages", async () => {
  const component = await readFile(componentPath, "utf8");
  const destinations = await readFile(destinationsPath, "utf8");

  assert.match(component, /getSharedPreferredSourcePaths/);
  assert.match(component, /publishedPreferredSourcePaths\.has\(pathname\)/);
  assert.doesNotMatch(component, /"\/companies\/sunrun"/);
  assert.doesNotMatch(component, /"\/companies\/sunrun\/ethics-compliance"/);

  assert.match(destinations, /preferredSource\?: PreferredSourceMode/);
  assert.match(destinations, /id: "sunrun"[\s\S]*?preferredSource: "shared"/);
  assert.match(destinations, /id: "sunrun-ethics-compliance"[\s\S]*?preferredSource: "shared"/);
  assert.match(destinations, /id: "titan-solar-power"[\s\S]*?preferredSource: "shared"/);
  assert.match(destinations, /id: "connecticut-ag-sunrun"[\s\S]*?preferredSource: "shared"/);
  assert.match(destinations, /id: "freedom-forever"[\s\S]*?preferredSource: "embedded"/);
});

test("automatically covers research and case stories without duplicating the Freedom Forever hub control", async () => {
  const component = await readFile(componentPath, "utf8");

  assert.match(component, /"\/research"/);
  assert.match(component, /pathname\.startsWith\("\/research\/"\)/);
  assert.match(component, /pathname === "\/cases\/freedom-forever"/);
  assert.match(component, /pathname\.startsWith\("\/cases\/"\)/);
});
