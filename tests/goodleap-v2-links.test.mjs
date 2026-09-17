import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
const read=p=>fs.readFileSync(new URL(`../${p}`,import.meta.url),"utf8");
test("GoodLeap public pages exist",()=>{for(const p of ["app/goodleap/page.tsx","app/goodleap/states/page.tsx","app/goodleap/states/minnesota/page.tsx","app/goodleap/states/virginia/page.tsx","app/goodleap/resources/page.tsx"])assert.equal(fs.existsSync(new URL(`../${p}`,import.meta.url)),true,p)});
test("GoodLeap hub connects to state and site research",()=>{const s=read("app/goodleap/page.tsx");for(const href of ["/goodleap/states","/states/minnesota","/states/virginia","/states/maryland","/states/texas","/states/florida","/cases/titan-solar-power","/research","/resources","/#questions"])assert.ok(s.includes(href),href)});
test("Minnesota source boundary is preserved",()=>{const s=read("app/goodleap/states/minnesota/page.tsx");assert.ok(s.includes("nearly 5,000"));assert.ok(s.includes("four lender defendants collectively"));assert.ok(s.includes("not GoodLeap-only totals"))});
test("Virginia source boundary is preserved",()=>{const s=read("app/goodleap/states/virginia/page.tsx");assert.ok(s.includes("more than 1,000 Virginia households"));assert.ok(s.includes("across all lender defendants"));assert.ok(s.includes("not GoodLeap-only figures"))});
