import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "../../components/site-header";
import "./goodleap.css";

export const metadata: Metadata = {
  title: { default: "GoodLeap Solar Financing Research", template: "%s | SolarComplaint.com" },
  description: "Source-based GoodLeap solar financing research, state litigation, arbitration, regulatory actions, and consumer resources.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const nav = [["State research","/goodleap/states"],["Resources","/goodleap/resources"],["All research","/research"],["Research help","/#questions"]] as const;

export default function GoodLeapLayout({children}:{children:React.ReactNode}) {
  return <div className="gl-shell">
    <SiteHeader />
    <nav className="gl-section-nav" aria-label="GoodLeap section navigation">
      <Link className="gl-section-title" href="/goodleap">GoodLeap research</Link>
      <div>{nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</div>
    </nav>
    {children}
    
  </div>;
}
