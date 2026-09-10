import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "About | Solar Consumer Research",
  description: "About Solar Consumer Research, an independent residential solar research and publishing project built around primary records.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About this project"
      title="Independent residential solar research."
      lede="Solar Consumer Research is an independent research and publishing project focused on the residential solar industry and the issues that affect homeowners."
    >
      <section className="info-section">
        <h2>What we publish</h2>
        <p>We publish source-backed research, reporting, analysis, commentary, practical consumer resources, and primary-source records. Coverage includes government enforcement, litigation, corporate policies, financing, complaint systems, and other documented residential-solar issues.</p>
      </section>
      <section className="info-section">
        <h2>How editorial work is labeled</h2>
        <p>Reporting describes sourced facts and developments. Analysis connects records and explains context. Commentary presents a clearly labeled author viewpoint. Factual claims remain tied to identifiable sources, and allegations, investigations, settlements, and findings are treated as different things.</p>
      </section>
      <section className="info-section">
        <h2>What it is independent from</h2>
        <p>The project is not a solar company, government agency, law firm, contractor directory, or paid referral network. It does not represent consumers or decide whether a person or company acted unlawfully. Companies cannot pay for placement or a preferred position.</p>
      </section>
      <section className="info-section">
        <h2>Current coverage</h2>
        <p>Every state has an official consumer-complaint starting point and a documented residential-solar reference. Some states, companies, and major cases have deeper research hubs. Coverage is expanded only after sources are individually reviewed.</p>
      </section>
      <section className="info-section">
        <h2>Editorial responsibility</h2>
        <p>Solar Consumer Research is independently operated. AI may assist with research and implementation, but source selection, editorial judgment, review, and publication remain human-owned. Published work is subject to the site’s methodology and correction process.</p>
      </section>
    </InfoPage>
  );
}
