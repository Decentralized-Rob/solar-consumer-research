import type { Metadata } from "next";
import { SunrunEthicsWebsitePreview } from "../preview-shell";

export const metadata: Metadata = {
  title: "Sunrun Ethics Website Preview A",
  robots: { index: false, follow: false },
};

export default function SunrunEthicsPreviewA() {
  return <SunrunEthicsWebsitePreview variant="a" />;
}
