import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "Methodology | Solar Consumer Research",
  description: "How Solar Consumer Research selects sources, verifies facts, and maintains published residential solar research.",
  alternates: { canonical: "/methodology" },
  openGraph: { url: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <InfoPage
      eyebrow="Research methodology"
      title="How information is selected, verified, and published."
      lede="The site is built around primary records, a clear source hierarchy, and review before publication."
    >
      <section className="info-section">
        <h2>Source priority</h2>
        <ul>
          <li>Government agencies, regulators, courts, statutes, regulations, filed complaints, orders, judgments, and official state programs</li>
          <li>Original forms, notices, enforcement records, licensing records, and public guidance from the responsible institution</li>
          <li>Company filings and statements when they are relevant and clearly identified as company material</li>
          <li>Independent reporting for context when it adds useful information without replacing the controlling primary record</li>
        </ul>
        <p>Facebook, Reddit, complaint sites, and other user-generated material may identify a topic worth researching, but they are not treated as proof of a public factual claim.</p>
      </section>
      <section className="info-section">
        <h2>Publication controls</h2>
        <p>Content moves through draft, review, and published states. Public-source material should include the original URL, publisher, source type, relevant jurisdiction or state coverage, and last verification date before publication.</p>
      </section>
      <section className="info-section">
        <h2>How AI is used</h2>
        <p>AI may help locate and organize public records or prepare a draft. Before anything is published, the editor reviews the underlying sources, checks factual claims against them, and decides whether the work meets the site’s standards. AI output is never used as evidence.</p>
      </section>
      <section className="info-section">
        <h2>What “verified” means</h2>
        <p>Verified means the cited source was checked and the site’s description or factual use of that source was compared with what the publisher made available on the listed date. It does not mean that an agency will accept a particular complaint or produce a particular result.</p>
      </section>
      <section className="info-section">
        <h2>Boundaries</h2>
        <p>The site publishes and analyzes public information. It does not evaluate personal claims, interpret contracts, calculate damages, recommend allegations, determine that conduct was unlawful, or predict what an agency or court may decide.</p>
      </section>
      <section className="info-section">
        <h2>Public source corrections</h2>
        <p>Public-source corrections and focused website improvements can be proposed through the <a href="https://github.com/Decentralized-Rob/solar-consumer-research/blob/main/CONTRIBUTING.md" target="_blank" rel="noreferrer">public contribution process on GitHub</a>. Individual situations belong in the private question form, not in a public issue or pull request.</p>
      </section>
    </InfoPage>
  );
}
