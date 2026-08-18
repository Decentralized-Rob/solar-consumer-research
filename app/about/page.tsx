import { InfoPage } from "../../components/info-page";

export const metadata = { title: "About | Solar Consumer Research" };

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
        <p>Massachusetts is the first active state. Federal resources are included when they apply nationally. Additional states will be added after their source records have been reviewed.</p>
      </section>
    </InfoPage>
  );
}
