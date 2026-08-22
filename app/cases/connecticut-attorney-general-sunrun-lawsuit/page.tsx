import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const officialSource = "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun";

export const metadata: Metadata = {
  title: "Connecticut Sunrun Lawsuit: What the Attorney General Alleges",
  description: "A plain-language summary of Connecticut's lawsuit against Sunrun and other solar companies, based on the Attorney General's official complaint announcement.",
  keywords: [
    "Sunrun lawsuit",
    "Connecticut Sunrun lawsuit",
    "solar contract forged signature",
    "solar consumer lawsuit",
    "residential solar complaint",
  ],
  alternates: { canonical: "/cases/connecticut-attorney-general-sunrun-lawsuit" },
  openGraph: {
    title: "What does Connecticut's lawsuit against Sunrun allege?",
    description: "A source-based summary of the Connecticut Attorney General's allegations involving residential solar contracts, signatures, permits, and non-functioning systems.",
    url: "/cases/connecticut-attorney-general-sunrun-lawsuit",
    type: "article",
  },
};

export default function ConnecticutSunrunCasePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "What does Connecticut's lawsuit against Sunrun allege?",
    description: "A source-based summary of Connecticut's lawsuit against Sunrun and other solar companies.",
    datePublished: "2024-07-19",
    dateModified: "2026-08-18",
    mainEntityOfPage: "https://solarcomplaint.com/cases/connecticut-attorney-general-sunrun-lawsuit",
    author: { "@type": "Organization", name: "Solar Consumer Research" },
    publisher: { "@type": "Organization", name: "Solar Consumer Research" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <InfoPage
        eyebrow="Connecticut solar case · Filed July 19, 2024"
        title="What does Connecticut's lawsuit against Sunrun allege?"
        lede="The Connecticut Attorney General filed a lawsuit naming Sunrun, two other solar companies, and two salespeople. This page summarizes the government's allegations using the official announcement as its source."
      >
        <nav className="case-question-links" aria-label="Questions answered on this page">
          <a href="#allegations">What does the complaint allege?</a>
          <a href="#named">Who is named in the lawsuit?</a>
          <a href="#requested">What did Connecticut ask the court to do?</a>
          <a href="#source">Where can I read the official source?</a>
        </nav>

        <section className="info-section case-notice">
          <strong>Important distinction</strong>
          <p>These are allegations in a government complaint. They are not findings by this site, and this summary does not state that a court has made a final decision.</p>
        </section>

        <section id="allegations" className="info-section">
          <h2>What does the complaint allege?</h2>
          <p>The Attorney General&apos;s announcement says the lawsuit alleges deceptive, unfair, and otherwise unlawful residential solar sales. The allegations include contracts entered without full and informed consent, impersonation of consumers, forged signatures, work performed without required permits, and systems that were installed but did not function.</p>
        </section>

        <section id="named" className="info-section">
          <h2>Who is named in the lawsuit?</h2>
          <p>The announcement names SunRun Inc., SunRun Installation Services, Bright Planet Solar, Elevate Solar Solutions, and two salespeople. The official source should be used for the complete description of the parties and allegations.</p>
        </section>

        <section id="requested" className="info-section">
          <h2>What did Connecticut ask the court to do?</h2>
          <p>According to the Attorney General, the complaint seeks consumer restitution, recovery of profits connected to the alleged conduct, civil penalties, and an order intended to stop further conduct described in the complaint.</p>
        </section>

        <section id="source" className="info-section">
          <h2>Where can I read the official source?</h2>
          <p><a href={officialSource} target="_blank" rel="noreferrer">Read the Connecticut Attorney General&apos;s lawsuit announcement and access the complaint →</a></p>
          <p>Publisher: Connecticut Attorney General&apos;s Office. Published July 19, 2024. Source last reviewed by this site August 18, 2026.</p>
        </section>

        <section className="info-section">
          <h2>Looking for Connecticut solar complaint resources?</h2>
          <p><Link href="/#start">Choose Connecticut on the homepage</Link> to view the state-specific resource collection.</p>
        </section>
      </InfoPage>
    </>
  );
}
