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
    id: "sunrun-code-business-conduct-ethics",
    slug: "sunrun-code-business-conduct-ethics",
    href: "/companies/sunrun/governance/code-of-business-conduct-ethics",
    title: "Sunrun Code of Business Conduct & Ethics: What Homeowners Should Know",
    deck: "Sunrun’s October 2025 ethics code contains homeowner-relevant standards on customer communication, accurate information, investigations, privacy and third-party relationships. This guide explains what the document says and what it does not establish.",
    summary: "A source-backed homeowner guide to Sunrun’s October 2025 Code of Business Conduct & Ethics, cross-checked against Sunrun’s current governance library and 2026 proxy statement.",
    publishedAt: "September 8, 2026",
    datePublished: "2026-09-08",
    dateModified: "2026-09-08",
    stateCodes: [],
    companies: ["Sunrun"],
    topics: ["Sunrun ethics", "Code of Business Conduct and Ethics", "customer communication", "sales conduct", "vendor relationships", "ethics investigations"],
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
