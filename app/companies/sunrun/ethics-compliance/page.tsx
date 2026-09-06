import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../../components/info-page";
import { featuredStateSources } from "../../../../lib/featured-state-sources";
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
const connecticutSource = "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun";
const floridaRoofOrder = "https://ecf.flmd.uscourts.gov/cgi-bin/show_public_doc?2025-02459-10-8-cv=";
const texasSource = featuredStateSources.TX[0];
const arizonaSource = featuredStateSources.AZ[0];

export const metadata: Metadata = {
  title: "Sunrun Ethics Complaint: AllVoices, Code of Conduct & Compliance Guide",
  description:
    "How to report a Sunrun ethics concern through AllVoices, what Sunrun's current ethics and vendor policies say, who holds relevant leadership roles, and where consumers can go next.",
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
    "Mary Powell Sunrun",
    "Jeanna Steele Sunrun compliance",
    "Chance Allred Sunrun sales",
    "Paul Dickson Sunrun sales",
    "Patrick Kent Sunrun operations",
    "Becki Berkeley Sunrun compliance",
  ],
  alternates: { canonical: "/companies/sunrun/ethics-compliance" },
  openGraph: {
    title: "Sunrun Ethics & Compliance: Reporting, Policies and Public Record",
    description: "An independent, source-first Sunrun ethics and compliance research guide.",
    url: "/companies/sunrun/ethics-compliance",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Ethics & Compliance Guide",
    description: "Current AllVoices reporting, Sunrun policies, leadership roles and consumer resources.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const people = [
  {
    name: "Mary Powell",
    role: "Chief Executive Officer",
    relevance: "Sunrun identifies Mary Powell as its CEO. Her inclusion here documents current corporate leadership and does not connect her to any individual consumer complaint.",
    source: leadershipUrl,
  },
  {
    name: "Paul Dickson",
    role: "President and Chief Revenue Officer",
    relevance: "Sunrun identifies Paul Dickson as President and Chief Revenue Officer, making his role relevant to research on the company's sales and revenue leadership structure.",
    source: leadershipUrl,
  },
  {
    name: "Jeanna Steele",
    role: "Chief Legal Officer and Chief People Officer",
    relevance: "Sunrun says Jeanna Steele oversees legal affairs and responsible business practices, including governance. Sunrun has also identified her publicly in ethics and compliance communications.",
    source: ethicsLinkedInPost,
  },
  {
    name: "Chance Allred",
    role: "Chief Experience and Direct Sales Officer",
    relevance: "Sunrun says Chance Allred oversees Customer Strategy, Customer Engagement, Sales Operations, Marketing, Employee Experience and direct-to-consumer sales.",
    source: leadershipUrl,
  },
  {
    name: "Patrick Kent",
    role: "Chief Operating Officer",
    relevance: "Sunrun says Patrick Kent leads installation and field-service fulfillment, making his role relevant to installation, service and field-operations research.",
    source: leadershipUrl,
  },
];

