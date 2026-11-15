import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-complaints-what-to-check",
  slug: "sunrun-complaints-what-to-check",
  href: "/research/sunrun-complaints-what-to-check",
  title: "Sunrun Solar Complaints: What to Check in Your Records",
  deck: "The dates on your first bill and the paperwork you signed can tell you where a Sunrun dispute started.",
  summary: "Use your Sunrun agreement, utility approval, bills, and project records to check a solar complaint. See what public cases document and where to file.",
  seoDescription: "Check a Sunrun solar complaint against your contract, first bill, utility approval, and system output. Find state filing routes and settlement instructions.",
  lede: "Before you file a complaint about Sunrun, find the record that shows what you’re disputing. That might be the first bill, the panel layout you approved or the buyout quote Sunrun sent you. If you’ve already contacted Sunrun, keep its written response with that record.",
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
    <section className="info-section" id="billing">
      <h2>The first bill</h2>
      <p>Sunrun says it sends the first bill for a standard subscription about 30 days after activation. Flex and prepaid agreements have their own schedules. See <a href={sunrunFaq}>Sunrun’s billing FAQ</a>.</p>
      <p>Look at the dates the invoice covers. If it charges for time before the utility gave permission to operate (PTO), ask Sunrun what activation date it used. If the utility had already given approval and the panels produced little or nothing, save the production history for that billing period. Compare both bills for those dates and look up any production credit in your solar lease or power purchase agreement (PPA). Our <Link href="/research/sunrun-25-year-solar-contracts">Sunrun contract guide</Link> explains where to look.</p>
      <p>Alberto Lara said in his Massachusetts lawsuit that he paid Sunrun about $11,000 while his panels sat idle and his utility bills stayed as high as before. He also said a change order cut the estimated share of his electricity use the panels would cover from 79% to 62%. The utility approval date and the date of any change-order signature are unclear from <a href={laraComplaint}>paragraphs 75–85 of his complaint</a>. The National Consumer Law Center says the case <a href={laraCase}>ended in Lara’s favor</a>.</p>
    </section>

    <section className="info-section" id="installation">
      <h2>What got installed</h2>
      <p>Put the plan you approved next to the revised drawing and what’s on the roof. Check where the panels went, how many went up and whether the production estimate changed. If Sunrun says you signed off on the change, ask for the signed change order and its signing history. We’ve covered <Link href="/research/sunrun-solar-design-changes-change-orders">what can change between the quote and installation</Link>.</p>
      <p>If the salesperson offered a new roof, look for the roofer’s name on the agreement, permit and warranty. Christopher Mishler said a new roof was part of his Connecticut solar deal. Sunrun called the roofer a personal referral and asked the roofer to repay money Sunrun said it had paid for the work. <Link href="/research/sunrun-mishler-roofing-lawsuit">Mishler’s case settled before trial</Link>.</p>
      <p>If the panels are already up and the roof needs replacing, ask what Sunrun charges to take them down and put them back. Get that price in writing. Linda Dow disputed a panel-removal charge in Florida. Her case settled at mediation in April 2026, according to <a href={dowDocket}>entries 18 and 19 of the federal docket</a>.</p>
    </section>

    <section className="info-section" id="home-sale">
      <h2>Selling the house</h2>
      <p>Before closing, ask Sunrun for the paperwork the buyer would sign to take over the agreement and what it would cost you to buy it out. Ask who will get the next bill. Sunrun says it temporarily removes applicable notices or UCC filings from the title at no charge during a transfer. See <a href={sunrunTransfer}>Sunrun’s home-sale FAQ</a>.</p>
      <p>In Arizona, Sunrun and Vivint Solar have 30 days after notice of a sale or transfer to give covered customers the assignment paperwork and an updated buyout price. <a href={arizonaAgreement}>Paragraphs 33–37 of the consent agreement</a> also spell out when the companies have to start billing the new customer.</p>
    </section>

    <section className="info-section" id="filing">
      <h2>Filing a complaint</h2>
      <p>Write down what happened, when it happened and what you want Sunrun to fix. Save the bill or project record you’re disputing and any written response or case number. Use the <Link href="/guides/solar-complaint-record-checklist">complaint records checklist</Link> if you’re putting the file together.</p>
      <p>Under Connecticut’s October 2026 settlement, Sunrun must investigate covered fraud complaints and respond within 60 days. The <a href={connecticutAnnouncement}>Connecticut attorney general’s announcement</a> lists <a href="mailto:CTSupport@sunrun.com">CTSupport@sunrun.com</a> for claims. See <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">who’s covered and how to file</Link>.</p>
      <p>For Arizona, use the <Link href="/companies/sunrun#sunrun-settlements-title">settlement and filing links</Link>. For another state, check the <Link href="/resources">state complaint directory</Link>. If you’re in Massachusetts, use the <Link href="/guides/massachusetts-solar-complaint">Massachusetts attorney general complaint guide</Link>. The <Link href="/companies/sunrun">Sunrun lawsuit and settlement tracker</Link> links to the public case records.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunComplaintsBody });
