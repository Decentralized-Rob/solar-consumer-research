"""Probe publicly accessible Boxborough PermitPro getResults request and filter shape.
No exhaustive harvesting; just enough to determine whether independent company search is possible.
"""
import asyncio,json
from pathlib import Path
from urllib.parse import parse_qs
from playwright.async_api import async_playwright
BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_backend_probe");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  captured=[]
  def watch(req):
   if "mode=getResults" in req.url:
    raw=req.post_data or ""
    data=parse_qs(raw)
    j=data.get("jsonData",[""])[0]
    try: obj=json.loads(j)
    except:obj={"raw":j[:2500]}
    captured.append(obj)
  page.on("request",watch)
  try:
   await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(2800)
   if not captured:
    print("NO_REQUEST_CAPTURE",flush=True);return
   first=captured[0]
   print("INITIAL_REQUEST",json.dumps(first)[:13000],flush=True)
   (OUT/"initial_request.json").write_text(json.dumps(first,indent=2))
   raw=await ctx.request.post(BASE+"index.php?act=dashboard&mode=getResults",form={"jsonData":json.dumps(first)},timeout=35000)
   text=await raw.text()
   print("RAW_RESPONSE",raw.status,len(text),text[:1400],flush=True)
   (OUT/"response_structure.json").write_text(json.dumps({"status":raw.status,"length":len(text),"first_2000":text[:2000]},indent=2))
   await page.locator("#filterWhat").select_option("address")
   await page.locator("#filterOperator").select_option("contains")
   await page.locator("input.filterWhere:visible").first.fill("MIDDLE")
   await page.locator("#filterShow").click()
   await page.wait_for_timeout(2400)
   if len(captured)<2:
    print("NO_FILTERED_REQUEST",len(captured),flush=True);return
   filtered=captured[-1]
   print("FILTERED_REQUEST",json.dumps(filtered)[:14000],flush=True)
   (OUT/"filtered_request.json").write_text(json.dumps(filtered,indent=2))
   print("CAPTURED",len(captured),flush=True)
  except Exception as e:print("ERROR",repr(e)[:1500],flush=True)
  finally:await ctx.close();await browser.close()
asyncio.run(main())
