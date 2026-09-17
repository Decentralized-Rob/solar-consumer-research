import type { Metadata } from "next";
import Link from "next/link";
import "./goodleap.css";

export const metadata: Metadata = {
  title: { default: "GoodLeap Solar Financing Research", template: "%s | SolarComplaint.com" },
  description: "Source-based GoodLeap solar financing research, state litigation, arbitration, regulatory actions, and consumer resources.",
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" } },
};

const nav = [["State research","/goodleap/states"],["Resources","/goodleap/resources"],["All research","/research"],["Research help","/#questions"]] as const;

export default function GoodLeapLayout({children}:{children:React.ReactNode}) {
  return <div className="gl-shell">
    <header className="gl-header"><div className="gl-header-inner">
      <Link className="gl-brand" href="/"><span>Solar</span><strong><i>C</i>omplaint.com</strong></Link>
      <nav aria-label="GoodLeap research navigation">{nav.map(([label,href])=><Link href={href} key={href}>{label}</Link>)}</nav>
    </div></header>
    {children}
    <footer className="gl-footer"><p><strong>SolarComplaint.com</strong> organizes public records and official consumer resources.</p><p><Link href="/methodology">Methodology</Link> · <Link href="/corrections">Corrections</Link> · <Link href="/disclaimer">Disclaimer</Link></p></footer>
  </div>;
}
