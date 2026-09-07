import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "../../../../../components/info-page";

export const metadata: Metadata = {
  title: "Sunrun Ethics Guide Image Review",
  description: "Temporary review page for Sunrun ethics guide editorial image options.",
  robots: { index: false, follow: false },
};

const optionStyle = {
  margin: "20px 0 42px",
  overflow: "hidden",
  border: "1px solid #d9d8cf",
  borderRadius: "18px",
  background: "#fffefa",
} as const;

const imageStyle = {
  display: "block",
  width: "100%",
  height: "auto",
} as const;

export default function SunrunEthicsImagePreviewPage() {
  return (
    <InfoPage
      eyebrow="Review only · Sunrun ethics guide"
      title="Editorial image options"
      lede="Two independent-publication directions for the Sunrun ethics and compliance guide. Sunrun is identified in ordinary editorial type rather than by using its corporate logo."
    >
      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/companies/sunrun/ethics-compliance">Back to ethics guide</Link>
      </nav>

      <section className="info-section">
        <h2>Option A: company-watch dossier</h2>
        <p>Lighter, publication-first treatment. SolarComplaint.com leads, Sunrun appears as the subject, and the image combines a compact source file with residential solar context.</p>
        <div style={optionStyle}>
          <Image
            src="/sunrun/ethics-hero-option-a.svg"
            alt="Option A: independent Sunrun company-watch editorial graphic with source file and solar home"
            width={1200}
            height={630}
            style={imageStyle}
            priority
            unoptimized
          />
        </div>
      </section>

      <section className="info-section">
        <h2>Option B: premium source dossier</h2>
        <p>Darker and more investigative. The visual centers the Code of Business Conduct, Whistleblower Policy, Vendor Code and AllVoices reporting route.</p>
        <div style={optionStyle}>
          <Image
            src="/sunrun/ethics-hero-option-b.svg"
            alt="Option B: premium Sunrun ethics source dossier with policy documents and AllVoices reporting reference"
            width={1200}
            height={630}
            style={imageStyle}
            unoptimized
          />
        </div>
      </section>

      <section className="info-section">
        <h2>Selection note</h2>
        <p>The selected image can become the page hero and Open Graph image. The unselected option can be removed before merge.</p>
      </section>
    </InfoPage>
  );
}
