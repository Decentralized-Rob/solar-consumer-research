import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../components/info-page";
import { stateSlug, states } from "../../lib/content";

export const metadata: Metadata = {
  title: "Official Solar Complaint Starting Points by State",
  description: "Browse an official consumer complaint starting point and a documented solar reference for each state. Coverage depth is clearly labeled and varies by state.",
  alternates: { canonical: "/resources" },
  openGraph: {
    title: "Official Solar Complaint Starting Points by State",
    description: "Official state complaint starting points and documented solar references, with expanded sources clearly labeled.",
    url: "/resources",
  },
};

export default function ResourcesPage() {
  const directorySchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Official solar complaint starting points by state",
    numberOfItems: states.length,
    itemListElement: states.map((state, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${state.name} official solar complaint route`,
      url: `https://solarcomplaint.com/states/${stateSlug(state.name)}`,
    })),
  };

  return (
    <InfoPage
      className="state-index-page"
      eyebrow="State resource directory"
      title="Official solar complaint starting points by state."
      lede="Each state page begins with an official consumer-protection route and a documented solar reference. Source depth is not uniform: Massachusetts has expanded resources, while other pages are clearly marked as starting directories until additional sources are individually reviewed."
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
            <small>Official route + documented reference</small>
            <b aria-hidden="true">→</b>
          </Link>
        ))}
      </div>
    </InfoPage>
  );
}
