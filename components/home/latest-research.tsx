import Link from "next/link";
import { StoryThumbnail } from "../story-thumbnail";
import { getLatestEditorialStories } from "../../lib/editorial-directory";
import styles from "./latest-research.module.css";

export function LatestResearchSection() {
  const [lead, ...others] = getLatestEditorialStories(6);
  return (
    <section className={`home-wrap ${styles.section}`} aria-label="Latest stories">
      <div className="editorial-section-heading">
        <h1>Latest stories</h1>
        <Link href="/stories">All reporting</Link>
      </div>
      <div className={styles.topGrid}>
        <article className={styles.lead}>
          <Link className={styles.leadMedia} href={lead.href} aria-label={`Read: ${lead.title}`}><StoryThumbnail story={lead} priority /></Link>
          <p className={styles.label}>{lead.section} · <time dateTime={lead.date}>{lead.date}</time></p>
          <h2><Link href={lead.href}>{lead.title}</Link></h2>
          <p>{lead.summary}</p>
        </article>
        <aside className={styles.settlement}>
          <Link className={styles.settlementMedia} href="/cases/connecticut-attorney-general-sunrun-lawsuit" aria-label="Read the Connecticut Sunrun settlement"><StoryThumbnail story={{ title: "Connecticut Sunrun settlement", topics: ["attorney general"], section: "Lawsuits & settlements" }} /></Link>
          <p className={styles.label}>Connecticut · Attorney general settlement</p>
          <h2><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Sunrun Settlement: The Rejected Lease and Consumer Relief</Link></h2>
          <p>The lawsuit, disputed verification call, settlement terms and homeowner relief.</p>
          <Link href="/lawsuits-settlements">More lawsuits &amp; settlements</Link>
        </aside>
      </div>
      <div className={styles.latestGrid}>
        {others.map(story => <article key={story.href} className={styles.story}>
          <Link className={styles.storyMedia} href={story.href} aria-label={`Read: ${story.title}`}><StoryThumbnail story={story} /></Link>
          <div>
            <p className={styles.label}>{story.section} · <time dateTime={story.date}>{story.date}</time></p>
            <h2><Link href={story.href}>{story.title}</Link></h2>
            <p>{story.summary}</p>
          </div>
        </article>)}
      </div>
      <nav className={styles.quickLinks} aria-label="Explore reporting">
        <Link href="/companies/sunrun">Sunrun investigations</Link>
        <Link href="/lawsuits-settlements">Lawsuits &amp; settlements</Link>
        <Link href="/guides">Consumer help</Link>
        <Link href="/search">Search stories</Link>
      </nav>
    </section>
  );
}
