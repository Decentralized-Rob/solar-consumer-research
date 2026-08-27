import type { Metadata } from "next";
import { ResearchApp } from "../components/research-app";

export const metadata: Metadata = {
  title: "Solar Complaints and Consumer Resources | Solar Consumer Research",
  description:
    "Find official solar complaint channels, source-backed research, lawsuits, investigations, public records, and consumer resources by state.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Solar Complaints and Consumer Resources | Solar Consumer Research",
    description:
      "Official solar complaint channels, source-backed research, lawsuits, investigations, public records, and consumer resources by state.",
    url: "/",
    images: [
      {
        url: "https://solarcomplaint.com/og.png",
        width: 1200,
        height: 630,
        alt: "Solar Consumer Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Solar Complaints and Consumer Resources | Solar Consumer Research",
    description:
      "Official solar complaint channels, source-backed research, lawsuits, investigations, public records, and consumer resources by state.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function Home() {
  return <ResearchApp />;
}