const timeline = [
  {
    year: "2026",
    date: "April 3",
    title: "Texas announces residential-solar investigation involving Sunrun",
    text: "The Texas Attorney General announced an investigation involving Sunrun and other residential-solar companies. An investigation is not a finding of wrongdoing.",
    href: texasSource.url,
    label: "Texas Attorney General source",
  },
  {
    year: "2025",
    date: "October",
    title: "Current Sunrun ethics policies identify AllVoices",
    text: "Sunrun's October 2025 Code of Business Conduct and Ethics and Whistleblower Policy identify AllVoices and an ethics hotline among the company's reporting resources.",
    href: governanceUrl,
    label: "Sunrun governance documents",
  },
  {
    year: "2025",
    date: "October 30",
    title: "Federal order summarizes a Florida Sunrun roof dispute",
    text: "A federal court order summarizes a homeowner's allegations concerning panel removal, roof replacement and contract-buyout costs. The allegations were not findings of wrongdoing.",
    href: floridaRoofOrder,
    label: "Federal court order",
  },
  {
    year: "2025",
    date: "May 22",
    title: "Arizona approves consumer settlement involving Sunrun and Vivint Solar",
    text: "Arizona's court-approved agreement resolves allegations concerning solar sales practices and includes consumer-relief and complaint-handling terms. The companies denied the allegations.",
    href: arizonaSource.url,
    label: "Arizona source",
  },
  {
    year: "2024",
    date: "July 19",
    title: "Connecticut Attorney General sues Sunrun and other defendants",
    text: "Connecticut alleged unlawful residential-solar sales conduct involving contracts, signatures, permits and non-functioning systems. Lawsuit allegations are not court findings.",
    href: connecticutSource,
    label: "Connecticut Attorney General source",
  },
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      headline: "Sunrun Ethics & Compliance: Reporting, Policies and Public Record",
      description: "An independent, source-first guide to Sunrun's current ethics and compliance resources.",
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
        eyebrow="Company watch · Sunrun"
        title="Sunrun Ethics & Compliance"
        lede="How Sunrun says ethics concerns can be reported, what its current policies say, who leads the relevant functions, and what the public record shows."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/companies/sunrun">Sunrun</Link>
          <span aria-current="page">Ethics &amp; compliance</span>
        </nav>

        <div className={styles.publicationLine}>
          <strong>SolarComplaint.com Research Desk</strong>
          <span>Published September 6, 2026</span>
          <span>Last reviewed September 6, 2026</span>
        </div>
        <p className={styles.independenceNote}>
          SolarComplaint.com is an independent consumer research and editorial publication. It is not affiliated with, endorsed by or sponsored by Sunrun.
        </p>

        <div className={styles.jumpBar} aria-label="Page sections">
          <a href="#report">Report</a>
          <a href="#timeline">Timeline</a>
          <a href="#evidence">Documents</a>
          <a href="#leadership">People</a>
          <a href="#latest">Latest</a>
        </div>

        <section className={styles.atGlance} aria-labelledby="at-glance-title">
          <div className={styles.sectionLabel}>At a glance</div>
          <h2 id="at-glance-title">Current ethics reporting information</h2>
          <div className={styles.factStrip}>
            <div><span>Reporting portal</span><strong>AllVoices</strong><a href={allVoicesUrl} target="_blank" rel="noreferrer">sunrun.allvoices.co ↗</a></div>
            <div><span>Ethics hotline</span><strong>{ethicsHotline}</strong><a href="tel:+18666026613">Call hotline</a></div>
            <div><span>Current policy set</span><strong>October 2025</strong><a href={governanceUrl} target="_blank" rel="noreferrer">Verify with Sunrun ↗</a></div>
          </div>
        </section>

        <section className="info-section" id="report">
          <div className={styles.sectionLabel}>Reporting guide</div>
          <h2>How to report a Sunrun ethics or compliance concern</h2>
          <p>
            Sunrun’s current Code of Business Conduct and Ethics and Whistleblower Policy identify <strong>AllVoices</strong> and an ethics hotline as reporting resources. Those resources are different from ordinary customer-service channels.
          </p>
          <div className={styles.reportRow}>
            <div>
              <h3>Use the current Sunrun reporting route</h3>
              <p>Before submitting, verify the live reporting information against Sunrun’s current governance materials.</p>
            </div>
            <a className={styles.reportButton} href={allVoicesUrl} target="_blank" rel="noreferrer">Open Sunrun AllVoices ↗</a>
          </div>
          <div className={styles.callout}>
            <strong>Keep the report factual.</strong> A billing error, scheduling delay or service disagreement is not automatically an ethics issue. If the concern involves conduct you believe conflicts with a published policy, identify the conduct, dates, people involved and supporting records.
          </div>
        </section>

        <section className="info-section" id="timeline">
          <div className={styles.sectionLabel}>Timeline</div>
          <h2>Sunrun policies and related public record</h2>
          <p className={styles.sectionIntro}>This timeline keeps company policy updates, investigations, settlements and lawsuit allegations separate. Their legal and procedural status is not interchangeable.</p>
          <div className={styles.timeline}>
            {timeline.map((item) => (
              <article className={styles.timelineItem} key={`${item.year}-${item.date}-${item.title}`}>
                <div className={styles.timelineDate}><strong>{item.year}</strong><span>{item.date}</span></div>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <a href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="info-section" id="evidence">
          <div className={styles.sectionLabel}>Evidence</div>
          <h2>Sunrun’s published ethics documents</h2>
          <div className={styles.sourceList}>
            <div className={styles.sourceItem}><span>Primary source</span><div><strong>Code of Business Conduct and Ethics</strong><p>Sunrun’s October 2025 company ethics code.</p></div><a href={codeUrl} target="_blank" rel="noreferrer">Open ↗</a></div>
            <div className={styles.sourceItem}><span>Primary source</span><div><strong>Whistleblower Policy</strong><p>Sunrun’s October 2025 policy identifying current reporting resources.</p></div><a href={whistleblowerUrl} target="_blank" rel="noreferrer">Open ↗</a></div>
            <div className={styles.sourceItem}><span>Primary source</span><div><strong>Vendor Code of Conduct</strong><p>Separately published standards for Sunrun vendors and third-party relationships.</p></div><a href={vendorCodeUrl} target="_blank" rel="noreferrer">Open ↗</a></div>
            <div className={styles.sourceItem}><span>Company library</span><div><strong>Governance documents</strong><p>The current Sunrun index for governance and ethics materials.</p></div><a href={governanceUrl} target="_blank" rel="noreferrer">Open ↗</a></div>
            <div className={styles.sourceItem}><span>Public LinkedIn</span><div><strong>Sunrun Ethics &amp; Compliance Week post</strong><p>A public company statement about integrity, accountability and transparency.</p></div><a href={ethicsLinkedInPost} target="_blank" rel="noreferrer">Open ↗</a></div>
          </div>
        </section>

        <section className="info-section" id="vendor-code">
          <div className={styles.sectionLabel}>Vendor conduct</div>
          <h2>Why the Sunrun Vendor Code matters</h2>
          <p>
            A homeowner may deal with a salesperson, installer, roofer, dealer, contractor or other third party rather than a direct Sunrun employee. Sunrun publishes a separate Vendor Code of Conduct, so it is worth documenting the person’s company, role, how the relationship to Sunrun was represented and which documents identify the vendor or partner.
          </p>
          <p><a href={vendorCodeUrl} target="_blank" rel="noreferrer">Read the Sunrun Vendor Code of Conduct ↗</a></p>
        </section>

        <section className="info-section" id="what-to-document">
          <div className={styles.sectionLabel}>Prepare the record</div>
          <h2>What to document before reporting</h2>
          <div className={styles.recordList}>
            <div><strong>Dates and sequence</strong><p>Calls, visits, contract changes, service events and follow-up communications in chronological order.</p></div>
            <div><strong>Names and roles</strong><p>The salesperson, representative, manager, installer, vendor or employee involved when known.</p></div>
            <div><strong>Exact statements</strong><p>Material statements quoted accurately, separated from your interpretation or conclusion.</p></div>
            <div><strong>Documents</strong><p>Contracts, change orders, emails, texts, proposals, screenshots, permits, invoices and service records.</p></div>
            <div><strong>Prior disputes</strong><p>Relevant customer-service, BBB, regulatory or written escalation attempts.</p></div>
            <div><strong>Submission record</strong><p>The AllVoices confirmation, report number, submission date and later responses.</p></div>
          </div>
        </section>

        <section className="info-section" id="leadership">
          <div className={styles.sectionLabel}>People &amp; responsibilities</div>
          <h2>Who handles what at Sunrun?</h2>
          <p className={styles.sectionIntro}>
            These names appear because Sunrun publicly identifies their corporate responsibilities. Inclusion does not allege that any individual participated in, knew about or is responsible for a particular consumer complaint.
          </p>
          <div className={styles.peopleList}>
            {people.map((person) => (
              <article key={person.name}>
                <div><span>{person.role}</span><h3>{person.name}</h3></div>
                <p>{person.relevance}</p>
                <a href={person.source} target="_blank" rel="noreferrer">Verify role ↗</a>
              </article>
            ))}
            <article>
              <div><span>Public compliance profile</span><h3>Becki Berkeley, MS, CCEP</h3></div>
              <p>Her public LinkedIn profile describes compliance experience at Sunrun. This is included as public organizational context only.</p>
              <a href="https://www.linkedin.com/in/becki-berkeley-ms-ccep-a4255ba1" target="_blank" rel="noreferrer">Public LinkedIn profile ↗</a>
            </article>
          </div>
          <p><a href={leadershipUrl} target="_blank" rel="noreferrer">Sunrun executive management source ↗</a></p>
        </section>

        <section className="info-section">
          <div className={styles.sectionLabel}>Featured</div>
          <h2>Related Sunrun research</h2>
          <div className={styles.featuredGrid}>
            <Link href="/companies/sunrun"><span>Company tracker</span><strong>Sunrun investigations, enforcement and documented cases</strong><p>One source-based index for state actions and related SolarComplaint.com research.</p></Link>
            <Link href="/states/florida"><span>Florida</span><strong>Sunrun roof-removal and contract-buyout dispute</strong><p>A federal court order, later procedural history and Florida consumer resources.</p></Link>
            <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit"><span>Connecticut</span><strong>Connecticut Attorney General v. Sunrun</strong><p>A plain-language guide to the allegations and primary government record.</p></Link>
          </div>
        </section>

        <section className="info-section" id="latest">
          <div className={styles.sectionLabel}>The latest</div>
          <h2>Current Sunrun research on SolarComplaint.com</h2>
          <div className={styles.latestList}>
            <article><time dateTime="2026-09-06">Sep. 6, 2026</time><div><strong>Sunrun ethics and compliance source guide</strong><p>Current AllVoices reporting route, ethics documents, vendor standards and leadership responsibilities reviewed.</p></div></article>
            <article><time dateTime="2026-09-06">Sep. 6, 2026</time><div><Link href="/states/florida">Florida Sunrun roof dispute and consumer resource hub</Link><p>Expanded with the federal court source, Florida solar disclosure rules and reciprocal Sunrun research links.</p></div></article>
            <article><time dateTime="2026-04-03">Apr. 3, 2026</time><div><a href={texasSource.url} target="_blank" rel="noreferrer">Texas announces residential-solar investigation involving Sunrun ↗</a><p>Primary Attorney General source; investigation status is kept separate from any finding.</p></div></article>
          </div>
        </section>

        <section className="info-section">
          <div className={styles.sectionLabel}>Consumer resources</div>
          <h2>If an ethics report is not the right route</h2>
          <p>SolarComplaint.com keeps internal ethics reporting separate from consumer complaints, contractor complaints, financing complaints and legal claims. The appropriate external route depends on the situation and state.</p>
          <div className={styles.nextGrid}>
            <Link href="/resources">Find state complaint resources →</Link>
            <Link href="/guides">Consumer documentation and complaint guides →</Link>
            <Link href="/#questions">Ask for free research assistance →</Link>
          </div>
        </section>

        <section className="info-section">
          <div className={styles.sectionLabel}>Editorial note</div>
          <h2>Source and update standard</h2>
          <p>
            Reviewed September 6, 2026. Sunrun can change reporting systems, phone numbers, policies and executive roles. Before filing, verify current information against Sunrun’s governance page and live AllVoices portal. Primary sources control if a SolarComplaint.com summary differs from the underlying record.
          </p>
          <p>Read the <Link href="/methodology">research methodology</Link> and <Link href="/corrections">corrections policy</Link>.</p>
        </section>
      </InfoPage>
    </>
  );
}
