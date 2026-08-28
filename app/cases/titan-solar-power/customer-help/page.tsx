import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./customer-help.css";

export const metadata: Metadata = {
  title: "Titan Solar Power Customer Help: Service, Home Sales & Financing Research",
  description: "Research paths for former Titan Solar Power customers with service, warranty, home-sale, contract, or financing questions.",
  alternates: { canonical: "/cases/titan-solar-power/customer-help" },
};

const paths = [
  {
    number: "01",
    title: "Service, repair, or incomplete installation",
    copy: "For systems that need repair, are not producing, lost installer support, or were never fully activated or completed.",
    records: ["Contract and installer workmanship warranty", "Equipment brand/model and monitoring history", "Permit, inspection, interconnection, or PTO records", "Photos, error codes, and prior service requests"],
  },
  {
    number: "02",
    title: "Buying or selling a home with Titan solar",
    copy: "For questions about ownership, system status, financing, lien or UCC filings, payoff or transfer steps, and the records a buyer or seller should request.",
    records: ["Purchase, lease, or loan agreement", "Most recent utility bill and production history", "Loan-servicer or transfer notices", "Any title, payoff, or UCC documentation"],
  },
  {
    number: "03",
    title: "Contract, financing, or sales concern",
    copy: "For a mismatch between what was represented and what was signed, financed, installed, produced, or charged.",
    records: ["Proposal and signed agreement", "Loan agreement, payment history, and notices", "Sales messages and savings/production materials", "Tax-credit materials and utility bills"],
  },
];

export default function TitanCustomerHelpPage() {
  return (
    <div className="th-shell">
      <header className="th-header">
        <Link href="/" aria-label="Solar Consumer Research home"><Image src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} priority unoptimized /></Link>
        <nav aria-label="Page navigation"><Link href="/cases/titan-solar-power">Titan updates</Link><a href="#paths">Research paths</a><Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Warranty</Link></nav>
      </header>
      <main className="th-main">
        <section className="th-hero">
          <p className="th-eyebrow">Titan Solar Power customer research</p>
          <h1>Start with the problem you actually have.</h1>
          <p className="th-deck">Titan is no longer operating. That does not make every former customer’s situation the same. Choose the path closest to yours, preserve the records that matter, and then use the right official or technical source.</p>
        </section>
        <section className="th-section" id="paths">
          <div className="th-section-head"><div><p className="th-eyebrow">Choose a research path</p><h2>Three common situations</h2></div><p>This is general research help, not a legal eligibility test or advice about whether to make a payment, settle a debt, or file bankruptcy.</p></div>
          <div className="th-paths">{paths.map((path) => <article className="th-path" key={path.number}><b>{path.number}</b><h3>{path.title}</h3><p>{path.copy}</p><ul>{path.records.map((record) => <li key={record}>{record}</li>)}</ul></article>)}</div>
        </section>
        <section className="th-note">
          <div><p className="th-eyebrow">Warranty question</p><h2>Titan is gone. Some equipment coverage may remain.</h2></div>
          <div><p>Manufacturer warranties are separate from Titan&apos;s own workmanship or service obligations. SolarEdge and Enphase both publish guidance for homeowners whose installer went out of business.</p><Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Check Titan Solar Power warranty coverage →</Link></div>
        </section>
        <section className="th-note" id="energyaid">
          <div><p className="th-eyebrow">EnergyAid’s role</p><h2>Service option, not Titan’s replacement.</h2></div>
          <div><p>EnergyAid says it acquired certain Titan assets and records and offers commercial service options to former Titan customers. It says it did not acquire Titan or assume Titan’s warranties, debts, liabilities, or legal obligations.</p><p>That distinction matters: EnergyAid may be useful when a system needs service, but it is not a successor responsible for every Titan issue.</p><a href="https://energyaid.net/titan-solar-power-is-out-of-business/" target="_blank" rel="noreferrer">Read EnergyAid’s Titan FAQ ↗</a></div>
        </section>
        <section className="th-section">
          <div className="th-section-head"><div><p className="th-eyebrow">Before contacting anyone</p><h2>Preserve the basic record set.</h2></div><p>Keep copies of the original documents and take screenshots before portals, servicing arrangements, or equipment access changes. Do not upload account numbers, government ID, or unredacted loan documents to a public form.</p></div>
          <div className="th-records"><div><h3>System and installation</h3><p>Contract, permits, inspections, PTO/interconnection record, monitoring export, photos, equipment model numbers, and service requests.</p></div><div><h3>Financial and sales records</h3><p>Proposal, signed finance documents, payment history, lender notices, sales texts/emails, and the bills used to support a savings claim.</p></div><div><h3>Home transaction records</h3><p>Title-company requests, payoff information, UCC filings if applicable, system ownership documents, and current production status.</p></div><div><h3>Where to go next</h3><p>Manufacturer support terms, a licensed local technician, your utility or permitting office, the lender’s written dispute process, or your state consumer-protection agency depending on the issue.</p></div></div>
        </section>
      </main>
      <footer className="th-footer">Solar Consumer Research provides general research information, not legal, financial, or contractor advice.</footer>
    </div>
  );
}
