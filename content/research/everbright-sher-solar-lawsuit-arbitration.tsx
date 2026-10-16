import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "everbright-sher-solar-lawsuit-arbitration",
  slug: "everbright-sher-solar-lawsuit-arbitration",
  href: "/research/everbright-sher-solar-lawsuit-arbitration",
  title: "EverBright Solar Lawsuit: Judge Rejects Arbitration in Disputed PPA Case",
  deck: "A California federal judge found that the homeowner did not enter the disputed solar agreement and refused to send her case to arbitration.",
  summary: "In Sher v. EverBright, a September 2026 federal court order denied EverBright's motion to compel arbitration over a disputed solar power purchase agreement. The ruling did not decide the remaining lawsuit claims.",
  seoTitle: "EverBright Solar Lawsuit: Judge Denies Arbitration",
  seoDescription: "A September 2026 court order in Sher v. EverBright rejected arbitration after a disputed solar PPA signature. Read the ruling and what it did, and did not, decide.",
  socialDescription: "EverBright produced a DocuSign solar agreement. The judge reviewed evidence that the signing email was not the homeowner's and denied arbitration.",
  twitterDescription: "In Sher v. EverBright, a federal judge rejected arbitration over a disputed solar contract. The September 2026 order is public.",
  lede: "A federal judge in California denied EverBright's request to force a solar-contract dispute into arbitration. The court found that the homeowner did not sign or enter the power purchase agreement EverBright presented.",
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
      <p>On September 10, 2026, the U.S. District Court for the Eastern District of California <a href={order} target="_blank" rel="noreferrer">denied EverBright&apos;s motion to compel arbitration</a> in <em>Sher v. EverBright, LLC</em>. The judge concluded that the homeowner had not entered into the solar power purchase agreement (PPA) presented by EverBright. The order did not award damages or resolve the remaining claims in the lawsuit.</p>
    </section>

    <section className="info-section">
      <h2>How the disputed solar agreement reached court</h2>
      <p>Sonja Sher sued EverBright in June 2026 over a residential solar PPA she said she never signed. According to the <a href={order} target="_blank" rel="noreferrer">court&apos;s summary of her complaint</a>, a salesperson visited her home in 2023, solar panels were later installed, and her family subsequently discovered EverBright payments being taken from her account.</p>
      <p>EverBright disputed her position. It submitted a PPA bearing Sher&apos;s computer-generated signature and a DocuSign certificate, and argued that recurring payments from her bank account also showed she had accepted the agreement. The PPA included an arbitration clause.</p>
    </section>

    <section className="info-section">
      <h2>Why the court rejected arbitration</h2>
      <p>The judge examined evidence about the email account listed in the purported signing records. According to the order, the email address was not Sher&apos;s, and its subscriber information did not match her personal details. EverBright did not explain those discrepancies or provide a declaration from anyone who said they dealt with Sher during the sale.</p>
      <p>The order also discussed a claimed recording of someone purporting to be Sher speaking with an EverBright representative. EverBright acknowledged declining to produce it in connection with the arbitration motion.</p>
      <p>The judge found that the payments did not establish her agreement to the PPA or its arbitration provision. The <a href={order} target="_blank" rel="noreferrer">September 10 order</a> denied both the request to compel arbitration and the related request to pause the court case.</p>
    </section>

    <section className="info-section">
      <h2>What this EverBright ruling does and does not mean</h2>
      <p>This is a ruling about whether EverBright could require arbitration in <em>this case</em>. The court concluded Sher had not entered the PPA based on the record before it. The order does not establish that other EverBright agreements are invalid or that every allegation in Sher&apos;s complaint has been proven.</p>
      <p>The court&apos;s order also notes that Sher had already agreed to dismiss her slander-of-title cause of action with prejudice. It does not establish the final outcome of the remaining claims. We have not independently verified a later case disposition.</p>
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
