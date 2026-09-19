export type ResearchStory = {
  id: string;
  slug: string;
  href: string;
  title: string;
  deck: string;
  summary: string;
  seoTitle?: string;
  seoDescription?: string;
  keywords?: string[];
  openGraphTitle?: string;
  socialDescription?: string;
  twitterDescription?: string;
  lede?: string;
  publishedAt: string;
  datePublished: string;
  dateModified: string;
  stateCodes: string[];
  companies: string[];
  topics: string[];
  author?: string;
  authorSlug?: string;
  section?: "Short Read" | "Research" | "Featured Research";
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
    seoTitle: "Massachusetts Solar Cost 2026: What Solar Costs Right Now",
    seoDescription: "Massachusetts solar averages $31,910 in September 2026. Compare cash, financing, Sunrun leases and PPAs, state tax credits and SMART 3.0.",
    socialDescription: "A typical Massachusetts solar system is running about $32,000 this fall. Here is what changes when you buy, finance, lease or sign a PPA.",
    twitterDescription: "Massachusetts solar averages about $32,000 this fall. Compare buying, financing, leasing and Sunrun PPAs.",
    lede: "A typical Massachusetts solar system is running about $32,000 this fall. The way you pay can change the deal just as much as the equipment.",
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
    seoDescription: "A Home Depot shopper says a Sunrun sales encounter followed him home. Current Home Depot reviews show the in-store Sunrun pitch is still getting noticed in 2026.",
    socialDescription: "A shopper tried a fake phone number and email. The address was real. Then, he says, someone showed up at his house.",
    twitterDescription: "He gave the Sunrun rep a fake number. The address was real.",
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
    seoTitle: "Sunrun 25-Year Contract: Lease, PPA, Transfer & Buyout Terms",
    seoDescription: "Researching a Sunrun 25-year solar contract? See current 2026 SEC records on lease and PPA terms, performance guarantees, home-sale transfers, buyout options and how Sunrun values long-term customer agreements.",
    keywords: ["Sunrun 25 year contract", "Sunrun solar contract", "Sunrun lease 25 years", "Sunrun PPA", "Sunrun contract terms", "Sunrun solar lease", "Sunrun contract transfer", "Sunrun buyout", "Sunrun performance guarantee", "Sunrun Flex"],
    openGraphTitle: "Sunrun 25-Year Contracts: What Homeowners Should Know in 2026",
    socialDescription: "Current SEC records explain the term, performance guarantees, transfers and financial value behind Sunrun leases and PPAs.",
    twitterDescription: "Current 2026 records on what a long-term Sunrun agreement means for homeowners.",
    lede: "A Sunrun lease or power purchase agreement can last longer than many homeowners stay in the same house. New 2026 SEC records add unusually specific details about what those agreements contain and how Sunrun values them.",
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
    section: "Featured Research",
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
