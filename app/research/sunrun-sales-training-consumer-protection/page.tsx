import type { Metadata } from "next";
import Link from "next/link";
import { InfoPage } from "../../../components/info-page";

const canonicalUrl = "https://solarcomplaint.com/research/sunrun-sales-training-consumer-protection";
const sec2015 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0000950123-15-005618/filename1.htm";
const sec2017 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-18-000031/sunrun10k2017.htm";
const bloombergPowerPlay = "https://www.bloomberg.com/graphics/2019-sunrun-solar-panels/";
const compliance2019 = "https://www.sec.gov/Archives/edgar/data/1838987/000119312523141069/d425844dex1019.htm";
const proxy2021 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-21-000102/sunrunproxy2021.htm";
const proxy2024 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-24-000082/run-20240429.htm";
const proxy2025 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-25-000094/run-20250429.htm";
const proxy2026 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001469367-26-000029/run-20260415.htm";
const tenK2025 = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-012289/run-20251231.htm";
const streetRole = "https://careers.sunrun.com/job/san-jose/solar-sales-representative/21632/81024747040";
const newHirePortal = "https://linktr.ee/Sunrun_NewHires";
const sunrunWayBuiltIn = "https://builtin.com/job/field-sales-consultant/4373472";
const sunrunWayTerra = "https://www.terra.do/climate-jobs/job-board/Field-Sales-Consultant-Sunrun-8230375/";
const integrityRole = "https://www.builtinsf.com/job/sales-integrity-compliance-training-partner/9300970";
const integrityRoleMirror = "https://www.ziprecruiter.com/c/Sunrun/Job/Sales-Integrity-%26-Compliance-Training-Partner/-in-San-Francisco%2CCA?jid=956b8c1c60585fac";
const historicalSalesCode = "https://www.slideshare.net/slideshow/1-sales-code-of-conduct/51177075";

