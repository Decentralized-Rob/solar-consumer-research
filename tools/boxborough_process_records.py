"""Inspect every known 2022-26 Boxborough solar permit at record level.
Legal-company name and original attachment retrieval; no inference from dashboard blanks.
"""
import asyncio,hashlib,json,re
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright
BASE="https://boxborough.patriotpermitpro.com/"
OUT=Path("boxborough_permit_records");OUT.mkdir(exist_ok=True)
APP_IDS=["8451","8237","8236","8223","8222","8007","8006","7969","7968","7702",
"7547","7546","7431","6892","6891","6780","6779","6696","6692","6663","6662",
"6453","6284","6207","5991","5990","5880"]
CUES={"sunrun":r"sun[\s\-]*run|sunrun installation services","giga":r"giga property solutions|luiz espigar|\bgiga\b|\bespigar\b"}
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  sem=asyncio.Semaphore(4)
  findings=[]
  async def inspect(id):
   async with sem:
    context=await browser.new_context(accept_downloads=True)
    page=await context.new_page()
    url=BASE+"index.php?act=process&id="+id
    result={"id":id,"url":url,"matches":{},"pdf_links":[],"original_pdfs":[]}
    try:
     resp=await page.goto(url,wait_until="domcontentloaded",timeout=45000)
     await page.wait_for_timeout(1000)
     state=await page.evaluate("""()=>({
      title:document.title,
      text:document.body?.innerText||'',
      links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.textContent?.trim().slice(0,150)||'',title:a.title||''})),
      buttons:[...document.querySelectorAll('button')].map(b=>({text:b.textContent?.trim().slice(0,120),id:b.id||''}))
     })""")
     result["http"]=resp.status if resp else None
     result["title"]=state["title"]
     result["char_count"]=len(state["text"])
     result["text_excerpt"]=state["text"][:25000]
     result["link_count"]=len(state["links"])
     result["buttons"]=state["buttons"]
     result["links"]=state["links"][:200]
     for comp,pat in CUES.items():
      instances=[{"start":m.start(),"text":state["text"][max(0,m.start()-230):m.end()+300]} for m in re.finditer(pat,state["text"],re.I)]
      if instances: result["matches"][comp]=instances[:15]
     urls=list(dict.fromkeys(x["href"] for x in state["links"] if ".s3.amazonaws.com/" in x["href"] or re.search(r"\.pdf($|\?)",x["href"],re.I)))
     result["pdf_links"]=urls
     if result["matches"] or urls:
      print("RECORD",id,"HTTP",result["http"],"COMPANIES",list(result["matches"]),"PDF_LINKS",len(urls),"TEXT",state["text"][:240].replace("\n"," | "),flush=True)
     else:
      print("RECORD",id,"HTTP",result["http"],"NO_COMPANY_TEXT","PDF_LINKS",len(urls),"TEXT",state["text"][:180].replace("\n"," | "),flush=True)
     # Only download originals for permits with explicit Sunrun or Giga evidence.
     if result["matches"]:
      for n,link in enumerate(urls[:30]):
       try:
        response=await context.request.get(link,timeout=35000)
        data=await response.body()
        if not data.startswith(b"%PDF-"):continue
        sha=hashlib.sha256(data).hexdigest()
        path=OUT/(id+"_"+sha[:16]+".pdf")
        path.write_bytes(data)
        result["original_pdfs"].append({"filename":path.name,"sha256":sha,"bytes":len(data),"source":link})
        print("ORIGINAL_PDF",id,path.name,len(data),flush=True)
       except Exception as exc:result.setdefault("pdf_errors",[]).append(str(exc)[:150])
    except Exception as exc:
     result["error"]=repr(exc)
     print("ERROR",id,repr(exc)[:190],flush=True)
    finally:
     (OUT/(id+".json")).write_text(json.dumps(result,indent=2))
     await context.close()
    return result
  findings=await asyncio.gather(*(inspect(x) for x in APP_IDS))
  summary=[{"id":r["id"],"url":r["url"],"http":r.get("http"),"companies":list(r["matches"]),"pdf_count":len(r["pdf_links"]),"downloaded":len(r["original_pdfs"]),"error":r.get("error"),"text_excerpt":r.get("text_excerpt","")[:400]} for r in findings]
  (OUT/"SUMMARY.json").write_text(json.dumps(summary,indent=2))
  print("SUMMARY",len(summary),"SUNRUN",sum("sunrun" in s["companies"] for s in summary),"GIGA",sum("giga" in s["companies"] for s in summary),"ANY_PDF_LINKS",sum(s["pdf_count"]>0 for s in summary),"SAVED_PDFS",sum(s["downloaded"] for s in summary),flush=True)
  await browser.close()
asyncio.run(main())
