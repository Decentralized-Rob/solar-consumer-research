"""Inspect public West Boylston PermitLink company search without guessing matches."""
import asyncio
import json
from pathlib import Path
from playwright.async_api import async_playwright

ROOT = Path("permitlink_westboylston_index")
ROOT.mkdir(exist_ok=True)
URL = "https://permitlinkusa-online.com/csp/westboylstonma/DocumentLink.PublicPermitListCenter.cls"

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        ctx = await browser.new_context()
        page = await ctx.new_page()
        print("GET:", URL, flush=True)
        r = await page.goto(URL,wait_until="domcontentloaded",timeout=60000)
        print("STATUS",r.status if r else "none",flush=True)
        await page.wait_for_timeout(2000)
        (ROOT/"list.html").write_text(await page.content())
        await page.screenshot(path=str(ROOT/"list.png"),full_page=True)
        data = await page.evaluate("""() => {
          const componentIds=['table','search','searchText','txtSearch','myPermitList','FormData'];
          let components={};
          for(let id of componentIds){
            try {
              let c=zenPage.getComponentById(id);
              if(c) {
                let o={type:c.constructor.name};
                for(const prop of ['rowCount','selectedIndex','pageSize','pageCount','currentPage','data','totalRows','filter','filterString','key']) {
                  try {o[prop]=c.getProperty(prop)} catch(e) {}
                }
                try {o.previewRows=[0,1,2,3,4].map(i=>c.getRowData(i))}catch(e){}
                components[id]=o;
              }
            } catch(e) {components[id]={error:String(e)}}
          }
          return {
            url:location.href,title:document.title,
            buttons:[...document.querySelectorAll('button,input[type=button],input[type=submit],a[onclick]')].map(el=>({tag:el.tagName,id:el.id,value:el.value,text:(el.innerText||'').trim().slice(0,100),title:el.title,onclick:(el.getAttribute('onclick')||'').slice(0,300),visible:!!el.getClientRects().length})),
            inputs:[...document.querySelectorAll('input,select,textarea')].map(el=>({tag:el.tagName,id:el.id,name:el.name,type:el.type,value:el.value,placeholder:el.placeholder,outer:el.outerHTML.slice(0,350),visible:!!el.getClientRects().length})),
            forms:[...document.forms].map(f=>({id:f.id,name:f.name,action:f.action})),
            tables:[...document.querySelectorAll('table')].map(x=>({id:x.id,rows:x.rows.length,html:x.outerHTML.slice(0,1000)})),
            components,
            text:document.body.innerText.slice(0,9000)
          }
        }""")
        (ROOT/"list_structure.json").write_text(json.dumps(data,indent=2,default=str))
        allrows = await page.evaluate("""() => {
            const t = zenPage.getComponentById('table');
            const total = Number(t.getProperty('rowCount')) || 0;
            return Array.from({length: total},(_,i)=>t.getRowData(i));
        }""")
        (ROOT/"all_permits.json").write_text(json.dumps(allrows,indent=2,default=str))
        filters = {}
        for term in ("giga","sunrun","solar","photovoltaic","pv","roof","panel","tesla","battery","sunlight","sunpower"):
            filters[term] = [r for r in allrows if term in (str(r.get("WorkDescription",""))+" "+str(r.get("PermitType",""))+" "+str(r.get("Owner",""))).lower()]
        (ROOT/"matches.json").write_text(json.dumps(filters,indent=2,default=str))
        print("INDEX RECORDS:",len(allrows),"MATCH COUNTS:",{k:len(v) for k,v in filters.items()},flush=True)
        for term in ("giga","sunrun","solar","photovoltaic","panel"):
            print("MATCH",term, json.dumps(filters[term],default=str)[:7500],flush=True)
        print("COMPONENTS",json.dumps(data["components"],default=str)[:3500],flush=True)
        print("BUTTONS",json.dumps([x for x in data["buttons"] if x["visible"]],default=str)[:3500],flush=True)
        print("INPUTS",json.dumps([x for x in data["inputs"] if x["visible"]],default=str)[:6000],flush=True)
        print("TABLES",[(x["id"],x["rows"]) for x in data["tables"]],flush=True)
        await browser.close()

asyncio.run(main())
