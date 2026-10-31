import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/cases/connecticut-attorney-general-sunrun-lawsuit";
const settlementAnnouncement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const sunrunStipulation = "https://civilinquiry.jud.ct.gov/DocumentInquiry/DocumentInquiry.aspx?DocumentNo=33860223";
const originalComplaint = "https://portal.ct.gov/-/media/ag/press_releases/2024/2024-07-01-sunrun-complaint.pdf";
const initialAnnouncement = "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun";
const connecticutPublic = "https://www.ctpublic.org/news/2024-07-19/ct-attorney-general-files-lawsuit-against-sunrun-alleging-deceptive-and-unlawful-sales-tactics";
const attorneyGeneralComplaints = "https://ct.gov/agcomplaints";
const dcpComplaints = "https://portal.ct.gov/DCP/Complaint-Center/Consumers---Complaint-Center";

export const metadata: Metadata = {
  title: "Connecticut Sunrun Settlement: Fraud Claims & Consumer Relief",
  description: "Read the Connecticut Sunrun settlement and court complaint: alleged forged solar leases, a disputed verification call, the 60–120 day claim process, and what relief is actually available.",
  keywords: [
    "Connecticut Sunrun settlement",
    "Sunrun Connecticut lawsuit",
    "Sunrun forged signature",
    "Sunrun fraud claim",
    "Sunrun contract cancellation Connecticut",
    "Bright Planet Solar lawsuit",
    "Elevate Solar Solutions settlement",
    "Connecticut solar consumer relief",
  ],
  alternates: { canonical: "/cases/connecticut-attorney-general-sunrun-lawsuit" },
  openGraph: {
    title: "Connecticut Sunrun Settlement: What the Court Records Say",
    description: "The Connecticut case moved from allegations to settlement. The filed documents reveal a disputed verification call, tighter sales controls, and specific limits on consumer relief.",
    url: "/cases/connecticut-attorney-general-sunrun-lawsuit",
    type: "article",
    images: [],
  },
  twitter: {
    card: "summary",
    title: "Connecticut Sunrun Settlement: What the Court Records Say",
    description: "A close reading of Connecticut's Sunrun settlement, the alleged forged leases and the actual consumer-relief provisions.",
    images: [],
  },
};

export default function ConnecticutSunrunCasePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: "Connecticut's Sunrun Settlement: What the Court Records Actually Say",
    description: "An examination of Connecticut's 2024 complaint and October 2026 Sunrun settlement, including disputed signatures, third-party sales, notification rules and consumer remedies.",
    datePublished: "2026-10-31",
    dateModified: "2026-10-31",
    mainEntityOfPage: canonicalUrl,
    publisher: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com" },
    isAccessibleForFree: true,
    about: [
      { "@type": "Organization", name: "Sunrun" },
      { "@type": "Organization", name: "Bright Planet Solar" },
      { "@type": "Organization", name: "Elevate Solar Solutions" },
      { "@type": "AdministrativeArea", name: "Connecticut" },
    ],
    citation: [sunrunStipulation, originalComplaint, settlementAnnouncement],
    relatedLink: [
      "https://solarcomplaint.com/states/connecticut",
      "https://solarcomplaint.com/companies/sunrun",
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
        eyebrow="Connecticut enforcement · Updated October 31, 2026"
        title="Connecticut's Sunrun Settlement: What the Court Records Actually Say"
        lede="A homeowner allegedly rejected a 25-year solar lease. The state's complaint says an electronic signature appeared anyway, followed by a phone call from someone pretending to be the customer. Two years later, Connecticut has settled with Sunrun and several sales defendants. The court documents explain how that happened, what changes now, and where the relief has limits."
      >
        <nav className="case-question-links" aria-label="Sections of this investigation">
          <a href="#status">Where the case stands</a>
          <a href="#record">What Connecticut alleged</a>
          <a href="#sales-chain">The sales chain</a>
          <a href="#terms">What the settlement requires</a>
          <a href="#relief">Who can seek relief</a>
          <a href="#questions">What remains unanswered</a>
          <a href="#sources">Court documents</a>
        </nav>

        <section id="status" className="info-section case-notice">
          <h2>Case status: Sunrun settled; Bright Planet remains in the case</h2>
          <p>On October 23, 2026, Connecticut Attorney General William Tong <a href={settlementAnnouncement} target="_blank" rel="noreferrer">announced agreements</a> with Sunrun Inc., Sunrun Installation Services Inc., Elevate Solar Solutions LLC, Dakota Grumet and Sierra Howes. The <a href={sunrunStipulation} target="_blank" rel="noreferrer">Sunrun stipulation, signed October 22 and filed with the court October 23</a>, resolves the state's claims against the two Sunrun defendants without a trial or adjudication of liability. Sunrun expressly denies liability. Connecticut says its case against Bright Planet Solar Inc. remains pending.</p>
          <p>The stipulation defines its <strong>effective date as the date judgment is entered</strong>, rather than the date of the press release. Deadlines expressed as days after the effective date should be calculated from court entry. The documents reviewed for this update establish the filing and settlement announcement; they do not establish the judgment-entry date.</p>
        </section>

        <section className="info-section">
          <h2>What changed on October 23?</h2>
          <p>Connecticut's 2024 action accused multiple businesses and salespeople of putting consumers into long-term contracts without informed consent, failing to deliver copies of agreements, starting work before permits, and leaving some installed solar systems inactive. The <a href={originalComplaint} target="_blank" rel="noreferrer">original complaint</a> set out specific transactions in Windsor, Stafford Springs and Wethersfield.</p>
          <p>The settlement is more consequential than the $300,000 payment to the state. It places conditions on how Sunrun verifies a customer's identity, checks its sales network and investigates allegedly inauthentic contracts. It also creates a route to account credits, reduced payments, contract cancellation and, in some cases, panel removal. The terms are specific. They do not promise that every Connecticut Sunrun customer can cancel.</p>
        </section>

        <section id="record" className="info-section">
          <h2>A rejected lease, an electronic signature and a recorded call</h2>
          <p>In the Windsor transaction, the state alleged a homeowner rejected a 25-year Sunrun lease priced at <strong>$306.98 per month</strong>. Her father rejected the same offer. Nevertheless, the complaint says a contract dated August 14, 2023 carried her electronic signature. Her first and last names, and her initials, were reversed in the document.</p>
          <p>According to paragraphs 31–36 of the <a href={originalComplaint} target="_blank" rel="noreferrer">state's complaint</a>, a salesperson then participated in a recorded confirmation call. The caller claiming to be the female homeowner spoke in a deep male voice and reversed the homeowner's name in the same manner as the electronic contract. The purported customer agreed to the rejected terms, including a <strong>2.99% annual payment increase</strong>.</p>
          <p>The complaint says a 36-panel, 14.22-kilowatt system was installed in October 2023, and that the homeowner received the disputed lease only after installation. It further alleged Sunrun declined requests to terminate the agreement, remove the panels and restore the roof. These are the state's allegations, not judicial findings.</p>
          <p>That sequence makes the verification call central to the case: the safeguard intended to confirm consent was itself allegedly circumvented. The 2026 stipulation now requires more robust identity checks during verification, including photographic or live-video evidence, or an alternative approved by the Attorney General.</p>
        </section>

        <section className="info-section">
          <h2>Two more houses, two more warning signs</h2>
          <p>In <strong>Stafford Springs</strong>, the complaint describes a $314-per-month, 25-year lease presented over Zoom. The state says the sales pitch omitted a 2.9% annual escalator, which the complaint calculated would bring total payments to <strong>$135,693</strong>. It alleged an electronic signature appeared without the consumer having signed or reviewed the document. The panels were installed in December 2022, while the building permit was not approved until June 2023. At the time of the complaint, the system had not been activated.</p>
          <p>In <strong>Wethersfield</strong>, the consumer had agreed to a lease but allegedly never received a copy of the contract. The state says installation took place in October 2022, before an electrical permit was approved on November 4, 2022. That system, too, was described as unactivated when the lawsuit was filed.</p>
          <p>Read together, the allegations are about more than a questionable sales presentation. They concern the point at which an electronic contract becomes enforceable, whether permitting preceded construction, and what happens to the homeowner when a system is on the roof but cannot be used.</p>
        </section>

        <section id="sales-chain" className="info-section">
          <h2>The sales chain behind a Sunrun contract</h2>
          <p>The state named two Sunrun companies, Bright Planet Solar, Elevate Solar Solutions and the two salespeople. It alleged the salespeople operated through the outside marketing network while Sunrun was the company on the consumer-facing lease. The complaint also alleged the individual defendants were not properly registered as home improvement salespeople. <a href={connecticutPublic} target="_blank" rel="noreferrer">Connecticut Public reported in July 2024</a> that Sunrun said the sales representatives and installation crews involved were not its employees and had not met its expectations.</p>
          <p>The stipulated notice requirement makes the network especially important. Paragraph 13 names <strong>C&amp;D Marketing Services LLC, doing business as A&amp;D Solar</strong>, <strong>Andrew Grose</strong>, Elevate, Grumet (also identified as Dakota Ford) and Howes (also identified as Sierra Ford). Those additional names appear in the filed notice provision, not in the short list of settlement defendants in the Attorney General's announcement. Their inclusion identifies categories of customers who may need to be notified; it does not, by itself, establish misconduct by every named person or company.</p>
          <p>Sunrun must send clear notice to Connecticut customers it knows, or becomes aware, may have been affected by conduct covered by the relevant stipulation provisions, including customers sold systems through those named channels. There is an important exclusion: paragraph 13 does not require notice to customers who previously released the relevant claims, including in a prior settlement.</p>
        </section>

        <section id="terms" className="info-section">
          <h2>The remedies and controls, in the actual document</h2>
          <p><strong>Identity verification.</strong> During the implementation period, which runs from the judgment's effective date through <strong>December 31, 2031</strong>, Sunrun must conduct pre-work verification calls and take adequate steps to verify customer identity. The stipulation also requires auditing identifiers that may be reused across transactions, training salespeople and maintaining a sales audit program. A salesperson cannot obtain a signature on the salesperson's own device unless the customer first receives an unsigned contract and a reasonable opportunity to review it.</p>
          <p><strong>Complaint investigation.</strong> For complaints about the authenticity of a Sunrun solar contract, the company must acknowledge receipt and issue a case number, identify a contact within ten days, and examine available records such as e-signature history, IP addresses, timestamps, recorded calls, sales notes and installation documents. It must provide a written determination within 60 days or, if unresolved, written updates explaining the delay. <strong>Every such complaint must be resolved within 120 days</strong> of notice under paragraph 15.</p>
          <p><strong>Possible relief.</strong> When a complaint is substantiated under the policy, Sunrun must offer applicable relief: cash, credits or payment reductions for customers who continue, or the option to cancel and elect system removal. If removed, Sunrun must make roof and exterior penetrations watertight and repair physical damage caused by its installation or removal work. The agreement does not promise a completely new roof. For eligible complaints received within 60 days of installation, it also requires reimbursement of amounts paid to Sunrun under the contract.</p>
          <p><strong>Independent dispute review.</strong> A dispute over resolution goes to a third-party arbitrator approved in advance by the Attorney General; Sunrun pays the arbitrator's cost and the decision is final. Sunrun performs the initial investigation, so the arbitrator is an important second stage, not the first decision-maker.</p>
          <p><strong>State payment.</strong> Sunrun owes Connecticut <strong>$300,000</strong>. Half goes to a Department of Consumer Protection enforcement account and half to the Attorney General's Consumer Fund for authorized consumer-protection uses. It is not a fixed $300,000 cash pool distributed to affected homeowners. The Attorney General says consumer restitution under the settlement is <strong>not capped</strong>.</p>
        </section>

        <section id="relief" className="info-section">
          <h2>Who can request Sunrun relief in Connecticut?</h2>
          <p>Connecticut directs consumers to submit alleged contract-fraud claims to <a href="mailto:CTSupport@sunrun.com">CTSupport@sunrun.com</a>. The filed policy concerns the authenticity of a contract, including disputed electronic signatures. A billing, roof or production problem alone should not be described as automatically qualifying for a fraud remedy under this particular process.</p>
          <p>There is a separate and unusually specific provision for Connecticut consumers who say they did not receive a contract copy when it was executed. Under paragraph 9, Sunrun can rebut that claim with evidence of delivery, including email, text or availability in a customer portal. If it cannot prove delivery, the customer may cancel <strong>within three days after Sunrun supplies a copy or 30 days after the judgment's effective date, whichever is later</strong>. Consumers should verify those dates against the entered judgment rather than assuming an open-ended cancellation right.</p>
          <p>The stipulation itself does <strong>not</strong> create a private right for a consumer to enforce its terms in court; paragraph 35 reserves enforcement to the parties and the court. That restriction does not determine whether a homeowner has separate rights under other law or an existing contract. It does make documenting a complaint and contacting state regulators particularly important.</p>
          <p>For a claim, keep the sales proposal, every version of the contract, signature and delivery records, texts, emails, verification-call details, permits, inspection dates, activation records and bills. Include the address, dates, disputed facts and the remedy requested. Consumers may also <a href={attorneyGeneralComplaints} target="_blank" rel="noreferrer">file with Connecticut's Attorney General</a> or <a href={dcpComplaints} target="_blank" rel="noreferrer">Department of Consumer Protection</a>. The settlement's defined consumer categories concern Connecticut residents with Sunrun contracts; it should not be presented as extending automatically to homeowners in other states.</p>
        </section>

        <section className="info-section">
          <h2>What happened to Elevate and its salespeople?</h2>
          <p>The <a href={settlementAnnouncement} target="_blank" rel="noreferrer">Attorney General's October 23 announcement</a> says Elevate must dissolve. Elevate, Grumet and Howes face a combined $200,000 penalty suspended after $100,000 subject to compliance. Grumet is restricted for ten years from owning a business that conducts home solicitation sales and must work under company supervision, with records of unsolicited sales outreach. Howes must surrender her home improvement salesperson registrations and cannot seek new home improvement salesperson or contractor registration for ten years. The defendants did not admit liability.</p>
          <p>Bright Planet did not join those announced resolutions. Connecticut says the case against it is still pending. An unresolved defendant should not be labeled settled merely because other parties resolved their part of the same lawsuit.</p>
        </section>

        <section id="questions" className="info-section">
          <h2>The unanswered questions are now about enforcement</h2>
          <p>The documents describe the process but do not establish how many customers will be notified, how many complaints will be substantiated, how often cancellation or removal will be offered, or how many disputes will reach arbitration. The publicly reviewed record also does not establish that the October stipulation's judgment has already been entered. Those are material questions for follow-up reporting, not numbers to infer from a settlement headline.</p>
          <p>Another distinction matters: the state's settlement resolves its asserted claims against Sunrun without a finding of liability, but its consumer-remedy process still depends on case-by-case investigation. The measurable test will be whether people who contest their contracts receive their records, timely decisions and actual remedies.</p>
        </section>

        <section id="sources" className="info-section">
          <h2>Primary documents and reporting</h2>
          <p><strong>October 22–23, 2026:</strong> <a href={sunrunStipulation} target="_blank" rel="noreferrer">Sunrun stipulated judgment and motion for entry, Connecticut Superior Court, HHD-CV24-6188068-S</a>. Key sections: paragraphs 9, 11, 13, 15, 17–19 and 35.</p>
          <p><strong>October 23, 2026:</strong> <a href={settlementAnnouncement} target="_blank" rel="noreferrer">Connecticut Attorney General settlement announcement</a>, including separate status of Bright Planet and the Elevate defendants.</p>
          <p><strong>July 2024:</strong> <a href={originalComplaint} target="_blank" rel="noreferrer">State of Connecticut v. Sunrun et al., original complaint</a>, especially paragraphs 24–68; <a href={initialAnnouncement} target="_blank" rel="noreferrer">Attorney General's filing announcement</a>.</p>
          <p><strong>July 19, 2024:</strong> <a href={connecticutPublic} target="_blank" rel="noreferrer">Connecticut Public's contemporaneous report</a>, including Sunrun's response to the allegations.</p>
          <p>Research reviewed October 31, 2026. Allegations in a complaint, obligations in a stipulation and court findings are identified separately throughout this article.</p>
        </section>

        <section className="info-section">
          <h2>Related SolarComplaint.com research</h2>
          <p><Link href="/states/connecticut">Connecticut solar complaints and regulatory resources →</Link></p>
          <p><Link href="/companies/sunrun">Sunrun investigations, lawsuits and settlements →</Link></p>
          <p><Link href="/research/sunrun-25-year-solar-contracts">Sunrun's 25-year contracts and homeowner obligations →</Link></p>
          <p><Link href="/research/sunrun-mishler-roofing-lawsuit">Mishler v. Sunrun: a separate Connecticut roofing case →</Link></p>
          <p><Link href="/companies/sunrun/ethics-compliance">Sunrun ethics and compliance reporting resources →</Link></p>
        </section>
      </InfoPage>
    </>
  );
}
