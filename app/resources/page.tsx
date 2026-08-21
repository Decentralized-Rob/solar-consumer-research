import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { stateSlug, states } from "../../lib/content";

export const metadata: Metadata = {
  title: "Solar Consumer Resources by State",
  description: "Find solar policies, programs, complaint resources, and verified consumer information for every U.S. state.",
  alternates: { canonical: "/resources" },
  openGraph: { url: "/resources" },
};

export default function ResourcesPage() {
  return (
    <InfoPage
      className="state-index-page"
      eyebrow="State resource directory"
      title="Solar resources for every state."
      lede="Every state page has a verified solar-specific starting point. States with expanded research include additional complaint, regulatory, records, and consumer-protection sources."
    >
      <section className="info-section">
        <h2>Federal complaint resources</h2>
        <p>Some financing, fraud, and consumer-protection concerns are handled through federal channels. <Link href="/federal-resources">Browse the federal resource page.</Link></p>
      </section>
      <div className="state-coverage-key" aria-label="Coverage labels">
        <span><b className="coverage-dot coverage-dot--expanded" /> Expanded research</span>
        <span><b className="coverage-dot" /> Verified starting point</span>
      </div>
      <div className="state-index-grid">
        {states.map((state) => (
          <Link href={`/states/${stateSlug(state.name)}`} key={state.code}>
            <span>{state.code}</span>
            <strong>{state.name}</strong>
            <small>{state.available ? "Expanded research" : "Verified solar source"}</small>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}
