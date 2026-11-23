"""Read West Boylston public permit index through official pagination."""
import asyncio,json,re
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path("permitlink_westboylston_pages")
OUT.mkdir(exist_ok=True)
URL="https://permitlinkusa-online.com/csp/westboylstonma/DocumentLink.PublicPermitListCenter.cls"
TERMS=["giga","sunrun","solar","photovoltaic","roof","shingle","panel","battery","sunpower","pv ","pv system"]
async def main():
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(headless=True)
  page=await browser.new_page()
  resp=await page.goto(URL,wait_until="domcontentloaded",timeout=60000)
  await page.wait_for_timeout(800)
  print("STATUS",resp.status,"PAGE",page.url,flush=True)
  allrows=[]; pages=[]
  for n in range(1,101):
   if n>1:
    await page.evaluate("(num) => zenPage.getComponentById('tablen').gotoPage(num)",n)
    try:
     await page.wait_for_function("(num) => document.querySelector('a.tnbrPageLinkCurr')?.innerText.trim() === String(num)",n,timeout=10000)
    except Exception as e:
     print("PAGING FAILED",n,str(e)[:220],flush=True)
     (OUT/f"failure_page_{n}.html").write_text(await page.content())
     break
    await page.wait_for_timeout(150)
   rows=await page.evaluate("""() => Array.from(document.querySelectorAll('tr[id^="tr_"]')).filter(x=>x.offsetHeight>0).map(x=>({id:x.id,text:x.innerText.replace(/\s+/g,' ').trim()}))""")
   if n==1:
    print("FIRST ROWS",json.dumps(rows[:2]),flush=True)
   if rows:
    pages.append({"page":n,"rows":len(rows)})
    for row in rows:
     row["page"]=n
     allrows.append(row)
   if n%10==0:print("PAGES",n,"ROWS",len(allrows),flush=True)
   if not rows:
    print("EMPTY PAGE",n,flush=True);break
  (OUT/"index_visible_rows.json").write_text(json.dumps(allrows,indent=2))
  matches={term:[r for r in allrows if term in r["text"].lower()] for term in TERMS}
  (OUT/"index_matches.json").write_text(json.dumps(matches,indent=2))
  (OUT/"page_summary.json").write_text(json.dumps(pages,indent=2))
  print("TOTAL RENDERED",len(allrows),"PAGES",len(pages),"TERM COUNTS",{k:len(v) for k,v in matches.items()},flush=True)
  for k in ["giga","sunrun","solar","photovoltaic","panel","battery","pv "]:
   print("MATCHES",k,json.dumps(matches[k][:25])[:16000],flush=True)
  await browser.close()
asyncio.run(main())
