import type { Metadata } from "next";
import { ResearchApp } from "../components/research-app";

export const metadata: Metadata = {
  title: "Sunrun Research and Solar Consumer Help | Solar Consumer Research",
  description:
    "Find Sunrun lawsuits, settlement instructions, contract research, and complaint help. Browse official solar consumer resources by state.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sunrun Research and Solar Consumer Help | Solar Consumer Research",
    description:
      "Find Sunrun lawsuits, settlement instructions, contract research, and complaint help. Browse official solar consumer resources by state.",
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
    title: "Sunrun Research and Solar Consumer Help | Solar Consumer Research",
    description:
      "Find Sunrun lawsuits, settlement instructions, contract research, and complaint help. Browse official solar consumer resources by state.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function Home() {
  return <ResearchApp />;
}
