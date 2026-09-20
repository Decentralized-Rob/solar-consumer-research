import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-parra-roof-arbitration",
  slug: "sunrun-parra-roof-arbitration",
  href: "/research/sunrun-parra-roof-arbitration",
  title: "Sunrun Prepped His Roof for Solar. The Panels Never Came.",
  deck: "A California homeowner says Sunrun roof-preparation work led to water intrusion before panels were installed. His Sunrun claims remain in Los Angeles Superior Court while a Sept. 16 tentative ruling would send his separate Tesla claims to arbitration.",
  summary: "Leonardo Parra alleges separate Sunrun and Tesla solar projects caused separate roof leaks. His Sunrun claims remain in Los Angeles Superior Court; a Sept. 16 tentative ruling would send the Tesla claims to arbitration.",
  seoTitle: "Sunrun Roof Lawsuit: Parra v. Tesla Solar Case Explained",
  seoDescription: "Parra v. Tesla involves alleged roof leaks after separate Sunrun and Tesla solar projects. Sunrun remains in court while Tesla may head to arbitration.",
  socialDescription: "One homeowner, two solar projects and two alleged roof leaks. Sunrun remains in court while a tentative ruling would send the Tesla claims to arbitration.",
  twitterDescription: "Parra alleges separate roof leaks after Sunrun and Tesla solar projects. Sunrun remains in court; Tesla may head to arbitration.",
  lede: "A California homeowner who says Sunrun's preparation work allowed water into his roof is still pursuing his claims against the solar company in Los Angeles Superior Court. The same homeowner later installed solar with Tesla and alleged another roof leak, but that dispute may be headed to arbitration.",
  publishedAt: "September 19, 2026",
  datePublished: "2026-09-19",
  dateModified: "2026-09-20",
  stateCodes: ["CA"],
  companies: ["Sunrun", "Tesla", "Bumble Roofing"],
  topics: ["Sunrun lawsuit", "solar roof damage", "solar arbitration", "California solar", "residential solar installation"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Short Read",
  featured: true,
} satisfies ResearchStory;

const ruling = "https://www.decisiondepot.legal/cases/308340";
const laCourtCivilIndex = "https://www.lacourt.org/paos/v2/CivilIndex/";
const contractsResearch = "/research/sunrun-25-year-solar-contracts";
const sunrunHub = "/companies/sunrun";

export const articleConfig = {
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun roof lawsuit",
  imageAlt: "SolarComplaint.com research on the Parra v. Tesla and Sunrun solar roof dispute",
  mentions: [
    { "@type": "Organization" as const, name: "Sunrun" },
    { "@type": "Organization" as const, name: "Tesla" },
    { "@type": "Organization" as const, name: "LA Roofing & Builder Group Inc. dba Bumble Roofing" },
    { "@type": "AdministrativeArea" as const, name: "California" },
  ],
  sources: [
    { name: "Los Angeles Superior Court Civil Case Index", url: laCourtCivilIndex, publisher: "Superior Court of California, County of Los Angeles" },
    { name: "September 16, 2026 tentative ruling in Parra v. Tesla, case 25VECV02844", url: ruling, datePublished: "2026-09-16" },
  ],
};

export function SunrunParraRoofArbitrationBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href={sunrunHub}>Sunrun</Link><span aria-current="page">Parra roof case</span></nav>

    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section">
      <p>A California homeowner who says Sunrun&apos;s preparation work allowed water into his roof is still pursuing his claims against the solar company in Los Angeles Superior Court. The same homeowner later installed solar with Tesla and alleged another roof leak, but that dispute may be headed somewhere else: arbitration.</p>

      <p>Leonardo Parra&apos;s lawsuit offers an unusual look at what happens when two solar projects, two sets of contracts and alleged damage to the same house collide in one court case. According to a <a href={ruling} target="_blank" rel="noreferrer">Sept. 16 tentative ruling ↗</a>, Sunrun prepared Parra&apos;s roof for solar in 2022 but never installed the panels. Parra alleges the work left the roof&apos;s ridge line unsealed and allowed water into the house. About a month later, he signed a solar agreement with Tesla. Tesla installed its system, but Parra alleges that project was followed by another water intrusion in fall 2023, this time around holes or bolts connecting the panels to the roof. He says the second leak damaged new wood flooring, ceilings, carpets and furniture.</p>

      <p>Parra eventually sued Tesla, Sunrun, Sunrun Installation Services and LA Roofing &amp; Builder Group, which does business as Bumble Roofing. The case is <a href={laCourtCivilIndex} target="_blank" rel="noreferrer"><em>Parra v. Tesla</em>, Los Angeles Superior Court case 25VECV02844 ↗</a>. The allegations have not been proven, and the court has not decided who, if anyone, is responsible for the alleged roof damage.</p>
    </section>

    <section className="info-section">
      <h2>Tesla gets arbitration. Sunrun doesn&apos;t.</h2>

      <p>Before the court reaches the alleged roof damage, it has had to sort out another question: where should Parra&apos;s claims be heard? Tesla asked the court to enforce the arbitration provision in its January 24, 2023 agreement with Parra. In the <a href={ruling} target="_blank" rel="noreferrer">Sept. 16 tentative ruling ↗</a>, the court agreed. If finalized, Parra&apos;s claims against Tesla would go to arbitration and that part of the lawsuit would be stayed.</p>

      <p>Sunrun also tried to use Tesla&apos;s arbitration motion, but there was a basic problem. Sunrun was not a party to Tesla&apos;s agreement with Parra. The court allowed Sunrun to join Tesla&apos;s request procedurally, but found that Tesla&apos;s arbitration provision could not be used to move Parra&apos;s claims against Sunrun out of court. The ruling also says the court had previously denied an arbitration motion brought by Sunrun and Bumble Roofing. As the available ruling puts it, the action against Sunrun is not stayed.</p>

      <p>Tesla argued that allowing the claims to proceed in different places could produce conflicting rulings. The court found the two projects different enough to separate them. Parra&apos;s allegations against Sunrun concern roof preparation in 2022, including an allegedly unsealed ridge line before panels were ever installed. His allegations against Tesla concern panel attachment points and a separate water intrusion roughly nine months later.</p>

      <p>That leaves an unusual split. The Sept. 16 ruling would send the Tesla dispute to arbitration while the Sunrun portion of the lawsuit remains in Los Angeles Superior Court. It did not decide who damaged Parra&apos;s roof or whether any defendant is liable. One qualification matters: the publicly available ruling is labeled tentative. SolarComplaint has not located a final minute order adopting it, so we are not treating the Tesla arbitration decision as final.</p>
    </section>

    <section className="info-section">
      <h2>One roof, more than one agreement</h2>

      <p>The useful part for homeowners is not a prediction about who will win. It is what happened when the court had to untangle two solar projects on the same house. The companies were different, the contracts were different, the work was different and the alleged damage was different. Those distinctions mattered because Tesla had an arbitration agreement with Parra, while Sunrun could not use Tesla&apos;s agreement to move Parra&apos;s Sunrun claims out of court.</p>

      <p>SolarComplaint has been tracking <Link href={contractsResearch}>Sunrun&apos;s 25-year solar agreements and arbitration-related contract issues</Link> because the paperwork can matter long after the sales conversation ends. Parra&apos;s case shows another side of that problem. When several companies touch a solar project, who signed which agreement can determine something as basic as where a dispute gets heard.</p>
    </section>

    <section className="info-section">
      <h2>Sources</h2>
      <p><strong>Los Angeles Superior Court.</strong> <a href={laCourtCivilIndex} target="_blank" rel="noreferrer">Civil Case Index ↗</a>. Search case 25VECV02844, <em>Parra v. Tesla</em>.</p>
      <p><strong>Los Angeles Superior Court, Sept. 16, 2026.</strong> <a href={ruling} target="_blank" rel="noreferrer">Readable reproduction of the tentative ruling indexed by DecisionDepot ↗</a>. It would grant Tesla&apos;s motion to compel arbitration while declining to apply Tesla&apos;s arbitration agreement to Sunrun. SolarComplaint searched publicly available sources for a final minute order and did not locate one as of Sept. 20.</p>
    </section>

    <section className="info-section">
      <h2>Continue researching Sunrun</h2>
      <p><Link href={sunrunHub}>Sunrun lawsuits, investigations and consumer resources →</Link><br/><Link href={contractsResearch}>Sunrun&apos;s 25-year solar contracts →</Link><br/><Link href="/research/sunrun-home-depot-sales-home-visit">Sunrun at Home Depot: shopper says store pitch followed him home →</Link></p>
    </section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunParraRoofArbitrationBody });
