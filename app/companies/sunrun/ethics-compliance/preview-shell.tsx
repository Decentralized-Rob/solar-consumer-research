import Image from "next/image";
import Link from "next/link";
import { InfoPage } from "../../../../components/info-page";

const governanceUrl = "https://investors.sunrun.com/leadership-governance/governance-documents";
const leadershipUrl = "https://investors.sunrun.com/leadership-governance/executive-management";
const allVoicesUrl = "https://sunrun.allvoices.co/";
const codeUrl = "https://d1io3yog0oux5.cloudfront.net/_5069419c6c0a7a5b730d48e3b1411191/sunrun/db/405/3799/file/Code%2Bof%2BBusiness%2BConduct%2B%26%2BEthics_Oct_2025.pdf";
const whistleblowerUrl = "https://d1io3yog0oux5.cloudfront.net/_c1eacf661f8f940cb0d1529a22a7aa53/sunrun/db/405/3801/file/Whistleblower%2BPolicy_Oct_2025.pdf";
const vendorCodeUrl = "https://d1io3yog0oux5.cloudfront.net/_c9159127ad06b657d37a299d3e74348a/sunrun/db/405/3803/file/6.25_Vendor%2BCode%2BOf%2BConduct_v2.pdf";
const ethicsLinkedInPost = "https://www.linkedin.com/posts/sunrun_at-sunrun-were-committed-to-upholding-the-activity-7251577600949522435-tGOM";
const texasSource = "https://www.texasattorneygeneral.gov/news/releases/attorney-general-ken-paxton-launches-major-initiative-combat-widespread-fraud-companies-selling";
const connecticutSource = "https://portal.ct.gov/ag/press-releases/2024-press-releases/attorney-general-tong-sues-sunrun";
const arizonaSource = "https://www.azag.gov/sites/default/files/2025-06/2025-05-22%20SUNRUN%20STIPULATED%20CONSENT%20AGREEMENT.pdf";

const timeline = [
  ["2026", "April 3", "Texas announces residential-solar investigation involving Sunrun", "The Texas Attorney General announced an investigation involving Sunrun and other residential-solar companies. An investigation is not a finding of wrongdoing.", texasSource],
  ["2025", "October", "Sunrun publishes current ethics policy set", "Sunrun’s October 2025 Code of Business Conduct and Ethics and Whistleblower Policy identify AllVoices and an ethics hotline among the company’s reporting resources.", governanceUrl],
  ["2025", "May 22", "Arizona settlement involving Sunrun and Vivint Solar", "Arizona’s court-approved agreement resolved allegations concerning solar sales practices and included consumer-relief and complaint-handling terms. The companies denied the allegations.", arizonaSource],
  ["2024", "July 19", "Connecticut Attorney General files lawsuit naming Sunrun", "Connecticut alleged unlawful residential-solar sales conduct involving contracts, signatures, permits and non-functioning systems. Lawsuit allegations are not court findings.", connecticutSource],
] as const;

const people = [
  ["Mary Powell", "Chief Executive Officer"],
  ["Jeanna Steele", "Chief Legal Officer and Chief People Officer"],
  ["Chance Allred", "Chief Experience and Direct Sales Officer"],
  ["Paul Dickson", "President and Chief Revenue Officer"],
  ["Patrick Kent", "Chief Operating Officer"],
] as const;

export function SunrunEthicsWebsitePreview({ variant }: { variant: "a" | "b" }) {
  const isA = variant === "a";
  const image = isA ? "/sunrun/ethics-hero-option-a.svg" : "/sunrun/ethics-hero-option-b.svg";

  const palette = isA
    ? { bg: "#fbf8ef", ink: "#17251d", muted: "#657067", accent: "#a97718", panel: "#ffffff", deep: "#234535", border: "#ddd8c8" }
    : { bg: "#f2f0e8", ink: "#16251d", muted: "#5f6a62", accent: "#c4932c", panel: "#fffdf7", deep: "#173c2e", border: "#cfcab9" };

  const sectionStyle = {
    borderTop: `1px solid ${palette.border}`,
    padding: "34px 0 38px",
  } as const;

  const labelStyle = {
    display: "block",
    marginBottom: 10,
    fontSize: 12,
    fontWeight: 800,
    letterSpacing: ".12em",
    textTransform: "uppercase" as const,
    color: palette.accent,
  };

  return (
    <div style={{ background: palette.bg, color: palette.ink }}>
      <InfoPage
        eyebrow={isA ? "Company watch · Sunrun" : "Independent research · Sunrun"}
        title="Sunrun"
        lede="SolarComplaint.com tracks Sunrun ethics and compliance policies, reporting routes, public enforcement records and the executives responsible for relevant company functions."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/companies/sunrun">Sunrun</Link>
          <span aria-current="page">Website preview {variant.toUpperCase()}</span>
        </nav>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", margin: "16px 0 22px", fontSize: 13, color: palette.muted }}>
          <strong style={{ color: palette.ink }}>SolarComplaint.com Research Desk</strong>
          <span>Published September 6, 2026</span>
          <span>Independent. Not affiliated with Sunrun.</span>
        </div>

        {isA ? (
          <figure style={{ margin: "0 0 36px", overflow: "hidden", borderRadius: 10, border: `1px solid ${palette.border}`, background: palette.panel }}>
            <Image src={image} alt="Sunrun ethics and compliance editorial research preview" width={1200} height={630} priority unoptimized style={{ width: "100%", height: "auto", display: "block" }} />
          </figure>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1.05fr) minmax(260px, .95fr)", gap: 22, margin: "4px 0 38px", alignItems: "stretch" }} className="sunrun-preview-hero-grid">
            <div style={{ background: palette.deep, color: "#fffdf6", borderRadius: 18, padding: "28px 26px", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 320 }}>
              <div>
                <span style={{ ...labelStyle, color: "#e3b95b" }}>Sunrun ethics & compliance</span>
                <h2 style={{ margin: "0 0 14px", fontSize: "clamp(28px, 4vw, 46px)", lineHeight: 1.04 }}>How the company says concerns can be reported</h2>
                <p style={{ margin: 0, fontSize: 17, lineHeight: 1.55, color: "#e8eee9" }}>Current AllVoices reporting, Sunrun’s published ethics documents, leadership responsibilities and related public records.</p>
              </div>
              <a href={allVoicesUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", width: "fit-content", marginTop: 28, background: "#fffdf6", color: palette.deep, padding: "12px 16px", borderRadius: 10, fontWeight: 800, textDecoration: "none" }}>Open Sunrun AllVoices ↗</a>
            </div>
            <figure style={{ margin: 0, overflow: "hidden", borderRadius: 18, border: `1px solid ${palette.border}`, background: palette.panel }}>
              <Image src={image} alt="Sunrun ethics source dossier preview" width={1200} height={630} priority unoptimized style={{ width: "100%", height: "100%", minHeight: 320, objectFit: "cover", display: "block" }} />
            </figure>
          </div>
        )}

        <section style={sectionStyle}>
          <span style={labelStyle}>Report an ethics concern</span>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 34px)", margin: "0 0 12px" }}>Current reporting information</h2>
          <p style={{ maxWidth: 760, color: palette.muted, lineHeight: 1.65 }}>Sunrun’s current published materials identify AllVoices and an ethics hotline as reporting resources. Consumers should verify the live route against Sunrun’s governance materials before submitting.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 12, marginTop: 20 }}>
            <a href={allVoicesUrl} target="_blank" rel="noreferrer" style={{ padding: 18, border: `1px solid ${palette.border}`, borderRadius: 12, background: palette.panel, color: palette.ink, textDecoration: "none" }}><small style={{ color: palette.muted }}>Reporting portal</small><strong style={{ display: "block", marginTop: 5, fontSize: 20 }}>AllVoices</strong><span>sunrun.allvoices.co ↗</span></a>
            <div style={{ padding: 18, border: `1px solid ${palette.border}`, borderRadius: 12, background: palette.panel }}><small style={{ color: palette.muted }}>Ethics hotline</small><strong style={{ display: "block", marginTop: 5, fontSize: 20 }}>866-602-6613</strong><a href="tel:+18666026613" style={{ color: palette.deep }}>Call hotline</a></div>
            <a href={governanceUrl} target="_blank" rel="noreferrer" style={{ padding: 18, border: `1px solid ${palette.border}`, borderRadius: 12, background: palette.panel, color: palette.ink, textDecoration: "none" }}><small style={{ color: palette.muted }}>Current policy set</small><strong style={{ display: "block", marginTop: 5, fontSize: 20 }}>October 2025</strong><span>Verify with Sunrun ↗</span></a>
          </div>
        </section>

        <section style={sectionStyle}>
          <span style={labelStyle}>Timeline</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 24px" }}>Sunrun ethics, enforcement and public record</h2>
          <div>
            {timeline.map(([year, date, title, text, href]) => (
              <article key={`${year}-${date}-${title}`} style={{ display: "grid", gridTemplateColumns: "100px minmax(0,1fr)", gap: 22, padding: "22px 0", borderTop: `1px solid ${palette.border}` }}>
                <div><strong style={{ fontSize: 22 }}>{year}</strong><span style={{ display: "block", marginTop: 4, color: palette.muted, fontSize: 13 }}>{date}</span></div>
                <div><h3 style={{ margin: "0 0 8px", fontSize: 21 }}>{title}</h3><p style={{ margin: "0 0 9px", color: palette.muted, lineHeight: 1.6 }}>{text}</p><a href={href} target="_blank" rel="noreferrer" style={{ color: palette.deep, fontWeight: 700 }}>Open source ↗</a></div>
              </article>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <span style={labelStyle}>Evidence</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 20px" }}>Sunrun’s published ethics documents</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
            {[
              ["Code of Business Conduct and Ethics", "October 2025", codeUrl],
              ["Whistleblower Policy", "October 2025", whistleblowerUrl],
              ["Vendor Code of Conduct", "Vendor and partner standards", vendorCodeUrl],
              ["Governance Documents", "Current company library", governanceUrl],
              ["Ethics & Compliance Week", "Public Sunrun LinkedIn post", ethicsLinkedInPost],
            ].map(([title, meta, href]) => (
              <a key={title} href={href} target="_blank" rel="noreferrer" style={{ background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: isA ? 8 : 14, padding: 18, textDecoration: "none", color: palette.ink }}>
                <strong style={{ display: "block", fontSize: 17, lineHeight: 1.3 }}>{title}</strong>
                <span style={{ display: "block", marginTop: 7, color: palette.muted, fontSize: 13 }}>{meta}</span>
                <span style={{ display: "block", marginTop: 16, color: palette.deep, fontWeight: 700 }}>Open source ↗</span>
              </a>
            ))}
          </div>
        </section>

        <section style={sectionStyle}>
          <span style={labelStyle}>People & responsibilities</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 10px" }}>Who handles what at Sunrun?</h2>
          <p style={{ color: palette.muted, maxWidth: 780, lineHeight: 1.6 }}>These names are included because Sunrun publicly identifies their corporate responsibilities. Inclusion does not connect any individual to a particular consumer complaint.</p>
          <div style={{ marginTop: 18 }}>
            {people.map(([name, role]) => (
              <div key={name} style={{ display: "flex", justifyContent: "space-between", gap: 20, padding: "16px 0", borderTop: `1px solid ${palette.border}` }}>
                <strong>{name}</strong><span style={{ textAlign: "right", color: palette.muted }}>{role}</span>
              </div>
            ))}
          </div>
          <a href={leadershipUrl} target="_blank" rel="noreferrer" style={{ display: "inline-block", marginTop: 16, color: palette.deep, fontWeight: 800 }}>Verify executive roles with Sunrun ↗</a>
        </section>

        <section style={sectionStyle}>
          <span style={labelStyle}>Featured</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 14 }}>
            <Link href="/companies/sunrun" style={{ background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: isA ? 8 : 14, padding: 20, color: palette.ink, textDecoration: "none" }}><small style={{ color: palette.accent, fontWeight: 800 }}>COMPANY TRACKER</small><h3>Sunrun investigations, enforcement and documented cases</h3><p style={{ color: palette.muted }}>Source-backed state actions and related SolarComplaint.com research.</p></Link>
            <Link href="/states/florida" style={{ background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: isA ? 8 : 14, padding: 20, color: palette.ink, textDecoration: "none" }}><small style={{ color: palette.accent, fontWeight: 800 }}>FLORIDA</small><h3>Sunrun roof-removal and contract-buyout dispute</h3><p style={{ color: palette.muted }}>Federal court source, procedural history and state consumer resources.</p></Link>
            <Link href="/cases/connecticut-attorney-general-sunrun-lawsuit" style={{ background: palette.panel, border: `1px solid ${palette.border}`, borderRadius: isA ? 8 : 14, padding: 20, color: palette.ink, textDecoration: "none" }}><small style={{ color: palette.accent, fontWeight: 800 }}>CONNECTICUT</small><h3>Connecticut Attorney General v. Sunrun</h3><p style={{ color: palette.muted }}>Plain-language guide to the allegations and primary government record.</p></Link>
          </div>
        </section>

        <section style={sectionStyle}>
          <span style={labelStyle}>The latest</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 18px" }}>Current Sunrun research</h2>
          <div>
            <article style={{ padding: "16px 0", borderTop: `1px solid ${palette.border}` }}><small style={{ color: palette.muted }}>September 6, 2026</small><h3 style={{ margin: "5px 0" }}>Sunrun ethics and compliance source guide</h3><p style={{ color: palette.muted, margin: 0 }}>AllVoices reporting, ethics documents, vendor standards and leadership responsibilities.</p></article>
            <article style={{ padding: "16px 0", borderTop: `1px solid ${palette.border}` }}><small style={{ color: palette.muted }}>September 6, 2026</small><h3 style={{ margin: "5px 0" }}><Link href="/states/florida">Florida Sunrun roof dispute and consumer resource hub</Link></h3><p style={{ color: palette.muted, margin: 0 }}>Federal court source, Florida disclosure rules and reciprocal Sunrun research links.</p></article>
            <article style={{ padding: "16px 0", borderTop: `1px solid ${palette.border}` }}><small style={{ color: palette.muted }}>April 3, 2026</small><h3 style={{ margin: "5px 0" }}><a href={texasSource} target="_blank" rel="noreferrer">Texas residential-solar investigation involving Sunrun ↗</a></h3><p style={{ color: palette.muted, margin: 0 }}>Primary Attorney General source. Investigation status is kept separate from any finding.</p></article>
          </div>
        </section>

        <section style={{ ...sectionStyle, paddingBottom: 20 }}>
          <span style={labelStyle}>Consumer resources</span>
          <h2 style={{ fontSize: "clamp(26px, 3vw, 36px)", margin: "0 0 12px" }}>If an ethics report is not the right route</h2>
          <p style={{ color: palette.muted, maxWidth: 760, lineHeight: 1.6 }}>Internal ethics reporting is separate from consumer complaints, contractor complaints, financing disputes and legal claims. The appropriate external route depends on the situation and state.</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 18 }}>
            <Link href="/resources" style={{ background: palette.deep, color: "white", padding: "11px 15px", borderRadius: 9, textDecoration: "none", fontWeight: 800 }}>Find state resources</Link>
            <Link href="/guides" style={{ border: `1px solid ${palette.border}`, background: palette.panel, color: palette.ink, padding: "11px 15px", borderRadius: 9, textDecoration: "none", fontWeight: 800 }}>Complaint guides</Link>
            <Link href="/#questions" style={{ border: `1px solid ${palette.border}`, background: palette.panel, color: palette.ink, padding: "11px 15px", borderRadius: 9, textDecoration: "none", fontWeight: 800 }}>Free research assistance</Link>
          </div>
        </section>

        <style>{`
          @media (max-width: 720px) {
            .sunrun-preview-hero-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </InfoPage>
    </div>
  );
}
