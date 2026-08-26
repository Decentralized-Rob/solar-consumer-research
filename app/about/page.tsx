import { InfoPage } from "../../components/info-page";

export const metadata = {
  title: "About | Solar Consumer Research",
  description: "How Solar Consumer Research organizes verified public information for residential solar consumers.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  return (
    <InfoPage
      eyebrow="About this project"
      title="Public information, made usable."
      lede="Solar Consumer Research is being built for residential solar customers who are frustrated, stuck, or unable to get a clear answer."
    >
      <section className="info-section">
        <h2>What the site does</h2>
        <p>It organizes public resources, published procedures, complaint channels, and source-backed updates by state. Every listing points to the original publisher.</p>
      </section>
      <section className="info-section">
        <h2>What it is independent from</h2>
        <p>The project is not a solar company, government agency, law firm, contractor directory, or paid referral network. It does not represent consumers or decide whether a person or company acted unlawfully. Companies cannot pay for placement or a preferred position.</p>
      </section>
      <section className="info-section">
        <h2>Current coverage</h2>
        <p>Every state has an official consumer-complaint starting point and a documented residential-solar reference. Massachusetts currently has the broadest expanded source set. Other state pages are starting directories, not complete state research files; additional sources are added only after individual review.</p>
      </section>
      <section className="info-section">
        <h2>Editorial responsibility</h2>
        <p>Solar Consumer Research is independently operated. Before publication, the editor compares each summary with its cited material and maintains the site’s methodology and correction record.</p>
      </section>
    </InfoPage>
  );
}
