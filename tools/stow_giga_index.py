import asyncio, json, math, re
from pathlib import Path
from playwright.async_api import async_playwright
BASE = "https://permitlinkusa-online.com/csp/stowma/"
OUT=Path("stow_giga_index"); OUT.mkdir(exist_ok=True)
KEYWORDS=re.compile(r"roof|shingle|re.roof|strip.and.replace|giga|espigar|solar|photovoltaic|\bpv\b|array|sunrun|energy.storage",re.I)
async def main():
  allrows=[]; candidates=[]; issues=[]
  async with async_playwright() as pw:
    browser=await pw.chromium.launch(headless=True)
    page=await browser.new_page()
    resp=await page.goto(BASE+"DocumentLink.PublicPermitListCenter.cls",wait_until="domcontentloaded",timeout=60000)
    await page.wait_for_timeout(800)
    total=int(await page.evaluate("() => zenPage.getComponentById('table').getProperty('rowCount')"))
    print("STOW INDEX",resp.status,"TOTAL",total,flush=True)
    n_pages=math.ceil(total/22)
    for n in range(1,n_pages+1):
      if n>1:
        await page.evaluate("(num)=>zenPage.getComponentById('tablen').gotoPage(num)",n)
        try: await page.wait_for_function("(num) => document.querySelector('a.tnbrPageLinkCurr')?.innerText.trim() === String(num)",arg=n,timeout=12000)
        except Exception as exc:
          issues.append({"page":n,"error":str(exc)[:150]})
          print("PAGE FAILED",n,str(exc)[:100],flush=True)
          break
      entries=await page.evaluate("""({pageNumber,perPage})=>{
        const t=zenPage.getComponentById('table');
        return [...document.querySelectorAll('tr[id^="tr_"]')]
          .filter(el=>el.offsetHeight>0)
          .map((el,i)=>({row_id:el.id,text:el.innerText.replace(/\\s+/g,' ').trim(),index:(pageNumber-1)*perPage+i,local:i}))
          .filter(x=>x.text.length>0);
      }""",{"pageNumber":n,"perPage":22})
      for v in entries:
        v["page"]=n
        allrows.append(v)
      # Only dereference matching permits; the portal's native getRowData fetches full record on demand.
      for v in entries:
        if KEYWORDS.search(v["text"]):
          try:
            info=await page.evaluate("(index)=>zenPage.getComponentById('table').getRowData(index)",v["index"])
            if not info or not info.get("DocumentId") or str(info.get("PermitID","")).strip() not in v["text"]:
              issues.append({"page":n,"index":v["index"],"issue":"No document id","info":info})
            else:
              candidates.append({"visible":v,"permit":info})
          except Exception as exc:
            issues.append({"page":n,"index":v["index"],"issue":str(exc)[:200]})
      if n%20==0 or n==n_pages:
        print("INDEX PROGRESS",n,"/",n_pages,"rows",len(allrows),"candidates",len(candidates),"issues",len(issues),flush=True)
        (OUT/"progress.json").write_text(json.dumps({"total":total,"pages_done":n,"rows":len(allrows),"candidates":candidates,"issues":issues},indent=2))
    print("COMPLETE",len(allrows),"MATCH CANDIDATES",len(candidates),"ISSUES",len(issues),flush=True)
    (OUT/"all_visible_rows.json").write_text(json.dumps(allrows,indent=2))
    (OUT/"roof_solar_candidates.json").write_text(json.dumps(candidates,indent=2))
    (OUT/"issues.json").write_text(json.dumps(issues,indent=2))
    for company in ("giga","espigar","sunrun"):
      hits=[r for r in allrows if company in r["text"].lower()]
      print("VISIBLE MATCH",company,len(hits),json.dumps(hits[:10])[:3000],flush=True)
    for row in candidates[:3]: print("ROW SAMPLE",json.dumps(row)[:1800],flush=True)
    await browser.close()
asyncio.run(main())
