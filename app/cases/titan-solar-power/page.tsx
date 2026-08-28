import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SubscribeForm from "./SubscribeForm";
import "./titan-tracker.css";

export const metadata: Metadata = {
  title: "Titan Solar Power Closure: Customer Resources & Updates",
  description: "Court records, warranty information, service resources, reporting, and updates for former Titan Solar Power customers.",
  alternates: { canonical: "/cases/titan-solar-power" },
  openGraph: {
    title: "Titan Solar Power Closure: Customer Resources & Updates",
    description: "A sourced tracker for former Titan Solar Power customers.",
    url: "/cases/titan-solar-power",
    type: "article",
  },
};

const developments = [
  {
    date: "April 2025",
    title: "EnergyAid acquires selected Titan assets",
    copy: "EnergyAid says it acquired selected assets, including intellectual property, to offer service options to former Titan customers. It did not acquire Titan, its liabilities, or its warranties.",
    href: "https://energyaid.net/titan-solar-power-is-out-of-business/",
    source: "EnergyAid FAQ",
  },
  {
    date: "July 2024",
    title: "Customers report unfinished work and uncertain support",
    copy: "Local reporting documented homeowners trying to understand who could complete installations, service systems, or address financing after the shutdown.",
    href: "https://www.abc15.com/news/let-abc15-know/let-abc15-know-digging-for-answers-as-titan-solar-customers-feel-stuck-after-company-files-for-bankruptcy",
    source: "ABC15 Arizona",
  },
  {
    date: "June 20, 2024",
    title: "Titan files for Chapter 7 bankruptcy",
    copy: "Titan Solar Power and affiliated companies entered Chapter 7 proceedings in the U.S. Bankruptcy Court for the District of Arizona.",
    href: "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates",
    source: "U.S. Bankruptcy Court",
  },
  {
    date: "June 2024",
    title: "Company closes operations",
    copy: "Titan ceased operations after a prospective investment did not materialize, according to reporting at the time.",
    href: "https://www.ktnv.com/news/embattled-firm-titan-solar-power-goes-out-of-business",
    source: "KTNV Las Vegas",
  },
];

const resources = [
  { label: "Bankruptcy case hub", meta: "Court notices, case numbers and claims information", href: "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates", tag: "Official" },
  { label: "EnergyAid Titan FAQ", meta: "Commercial service options and limits of responsibility", href: "https://energyaid.net/titan-solar-power-is-out-of-business/", tag: "Service provider" },
  { label: "Former Titan website", meta: "Historical company domain; availability may change", href: "https://titansolarpower.com/", tag: "Historical" },
  { label: "Titan Solar Power on LinkedIn", meta: "Former company profile and later support-related updates", href: "https://www.linkedin.com/company/titansolarpower", tag: "Social" },
];

const community = [
  { title: "Titan Solar Customers", meta: "Facebook group", href: "https://www.facebook.com/groups/titansolarcustomers/" },
  { title: "Titan Solar customer discussion", meta: "Facebook group", href: "https://www.facebook.com/groups/1692427597803576/" },
  { title: "Phoenix customer lawsuit discussion", meta: "Reddit thread", href: "https://www.reddit.com/r/phoenix/comments/1rstjjb/anyone_with_a_titan_solar_lawsuit_success_story/" },
];

function ExternalLink({ href, children, className = "" }: { href: string; children: React.ReactNode; className?: string }) {
  return <a className={className} href={href} target="_blank" rel="noreferrer">{children}</a>;
}

