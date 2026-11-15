import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-complaints-what-to-check",
  slug: "sunrun-complaints-what-to-check",
  href: "/research/sunrun-complaints-what-to-check",
  title: "Sunrun Solar Complaints: What Customers Report and Where to File",
  deck: "A customer’s panels stopped producing while the bills kept coming. See what to check in your bills and contract, and where to file a complaint.",
  summary: "Read documented Sunrun complaints about solar bills, panels that stopped producing and disputed contracts. Find independent filing routes, including the Massachusetts Attorney General’s complaint form.",
  seoTitle: "Sunrun Solar Complaints and Where to File",
  seoDescription: "Read Sunrun complaints about billing, panels not working and disputed contracts. Find the Massachusetts Attorney General’s online complaint form.",
  lede: "A California Sunrun customer checked their solar app after an unusually high utility bill. The app showed zero production. In a November 4, 2026 complaint to the Better Business Bureau, the customer said the panels had been down since August and the Sunrun bills kept coming.",
  publishedAt: "November 15, 2026",
  datePublished: "2026-11-15",
  dateModified: "2026-11-15",
  stateCodes: ["MA"],
  companies: ["Sunrun"],
  topics: ["Sunrun solar complaints", "Sunrun billing", "solar system production", "Massachusetts consumer complaints"],
  section: "Research",
  featured: false,
} satisfies ResearchStory;

const bbbComplaint = "https://www.bbb.org/us/ca/san-francisco/profile/solar-energy-equipment-dealers/sunrun-inc-1116-312886/complaints?page=1";
const laraComplaint = "https://www.nclc.org/wp-content/uploads/2024/12/2024.12.10_Cases_Lara-Complaint.pdf";
const laraCase = "https://www.nclc.org/resources/lara-v-sunrun-inc-et-al/";
const massachusettsComplaintForm = "https://massago.hylandcloud.com/251Forms/forms/f6950650-b137-4630-873a-645b5bbf29a9";
const connecticutAnnouncement = "https://portal.ct.gov/ag/press-releases/2026-press-releases/attorney-general-tong-announces-settlements-with-sunrun-solar-and-others-to-require-consumer-relief";

export const articleConfig = {
  breadcrumbLabel: "Sunrun solar complaints",
  sources: [
    { name: "BBB customer complaint, November 4, 2026", url: bbbComplaint, datePublished: "2026-11-04" },
    { name: "Lara v. Sunrun complaint, paragraphs 75–85", url: laraComplaint, datePublished: "2024-12-10" },
    { name: "Lara v. Sunrun case summary", url: laraCase },
    { name: "Massachusetts Attorney General consumer complaint instructions", url: "https://www.mass.gov/how-to/file-a-consumer-complaint", publisher: "Massachusetts Attorney General" },
    { name: "Connecticut Attorney General settlement announcement", url: connecticutAnnouncement, publisher: "Connecticut Attorney General", datePublished: "2026-10-23" },
  ],
};

export function SunrunComplaintsBody() {
  return <>
    <p><a href={bbbComplaint}>Read the November 4 BBB complaint</a>.</p>
    <section className="info-section">
      <h2>When the panels stop working and the bills keep coming</h2>
      <p>Alberto Lara described a similar problem in a Massachusetts lawsuit. He said he paid Sunrun about $11,000 while the panels weren’t working and his utility bills stayed as high as before. His complaint says a change order also lowered the estimated share of his electricity use the system would cover from 79% to 62%. The National Consumer Law Center, which represented Lara, says the case ended in his favor. <a href={laraComplaint}>Lara’s complaint, paragraphs 75–85</a> · <a href={laraCase}>NCLC’s case summary</a></p>
      <p>If you’re paying for a system that isn’t producing, compare the dates on the bill with the utility’s permission to operate and the production history. An invoice that covers time before utility approval raises a different question from a bill for a system that was cleared to run but produced nothing. The numbers on a revised design are estimates. Use the actual production for the dates in dispute when you check whether the <Link href="/research/sunrun-25-year-solar-contracts">production guarantee in your contract</Link> applies.</p>
    </section>

    <section className="info-section">
      <h2>When the complaint is about the contract itself</h2>
      <p>Connecticut’s attorney general alleged that some homeowners were locked into long-term Sunrun contracts without their consent. Under the October 2026 settlement, Sunrun must investigate covered fraud complaints and respond within 60 days. If it substantiates fraud, relief can include a payment, an account credit, cancellation or removal of the system. The settlement has no cap on restitution. <a href={connecticutAnnouncement}>Connecticut Attorney General’s announcement</a> · <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">SolarComplaint’s coverage of the case</Link></p>
    </section>

    <section className="info-section">
      <h2>How to file a complaint against Sunrun</h2>
      <p>Massachusetts homeowners can <a href={massachusettsComplaintForm}>file a consumer complaint through the Attorney General’s online portal</a>. It goes to the office’s Consumer Advocacy and Response Division. Our <Link href="/guides/massachusetts-solar-complaint">Massachusetts complaint guide</Link> walks through what to include. Outside Massachusetts, use the <Link href="/resources">state complaint directory</Link> to find your consumer protection office.</p>
      <p>The California customer’s complaint started with a utility bill and a production reading. Together they gave the homeowner a specific period to dispute. Start there if you have a billing problem. If you dispute the contract or the work that was done, the useful record may be a signed agreement or a change order. Put the date and the discrepancy in your complaint so the person reading it can see what needs to be resolved.</p>
      <p>If you’re trying to find a public record that bears on your complaint, <Link href="/#questions">ask SolarComplaint.com for free research help</Link>. Tell us your town and what you’re trying to verify.</p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunComplaintsBody });
