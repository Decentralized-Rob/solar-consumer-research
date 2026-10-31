import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";
import { SunrunEthicsSpotlight } from "../../../components/sunrun-ethics-spotlight";

const canonicalUrl = "https://solarcomplaint.com/cases/connecticut-attorney-general-sunrun-lawsuit";
const settlementAnnouncement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const sunrunStipulation = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=33860223";
const originalComplaint = "https://portal.ct.gov/-/media/ag/press_releases/2024/2024-07-01-sunrun-complaint.pdf";
const connecticutPublic = "https://www.ctpublic.org/news/2024-07-19/ct-attorney-general-files-lawsuit-against-sunrun-alleging-deceptive-and-unlawful-sales-tactics";
const attorneyGeneralComplaints = "https://ct.gov/agcomplaints";
const dcpComplaints = "https://portal.ct.gov/DCP/Complaint-Center/Consumers---Complaint-Center";

export const metadata: Metadata = {
  title: "Connecticut Sunrun Settlement: Fraud Claims and Consumer Relief",
  description: "Connecticut's Sunrun settlement follows allegations of forged solar leases and a disputed verification call. Read the court records, new safeguards and consumer remedies.",
  keywords: [
    "Connecticut Sunrun settlement",
    "Sunrun Connecticut lawsuit",
    "Sunrun forged signature",
    "Sunrun contract cancellation Connecticut",
    "Sunrun fraud claim",
    "Bright Planet Solar lawsuit",
    "Elevate Solar Solutions settlement",
  ],
  alternates: { canonical: "/cases/connecticut-attorney-general-sunrun-lawsuit" },
  openGraph: {
    title: "Sunrun Connecticut Settlement: The Rejected Lease",
    description: "A disputed signature, a recorded verification call and 36 solar panels. What Connecticut's Sunrun settlement requires and how affected homeowners can seek relief.",
    url: "/cases/connecticut-attorney-general-sunrun-lawsuit",
    type: "article",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "SolarComplaint.com residential solar investigations" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Connecticut Settlement: The Rejected Lease",
    description: "A disputed signature, a verification call and 36 panels. Connecticut's settlement details and homeowner remedies.",
    images: ["/og.png"],
  },
};

export default function ConnecticutSunrunCasePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "Connecticut Sunrun Settlement: The Rejected Lease, the Verification Call and the Path to Consumer Relief",
    description: "An examination of Connecticut's original solar sales complaint and the October 2026 Sunrun settlement, based on the court record and the Attorney General's announcement.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    mainEntityOfPage: canonicalUrl,
    author: { "@type": "Organization", name: "Jules Young", url: "https://solarcomplaint.com/authors/jules-young" },
    publisher: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com" },
    isAccessibleForFree: true,
    image: "https://solarcomplaint.com/og.png",
    about: [
      { "@type": "Organization", name: "Sunrun" },
      { "@type": "Organization", name: "Bright Planet Solar" },
      { "@type": "Organization", name: "Elevate Solar Solutions" },
      { "@type": "AdministrativeArea", name: "Connecticut" },
    ],
    citation: [originalComplaint, sunrunStipulation, settlementAnnouncement],
    relatedLink: [
      "https://solarcomplaint.com/states/connecticut",
      "https://solarcomplaint.com/companies/sunrun",
      "https://solarcomplaint.com/companies/sunrun/ethics-compliance",
      "https://solarcomplaint.com/research/sunrun-25-year-solar-contracts",
    ],
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
      { "@type": "ListItem", position: 2, name: "Sunrun research", item: "https://solarcomplaint.com/companies/sunrun" },
      { "@type": "ListItem", position: 3, name: "Connecticut Sunrun settlement", item: canonicalUrl },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <InfoPage
        eyebrow="Connecticut enforcement · October 31, 2026"
        title="Connecticut Sunrun Settlement: The Rejected Lease, the Verification Call and the Path to Consumer Relief"
        lede="A Connecticut homeowner turned down a 25-year Sunrun solar lease that would have cost her $306.98 a month. Her father rejected the same offer."
      >
        <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link> · October 31, 2026</p>

        <section className="info-section">
          <p>According to a lawsuit filed by Connecticut Attorney General William Tong, the contract was signed electronically anyway. Her first and last names were reversed, as were her initials.</p>
          <p>Then came a recorded verification call to Sunrun. The person claiming to be the homeowner had a deep male voice, the state alleged. The caller also reversed the homeowner&apos;s name and agreed to the same contract terms she had already rejected.</p>
          <p>A few weeks later, 36 solar panels were installed on her roof.</p>
          <p>That account is part of the <a href={originalComplaint} target="_blank" rel="noreferrer">26-page complaint Connecticut filed against Sunrun and several solar sales businesses in July 2024</a>. It raises a question about a basic safeguard in residential solar sales: What happens when the call intended to verify a customer&apos;s consent becomes part of the alleged deception?</p>
          <p>On October 23, 2026, Tong <a href={settlementAnnouncement} target="_blank" rel="noreferrer">announced settlements</a> with Sunrun, Elevate Solar Solutions and two salespeople. Sunrun agreed to pay Connecticut $300,000, change its sales verification procedures and investigate complaints involving fraudulent contracts.</p>
          <p>The agreement also opens a path to compensation, contract cancellation and solar panel removal for affected Connecticut customers.</p>
          <p>The financial penalty made the headlines. The more consequential provisions are in the <a href={sunrunStipulation} target="_blank" rel="noreferrer">court documents</a>.</p>
        </section>

        <section className="info-section">
          <h2>Three homes and a lawsuit over consent</h2>
          <p>The Windsor homeowner&apos;s experience is the most striking account in Connecticut&apos;s original complaint.</p>
          <p>The state alleged that Bright Planet Solar employee Sierra Howes approached the homeowner in August 2023 with the Sunrun lease offer. After she declined, Dakota Grumet approached her father in October. He also declined.</p>
          <p>A lease dated August 14 nevertheless carried an electronic signature bearing the homeowner&apos;s name.</p>
          <p>The complaint describes a verification call in which the Sunrun representative asked the salesperson to identify herself. The recorded response was Sierra Ford, another name used by Howes. The representative then requested to speak with the customer.</p>
          <p>According to the complaint, the person put on the telephone agreed to a 25-year contract with a $306.98 monthly payment and a 2.99% annual increase.</p>
          <p>On October 9, 2023, a 14.22-kilowatt solar system was installed. The state alleged that the homeowner received the disputed contract only afterward and that Sunrun refused subsequent requests to terminate the lease and remove the panels.</p>
          <p>The complaint described similar problems at two other Connecticut properties.</p>
          <p>In Stafford Springs, a homeowner was offered a 25-year lease costing $314 per month during a Zoom sales presentation. The state alleged that the salespeople failed to explain a 2.9% annual payment increase. Over the life of the agreement, the payments would total $135,693, according to the complaint.</p>
          <p>Although the homeowner verbally accepted the offer, Connecticut alleged that an electronic signature was applied without her signing or reviewing the contract.</p>
          <p>The system was installed in December 2022. The building permit was approved June 6, 2023, more than six months later. The complaint stated that the system had not been activated.</p>
          <p>In Wethersfield, another homeowner agreed to a solar lease but allegedly never received a contract copy. The panels were installed before the electrical permit was approved, and the system was still inactive when the state filed suit.</p>
          <p>These transactions placed contract execution, customer verification, permitting and installation practices under scrutiny. They also raised questions about the companies involved in selling Sunrun&apos;s products.</p>
          <p>Connecticut named Sunrun Inc., Sunrun Installation Services Inc., Bright Planet Solar Inc., Elevate Solar Solutions LLC, Grumet and Howes as defendants. The complaint alleged that the sales businesses worked together to market and sell Sunrun systems and that the individual salespeople lacked required home improvement salesperson registrations.</p>
          <p>In July 2024, <a href={connecticutPublic} target="_blank" rel="noreferrer">Connecticut Public reported</a> that Sunrun said the sales representatives and installation crews involved were not its employees and had failed to meet company expectations.</p>
          <p>The distinction matters because the homeowner&apos;s long-term agreement was with Sunrun, even when another business handled the sale.</p>
        </section>

        <section className="info-section">
          <h2>What Sunrun agreed to change</h2>
          <p>The October 2026 settlement addresses that sales process directly.</p>
          <p>Under the <a href={sunrunStipulation} target="_blank" rel="noreferrer">Sunrun stipulated judgment filed in Hartford Superior Court</a>, the company must strengthen the procedures used to verify customers before installation work begins.</p>
          <p>Those requirements include identity checks using photographic or live-video evidence, or another method approved by the Attorney General. The agreement also calls for salesperson training, auditing and monitoring for suspicious patterns, including identifiers reused across transactions.</p>
          <p>Salespeople cannot obtain electronic signatures on their own devices unless customers have first received unsigned copies of their contracts and a reasonable opportunity to review them.</p>
          <p>The agreement establishes a consumer complaint process that requires Sunrun to investigate disputed contract authenticity using available records. Those records can include electronic signature histories, IP addresses, timestamps, recorded verification calls and sales documentation.</p>
          <p>Sunrun must provide a contact person and respond to complaints within the specified deadlines. The process calls for a written determination within 60 days, with written updates when an investigation remains unresolved. The stipulated terms set an outside resolution period of 120 days.</p>
          <p>Where a complaint is substantiated, the company must offer applicable relief. A customer who keeps the system may receive cash compensation, account credits or reduced payments. Cancellation and system removal are also available remedies.</p>
          <p>If Sunrun removes equipment, it must repair physical damage resulting from installation or removal and make affected roof and exterior penetrations watertight.</p>
          <p>The settlement further provides for an independent arbitrator, approved by the Attorney General, when a consumer disputes the resolution. Sunrun pays the arbitrator&apos;s cost.</p>
          <p>The Attorney General&apos;s office says there is no cap on the restitution Sunrun may be required to provide.</p>
          <p>That is separate from the $300,000 Sunrun agreed to pay Connecticut. The state payment is directed toward consumer protection and enforcement purposes rather than being divided among homeowners as a fixed compensation fund.</p>
          <p>Another important provision concerns customers who were never given a copy of their solar agreement.</p>
          <p>Under paragraph 9 of the stipulation, Sunrun can use records such as email, text messages or customer-portal access to establish that a contract was delivered. When the company cannot establish delivery, the agreement provides a cancellation right tied to the date the contract is supplied and the judgment&apos;s effective date.</p>
          <p>The judgment&apos;s entry date controls certain deadlines, so the timing matters for affected homeowners.</p>
        </section>

        <section className="info-section">
          <h2>The sales network remains part of the story</h2>
          <p>Sunrun&apos;s obligation to notify customers extends beyond the people named in the original announcement.</p>
          <p>Paragraph 13 of the <a href={sunrunStipulation} target="_blank" rel="noreferrer">filed stipulation</a> identifies customers who obtained solar systems through Elevate, Grumet, Howes and additional sales channels. It names C&amp;D Marketing Services LLC, doing business as A&amp;D Solar, and Andrew Grose.</p>
          <p>The agreement requires notice to Connecticut customers who may have been affected by the conduct covered by its provisions. It also contains an exception for customers who previously released relevant claims, including through earlier settlements.</p>
          <p>That exception could affect which homeowners receive direct notification.</p>
          <p>The agreement imposes separate consequences on Elevate and the two salespeople.</p>
          <p>Elevate must dissolve. The three defendants face a combined $200,000 penalty, with $100,000 suspended subject to compliance.</p>
          <p>Grumet faces a ten-year restriction on owning a business engaged in home solicitation sales and must operate under company supervision. Howes must surrender her home improvement salesperson registrations and cannot seek new ones for ten years.</p>
          <p>Sunrun and the settling sales defendants did not admit liability.</p>
          <p>One defendant remains outside the announced resolution. Connecticut says its lawsuit against Bright Planet Solar is still pending.</p>
        </section>

        <section className="info-section">
          <h2>The settlement now faces its real test</h2>
          <p>A settlement can establish requirements. Its effectiveness depends on what happens when customers use them.</p>
          <p>Sunrun must now review claims involving allegedly fraudulent solar contracts, examine the underlying records and make decisions that may carry substantial financial consequences.</p>
          <p>The state has not disclosed how many Connecticut customers will receive notices, how many claims may be substantiated or how many contracts could ultimately be cancelled.</p>
          <p>The filed agreement also leaves Sunrun responsible for conducting the initial investigations. Customers who dispute the outcome have access to the independent arbitration process established in the settlement.</p>
          <p>Connecticut officials have said they intend to monitor Sunrun&apos;s compliance.</p>
          <p>For homeowners who believe they were placed into a contract without their consent, the Attorney General has identified a direct complaint address: <a href="mailto:CTSupport@sunrun.com">CTSupport@sunrun.com</a>. Connecticut consumers can also contact the <a href={attorneyGeneralComplaints} target="_blank" rel="noreferrer">Attorney General&apos;s Office</a> or the <a href={dcpComplaints} target="_blank" rel="noreferrer">Department of Consumer Protection</a>.</p>
          <p>The Windsor allegations demonstrate why the underlying records matter. An electronic signature appeared on a contract the customer had rejected. A verification call then appeared to confirm that same agreement. The system was installed before the homeowner received the contract, according to the state.</p>
          <p>Connecticut&apos;s settlement puts those procedures under new requirements through December 31, 2031.</p>
          <p>The unanswered question is how many other customers experienced similar problems and whether the new process will deliver the relief the state has secured.</p>
          <p>For the homeowners involved, that answer will matter considerably more than the $300,000 penalty.</p>
        </section>

        <SunrunEthicsSpotlight context="Related Sunrun reporting guide" />

        <section className="info-section">
          <h2>Primary documents</h2>
          <p><a href={originalComplaint} target="_blank" rel="noreferrer">Connecticut&apos;s July 2024 complaint</a>; <a href={sunrunStipulation} target="_blank" rel="noreferrer">October 2026 Sunrun stipulated judgment</a>; <a href={settlementAnnouncement} target="_blank" rel="noreferrer">Connecticut Attorney General&apos;s settlement announcement, October 23, 2026</a>.</p>
        </section>

        <section className="info-section">
          <h2>Related SolarComplaint.com research</h2>
          <p><Link href="/states/connecticut">Connecticut solar complaints and regulatory resources</Link></p>
          <p><Link href="/companies/sunrun">Sunrun investigations, lawsuits and settlements</Link></p>
          <p><Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s 25-year contracts and homeowner obligations</Link></p>
          <p><Link href="/research/sunrun-mishler-roofing-lawsuit">Mishler v. Sunrun: a separate Connecticut roofing case</Link></p>
          <p><Link href="/companies/sunrun/ethics-compliance">Sunrun ethics and compliance reporting resources</Link></p>
        </section>
      </InfoPage>
    </>
  );
}
