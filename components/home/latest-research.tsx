import Link from "next/link";
import { sunrunHub } from "../../lib/published-destinations";
import { getResearchStoriesForCompany } from "../../lib/research-stories";
import styles from "./latest-research.module.css";

export function LatestResearchSection() {
  const stories = getResearchStoriesForCompany("Sunrun").slice(0, 3);

  return (
    <section className={`home-wrap ${styles.section}`} aria-label="Latest solar research">
      <div className={styles.heading}>
        <span aria-hidden="true" />
        <h1>Sunrun research and consumer help</h1>
      </div>
      <nav className={styles.sunrunLinks} aria-label="Sunrun topics">
        <Link href={sunrunHub.href}>Lawsuits &amp; settlements</Link>
        <Link href={`${sunrunHub.href}#sunrun-contract`}>Contracts</Link>
        <Link href={`${sunrunHub.href}#sunrun-complaint-help`}>Complaint help</Link>
      </nav>
      <div className={styles.list}>
        {stories.map((story) => (
          <article className={styles.story} key={story.id}>
            <p className={styles.label}>{story.section ?? "Research"}</p>
            <h2><a href={story.href}>{story.title}</a></h2>
            <p>{story.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
