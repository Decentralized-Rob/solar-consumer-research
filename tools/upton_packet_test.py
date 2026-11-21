import asyncio, hashlib, json, re
from pathlib import Path
from urllib.parse import urljoin
from playwright.async_api import async_playwright

OUT=Path("upton_test_packet"); OUT.mkdir(exist_ok=True)
BASE="https://upton.patriotpermitpro.com/"
TARGETS=[
 {"id":11860,"application":"25-00509","type":"Roofing / Minor Repairs","name":"Luiz Espigar","date":"2025-06-13"},
 {"id":11757,"application":"25-00417","type":"Electrical","name":"SUNRUN / Nathan Ashe","date":"2025-05-19"},
 {"id":11756,"application":"25-00416","type":"Solar","name":"SUNRUN / Marc Blanchard","date":"2025-05-19"},
 {"id":11768,"application":"25-00426","type":"Electrical","name":"Copper & Oak LLC","date":"2025-05-20"}
]
manifest=[]
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  context=await browser.new_context(accept_downloads=True)
  page=await context.new_page()
  r=await page.goto(BASE+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=25000)
  print("DASHBOARD",r.status)
  for target in TARGETS:
   idx=target["id"]
   url=f"{BASE}index.php?act=process&id={idx}"
   try:
    res=await page.goto(url,wait_until="domcontentloaded",timeout=25000)
    await page.wait_for_timeout(800)
    data=await page.evaluate("""() => ({title:document.title,url:location.href,text:document.body.innerText.slice(0,30000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,text:a.innerText,title:a.title,outer:a.outerHTML.slice(0,800)})),buttons:[...document.querySelectorAll('button')].map(b=>({text:b.innerText,outer:b.outerHTML.slice(0,450)}))})""")
    folder=OUT/target["application"];folder.mkdir(exist_ok=True)
    (folder/"record.json").write_text(json.dumps(data,indent=2))
    print("RECORD",idx,"HTTP",res.status if res else None,"URL",data["url"],"TITLE",data["title"],"TEXT",repr(data["text"][:1800]),"PDF_LINKS",json.dumps([a for a in data["links"] if "s3.amazonaws.com" in a["href"]])[:6000])
    # All links on public Documents area, including PDFs other than s3.
    links=[a["href"] for a in data["links"] if any(x in a["href"].lower() for x in ["s3.amazonaws.com",".pdf","downloadfile","uploads"])]
    print("LINK_COUNT",len(links))
    # Don't capture unrelated documents if wrong property/application.
    if not ("6 CROSS" in data["text"].upper() or target["application"] in data["text"]):
     print("RECORD_MISMATCH",idx,"NOT_DOWNLOADING")
     continue
    for link in dict.fromkeys(links):
     try:
      resp=await context.request.get(link,timeout=25000)
      b=await resp.body()
      if not b.startswith(b"%PDF-"):
       print("NOT_PDF",link,resp.status,len(b),b[:50])
       continue
      sha=hashlib.sha256(b).hexdigest()
      path=folder/f"{target['application']}_{sha[:12]}.pdf"
      path.write_bytes(b)
      ent={**target,"source_record":url,"document_url":link,"filename":str(path),"sha256":sha,"bytes":len(b),"status":resp.status,"content_type":resp.headers.get("content-type")}
      manifest.append(ent)
      print("PDF_SAVED",json.dumps(ent))
     except Exception as e:
      print("PDF_ERROR",str(e)[:280],link)
   except Exception as e: print("RECORD_ERROR",idx,str(e)[:500])
  await context.close();await browser.close()
 (OUT/"manifest.json").write_text(json.dumps(manifest,indent=2))
 print("RESULT",len(manifest),"PDFS",len(TARGETS),"RECORDS")

asyncio.run(main())
