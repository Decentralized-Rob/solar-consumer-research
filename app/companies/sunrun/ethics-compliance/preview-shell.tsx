import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "../../../../components/info-page";
import styles from "./sunrun-ethics.module.css";

const governanceUrl = "https://investors.sunrun.com/leadership-governance/governance-documents";
const allVoicesUrl = "https://sunrun.allvoices.co/";
const ethicsHotline = "866-602-6613";

export function SunrunEthicsWebsitePreview({ variant }: { variant: "a" | "b" }) {
  const isA = variant === "a";
  const image = isA ? "/sunrun/ethics-hero-option-a.svg" : "/sunrun/ethics-hero-option-b.svg";
  const label = isA ? "Preview A · Company watch" : "Preview B · Source dossier";

  return (
    <InfoPage
      className={styles.page}
      eyebrow="Company watch · Sunrun"
      title="Sunrun Ethics & Compliance"
      lede="How Sunrun says ethics concerns can be reported, what its current policies say, who leads the relevant functions, and what the public record shows."
    >
      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/">Home</Link>
        <Link href="/research">Research</Link>
        <Link href="/companies/sunrun">Sunrun</Link>
        <span aria-current="page">{label}</span>
      </nav>

      <div className={styles.publicationLine}>
        <strong>SolarComplaint.com Research Desk</strong>
        <span>Published September 6, 2026</span>
        <span>Last reviewed September 6, 2026</span>
      </div>
      <p className={styles.independenceNote}>
        SolarComplaint.com is an independent consumer research and editorial publication. It is not affiliated with, endorsed by or sponsored by Sunrun.
      </p>

      <figure style={{ margin: "28px 0 34px", overflow: "hidden", borderRadius: 22, border: "1px solid #d9d8cf", background: "#fffefa" }}>
        <Image
          src={image}
          alt={isA ? "Sunrun ethics company-watch editorial hero preview" : "Sunrun ethics source-dossier editorial hero preview"}
          width={1200}
          height={630}
          priority
          unoptimized
          style={{ width: "100%", height: "auto", display: "block" }}
        />
        <figcaption style={{ padding: "12px 16px", fontSize: 12, color: "#667067" }}>
          {label}. Review-only hero treatment. Sunrun is identified in editorial text; no Sunrun corporate logo is used.
        </figcaption>
      </figure>

      <div className={styles.jumpBar} aria-label="Page sections">
        <a href="#report">Report</a>
        <a href="#documents">Documents</a>
        <a href="#people">People</a>
        <a href="#latest">Latest</a>
      </div>

      <section className={styles.atGlance} aria-labelledby={`at-glance-${variant}`}>
        <div className={styles.sectionLabel}>At a glance</div>
        <h2 id={`at-glance-${variant}`}>Current ethics reporting information</h2>
        <div className={styles.factStrip}>
          <div><span>Reporting portal</span><strong>AllVoices</strong><a href={allVoicesUrl} target="_blank" rel="noreferrer">sunrun.allvoices.co ↗</a></div>
          <div><span>Ethics hotline</span><strong>{ethicsHotline}</strong><a href="tel:+18666026613">Call hotline</a></div>
          <div><span>Current policy set</span><strong>October 2025</strong><a href={governanceUrl} target="_blank" rel="noreferrer">Verify with Sunrun ↗</a></div>
        </div>
      </section>

      <section className="info-section" id="report">
        <div className={styles.sectionLabel}>Reporting guide</div>
        <h2>How to report a Sunrun ethics or compliance concern</h2>
        <p>Sunrun’s current Code of Business Conduct and Ethics and Whistleblower Policy identify AllVoices and an ethics hotline as reporting resources. These are different from ordinary customer-service channels.</p>
        <div className={styles.reportRow}>
          <div><h3>Use the current Sunrun reporting route</h3><p>Verify the live reporting information against Sunrun’s current governance materials before submitting.</p></div>
          <a className={styles.reportButton} href={allVoicesUrl} target="_blank" rel="noreferrer">Open Sunrun AllVoices ↗</a>
        </div>
      </section>

      <section className="info-section" id="documents">
        <div className={styles.sectionLabel}>Evidence</div>
        <h2>Source documents, not corporate branding</h2>
        <p>The finished page continues into Sunrun’s current Code of Business Conduct and Ethics, Whistleblower Policy, Vendor Code of Conduct, timeline, sourced leadership roles, related investigations, and state consumer resources.</p>
        <p><Link href="/companies/sunrun/ethics-compliance">Open the full working guide →</Link></p>
      </section>

      <section className="info-section" id="people">
        <div className={styles.sectionLabel}>People &amp; responsibilities</div>
        <h2>Current Sunrun leadership context</h2>
        <p>The working page currently covers Mary Powell, Jeanna Steele, Chance Allred, Paul Dickson and Patrick Kent using publicly documented company responsibilities. Individual inclusion is not an allegation about a consumer complaint.</p>
      </section>

      <section className="info-section" id="latest">
        <div className={styles.sectionLabel}>The latest</div>
        <h2>Built as an evolving company-watch page</h2>
        <p>The layout is designed to support new reporting, policy changes, enforcement records and editorial updates without turning the page into a static law-library article.</p>
      </section>
    </InfoPage>
  );
}
