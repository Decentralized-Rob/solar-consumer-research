"""Find public Sunrun PPAs in existing PermitPro 2025 permit indexes without reexporting them.
Read existing GitHub Actions artifact CSVs; inspect candidate permit attachments in situ.
Discard unrelated documents. Only document URL references and counts enter the artifact.
"""
import asyncio, csv, io, json, os, re, zipfile, hashlib, time, collections
from pathlib import Path
from urllib.parse import urljoin
import requests, fitz
from playwright.async_api import async_playwright

OUT=Path("permitpro_ppa_results");OUT.mkdir(exist_ok=True)
REPO="Decentralized-Rob/solar-consumer-research"
ARTIFACTS=[(14704940384,["westborough","lancaster"]),(14704244142,["upton","brimfield"])]
TOWNS=["lancaster","upton","westborough","brimfield"]
PPA_PATTERNS=[
 ("ppa",re.compile(r"\bpower\s+purchase\s+agreement\b|\bsolar\s+power\s+purchase\s+agreement\b",re.I)),
 ("ppa_acronym",re.compile(r"\bPPA\b",re.I)),
 ("sunrun_customer_agreement",re.compile(r"\bsunrun\b.{0,100}\bcustomer\s+agreement\b|\bcustomer\s+agreement\b.{0,100}\bsunrun\b",re.I|re.S)),
 ("cap",re.compile(r"\bCAP_PACKAGE\b|\bcustomer\s+acceptance\s+package\b|\bcustomer\s+acceptance\s+form\b",re.I)),
 ("docusign",re.compile(r"docusign\s+envelope\s+id|certificate\s+of\s+completion",re.I)),
]
EMAIL_RE=re.compile(r"lucas[\.\s_-]*oliveira\s*@\s*sunrun\.com|lucas\s+(?:de\s*)?oliveira",re.I)
BUDGET_PDFS=600
BUDGET_BYTES=400_000_000
manifest=[]
records=[]
stats=collections.Counter()
seen_urls=set()
total_bytes=0

def artifact_zip(artifact_id):
 url=f"https://api.github.com/repos/{REPO}/actions/artifacts/{artifact_id}/zip"
 headers={"Accept":"application/vnd.github+json"}
 token=os.getenv("GH_READ_TOKEN")
 if token:headers["Authorization"]="Bearer "+token
 r=requests.get(url,headers=headers,timeout=50)
 print("ARTIFACT",artifact_id,r.status_code,len(r.content),flush=True)
 r.raise_for_status()
 return zipfile.ZipFile(io.BytesIO(r.content))

def source_rows():
 allrows={}
 for aid, towns in ARTIFACTS:
  with artifact_zip(aid) as z:
   names=z.namelist()
   for town in towns:
    name=next((n for n in names if n.endswith(f"{town}/applications.csv") or n==f"{town}/applications.csv"),None)
    if not name:
     print("MISSING_CSV",town,flush=True);continue
    with z.open(name) as f:
     rows=list(csv.DictReader(io.TextIOWrapper(f,encoding="utf-8-sig",errors="replace")))
    allrows[town]=[x for x in rows if x.get("Application Date","").startswith("2025") and "sunrun" in " ".join(str(x.get(k,"")) for k in x.keys() if k and k.lower() in ("applicant name","applicantname","applicant company","applicantcompany","contractor company","contractorcompany","contractor name","contractorname")).lower()]
    print("INDEX",town,len(rows),"SUNRUN_2025",len(allrows[town]),flush=True)
 return allrows

def normalized(s):return re.sub(r"[^a-z0-9]+"," ",s.lower()).strip()

def likely_ppa(raw):
 try:
  doc=fitz.open(stream=raw,filetype="pdf")
  pages=len(doc)
  txt="\n".join(doc[i].get_text(sort=False) for i in range(min(pages,55)))
  results=[n for n,pat in PPA_PATTERNS if pat.search(txt)]
  lucas=bool(EMAIL_RE.search(txt))
  return pages,len(txt),results,lucas,txt[:180]
 except Exception as e:
  return 0,0,[],False,"EXTRACT_ERROR "+str(e)[:140]

async def inspect_attachment(context,town,app,address,record_url,link,label):
 global total_bytes
 if link in seen_urls:return
 if len(seen_urls)>=BUDGET_PDFS or total_bytes>=BUDGET_BYTES:return
 seen_urls.add(link)
 try:
  resp=await context.request.get(link,timeout=22000)
  b=await resp.body()
  if not b.startswith(b"%PDF-"):
   stats["non_pdf"]+=1
   return
  total_bytes+=len(b)
  pages,chars,matches,lucas,head=likely_ppa(b)
  stats["pdf_scanned"]+=1
  if chars<35 and pages>=3:
   stats["scanned_image_only"]+=1
   # Avoid OCR of every scanned image; report likely agreement labels for future targeted followup.
   if re.search(r"customer|agreement|contract|other|ppa|cap|docusign",label,re.I):
    stats["image_candidate"]+=1
    manifest.append({"status":"IMAGE_ONLY_CANDIDATE","town":town,"application":app,"address":address,"record":record_url,"url":link,"label":label,"pages":pages,"bytes":len(b)})
  relevant=bool("ppa" in matches or "sunrun_customer_agreement" in matches or "cap" in matches)
  if relevant or (lucas and pages>2):
   entry={"status":"PPA_OR_CAP_MATCH" if relevant else "LUCAS_MATCH","town":town,"application":app,"address":address,"record":record_url,"url":link,"label":label,"pages":pages,"bytes":len(b),"sha256":hashlib.sha256(b).hexdigest(),"flags":matches,"lucas":lucas}
   manifest.append(entry)
   print("DOCUMENT_MATCH",json.dumps(entry),flush=True)
  if stats["pdf_scanned"]%40==0:
   print("PROGRESS",stats["pdf_scanned"],"PPA",sum(x["status"]=="PPA_OR_CAP_MATCH" for x in manifest),"bytes",total_bytes,flush=True)
 except Exception as exc:
  stats["pdf_error"]+=1
  print("FILE_ERROR",town,app,str(exc)[:120],flush=True)

