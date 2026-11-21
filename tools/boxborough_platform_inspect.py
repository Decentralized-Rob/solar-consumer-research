import asyncio,json
from pathlib import Path
from playwright.async_api import async_playwright
BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_inspect");OUT.mkdir(exist_ok=True)
async def main():
 async with async_playwright() as p:
  b=await p.chromium.launch(headless=True)
  ctx=await b.new_context(accept_downloads=True)
  page=await ctx.new_page()
  reqs=[]
  page.on("request",lambda r:reqs.append({"url":r.url[:240],"method":r.method,"type":r.resource_type,"body":(r.post_data or "")[:300]}) if r.resource_type in ("xhr","fetch") else None)
  try:
   await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(2400)
   obj=await page.evaluate("""()=>{const j=window.jQuery||window.$;
    let settings=null;
    try{const o=j('#resultsTable').dataTable().fnSettings();settings={
     server:o.oFeatures?.bServerSide, source:o.sAjaxSource,display:o._iDisplayLength,
     aoData:o.aoData?.length,init:o.oInit,fnServerData:String(o.fnServerData).slice(0,700),
     total:o._iRecordsTotal,displayRecords:o._iRecordsDisplay
    };}catch(e){settings={error:String(e)}}
    const el=document.querySelector('#columnList');
    return {settings,buttons:[...document.querySelectorAll('button,input[type=button]')].map(x=>({text:x.innerText||x.value||'',id:x.id,visible:!!x.offsetParent})).slice(0,65),
      pageControls:document.querySelector('#resultsTable_paginate')?.outerHTML?.slice(0,2500),
      colHTML:el?.parentElement?.parentElement?.outerHTML?.slice(0,4500),
      rowHTML:document.querySelector('#resultsTable tbody tr')?.outerHTML?.slice(0,1500),
      next:document.querySelector('#resultsTable_next')?.outerHTML?.slice(0,600),
      reportLink:[...document.querySelectorAll('a')].filter(x=>x.innerText.toLowerCase().includes('report')).map(x=>({href:x.href,outer:x.outerHTML.slice(0,400)}))
    };
   }""")
   print("TABLE_INIT",json.dumps(obj)[:12000],flush=True)
   (OUT/"table_init.json").write_text(json.dumps(obj,indent=2))
   candidates=await page.locator("#columnList option").evaluate_all("""xs=>xs.filter(x=>x.selected || /contractor|applicant|proposed work/i.test(x.innerText)).map(x=>({v:x.value,txt:x.innerText,selected:x.selected}))""")
   print("COLUMN_CANDIDATES",json.dumps(candidates)[:4000],flush=True)
   options=[x["v"] for x in candidates]
   try:
    await page.locator("#columnList").select_option(options)
    await page.wait_for_timeout(1700)
   except Exception as e:print("SELECT_FIELDS_ERROR",str(e)[:300])
   after=await page.evaluate("""()=>({headers:[...document.querySelectorAll('#resultsTable thead th')].map(x=>x.innerText),info:document.querySelector('#resultsTable_info')?.innerText,selected:[...document.querySelectorAll('#columnList option:checked')].map(x=>x.textContent.trim())})""")
   print("AFTER_SELECT",json.dumps(after)[:6000],flush=True)
   try:
    j=await page.locator("#resultsTable_next").count()
    print("NEXT_COUNT",j,flush=True)
    if j:
     await page.locator("#resultsTable_next").click(timeout=7000)
     await page.wait_for_timeout(1600)
     print("NEXT_PAGE",json.dumps(await page.evaluate("""()=>({info:document.querySelector('#resultsTable_info')?.innerText,first:document.querySelector('#resultsTable tbody tr')?.innerText})"""))[:1500],flush=True)
   except Exception as e:print("NEXT_ERROR",str(e)[:300],flush=True)
   print("XHR_REQUESTS",json.dumps(reqs[-24:])[:8000],flush=True)
   (OUT/"xhr.json").write_text(json.dumps(reqs,indent=2))
  except Exception as e:print("ERROR",repr(e)[:1200],flush=True)
  finally:await ctx.close();await b.close()
asyncio.run(main())