export default function TitanSolarPowerPage() {
  return (
    <div className="tt-shell">
      <header className="tt-header">
        <Link href="/" aria-label="Solar Consumer Research home">
          <Image src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} priority unoptimized />
        </Link>
        <nav aria-label="Page navigation">
          <a href="#tt-updates">Updates</a>
          <a href="#tt-resources">Resources</a>
          <a href="#tt-community">Community</a>
          <Link className="tt-header-cta" href="/cases/titan-solar-power/customer-help">Customer help</Link>
        </nav>
      </header>

      <main>
        <section className="tt-hero">
          <div className="tt-kicker"><span>Company tracker</span><i /><span>Last reviewed August 28, 2026</span></div>
          <div className="tt-hero-grid">
            <div>
              <div className="tt-status-pill"><span /> Closed · Chapter 7</div>
              <h1>Titan Solar Power is gone. The systems, loans and questions are not.</h1>
              <p className="tt-deck">A sourced tracker for former Titan customers looking for court records, warranty information, service resources, reporting and community updates.</p>
              <div className="tt-actions"><Link className="tt-button tt-button-primary" href="/cases/titan-solar-power/customer-help">Find the right research path</Link><a className="tt-button tt-button-secondary" href="#tt-updates">Read the timeline</a></div>
            </div>
            <aside className="tt-status-card" aria-label="Current company status">
              <p>Current status</p>
              <dl><div><dt>Operations</dt><dd>Closed</dd></div><div><dt>Bankruptcy</dt><dd>Chapter 7</dd></div><div><dt>Filed</dt><dd>June 20, 2024</dd></div><div><dt>Jurisdiction</dt><dd>District of Arizona</dd></div></dl>
              <ExternalLink href="https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates">View the court case hub <span>↗</span></ExternalLink>
            </aside>
          </div>
        </section>

        <section className="tt-context" aria-label="Important context">
          <b>Verified context</b>
          <p><strong>EnergyAid says it acquired selected assets</strong> to offer support options, but it did not take over Titan or assume its warranties, debts or legal obligations.</p>
          <ExternalLink href="https://energyaid.net/titan-solar-power-is-out-of-business/">Read the FAQ ↗</ExternalLink>
        </section>

        <section className="tt-section" id="tt-updates">
          <div className="tt-section-heading"><div><p>Latest developments</p><h2>What happened, and what changed</h2></div><span>Updates are summarized from court records, service-provider statements and local reporting.</span></div>
          <div className="tt-timeline">{developments.map((item, index) => <article key={item.title}>
            <i>{String(index + 1).padStart(2, "0")}</i>
            <div><time>{item.date}</time><h3>{item.title}</h3><p>{item.copy}</p><ExternalLink href={item.href}>{item.source} ↗</ExternalLink></div>
          </article>)}</div>
        </section>

        <section className="tt-section" aria-label="Customer research help">
          <div className="tt-section-heading"><div><p>Customer research help</p><h2>Different problem, different next step.</h2></div><span>Service and repair, a home sale, and a contract or financing concern each require different records.</span></div>
          <div className="tt-actions">
            <Link className="tt-button tt-button-primary" href="/cases/titan-solar-power/customer-help">Choose a Titan research path</Link>
            <Link className="tt-button tt-button-secondary" href="/cases/titan-solar-power/warranty-after-bankruptcy">Check Titan warranty coverage</Link>
          </div>
        </section>

        <section className="tt-section tt-muted" id="tt-resources">
          <div className="tt-section-heading"><div><p>Customer resources</p><h2>Start with the verified sources</h2></div><span>These links lead to the most relevant official, service and historical pages we found.</span></div>
          <div className="tt-resource-grid">{resources.map((item, index) => <ExternalLink className="tt-resource-card" href={item.href} key={item.label}><b>{String(index + 1).padStart(2, "0")}</b><small>{item.tag}</small><h3>{item.label}</h3><p>{item.meta}</p><span>Open source ↗</span></ExternalLink>)}</div>
          <div className="tt-presence"><div><p>Online presence</p><h3>Former Titan channels are no longer reliable support paths.</h3></div><div><p><span>Website</span><strong>Historical / may change</strong></p><p><span>LinkedIn</span><strong>Profile remains available</strong></p><p><span>Instagram</span><strong>Dormant</strong></p><p><span>X / Twitter</span><strong>Deactivated</strong></p></div></div>
        </section>

        <section className="tt-section" id="tt-community">
          <div className="tt-community"><div><p className="tt-label">Community discussions</p><h2>Compare notes with other customers</h2><p>These spaces may help surface shared experiences and local leads. Posts are user-generated and have not been independently verified.</p></div><div>{community.map((item) => <ExternalLink href={item.href} key={item.href}><span><small>{item.meta}</small><strong>{item.title}</strong></span><b>↗</b></ExternalLink>)}</div></div>
        </section>

        <section className="tt-subscribe" id="tt-subscribe">
          <div><p>Titan Solar alerts</p><h2>Get the next verified update in your inbox.</h2><span>We’ll notify you when new court records, customer resources or verified developments are added to this tracker.</span></div>
          <SubscribeForm />
        </section>
      </main>

      <footer className="tt-footer"><strong>Solar Consumer Research</strong><p>Independent consumer research. General information only; not legal or financial advice.</p><a href="#top">Back to top ↑</a></footer>
    </div>
  );
}
