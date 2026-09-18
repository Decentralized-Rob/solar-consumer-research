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
  author?: string;
  authorSlug?: string;
  section?: "Short Read" | "Research";
  featured?: boolean;
};

const stories: ResearchStory[] = [
  {
    id: "massachusetts-solar-cost-2026",
    slug: "massachusetts-solar-cost-2026",
    href: "/research/massachusetts-solar-cost-2026",
    title: "What Solar Costs in Massachusetts Right Now",
    deck: "A typical Massachusetts solar system is running about $32,000 this fall. Cash, financing, leases and PPAs put very different contracts underneath the panels.",
    summary: "September 2026 Massachusetts solar pricing, state incentives, financing, leases and Sunrun PPA research built around current primary and marketplace sources.",
    publishedAt: "September 18, 2026",
    datePublished: "2026-09-18",
    dateModified: "2026-09-18",
    stateCodes: ["MA"],
    companies: ["Sunrun"],
    topics: ["Massachusetts solar cost", "Massachusetts solar incentives", "SMART 3.0", "Sunrun Massachusetts", "solar financing", "solar leases", "power purchase agreements"],
    author: "Jules Young",
    authorSlug: "jules-young",
    section: "Short Read",
    featured: true,
  },
  {
    id: "sunrun-home-depot-sales-home-visit",
    slug: "sunrun-home-depot-sales-home-visit",
    href: "/research/sunrun-home-depot-sales-home-visit",
    title: "Sunrun at Home Depot: Shopper Says Store Pitch Followed Him Home",
    deck: "A shopper tried a fake phone number and email to dodge the follow-up. The address was real. That turned out to matter.",
    summary: "A September 2026 Sunrun sales story, backed by Sunrun and Home Depot records plus current Home Depot store reviews showing shoppers are still encountering Sunrun salespeople in 2026.",
    publishedAt: "September 16, 2026",
    datePublished: "2026-09-16",
    dateModified: "2026-09-16",
    stateCodes: ["CA"],
    companies: ["Sunrun", "Home Depot"],
    topics: ["Sunrun sales", "Home Depot solar", "retail solar sales", "solar sales representatives"],
    author: "Jules Young",
    authorSlug: "jules-young",
    section: "Short Read",
    featured: true,
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
    dateModified: "2026-09-16",
    stateCodes: [],
    companies: ["Sunrun"],
    topics: ["Sunrun contracts", "solar leases", "power purchase agreements", "subscriber value", "contract transfers"],
    section: "Research",
    featured: true,
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
    section: "Research",
    featured: true,
  },
];

export const researchStories = [...stories].sort(
  (a, b) => Date.parse(b.datePublished) - Date.parse(a.datePublished),
);

export const featuredResearchStory =
  researchStories.find((story) => story.featured) ?? researchStories[0];

export function getResearchStory(slug: string) {
  return researchStories.find((story) => story.slug === slug);
}

export function getResearchStoriesForState(stateCode: string) {
  return researchStories.filter((story) => story.stateCodes.includes(stateCode));
}

export function getResearchStoriesForCompany(company: string) {
  const normalized = company.trim().toLowerCase();
  return researchStories.filter((story) =>
    story.companies.some((item) => item.toLowerCase() === normalized),
  );
}

export function getResearchStoriesForAuthor(authorSlug: string) {
  return researchStories.filter((story) => story.authorSlug === authorSlug);
}

export function getLatestResearchStories(limit = 3) {
  return researchStories.slice(0, limit);
}

export function getLatestResearchModifiedDate() {
  return researchStories.reduce(
    (latest, story) => story.dateModified > latest ? story.dateModified : latest,
    "1970-01-01",
  );
}
