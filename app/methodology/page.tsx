import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "Methodology | Solar Consumer Research",
  description: "How Solar Consumer Research selects, verifies, labels, and maintains public-source information.",
  alternates: { canonical: "/methodology" },
  openGraph: { url: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <InfoPage
      eyebrow="Research methodology"
      title="How information is selected and verified."
      lede="The site is designed around original sources, clear labels, and visible verification dates."
    >
      <section className="info-section">
        <h2>Source priority</h2>
        <ul>
          <li>Government agencies, regulators, courts, and official state programs</li>
          <li>Original forms, rules, notices, enforcement records, and public guidance</li>
          <li>Clearly identified institutional complaint channels, such as BBB, when relevant</li>
        </ul>
      </section>
      <section className="info-section">
        <h2>Publication controls</h2>
        <p>Content moves through draft, review, and published states. A record must include its original URL, publisher, source type, state coverage, and last verification date before publication.</p>
      </section>
      <section className="info-section">
        <h2>How AI is used</h2>
        <p>AI may assist with finding, organizing, and drafting public-source research. A human editor reviews the original source, checks the published description against it, and decides whether the record is ready to publish. Unverified AI output is not treated as a source.</p>
      </section>
      <section className="info-section">
        <h2>What “verified” means</h2>
        <p>Verified means the linked source was checked and the site description was compared with what that source published on the listed date. It does not mean that an agency will accept a particular complaint or produce a particular result.</p>
      </section>
      <section className="info-section">
        <h2>Boundaries</h2>
        <p>The site reports and organizes public information. It does not evaluate personal claims, interpret contracts, calculate damages, recommend allegations, determine that conduct was unlawful, or predict what an agency or court may decide.</p>
      </section>
    </InfoPage>
  );
}
