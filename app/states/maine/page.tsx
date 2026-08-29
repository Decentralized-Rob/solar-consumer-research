import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const sources = {
  agSolar: "https://www.maine.gov/ag/consumer-protection/consumer-help-topics/housing/solar-power-systems",
  agComplaint: "https://www.maine.gov/ag/online-services/complaint-form",
  agAds: "https://www.maine.gov/ag/consumer-protection/consumer-issues-scam/solar-advertisements-advisory-thu-01292026-0751",
  opaSolar: "https://www.maine.gov/meopa/solar",
  pucComplaint: "https://www.maine.gov/mpuc/consumer-assistance/file-complaint",
  pucReport: "https://www.maine.gov/mpuc/sites/maine.gov.mpuc/files/inline-files/2025%20Annual%20Report%20Final.pdf",
  solarDisclosure: "https://www.maine.gov/energy/initiatives/renewable-energy/solar",
  warrantyLaw: "https://legislature.maine.gov/statutes/10/title10sec1491.html",
  wgmeFreedom: "https://wgme.com/news/i-team/some-maine-solar-customers-left-in-limbo-after-freedom-forever-bankruptcy",
};

const problemPaths = [
  { id: "installer-closed", label: "My installer closed or went bankrupt", detail: "Find the records that identify any remaining equipment, service, or manufacturer warranty.", number: "01" },
  { id: "service", label: "My system needs service", detail: "Separate a system problem from the company that sold or installed it.", number: "02" },
  { id: "bills", label: "My bill or savings look wrong", detail: "Compare the proposal, production, utility bills, credits, and solar payment.", number: "03" },
  { id: "community-solar", label: "I have a community solar issue", detail: "Understand a second bill, credits, cancellation timing, or the provider behind a subscription.", number: "04" },
  { id: "sales", label: "I think the sale was misleading", detail: "Preserve the records that show what was offered and what you received.", number: "05" },
  { id: "warranty", label: "I have a warranty or roof problem", detail: "Identify who promised what before a repair, removal, or roof replacement.", number: "06" },
  { id: "utility", label: "I have a CMP, Versant, or interconnection issue", detail: "Use the utility path for billing, meter, service, and regulated interconnection concerns.", number: "07" },
];

export const metadata: Metadata = {
  title: "Maine Solar Complaints, Problems and Consumer Resources",
  description: "Source-based Maine solar guides, complaint routes, public records, consumer rules, and current reporting for homeowners dealing with solar problems.",
  keywords: ["Maine solar complaints", "Maine solar problems", "Maine solar consumer resources", "Freedom Forever Maine", "Maine community solar complaints", "Maine solar warranty"],
  alternates: { canonical: "/states/maine" },
  openGraph: {
    title: "Maine Solar Complaints, Problems and Consumer Resources",
    description: "Issue-based guides, official complaint routes, current reporting, and public sources for Maine solar consumers.",
    url: "/states/maine",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Maine Solar Complaints, Problems and Consumer Resources",
    description: "Issue-based guides, official complaint routes, current reporting, and public sources for Maine solar consumers.",
  },
};

