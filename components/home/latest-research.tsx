import { getLatestResearchStories } from "../../lib/research-stories";
import styles from "./latest-research.module.css";

export function LatestResearchSection() {
  const stories = getLatestResearchStories(3);

  return (
    <section className={`home-wrap ${styles.section}`} aria-label="Latest solar research">
      <div className={styles.heading}>
        <span aria-hidden="true" />
        <h1>The homeowner’s guide to residential solar.</h1>
      </div>
      <div className={styles.list}>
        {stories.map((story) => (
          <article className={styles.story} key={story.id}>
            <p className={styles.label}>{story.section ?? "Research"}</p>
            <h2><a href={story.href}>{story.title}</a></h2>
            <p>{story.summary}</p>
            <a className={styles.link} href={story.href}>Read →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
