import test from "node:test"; import assert from "node:assert/strict"; import fs from "node:fs";
const ledger=JSON.parse(fs.readFileSync(new URL("../data/goodleap/source-ledger-2026-09-16.json",import.meta.url),"utf8"));
test("GoodLeap ledger contains primary published records",()=>{assert.ok(ledger.records.some(r=>r.state==="Minnesota"&&r.status==="published"));assert.ok(ledger.records.some(r=>r.state==="Virginia"&&r.status==="published"))});
test("unpublished newer state records stay in review",()=>{for(const state of ["Maryland","Texas","Florida"])assert.ok(ledger.records.some(r=>r.state===state&&r.status==="reviewing"),state)});
