import type { Metadata } from "next";
import Link from "next/link";
import styles from "./sunrun-research.module.css";
import {
  sunrunResearchItems,
  sunrunResearchSections,
  sunrunResearchTopics,
} from "../../lib/sunrun-research";

const canonicalUrl = "https://solarcomplaint.com/sunrun";

export const metadata: Metadata = {
  title: "Sunrun Research Center | Solar Consumer Research",
  description:
    "Independent, source-backed research on Sunrun litigation, government enforcement, consumer issues, sales practices, corporate policies and public records.",
  alternates: { canonical: "/sunrun" },
  openGraph: {
    title: "Sunrun Research Center | Solar Consumer Research",
    description:
      "Independent research on Sunrun litigation, enforcement, consumer issues and primary-source records.",
    url: canonicalUrl,
    type: "website",
  },
};

const latestItems = [...sunrunResearchItems].sort((a, b) => b.date.localeCompare(a.date));
const litigationCount = sunrunResearchItems.filter((item) => item.category === "litigation").length;
const enforcementCount = sunrunResearchItems.filter((item) => item.category === "enforcement").length;
const sourceCount = new Set(sunrunResearchItems.map((item) => item.sourceUrl)).size;

export default function SunrunResearchCenterPage() {
  return (
    <main className={styles.page}>
      <header className={styles.hero}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <span aria-current="page">Sunrun</span>
        </nav>
        <p className={styles.eyebrow}>Independent research by Solar Consumer Research</p>
        <h1>Sunrun Research Center</h1>
        <p className={styles.lede}>
          Primary-source research on Sunrun litigation, government enforcement, consumer issues,
          sales practices and corporate records.
        </p>
        <form className={styles.search} action="/search" method="get" role="search">
          <label className="sr-only" htmlFor="sunrun-search">Search Sunrun research</label>
          <input id="sunrun-search" name="q" type="search" placeholder="Search Sunrun research" />
          <button type="submit">Search</button>
        </form>
        <div className={styles.stats} aria-label="Research center status">
          <span><strong>{litigationCount}</strong> tracked cases</span>
          <span><strong>{enforcementCount}</strong> government actions</span>
          <span><strong>{sourceCount}</strong> indexed sources</span>
          <span><strong>Sep 10</strong> updated</span>
        </div>
      </header>

      <section className={styles.section} aria-labelledby="browse-title">
        <div className={styles.sectionHeading}>
          <p>Browse</p>
          <h2 id="browse-title">Research by record type</h2>
        </div>
        <div className={styles.sectionGrid}>
          {sunrunResearchSections.map((section) => (
            <article className={styles.sectionCard} key={section.key}>
              <h3>{section.label}</h3>
              <p>{section.description}</p>
              <span>Explore →</span>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="latest-title">
        <div className={styles.sectionHeading}>
          <p>Current record</p>
          <h2 id="latest-title">Latest Sunrun developments</h2>
        </div>
        <div className={styles.feed}>
          {latestItems.map((item) => (
            <article className={styles.feedCard} key={item.slug}>
              <div className={styles.feedMeta}>
                <span>{item.category.replace("-", " ")}</span>
                <time dateTime={item.date}>{formatDate(item.date)}</time>
              </div>
              <h3>{item.title}</h3>
              <p>{item.summary}</p>
              <div className={styles.tags} aria-label="Topics">
                {item.topics.map((topic) => <span key={topic}>{topic}</span>)}
              </div>
              <div className={styles.feedFooter}>
                <span>{item.status}{item.jurisdiction ? ` · ${item.jurisdiction}` : ""}</span>
                <a href={item.sourceUrl} target="_blank" rel="noreferrer">Open source ↗</a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="issues-title">
        <div className={styles.sectionHeading}>
          <p>Homeowner topics</p>
          <h2 id="issues-title">Research by consumer issue</h2>
        </div>
        <div className={styles.topicScroller}>
          {sunrunResearchTopics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </section>

      <section className={styles.note}>
        <h2>Research standard</h2>
        <p>
          Court allegations are not findings of wrongdoing. Investigations are not findings. Each
          record should identify its procedural status, source type and last verification date.
          Primary government, court and company documents are prioritized over secondary coverage.
        </p>
        <Link href="/methodology">Read the methodology →</Link>
      </section>

      <nav className={styles.mobileNav} aria-label="Sunrun Research Center">
        <a href="#latest-title">Latest</a>
        <a href="#issues-title">Issues</a>
        <a href="#browse-title">Browse</a>
        <Link href="/search">Search</Link>
      </nav>
    </main>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}
