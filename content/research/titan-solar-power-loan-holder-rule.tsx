import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";


export const story = {
  id: "titan-solar-power-loan-holder-rule",
  slug: "titan-solar-power-loan-holder-rule",
  href: "/research/titan-solar-power-loan-holder-rule",
  title: "Titan Solar Power Loans After Bankruptcy: Check for the FTC Holder Rule",
  deck: "Titan is gone, but financing agreements remain. One federal rule may preserve certain claims and defenses against the company holding a solar loan.",
  summary: "What former Titan Solar Power customers should know about the FTC Holder Rule, solar financing, lender liability limits, and lessons from other failed solar installers.",
  seoTitle: "Titan Solar Power Loan After Bankruptcy: FTC Holder Rule",
  seoDescription: "Still paying a Titan Solar Power loan after the company closed? Learn what the FTC Holder Rule can preserve and what to look for in your financing agreement.",
  keywords: [
    "Titan Solar Power loan",
    "Titan Solar Power bankruptcy",
    "FTC Holder Rule solar",
    "solar loan after installer bankruptcy",
    "Titan solar financing",
    "solar lender claims and defenses",
  ],
  openGraphTitle: "Still Paying a Titan Solar Power Loan? Check for the FTC Holder Rule",
  socialDescription: "Titan Solar Power is gone. If the system was financed, the loan agreement may contain a federal notice that changes how an installer dispute follows the financing.",
  twitterDescription: "Still paying a Titan Solar Power loan? Check the financing agreement for the FTC Holder Rule notice.",
  lede: "Titan Solar Power is gone. The bankruptcy itself does not decide what happens to each customer's financing agreement.",
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
      <a href="#notice">Check the loan</a>
      <a href="#rule">What the rule does</a>
      <a href="#solar">Why solar financing matters</a>
      <a href="#bankruptcy">After an installer fails</a>
      <a href="#records">Records to find</a>
      <a href="#limits">What this does not mean</a>
      <a href="#sources">Primary sources</a>
    </nav>

    <section className="info-section case-notice">
      <strong>The short version</strong>
      <p>
        Titan Solar Power is gone, but the bankruptcy itself does not decide what happens to each customer&apos;s loan.
        If Titan arranged the financing for a system, the loan agreement may contain the FTC Holder Rule notice. Where
        the rule applies, certain valid claims and defenses against the seller can also be asserted against the holder
        of the credit contract.
      </p>
    </section>

    <section className="info-section">
      <p>
        Titan Solar Power shut down in June 2024 and entered Chapter 7 bankruptcy on June 20, 2024. The{" "}
        <a href={titanBankruptcy} target="_blank" rel="noreferrer">U.S. Bankruptcy Court for the District of Arizona maintains the official case hub ↗</a>.
      </p>
      <p>
        That bankruptcy is only one part of the story for a homeowner who financed the system. The loan is a separate
        agreement. If the installation was never completed, does not work, or is disputed for another reason, the
        financing documents deserve their own look.
      </p>
    </section>

    <section id="notice" className="info-section">
      <h2>Start with the loan agreement</h2>
      <p>
        Look for a notice that begins: <strong>&ldquo;ANY HOLDER OF THIS CONSUMER CREDIT CONTRACT IS SUBJECT TO ALL CLAIMS AND DEFENSES...&rdquo;</strong>
      </p>
      <p>
        That language comes from the <a href={ftcHolderRule} target="_blank" rel="noreferrer">FTC Holder Rule, 16 CFR Part 433 ↗</a>.
        The rule is formally called the Trade Regulation Rule Concerning Preservation of Consumers&apos; Claims and Defenses.
      </p>
      <p>
        The FTC says the rule protects consumers who use credit obtained through a merchant, including certain loans
        made by a lender working with the merchant. It requires covered contracts to preserve the consumer&apos;s ability
        to raise the seller&apos;s misconduct even if the credit contract is later sold.
      </p>
      <p>
        Finding the notice does not answer the whole dispute. It does tell the homeowner that the financing contract
        should not automatically be treated as unrelated to the original sale.
      </p>
    </section>

    <section id="rule" className="info-section">
      <h2>What the Holder Rule actually preserves</h2>
      <p>
        The FTC describes the rule in practical terms: a financing arrangement should not let a creditor collect as if
        nothing happened when the debt came from a sale involving fraud, failure to deliver goods or services, or other
        legally actionable seller misconduct.
      </p>
      <p>
        The rule does not create a new claim. The consumer still needs a legally valid claim or defense against the seller
        under the law that applies to the transaction. The Holder Rule preserves that existing claim or defense against
        a covered holder of the credit contract.
      </p>
      <p>
        There is also a limit on affirmative recovery under the rule itself. In its{" "}
        <a href={ftcHolderOpinion} target="_blank" rel="noreferrer">2012 advisory opinion ↗</a>, the FTC said recovery under
        the Holder Rule is limited to the amount the consumer has paid under the contract. The FTC also said the rule is
        not limited only to cases where rescission is available or where the goods or services were completely worthless.
      </p>
      <p>
        Other rights under state or federal law can exist separately. The Holder Rule does not decide those questions.
      </p>
    </section>

    <section id="solar" className="info-section">
      <h2>Why this matters in solar financing</h2>
      <p>
        Residential solar loans are often arranged during the same sales process as the installation. That is different
        from a homeowner independently going to a bank for a general-purpose loan.
      </p>
      <p>
        The <a href={cfpbSolar} target="_blank" rel="noreferrer">Consumer Financial Protection Bureau&apos;s solar-financing report ↗</a>
        says sales, installation and financing can blend into a single interaction. Solar installers often have agreements
        with solar-specific lenders that allow financing offers to be presented with the installation contract.
      </p>
      <p>
        That does not make every lender responsible for every installer problem. It does explain why the way a Titan loan
        was originated matters.
      </p>
    </section>

    <section id="bankruptcy" className="info-section">
      <h2>Another failed solar installer shows why the lender can matter</h2>
      <p>
        Power Home Solar, later known as Pink Energy, filed for bankruptcy in 2022. Customers were still making payments
        on solar loans after the installer failed.
      </p>
      <p>
        In November 2022, a coalition of nine state attorneys general contacted five lenders: Dividend Solar Finance,
        GoodLeap, Cross River Bank, Sunlight Financial and Solar Mosaic. The states asked the lenders to suspend loan
        payments and interest for customers who had not received a working system and to assist customers reporting other
        installation and performance problems.
      </p>
      <p>
        The <a href={ncPinkEnergy} target="_blank" rel="noreferrer">North Carolina Attorney General&apos;s announcement ↗</a>
        described complaints involving systems that allegedly underperformed, malfunctioned, did not work at all, or had
        not been approved by the local utility to connect to the grid. Those were consumer allegations under investigation,
        not findings against every lender or every transaction.
      </p>
      <p>
        Minnesota provides another example. In 2022, the{" "}
        <a href={mnSolarLenders} target="_blank" rel="noreferrer">Minnesota Attorney General sued several solar sellers and lenders ↗</a>.
        The state said the lenders had partnered with the sellers to finance the transactions and were subject to consumer
        claims and defenses arising from those sales. The lawsuit involved its own facts and does not determine the rights
        of a Titan customer.
      </p>
      <p>
        What these records show is narrower: an installer&apos;s collapse does not always end the financing question at the
        installer.
      </p>
    </section>

    <section className="info-section case-notice">
      <strong>The Titan question</strong>
      <p>
        For a former Titan customer, the useful question is not simply whether Titan is bankrupt. It is whether the
        financing arrangement preserved a valid claim or defense from the original sale against the company now holding
        the credit contract.
      </p>
    </section>

    <section id="records" className="info-section">
      <h2>Records worth putting in one place</h2>
      <p>
        Before trying to understand a Titan financing problem, pull together the documents that show what was sold,
        how it was financed and what was actually delivered.
      </p>
      <ul>
        <li>The solar sales or installation agreement.</li>
        <li>The complete loan agreement and any later assignment or transfer notice.</li>
        <li>The Holder Rule notice, if the financing agreement contains one.</li>
        <li>The original proposal and system specifications.</li>
        <li>Written warranties and production representations.</li>
        <li>Sales emails, texts and other written representations.</li>
        <li>Installation, inspection, permission-to-operate and activation records.</li>
        <li>System production, repair and service records.</li>
        <li>Loan statements and payment history.</li>
      </ul>
      <p>
        SolarComplaint&apos;s <Link href="/cases/titan-solar-power/customer-help">Titan customer-help page</Link> separates
        financing questions from warranty, repair, unfinished-work, home-sale and bankruptcy issues.
      </p>
    </section>

    <section id="limits" className="info-section">
      <h2>What this does not mean</h2>
      <p>
        Finding Holder Rule language does not automatically cancel a loan. Titan&apos;s bankruptcy does not, by itself,
        create a claim against a lender. And the rule does not prove that Titan violated a contract or consumer-protection law.
      </p>
      <p>
        The underlying claim still matters. So does the way the financing was arranged, who currently holds the contract,
        the law that applies to the transaction and the remedy being sought.
      </p>
      <p>
        SolarComplaint does not interpret individual contracts or tell homeowners what legal position to take. The point
        of checking the Holder Rule notice is simpler: do not assume the financing side of a failed Titan project is
        automatically disconnected from the original sale.
      </p>
    </section>

    <section id="sources" className="info-section">
      <h2>Primary sources</h2>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderRule} target="_blank" rel="noreferrer">Holder in Due Course Rule, 16 CFR Part 433 ↗</a> — rule text,
        staff guidance and federal notices.
      </p>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderReview} target="_blank" rel="noreferrer">2019 review of the Holder Rule ↗</a> — why the rule exists
        and the FTC&apos;s decision to retain it.
      </p>
      <p>
        <strong>Federal Trade Commission.</strong>{" "}
        <a href={ftcHolderOpinion} target="_blank" rel="noreferrer">2012 Holder Rule advisory opinion ↗</a> — existing claims
        and defenses, affirmative recovery and the amounts-paid limitation.
      </p>
      <p>
        <strong>Consumer Financial Protection Bureau.</strong>{" "}
        <a href={cfpbSolar} target="_blank" rel="noreferrer">Issue Spotlight: Solar Financing ↗</a> — how solar-specific loans
        are sold and the relationship among salespeople, installers and lenders.
      </p>
      <p>
        <strong>North Carolina Department of Justice.</strong>{" "}
        <a href={ncPinkEnergy} target="_blank" rel="noreferrer">Nine-state Pink Energy lender request ↗</a> — response to
        financing problems after the installer&apos;s bankruptcy.
      </p>
      <p>
        <strong>Minnesota Attorney General.</strong>{" "}
        <a href={mnSolarLenders} target="_blank" rel="noreferrer">2022 solar seller and lender lawsuit announcement ↗</a> —
        allegations involving solar sales and financing companies.
      </p>
      <p>
        <strong>U.S. Bankruptcy Court for the District of Arizona.</strong>{" "}
        <a href={titanBankruptcy} target="_blank" rel="noreferrer">Titan Solar Power bankruptcy case hub ↗</a>.
      </p>
    </section>

    <section className="info-section">
      <h2>Continue researching Titan Solar Power</h2>
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
