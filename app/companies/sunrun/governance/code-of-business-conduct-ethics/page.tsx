import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../../../components/info-page";
import styles from "../../ethics-compliance/sunrun-ethics.module.css";

const canonicalUrl = "https://solarcomplaint.com/companies/sunrun/governance/code-of-business-conduct-ethics";
const governanceUrl = "https://investors.sunrun.com/leadership-governance/governance-documents";
const codeUrl = "https://d1io3yog0oux5.cloudfront.net/_c9159127ad06b657d37a299d3e74348a/sunrun/db/405/3799/file/Code%2Bof%2BBusiness%2BConduct%2B%26%2BEthics_Oct_2025.pdf";
const proxyUrl = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-26-000029/run-20260415.htm";
const allVoicesUrl = "https://sunrun.allvoices.co/";

export const metadata: Metadata = {
  title: "Sunrun Code of Conduct (2025): What Homeowners Should Know",
  description:
    "A source-backed guide to Sunrun's October 2025 Code of Business Conduct & Ethics, including customer communication, sales, vendors, investigations, privacy and ethics reporting.",
  alternates: { canonical: "/companies/sunrun/governance/code-of-business-conduct-ethics" },
  openGraph: {
    title: "Sunrun Code of Conduct (2025): What Homeowners Should Know",
    description:
      "What Sunrun's current ethics code says about customers, accurate information, sales, vendors, investigations and privacy.",
    url: "/companies/sunrun/governance/code-of-business-conduct-ethics",
    type: "article",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Solar Consumer Research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Code of Conduct (2025): Homeowner Guide",
    description:
      "A source-backed homeowner guide to Sunrun's October 2025 Code of Business Conduct & Ethics.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      headline: "Sunrun Code of Business Conduct & Ethics: What Homeowners Should Know",
      description:
        "A source-backed analysis of Sunrun's October 2025 Code of Business Conduct & Ethics and the provisions most relevant to homeowners.",
      url: canonicalUrl,
      mainEntityOfPage: canonicalUrl,
      datePublished: "2026-09-08",
      dateModified: "2026-09-08",
      image: "https://solarcomplaint.com/og.png",
      author: {
        "@type": "Organization",
        name: "SolarComplaint.com Research Desk",
        url: "https://solarcomplaint.com/about",
      },
      publisher: { "@id": "https://solarcomplaint.com/#publisher" },
      isPartOf: { "@id": "https://solarcomplaint.com/#website" },
      about: { "@type": "Organization", name: "Sunrun Inc.", url: "https://www.sunrun.com/" },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
        { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
        { "@type": "ListItem", position: 3, name: "Sunrun", item: "https://solarcomplaint.com/companies/sunrun" },
        {
          "@type": "ListItem",
          position: 4,
          name: "Ethics & Compliance",
          item: "https://solarcomplaint.com/companies/sunrun/ethics-compliance",
        },
        { "@type": "ListItem", position: 5, name: "Code of Business Conduct & Ethics", item: canonicalUrl },
      ],
    },
  ],
};

export default function SunrunCodeOfBusinessConductEthicsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className={styles.page}
        eyebrow="Sunrun governance · Source analysis"
        title="Sunrun Code of Business Conduct & Ethics: What Homeowners Should Know"
        lede="What Sunrun’s October 2025 ethics code says about customer communication, accurate information, sales, vendors, investigations and privacy, with the company’s current sources linked throughout."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/companies/sunrun">Sunrun</Link>
          <Link href="/companies/sunrun/ethics-compliance">Ethics &amp; compliance</Link>
          <span aria-current="page">Code of conduct</span>
        </nav>

        <div className={styles.publicationLine}>
          <strong>SolarComplaint.com Research Desk</strong>
          <span>Published September 8, 2026</span>
          <span>Source verified September 8, 2026</span>
        </div>
        <p className={styles.independenceNote}>
          SolarComplaint.com is an independent consumer research and editorial publication. It is not affiliated with,
          endorsed by or sponsored by Sunrun.
        </p>

        <div className={styles.jumpBar} aria-label="Page sections">
          <a href="#summary">Summary</a>
          <a href="#customers">Customers</a>
          <a href="#sales">Sales</a>
          <a href="#vendors">Vendors</a>
          <a href="#investigations">Investigations</a>
          <a href="#questions">Questions</a>
          <a href="#sources">Sources</a>
        </div>

        <section className={styles.atGlance} aria-labelledby="at-glance-title">
          <div className={styles.sectionLabel}>At a glance</div>
          <h2 id="at-glance-title">The current Sunrun ethics code</h2>
          <div className={styles.factStrip}>
            <div>
              <span>Current edition</span>
              <strong>October 2025</strong>
              <a href={governanceUrl} target="_blank" rel="noreferrer">Verify with Sunrun ↗</a>
            </div>
            <div>
              <span>Who the Code covers</span>
              <strong>Employees, officers &amp; directors</strong>
              <a href={codeUrl} target="_blank" rel="noreferrer">Open official PDF ↗</a>
            </div>
            <div>
              <span>Homeowner focus</span>
              <strong>Customer-facing conduct</strong>
              <a href="#customers">See the relevant provisions ↓</a>
            </div>
          </div>
        </section>

        <section className="info-section" id="summary">
          <div className={styles.sectionLabel}>Source summary</div>
          <h2>What the Sunrun Code of Conduct is</h2>
          <p>
            Sunrun’s Code of Business Conduct &amp; Ethics is a company governance document. The October 2025 edition says
            it summarizes ethical standards and key policies for Sunrun employees, officers and directors, including those
            of Sunrun’s direct and indirect subsidiaries. Sunrun’s 2026 proxy statement independently confirms that scope
            and tells shareholders that the Board adopted the Code.
          </p>
          <p>
            For homeowners, the most useful sections are the ones that address customer treatment, truthful and accurate
            information, marketplace conduct, marketing and advertising, vendor relationships, investigations, correction
            of known violations, and privacy. Those provisions can help a homeowner identify which published company
            standard is relevant to a documented concern.
          </p>
          <div className={styles.callout}>
            <strong>Important limit.</strong> The Code is not the homeowner’s solar contract and this page does not treat it
            as a warranty, statute, private right of action, or automatic proof that any particular conduct violated the Code.
            The facts of an individual matter still have to be established.
          </div>
        </section>

        <section className="info-section" id="customers">
          <div className={styles.sectionLabel}>Homeowner relevance</div>
          <h2>What Sunrun says about customers and accurate information</h2>
          <p>
            The October 2025 Code puts customer treatment directly inside Sunrun’s ethics framework. In its credo, Sunrun
            says serving customers requires clear communication, swift action and high-quality work. In the “Fair and honest
            business practices” section, the Code says Sunrun communicates directly and honestly with customers, prohibits
            unfair dealing that includes concealment or misrepresentation of material facts, and says customers should receive
            accurate information.
          </p>
          <div className={styles.recordList}>
            <div>
              <strong>Customer communication</strong>
              <p>The Code ties customer service to clear communication, prompt action and standing behind company promises.</p>
            </div>
            <div>
              <strong>Material facts</strong>
              <p>The fair-business section specifically identifies concealment and misrepresentation of material facts as unfair dealing practices.</p>
            </div>
            <div>
              <strong>Accurate information</strong>
              <p>The Code states that Sunrun provides accurate information to customers as well as employees, business partners, stockholders and creditors.</p>
            </div>
            <div>
              <strong>Customer data</strong>
              <p>The privacy section says customers expect their information to be handled with care and used for its intended purpose under privacy laws and Sunrun policies.</p>
            </div>
          </div>
          <p>
            For a homeowner dispute, that makes the Code most relevant when the record involves a specific representation,
            a material omission, conflicting factual statements, inaccurate information, a promised correction, or the handling
            of customer data. A general service delay or billing disagreement does not by itself establish an ethics issue.
          </p>
        </section>

        <section className="info-section" id="sales">
          <div className={styles.sectionLabel}>Sales and marketing</div>
          <h2>Does Sunrun’s Code address sales conduct?</h2>
          <p>
            Yes, but the documents should be read carefully. The October 2025 Code contains a dedicated “Marketing and
            advertising” section within “Honesty in the marketplace.” Separately, Sunrun’s 2026 proxy statement says its
            sales teams are also subject to a specific sales code of conduct intended to enforce customer-centered behavior,
            including compliance with consumer-protection laws and integrity standards.
          </p>
          <p>
            That SEC-filed disclosure is useful because it shows that the general Code is not Sunrun’s only stated sales
            standard. A homeowner researching a sales representation should preserve the proposal, contract, texts, emails,
            screenshots, savings or production claims, financing disclosures, and the identity and employer of the salesperson.
          </p>
          <div className={styles.callout}>
            <strong>Do not skip affiliation.</strong> Whether a salesperson was a Sunrun employee, dealer, vendor, affiliate,
            or another third party can affect which published standards are directly relevant. The Code’s express scope is
            employees, officers and directors; Sunrun separately publishes vendor standards.
          </div>
        </section>

        <section className="info-section" id="vendors">
          <div className={styles.sectionLabel}>Third parties</div>
          <h2>What about Sunrun contractors, dealers and vendors?</h2>
          <p>
            The Code contains a “Vendor relationships” section, and Sunrun separately publishes a Vendor Code of Conduct.
            The investigation section of the October 2025 Code also says the Chief Legal Officer is responsible for investigating
            reported violations involving other employees, agents and contractors, subject to the Board’s authority to administer
            the Code.
          </p>
          <p>
            A homeowner dealing with a roofer, installer, sales dealer or other third party should document the company name,
            the person’s role, how the relationship to Sunrun was represented, and every document that identifies the entity.
            Do not assume that a third party is a direct Sunrun employee or that the employee Code automatically governs that
            company. The separate vendor standards may be the more specific source.
          </p>
          <p>
            <Link href="/companies/sunrun/ethics-compliance#vendor-code">See the Sunrun Vendor Code source and reporting context →</Link>
          </p>
        </section>

        <section className="info-section" id="investigations">
          <div className={styles.sectionLabel}>Reporting and review</div>
          <h2>What the Code says about reported violations and investigations</h2>
          <p>
            The October 2025 Code states that reported violations will be promptly investigated. It assigns Board or committee
            responsibility for matters involving directors or executive officers and gives the Chief Legal Officer responsibility
            for investigating other reported violations, including matters involving employees, agents and contractors.
          </p>
          <p>
            The disciplinary section also says employees and directors who know of a violation and fail to move promptly to
            report or correct it, or who direct or approve a violation, may face discipline. That language is significant when
            researching how the company says known problems should move through its internal process, but it does not establish
            that a violation occurred in any particular homeowner matter.
          </p>
          <div className={styles.reportRow}>
            <div>
              <h3>Need the current Sunrun ethics reporting route?</h3>
              <p>SolarComplaint.com keeps a separate guide for AllVoices, current governance sources and how to document a report.</p>
            </div>
            <Link className={styles.reportButton} href="/companies/sunrun/ethics-compliance">Open ethics guide →</Link>
          </div>
          <p>
            Sunrun’s October 2025 Code identifies AllVoices as a reporting resource. Because reporting channels can change,
            verify the live route against Sunrun’s current governance materials before submitting. The current AllVoices portal
            is also linked here: <a href={allVoicesUrl} target="_blank" rel="noreferrer">sunrun.allvoices.co ↗</a>.
          </p>
        </section>

        <section className="info-section" id="questions">
          <div className={styles.sectionLabel}>Common questions</div>
          <h2>How homeowners can read the Code without overstating it</h2>

          <h3>Does Sunrun’s Code require honest communication with customers?</h3>
          <p>
            The Code states that Sunrun communicates directly and honestly with customers and provides accurate information.
            It also identifies concealment and misrepresentation of material facts among unfair dealing practices.
          </p>

          <h3>Does the Code apply to every Sunrun salesperson?</h3>
          <p>
            Not automatically. The Code expressly covers employees, officers and directors. A third-party salesperson may be
            governed by separate vendor, dealer or contractual standards. Sunrun’s 2026 proxy also describes a specific sales
            code of conduct for its sales teams.
          </p>

          <h3>Does a customer-service problem automatically become an ethics violation?</h3>
          <p>
            No. The useful question is whether the documented conduct maps to a published standard, such as inaccurate information,
            material misrepresentation, a known issue that was not corrected, privacy handling, or another provision of the Code.
          </p>

          <h3>Does the Code say ethics reports are investigated?</h3>
          <p>
            Yes. The October 2025 Code says reported violations will be promptly investigated and describes responsibility for
            investigations. That is a statement of Sunrun’s internal policy; it does not tell an outside reader what investigative
            steps must occur in every case.
          </p>

          <h3>Can the Code prove a homeowner’s legal claim?</h3>
          <p>
            The Code can be relevant evidence of Sunrun’s published internal standards, but it is not a substitute for the contract,
            applicable law, government records, or evidence showing what actually happened. This page provides research information,
            not legal advice.
          </p>
        </section>

        <section className="info-section" id="sources">
          <div className={styles.sectionLabel}>Primary sources</div>
          <h2>Sources and verification</h2>
          <p className={styles.sectionIntro}>
            This page was built by reviewing the October 2025 Code section by section, verifying the current document against
            Sunrun’s governance library, and cross-checking its stated scope against Sunrun’s April 2026 SEC proxy filing. The
            source document controls if a summary on this page is incomplete or becomes outdated.
          </p>
          <div className={styles.sourceList}>
            <div className={styles.sourceItem}>
              <span>Primary document</span>
              <div><strong>Sunrun Code of Business Conduct &amp; Ethics</strong><p>October 2025 edition analyzed on this page.</p></div>
              <a href={codeUrl} target="_blank" rel="noreferrer">Open PDF ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span>Current company index</span>
              <div><strong>Sunrun Governance Documents</strong><p>Use this page to verify which governance document Sunrun currently publishes.</p></div>
              <a href={governanceUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span>SEC filing</span>
              <div><strong>Sunrun 2026 Proxy Statement</strong><p>Confirms the Board-adopted Code and its stated scope; also describes a separate sales code of conduct.</p></div>
              <a href={proxyUrl} target="_blank" rel="noreferrer">Open ↗</a>
            </div>
            <div className={styles.sourceItem}>
              <span>Research standard</span>
              <div><strong>SolarComplaint.com Methodology</strong><p>How source hierarchy, procedural status and corrections are handled.</p></div>
              <Link href="/methodology">Read →</Link>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className={styles.sectionLabel}>Continue researching</div>
          <h2>Related Sunrun research</h2>
          <div className={styles.nextGrid}>
            <Link href="/companies/sunrun/ethics-compliance">Sunrun Ethics &amp; Compliance guide →</Link>
            <Link href="/companies/sunrun">Sunrun investigations, enforcement and cases →</Link>
            <Link href="/research">Residential solar research library →</Link>
          </div>
        </section>
      </InfoPage>
    </>
  );
}
