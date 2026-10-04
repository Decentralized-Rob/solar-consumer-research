import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";


export const story = {
  id: "titan-solar-power-loan-holder-rule",
  slug: "titan-solar-power-loan-holder-rule",
  href: "/research/titan-solar-power-loan-holder-rule",
  title: "Still Paying a Titan Solar Power Loan? The FTC Holder Rule May Matter",
  deck: "Titan went bankrupt. The loan did not. For some customers, the financing agreement may preserve claims and defenses tied to the original solar sale.",
  summary: "A source-backed look at Titan Solar Power loans after bankruptcy, the FTC Holder Rule, solar financing, and what former Titan customers can learn from other failed installer cases.",
  seoTitle: "Titan Solar Power Loan After Bankruptcy: FTC Holder Rule",
  seoDescription: "Still paying a Titan Solar Power loan after the company closed? Learn how the FTC Holder Rule can preserve certain claims and defenses tied to the original solar sale.",
  keywords: [
    "Titan Solar Power loan",
    "Titan Solar Power bankruptcy",
    "FTC Holder Rule solar",
    "solar loan after installer bankruptcy",
    "Titan solar financing",
    "solar lender claims and defenses",
  ],
  openGraphTitle: "Still Paying a Titan Solar Power Loan? The FTC Holder Rule May Matter",
  socialDescription: "Titan is gone, but the loan may still be tied to the original sale in a way many homeowners do not realize.",
  twitterDescription: "Still paying a Titan Solar Power loan? One paragraph in the financing agreement may matter.",
  lede: "Titan Solar Power is gone. The loan may not be as separate from the original sale as it looks.",
  articleSection: "Consumer Research",
  publishedAt: "October 4, 2026",
  datePublished: "2026-10-04",
  dateModified: "2026-10-04",
  stateCodes: [],
  companies: ["Titan Solar Power"],
  topics: ["Titan Solar Power bankruptcy", "solar loans", "FTC Holder Rule", "solar financing", "consumer credit"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: true,
} satisfies ResearchStory;

export const titanBankruptcy = "https://www.azb.uscourts.gov/re-titan-solar-power-inc-and-its-affiliates";
export const ftcHolderRule = "https://www.ftc.gov/legal-library/browse/rules/holder-due-course-rule";
export const ftcHolderReview = "https://www.ftc.gov/news-events/news/press-releases/2019/05/ftc-completes-review-holder-rule";
export const ftcHolderOpinion = "https://www.ftc.gov/legal-library/browse/advisory-opinions/16-cfr-part-433-federal-trade-commission-trade-regulation-rule-concerning-preservation-consumers";
export const cfpbSolar = "https://www.consumerfinance.gov/data-research/research-reports/issue-spotlight-solar-financing/";
export const ncPinkEnergy = "https://ncdoj.gov/attorney-general-josh-stein-calls-on-five-solar-lending-companies-to-suspend-loan-payments-and-interest-for-pink-energy-customers/";
export const mnSolarLenders = "https://ag.state.mn.us/Office/Communications/2022/04/26_Brio.asp";

export const articleConfig = {
  breadcrumbLabel: "Titan solar loans and the FTC Holder Rule",
  imageAlt: "Titan Solar Power loan and FTC Holder Rule research from SolarComplaint.com",
  mentions: [
    { "@type": "Organization" as const, name: "Titan Solar Power" },
    { "@type": "Organization" as const, name: "Federal Trade Commission" },
    { "@type": "Organization" as const, name: "Consumer Financial Protection Bureau" },
  ],
  sources: [
    { name: "Titan Solar Power bankruptcy case hub", url: titanBankruptcy, publisher: "U.S. Bankruptcy Court for the District of Arizona" },
    { name: "Holder in Due Course Rule, 16 CFR Part 433", url: ftcHolderRule, publisher: "Federal Trade Commission" },
    { name: "FTC Completes Review of Holder Rule", url: ftcHolderReview, publisher: "Federal Trade Commission" },
    { name: "FTC Holder Rule advisory opinion", url: ftcHolderOpinion, datePublished: "2012-05-03", publisher: "Federal Trade Commission" },
    { name: "Issue Spotlight: Solar Financing", url: cfpbSolar, datePublished: "2024-08-07", publisher: "Consumer Financial Protection Bureau" },
    { name: "Pink Energy lender letter announcement", url: ncPinkEnergy, datePublished: "2022-11-22", publisher: "North Carolina Department of Justice" },
    { name: "Minnesota solar seller and lender lawsuit announcement", url: mnSolarLenders, datePublished: "2022-04-26", publisher: "Minnesota Attorney General" },
  ],
};

export function TitanHolderRuleBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb">
      <Link href="/">Home</Link>
      <Link href="/research">Research</Link>
      <Link href="/cases/titan-solar-power">Titan Solar Power</Link>
      <span aria-current="page">Loans and the FTC Holder Rule</span>
    </nav>

    <nav className="case-question-links" aria-label="Article navigation">
      <a href="#loan">Check the loan</a>
      <a href="#solar">Why solar is different</a>
      <a href="#pink-energy">What happened after Pink Energy</a>
      <a href="#records">Records to keep</a>
      <a href="#sources">Sources</a>
    </nav>

    <section className="info-section">
      <p>
        Titan Solar Power shut down in June 2024 and entered Chapter 7 bankruptcy on June 20. The{" "}
        <a href={titanBankruptcy} target="_blank" rel="noreferrer">U.S. Bankruptcy Court for the District of Arizona keeps the official case records here ↗</a>.
      </p>
      <p>
        For customers with financed systems, that did not make the monthly loan disappear. It also does not mean the
        lender is automatically outside the dispute.
      </p>
      <p>
        The place to start is the financing agreement itself.
      </p>
    </section>

    <section id="loan" className="info-section">
      <h2>Look for this paragraph in the loan</h2>
      <p>
        Search the agreement for a notice beginning: <strong>&ldquo;ANY HOLDER OF THIS CONSUMER CREDIT CONTRACT IS SUBJECT TO ALL CLAIMS AND DEFENSES...&rdquo;</strong>
      </p>
      <p>
        That is the <a href={ftcHolderRule} target="_blank" rel="noreferrer">FTC Holder Rule, 16 CFR Part 433 ↗</a>.
        It was created to stop certain consumer financing arrangements from cutting the financing company off from problems
        with the underlying sale.
      </p>
      <p>
        In covered transactions, a valid claim or defense against the seller can follow the credit contract to the company
        that holds it. That can matter when the seller is no longer around.
      </p>
      <p>
        There are limits. The rule does not create a claim just because Titan went bankrupt, and finding the notice does
        not automatically cancel a loan. The homeowner still needs an underlying claim or defense against the seller.
        The FTC&apos;s <a href={ftcHolderOpinion} target="_blank" rel="noreferrer">2012 advisory opinion ↗</a> also says
        affirmative recovery under the Holder Rule itself is limited to the amount paid under the contract.
      </p>
      <p>
        The same opinion says the rule is not limited to cases where the product or service was completely worthless or
        where rescission would otherwise be available. The FTC reviewed the rule again in 2019 and{" "}
        <a href={ftcHolderReview} target="_blank" rel="noreferrer">kept it in place ↗</a>.
      </p>
    </section>

    <section id="solar" className="info-section">
      <h2>Solar financing makes this worth checking</h2>
      <p>
        A lot of solar loans are not obtained the way someone might independently shop for a car loan or a home-equity
        loan. The financing can be presented during the same sales process as the panels.
      </p>
      <p>
        The <a href={cfpbSolar} target="_blank" rel="noreferrer">Consumer Financial Protection Bureau&apos;s 2024 report on solar financing ↗</a>
        describes installers working with solar-specific lenders so financing can be offered as part of the sale. From the
        homeowner&apos;s side of the table, the salesperson, installer and financing can feel like one transaction.
      </p>
      <p>
        That does not make every solar lender responsible for every installer problem. It does mean the way the loan was
        originated matters. If Titan helped arrange the financing, the actual loan documents are worth reading before
        assuming Titan&apos;s bankruptcy ended the issue with Titan.
      </p>
    </section>

    <section id="pink-energy" className="info-section">
      <h2>We have already seen this problem after another solar company collapsed</h2>
      <p>
        Power Home Solar, later known as Pink Energy, filed for bankruptcy in 2022. Its customers were left with the same
        basic problem now facing some former Titan customers: the installer was gone, but the financing remained.
      </p>
      <p>
        In November 2022, attorneys general from nine states contacted Dividend Solar Finance, GoodLeap, Cross River Bank,
        Sunlight Financial and Solar Mosaic. They asked the lenders to suspend payments and interest for customers who had
        not received working systems and to help customers reporting other installation and performance problems.
      </p>
      <p>
        The <a href={ncPinkEnergy} target="_blank" rel="noreferrer">North Carolina Attorney General&apos;s announcement ↗</a>
        described complaints about systems that allegedly underperformed, malfunctioned, did not work at all, or had not
        received utility approval to connect to the grid. Those were consumer complaints being investigated, not findings
        that every lender or every transaction violated the law.
      </p>
      <p>
        Minnesota went further in a separate 2022 case. The{" "}
        <a href={mnSolarLenders} target="_blank" rel="noreferrer">Minnesota Attorney General sued solar sellers and lenders ↗</a>
        and said the lenders had partnered with the sellers to finance the transactions and were subject to consumer claims
        and defenses arising from those sales.
      </p>
      <p>
        Neither case decides what happens with a Titan loan. They do show why &ldquo;Titan is bankrupt&rdquo; and
        &ldquo;I still owe the lender&rdquo; should not automatically be treated as two completely unrelated facts.
      </p>
    </section>

    <section id="records" className="info-section">
      <h2>Before doing anything else, get the paperwork together</h2>
      <p>
        The useful record is the one that shows what was sold, how the purchase was financed and what Titan actually
        delivered.
      </p>
      <ul>
        <li>Solar sales or installation agreement</li>
        <li>Complete loan agreement</li>
        <li>Any notice that the loan was sold or transferred</li>
        <li>The Holder Rule notice, if it appears in the agreement</li>
        <li>Original proposal and system specifications</li>
        <li>Written warranties and production representations</li>
        <li>Sales emails, texts and other written representations</li>
        <li>Installation, inspection, permission-to-operate and activation records</li>
        <li>System production, repair and service records</li>
        <li>Loan statements and payment history</li>
      </ul>
      <p>
        The underlying facts still control. A Holder Rule notice is not proof that Titan breached a contract or violated
        consumer law. It is a reason to look at the financing relationship instead of assuming the loan exists in a vacuum.
      </p>
      <p>
        SolarComplaint&apos;s <Link href="/cases/titan-solar-power/customer-help">Titan customer-help page</Link> separates
        financing questions from warranty, repair, unfinished-work, home-sale and bankruptcy issues. The{" "}
        <Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Titan warranty page</Link> covers the separate
        question of what happened to warranty coverage after the bankruptcy.
      </p>
    </section>

    <section id="sources" className="info-section">
      <h2>Sources</h2>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderRule} target="_blank" rel="noreferrer">Holder in Due Course Rule, 16 CFR Part 433 ↗</a>.
      </p>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderReview} target="_blank" rel="noreferrer">2019 review of the Holder Rule ↗</a>.
      </p>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderOpinion} target="_blank" rel="noreferrer">2012 Holder Rule advisory opinion ↗</a>.
      </p>
      <p>
        <strong>Consumer Financial Protection Bureau.</strong>{" "}
        <a href={cfpbSolar} target="_blank" rel="noreferrer">Issue Spotlight: Solar Financing ↗</a>.
      </p>
      <p>
        <strong>North Carolina Department of Justice.</strong>{" "}
        <a href={ncPinkEnergy} target="_blank" rel="noreferrer">Nine-state Pink Energy lender request ↗</a>.
      </p>
      <p>
        <strong>Minnesota Attorney General.</strong>{" "}
        <a href={mnSolarLenders} target="_blank" rel="noreferrer">2022 solar seller and lender lawsuit announcement ↗</a>.
      </p>
      <p>
        <strong>U.S. Bankruptcy Court for the District of Arizona.</strong>{" "}
        <a href={titanBankruptcy} target="_blank" rel="noreferrer">Titan Solar Power bankruptcy case hub ↗</a>.
      </p>
    </section>

    <section className="info-section">
      <h2>More Titan Solar Power research</h2>
      <p>
        <Link href="/cases/titan-solar-power">Titan Solar Power bankruptcy, closure and customer help →</Link><br />
        <Link href="/cases/titan-solar-power/customer-help">Titan customer research paths →</Link><br />
        <Link href="/cases/titan-solar-power/warranty-after-bankruptcy">Titan warranty information after bankruptcy →</Link><br />
        <Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link><br />
        <Link href="/federal-resources">Federal solar consumer resources →</Link><br />
        <Link href="/methodology">Research methodology and sourcing standards →</Link>
      </p>
    </section>
  </>;
}


export const article = defineResearchArticle({ story, config: articleConfig, Body: TitanHolderRuleBody });
