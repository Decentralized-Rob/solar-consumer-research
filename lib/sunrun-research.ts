export type SunrunResearchCategory =
  | "litigation"
  | "enforcement"
  | "consumer-issues"
  | "sales-marketing"
  | "governance"
  | "sources";

export type SunrunResearchItem = {
  slug: string;
  title: string;
  category: SunrunResearchCategory;
  status: string;
  jurisdiction?: string;
  date: string;
  summary: string;
  sourceUrl: string;
  sourceLabel: string;
  sourceType: "court" | "government" | "company" | "secondary";
  topics: string[];
};

export const sunrunResearchItems: SunrunResearchItem[] = [
  {
    slug: "texas-residential-solar-investigation-2026",
    title: "Texas residential solar investigation involving Sunrun",
    category: "enforcement",
    status: "Investigation",
    jurisdiction: "Texas",
    date: "2026-04-03",
    summary:
      "Texas issued Civil Investigative Demands to Sunrun and other companies while examining possible misrepresentations involving electric-bill savings, system performance, equipment, company terms and policies, warranties, service plans, marketing materials and contracts. An investigation is not a finding of wrongdoing.",
    sourceUrl: "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling",
    sourceLabel: "Texas Attorney General",
    sourceType: "government",
    topics: ["sales", "consumer-protection"],
  },
  {
    slug: "arizona-sunrun-vivint-settlement-2025",
    title: "Arizona settlement with Sunrun and Vivint Solar",
    category: "enforcement",
    status: "Settlement",
    jurisdiction: "Arizona",
    date: "2025-05-22",
    summary:
      "Arizona resolved allegations concerning solar sales practices through a court-approved agreement that includes consumer-relief and complaint-handling requirements. Sunrun and Vivint Solar denied the allegations, and the agreement is not an admission of wrongdoing.",
    sourceUrl: "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf",
    sourceLabel: "Arizona stipulated consent agreement",
    sourceType: "government",
    topics: ["sales", "complaint-handling"],
  },
  {
    slug: "connecticut-attorney-general-sunrun-lawsuit",
    title: "Connecticut Attorney General lawsuit naming Sunrun",
    category: "enforcement",
    status: "Lawsuit",
    jurisdiction: "Connecticut",
    date: "2024-07-19",
    summary:
      "Connecticut alleges unlawful residential-solar sales conduct involving contracts, signatures, permits, and non-functioning systems. The allegations remain allegations unless established through the court process.",
    sourceUrl: "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun",
    sourceLabel: "Connecticut Attorney General",
    sourceType: "government",
    topics: ["sales", "signatures", "contracts", "service"],
  },
  {
    slug: "lopresti-v-sunrun",
    title: "LoPresti v. Sunrun, Inc.",
    category: "litigation",
    status: "Active · tracking",
    jurisdiction: "N.D. California",
    date: "2025-01-15",
    summary:
      "Proposed TCPA class action concerning Sunrun telemarketing. The matter is being tracked as a sales-and-marketing case, not as a solar installation or service dispute.",
    sourceUrl: "https://dockets.justia.com/docket/california/candce/4%3A2025cv00517/442809",
    sourceLabel: "Federal docket index",
    sourceType: "secondary",
    topics: ["telemarketing", "TCPA", "sales"],
  },
  {
    slug: "strickland-v-sunrun",
    title: "Strickland v. Sunrun, Inc.",
    category: "litigation",
    status: "Active · tracking",
    jurisdiction: "N.D. California",
    date: "2023-10-01",
    summary:
      "Proposed TCPA class action concerning Sunrun marketing calls and related telemarketing practices. It is the older matter to which multiple later Sunrun TCPA cases have been linked or compared.",
    sourceUrl: "https://dockets.justia.com/docket/california/candce/5%3A2023cv05034/418865",
    sourceLabel: "Federal docket index",
    sourceType: "secondary",
    topics: ["telemarketing", "TCPA", "sales"],
  },
];

export const sunrunResearchTopics = [
  "Roofing",
  "Sales",
  "Signatures",
  "Service",
  "Billing",
  "Collections",
  "Transfers",
  "Financing",
  "Telemarketing",
] as const;

export const sunrunResearchSections = [
  { key: "litigation", label: "Litigation", description: "Federal and state cases involving Sunrun." },
  { key: "enforcement", label: "Government Actions", description: "Investigations, enforcement actions and settlements." },
  { key: "consumer-issues", label: "Consumer Issues", description: "Research organized around the problems homeowners report." },
  { key: "sales-marketing", label: "Sales & Marketing", description: "Sales practices, representations and telemarketing records." },
  { key: "governance", label: "Policies & Governance", description: "Ethics, compliance and governance documents." },
  { key: "sources", label: "Source Library", description: "Court filings, government records and company documents." },
] as const;
