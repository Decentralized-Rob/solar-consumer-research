import { stateSlug, states } from "./content";
import { editorialStories } from "./editorial-directory";

export type SiteSearchResult = {
  href: string;
  title: string;
  summary: string;
  section: string;
  date?: string;
};

const directoryPages: SiteSearchResult[] = [
  { href: "/companies/sunrun", title: "Sunrun lawsuits, settlements and research", section: "Company hub", summary: "Find Sunrun complaints, litigation, court filings and consumer research." },
  { href: "/goodleap", title: "GoodLeap solar financing investigations", section: "Company hub", summary: "GoodLeap loan cases, arbitration, attorney general actions and research." },
  { href: "/goodleap/states", title: "GoodLeap financing by state", section: "State research", summary: "GoodLeap lawsuits, solar loans and enforcement records by state." },
  { href: "/goodleap/resources", title: "GoodLeap consumer resources", section: "Consumer help", summary: "Official GoodLeap financing consumer protection resources." },
  { href: "/cases/titan-solar-power", title: "Titan Solar Power bankruptcy and customer tracker", section: "Bankruptcy tracker", summary: "Titan Solar Power closure, bankruptcy, acquisition, loans and warranties." },
  { href: "/cases/titan-solar-power/customer-help", title: "Titan Solar Power customer help", section: "Consumer help", summary: "Service, warranty, solar financing, home sales and unfinished installations." },
  { href: "/cases/titan-solar-power/warranty-after-bankruptcy", title: "Titan Solar Power warranty after bankruptcy", section: "Consumer help", summary: "Warranty coverage, manufacturer support and help after Titan closed." },
  { href: "/cases/freedom-forever", title: "Freedom Forever Chapter 7 bankruptcy", section: "Bankruptcy tracker", summary: "Freedom Forever Chapter 7, liquidation, customer help and updates." },
  { href: "/cases/freedom-forever/what-happened", title: "What happened to Freedom Forever?", section: "Bankruptcy reporting", summary: "Freedom Forever bankruptcy timeline and court record." },
  { href: "/cases/freedom-forever/warning-signs", title: "Freedom Forever bankruptcy warning signs", section: "Bankruptcy reporting", summary: "The public record preceding Freedom Forever's bankruptcy." },
  { href: "/guides", title: "Solar consumer help and guides", section: "Consumer help", summary: "Contracts, complaints, home improvement issues and official complaint resources." },
  { href: "/guides/massachusetts-solar-complaint", title: "How to file a solar complaint in Massachusetts", section: "Consumer help", summary: "Massachusetts Attorney General complaint process for Sunrun and other solar companies." },
  { href: "/guides/massachusetts-sunrun-complaint", title: "Massachusetts Sunrun complaint center", section: "Consumer help", summary: "Sunrun complaint filing routes in Massachusetts and the contract, production and permit records to gather." },
  { href: "/guides/massachusetts-30-day-demand-letter", title: "Massachusetts Chapter 93A 30-day demand letter", section: "Consumer help", summary: "Massachusetts consumer protection demand letters and solar disputes." },
  { href: "/guides/solar-complaint-record-checklist", title: "Solar complaint records checklist", section: "Consumer help", summary: "Documents and evidence to collect for a solar complaint." },
  { href: "/resources", title: "Solar consumer resources by state", section: "State resources", summary: "Browse solar consumer protection resources and complaint channels by state." },
  { href: "/federal-resources", title: "Federal solar consumer complaint resources", section: "Consumer help", summary: "Federal complaint channels, financing disputes and consumer fraud reporting." },
  { href: "/research", title: "SolarComplaint research archive", section: "Research", summary: "Browse original SolarComplaint investigative reporting and source documents." },
  { href: "/stories", title: "Latest SolarComplaint stories", section: "Latest stories", summary: "Chronological reporting, new investigations and settlement coverage." },
  { href: "/lawsuits-settlements", title: "Solar lawsuits and settlements", section: "Lawsuits & settlements", summary: "Sunrun settlement, state enforcement, court cases and consumer relief." },
  { href: "/updates", title: "Solar public record and news updates", section: "Updates", summary: "Recent SolarComplaint reporting and official-source updates." },
  ...states.filter(state => state.available).map(state => ({
    href: `/states/${stateSlug(state.name)}`,
    title: `${state.name} solar complaints and consumer resources`,
    section: "State resources",
    summary: `Find ${state.name} Attorney General, solar consumer complaints, utility, contractor and public records resources.`,
  })),
];

const searchPages: SiteSearchResult[] = [
  ...editorialStories.map(story => ({
    href: story.href,
    title: story.title,
    summary: story.summary,
    section: story.section,
    date: story.date,
  })),
  ...directoryPages,
];

export function searchSiteContent(query: string): SiteSearchResult[] {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!terms.length) return [];
  const unique = new Set<string>();
  return searchPages.filter(page => {
    if (unique.has(page.href)) return false;
    const text = [page.title, page.summary, page.section].join(" ").toLowerCase();
    if (!terms.every(term => text.includes(term))) return false;
    unique.add(page.href);
    return true;
  });
}
