import asyncio, json, re, hashlib, traceback
from pathlib import Path
from playwright.async_api import async_playwright

ROOT=Path("permitpro_retrieval")
ROOT.mkdir(exist_ok=True)
TESTS=[
 ("westborough","https://westborough.patriotpermitpro.com/","Application ID","26-02779"),
 ("lancaster","https://lancaster.patriotpermitpro.com/","Address","POULIN"),
 ("boylston","https://boylston.patriotpermitpro.com/","Application Type","Electrical"),
 ("boxborough","https://boxborough.patriotpermitpro.com/","Application Type","Electrical")
]

async def dump(page, town, stage):
    d=ROOT/town
    d.mkdir(exist_ok=True)
    try:
        await page.screenshot(path=str(d/f"{stage}.png"),full_page=True,timeout=9000)
    except Exception as e: print("Screenshot error",str(e)[:150])
    try:
        data=await page.evaluate("""() => ({
          url:location.href,title:document.title,
          text:document.body.innerText.slice(0,22000),
          anchors:[...document.querySelectorAll('a')].map(a=>({text:a.innerText.trim().slice(0,90),href:a.getAttribute('href'),title:a.title})).slice(0,150),
          inputs:[...document.querySelectorAll('input,select,button')].map(e=>({tag:e.tagName,id:e.id,name:e.name,type:e.type,value:e.value,outer:e.outerHTML.slice(0,380)})).slice(0,65),
          actions:[...document.querySelectorAll('a,button,input[type=button]')].filter(e=>/document|download|file|pdf|attachment|submit|show/i.test((e.innerText||'')+' '+(e.title||'')+' '+(e.value||''))).slice(0,50).map(e=>e.outerHTML.slice(0,600))
        })""")
        (d/f"{stage}.json").write_text(json.dumps(data,indent=2))
        print("DUMP",town,stage,data['url'],"anchors",len(data['anchors']))
        print("TEXT_END",data['text'][-1100:].replace("\n"," | "))
        print("ANCHORS",json.dumps(data['anchors'][:30])[:3500])
        print("ACTIONS",json.dumps(data['actions'])[:2600])
    except Exception as e: print("Dump error",str(e)[:300])

async def test(town,base,field,term,browser):
    d=ROOT/town
    d.mkdir(exist_ok=True)
    context=await browser.new_context(accept_downloads=True)
    page=await context.new_page()
    captured=[]
    tasks=[]
    async def capture_body(resp):
        try:
            headers=await resp.all_headers()
            if "pdf" not in (headers.get("content-type","")+resp.url).lower() and "octet-stream" not in headers.get("content-type",""):
                return
            body=await resp.body()
            if not body.startswith(b"%PDF-"): return
            sha=hashlib.sha256(body).hexdigest()
            path=d/f"network_{len(captured)+1:02d}_{sha[:12]}.pdf"
            path.write_bytes(body)
            captured.append({"kind":"network","url":resp.url,"status":resp.status,"headers":headers,"file":str(path),"bytes":len(body),"sha256":sha})
            print("PDF_CAPTURED",town,str(path),len(body))
        except Exception as e: print("Response body error",str(e)[:120])
    async def capture_download(dl):
        try:
            p=d/f"download_{len(captured)+1:02d}_{re.sub(r'[^A-Za-z0-9._-]','_',dl.suggested_filename)}"
            await dl.save_as(p)
            b=p.read_bytes()
            if not b.startswith(b"%PDF-"): return
            captured.append({"kind":"download","url":dl.url,"file":str(p),"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest()})
            print("PDF_CAPTURED",town,str(p),len(b))
        except Exception as e: print("Download error",str(e)[:150])
    context.on("response",lambda r: tasks.append(asyncio.create_task(capture_body(r))))
    page.on("download",lambda dl: tasks.append(asyncio.create_task(capture_download(dl))))
    try:
        await page.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
        await page.wait_for_timeout(1500)
        await dump(page,town,"start")
        sel=page.locator("#filterWhat")
        if await sel.count():
            print("FILTER_CHOICES",town,await sel.locator("option").evaluate_all("(opts)=>opts.map(x=>({v:x.value,t:x.textContent}))"))
            try:
                await sel.select_option(label=field)
                await page.wait_for_timeout(500)
                print("OP_CHOICES",town,await page.locator("#filterOperator option").evaluate_all("(opts)=>opts.map(x=>({v:x.value,t:x.textContent}))"))
                op=page.locator("#filterOperator")
                opts=await op.locator("option").evaluate_all("(opts)=>opts.map(x=>({v:x.value,t:x.textContent}))")
                chosen=next((o["v"] for o in opts if re.search("contain",o["t"],re.I)),next((o["v"] for o in opts if o["v"] not in ("","undefined")),None))
                if chosen: await op.select_option(value=chosen)
                await page.wait_for_timeout(250)
                where=page.locator("input.filterWhere:visible").first
                if await where.count(): await where.fill(term)
                print("FILTER_STATUS",town,"operator",chosen,"input_count",await where.count())
                await dump(page,town,"filter_ready")
                show=page.get_by_text("Show",exact=True)
                if await show.count():
                    await show.first.click(timeout=6000)
                    await page.wait_for_timeout(1800)
                    await dump(page,town,"filtered")
            except Exception as e: print("FILTER_ERROR",town,repr(e)[:400])
        hrefs=await page.locator('a[href*="act=process"]').evaluate_all("(as)=>as.map(a=>a.getAttribute('href')).slice(0,3)")
        print("MATCHING_RECORDS",town,hrefs)
        if hrefs:
            await page.goto(base+hrefs[0].lstrip('/'),wait_until="domcontentloaded",timeout=25000)
            await page.wait_for_timeout(1600)
            await dump(page,town,"record")
            doc=page.get_by_text("Documents",exact=False)
            print("DOC_TEXT_MATCH",town,await doc.count())
            if await doc.count():
                try:
                    await doc.first.click(timeout=6000)
                    await page.wait_for_timeout(1200)
                    await dump(page,town,"documents")
                except Exception as e: print("DOC_CLICK_ERR",town,str(e)[:300])
        if town=="westborough" and not hrefs:
            print("No records in westborough after filter")
        await page.wait_for_timeout(1500)
    except Exception as e:
        print("ERROR",town,repr(e)[:500]);traceback.print_exc(limit=2)
    finally:
        if tasks: await asyncio.gather(*tasks,return_exceptions=True)
        (d/"capture_manifest.json").write_text(json.dumps(captured,indent=2))
        await context.close()

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        for item in TESTS: await test(*item,browser)
        await browser.close()
    print("DONE")

asyncio.run(main())
