import Link from "next/link";
import { defineResearchArticle, type ResearchStory } from "../../lib/research-article";

export const story = {
  id: "sunrun-customer-contract-value",
  slug: "sunrun-customer-contract-value",
  href: "/research/sunrun-customer-contract-value",
  title: "How Sunrun Values Its 25-Year Customer Contracts",
  deck: "Sunrun's latest filings put several different numbers on expected customer payments. Here is what each number measures and where assumed renewals enter the calculation.",
  summary: "Sunrun's Q3 2026 Subscriber Value, Gross Earning Assets and contracted revenue explained using its November 2026 results and September Form 10-Q.",
  seoTitle: "Sunrun Contract Value: 25-Year Agreements and 30-Year Assumptions",
  seoDescription: "Sunrun's Q3 2026 filings report Subscriber Value, $22.4 billion in Gross Earning Assets and $38.9 billion in future contracted revenue. What do those measures mean?",
  lede: "A 25-year customer agreement can produce decades of expected payments. Sunrun reports those expectations in several ways. The measures have different definitions and should not be added together.",
  publishedAt: "November 5, 2026",
  datePublished: "2026-11-05",
  dateModified: "2026-11-05",
  stateCodes: [],
  companies: ["Sunrun"],
  topics: ["Sunrun customer agreements", "Subscriber Value", "Gross Earning Assets", "contracted future revenue", "solar securitization"],
  author: "Jules Young",
  authorSlug: "jules-young",
  section: "Research",
  featured: true,
} satisfies ResearchStory;

const q3Results = "https://investors.sunrun.com/news-events/press-releases/detail/386/sunrun-reports-third-quarter-2026-financial-results";
const q3TenQ = "https://investors.sunrun.com/filings-financials/sec-filings/content/0001628280-26-070158/run-20260930.htm";
const q2Results = "https://www.sec.gov/Archives/edgar/data/1469367/000162828026053349/exhibit991q226.htm";

export const articleConfig = {
  schemaHeadline: story.title,
  schemaDescription: story.summary,
  breadcrumbLabel: "Sunrun customer contract value",
  sources: [
    { name: "Sunrun third-quarter 2026 financial results", url: q3Results, datePublished: "2026-11-04" },
    { name: "Sunrun September 2026 Form 10-Q", url: q3TenQ, datePublished: "2026-11-04" },
    { name: "Sunrun second-quarter 2026 financial results", url: q2Results, datePublished: "2026-08-05" },
  ],
};

export function SunrunCustomerContractValueBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Contract value</span></nav>
    <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

    <section className="info-section case-notice">
      <h2>What the numbers mean</h2>
      <p><strong>Subscriber Value</strong> estimates discounted cash flows associated with subscribers added in a quarter. <strong>Gross Earning Assets</strong> estimates discounted remaining cash flows from the subscriber base at a point in time. <strong>Contracted revenue not yet recognized</strong> is an accounting disclosure about revenue expected in future periods. Each has its own scope and calculation.</p>
    </section>

    <section className="info-section">
      <h2>Value assigned to new subscribers in Q3 2026</h2>
      <p>Sunrun&rsquo;s November 4 results report <strong>$55,342 of Subscriber Value</strong> and <strong>$52,525 of Contracted Subscriber Value</strong> per subscriber addition in the third quarter of 2026. The contracted measure estimates the present value of upfront and future contracted cash flows from those additions, discounted using observed project-level capital costs. The difference includes estimated non-contracted or upside cash flows. These are company estimates for a cohort, not a price assigned to an individual homeowner&rsquo;s agreement.</p>
      <p>Both measures fell from the second quarter&rsquo;s $59,377 and $55,033, respectively. The discount rate used for third-quarter Subscriber Value was 8.4%, compared with 7.3% in the second quarter. The figures alone do not isolate which assumption or business change caused the quarter-to-quarter difference.</p>
      <p><a href={q3Results} target="_blank" rel="noreferrer">Sunrun Q3 results and definitions ↗</a> <a href={q2Results} target="_blank" rel="noreferrer">Sunrun Q2 results ↗</a></p>
    </section>

    <section className="info-section">
      <h2>The five years beyond a 25-year agreement</h2>
      <p>For its Gross Earning Assets calculation, Sunrun assumes a 30-year customer relationship. A 25-year initial agreement gets five assumed renewal years; a 20-year initial agreement gets ten. The model assumes renewal payments equal to 90% of the rate in effect at the end of the initial term, or a system purchase at an equivalent value. This is Sunrun&rsquo;s financial assumption. It does not mean every homeowner has already agreed to a 30-year term.</p>
      <p>The September 2026 Form 10-Q says the non-contracted or upside category also includes projected grid-service payments, renewable energy credits and certain Flex billings above minimum contracted payments. Its value therefore is not solely a renewal estimate.</p>
      <p><a href={q3TenQ} target="_blank" rel="noreferrer">Read Sunrun&rsquo;s Form 10-Q definitions ↗</a></p>
    </section>

    <section className="info-section">
      <h2>What the company reports for its existing subscriber base</h2>
      <p>As of September 30, 2026, Sunrun reported <strong>$17.0 billion in Contracted Gross Earning Assets</strong> and <strong>$5.3 billion in non-contracted or upside Gross Earning Assets</strong>, for a combined <strong>$22.4 billion</strong>. Those are present-value estimates of remaining cash flows discounted at 6%. The filing also shows how the figures change under different default, discount, purchase and renewal assumptions.</p>
      <p>The same filing separately reports approximately <strong>$38.9 billion of contracted revenue not yet recognized</strong>, with about 5% expected to be recognized over the next 12 months. That number is a revenue-accounting disclosure, not another valuation of the same assets at present value. Adding it to Gross Earning Assets would double-count different descriptions of expected payments.</p>
      <p><a href={q3TenQ} target="_blank" rel="noreferrer">Sunrun September 2026 Form 10-Q ↗</a></p>
    </section>

    <section className="info-section">
      <h2>Start with the contract itself</h2>
      <p>The financial metrics describe pools of agreements and assumptions. For the terms that apply to one home, read <Link href="/research/sunrun-25-year-solar-contracts">the separate homeowner guide to Sunrun&rsquo;s leases and PPAs →</Link>.</p>
    </section>

    <section className="info-section"><h2>Primary sources</h2><p><a href={q3Results} target="_blank" rel="noreferrer">Sunrun third-quarter 2026 financial results ↗</a> — Subscriber Value and metric definitions.</p><p><a href={q3TenQ} target="_blank" rel="noreferrer">Sunrun September 2026 Form 10-Q ↗</a> — Gross Earning Assets, renewal assumptions and revenue allocated to remaining performance obligations.</p><p><a href={q2Results} target="_blank" rel="noreferrer">Sunrun second-quarter 2026 results ↗</a> — prior-quarter Subscriber Value comparison.</p></section>
  </>;
}

export const article = defineResearchArticle({ story, config: articleConfig, Body: SunrunCustomerContractValueBody });
