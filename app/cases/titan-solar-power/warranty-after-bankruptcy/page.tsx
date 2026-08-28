import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../../components/info-page";
import { stateSlug, states } from "../../../../lib/content";
import { titanStateBankruptcyByCode } from "../../../../lib/titan-state-research";

export const metadata: Metadata = {
  title: "Titan Solar Power Warranty After Bankruptcy: What Is Still Covered?",
  description: "Titan Solar Power is closed, but some manufacturer warranties may still apply. Check SolarEdge, Enphase and state-specific Titan bankruptcy resources.",
  alternates: { canonical: "/cases/titan-solar-power/warranty-after-bankruptcy" },
  openGraph: {
    title: "Titan Solar Power Warranty After Bankruptcy: What Is Still Covered?",
    description: "Titan is closed. Some equipment warranties may still apply. Start with the manufacturer and the official bankruptcy record.",
    url: "/cases/titan-solar-power/warranty-after-bankruptcy",
    type: "article",
  },
};

const titanStates = states.filter((state) => titanStateBankruptcyByCode[state.code]);

const schema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Titan Solar Power Warranty After Bankruptcy: What Is Still Covered?",
  description: "A source-backed guide to Titan Solar Power workmanship and manufacturer warranty questions after the company's Chapter 7 bankruptcy.",
  datePublished: "2026-08-28",
  dateModified: "2026-08-28",
  mainEntityOfPage: "https://solarcomplaint.com/cases/titan-solar-power/warranty-after-bankruptcy",
  author: { "@type": "Organization", name: "Solar Consumer Research" },
  publisher: { "@type": "Organization", name: "Solar Consumer Research" },
  citation: [
    "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates",
    "https://www.solaredge.com/us/support/system-owner/my-installer-went-out-of-business",
    "https://enphase.com/learn/home-energy/using-your-system/enphase-energy-system-warranties",
    "https://energyaid.net/titan-facts/",
  ],
};

export default function TitanWarrantyPage() {
  return (
    <InfoPage
      eyebrow="Titan Solar Power customer resource"
      title="Titan Solar Power Warranty After Bankruptcy: What Is Still Covered?"
      lede="Titan is no longer operating, but that does not automatically end a warranty issued by the company that made your inverter, microinverters, panels, or other equipment."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      <section className="info-section">
        <h2>What happened to Titan&apos;s workmanship warranty?</h2>
        <p>The U.S. Bankruptcy Court for the District of Arizona says Titan Solar Power is no longer operational and will not provide services to customers. EnergyAid says it did not acquire Titan or assume Titan&apos;s warranties or liabilities.</p>
        <p><a href="https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates" target="_blank" rel="noreferrer">U.S. Bankruptcy Court: Titan Solar Power case hub ↗</a></p>
        <p><a href="https://energyaid.net/titan-solar-power-is-out-of-business/" target="_blank" rel="noreferrer">EnergyAid: Titan customer FAQ ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Are Titan solar equipment warranties still valid?</h2>
        <p>They may be. Manufacturer coverage is separate from Titan&apos;s own service or workmanship obligations. Coverage depends on the manufacturer, component, installation date, and warranty terms.</p>
      </section>

      <section className="info-section">
        <h2>SolarEdge equipment</h2>
        <p>SolarEdge tells system owners whose installer went out of business that certain components may still be covered under warranty. It also provides a path to find another installer and request a system health check.</p>
        <p><a href="https://www.solaredge.com/us/support/system-owner/my-installer-went-out-of-business" target="_blank" rel="noreferrer">SolarEdge: My installer went out of business ↗</a></p>
        <p><a href="https://www.solaredge.com/us/support/system-owner/i-have-a-warranty-question" target="_blank" rel="noreferrer">SolarEdge warranty support ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Enphase equipment</h2>
        <p>Enphase says that if the installer has gone out of business, Enphase warranties still cover applicable Enphase components. Homeowners can also review product-specific warranty terms through Enphase.</p>
        <p><a href="https://enphase.com/learn/home-energy/using-your-system/enphase-energy-system-warranties" target="_blank" rel="noreferrer">Enphase: Energy System warranties ↗</a></p>
        <p><a href="https://enphase.com/warranty/us" target="_blank" rel="noreferrer">Enphase U.S. warranty terms ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Before paying to “reinstate” a warranty</h2>
        <p>EnergyAid says a manufacturer warranty that is still valid does not need to be reinstated. Check directly with the equipment manufacturer before paying another company for a claimed warranty reinstatement.</p>
        <p><a href="https://energyaid.net/titan-facts/" target="_blank" rel="noreferrer">EnergyAid: Titan manufacturer warranty Q&amp;A ↗</a></p>
      </section>

      <section className="info-section">
        <h2>Find Titan Solar Power resources for your state</h2>
        <p>The bankruptcy court lists state-named Titan affiliates in the states below. Each link opens that state&apos;s consumer resource page, including the official complaint route and other reviewed state sources.</p>
        <div className="state-page-links">
          {titanStates.map((state) => (
            <Link href={`/states/${stateSlug(state.name)}`} key={state.code}>{state.name} Titan resources →</Link>
          ))}
        </div>
      </section>

      <div className="state-page-links">
        <Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy and closure tracker →</Link>
        <Link href="/cases/titan-solar-power/customer-help">Titan customer research paths →</Link>
      </div>
    </InfoPage>
  );
}
