import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../../components/info-page";
import styles from "./sunrun-ethics.module.css";

const canonicalUrl = "https://solarcomplaint.com/companies/sunrun/ethics-compliance";
const governanceUrl = "https://investors.sunrun.com/leadership-governance/governance-documents";
const leadershipUrl = "https://investors.sunrun.com/leadership-governance/executive-management";
const codeUrl = "https://d1io3yog0oux5.cloudfront.net/_5069419c6c0a7a5b730d48e3b1411191/sunrun/db/405/3799/file/Code%2Bof%2BBusiness%2BConduct%2B%26%2BEthics_Oct_2025.pdf";
const whistleblowerUrl = "https://d1io3yog0oux5.cloudfront.net/_c1eacf661f8f940cb0d1529a22a7aa53/sunrun/db/405/3801/file/Whistleblower%2BPolicy_Oct_2025.pdf";
const vendorCodeUrl = "https://d1io3yog0oux5.cloudfront.net/_c9159127ad06b657d37a299d3e74348a/sunrun/db/405/3803/file/6.25_Vendor%2BCode%2BOf%2BConduct_v2.pdf";
const allVoicesUrl = "https://sunrun.allvoices.co/";
const ethicsHotline = "866-602-6613";
const ethicsLinkedInPost = "https://www.linkedin.com/posts/sunrun_at-sunrun-were-committed-to-upholding-the-activity-7251577600949522435-tGOM";

