import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "Disclaimer | Solar Consumer Research",
  description: "General-information limits for Solar Consumer Research and its public-source summaries.",
  alternates: { canonical: "/disclaimer" },
  openGraph: { url: "/disclaimer" },
};

export default function DisclaimerPage() {
  return (
    <InfoPage
      eyebrow="Disclaimer"
      title="General public information only."
      lede="Solar Consumer Research organizes links, procedures, and summaries from public sources. It is not a substitute for advice about a specific situation."
      showLegalNotice={false}
    >
      <section className="info-section">
        <h2>No legal advice or representation</h2>
        <p>This site is not a law firm and does not provide legal advice, legal representation, contract interpretation, or case evaluation. Using the site, submitting a question, or receiving a research response does not create an attorney-client or other professional relationship.</p>
      </section>
      <section className="info-section">
        <h2>No findings or legal conclusions</h2>
        <p>The site does not determine whether any person or company violated a law, regulation, contract, or duty. A link to a complaint or reporting channel does not mean that a complaint is valid, that wrongdoing occurred, or that an agency will accept or act on a submission.</p>
      </section>
      <section className="info-section">
        <h2>Sources can change</h2>
        <p>Summaries are provided for convenience and may become incomplete or outdated. The linked publisher controls the underlying information. Users should review the original source and confirm current forms, requirements, deadlines, and agency jurisdiction directly with the publisher.</p>
      </section>
      <section className="info-section">
        <h2>Outside links and professional help</h2>
        <p>Links are provided as research references and do not imply endorsement. Anyone who needs advice about legal rights, deadlines, contracts, possible claims, or a specific dispute should consult a qualified attorney or the appropriate agency.</p>
      </section>
    </InfoPage>
  );
}
