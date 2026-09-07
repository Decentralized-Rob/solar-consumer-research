import Link from "next/link";
import styles from "./sunrun-ethics-spotlight.module.css";

type SunrunEthicsSpotlightProps = {
  variant?: "feature" | "compact";
  context?: string;
};

export function SunrunEthicsSpotlight({
  variant = "compact",
  context = "New research guide",
}: SunrunEthicsSpotlightProps) {
  return (
    <aside
      className={`${styles.spotlight} ${variant === "feature" ? styles.feature : styles.compact}`}
      aria-label="Featured Sunrun ethics and compliance research"
    >
      <div className={styles.meta}>
        <span className={styles.badge}>New</span>
        <span>{context}</span>
      </div>
      <div className={styles.body}>
        <div>
          <h2>Sunrun Ethics &amp; Compliance</h2>
          <p>
            How to report a concern through AllVoices, review Sunrun&apos;s current public ethics and vendor policies,
            and understand where an ethics report fits alongside other consumer complaint routes.
          </p>
        </div>
        <Link className={styles.cta} href="/companies/sunrun/ethics-compliance">
          Read the guide <span aria-hidden="true">→</span>
        </Link>
      </div>
      {variant === "feature" ? (
        <div className={styles.sources} aria-label="Guide coverage">
          <span>AllVoices</span>
          <span>Code of Conduct</span>
          <span>Whistleblower Policy</span>
          <span>Vendor Code</span>
        </div>
      ) : null}
    </aside>
  );
}
