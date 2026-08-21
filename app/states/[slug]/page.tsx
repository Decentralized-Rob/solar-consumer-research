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
  const title = `${state.name} Solar Complaints & Lawsuits`;
  const description = `Official ${state.name} solar complaint contacts plus verified residential solar lawsuits, settlements, investigations, and enforcement actions for homeowners.`;
  return {
    title,
    description,
    keywords: [
      `${state.name} solar complaint`,
      `${state.name} solar company complaints`,
      `${state.name} solar lawsuit`,
      `${state.name} consumer protection`,
      "Sunrun complaint",
      "residential solar consumer rights",
    ],
    alternates: { canonical: `/states/${slug}` },
    openGraph: {
      title,
      description,
      url: `/states/${slug}`,
      type: "article",
      images: [],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [],
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
