import asyncio, json, re, traceback
from pathlib import Path
from datetime import datetime, timezone
from playwright.async_api import async_playwright

ROOT=Path('permitpro_probe')
ROOT.mkdir(exist_ok=True)
PORTALS={
 'westborough':'https://westborough.patriotpermitpro.com/',
 'boylston':'https://boylston.patriotpermitpro.com/',
 'boxborough':'https://boxborough.patriotpermitpro.com/',
 'lancaster':'https://lancaster.patriotpermitpro.com/',
 'holbrook':'https://holbrook.patriotpermitpro.com/',
 'princeton':'https://princeton.patriotpermitpro.com/',
 'upton':'https://upton.patriotpermitpro.com/',
}

async def snapshot(page, label, out):
    try:
        await page.screenshot(path=str(out/f'{label}.png'), full_page=True, timeout=10000)
    except Exception as e:
        print('Screenshot failed:',str(e)[:200])
    try:
        data=await page.evaluate('''() => ({
           url: location.href, title: document.title,
           text: document.body?.innerText?.slice(0,25000),
           anchors: [...document.querySelectorAll('a')].map(e=>({text:e.innerText.trim().slice(0,120),href:e.getAttribute('href'),title:e.title})).slice(0,180),
           forms: [...document.querySelectorAll('form')].map(e=>({action:e.action,method:e.method,id:e.id})),
           inputs: [...document.querySelectorAll('input,select,textarea')].map(e=>({tag:e.tagName,type:e.type,id:e.id,name:e.name,placeholder:e.placeholder,outer:e.outerHTML.slice(0,500)})).slice(0,90),
           buttons: [...document.querySelectorAll('button')].map(e=>({text:e.innerText,title:e.title,outer:e.outerHTML.slice(0,300)})).slice(0,90),
           frames: [...document.querySelectorAll('iframe')].map(e=>({src:e.src})),
        })''')
        (out/f'{label}.json').write_text(json.dumps(data, indent=2))
        print(f'SNAPSHOT {label}: url={data.get("url")} title={data.get("title")} anchors={len(data.get("anchors",[]))} inputs={len(data.get("inputs",[]))} forms={len(data.get("forms",[]))}')
        print('ANCHORS',json.dumps(data.get('anchors',[])[:30])[:2800])
        print('INPUTS',json.dumps(data.get('inputs',[])[:25])[:2400])
        print('TEXT',str(data.get('text'))[:1700].replace('\\n',' '))
    except Exception as e:
        print('snapshot error',str(e)[:400])

async def probe(name,url,browser):
    out=ROOT/name
    out.mkdir(exist_ok=True)
    page=await browser.new_page(accept_downloads=True)
    downloads=[]
    responses=[]
    async def handle_download(download):
        try:
            path=out/('download_'+re.sub(r'[^a-zA-Z0-9._-]','_',download.suggested_filename))
            await download.save_as(path)
            downloads.append(str(path))
        except Exception as e:
            print('Download error',e)
    page.on('download', lambda d: asyncio.create_task(handle_download(d)))
    page.on('response',lambda r: responses.append(dict(url=r.url,status=r.status,content_type=r.headers.get('content-type',''))) if ('pdf' in r.headers.get('content-type','').lower() or 'document' in r.url.lower() or 'search' in r.url.lower()) else None)
    try:
        response=await page.goto(url,wait_until='domcontentloaded',timeout=30000)
        print('PORTAL',name,'HTTP',response.status if response else None)
        await page.wait_for_timeout(1800)
        await snapshot(page,'home',out)
        candidates=page.locator('a').filter(has_text=re.compile('public|records|search|reporting',re.I))
        n=await candidates.count()
        print('Navigation candidates',n)
        if n:
            for i in range(min(n,8)):
                try:
                    a=candidates.nth(i)
                    print('candidate',i,(await a.inner_text())[:120],await a.get_attribute('href'))
                except Exception: pass
            for key in ['Public Information','Public Records','Public Access','Search Records','Reporting']:
                loc=page.get_by_text(key,exact=False)
                if await loc.count():
                    try:
                        await loc.first.click(timeout=8000)
                        await page.wait_for_timeout(1800)
                        await snapshot(page,'records',out)
                        break
                    except Exception as e:
                        print('Navigation click failed',key,str(e)[:200])
        # A separate known reporting route for public web crawlers.
        if name=='westborough':
            try:
                await page.goto(url+'index.php?act=reporting',wait_until='domcontentloaded',timeout=20000)
                await page.wait_for_timeout(1000)
                await snapshot(page,'reporting',out)
            except Exception as e: print('Reporting error',str(e)[:300])
    except Exception as e:
        print('PORTAL ERROR',name,repr(e)[:500])
        traceback.print_exc(limit=2)
    (out/'network.json').write_text(json.dumps(responses,indent=2))
    print('DOWNLOADS',downloads)
    await page.close()

async def main():
    async with async_playwright() as p:
        browser=await p.chromium.launch(headless=True)
        for name,url in PORTALS.items():
            await probe(name,url,browser)
        await browser.close()
    print('PROBE_COMPLETE',datetime.now(timezone.utc).isoformat())

asyncio.run(main())