export default function MaineHubPage() {
  const canonicalUrl = "https://solarcomplaint.com/states/maine";
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": canonicalUrl,
        name: "Maine Solar Complaints, Problems and Consumer Resources",
        description: "Source-based Maine solar guides, official complaint routes, public records, consumer rules, and current reporting.",
        dateModified: "2026-08-28",
        inLanguage: "en-US",
        spatialCoverage: { "@type": "AdministrativeArea", name: "Maine" },
        isPartOf: { "@id": "https://solarcomplaint.com/#website" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        citation: [
          { "@type": "CreativeWork", name: "Maine PUC 2025 Annual Report", url: sources.pucReport },
          { "@type": "WebPage", name: "Maine Attorney General: Solar Power Systems", url: sources.agSolar },
          { "@type": "WebPage", name: "Maine Office of Public Advocate: Community Solar", url: sources.opaSolar },
        ],
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "States", item: "https://solarcomplaint.com/resources" },
          { "@type": "ListItem", position: 3, name: "Maine", item: canonicalUrl },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className="maine-hub-page"
        eyebrow="Maine consumer research"
        title="Maine solar complaints, problems and consumer resources."
        lede="Start with what is actually happening. This page connects Maine homeowners to the public records, state rules, official complaint routes, and documented reporting that fit the problem."
      >
        <nav className="case-question-links" aria-label="Maine hub navigation">
          <a href="#start">Find the right starting point</a>
          <a href="#maine-record">What Maine agencies have documented</a>
          <a href="#sources">Official Maine sources</a>
          <a href="#faqs">Frequently asked questions</a>
        </nav>

        <section className="maine-help-callout" aria-labelledby="maine-help-title">
          <div>
            <p className="eyebrow">Free research help</p>
            <h2 id="maine-help-title">Need help sorting out a Maine solar problem?</h2>
            <p>Tell us your Maine city or town, the company involved, and what happened. We can help identify relevant public records, official state resources, and source material to review.</p>
            <p className="maine-help-boundary">General research help only. No legal advice or claim evaluation.</p>
          </div>
          <Link className="maine-help-button" href="/#questions">Get free research help <span aria-hidden="true">→</span></Link>
        </section>

        <section id="start" className="maine-paths-section" aria-labelledby="maine-paths-title">
          <div className="maine-section-heading">
            <span>Start with the problem</span>
            <h2 id="maine-paths-title">What is going on?</h2>
          </div>
          <div className="maine-path-grid">
            {problemPaths.map((path) => (
              <a href={`#${path.id}`} key={path.id}>
                <span>{path.number}</span>
                <strong>{path.label}</strong>
                <p>{path.detail}</p>
                <b aria-hidden="true">↓</b>
              </a>
            ))}
          </div>
        </section>

        <section id="maine-record" className="maine-record-section" aria-labelledby="maine-record-title">
          <div className="maine-section-heading">
            <span>Documented Maine record</span>
            <h2 id="maine-record-title">The public record shows several different kinds of solar problems.</h2>
          </div>
          <div className="maine-stat-grid">
            <article>
              <strong>97</strong>
              <p>complaints against solar providers reported by the Maine PUC&apos;s Consumer Assistance and Safety Division in 2025.</p>
              <a href={sources.pucReport} target="_blank" rel="noreferrer">Read the 2025 PUC annual report ↗</a>
            </article>
            <article>
              <strong>1,732</strong>
              <p>consumer complaints received by that division in 2025, across all regulated utility issues.</p>
              <a href={sources.pucReport} target="_blank" rel="noreferrer">See the PUC complaint data ↗</a>
            </article>
            <article>
              <strong>72</strong>
              <p>Freedom Forever complaints received by the Maine Attorney General since 2023, according to the agency in August 2026 reporting.</p>
              <a href={sources.wgmeFreedom} target="_blank" rel="noreferrer">Read the reported AG figure ↗</a>
            </article>
          </div>
          <p className="maine-source-note">These figures describe agency complaint records and reporting, not findings about every complaint or company.</p>
        </section>

        <section id="installer-closed" className="maine-guide-section" aria-labelledby="installer-closed-title">
          <p className="maine-guide-kicker">Installer closure or bankruptcy</p>
          <h2 id="installer-closed-title">My solar installer closed or went bankrupt.</h2>
          <p>An installer closing does not automatically end every warranty connected to a system. The sale, installation, workmanship, equipment, monitoring, and financing may involve different companies. Start by separating the promises in your paperwork before treating all coverage as gone.</p>
          <div className="maine-guide-columns">
            <div>
              <h3>Pull these records first</h3>
              <ul>
                <li>The signed contract and any change orders</li>
                <li>Workmanship and installation warranty language</li>
                <li>Panel, inverter, and battery model numbers</li>
                <li>Manufacturer warranty documents and monitoring access</li>
                <li>Permit, inspection, and permission-to-operate records</li>
              </ul>
            </div>
            <div>
              <h3>What Maine&apos;s AG points to</h3>
              <p>The Attorney General&apos;s solar guidance directs consumers to consider operation and maintenance responsibilities, warranties, monitoring, roof work, and the cost of removing equipment.</p>
              <a href={sources.agSolar} target="_blank" rel="noreferrer">Open Maine AG solar guidance ↗</a>
            </div>
          </div>
        </section>

        <section id="service" className="maine-guide-section" aria-labelledby="service-title">
          <p className="maine-guide-kicker">Service and system performance</p>
          <h2 id="service-title">My solar company will not service my system.</h2>
          <p>First identify the specific problem: a system alert, an inverter issue, a monitoring gap, physical damage, or missing service. Then identify whether the original company promised maintenance, whether a manufacturer warranty could apply, and who has access to the system&apos;s monitoring platform.</p>
          <p>Recent reporting on Freedom Forever&apos;s liquidation describes Maine homeowners trying to establish what service and warranty coverage remained after the company stopped operating. That reporting is a starting point for a research path, not proof that any other customer has the same coverage or result.</p>
          <a className="maine-inline-link" href={sources.wgmeFreedom} target="_blank" rel="noreferrer">Read the Freedom Forever reporting and warranty context ↗</a>
        </section>

        <section id="bills" className="maine-guide-section" aria-labelledby="bills-title">
          <p className="maine-guide-kicker">Billing and expected savings</p>
          <h2 id="bills-title">My electric bill or solar savings are not what I expected.</h2>
          <p>Start with the numbers that can be compared, not a general feeling that the deal is wrong: the sales proposal, predicted production, pre- and post-solar utility bills, actual usage, solar payment, and credits on the utility account.</p>
          <p>For community solar, a smaller utility bill does not eliminate the separate solar-company bill. The Office of the Public Advocate says bills can be higher during higher-generation months, unused credits can bank for later use, and credits expire after one year.</p>
          <a className="maine-inline-link" href={sources.opaSolar} target="_blank" rel="noreferrer">Read the Office of the Public Advocate&apos;s billing explanation ↗</a>
        </section>

        <section id="community-solar" className="maine-guide-section maine-guide-section--accent" aria-labelledby="community-solar-title">
          <p className="maine-guide-kicker">Community solar</p>
          <h2 id="community-solar-title">I have a community solar problem.</h2>
          <p>Maine community solar is a subscription arrangement that produces credits on a CMP or Versant bill and a separate charge from the solar provider. A common first step is identifying the subscription company and then reviewing the terms for credits, billing, cancellation, and any pending charges.</p>
          <div className="maine-guide-columns">
            <div>
              <h3>Questions worth answering</h3>
              <ul>
                <li>Who is the provider and what contract did I accept?</li>
                <li>How many credits am I receiving and using?</li>
                <li>When do unused credits expire?</li>
                <li>When did I request cancellation, and what does the contract say about timing?</li>
              </ul>
            </div>
            <div>
              <h3>Cancellation timing</h3>
              <p>The Office of the Public Advocate says customers may cancel until five days after receiving the first bill and be responsible only for that bill. After that, many companies can take 90 days or more to cancel, with charges continuing in the meantime.</p>
              <a href={sources.opaSolar} target="_blank" rel="noreferrer">Open the state&apos;s community solar guide ↗</a>
            </div>
          </div>
        </section>

        <section id="sales" className="maine-guide-section" aria-labelledby="sales-title">
          <p className="maine-guide-kicker">Sales, contracts, and disclosures</p>
          <h2 id="sales-title">Someone came to my door, or I think the solar sale was misleading.</h2>
          <p>Save what was said before it becomes hard to reconstruct: ads, texts, emails, proposals, production estimates, savings claims, tax-credit representations, financing disclosures, and final contract files. Preserve screenshots in their original form where possible.</p>
          <p>Maine&apos;s Attorney General warns that claims of no upfront cost are not the same as a free system and may involve long-term payment obligations, ownership limits, or payments that rise over time. Its advisory also says Maine has not selected neighborhoods or towns for required solar conversion.</p>
          <div className="maine-source-links">
            <a href={sources.agAds} target="_blank" rel="noreferrer">Read Maine AG&apos;s solar advertising advisory ↗</a>
            <a href={sources.solarDisclosure} target="_blank" rel="noreferrer">Open Maine&apos;s standard solar disclosure forms ↗</a>
          </div>
          <p className="maine-last-paragraph">Since June 1, 2026, Maine law has required sellers and lessors of customer-sited solar equipment to provide a completed standard written disclosure before the sale or lease. The state&apos;s forms cover design, cost, warranties, parties&apos; responsibilities, financing terms, roof replacement, and moving.</p>
        </section>

        <section id="warranty" className="maine-guide-section" aria-labelledby="warranty-title">
          <p className="maine-guide-kicker">Warranties and roof work</p>
          <h2 id="warranty-title">I have a warranty issue, or my roof needs work.</h2>
          <p>Maine has a dedicated solar-warranty statute, but it does not make every warranty interchangeable. A workmanship promise, panel warranty, inverter warranty, monitoring agreement, and roof-removal arrangement can all have different terms and responsible parties.</p>
          <p>Before authorizing panel removal or roof work, locate the original agreement and identify what it says about removal, reinstallation, repairs, and costs. Maine&apos;s disclosure law now specifically requires the written disclosure to address the parties&apos; obligations if a roof needs replacement or repair.</p>
          <div className="maine-source-links">
            <a href={sources.warrantyLaw} target="_blank" rel="noreferrer">Read Maine&apos;s solar warranty law ↗</a>
            <a href={sources.solarDisclosure} target="_blank" rel="noreferrer">See the required disclosure information ↗</a>
          </div>
        </section>

        <section id="utility" className="maine-guide-section" aria-labelledby="utility-title">
          <p className="maine-guide-kicker">CMP, Versant, and interconnection</p>
          <h2 id="utility-title">I have a utility or interconnection problem.</h2>
          <p>A problem with the installer is not always a problem with CMP, Versant, or the interconnection process. Put the issue into the correct lane: utility billing, meter or credits, service, interconnection, installer performance, or a community solar subscription.</p>
          <p>The Maine PUC&apos;s Consumer Assistance and Safety Division handles regulated utility matters and reported 97 solar-provider complaints within its 2025 electric-complaint category. Its complaint path is most relevant when the dispute involves a regulated utility or an issue it has authority to address.</p>
          <div className="maine-source-links">
            <a href={sources.pucComplaint} target="_blank" rel="noreferrer">Open the Maine PUC complaint route ↗</a>
            <a href={sources.pucReport} target="_blank" rel="noreferrer">Read the PUC&apos;s 2025 consumer-assistance report ↗</a>
          </div>
        </section>

        <section className="maine-story-section" aria-labelledby="maine-story-title">
          <div>
            <p className="eyebrow">Current Maine story · August 2026</p>
            <h2 id="maine-story-title">Freedom Forever&apos;s liquidation has made service and warranty questions immediate for some Maine homeowners.</h2>
          </div>
          <div>
            <p>WGME reported that Maine customers were searching for someone to service systems after Freedom Forever entered bankruptcy and liquidation. The reporting says the Maine Attorney General had received 72 Freedom Forever complaints since 2023 and advised customers to review their contracts and warranty documents.</p>
            <a href={sources.wgmeFreedom} target="_blank" rel="noreferrer">Read the reporting ↗</a>
          </div>
        </section>

        <section id="sources" className="maine-sources-section" aria-labelledby="maine-sources-title">
          <div className="maine-section-heading">
            <span>Go directly to the record</span>
            <h2 id="maine-sources-title">Official Maine sources.</h2>
          </div>
          <div className="maine-source-grid">
            <a href={sources.agComplaint} target="_blank" rel="noreferrer"><span>Maine Attorney General</span><strong>File a consumer complaint and request mediation</strong><p>For a complaint about a business or contractor.</p><b>Open source ↗</b></a>
            <a href={sources.pucComplaint} target="_blank" rel="noreferrer"><span>Maine Public Utilities Commission</span><strong>File a utility complaint</strong><p>For matters involving regulated electric, gas, phone, water, or ferry service.</p><b>Open source ↗</b></a>
            <a href={sources.opaSolar} target="_blank" rel="noreferrer"><span>Office of the Public Advocate</span><strong>Community solar guide, bills, and cancellation</strong><p>State explanations for Maine&apos;s community solar program.</p><b>Open source ↗</b></a>
            <a href={sources.agSolar} target="_blank" rel="noreferrer"><span>Maine Attorney General</span><strong>Solar power systems consumer information</strong><p>Official starting point for contracts, warranties, and complaint options.</p><b>Open source ↗</b></a>
            <a href={sources.solarDisclosure} target="_blank" rel="noreferrer"><span>Maine Department of Energy Resources</span><strong>Required solar disclosure forms</strong><p>Standard forms for customer-sited solar purchases and leases.</p><b>Open source ↗</b></a>
            <a href={sources.pucReport} target="_blank" rel="noreferrer"><span>Maine Public Utilities Commission</span><strong>2025 annual report</strong><p>Includes the Consumer Assistance and Safety Division complaint data.</p><b>Open source ↗</b></a>
          </div>
        </section>

        <section id="faqs" className="maine-faq-section" aria-labelledby="maine-faq-title">
          <div className="maine-section-heading">
            <span>Frequently asked questions</span>
            <h2 id="maine-faq-title">Maine solar FAQs.</h2>
          </div>
          <div className="maine-faq-list">
            <details><summary>Where do I file a complaint about a Maine solar company?</summary><p>The Maine Attorney General&apos;s consumer complaint route is the state&apos;s general starting point for a complaint about a solar contractor or business. A utility dispute may instead belong with the Maine PUC. The correct route depends on the company and issue involved.</p><a href={sources.agComplaint} target="_blank" rel="noreferrer">Maine AG complaint form ↗</a></details>
            <details><summary>What if my original solar installer is gone?</summary><p>Separate the installer&apos;s workmanship or service promises from equipment and manufacturer warranties. Keep the contract, warranty documents, equipment model information, permits, and monitoring information together before contacting another provider or manufacturer.</p><a href={sources.agSolar} target="_blank" rel="noreferrer">Maine AG solar information ↗</a></details>
            <details><summary>Why do I receive two bills with community solar?</summary><p>Community solar generally produces credits on a CMP or Versant bill and a separate bill from the solar provider. The Office of the Public Advocate explains how those credits and charges work, including higher production-period charges and credit expiration.</p><a href={sources.opaSolar} target="_blank" rel="noreferrer">Maine community solar explanation ↗</a></details>
            <details><summary>How long can a community solar cancellation take?</summary><p>The Office of the Public Advocate says that after the initial five-day cancellation period, many providers can take 90 days or more to cancel an account. The written contract controls the terms for a particular subscription.</p><a href={sources.opaSolar} target="_blank" rel="noreferrer">State cancellation information ↗</a></details>
            <details><summary>Does Maine require a solar seller to give me a disclosure?</summary><p>Yes. Beginning June 1, 2026, the seller or lessor of customer-sited solar equipment must provide a completed standard written disclosure before the sale or lease. The disclosure covers items including the installer, warranties, financing terms, and roof-replacement responsibilities.</p><a href={sources.solarDisclosure} target="_blank" rel="noreferrer">Maine&apos;s disclosure forms ↗</a></details>
            <details><summary>Does this page tell me whether I have a legal claim?</summary><p>No. It is a public-source research page. It does not interpret contracts, evaluate claims, or decide whether any person or company violated the law.</p></details>
          </div>
        </section>

        <section className="maine-final-cta" aria-labelledby="maine-final-cta-title">
          <p className="eyebrow">Still not sure where to start?</p>
          <h2 id="maine-final-cta-title">Bring the basic facts. We&apos;ll help you find the public record.</h2>
          <p>Use the private question form with your Maine city or town, company, and a short description. Do not send account numbers, government ID, passwords, or unredacted contracts.</p>
          <Link href="/#questions">Ask for free research help →</Link>
        </section>
      </InfoPage>
    </>
  );
}
