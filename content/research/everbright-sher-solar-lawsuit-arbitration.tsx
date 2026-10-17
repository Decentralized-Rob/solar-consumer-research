import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "everbright-sher-solar-lawsuit-arbitration",
  slug: "everbright-sher-solar-lawsuit-arbitration",
  href: "/research/everbright-sher-solar-lawsuit-arbitration",
  title: "EverBright Solar Lawsuit: Judge Rejects Arbitration Over Disputed 25-Year Contract",
  deck: "A homeowner disputed a 25-year EverBright solar agreement. The court examined electronic-signature records and rejected EverBright’s bid to force arbitration.",
  summary: "In Sher v. EverBright, a federal judge rejected arbitration over a disputed 25-year solar power purchase agreement after examining its DocuSign record and recurring payments. The remaining claims were not decided.",
  seoTitle: "EverBright Solar Lawsuit: Judge Denies Arbitration",
  seoDescription: "A judge denied EverBright arbitration in a lawsuit over a disputed 25-year solar PPA. See what the electronic-signature evidence showed and what the court decided.",
  socialDescription: "EverBright presented a signed 25-year solar agreement. The judge found that the homeowner had not entered it and rejected arbitration.",
  twitterDescription: "In Sher v. EverBright, a federal judge rejected arbitration over a disputed solar contract. The September 2026 order is public.",
  lede: "A California homeowner disputed a 25-year EverBright solar agreement that, according to her complaint, included rising monthly payments. EverBright presented an electronically signed contract. A federal judge found that she had not entered it and denied the company’s request for arbitration.",
  publishedAt: "October 16, 2026",
  datePublished: "2026-10-16",
  dateModified: "2026-10-16",
  stateCodes: ["CA"],
  companies: ["EverBright"],
  topics: ["EverBright solar lawsuit", "Sher v EverBright", "solar power purchase agreement", "disputed electronic signature", "arbitration", "California solar contracts"],
  section: "Short Read",
  featured: false,
} satisfies ResearchStory;

const order = "https://law.justia.com/cases/federal/district-courts/california/caedce/1:2026cv04646/492533/20/";
const pacer = "https://pacer.uscourts.gov/find-case";

export const articleConfig = {
  schemaHeadline: story.seoTitle,
  schemaDescription: story.summary,
  breadcrumbLabel: "EverBright solar lawsuit: Sher arbitration order",
  imageAlt: "SolarComplaint.com research on a September 2026 EverBright court order",
  mentions: [
    { "@type": "Organization" as const, name: "EverBright, LLC" },
    { "@type": "AdministrativeArea" as const, name: "California" },
  ],
  sources: [
    {
      name: "Sher v. EverBright, LLC, order denying motion to compel arbitration, E.D. Cal., docket 20",
      url: order,
      publisher: "U.S. District Court, Eastern District of California",
      datePublished: "2026-09-10",
    },
    {
      name: "Official federal court records access for docket 1:26-cv-04646-KES-FJS",
      url: pacer,
      publisher: "Administrative Office of the U.S. Courts",
    },
  ],
};

export function EverbrightSherLawsuitBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb">
      <Link href="/">Home</Link><Link href="/research">Research</Link><span aria-current="page">EverBright solar lawsuit</span>
    </nav>

    <section className="info-section case-notice">
      <strong>What the judge decided</strong>
      <p>On September 10, 2026, the U.S. District Court for the Eastern District of California <a href={order} target="_blank" rel="noreferrer">denied EverBright&apos;s motion to compel arbitration</a> in <em>Sher v. EverBright, LLC</em>. The judge found that Sonja Sher had not signed or entered the disputed power purchase agreement (PPA). That decision kept the case in court. It did not award damages or resolve the remaining claims.</p>
    </section>

    <section className="info-section">
      <h2>A solar agreement her family says she never saw</h2>
      <p>According to <a href={order} target="_blank" rel="noreferrer">the court&apos;s summary of her complaint</a>, a salesperson came to Sonja Sher&apos;s home in May 2023, solar panels were later installed, and she did not believe she had received contract paperwork. After her husband died, her daughter Teresa Fiss began helping with the finances and found EverBright bills. Sher sued EverBright in June 2026.</p>
      <p>The document EverBright later supplied was a purported <strong>25-year power purchase agreement</strong>. Sher&apos;s complaint alleged that monthly charges under its escalating payment terms would eventually reach <strong>$784.98</strong>. That amount is from the complaint as summarized in the order, not a court finding about payments actually made.</p>
      <p>EverBright maintained that Sher had signed the PPA. It presented a copy bearing her computer-generated signature, a DocuSign certificate dated May 26, 2023, and about two years of automatic payment records. The purported agreement contained a clause requiring arbitration of disputes.</p>
    </section>

    <section className="info-section">
      <h2>Why the electronic signature did not convince the judge</h2>
      <p>The email account on the alleged PPA and DocuSign certificate was not Sher&apos;s. The court reviewed subscriber information obtained from Google: the account&apos;s birthday and phone number did not match hers. EverBright noted that the subscriber name was listed as &ldquo;S S,&rdquo; but the court found no evidence Sher had access to or control over the email account.</p>
      <p>The order also considered evidence that Sher would have needed assistance using an electronic-signature service. EverBright provided no declaration from a salesperson or anyone who said they had dealt directly with her about this agreement.</p>
      <p>EverBright said it had a recording of a conversation with someone purporting to be Sher. It acknowledged declining to provide that recording, maintaining that it was not obliged to submit every piece of evidence supporting arbitration. The court noted that it had not been produced.</p>
      <p>EverBright also argued that recurring withdrawals showed Sher accepted the contract. The judge rejected that argument: <a href={order} target="_blank" rel="noreferrer">payments alone did not establish her consent</a> to a PPA she had not signed or received. The court denied the motion to compel arbitration and the related request to pause the lawsuit.</p>
    </section>

    <section className="info-section">
      <h2>What this EverBright ruling does and does not mean</h2>
      <p>This is a ruling about whether EverBright could require arbitration in <em>this case</em>. The court concluded Sher had not entered the PPA based on the record before it. The order does not establish that other EverBright agreements are invalid or that every allegation in Sher&apos;s complaint has been proven.</p>
      <p>The order notes that the slander-of-title claim had already been dismissed with prejudice by agreement. The court did not resolve the other claims in its arbitration ruling. As of this October 16, 2026 review, we could not independently confirm a final disposition of those remaining claims.</p>
    </section>

    <section className="info-section">
      <h2>What homeowners can check in their own records</h2>
      <p>If a solar agreement is in dispute, keep the signed proposal and final contract, electronic-signature certificate, related email records, payment history and any messages from the salesperson or finance company. These were among the types of records examined in the court&apos;s ruling. The facts and law of an individual dispute may differ.</p>
      <p>For state-specific complaint resources, see <Link href="/states/california">California solar consumer resources</Link>. For help organizing documents, see the <Link href="/guides/solar-complaint-record-checklist">solar complaint record checklist</Link>.</p>
    </section>

    <section className="info-section">
      <h2>Court record and sources</h2>
      <p><strong>September 10, 2026 court order:</strong> <a href={order} target="_blank" rel="noreferrer">Sher v. EverBright, LLC, No. 1:26-cv-04646-KES-FJS, docket 20</a>. This is a publicly accessible reproduction of the federal district court&apos;s signed order, hosted by Justia.</p>
      <p><strong>Official docket access:</strong> <a href={pacer} target="_blank" rel="noreferrer">PACER federal court record search</a>. Search the Eastern District of California using case number 1:26-cv-04646-KES-FJS. PACER registration or fees may apply.</p>
    </section>

    <section className="info-section">
      <h2>Related SolarComplaint.com research</h2>
      <p><Link href="/research/sunrun-25-year-solar-contracts">How long-term solar leases and PPAs work at another provider</Link></p>
      <p><Link href="/research">More residential solar lawsuit and contract research</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({
  story,
  config: articleConfig,
  Body: EverbrightSherLawsuitBody,
});
