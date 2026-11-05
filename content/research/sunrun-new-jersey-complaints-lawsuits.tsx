import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-new-jersey-complaints-lawsuits",
  slug: "sunrun-new-jersey-complaints-lawsuits",
  href: "/research/sunrun-new-jersey-complaints-lawsuits",
  title: "A New Jersey Judge Linked Five Sunrun Cases Over Disputed Signatures",
  deck: "The Diaz ruling names four other cases alleging forged customer signatures. The court records show what was challenged and what judges actually decided.",
  summary: "New Jersey court records connect five Sunrun signature disputes. Diaz, Baldassano and Valerio led judges to examine whether homeowners agreed to the documents attributed to them.",
  seoTitle: "Sunrun New Jersey Complaints & Lawsuits: Signature Cases",
  seoDescription: "Read the New Jersey court records behind five Sunrun signature cases cited in Diaz, including what homeowners alleged and what judges ruled.",
  keywords: ["Sunrun New Jersey lawsuit", "Sunrun New Jersey complaints", "Sunrun forged signature lawsuit", "Diaz v Sunrun", "Baldassano v Sunrun", "Valerio v Sunrun"],
  lede: "A New Jersey judge identified five Sunrun cases involving disputed customer signatures. The court record shows a recurring question about what customers saw and approved when sales documents were signed electronically.",
  publishedAt: "November 5, 2026",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  stateCodes: ["NJ"],
  companies: ["Sunrun"],
  topics: ["New Jersey Sunrun lawsuits", "electronic signatures", "solar power purchase agreements", "consumer consent", "Diaz v Sunrun"],
  articleSection: "Investigation",
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const diazOpinion = "https://www.govinfo.gov/content/pkg/USCOURTS-njd-1_24-cv-11462/pdf/USCOURTS-njd-1_24-cv-11462-0.pdf";
const diazDocket = "https://www.courtlistener.com/docket/69498648/diaz-v-sunrun-inc/";
const baldassanoComplaint = "https://storage.courtlistener.com/recap/gov.uscourts.njd.494151/gov.uscourts.njd.494151.1.0.pdf";
const valerioDocket = "https://www.pacermonitor.com/public/case/57755177/VALERIO_et_al_v_SUNRUN_INC_et_al";
const pereiraDocket = "https://www.pacermonitor.com/public/case/53772193/PEREIRA_v_SUNRUN,_INC_et_al";
const tigheDocket = "https://dockets.justia.com/docket/new-jersey/njdce/2:2022cv06955/505238";
const knightOpinion = "https://law.justia.com/cases/new-jersey/appellate-division-published/2020/a2258-19.html";
const njOrder = "https://www.nj.gov/oag/newsreleases19/Vivint-Solar-Developer-LLC.pdf";
const njConsumer = "https://www.njconsumeraffairs.gov/ocp/";
const njBpu = "https://www.nj.gov/bpu/bpu/assistance/index.html";

export const articleConfig = {
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun New Jersey signature cases",
  imageAlt: "New Jersey Sunrun court records on disputed signatures",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun Inc." },
    { "@type": "Organization" as const, name: "Sunrun Installation Services Inc." },
    { "@type": "AdministrativeArea" as const, name: "New Jersey" },
  ],
  sources: [
    { name: "Diaz v. Sunrun, July 18, 2025 opinion", url: diazOpinion, publisher: "U.S. District Court for the District of New Jersey", datePublished: "2025-07-18" },
    { name: "Diaz v. Sunrun case docket and disposition", url: diazDocket },
    { name: "Baldassano v. Sunrun, complaint and filed exhibits", url: baldassanoComplaint, datePublished: "2022-04-11" },
    { name: "Valerio v. Sunrun, September 22, 2025 discovery order and January 2026 dismissal", url: valerioDocket },
    { name: "Pereira v. Sunrun federal docket", url: pereiraDocket },
    { name: "Tighe v. Sunrun federal docket", url: tigheDocket },
    { name: "Knight v. Vivint Solar Developer, published New Jersey appellate opinion", url: knightOpinion, datePublished: "2020-12-02" },
    { name: "New Jersey Division of Consumer Affairs Vivint Solar Developer consent order", url: njOrder, publisher: "New Jersey Division of Consumer Affairs", datePublished: "2019-08-19" },
  ],
};

