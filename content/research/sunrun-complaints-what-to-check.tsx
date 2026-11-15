import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-complaints-what-to-check",
  slug: "sunrun-complaints-what-to-check",
  href: "/research/sunrun-complaints-what-to-check",
  title: "Sunrun Solar Complaints: What to Check in Your Records",
  deck: "Compare your first bill with utility approval and system production. Check which design you approved and what your agreement says about roof work, transfers, and buyouts.",
  summary: "Use your Sunrun agreement, utility approval, bills, and project records to check a solar complaint. See what public cases document and where to file.",
  seoDescription: "Check a Sunrun solar complaint against your contract, first bill, utility approval, and system output. Find state filing routes and settlement instructions.",
  lede: "If the crew installed fewer panels than you approved or a bill arrived while the system was idle, start with the dates and the paperwork for your own project.",
  publishedAt: "November 15, 2026",
  datePublished: "2026-11-15",
  dateModified: "2026-11-15",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun solar complaints", "Sunrun billing", "permission to operate", "solar change orders", "solar contract transfers"],
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const sunrunFaq = "https://www.sunrun.com/go-solar-center/solar-faq";
const laraComplaint = "https://www.nclc.org/wp-content/uploads/2024/12/2024.12.10_Cases_Lara-Complaint.pdf";
const laraCase = "https://www.nclc.org/resources/lara-v-sunrun-inc-et-al/";
const sunrunTransfer = "https://www.sunrun.com/moving-made-easy";
const arizonaAgreement = "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf";
const connecticutAnnouncement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";
const dowDocket = "https://dockets.justia.com/docket/florida/flmdce/8:2025cv03324/450866";

export const articleConfig = {
  breadcrumbLabel: "Sunrun solar complaints",
  sources: [
    { name: "Sunrun billing FAQ", url: sunrunFaq },
    { name: "Lara v. Sunrun complaint and Exhibit A", url: laraComplaint, datePublished: "2024-12-10" },
    { name: "Lara v. Sunrun case summary", url: laraCase },
    { name: "Sunrun home sale and transfer FAQ", url: sunrunTransfer },
    { name: "Arizona stipulated consent agreement", url: arizonaAgreement, publisher: "Arizona Attorney General", datePublished: "2025-05-22" },
    { name: "Connecticut Attorney General settlement announcement", url: connecticutAnnouncement, publisher: "Connecticut Attorney General", datePublished: "2026-10-23" },
    { name: "Dow v. SunRun federal docket, entries 18–19", url: dowDocket },
  ],
};

export function SunrunComplaintsBody() {
  return <>
    <section className="info-section" aria-labelledby="sunrun-complaints-summary">
      <h2 id="sunrun-complaints-summary">TL;DR</h2>
      <p>Sunrun says a standard subscription is first billed about 30 days after activation. If you’re disputing a design change, roof charge or buyout, ask for the document behind it. Start with the <Link href="/companies/sunrun">Sunrun settlement and lawsuit tracker</Link> if you’re looking for a claim process.</p>
    </section>

    <section className="info-section" id="billing">
      <h2>When did Sunrun start billing you?</h2>
      <p>Sunrun says it sends the first bill for a standard subscription about 30 days after activation. Flex and prepaid agreements have different schedules. See <a href={sunrunFaq}>Sunrun’s billing FAQ</a>.</p>
      <p>Pull these three records before you call Sunrun.</p>
      <ul>
        <li>Your first Sunrun invoice, including the dates it covers.</li>
        <li>The utility’s permission to operate (PTO), which is its approval to turn on the system.</li>
        <li>The production history for the period billed.</li>
      </ul>
      <p>If the invoice covers time before utility approval, ask Sunrun which activation date it used. If the system had approval but produced little or no power, compare your utility and Sunrun bills for the same period. Check how your solar lease or power purchase agreement (PPA) calculates any production credit. See our <Link href="/research/sunrun-25-year-solar-contracts">guide to Sunrun contract terms and production guarantees</Link>.</p>
      <p>In Massachusetts, Alberto Lara alleged that he paid about $11,000 to Sunrun while his panels weren’t working and his utility bills stayed as high as before. He also said a change order lowered the estimated share of his electricity use the system would cover from 79% to 62%. The utility approval date and the date of any change-order signature remain unknown in the <a href={laraComplaint}>public complaint, paragraphs 75–85</a>. The National Consumer Law Center reports a favorable resolution for Lara in its <a href={laraCase}>case summary</a>.</p>
    </section>

    <section className="info-section" id="installation">
      <h2>The plan you approved and the work that got done</h2>
      <p>Compare the original plan, any revised plan and what the crew installed. Write down the panel count, placement and estimated production on each version. If Sunrun says you accepted a change, ask for the signed document and its signing history. See our reporting on <Link href="/research/sunrun-solar-design-changes-change-orders">Sunrun design changes and change orders</Link>.</p>
      <p>If roof work came with the solar offer, check who is named on the roofing agreement, permit and warranty. In Connecticut, Christopher Mishler alleged that his solar project included a new roof. Sunrun called the roofer a personal referral and sought reimbursement for money it said it had paid the roofer. The case settled before trial. Our <Link href="/research/sunrun-mishler-roofing-lawsuit">reporting on the Mishler case</Link> links to the homeowner’s complaint and Sunrun’s filings.</p>
      <p>For an existing system, ask for a separate written price to remove and reinstall panels during a roof replacement. Get a separate quote if you also want to buy out the agreement. In Florida, Linda Dow disputed the cost of panel removal during her agreement. The parties settled at mediation in April 2026, as recorded in <a href={dowDocket}>entries 18 and 19 of the federal docket</a>.</p>
    </section>

    <section className="info-section" id="home-sale">
      <h2>Ask for the buyout price before closing</h2>
      <p>Ask Sunrun for the agreement assignment form, a current buyout quote and any filing the closing agent needs. Get written confirmation of who will be billed after closing. Sunrun says it temporarily removes applicable notices or UCC filings from title during a transfer at no charge. See <a href={sunrunTransfer}>Sunrun’s home-sale FAQ</a>.</p>
      <p>In Arizona, Sunrun and Vivint Solar have 30 days after notice of a sale or transfer to provide covered customers with assignment paperwork and an updated buyout price. The conditions for switching invoices are in <a href={arizonaAgreement}>paragraphs 33–37 of the consent agreement</a>.</p>
    </section>

    <section className="info-section" id="filing">
      <h2>Where to file a Sunrun complaint</h2>
      <p>Write down what changed, when it happened and what you want Sunrun to fix. Keep the agreement, the bill or project record you’re disputing, and any written company response or case number. Use the <Link href="/guides/solar-complaint-record-checklist">solar complaint records checklist</Link> to organize those documents.</p>
      <p>Under Connecticut’s October 2026 settlement, Sunrun must investigate covered fraud complaints and respond within 60 days. Homeowners can submit claims to <a href="mailto:CTSupport@sunrun.com">CTSupport@sunrun.com</a>. Check <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">who is covered and how to file</Link>, or read the <a href={connecticutAnnouncement}>Connecticut Attorney General’s announcement</a>.</p>
      <p>For Arizona, start with the <Link href="/companies/sunrun#sunrun-settlements-title">settlement and filing links</Link>. For other issues, see the <Link href="/resources">state complaint directory</Link> or the <Link href="/guides/massachusetts-solar-complaint">Massachusetts Attorney General complaint guide</Link>.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunComplaintsBody });
