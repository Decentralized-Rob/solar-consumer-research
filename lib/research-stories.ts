export type ResearchStory = {
  id: string;
  slug: string;
  href: string;
  title: string;
  deck: string;
  summary: string;
  publishedAt: string;
  datePublished: string;
  dateModified: string;
  stateCodes: string[];
  companies: string[];
  topics: string[];
};

export const researchStories: ResearchStory[] = [
  {
    id: "sunrun-sales-training-consumer-protection",
    slug: "sunrun-sales-training-consumer-protection",
    href: "/research/sunrun-sales-training-consumer-protection",
    title: "Sunrun Sales Training, Ethics and Consumer Protection: 2015-2026",
    deck: "Sunrun's filings document years of sales training and consumer-protection controls. The public record also exposes Power Play 2.0, later RunX onboarding, a SUNRUN Way sales process and a new 2026 Sales Integrity Program, with important limits on what can be connected across those eras.",
    summary: "A source-backed timeline of Sunrun direct-sales training, consumer-protection rules, Power Play 2.0, the Sales Code of Conduct, RunX, SUNRUN Way and the 2026 Sales Integrity Program.",
    publishedAt: "September 8, 2026",
    datePublished: "2026-09-08",
    dateModified: "2026-09-08",
    stateCodes: [],
    companies: ["Sunrun"],
    topics: ["Sunrun sales training", "sales ethics", "consumer protection", "Power Play 2.0", "RunX", "SUNRUN Way"],
  },
  {
    id: "sunrun-25-year-solar-contracts",
    slug: "sunrun-25-year-solar-contracts",
    href: "/research/sunrun-25-year-solar-contracts",
    title: "Sunrun’s 25-Year Solar Contracts: The Homeowner View and the Investor View",
    deck: "Sunrun’s own filings show why a 20- or 25-year solar agreement looks very different from the roof than it does in the financial statements.",
    summary: "A source-backed analysis of Sunrun solar leases and PPAs, recurring customer payments, subscriber value, transfers, escalators and the terms homeowners should examine.",
    publishedAt: "September 7, 2026",
    datePublished: "2026-09-07",
    dateModified: "2026-09-07",
    stateCodes: [],
    companies: ["Sunrun"],
    topics: ["Sunrun contracts", "solar leases", "power purchase agreements", "subscriber value", "contract transfers"],
  },
  {
    id: "solar-sales-financing-after-complaint",
    slug: "solar-sales-financing-after-complaint",
    href: "/research/solar-sales-financing-after-complaint",
    title: "Solar Sales, Financing and What Happens After a Complaint",
    deck: "Michigan is testing how far responsibility extends after a solar sale. Separate actions in Texas and Arizona show why Sunrun customers should be paying attention.",
    summary: "A source-backed look at Michigan's Climax Solar lawsuit, Texas's residential-solar investigation involving Sunrun, and Arizona's settlement with Sunrun and Vivint Solar.",
    publishedAt: "August 27, 2026",
    datePublished: "2026-08-27",
    dateModified: "2026-08-27",
    stateCodes: ["MI", "TX", "AZ"],
    companies: ["Climax Solar", "Sunrun", "Vivint Solar"],
    topics: ["solar sales", "solar financing", "consumer complaints", "state enforcement"],
  },
];

export const featuredResearchStory = researchStories[0];

export function getResearchStoriesForState(stateCode: string) {
  return researchStories.filter((story) => story.stateCodes.includes(stateCode));
}
