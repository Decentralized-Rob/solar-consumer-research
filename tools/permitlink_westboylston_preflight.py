"""Public PermitLink one-PDF download preflight. No browser print or fake PDFs."""
import asyncio
import hashlib
import json
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

from playwright.async_api import async_playwright

URL = "https://permitlinkusa-online.com/csp/westboylstonma/DocumentLink.PublicAttachmentCenter.cls?DocumentId=18630&QueryId=18630&Maid=2045"
TARGET = "Signed - Roof Replacement Proposal"
OUT = Path("permitlink_westboylston_results")
OUT.mkdir(exist_ok=True)
records = []
saved = []
pending = []
errors = []

def valid_pdf(data):
    return data.startswith(b"%PDF-") and len(data) > 100

async def save_pdf(data, source, filename_hint=""):
    if not valid_pdf(data):
        return False
    sha = hashlib.sha256(data).hexdigest()
    if any(item["sha256"] == sha for item in saved):
        return True
    stem = re.sub(r"[^A-Za-z0-9_.-]+", "_", filename_hint or TARGET).strip("._")[:85]
    if not stem.lower().endswith(".pdf"):
        stem += ".pdf"
    path = OUT / stem
    if path.exists():
        path = OUT / (path.stem + "_" + sha[:8] + ".pdf")
    path.write_bytes(data)
    item = {"file": str(path), "source": source, "sha256": sha, "bytes": len(data)}
    try:
        from pypdf import PdfReader
        item["pages"] = len(PdfReader(str(path)).pages)
    except Exception as exc:
        item["page_check_error"] = str(exc)[:180]
    saved.append(item)
    print("VERIFIED ORIGINAL PDF:", item, flush=True)
    return True

def spawn(coroutine):
    task = asyncio.create_task(coroutine)
    pending.append(task)
    return task

async def capture_response(response):
    try:
        headers = response.headers
        typ = headers.get("content-type", "").lower()
        dispo = headers.get("content-disposition", "")
        records.append({"status": response.status, "type": typ, "url": response.url, "disposition": dispo})
        path = urlparse(response.url).path.lower()
        candidate = ("pdf" in typ or "octet-stream" in typ or ".pdf" in path
                     or "formimageserver" in path or "attachment" in path and response.request.resource_type != "document")
        if candidate and response.status == 200:
            data = await response.body()
            hint = ""
            match = re.search(r'filename\*?=(?:UTF-8\'\')?["\']?([^;"\']+)', dispo, re.I)
            if match:
                hint = match.group(1)
            await save_pdf(data, "HTTP response: " + response.url, hint)
    except Exception as exc:
        errors.append("Response capture: " + str(exc)[:250])

async def capture_download(download):
    try:
        filename = download.suggested_filename
        tmp = OUT / ("download_" + str(len(saved)) + ".bin")
        await download.save_as(str(tmp))
        data = tmp.read_bytes()
        tmp.unlink(missing_ok=True)
        ok = await save_pdf(data, "Browser download: " + download.url, filename)
        if not ok:
            errors.append("Download was not PDF: " + filename)
    except Exception as exc:
        errors.append("Browser download: " + str(exc)[:250])

async def main():
    async with async_playwright() as pw:
        browser = await pw.chromium.launch(headless=True, args=["--disable-popup-blocking"])
        context = await browser.new_context(accept_downloads=True)
        context.on("response", lambda response: spawn(capture_response(response)))
        opened = []
        def watch_page(page):
            if page not in opened:
                opened.append(page)
                page.on("download", lambda download: spawn(capture_download(download)))
                print("Opened page:", page.url, flush=True)
        context.on("page", watch_page)
        page = await context.new_page()
        watch_page(page)
        try:
            res = await page.goto(URL, wait_until="domcontentloaded", timeout=60000)
            print("Portal status:", res.status if res else "no response", flush=True)
            await page.wait_for_timeout(1800)
            print("Portal title:", await page.title(), flush=True)
            print("Matching target visible:", await page.get_by_text(TARGET, exact=False).count(), flush=True)
            (OUT / "initial_page.html").write_text(await page.content())
            await page.screenshot(path=str(OUT / "initial_page.png"), full_page=True)

            rows = page.locator('tr[id^="tr_"]').filter(has_text=TARGET)
            if await rows.count() > 0:
                await rows.first.click(timeout=15000)
                print("Selected matching table row", flush=True)
            else:
                await page.get_by_text(TARGET, exact=False).first.click(timeout=15000)
                print("Selected matching document text", flush=True)
            await page.wait_for_timeout(600)

            row_info = await page.evaluate("""() => {
                const t = zenPage.getComponentById('table');
                const idx = t.getProperty('selectedIndex');
                return {index: idx, row: idx >= 0 ? t.getRowData(idx) : null};
            }""")
            (OUT / "selected_row.json").write_text(json.dumps(row_info, indent=2))
            print("Selected row data:", row_info, flush=True)
            button_found = False
            for selector in ('input[onclick*="zenPage.getDocument()"]',
                             'button:has-text("Open Selected")',
                             'a:has-text("Open Selected")',
                             'text="Open Selected"'):
                control = page.locator(selector).first
                if await control.count() and await control.is_visible():
                    print("Clicking:", selector, flush=True)
                    await control.click(timeout=15000)
                    button_found = True
                    break
            if not button_found:
                raise RuntimeError("Could not locate a visible Open Selected control")

            await page.wait_for_timeout(6000)
            imageid = (row_info.get("row") or {}).get("ImageId")
            if imageid:
                direct_url = ("https://permitlinkusa-online.com/csp/westboylstonma/"
                              "TaxLink.ImageServer.cls?ImageID=" + str(imageid) + "&Decrypt=0")
                try:
                    r = await context.request.get(direct_url, timeout=25000)
                    print("Original endpoint status:", r.status, "type:", r.headers.get("content-type"), flush=True)
                    await save_pdf(await r.body(), "PermitLink original ImageServer: " + direct_url)
                except Exception as exc:
                    errors.append("Direct ImageServer GET: " + repr(exc)[:220])
            else:
                errors.append("Selected row has no ImageId; see selected_row.json")
            # A PDF opened inline or as a popup may require a cookie-bearing GET.
            for other in opened:
                link = other.url
                if other == page or not link.startswith("http") or urlparse(link).hostname != "permitlinkusa-online.com":
                    continue
                try:
                    r = await context.request.get(link, timeout=20000)
                    await save_pdf(await r.body(), "Popup URL fetched with browser cookies: " + link)
                except Exception as exc:
                    errors.append("Popup GET: " + str(exc)[:200])
        except Exception as exc:
            errors.append("Interaction: " + repr(exc))
            print("ERROR:", repr(exc), flush=True)
        finally:
            for idx, p in enumerate(opened):
                try:
                    (OUT / ("page_" + str(idx) + ".html")).write_text(await p.content())
                    await p.screenshot(path=str(OUT / ("page_" + str(idx) + ".png")), full_page=True)
                except Exception:
                    pass
            if pending:
                await asyncio.gather(*pending, return_exceptions=True)
            (OUT / "responses.json").write_text(json.dumps(records, indent=2))
            (OUT / "manifest.json").write_text(json.dumps({
                "tested_at": datetime.now(timezone.utc).isoformat(),
                "municipality": "West Boylston, MA", "portal": URL, "selected": TARGET,
                "verified_original_pdfs": saved, "errors": errors,
                "result": "PASS" if saved else "FAIL"
            }, indent=2))
            await browser.close()
    print("RESULT:", "PASS" if saved else "FAIL", "PDFs:", len(saved), flush=True)
    return 0 if saved else 1

if __name__ == "__main__":
    sys.exit(asyncio.run(main()))
