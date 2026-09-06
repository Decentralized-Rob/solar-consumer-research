import type { Metadata } from "next";
import { notFound } from "next/navigation";
import "../../florida-app.css";
import "../../florida-left-layout.css";
import "../../michigan-app.css";
import "../../michigan-mobile-v2.css";
import { ArizonaResourcePage } from "../../../components/arizona-resource-page";
import { FloridaResourcePage } from "../../../components/florida-resource-page";
import { MichiganResourcePage } from "../../../components/michigan-resource-page";
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

  if (state.code === "FL") {
    const title = "Sunrun Roof Dispute Florida: $8K Removal, $35K Buyout Alleged";
    const description = "Florida homeowner alleges Sunrun wanted $8,000+ to remove panels for roof replacement and about $35,000 to buy out the contract. Read the court record.";
    return {
      title,
      description,
      keywords: [
        "Sunrun roof dispute Florida",
        "Sunrun roof problems Florida",
        "Sunrun roof replacement Florida",
        "Sunrun panel removal cost",
        "Sunrun buyout Florida",
        "Sunrun lawsuit Florida",
        "Florida solar contract disclosure",
        "Florida solar complaints",
        "Florida solar roof replacement",
      ],
      alternates: { canonical: "/states/florida" },
      openGraph: {
        title,
        description,
        url: "/states/florida",
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

  if (state.code === "MI") {
    const title = "Michigan Solar Complaints, Financing & Consumer Resources";
    const description = "Michigan solar complaint resources, installer and financing issues, permits and utility approval, current enforcement cases, and official state sources.";
    return {
      title,
      description,
      keywords: [
        "Michigan solar complaints",
        "Michigan solar installer problems",
        "Michigan solar financing complaints",
        "Climax Solar Michigan",
        "Michigan solar lawsuit",
        "Michigan solar contractor complaint",
        "Michigan solar permits",
        "Michigan solar PTO",
        "Michigan solar interconnection",
        "Michigan solar loan problems",
      ],
      alternates: { canonical: "/states/michigan" },
      openGraph: {
        title,
        description,
        url: "/states/michigan",
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
  if (state.code === "FL") return <FloridaResourcePage />;
  if (state.code === "MI") return <MichiganResourcePage />;
  return <StateResourcePage state={state} />;
}