export function SunrunNewJerseyBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">New Jersey signature cases</span></nav>

    <section className="info-section">
      <p>Magda Diaz said she signed one page on a salesperson&apos;s tablet at her Clementon home. The document Sunrun later relied on was a 25-year power purchase agreement bearing electronic signatures attributed to her and her husband. In a <a href={diazOpinion} target="_blank" rel="noreferrer">July 2025 opinion</a>, Chief U.S. District Judge Renée Marie Bumb declined to send the dispute to arbitration before the parties investigated whether the homeowners had agreed to it.</p>
      <p>Bumb named four other New Jersey cases involving what she called “strikingly similar allegations of forged customer signatures.” Together with Diaz, they form a five-case court record. Her footnote turns a single dispute into a documented New Jersey case trail.</p>
      <p className="page-updated">Last reviewed November 5, 2026.</p>
    </section>

    <section className="info-section">
      <h2>Why the Diaz signing record drew scrutiny</h2>
      <p>Diaz said the salesperson presented one page on his tablet as part of checking her eligibility for a government rebate. She said she did not see or sign the longer agreement. Her husband said he did not sign anything. According to the <a href={diazOpinion} target="_blank" rel="noreferrer">court&apos;s account of the filings</a>, Sunrun emailed Diaz at 2:27 p.m. asking her to review and sign an agreement that already carried an 11:30 a.m. digital signature timestamp. The records described in the opinion indicated that the agreement was sent, viewed and signed in under three minutes. The sequence puts the signing record at the center of the case.</p>
      <p>Sunrun pointed to different IP addresses associated with the salesperson&apos;s and customers&apos; purported signatures. Bumb found a genuine dispute about whether Diaz had agreed to arbitrate, denied the motion without prejudice and ordered limited discovery into consent. The <a href={diazDocket} target="_blank" rel="noreferrer">later docket</a> records a 2026 settlement and dismissal. </p>
    </section>

    <section className="info-section">
      <h2>The cases the judge connected</h2>
      <div className="gl-table-wrap"><table><thead><tr><th scope="col">Case</th><th scope="col">Disputed record and latest verified action</th></tr></thead><tbody>
        <tr><th scope="row">Diaz v. Sunrun</th><td>Diaz and her husband disputed signatures on the PPA. The court ordered discovery into assent in July 2025. The case later settled and was dismissed. <a href={diazOpinion} target="_blank" rel="noreferrer">Opinion</a> · <a href={diazDocket} target="_blank" rel="noreferrer">Docket</a></td></tr>
        <tr><th scope="row">Baldassano v. Sunrun</th><td>A mother and daughter disputed signatures and acknowledgment of a 20-year agreement and said it had gone to an incorrect email address. The <a href={baldassanoComplaint} target="_blank" rel="noreferrer">original complaint and exhibits</a> are public. Bumb&apos;s Diaz opinion cites a November 2022 order directing discovery into whether they viewed, acknowledged or signed the agreement.</td></tr>
        <tr><th scope="row">Valerio v. Sunrun</th><td>The homeowners alleged signatures on several documents were forged. In September 2025, the court <a href={valerioDocket} target="_blank" rel="noreferrer">ordered limited discovery</a> into whether they voluntarily entered the disputed agreement. The case was dismissed by stipulation in January 2026.</td></tr>
        <tr><th scope="row">Pereira v. Sunrun</th><td>Bumb identified Pereira among the similar cases. The <a href={pereiraDocket} target="_blank" rel="noreferrer">available docket</a> records discovery and a December 2025 dismissal. The docket number is 1:24-cv-06651; the Diaz footnote prints 06551.</td></tr>
        <tr><th scope="row">Tighe v. Sunrun</th><td>Bumb also named Tighe. The <a href={tigheDocket} target="_blank" rel="noreferrer">accessible docket</a> names Bright Planet Solar and Green State Energy Solutions alongside Sunrun and records Sunrun&apos;s crossclaim against those companies.</td></tr>
      </tbody></table></div>
      <p>In Diaz, Baldassano and Valerio, judges ordered further examination of disputed assent. The Pereira and Tighe dockets complete the set Bumb identified.</p>
    </section>

    <section className="info-section">
      <h2>What the older Vivint records show</h2>
      <p>The <a href={baldassanoComplaint + "#page=128"} target="_blank" rel="noreferrer">Baldassano exhibits include Vivint Solar ethics training</a> from before Sunrun acquired Vivint. An exercise describes a salesperson copying a homeowner&apos;s genuine signature onto a revised agreement without obtaining authorization for the new version. The answer key treats that as forgery. Another section bars representatives from checking signature boxes for customers.</p>
      <p>Other filed exhibits include a <a href={baldassanoComplaint + "#page=19"} target="_blank" rel="noreferrer">Mosaic lender alert</a> about a rep-created email account used to access or sign a credit application and <a href={baldassanoComplaint + "#page=175"} target="_blank" rel="noreferrer">sworn testimony</a> from a former Vivint resolutions employee about sales representatives handling delivery of agreements. The documents show why the displayed agreement, the signing history, and the delivery address each matter.</p>
      <p>A <a href={knightOpinion} target="_blank" rel="noreferrer">published New Jersey appellate decision in Knight v. Vivint</a> likewise examined what a homeowner saw on a tablet when she signed and an agreement that included the name of a former homeowner who did not participate in the sale. The appellate court vacated an order compelling arbitration and directed a hearing on assent. The related Reilly federal case grew out of the same transaction.</p>
      <p>New Jersey&apos;s <a href={njOrder} target="_blank" rel="noreferrer">2019 consent order with Vivint Solar Developer</a> required a meaningful opportunity to read an agreement before signing, electronic execution and immediate delivery to the customer&apos;s email address. </p>
    </section>

    <section className="info-section">
      <h2>What a homeowner can check</h2>
      <p>The signing history can reveal details a finished agreement leaves out. Compare every version of the agreement, the device and email used to view and sign it, the time stamps, acknowledgment boxes and the delivered copy. The Diaz opinion shows why a judge examined those details instead of treating the displayed signatures as the end of the inquiry.</p>
      <p>For New Jersey complaint filing and consumer help, see <Link href="/states/new-jersey">New Jersey solar consumer resources</Link>. The <a href={njConsumer} target="_blank" rel="noreferrer">Office of Consumer Protection</a> handles consumer business complaints. The <a href={njBpu} target="_blank" rel="noreferrer">Board of Public Utilities</a> provides assistance with regulated utility matters. Related reporting covers <Link href="/research/sunrun-25-year-solar-contracts">Sunrun&apos;s long-term contracts</Link> and a <Link href="/guides/solar-complaint-record-checklist">checklist for preserving solar records</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunNewJerseyBody });
