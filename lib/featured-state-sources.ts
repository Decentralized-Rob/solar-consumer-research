export type FeaturedStateSource = {
  id: string;
  title: string;
  summary: string;
  publisher: string;
  url: string;
  sourceType: "complaint" | "investigation" | "consent agreement";
  publishedAt: string;
  datePublished: string;
};

export const featuredStateSources: Record<string, FeaturedStateSource[]> = {
  MI: [
    {
      id: "mi-climax-solar-complaint-2026",
      title: "Michigan Attorney General complaint against Climax Solar and finance defendants",
      summary: "The July 2026 complaint alleges deceptive solar sales, project failures, financing-related conduct, and continued collection or enforcement activity after some consumers reported seller misconduct, nonperformance, disputed signatures, or cancellation problems. The allegations remain pending unless resolved by the court.",
      publisher: "Michigan Attorney General",
      url: "https://www.michigan.gov/ag/-/media/Project/Websites/AG/releases/2026/July/Climax-Solar-Complaint.pdf?hash=499D78836F9C8FE29B907417731C0A09&rev=1c5d940c03144b9f990e609c5f724fc5",
      sourceType: "complaint",
      publishedAt: "Jul 15, 2026",
      datePublished: "2026-07-15",
    },
  ],
  TX: [
    {
      id: "tx-sunrun-solar-investigation-2026",
      title: "Texas Attorney General residential solar investigation involving Sunrun",
      summary: "The April 2026 announcement says Texas issued Civil Investigative Demands to Sunrun and other companies while examining possible misrepresentations involving electric-bill savings, system performance, equipment, company terms and policies, warranties, service plans, marketing materials, and contracts. An investigation is not a finding of wrongdoing.",
      publisher: "Texas Attorney General",
      url: "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling",
      sourceType: "investigation",
      publishedAt: "Apr 3, 2026",
      datePublished: "2026-04-03",
    },
  ],
  AZ: [
    {
      id: "az-sunrun-consent-agreement-2025",
      title: "Arizona stipulated consent agreement with Sunrun and Vivint Solar",
      summary: "The May 2025 court-approved agreement resolves Arizona allegations concerning solar sales practices and includes consumer-relief and complaint-handling requirements. Sunrun and Vivint Solar denied the allegations, and the agreement is not an admission of wrongdoing.",
      publisher: "Arizona Attorney General",
      url: "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf",
      sourceType: "consent agreement",
      publishedAt: "May 22, 2025",
      datePublished: "2025-05-22",
    },
  ],
};
