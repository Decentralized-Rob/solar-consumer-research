import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { stateSlug, states } from "../../lib/content";

export const metadata: Metadata = {
  title: "Solar Complaints and Consumer Protection by State",
  description: "Find official solar complaint routes and verified residential solar lawsuits, settlements, investigations, and enforcement actions for all 50 states.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Solar Complaints and Consumer Protection by State",
    description: "Official complaint routes and verified residential-solar litigation and enforcement research for all 50 states.",
    url: "/resources",
  },
};

export default function ResourcesPage() {
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Residential solar complaint resources by state",
    numberOfItems: states.length,
    itemListElement: states.map((state, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${state.name} solar complaints and consumer protection`,
      url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
    })),
  };

  return (
    <InfoPage
      className="state-index-page"
      eyebrow="State resource directory"
      title="Solar complaint resources for every state."
      lede="Every state page now leads with the official consumer-protection complaint route and a verified residential-solar lawsuit, settlement, investigation, or enforcement action."
    >
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(directorySchema) }} />
      <section className="info-section">
        <h2>Federal complaint resources</h2>
        <p>Some financing, fraud, and consumer-protection concerns are handled through federal channels. <Link href="/federal-resources">Browse the federal resource page.</Link></p>
      </section>
      <div className="state-index-grid">
        {states.map((state) => (
          <Link href={`/states/${stateSlug(state.name)}`} key={state.code}>
            <span>{state.code}</span>
            <strong>{state.name}</strong>
            <small>Complaint route + case research</small>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}
