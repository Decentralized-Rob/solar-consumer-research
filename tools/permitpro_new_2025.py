import asyncio,csv,io,json,re,hashlib
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

OUT=Path("permitpro_new_2025");OUT.mkdir(exist_ok=True)
TOWNS=["boxborough","nahant"]
PAT=re.compile("giga|espigar|sunrun",re.I)
def norm(x):return re.sub(r"[^0-9a-z]","",x.lower().replace("street","st").replace("road","rd").replace("drive","dr"))

async def main():
 async with async_playwright() as pw:
  browser=await pw.chromium.launch(headless=True)
  for town in TOWNS:
   base=f"https://{town}.patriotpermitpro.com/"
   dest=OUT/town;dest.mkdir(exist_ok=True)
   ctx=await browser.new_context(accept_downloads=True)
   p=await ctx.new_page()
   result={"town":town,"downloads":[]}
   try:
    resp=await p.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=27000)
    await p.wait_for_timeout(900)
    print("TOWN",town,"HTTP",resp.status if resp else 0,flush=True)
    print("INITIAL_FILTER_BUTTON",town,await p.locator("#filterShow").count(),flush=True)
    # Search date window to keep export small.
    for op,dt in [("after","01/01/2025"),("before","09/04/2025")]:
     await p.locator("#filterWhat").select_option("Application Date")
     await p.locator("#filterOperator").select_option(op)
     el=p.locator("input.filterWhere:visible").first
     if not await el.is_enabled():await el.evaluate("(x)=>{x.disabled=false}")
     await el.fill(dt)
     await p.locator("#filterShow").click()
     await p.wait_for_timeout(700)
     print("FILTER_APPLIED",town,op,dt,flush=True)
    opts=await p.locator("#columnList option").evaluate_all("(xs)=>xs.map(x=>({v:x.value,t:x.textContent.trim(),s:x.selected}))")
    sels=[o["v"] for o in opts if o["s"]]
    adds=[o["v"] for o in opts if not o["s"] and re.search("Applicant Name|Applicant Company|Contractor Name|Contractor Company|Application ID|Application Date|Proposed Work|Address",o["t"],re.I)]
    if adds:
     await p.locator("#columnList").select_option(sels+adds)
     await p.wait_for_timeout(300)
    print("ADDED_FIELDS",town,adds,flush=True)
    print("POST_FIELDS_FILTER_BUTTON",town,await p.locator("#filterShow").count(),flush=True)
    (dest/"dashboard.txt").write_text((await p.locator("body").inner_text())[:13000])
    await p.screenshot(path=str(dest/"dashboard.png"),full_page=True)
    try:
     async with p.expect_download(timeout=30000) as dl:
      await p.locator("#downloadResultsCSV").click(timeout=8000)
     download=await dl.value
     await download.save_as(dest/"2025.csv")
     rows=list(csv.DictReader(io.StringIO((dest/"2025.csv").read_bytes().decode("utf-8-sig",errors="replace"))))
     print("CSV",town,len(rows),flush=True)
    except Exception as e:
     print("CSV_UNAVAILABLE",town,str(e)[:200],flush=True)
     result["download_error"]=str(e)[:300]
     # Keep visible 2025 record results for inspection.
     rows=[]
     result["visible_rows"]=await p.locator("tr").evaluate_all("(xs)=>xs.map(x=>x.innerText).filter(x=>/25-00|2025/.test(x)).slice(0,120)")
    result["rows"]=len(rows)
    result["columns"]=list(rows[0]) if rows else []
    results=[r for r in rows if PAT.search("|".join(str(v) for v in r.values()))]
    result["hits"]=results[:350]
    gigs=[r for r in results if re.search("giga|espigar","|".join(str(v) for v in r.values()),re.I)]
    suns=[r for r in results if re.search("sunrun","|".join(str(v) for v in r.values()),re.I)]
    joint=[(g,s) for g in gigs for s in suns if norm(g.get("Address","")) and norm(g.get("Address",""))==norm(s.get("Address",""))]
    print("CROSS",town,"GIGA",len(gigs),"SUNRUN",len(suns),"JOINT",len(joint),flush=True)
    result["joint"]=[{"giga":g,"sunrun":s} for g,s in joint]
    for g,s in joint[:2]:
     addr=g.get("Address","")
     await p.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=24000)
     await p.locator("#filterWhat").select_option("address")
     await p.locator("#filterOperator").select_option("contains")
     await p.locator("input.filterWhere:visible").first.fill(" ".join(addr.split()[:2]))
     await p.locator("#filterShow").click()
     await p.wait_for_timeout(900)
     visible=await p.locator("tr").evaluate_all("(xs)=>xs.map(x=>({text:x.innerText,links:[...x.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))}))")
     for record in (g,s):
      app=record.get("Application ID","")
      item=next((r for r in visible if app and app in r["text"]),None)
      if not item:print("MISSING_RECORD",town,app,flush=True);continue
      href=next((h for h in item["links"] if h and "act=process" in h),None)
      if not href:continue
      url=urljoin(base,href)
      await p.goto(url,wait_until="domcontentloaded",timeout=25000)
      data=await p.evaluate("""()=>({body:document.body.innerText,files:[...document.querySelectorAll('a[href]')].map(a=>({url:a.href,label:a.closest('tr')?.innerText||a.innerText}))})""")
      if app not in data["body"] or norm(addr) not in norm(data["body"]):
       print("MISMATCH",town,app,flush=True);continue
      target=dest/app;target.mkdir(exist_ok=True)
      (target/"record.json").write_text(json.dumps({"url":url,"body":data["body"]},indent=2))
      seen=set()
      for x in data["files"]:
       link=x["url"]
       if ".s3.amazonaws.com/" not in link or not link.lower().split("?")[0].endswith(".pdf") or link in seen:continue
       seen.add(link)
       try:
        r=await ctx.request.get(link,timeout=26000)
        b=await r.body()
        if not b.startswith(b"%PDF-"):continue
        sha=hashlib.sha256(b).hexdigest()
        name=sha[:16]+".pdf"
        (target/name).write_bytes(b)
        ent={"app":app,"label":x["label"][:180],"file":str(target/name),"sha256":sha,"url":link,"record":url,"bytes":len(b)}
        result["downloads"].append(ent)
        print("PDF_SAVED",town,app,name,len(b),flush=True)
       except Exception as e:print("PDF_ERROR",town,app,str(e)[:140],flush=True)
   except Exception as e:
    result["error"]=str(e)[:600]
    print("TOWN_FAIL",town,str(e)[:300],flush=True)
   finally:
    (dest/"findings.json").write_text(json.dumps(result,indent=2))
    await ctx.close()
  await browser.close()
asyncio.run(main())
