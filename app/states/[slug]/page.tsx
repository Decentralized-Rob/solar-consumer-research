import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArizonaResourcePage } from "../../../components/arizona-resource-page";
import { StateResourcePage } from "../../../components/state-resource-page";
import { stateSlug, states } from "../../../lib/content";
import { consumerProtectionByState, getStateSolarCase } from "../../../lib/state-research";
import { getTitanStateBankruptcy } from "../../../lib/titan-state-research";

export function generateStaticParams() {
  return states.map((state) => ({ slug: stateSlug(state.name) }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const state = states.find((item) => stateSlug(item.name) === slug);
  if (!state) return {};

  if (state.code === "AZ") {
    const title = "Arizona Solar Complaints: Sunrun Settlement & State Rules";
    const description = "Arizona solar complaint routes, Sunrun and Vivint Solar settlement terms, contractor complaints, contract disclosures, warranty rules, interconnection and official state sources.";
    return {
      title,
      description,
      keywords: [
        "Arizona solar complaints",
        "Sunrun Arizona settlement",
        "Arizona solar consumer protection",
        "Arizona solar contract cancellation",
        "Arizona solar contractor complaint",
        "Arizona solar warranty law",
        "Arizona rooftop solar",
      ],
      alternates: { canonical: "/states/arizona" },
      openGraph: {
        title,
        description,
        url: "/states/arizona",
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

  const complaintRoute = consumerProtectionByState[state.code];
  const caseReference = getStateSolarCase(state.code);
  const titanReference = getTitanStateBankruptcy(state.code);
  const title = `${complaintRoute.title} | Solar Consumer Research`;
  const description = [
    complaintRoute.summary,
    caseReference ? `This directory also links to a documented ${caseReference.caseType} reference.` : "",
    titanReference ? `Titan Solar Power bankruptcy and warranty resources are included for ${state.name}.` : "",
  ].filter(Boolean).join(" ");
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
  if (state.code === "AZ") return <ArizonaResourcePage />;
  return <StateResourcePage state={state} />;
}