export const metadata: Metadata = {
  title: "Sunrun Ethics Complaint: AllVoices, Code of Conduct & Escalation Guide",
  description:
    "Current Sunrun ethics complaint resources: AllVoices reporting, ethics hotline, Code of Business Conduct, Vendor Code, leadership roles, and consumer escalation paths.",
  keywords: [
    "Sunrun ethics complaint",
    "Sunrun compliance complaint",
    "Sunrun AllVoices",
    "Sunrun ethics hotline",
    "Sunrun code of conduct",
    "Sunrun vendor code of conduct",
    "Sunrun employee complaint",
    "Sunrun sales rep complaint",
    "Sunrun representative complaint",
    "Sunrun sales misconduct",
    "Sunrun forged signature complaint",
    "Mary Powell Sunrun complaints",
    "Jeanna Steele Sunrun ethics",
    "Chance Allred Sunrun sales",
    "Paul Dickson Sunrun sales",
    "Patrick Kent Sunrun operations",
    "Becki Berkeley Sunrun compliance",
  ],
  alternates: { canonical: "/companies/sunrun/ethics-compliance" },
  openGraph: {
    title: "Sunrun Ethics Complaint: AllVoices, Code of Conduct & Escalation Guide",
    description: "A source-first guide to Sunrun's current ethics and compliance resources.",
    url: "/companies/sunrun/ethics-compliance",
    type: "article",
    images: [
      {
        url: "https://solarcomplaint.com/og.png",
        width: 1200,
        height: 630,
        alt: "Solar Consumer Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Ethics Complaint Guide",
    description: "Current Sunrun AllVoices, ethics policy, Vendor Code and escalation resources.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const people = [
  {
    name: "Mary Powell",
    role: "Chief Executive Officer",
    relevance: "Sunrun identifies Mary Powell as its CEO. Her name is included here as current corporate leadership context, not as an allegation about any individual complaint.",
    linkedin: "https://www.linkedin.com/in/mary-g-powell",
  },
  {
    name: "Paul Dickson",
    role: "President and Chief Revenue Officer",
    relevance: "Sunrun identifies Paul Dickson as President and Chief Revenue Officer. His role is relevant when researching the company's revenue and sales leadership structure.",
    linkedin: "https://www.linkedin.com/in/paulsdickson",
  },
  {
    name: "Jeanna Steele",
    role: "Chief Legal Officer and Chief People Officer",
    relevance: "Sunrun says Jeanna Steele oversees legal affairs and responsible business practices, including governance. Sunrun's public Ethics & Compliance Week post also names her.",
    linkedin: ethicsLinkedInPost,
  },
  {
    name: "Chance Allred",
    role: "Chief Experience and Direct Sales Officer",
    relevance: "Sunrun says Chance Allred oversees Customer Strategy, Customer Engagement, Sales Operations, Marketing, Employee Experience and direct-to-consumer sales.",
    linkedin: "https://www.linkedin.com/in/chanceallred",
  },
  {
    name: "Patrick Kent",
    role: "Chief Operating Officer",
    relevance: "Sunrun says Patrick Kent leads installation and field-service fulfillment. His role is relevant to installation, service and field-operations research.",
    linkedin: "https://www.linkedin.com/in/patrick-kent-a7ba4b22",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      headline: "Sunrun Ethics Complaint: AllVoices, Code of Conduct & Escalation Guide",
      description: "A source-first guide to Sunrun's current ethics and compliance resources.",
      url: canonicalUrl,
      datePublished: "2026-09-06",
      dateModified: "2026-09-06",
      author: { "@id": "https://solarcomplaint.com/#publisher" },
      publisher: { "@id": "https://solarcomplaint.com/#publisher" },
      isPartOf: { "@id": "https://solarcomplaint.com/#website" },
      about: { "@type": "Organization", name: "Sunrun", url: "https://www.sunrun.com/" },
      mentions: people.map((person) => ({
        "@type": "Person",
        name: person.name,
        jobTitle: person.role,
        worksFor: { "@type": "Organization", name: "Sunrun" },
        sameAs: person.linkedin,
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
        { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
        { "@type": "ListItem", position: 3, name: "Sunrun", item: "https://solarcomplaint.com/companies/sunrun" },
        { "@type": "ListItem", position: 4, name: "Ethics & Compliance", item: canonicalUrl },
      ],
    },
  ],
};

export default function SunrunEthicsCompliancePage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className={styles.page}
        eyebrow="Sunrun consumer guide · Ethics & compliance"
        title="Sunrun Ethics Complaint Guide: AllVoices, Codes of Conduct and Escalation"
        lede="A source-first guide for consumers researching Sunrun ethics and compliance concerns, including the current AllVoices reporting route, Sunrun's published policies, vendor standards, leadership roles and external complaint options."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/companies/sunrun">Sunrun</Link>
          <span aria-current="page">Ethics &amp; compliance</span>
        </nav>

        <div className={styles.jumpGrid} aria-label="Page sections">
          <a href="#report">Report a concern</a>
          <a href="#what-to-document">What to document</a>
          <a href="#vendor-code">Vendor conduct</a>
          <a href="#leadership">Who handles what</a>
        </div>

        <section className="info-section" id="report">
          <h2>How to report a Sunrun ethics or compliance concern</h2>
          <p>
            Sunrun's current October 2025 Code of Business Conduct and Ethics and Whistleblower Policy list
            <strong> AllVoices</strong> and an ethics hotline as reporting resources. These are ethics and compliance resources,
            not a substitute for ordinary customer-service requests.
          </p>
          <div className={styles.primaryCard}>
            <div className={styles.reportBox}>
              <h3>Sunrun AllVoices</h3>
              <p>Use the reporting portal published in Sunrun's current ethics materials.</p>
              <a className={styles.reportButton} href={allVoicesUrl} target="_blank" rel="noreferrer">
                Open Sunrun AllVoices ↗
              </a>
              <a className={styles.hotline} href="tel:+18666026613">Ethics hotline: {ethicsHotline}</a>
            </div>
            <div className={styles.sourceBox}>
              <h3>Verify the current policy</h3>
              <p>
                Sunrun's governance page is the best starting point because the company can replace individual PDF files over time.
              </p>
              <a href={governanceUrl} target="_blank" rel="noreferrer">Sunrun governance documents ↗</a>
            </div>
          </div>
          <div className={styles.callout}>
            <strong>Keep the issue specific.</strong> A billing error, scheduling delay or service disagreement is not automatically an ethics violation.
            If the concern involves conduct you believe conflicts with Sunrun's published policies, identify the conduct, dates, people involved and supporting records rather than relying on labels or conclusions.
          </div>
        </section>

        <section className="info-section" id="what-to-document">
          <h2>What to include in an ethics complaint</h2>
          <p>A concise factual record is easier to review than a broad narrative. Preserve the underlying documents before submitting anything.</p>
          <ul className={styles.checklist}>
            <li><strong>Dates and sequence</strong>List the relevant events in order, including calls, visits, contract changes and follow-up communications.</li>
            <li><strong>Names and roles</strong>Identify the salesperson, representative, manager, installer, vendor or employee involved when known.</li>
            <li><strong>Exact statements</strong>Quote material statements accurately and distinguish what was said from your interpretation of it.</li>
            <li><strong>Documents</strong>Keep contracts, change orders, emails, text messages, proposals, screenshots, permits, invoices and service records.</li>
            <li><strong>What you already disputed</strong>Include prior customer-service, BBB, regulatory or written escalation efforts when relevant.</li>
            <li><strong>Report confirmation</strong>Save the AllVoices confirmation, report number, submission date and any later responses.</li>
          </ul>
        </section>

        <section className="info-section" id="vendor-code">
          <h2>Sunrun Vendor Code of Conduct</h2>
          <p>
            A consumer may interact with people who are not direct Sunrun employees. Sunrun currently publishes a separate Vendor Code of Conduct alongside its company Code and Whistleblower Policy. That makes vendor status worth documenting when the conduct involves a dealer, installer, roofer, contractor, sales partner or other third party.
          </p>
          <div className={styles.callout}>
            Do not assume that a third party's involvement makes the conduct irrelevant to Sunrun's policies. Instead, document the person's company, role, how they represented their relationship to Sunrun and which documents identify the vendor or partner.
          </div>
          <p>
            <a href={vendorCodeUrl} target="_blank" rel="noreferrer">Open Sunrun Vendor Code of Conduct ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Sunrun's published ethics sources</h2>
          <div className={styles.sourceList}>
            <div className={styles.sourceItem}>
              <span className={styles.sourceType}>Primary source</span>
              <div><strong>Code of Business Conduct and Ethics</strong><p>Current October 2025 company ethics code.</p></div>
              <a href={codeUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span className={styles.sourceType}>Primary source</span>
              <div><strong>Whistleblower Policy</strong><p>Current October 2025 policy listing AllVoices and the ethics hotline.</p></div>
              <a href={whistleblowerUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span className={styles.sourceType}>Primary source</span>
              <div><strong>Vendor Code of Conduct</strong><p>Sunrun's separately published standards for vendors.</p></div>
              <a href={vendorCodeUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span className={styles.sourceType}>Company source</span>
              <div><strong>Governance document library</strong><p>The current Sunrun source page linking its governance and ethics documents.</p></div>
              <a href={governanceUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span className={styles.sourceType}>Public LinkedIn</span>
              <div><strong>Sunrun Ethics &amp; Compliance Week post</strong><p>Sunrun publicly described integrity, accountability and transparency as ethics and compliance priorities.</p></div>
              <a href={ethicsLinkedInPost} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
          </div>
        </section>

        <section className="info-section" id="leadership">
          <h2>Who handles what at Sunrun?</h2>
          <p>
            These names are included because Sunrun publicly identifies their current corporate responsibilities. Their inclusion does not mean SolarComplaint.com is alleging that any individual participated in, knew about or is responsible for a particular consumer complaint.
          </p>
          <p><a href={leadershipUrl} target="_blank" rel="noreferrer">Verify Sunrun's current executive management ↗</a></p>
          <div className={styles.peopleGrid}>
            {people.map((person) => (
              <article className={styles.personCard} key={person.name}>
                <span>{person.role}</span>
                <h3>{person.name}</h3>
                <p>{person.relevance}</p>
                <a href={person.linkedin} target="_blank" rel="noreferrer">Public source / LinkedIn ↗</a>
              </article>
            ))}
            <article className={styles.personCard}>
              <span>Public compliance profile</span>
              <h3>Becki Berkeley, MS, CCEP</h3>
              <p>Her public LinkedIn profile describes her as a compliance leader and shows Sunrun experience. This is included as public organizational context only.</p>
              <a href="https://www.linkedin.com/in/becki-berkeley-ms-ccep-a4255ba1" target="_blank" rel="noreferrer">Public LinkedIn profile ↗</a>
            </article>
          </div>
        </section>

        <section className="info-section">
          <h2>If the internal ethics process is not the right route</h2>
          <p>
            Consumers can also use external complaint and regulatory resources. The right route depends on the situation and state. SolarComplaint.com keeps those pathways separate so an ethics report is not confused with a consumer complaint, contractor complaint, financing complaint or legal claim.
          </p>
          <div className={styles.nextGrid}>
            <Link href="/companies/sunrun">Sunrun lawsuits, investigations and documented cases →</Link>
            <Link href="/resources">Find your state solar complaint resources →</Link>
            <Link href="/guides">Consumer complaint and documentation guides →</Link>
          </div>
          <p className={styles.reviewLink}>
            Need help locating the right public source? <Link href="/#questions">Ask for free research assistance.</Link>
          </p>
        </section>

        <section className="info-section">
          <h2>Source and update note</h2>
          <p>
            Reviewed September 6, 2026. Sunrun can update reporting systems, phone numbers, policies and executive roles. Before filing, verify the current information on Sunrun's governance page and the live AllVoices portal. If a linked company document changes, the current Sunrun source controls.
          </p>
          <p>
            Read the <Link href="/methodology">research methodology</Link> and <Link href="/corrections">corrections policy</Link>.
          </p>
        </section>
      </InfoPage>
    </>
  );
}