async def collect_town(browser,town,rows):
 context=await browser.new_context(accept_downloads=False)
 page=await context.new_page()
 base=f"https://{town}.patriotpermitpro.com/"
 byaddr=collections.defaultdict(list)
 for x in rows:byaddr[normalized(x.get("Address",""))].append(x)
 # Giga-first known overlaps, then other addresses
 addresses=sorted(byaddr,key=lambda x: (not ("20 poulin" in x or "6 cross" in x),x))
 for ix,address in enumerate(addresses):
  if len(seen_urls)>=BUDGET_PDFS or total_bytes>=BUDGET_BYTES:break
  sub=byaddr[address]
  search=" ".join(sub[0].get("Address","").upper().split()[:2])
  try:
   resp=await page.goto(base+"index.php?act=dashboard",wait_until="domcontentloaded",timeout=27000)
   await page.locator("#filterWhat").select_option("address",timeout=10000)
   await page.locator("#filterOperator").select_option("contains")
   await page.locator("input.filterWhere:visible").first.fill(search)
   await page.locator("#filterShow").click()
   await page.wait_for_timeout(550)
   matched=await page.locator("tr").evaluate_all("""els=>els.map(tr=>({text:tr.innerText,hrefs:[...tr.querySelectorAll('a[href]')].map(a=>a.getAttribute('href'))})).filter(x=>x.hrefs.some(h=>h&&h.includes('act=process')))""")
   targets={str(x.get("Application ID","")).strip():x for x in sub}
   linked={}
   for row in matched:
    for app in targets:
     if app and app in row["text"]:
      href=next((h for h in row["hrefs"] if "act=process" in h),None)
      if href:linked[app]=urljoin(base,href)
   stats["properties_checked"]+=1
   if ix%8==0:print("TOWN_PROGRESS",town,ix,len(addresses),"FOUND_RECORDS",len(linked),"PDFS",stats["pdf_scanned"],flush=True)
   for app,url in linked.items():
    try:
     record_resp=await page.goto(url,wait_until="domcontentloaded",timeout=22000)
     details=await page.evaluate("""()=>({text:document.body.innerText.slice(0,11000),links:[...document.querySelectorAll('a[href]')].map(a=>({href:a.href,label:a.closest('tr')?.innerText.slice(0,100)||a.innerText.slice(0,100)}))})""")
     if app not in details["text"] or normalized(sub[0]["Address"]).split()[:1] != normalized(details["text"].split("Address:")[-1]).split()[:1]:
      # Application ID is stronger identity test; address check via street number in record's Address section.
      if app not in details["text"]:
       stats["record_id_mismatch"]+=1;continue
     links=list({a["href"]:a for a in details["links"] if ".s3.amazonaws.com/" in a["href"] and a["href"].lower().split("?")[0].endswith(".pdf")}.values())
     # Only read upload PDFs associated with matching permits; anything labelled Other goes first.
     links.sort(key=lambda a: (0 if re.search(r"other|agreement|contract|customer|solar application",a["label"],re.I) else 1))
     records.append({"town":town,"application":app,"address":sub[0]["Address"],"record":url,"pdf_links":len(links),"labels":[x["label"][:70] for x in links]})
     stats["records_checked"]+=1
     for a in links:
      await inspect_attachment(context,town,app,sub[0]["Address"],url,a["href"],a["label"])
    except Exception as e:
     stats["record_errors"]+=1;print("RECORD_ERROR",town,app,str(e)[:120],flush=True)
  except Exception as e:
   stats["property_errors"]+=1;print("PROPERTY_ERROR",town,search,str(e)[:130],flush=True)
 await context.close()
 print("TOWN_DONE",town,len(addresses),"SCANNED",stats["pdf_scanned"],"MATCHES",len(manifest),flush=True)

async def main():
 try:townrows=source_rows()
 except Exception as e:
  print("FATAL_SOURCE",str(e),flush=True)
  return
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True)
  for town in TOWNS:
   if town not in townrows:continue
   await collect_town(browser,town,townrows[town])
  await browser.close()
 out={"stats":dict(stats),"matched_documents":manifest,"record_inventory":records,"total_pdf_bytes":total_bytes}
 (OUT/"results.json").write_text(json.dumps(out,indent=2))
 (OUT/"match_links.txt").write_text("\n".join(x["url"] for x in manifest if x["status"]=="PPA_OR_CAP_MATCH"))
 print("FINAL",json.dumps({"stats":dict(stats),"matches":len(manifest),"ppa_cap":sum(x["status"]=="PPA_OR_CAP_MATCH" for x in manifest),"bytes":total_bytes}),flush=True)

if __name__=="__main__":asyncio.run(main())
