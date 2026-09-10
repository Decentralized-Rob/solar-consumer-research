import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "Disclaimer | Solar Consumer Research",
  description: "General-information limits for Solar Consumer Research reporting, analysis, commentary, and public-source research.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { url: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <InfoPage
      eyebrow="Disclaimer"
      title="Research and editorial information, not legal advice."
      lede="Solar Consumer Research publishes research, reporting, analysis, commentary, and consumer resources about residential solar. The site is for general informational purposes and is not a substitute for advice about a specific situation."
      showLegalNotice={false}
    >
      <section className="info-section">
        <h2>No legal advice or representation</h2>
        <p>This site is not a law firm and does not provide legal advice, legal representation, contract interpretation, or case evaluation. Using the site, submitting a question, or receiving a research response does not create an attorney-client or other professional relationship.</p>
      </section>
      <section className="info-section">
        <h2>Sources can change</h2>
        <p>Summaries and editorial references are provided for convenience and may become incomplete or outdated. The original publisher controls the underlying information. Users should review the cited source and confirm current forms, requirements, deadlines, and agency jurisdiction directly with the publisher when those details matter.</p>
      </section>
      <section className="info-section">
        <h2>Outside links and professional help</h2>
        <p>Links are provided as research references and do not imply endorsement. Anyone who needs advice about legal rights, deadlines, contracts, possible claims, or a specific dispute should consult a qualified attorney or the appropriate agency.</p>
      </section>
    </InfoPage>
  );
}
