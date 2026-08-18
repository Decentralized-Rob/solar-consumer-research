import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { StateResourcePage } from "../../../components/state-resource-page";
import { stateSlug, states } from "../../../lib/content";

export function generateStaticParams() {
  return states.map((state) => ({ slug: stateSlug(state.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const state = states.find((item) => stateSlug(item.name) === slug);
  if (!state) return {};
  return {
    title: `${state.name} Residential Solar Consumer Resources`,
    description: `Verified solar policies, programs, and consumer resources for residential solar customers in ${state.name}.`,
    alternates: { canonical: `/states/${slug}` },
  };
}

export default async function StatePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const state = states.find((item) => stateSlug(item.name) === slug);
  if (!state) notFound();
  return <StateResourcePage state={state} />;
}
