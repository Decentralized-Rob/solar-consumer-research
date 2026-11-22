"""Verify actual PermitPro hostname and public dashboard before selecting a city."""
import asyncio
from playwright.async_api import async_playwright
TOWNS=["clinton","harvard","stow","maynard","hudson","ashburnham","auburn","southborough","grafton","hopedale","millbury","sutton","northbridge","oxford","leicester","mendon","westboylston","westminster","townsend","lunenburg","charlton","spencer","rutland","paxton","princeton","brookfield","eastbrookfield","westbrookfield","holland","sturbridge","dudley","shrewsbury","littleton","acton","bellingham","norfolk","franklin","randolph","upton","boxborough","northborough"]
async def main():
 async with async_playwright() as p:
  r=await p.request.new_context(ignore_https_errors=True)
  sem=asyncio.Semaphore(8)
  async def one(t):
   async with sem:
    url=f"https://{t}.patriotpermitpro.com/"
    try:
     x=await r.get(url,timeout=18000)
     html=await x.text()
     has="patriot permitpro" in html.lower() or "permitpro" in html.lower()
     marker=html.lower().find("online permitting")
     snippet=html[max(0,marker-120):marker+250] if marker>=0 else html[:180]
     print("TOWN",t,"HTTP",x.status,"PERMITPRO",has,"LEN",len(html),"URL",x.url,"SNIPPET",repr(snippet[:200]),flush=True)
    except Exception as e:
     print("FAIL",t,repr(e)[:160],flush=True)
  await asyncio.gather(*[one(t) for t in TOWNS])
  await r.dispose()
asyncio.run(main())
