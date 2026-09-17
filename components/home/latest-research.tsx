import { researchStories } from "../../lib/research-stories";
import styles from "./latest-research.module.css";

export function LatestResearchSection() {
  const stories = researchStories.slice(0, 3);

  return (
    <section className={`home-wrap ${styles.section}`} aria-labelledby="latest-research-title">
      <div className={styles.heading}>
        <span aria-hidden="true" />
        <div>
          <h1 id="latest-research-title">Latest solar research</h1>
          <p>The homeowner’s guide to residential solar.</p>
        </div>
      </div>
      <div className={styles.list}>
        {stories.map((story, index) => (
          <article className={styles.story} key={story.id}>
            <p className={styles.label}>{index === 0 ? "Short read" : "Research"}</p>
            <h2><a href={story.href}>{story.title}</a></h2>
            <p>{story.summary}</p>
            <a className={styles.link} href={story.href}>Read →</a>
          </article>
        ))}
      </div>
    </section>
  );
}
