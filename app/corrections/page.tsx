import { InfoPage } from "../../components/info-page";
import Link from "next/link";

export const metadata = {
  title: "Corrections | Solar Consumer Research",
  description: "How to report an outdated link, inaccurate description, or newer official source.",
  alternates: { canonical: "/corrections" },
  openGraph: { url: "/corrections" },
};

export default function CorrectionsPage() {
  return (
    <InfoPage
      eyebrow="Corrections"
      title="The record should be traceable and correctable."
      lede="Sources change. Links move. Agencies update their procedures. Corrections are part of maintaining a useful research library."
    >
      <section className="info-section">
        <h2>What can be corrected</h2>
        <ul>
          <li>A broken or outdated source link</li>
          <li>An inaccurate description of a published process</li>
          <li>An incorrect publisher, source type, state, or verification date</li>
          <li>A newer official source that replaces an older record</li>
        </ul>
      </section>
      <section className="info-section">
        <h2>How corrections are handled</h2>
        <p>The original source is checked first. Material changes are reviewed before republication, and outdated records may be archived rather than silently rewritten.</p>
      </section>
      <section className="info-section">
        <h2>Submit a correction</h2>
        <p>For a public-source correction or website issue, read the <a href="https://github.com/Decentralized-Rob/solar-consumer-research/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">public contribution process on GitHub</a>. For an individual situation, use the <Link href="/#questions">private question form</Link> and begin the message with “Correction request.” Include the page title and the original source supporting the correction. Do not include sensitive personal information.</p>
      </section>
    </InfoPage>
  );
}
