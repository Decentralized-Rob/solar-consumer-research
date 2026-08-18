import type { Metadata } from "next";
import { StateResourcePage } from "../../components/state-resource-page";
import { states } from "../../lib/content";

export const metadata: Metadata = {
  title: "Massachusetts Residential Solar Consumer Resources",
  description: "Verified Massachusetts solar complaint, consumer-protection, records, and policy resources.",
  alternates: { canonical: "/states/massachusetts" },
};

export default function MassachusettsPage() {
  const state = states.find((item) => item.code === "MA")!;
  return <StateResourcePage state={state} />;
}
