"""Read-only Barnstable Laserfiche public property-file discovery; preserve genuine PDFs only."""
import asyncio
import hashlib
import json
import re
from pathlib import Path
from urllib.parse import urljoin, urlparse, parse_qs
from playwright.async_api import async_playwright

OUT = Path("barnstable_45_tevyaw_packet")
OUT.mkdir(exist_ok=True)
BASE = "https://laserweb.town.barnstable.ma.us/WebLink/"
ROOT = "https://laserweb.town.barnstable.ma.us/"
OBS = {"target": "45 TEVYAW ROAD, HYANNIS, MA", "giga_permit": "EXPR-25-4", "pages": [], "requests": [], "pdfs": [], "errors": []}
seen_requests = set()

async def snapshot(page, tag):
    try:
        await page.screenshot(path=str(OUT / (tag + ".png")), full_page=True, timeout=10000)
    except Exception as e:
        OBS["errors"].append("screenshot " + tag + " " + repr(e)[:200])
    try:
        data = await page.evaluate("""() => ({
          text: document.body ? document.body.innerText.slice(0,12000) : "",
          title: document.title,
          inputs: [...document.querySelectorAll('input')].slice(0,24).map(e=>({type:e.type,id:e.id,name:e.name,placeholder:e.placeholder,aria:e.getAttribute('aria-label')})),
          buttons: [...document.querySelectorAll('button')].slice(0,25).map(e=>({text:(e.innerText||'').slice(0,100),title:e.title,aria:e.getAttribute('aria-label')})),
          links: [...document.querySelectorAll('a[href]')].slice(0,150).map(e=>({text:(e.innerText||'').slice(0,110),href:e.href})),
          frames: [...document.querySelectorAll('iframe')].map(e=>e.src)
        })""")
    except Exception as e:
        data = {"error": repr(e)}
    entry = {"tag": tag, "url": page.url, **data}
    OBS["pages"].append(entry)
    print("SNAPSHOT", tag, page.url, "TEXT", repr(data.get("text", "")[:850]), flush=True)
    print("INPUTS", tag, json.dumps(data.get("inputs", []))[:2000], flush=True)
    print("LINKS", tag, json.dumps(data.get("links", [])[:10])[:1800], flush=True)
    return entry

def on_response(resp):
    try:
        req = resp.request
        if req.resource_type not in ("fetch", "xhr", "document"):
            return
        u = resp.url
        if not ("barnstable.ma.us" in u or "viewpointcloud.com" in u):
            return
        key = (resp.status, u.split("?")[0])
        if key in seen_requests:
            return
        seen_requests.add(key)
        OBS["requests"].append({"status": resp.status, "type": req.resource_type, "url": u[:350], "content_type": resp.headers.get("content-type", "")})
    except Exception:
        pass

async def test_search(page):
    locator = page.locator('input[type="search"], input[placeholder*="Search" i], input[aria-label*="Search" i], input[placeholder*="document" i]')
    if await locator.count() == 0:
        locator = page.locator('input[type="text"]:visible')
    print("SEARCH_INPUTS", await locator.count(), flush=True)
    for i in range(min(await locator.count(), 3)):
        item = locator.nth(i)
        try:
            if not await item.is_visible(): continue
            await item.fill("45 TEVYAW ROAD", timeout=6000)
            await item.press("Enter")
            await page.wait_for_timeout(5000)
            await snapshot(page, "02_after_address_search")
            return True
        except Exception as e:
            OBS["errors"].append("search " + repr(e)[:200])
    return False

async def try_public_originals(page, context):
    # Never guess document identifiers. Use IDs observed in the visible public page only.
    links = await page.locator('a[href]').evaluate_all("(es)=>es.map(e=>({text:(e.innerText||'').slice(0,100),href:e.href}))")
    candidates = []
    for v in links:
        u = v["href"]
        low = u.lower()
        if "docview.aspx" in low or ("browse.aspx" in low and "id=" in low):
            ids = parse_qs(urlparse(u).query).get("id", [])
            if ids:
                candidates.append({"id": ids[0], "href": u, "text": v["text"]})
    OBS["document_candidates"] = candidates[:50]
    print("CANDIDATES", json.dumps(candidates[:15])[:3000], flush=True)
    for doc in candidates[:6]:
        if "docview" not in doc["href"].lower():
            continue
        u = BASE + "DocView.aspx?dbid=0&repo=TownOfBarnstable&id=" + doc["id"] + "&openpdf=true"
        try:
            resp = await context.request.get(u, timeout=25000)
            b = await resp.body()
            is_pdf = b.startswith(b"%PDF")
            print("DOWNLOAD_TEST", doc["id"], resp.status, len(b), resp.headers.get("content-type"), is_pdf, flush=True)
            if is_pdf and len(b) <= 25_000_000:
                p = OUT / ("document_" + doc["id"] + ".pdf")
                p.write_bytes(b)
                OBS["pdfs"].append({"id": doc["id"], "path": str(p), "bytes": len(b), "sha256": hashlib.sha256(b).hexdigest(), "source": u})
        except Exception as e:
            OBS["errors"].append("pdf " + doc["id"] + " " + repr(e)[:200])

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        context = await browser.new_context(accept_downloads=True, viewport={"width": 1400, "height": 1000})
        page = await context.new_page()
        page.on("response", on_response)
        for tag, url in [
            ("00_weblink_welcome", BASE + "Welcome.aspx?dbid=0&repo=TownOfBarnstable"),
            ("01_weblink_browse", BASE + "Browse.aspx?dbid=0&repo=TownOfBarnstable")
        ]:
            try:
                response = await page.goto(url, wait_until="domcontentloaded", timeout=35000)
                await page.wait_for_timeout(4500)
                print("NAVIGATE", tag, response.status if response else "none", page.url, flush=True)
                await snapshot(page, tag)
            except Exception as e:
                OBS["errors"].append("navigate " + tag + " " + repr(e)[:250])
        await test_search(page)
        await try_public_originals(page, context)
        # Save portal request paths to identify whether an anonymous public search API exists.
        OBS["requests"] = OBS["requests"][:150]
        (OUT / "00_DISCOVERY_MANIFEST.json").write_text(json.dumps(OBS, ensure_ascii=False, indent=2))
        print("FINAL", "pdfs", len(OBS["pdfs"]), "request_paths", len(OBS["requests"]), "pages", len(OBS["pages"]), flush=True)
        print("RELEVANT_REQUESTS", json.dumps(OBS["requests"][-25:], ensure_ascii=False)[:7000], flush=True)
        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
