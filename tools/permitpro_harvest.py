import asyncio, csv, hashlib, io, json, re
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

BASE=Path("permitpro_harvest")
BASE.mkdir(exist_ok=True)
TOWNS=[
 ("boylston","https://boylston.patriotpermitpro.com/"),
 ("boxborough","https://boxborough.patriotpermitpro.com/"),
 ("westborough","https://westborough.patriotpermitpro.com/"),
 ("lancaster","https://lancaster.patriotpermitpro.com/"),
]
TERMS=["Sunrun","Giga","Oliveira","Espigar"]
manifest=[]
def slug(s):return re.sub(r"[^a-zA-Z0-9._-]+","_",s)[:100]

async def fetch_attachment(context,href,town,record_id):
    try:
        resp=await context.request.get(href,timeout=20000)
        b=await resp.body()
        if not b.startswith(b"%PDF-"):
            print("NOT_PDF",town,record_id,href,resp.status,len(b))
            return
        sha=hashlib.sha256(b).hexdigest()
        path=BASE/town/(slug(record_id)+"_"+sha[:16]+".pdf")
        path.parent.mkdir(exist_ok=True)
        path.write_bytes(b)
        entry=dict(town=town,record=record_id,url=href,file=str(path),bytes=len(b),sha256=sha,status=resp.status,content_type=resp.headers.get("content-type"))
        manifest.append(entry)
        print("CAPTURED_PDF",json.dumps(entry))
    except Exception as exc: print("PDF_ERROR",town,record_id,href,str(exc)[:200])

async def collect_record(context,base,town,href):
    page=await context.new_page()
    try:
        await page.goto(urljoin(base,href),wait_until="domcontentloaded",timeout=17000)
        await page.wait_for_timeout(350)
        info=await page.evaluate("""() => ({
          text:document.body.innerText.slice(0,11000),
          links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.innerText,title:a.title})),
        })""")
        (BASE/town/(slug(href.split("id=")[-1])+"_record.json")).write_text(json.dumps(info,indent=2))
        print("RECORD",town,href,"MATCHES", [t for t in TERMS if t.lower() in info["text"].lower()],"TEXT",info["text"][:450].replace("\n"," | "))
        docs=[x["href"] for x in info["links"] if "permitpro-" in x["href"] and ".s3.amazonaws.com/" in x["href"]]
        print("DOC_LINKS",town,href,len(docs),docs[:12])
        for doc in docs[:20]: await fetch_attachment(context,doc,town,href.split("id=")[-1])
        return info
    except Exception as e:
        print("RECORD_ERROR",town,href,str(e)[:350])
    finally:await page.close()

async def find_sunrun_csv(context,town,base):
    page=await context.new_page(accept_downloads=True)
    try:
        await page.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=24000)
        await page.wait_for_timeout(1200)
        initial=await page.locator("#columnList option").evaluate_all("(o)=>o.map(x=>({v:x.value,t:x.textContent.trim(),selected:x.selected}))")
        print("COLUMN_OPTIONS",town,json.dumps(initial)[:6000])
        add=[x["v"] for x in initial if ("Contractor Company" in x["t"] or "Applicant Company" in x["t"] or "Contractor Name" in x["t"]) and not x["selected"]]
        existing=[x["v"] for x in initial if x["selected"]]
        if add:
            await page.locator("#columnList").select_option(existing+add)
            await page.wait_for_timeout(900)
        new=await page.locator("#filterWhat option").evaluate_all("(o)=>o.map(x=>({v:x.value,t:x.textContent.trim()}))")
        print("FILTER_OPTIONS_AFTER_SELECT",town,json.dumps(new)[:6000])
        try:
            async with page.expect_download(timeout=12000) as dlinfo:
                await page.locator("#downloadResultsCSV").click()
            dl=await dlinfo.value
            dest=BASE/town/"applications.csv"; dest.parent.mkdir(exist_ok=True)
            await dl.save_as(dest)
            raw=dest.read_bytes()
            text=raw.decode("utf-8-sig",errors="replace")
            print("CSV_CAPTURED",town,"bytes",len(raw),"lines",len(text.splitlines()),"header",text[:220])
            rows=list(csv.reader(io.StringIO(text)))
            found=[r for r in rows if any(t.lower() in "|".join(r).lower() for t in TERMS)]
            print("CSV_MATCHES",town,len(found),json.dumps(found[:30])[:6000])
            (BASE/town/"csv_matches.json").write_text(json.dumps(found,indent=2))
        except Exception as e: print("CSV_ERROR",town,str(e)[:450])
        # Use real text filtering for contractor if the UI offers it
        for filter_term in ["Sunrun","Giga"]:
            opts=await page.locator("#filterWhat option").evaluate_all("(o)=>o.map(x=>({v:x.value,t:x.textContent.trim()}))")
            available=[x for x in opts if "Contractor Company" in x["t"] or "Applicant Company" in x["t"]]
            if not available: break
            try:
                await page.locator("#filterWhat").select_option(value=available[0]["v"])
                await page.wait_for_timeout(200)
                ops=await page.locator("#filterOperator option").evaluate_all("(o)=>o.map(x=>({v:x.value,t:x.textContent.trim()}))")
                contains=next((o["v"] for o in ops if "contain" in o["t"].lower()),None)
                if contains:
                    await page.locator("#filterOperator").select_option(value=contains)
                    await page.locator("input.filterWhere:visible").first.fill(filter_term)
                    await page.locator("#filterShow").click()
                    await page.wait_for_timeout(2200)
                    print("FILTERED",town,filter_term,(await page.locator("body").inner_text())[-1800:].replace("\n"," | "))
                    hrefs=await page.locator('a[href*="act=process"]').evaluate_all("(as)=>as.map(a=>a.getAttribute('href'))")
                    print("HITS",town,filter_term,hrefs[:20])
                    for href in hrefs[:6]: await collect_record(context,base,town,href)
            except Exception as e: print("FILTER_EXCEPTION",town,filter_term,str(e)[:320])
        # one ordinary known permit confirms public PDFs without client JS
        if town in ("boylston","westborough"):
            ids=["4239"] if town=="boylston" else ["44852"]
            for i in ids: await collect_record(context,base,town,f"/index.php?act=process&id={i}")
        if town=="lancaster":
            # Known Sunrun/Giga property already in research corpus: 20 Poulin Drive
            await collect_record(context,base,town,"/index.php?act=process&id=5219")
            await collect_record(context,base,town,"/index.php?act=process&id=5120")
            await collect_record(context,base,town,"/index.php?act=process&id=5119")
    except Exception as e:print("TOWN_ERROR",town,repr(e)[:450])
    finally: await page.close()

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        context=await browser.new_context(accept_downloads=True)
        for name,base in TOWNS:
            (BASE/name).mkdir(exist_ok=True)
            await find_sunrun_csv(context,name,base)
        await context.close();await browser.close()
    (BASE/"manifest.json").write_text(json.dumps(manifest,indent=2))
    print("TOTAL_PDF",len(manifest),"DONE")

asyncio.run(main())
