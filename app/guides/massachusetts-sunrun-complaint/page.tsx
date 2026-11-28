import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const path = "/guides/massachusetts-sunrun-complaint";
const title = "Massachusetts Sunrun Complaints: How to File & What to Check";
const description = "Having a problem with Sunrun in Massachusetts? Find the Attorney General complaint process, permit and contract records, Chapter 93A and contractor resources.";
const ago = "https://www.mass.gov/how-to/file-a-consumer-complaint";
const form = "https://massago.hylandcloud.com/251Forms/forms/f6950650-b137-4630-873a-645b5bbf29a9";
const lara = "https://www.nclc.org/resources/lara-v-sunrun-inc-et-al/";
const law = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section2";
const consent = "https://malegislature.gov/Laws/GeneralLaws/PartI/TitleXX/Chapter142A/Section17";
export const metadata: Metadata = {
  title, description, alternates: { canonical: path },
  openGraph: { title, description, url: path, type: "article", images: [{url:"https://solarcomplaint.com/sunrun/og-ma-complaints.png",width:1200,height:630,alt:"Solar Consumer Research: Massachusetts Sunrun complaints"}] },
  twitter: { card: "summary_large_image", title, description, images:["https://solarcomplaint.com/sunrun/og-ma-complaints.png"] },
};

export default function MassachusettsSunrunComplaintPage() {
  const url = `https://solarcomplaint.com${path}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Article", "@id": `${url}#article`, headline: title, description, image: ["https://solarcomplaint.com/sunrun/og-ma-complaints.png"], datePublished: "2026-11-24", mainEntityOfPage: { "@id": url }, author: { "@id": "https://solarcomplaint.com/#publisher" }, publisher: { "@id": "https://solarcomplaint.com/#publisher" } },
      { "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
        { "@type": "ListItem", position: 2, name: "Sunrun lawsuits and settlements", item: "https://solarcomplaint.com/companies/sunrun" },
        { "@type": "ListItem", position: 3, name: "Massachusetts Sunrun complaints", item: url },
      ] },
    ],
  };
  return <InfoPage shareHref={path} eyebrow="Massachusetts · Sunrun consumer research" title={title} lede="If you are having a problem with Sunrun in Massachusetts, identify the contract or installation issue and gather the records that establish what happened before filing a complaint." showLegalNotice={false}>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/companies/sunrun">Sunrun lawsuits and settlements</Link><span aria-current="page">Massachusetts complaints</span></nav>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
    <p><small>Published November 24, 2026</small></p>
    <nav className="editorial-shortcuts" aria-label="Related complaint resources">
      <Link href="/research/sunrun-complaints-what-to-check">Sunrun complaints nationwide</Link>
      <Link href="/guides/massachusetts-solar-complaint">Massachusetts solar complaint filing guide</Link>
      <Link href="/states/massachusetts">Massachusetts solar consumer resources</Link>
    </nav>
    <section className="info-section case-notice">
      <h2>How to file a complaint against Sunrun in Massachusetts</h2>
      <p>Massachusetts homeowners can submit a consumer complaint to the Attorney General&apos;s Consumer Advocacy &amp; Response Division. Identify the business and the specific problem, give the relevant dates, describe attempts to resolve it and explain the outcome you are requesting.</p>
      <p><a href={form}>Open the Massachusetts Attorney General complaint form →</a> · <a href={ago}>Official filing instructions</a> · <Link href="/guides/massachusetts-solar-complaint">Step-by-step filing guide</Link>.</p>
    </section>
    <section className="info-section">
      <h2>Sunrun changed the number of panels or system design</h2>
      <p>Ask for the original signed proposal or agreement, the approved design and every subsequent plan revision. Compare the panel count, system capacity, annual production estimate and payment terms with the equipment actually installed. A building permit can establish what was submitted to the town, but it does not establish customer consent.</p>
      <p>Our Massachusetts permit investigation identified a Lancaster plan set with conflicting module counts. <Link href="/research/sunrun-solar-design-changes-change-orders">Read the municipal records, SEC findings and change-order requirements</Link>. Massachusetts <a href={law}>Chapter 142A, Section 2</a> governs written contracts for covered residential contracting work; <a href={consent}>Section 17(2)</a> addresses material departures from agreed specifications without homeowner consent.</p>
    </section>
    <section className="info-section">
      <h2>Sunrun panels are not working or the savings are lower than promised</h2>
      <p>Keep utility bills, Sunrun invoices, production records, permission-to-operate dates, service tickets and any guarantee terms. In the Massachusetts case <em>Lara v. Sunrun</em>, the homeowner alleged that a change order reduced estimated electricity coverage and that he paid while the system did not work. The <a href={lara}>National Consumer Law Center case summary</a> reports an outcome in his favor. <Link href="/research/sunrun-complaints-what-to-check">Read the documented complaint examples</Link> and <Link href="/research/sunrun-25-year-solar-contracts">check the contract and production guarantee terms</Link>.</p>
    </section>
    <section className="info-section">
      <h2>Roof damage, disputed signatures and contractor work</h2>
      <p>Request the town building and electrical permit files, including applications, uploaded contracts, homeowner authorizations, engineering plans and inspection records. If you dispute an electronic signature, request the complete executed document and signing audit trail. For roofing work, establish which company contracted for the work, who pulled the permit and what was actually approved.</p>
      <p><Link href="/companies/sunrun">Browse Sunrun lawsuits, settlements and documented consumer disputes</Link>.</p>
    </section>
    <section className="info-section">
      <h2>Can I cancel my Sunrun contract in Massachusetts?</h2>
      <p>Cancellation rights and potential remedies depend on the signed agreement, applicable law and the facts of the dispute. Massachusetts Chapter 93A provides a consumer protection demand-letter process for applicable claims. Review the <Link href="/guides/massachusetts-30-day-demand-letter">Massachusetts 30-day demand letter guide</Link> and the <Link href="/states/massachusetts">Massachusetts consumer protection and contractor resources</Link> before deciding which route fits your situation.</p>
      <p>If the concern involves ethics or misconduct, see the <Link href="/companies/sunrun/ethics-compliance">Sunrun ethics complaint and AllVoices guide</Link>. Internal reporting is separate from filing with a state agency.</p>
    </section>
    <section className="info-section">
      <h2>Need help finding public records?</h2>
      <p><Link href="/#questions">Ask SolarComplaint.com for free research assistance</Link>. Tell us the Massachusetts municipality and the document or issue you are trying to verify.</p>
    </section>
  </InfoPage>;
}
