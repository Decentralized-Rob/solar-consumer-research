import type { Metadata } from "next";
import Link from "next/link";

const canonicalUrl = "https://solarcomplaint.com/goodleap";
const reviewedDate = "2026-09-16";
export const metadata: Metadata = { title: "GoodLeap Solar Financing: Lawsuits & Consumer Research", description: "GoodLeap solar financing research based on court records, Attorney General actions, arbitration rulings, and official consumer resources.", alternates: { canonical: "/goodleap" }, openGraph: { title: "GoodLeap Solar Financing: What the Public Record Shows", description: "Independent research on GoodLeap solar financing using court records, government filings, and primary sources.", url: "/goodleap", type: "website" } };

const publishedStates=[
 {abbr:"MN",state:"Minnesota",detail:"The Attorney General sued GoodLeap and three other solar lenders over alleged hidden dealer fees in financed solar transactions.",href:"/goodleap/states/minnesota",stateHref:"/states/minnesota"},
 {abbr:"VA",state:"Virginia",detail:"A 2026 Attorney General case names GoodLeap among lenders connected to the Power Home Solar / Pink Energy record.",href:"/goodleap/states/virginia",stateHref:"/states/virginia"},
] as const;

export default function GoodLeapHubPage(){
 const structuredData={"@context":"https://schema.org","@type":"CollectionPage","@id":`${canonicalUrl}#page`,name:"GoodLeap Solar Financing: What the Public Record Shows",description:"Independent research on GoodLeap solar financing using court records, government filings, and primary sources.",url:canonicalUrl,dateModified:reviewedDate,isPartOf:{"@id":"https://solarcomplaint.com/#website"},publisher:{"@id":"https://solarcomplaint.com/#publisher"},about:{"@type":"Organization",name:"GoodLeap, LLC",alternateName:"Loanpal",sameAs:"https://www.goodleap.com/"}};
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData)}}/><main className="gl-main"><div className="gl-page">
  <p className="gl-eyebrow">GoodLeap research</p><h1>GoodLeap solar financing: what the public record shows</h1>
  <p className="gl-deck">GoodLeap, formerly Loanpal, appears in solar-financing lawsuits, Attorney General cases, and arbitration disputes around the country. This hub organizes the strongest records by state and separates allegations from court rulings.</p>
  <div className="gl-review-line"><time dateTime={reviewedDate}>Reviewed September 16, 2026</time><span>·</span><Link href="/methodology">How we verify records</Link><span>·</span><Link href="/corrections">Corrections</Link></div>
  <div className="gl-actions"><Link className="gl-button gl-button-primary" href="/#questions">Get free research assistance</Link><Link className="gl-button" href="/goodleap/states">Browse GoodLeap research by state</Link></div>
  <div className="gl-summary"><p>The September source refresh adds newer court developments to the review queue while keeping the public state pages limited to records that have been fully sourced and organized.</p><div className="gl-number-line"><span><strong>9</strong> states under focused review</span><span><strong>2</strong> full GoodLeap state pages published</span></div></div>

  <section className="gl-section"><h2>Published state research</h2><div className="gl-published-list">{publishedStates.map(item=><article className="gl-published-item" key={item.abbr}><span className="gl-state-abbr">{item.abbr}</span><div><h3>{item.state}</h3><p>{item.detail}</p><Link href={item.href}>Read the GoodLeap research →</Link><br/><Link href={item.stateHref}>Open all {item.state} solar resources →</Link></div></article>)}</div></section>

  <section className="gl-section"><h2>Fresh court records worth tracking</h2><p><strong>Maryland:</strong> an August 2026 federal ruling in <em>Arias v. GoodLeap</em> denied GoodLeap&apos;s motion to dismiss and compel arbitration. The ruling concerns contract formation and arbitration, not the merits of the underlying consumer claims. <Link className="gl-text-link" href="/states/maryland">Maryland solar resources →</Link></p><p><strong>Texas:</strong> active 2026 litigation includes <em>Quayle v. Arizona Solar Solutions</em>, where GoodLeap moved to dismiss and compel arbitration. A separate official federal record in <em>Lopez</em> also addresses disputed formation of a GoodLeap solar loan agreement. <Link className="gl-text-link" href="/states/texas">Texas solar resources →</Link></p><p><strong>Florida:</strong> GoodLeap filed a 2026 case against Solar Cancellation Resource Center and Consumer Advocacy Law Group. That is a separate research category from homeowner claims against GoodLeap. <Link className="gl-text-link" href="/states/florida">Florida solar resources →</Link></p></section>

  <section className="gl-section"><h2>Where installer failure overlaps financing</h2><p>Some GoodLeap disputes sit next to records involving failed solar installers. The site keeps the lender record and installer record distinct, then links them where the same transaction or litigation makes the overlap useful.</p><p><Link className="gl-text-link" href="/cases/titan-solar-power">Titan Solar Power closure and bankruptcy research →</Link><br/><Link className="gl-text-link" href="/research">Browse all SolarComplaint.com research →</Link></p></section>

  <section className="gl-section"><h2>What FLAG means here</h2><p><strong>FLAG</strong> is shorthand for <strong>Financing Litigation &amp; Arbitration involving GoodLeap</strong>. It is an editorial research label, not a legal finding. <Link className="gl-text-link" href="/goodleap/states">See the state tracker →</Link></p></section>

  <section className="gl-help-box"><h2>Have a GoodLeap solar financing issue?</h2><p>Send your state, city or town, and a short description. We will look for public records, regulators, complaint channels, and other source-backed information.</p><div className="gl-actions"><Link className="gl-button gl-button-primary" href="/#questions">Request free research assistance</Link><Link className="gl-button" href="/goodleap/resources">Official consumer resources</Link></div></section>
 </div></main></>;
}
