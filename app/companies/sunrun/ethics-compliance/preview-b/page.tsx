import type { Metadata } from "next";
import { SunrunEthicsWebsitePreview } from "../preview-shell";

export const metadata: Metadata = {
  title: "Sunrun Ethics Website Preview B",
  robots: { index: false, follow: false },
};

export default function SunrunEthicsPreviewB() {
  return <SunrunEthicsWebsitePreview variant="b" />;
}
