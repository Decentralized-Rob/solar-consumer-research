import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateResourcePage } from "../../../components/state-resource-page";
import { stateSlug, states } from "../../../lib/content";
import { consumerProtectionByState, getStateSolarCase } from "../../../lib/state-research";

export function generateStaticParams() {
  return states.map((state) => ({ slug: stateSlug(state.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const state = states.find((item) => stateSlug(item.name) === slug);
  if (!state) return {};
  const complaintRoute = consumerProtectionByState[state.code];
  const caseReference = getStateSolarCase(state.code);
  const title = `${complaintRoute.title} | Solar Consumer Research`;
  const description = caseReference
    ? `${complaintRoute.summary} This starting directory also links to a documented ${caseReference.caseType} reference.`
    : complaintRoute.summary;
  return {
    title,
    description,
    alternates: { canonical: `/states/${slug}` },
    openGraph: {
      title,
      description,
      url: `/states/${slug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
    robots: { index: true, follow: true },
  };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = states.find((item) => stateSlug(item.name) === slug);
  if (!state) notFound();
  return <StateResourcePage state={state} />;
}
