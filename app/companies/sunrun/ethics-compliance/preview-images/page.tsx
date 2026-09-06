import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "../../../../../components/info-page";

export const metadata: Metadata = {
  title: "Sunrun Ethics Guide Image Review",
  description: "Temporary review page for Sunrun ethics guide hero image options.",
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
      title="Hero image options"
      lede="Two image directions for the Sunrun ethics and compliance guide. This temporary page is marked noindex and is intended only for design review."
    >
      <nav className="case-question-links" aria-label="Breadcrumb">
        <Link href="/companies/sunrun/ethics-compliance">Back to ethics guide</Link>
      </nav>

      <section className="info-section">
        <h2>Option A: investigation desk</h2>
        <p>Lighter editorial treatment with policy documents, magnifying glass and a solar home. More open space and less dense text.</p>
        <div style={optionStyle}>
          <Image
            src="/sunrun/ethics-hero-option-a.svg"
            alt="Option A: editorial ethics guide illustration with policy documents, magnifying glass and solar home"
            width={1200}
            height={630}
            style={imageStyle}
            priority
            unoptimized
          />
        </div>
      </section>

      <section className="info-section">
        <h2>Option B: policy source stack</h2>
        <p>More direct source-library treatment built around the Code of Business Conduct, Whistleblower Policy and Vendor Code.</p>
        <div style={optionStyle}>
          <Image
            src="/sunrun/ethics-hero-option-b.svg"
            alt="Option B: policy source stack with ethics code, whistleblower policy, vendor code and solar roof"
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
