"""Boxborough PermitPro: independent Giga and Sunrun search using live dashboard.
Fallback when public CSV export is not downloadable. No named match is presumed.
"""
import asyncio,hashlib,json,re
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_ui_backup");OUT.mkdir(exist_ok=True)

async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  ctx=await browser.new_context(accept_downloads=True)
  page=await ctx.new_page()
  results=[]
  docs=[]
  try:
   response=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=30000)
   await page.wait_for_timeout(1800)
   columns=await page.locator("#columnList option").evaluate_all("""xs=>xs.map(x=>({value:x.value,name:x.textContent.trim(),selected:x.selected}))""")
   wanted=("contractor company","contractor name","applicant name","firm name","proposed work description")
   extra=[x["value"] for x in columns if any(w in x["name"].lower() for w in wanted) and not x["selected"]]
   selected=[x["value"] for x in columns if x["selected"]]
   print("OPEN",response.status,"COLUMNS",len(columns),"ADD",extra,flush=True)
   if extra:
    await page.locator("#columnList").select_option(selected+extra)
    await page.wait_for_timeout(1300)
   opts=await page.locator("#filterWhat option").evaluate_all("""xs=>xs.map(x=>({value:x.value,name:x.textContent.trim()}))""")
   print("FILTER_OPTIONS",json.dumps(opts),flush=True)
   print("SEARCH_INPUT",await page.locator("#resultsTable_filter input").count(),flush=True)
   inspect=await page.evaluate("""()=>({tableHead:[...document.querySelectorAll('#resultsTable thead th')].map(x=>x.innerText),input:[...document.querySelectorAll('#resultsTable_filter input')].map(x=>({outer:x.outerHTML,visible:!!x.offsetParent})),info:document.querySelector('#resultsTable_info')?.innerText||''})""")
   print("TABLE_INFO",json.dumps(inspect)[:5000],flush=True)
   for company,terms in [("giga",["Giga","Espigar"]),("sunrun",["Sunrun","Sun Run"])]:
    for term in terms:
     if await page.locator("#resultsTable_filter input").count():
      target=page.locator("#resultsTable_filter input").first
      await target.fill(term)
      await target.press("End")
      await target.press("Backspace")
      await target.press(term[-1])
      await page.wait_for_timeout(3500)
      data=await page.evaluate("""()=>({rows:[...document.querySelectorAll('#resultsTable tbody tr')].map(r=>({text:r.innerText,hrefs:[...r.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})),info:document.querySelector('#resultsTable_info')?.innerText||'',body:document.body.innerText.slice(-1000)})""")
      print("SEPARATE_SEARCH",company,term,"ROWS",len(data["rows"]),"INFO",data["info"],"FIRST",json.dumps(data["rows"][:3])[:1500],flush=True)
      results.append({"company":company,"term":term,**data})
    # clear after each independent company search
    if await page.locator("#resultsTable_filter input").count():
     await page.locator("#resultsTable_filter input").fill("")
     await page.locator("#resultsTable_filter input").press("Backspace")
     await page.wait_for_timeout(1000)
   (OUT/"giga_separate_search.json").write_text(json.dumps([x for x in results if x["company"]=="giga"],indent=2))
   (OUT/"sunrun_separate_search.json").write_text(json.dumps([x for x in results if x["company"]=="sunrun"],indent=2))
   unique={}
   for search in results:
    for row in search["rows"]:
     for link in row["hrefs"]:
      if link and "act=process" in link:
       unique.setdefault(urljoin(BASE,link),set()).add(search["company"])
   print("INDEPENDENT_PERMIT_MATCHES",len(unique),flush=True)
   for url,companies in list(unique.items())[:8]:
    await page.goto(url,wait_until="domcontentloaded",timeout=30000)
    await page.wait_for_timeout(1500)
    obj=await page.evaluate("""()=>({text:document.body.innerText.slice(0,18000),links:[...document.querySelectorAll('a[href]')].map(a=>({url:a.href,text:a.innerText}))})""")
    (OUT/("record_"+url.split("id=")[-1]+".json")).write_text(json.dumps(obj,indent=2))
    urls=list(dict.fromkeys(l["url"] for l in obj["links"] if ".s3.amazonaws.com/" in l["url"] or l["url"].lower().endswith(".pdf")))
    print("MATCHED_RECORD",url,"COMPANIES",sorted(companies),"DOC_LINKS",len(urls),flush=True)
    for link in urls[:30]:
     try:
      r=await ctx.request.get(link,timeout=25000)
      data=await r.body()
      if not data.startswith(b"%PDF-"):continue
      sha=hashlib.sha256(data).hexdigest()
      file=OUT/(sha[:16]+".pdf")
      file.write_bytes(data)
      docs.append({"record":url,"company_search_hits":sorted(companies),"source":link,"file":file.name,"sha256":sha,"bytes":len(data)})
      print("ORIGINAL_PDF",file.name,len(data),flush=True)
     except Exception as e:print("PDF_ERROR",str(e)[:200],flush=True)
   (OUT/"verified_originals.json").write_text(json.dumps(docs,indent=2))
  except Exception as exc:
   print("ERROR",repr(exc)[:1200],flush=True)
   (OUT/"error.txt").write_text(repr(exc))
  finally:await ctx.close();await browser.close()
asyncio.run(main())