export const metadata: Metadata = {
  title: "Sunrun Sales Training, Ethics and Consumer Protection: 2015-2026",
  description:
    "A source-backed timeline of Sunrun sales training, Power Play 2.0, consumer-protection rules, annual compliance training, RunX, the SUNRUN Way Sales Process and the 2026 Sales Integrity Program.",
  keywords: [
    "Sunrun sales training",
    "Sunrun sales rep training",
    "Sunrun Power Play 2.0",
    "Sunrun sales ethics",
    "Sunrun consumer protection",
    "Sunrun Sales Code of Conduct",
    "Sunrun RunX",
    "SUNRUN Way Sales Process",
    "SUNRUN Way Sales Playbook",
    "Sunrun Sales Integrity Program",
  ],
  alternates: { canonical: "/research/sunrun-sales-training-consumer-protection" },
  openGraph: {
    title: "Sunrun Sales Training, Ethics and Consumer Protection: What the Public Record Shows",
    description:
      "From Power Play 2.0 to RunX and the SUNRUN Way, a documented timeline of Sunrun sales training and consumer-protection controls, with clear limits on what the evidence proves.",
    url: "/research/sunrun-sales-training-consumer-protection",
    type: "article",
    publishedTime: "2026-09-08",
    modifiedTime: "2026-09-08",
    authors: ["https://solarcomplaint.com/about"],
    section: "Sunrun Research",
    images: [{ url: "https://solarcomplaint.com/og.png", width: 1200, height: 630, alt: "Sunrun sales training and consumer protection research" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunrun Sales Training, Ethics and Consumer Protection",
    description: "A source-backed timeline from 2015 through 2026.",
    images: ["https://solarcomplaint.com/og.png"],
  },
};

export default function SunrunSalesTrainingResearch() {
  const citations = [
    sec2015,
    sec2017,
    bloombergPowerPlay,
    compliance2019,
    proxy2021,
    proxy2024,
    proxy2025,
    proxy2026,
    tenK2025,
    newHirePortal,
    sunrunWayBuiltIn,
    sunrunWayTerra,
    integrityRole,
    integrityRoleMirror,
    streetRole,
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "@id": `${canonicalUrl}#article`,
        headline: "Sunrun Sales Training, Ethics and Consumer Protection: What the Public Record Shows From 2015 to 2026",
        description: "A source-backed timeline of Sunrun sales training, sales ethics and consumer-protection controls, including Power Play 2.0, annual compliance training, RunX, the SUNRUN Way Sales Process and the 2026 Sales Integrity Program.",
        datePublished: "2026-09-08",
        dateModified: "2026-09-08",
        inLanguage: "en-US",
        articleSection: "Sunrun Research",
        mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
        author: { "@type": "Organization", name: "Solar Consumer Research", url: "https://solarcomplaint.com/about" },
        publisher: { "@id": "https://solarcomplaint.com/#publisher" },
        about: [
          { "@type": "Organization", name: "Sunrun Inc." },
          { "@type": "Thing", name: "Residential solar sales training" },
          { "@type": "Thing", name: "Consumer protection" },
          { "@type": "Thing", name: "Sales ethics" },
        ],
        citation: citations,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://solarcomplaint.com/" },
          { "@type": "ListItem", position: 2, name: "Research", item: "https://solarcomplaint.com/research" },
          { "@type": "ListItem", position: 3, name: "Sunrun Sales Training", item: canonicalUrl },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "Was Sunrun Power Play 2.0 still in effect in 2025?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The public record located for this research does not establish that Power Play 2.0 remained in effect in 2025. Bloomberg reported that Sunrun confirmed the manual was authentic and that the former employee who supplied it said it was current when he left in April 2017. No located source proves it continued, was renamed, or became the later SUNRUN Way Sales Process.",
            },
          },
          {
            "@type": "Question",
            name: "Did Sunrun train sales staff on consumer-protection claims?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A Sunrun Marketing and Advertising Compliance Policy revised in 2019 states that Marketing and Sales staff were required to comply with the policy and that Sunrun would provide training at least annually on permissible and prohibited claims.",
            },
          },
          {
            "@type": "Question",
            name: "What is the SUNRUN Way Sales Process?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Corroborated 2025 job-description mirrors name a SUNRUN Way Sales Playbook and Toolkit and a SUNRUN Way Sales Process, along with new-hire training, Solar Academy, competency certification, field oversight, QA/QC and sales scorecards. The public record located does not establish that SUNRUN Way descended from Power Play 2.0.",
            },
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <InfoPage
        className="research-story-page"
        eyebrow="Sunrun Research · September 8, 2026"
        title="Sunrun Sales Training, Ethics and Consumer Protection"
        lede="Sunrun has documented sales training and consumer-protection controls for more than a decade. The public record also exposes an authenticated 2017 sales manual, later RunX onboarding, a 2025 SUNRUN Way sales process, and a new 2026 sales-integrity program. The evidence does not establish that Power Play 2.0 was still in use in 2025."
      >
        <nav className="case-question-links" aria-label="Breadcrumb">
          <Link href="/">Home</Link>
          <Link href="/research">Research</Link>
          <Link href="/companies/sunrun">Sunrun</Link>
          <span aria-current="page">Sales training</span>
        </nav>

        <nav className="case-question-links" aria-label="Article navigation">
          <a href="#bottom-line">Bottom line</a>
          <a href="#timeline">Timeline</a>
          <a href="#power-play">Power Play 2.0</a>
          <a href="#consumer-protection">Consumer protection</a>
          <a href="#sunrun-way">SUNRUN Way</a>
          <a href="#integrity-program">2026 program</a>
          <a href="#unknowns">What is not established</a>
          <a href="#sources">Sources</a>
        </nav>

        <section id="bottom-line" className="info-section case-notice">
          <strong>What the documents establish</strong>
          <p>
            Sunrun told investors in 2015 that its direct sales teams participated in comprehensive training, were evaluated on an ongoing basis, and received training on sales techniques and applicable laws and regulations. By 2019, a Sunrun policy expressly required at least annual training for Marketing and Sales staff on permissible and prohibited claims. From 2021 through 2026, Sunrun repeatedly told shareholders that its sales teams were subject to a specific sales code of conduct tied to compliance with consumer protection laws.
          </p>
        </section>

        <section className="info-section case-notice">
          <strong>The important limit</strong>
          <p>
            We found no reliable source showing that <em>Power Play 2.0</em> remained active in 2025. We also found no source proving that it was renamed or replaced by the later <strong>SUNRUN Way Sales Process</strong>. Those are separate documented points in time unless stronger evidence connects them.
          </p>
        </section>

        <section id="timeline" className="info-section">
          <h2>A documented Sunrun sales-training timeline</h2>

          <h3>2015: comprehensive direct-sales training and applicable-law training</h3>
          <p>
            In its IPO registration statement, Sunrun said its direct and partner sales teams participated in a comprehensive training program intended to create a uniform sales experience. The filing separately said Sunrun maintained ongoing evaluations of its direct sales teams and trained its sales team on sales techniques and applicable laws and regulations. It also described a consultative presentation customized to the homeowner using guidelines and principles contained in Sunrun training materials.
          </p>
          <p><a href={sec2015} target="_blank" rel="noreferrer">Read Sunrun's 2015 SEC filing ↗</a></p>

          <h3>2017: the consultative process remained part of Sunrun's SEC description</h3>
          <p>
            Sunrun's 2017 Form 10-K described direct-to-consumer sales by phone, canvassing and in-home sales. It again said salespeople were trained to customize a consultative presentation using guidelines and principles in company training materials.
          </p>
          <p><a href={sec2017} target="_blank" rel="noreferrer">Read Sunrun's 2017 Form 10-K ↗</a></p>

          <h3>2019: a written employee-facing compliance curriculum becomes visible</h3>
          <p>
            A Sunrun Marketing and Advertising Compliance Policy, revised October 10, 2019 and preserved in an SEC filing, expressly applies to covered Sunrun employees. It says Marketing and Sales staff are required to comply and that Sunrun will train those staff at least annually on permissible and prohibited claims.
          </p>
          <p><a href={compliance2019} target="_blank" rel="noreferrer">Read the SEC-filed Sunrun compliance policy ↗</a></p>

          <h3>2021-2026: Sunrun repeatedly describes a specific sales code</h3>
          <p>
            Sunrun's proxy statements repeatedly say its sales teams are subject to a specific sales code of conduct that Sunrun believes enforces customer-centered behavior, including compliance with all consumer protection laws. The language appears in the 2021, 2024, 2025 and 2026 proxy statements reviewed for this article, with the same core representation also appearing in intervening years.
          </p>
          <p>
            <a href={proxy2021} target="_blank" rel="noreferrer">2021 proxy ↗</a>{" · "}
            <a href={proxy2024} target="_blank" rel="noreferrer">2024 proxy ↗</a>{" · "}
            <a href={proxy2025} target="_blank" rel="noreferrer">2025 proxy ↗</a>{" · "}
            <a href={proxy2026} target="_blank" rel="noreferrer">2026 proxy ↗</a>
          </p>

          <h3>2025: Sunrun still describes internally guided consultative training</h3>
          <p>
            Sunrun's 2025 Form 10-K still says the company trains its sales team to customize a consultative presentation using guidelines and principles in its training materials. The same filing reports a full-time workforce inclusive of an active direct-to-home salesforce while also acknowledging independent contractors and consultants.
          </p>
          <p><a href={tenK2025} target="_blank" rel="noreferrer">Read Sunrun's 2025 Form 10-K ↗</a></p>
        </section>

        <section id="power-play" className="info-section">
          <p className="eyebrow">Authenticated historical training manual</p>
          <h2>Power Play 2.0: what is actually verified</h2>
          <p>
            Bloomberg reported in 2019 that a former Bay Area Sunrun employee supplied a 61-page internal manual titled <em>Power Play 2.0: The Guide to Successfully Sell Sunrun</em>. The employee said it was current when he resigned in April 2017. Bloomberg reported that Sunrun confirmed the manual's authenticity.
          </p>
          <p>
            Bloomberg's review described a sales framework that repeatedly invoked customer pain and fear, including pressure around the homeowner's existing utility relationship and bill. That makes the manual relevant to the history of Sunrun's direct-sales methodology. It does not establish the contents of later training.
          </p>
          <p><a href={bloombergPowerPlay} target="_blank" rel="noreferrer">Read Bloomberg's reporting and view its manual excerpts ↗</a></p>

          <h3>A separate historical Sales Code of Conduct also exists</h3>
          <p>
            A Sunrun-branded Sales Code of Conduct survives on SlideShare. It addresses accurate proposals, explanation of benefits and agreement terms, realistic expectations, proper representation of the salesperson's relationship with Sunrun and utilities, avoidance of high-pressure tactics, legal compliance and salesperson accountability. Because the accessible copy is hosted by a third party rather than Sunrun, Solar Consumer Research treats it as a historical secondary-source artifact rather than equivalent to an SEC-filed corporate record.
          </p>
          <p><a href={historicalSalesCode} target="_blank" rel="noreferrer">View the historical Sales Code of Conduct copy ↗</a></p>
        </section>

        <section id="consumer-protection" className="info-section">
          <p className="eyebrow">Sunrun's written rules</p>
          <h2>The 2019 policy identifies specific consumer-protection problems</h2>
          <p>
            The 2019 policy is more useful than a generic instruction to act ethically. It says advertising claims must be true and substantiated, including implied claims a reasonable consumer could take away. It also requires disclosures needed to prevent a message from being unfair or deceptive to be clear and conspicuous.
          </p>
          <p>The policy identifies examples Sunrun says should be avoided, including:</p>
          <ul>
            <li>incorrect or potentially misleading claims about solar savings or claims that solar will eliminate the consumer's electric bill;</li>
            <li>false statements about expiring government rebates or tax credits intended to force a quick decision;</li>
            <li>representations improperly implying affiliation with a government entity, government program or utility;</li>
            <li>claims that the government will pay consumers to go solar;</li>
            <li>representations that going solar is free or costs the consumer no money, apart from a free quote;</li>
            <li>specific savings promises such as claims that a consumer will always save;</li>
            <li>messages designed to create a false sense of urgency.</li>
          </ul>
          <p>
            The policy also says failure to meet its standards can lead to employee discipline up to termination. It states that someone who suspects, witnesses or receives a complaint alleging unethical or illegal business practices has a responsibility to report it and that failure to report can itself lead to discipline.
          </p>
          <p>
            For consumer research, that changes the question. The public record does not merely show that Sunrun had an ethics code. It shows a written compliance framework identifying concrete sales representations, annual training, reporting duties and possible discipline.
          </p>
          <p><a href={compliance2019} target="_blank" rel="noreferrer">Open the full SEC-filed policy ↗</a></p>
        </section>

        <section className="info-section">
          <h2>Sales incentives and integrity controls</h2>
          <p>
            Sunrun's 2025 and 2026 proxy statements say the company does not cap cash incentive awards in its sales incentive plans. Sunrun pairs that disclosure with a statement that it maintains internal controls intended to ensure awards are granted only to sales teams meeting its integrity standards. The same section points to the specific sales code of conduct and consumer-protection obligations.
          </p>
          <p>
            This does not prove the controls succeeded in every transaction. It does document how Sunrun says incentive compensation and sales integrity are supposed to interact.
          </p>
          <p><a href={proxy2026} target="_blank" rel="noreferrer">Read Sunrun's 2026 proxy statement ↗</a></p>
        </section>

        <section id="sunrun-way" className="info-section">
          <p className="eyebrow">2024-2025 public trail</p>
          <h2>RunX onboarding and the SUNRUN Way Sales Process</h2>

          <h3>A public 2024 new-hire page points to RunX</h3>
          <p>
            A publicly accessible page titled <strong>Sunrun New Hires</strong> says the account joined Linktree in August 2024. Its onboarding links include a free new-rep training download, a new-hire start page, a board labeled for sales tips and important documents, a Sunrun Sales Dashboard and <strong>Run X Learning</strong> modules labeled <strong>Required for Pay</strong>.
          </p>
          <p>
            The page is useful evidence of a public onboarding trail, but its ownership is not independently authenticated as an official Sunrun corporate communications account. We therefore do not use it to establish the contents of private RunX courses or claim that every Sunrun direct seller followed this exact onboarding page.
          </p>
          <p><a href={newHirePortal} target="_blank" rel="noreferrer">View the public Sunrun New Hires page ↗</a></p>

          <h3>2025 job-description mirrors name the SUNRUN Way</h3>
          <p>
            Two independent job mirrors reproduce a Sunrun sales-leadership description that calls for a <strong>SUNRUN Way Sales Playbook and Toolkit</strong> and execution of a <strong>SUNRUN Way Sales Process</strong>. The responsibilities also reference new-hire and on-the-job training, Solar Academy, competency certification, field visits, QA/QC, sales-rep scorecards and metrics including close rate, pipeline conversion, self-generated sales, change orders, cancellation rate, customer acquisition cost and Net Promoter Score.
          </p>
          <p>
            The same role description says management should ensure company policies and business ethics codes are communicated and implemented. The duplicated language across Built In and Terra.do makes the job text a useful corroborated artifact, but it remains a third-party job mirror rather than a Sunrun SEC filing.
          </p>
          <p>
            <a href={sunrunWayBuiltIn} target="_blank" rel="noreferrer">Built In mirror ↗</a>{" · "}
            <a href={sunrunWayTerra} target="_blank" rel="noreferrer">Terra.do mirror ↗</a>
          </p>

          <section className="case-notice">
            <strong>No proven lineage</strong>
            <p>
              The existence of both <em>Power Play 2.0</em> in 2017 and the SUNRUN Way in the 2025 public record does not prove one became the other. The actual SUNRUN Way playbook is now the highest-value missing document.
            </p>
          </section>
        </section>

        <section id="integrity-program" className="info-section">
          <p className="eyebrow">2026 compliance development</p>
          <h2>A new Sales Integrity Program appears in a 2026 Sunrun job description</h2>
          <p>
            A 2026 Sunrun job description for a <strong>Sales Integrity &amp; Compliance Training Partner</strong>, preserved by multiple job sites, describes a role intended to centralize compliance curriculum and move beyond ad-hoc responses toward a proactive program. It calls the initiative a <strong>new Sales Integrity Program</strong> and identifies the Sales organization as the primary focus.
          </p>
          <p>The described accountability system includes:</p>
          <ul>
            <li>turning validated third-party customer complaint hot spots into training modules;</li>
            <li>temporary deactivation of sales tools while reps complete mandatory RunX re-enrollment;</li>
            <li>RunX curriculum covering Sales Ethics, Business Code of Conduct, Market Certification and Solar Foundations;</li>
            <li>documented coaching, field ride-alongs and acknowledgement sign-offs;</li>
            <li>commission clawbacks in cases of validated financial damage to customers;</li>
            <li>tiered restrictions on sales incentives based on misconduct severity;</li>
            <li>verification-call audits for flagged reps over one- to six-month periods;</li>
            <li>automation through a RunX Service Hub for items such as audit initiation, clawbacks and leadership reporting.</li>
          </ul>
          <p>
            This is evidence of the program Sunrun was hiring someone to lead, develop and enforce. It should not be read as proof that every listed control had already been fully implemented when the job was posted.
          </p>
          <p>
            <a href={integrityRole} target="_blank" rel="noreferrer">Built In San Francisco copy ↗</a>{" · "}
            <a href={integrityRoleMirror} target="_blank" rel="noreferrer">ZipRecruiter corroboration ↗</a>
          </p>
        </section>

        <section className="info-section">
          <h2>Direct sales does not mean one employment model</h2>
          <p>
            Sunrun's SEC filings report full-time employees inclusive of an active direct-to-home salesforce, while also saying the company uses independent contractors and consultants. Separately, current Sunrun careers postings state that Fusion and Street Sales roles are 100% commission-based 1099-NEC positions and are not eligible for employee benefits.
          </p>
          <p>
            That distinction matters when researching an individual salesperson. A Sunrun-branded direct seller should not automatically be described as a Sunrun employee without checking the role and transaction period.
          </p>
          <p><a href={streetRole} target="_blank" rel="noreferrer">See Sunrun's current Street Sales employment disclosure ↗</a></p>
        </section>

        <section id="unknowns" className="info-section case-notice">
          <strong>What the public record does not establish</strong>
          <p>
            We have not located evidence showing when Power Play 2.0 was retired, whether it survived under another name, whether SUNRUN Way incorporated its scripts or behavioral framework, the contents and version history of 2024-2025 RunX sales modules, or the actual SUNRUN Way Sales Playbook and Toolkit. We also cannot determine from public sources which exact training version applied to a particular salesperson on a particular transaction date.
          </p>
        </section>

        <section className="info-section">
          <h2>Records that could answer a disputed-sales question</h2>
          <p>
            For a specific transaction, the most probative records would be the salesperson's training transcript and completion dates; the version of the Sales Code of Conduct in force at the time; Sales Ethics and Business Code training; state Market Certification; Product and Agreement Training; the approved proposal and sales collateral; verification-call records; manager coaching or field-observation records; and any retraining, discipline, sales-tool restriction, incentive restriction or commission-clawback record tied to the complaint.
          </p>
          <p>
            Those records can answer a more precise question than whether Sunrun had training in general: <strong>what was this salesperson trained and certified to do before this sale?</strong>
          </p>
          <p><Link href="/guides/solar-complaint-record-checklist">Solar complaint record checklist →</Link></p>
        </section>

        <section id="sources" className="info-section">
          <h2>Sources and provenance</h2>
          <p><strong>Primary corporate and SEC records</strong></p>
          <p><a href={sec2015} target="_blank" rel="noreferrer">Sunrun 2015 IPO registration statement ↗</a></p>
          <p><a href={sec2017} target="_blank" rel="noreferrer">Sunrun 2017 Form 10-K ↗</a></p>
          <p><a href={compliance2019} target="_blank" rel="noreferrer">Sunrun Marketing and Advertising Compliance Policy, revised October 10, 2019, in SEC filing ↗</a></p>
          <p><a href={proxy2021} target="_blank" rel="noreferrer">Sunrun 2021 proxy statement ↗</a></p>
          <p><a href={proxy2024} target="_blank" rel="noreferrer">Sunrun 2024 proxy statement ↗</a></p>
          <p><a href={proxy2025} target="_blank" rel="noreferrer">Sunrun 2025 proxy statement ↗</a></p>
          <p><a href={proxy2026} target="_blank" rel="noreferrer">Sunrun 2026 proxy statement ↗</a></p>
          <p><a href={tenK2025} target="_blank" rel="noreferrer">Sunrun 2025 Form 10-K ↗</a></p>
          <p><a href={streetRole} target="_blank" rel="noreferrer">Sunrun careers Street Sales disclosure ↗</a></p>

          <p><strong>Authenticated independent reporting</strong></p>
          <p><a href={bloombergPowerPlay} target="_blank" rel="noreferrer">Bloomberg reporting on Power Play 2.0 ↗</a></p>

          <p><strong>Historical and public onboarding artifacts</strong></p>
          <p><a href={historicalSalesCode} target="_blank" rel="noreferrer">Historical Sunrun Sales Code of Conduct copy on SlideShare ↗</a></p>
          <p><a href={newHirePortal} target="_blank" rel="noreferrer">Public Sunrun New Hires onboarding page ↗</a></p>

          <p><strong>Corroborated job-description mirrors</strong></p>
          <p><a href={sunrunWayBuiltIn} target="_blank" rel="noreferrer">Built In: SUNRUN Way sales leadership description ↗</a></p>
          <p><a href={sunrunWayTerra} target="_blank" rel="noreferrer">Terra.do: corroborating SUNRUN Way description ↗</a></p>
          <p><a href={integrityRole} target="_blank" rel="noreferrer">Built In SF: Sales Integrity &amp; Compliance Training Partner ↗</a></p>
          <p><a href={integrityRoleMirror} target="_blank" rel="noreferrer">ZipRecruiter: corroborating Sales Integrity role ↗</a></p>
        </section>

        <section className="info-section">
          <h2>Continue researching Sunrun</h2>
          <p><Link href="/companies/sunrun/ethics-compliance">Sunrun ethics and compliance reporting guide →</Link></p>
          <p><Link href="/companies/sunrun">Sunrun investigations, enforcement and consumer resources →</Link></p>
          <p><Link href="/research/sunrun-25-year-solar-contracts">Sunrun 25-year solar contracts: homeowner and investor view →</Link></p>
          <p><Link href="/cases/connecticut-attorney-general-sunrun-lawsuit">Connecticut Attorney General Sunrun lawsuit research →</Link></p>
          <p><Link href="/methodology">Research methodology and sourcing standards →</Link></p>
          <p><Link href="/corrections">Submit a source correction →</Link></p>
        </section>
      </InfoPage>
    </>
  );
}
