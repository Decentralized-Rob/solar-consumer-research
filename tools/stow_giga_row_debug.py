import asyncio, json
from pathlib import Path
from playwright.async_api import async_playwright
OUT=Path("stow_giga_late_row_debug");OUT.mkdir(exist_ok=True)
URL="https://permitlinkusa-online.com/csp/stowma/DocumentLink.PublicPermitListCenter.cls"
async def main():
  async with async_playwright() as pw:
    browser=await pw.chromium.launch(headless=True,args=["--disable-popup-blocking"])
    ctx=await browser.new_context()
    p=await ctx.new_page()
    await p.goto(URL,wait_until="domcontentloaded",timeout=45000)
    await p.wait_for_timeout(600)
    for n in [120,150]:
      await p.evaluate("(n)=>zenPage.getComponentById('tablen').gotoPage(n)",n)
      await p.wait_for_function("(n)=>document.querySelector('a.tnbrPageLinkCurr')?.innerText.trim()===String(n)",arg=n,timeout=12000)
      rows=await p.evaluate("""() => {
        const t=zenPage.getComponentById('table');
        let els=[...document.querySelectorAll('tr[id^="tr_"]')].filter(x=>x.offsetHeight>0);
        return els.map((x,i)=>({local:i,id:x.id,html:x.outerHTML.slice(0,1800),text:x.innerText.slice(0,350)}))
      }""")
      print("PAGE",n,"MATCHED ROWS",json.dumps([x for x in rows if "roof" in x["text"].lower()][:3]),flush=True)
      choice=next((x for x in rows if "roof" in x["text"].lower()), rows[0])
      locator=p.locator("#"+choice["id"])
      await locator.click(timeout=12000)
      state=await p.evaluate("""({page,local})=>{
        const t=zenPage.getComponentById('table');
        return {selected:t.getProperty('selectedIndex'), rowCount:t.getProperty('rowCount'),
        rowGlobal:t.getRowData((page-1)*22+local),
        rowLocal:t.getRowData(local),
        rowSelected:t.getRowData(t.getProperty('selectedIndex')),
        selectedText:document.querySelector('tr[id^="tr_"].selected')?.innerText};
      }""",{"page":n,"local":choice["local"]})
      print("STATE",n,json.dumps(state)[:6000],flush=True)
      try:
        await p.evaluate("()=>zenPage.openDummy('Attachment')")
        await p.wait_for_timeout(700)
        print("PAGES",n,[q.url for q in ctx.pages],flush=True)
      except Exception as e:print("ATTACHMENT OPEN FAIL",str(e)[:250],flush=True)
      (OUT/f"debug_{n}.json").write_text(json.dumps({"choice":choice,"state":state,"pages":[q.url for q in ctx.pages]},indent=2))
      for q in ctx.pages[1:]:
        await q.close()
    await browser.close()
asyncio.run(main())
