import Link from "next/link";

const coolDownSource = "https://www.thecooldown.com/green-home/home-depot-shopper-sunrun-fake-number/";
const sunrun10k = "https://www.sec.gov/Archives/edgar/data/1469367/000114036126014729/ef20070408_formars.pdf";
const homeDepotPartnership = "https://corporate.homedepot.com/news/sustainability/its-bright-new-day-residential-solar-home-depot-sunrun-and-vivint-solar";
const sunrunHomeDepot = "https://www.sunrun.com/go-solar-center/solar-articles/sunrun-brings-solar-and-home-batteries-to-home-depot-stores-across-the-united-states";
const missionViejoReviews = "https://www.homedepot.com/l/Mission-Viejo/CA/Mission-Viejo/92692/614/reviews/1";
const burbankReviews = "https://www.homedepot.com/l/Burbank/CA/Burbank/91502/6654/reviews/";
const yuccaValleyReviews = "https://www.homedepot.com/l/Yucca-Valley/CA/Yucca-Valley/92284/6971/reviews/1";
const placervilleReviews = "https://www.homedepot.com/l/Placerville/CA/Placerville/95667/1085/reviews/homedepot.com/";

export const articleConfig = {
  schemaDescription: "A source-backed short read on a reported Sunrun sales encounter at Home Depot and the retail sales channel behind it.",
  breadcrumbLabel: "Sunrun at Home Depot",
  imageAlt: "SolarComplaint.com short read about Sunrun sales at Home Depot",
  sources: [
    { name: "The Cool Down report", url: coolDownSource },
    { name: "Sunrun annual report", url: sunrun10k },
    { name: "Home Depot partnership announcement", url: homeDepotPartnership },
    { name: "Sunrun Home Depot announcement", url: sunrunHomeDepot },
    { name: "Mission Viejo Home Depot reviews", url: missionViejoReviews },
    { name: "Burbank Home Depot reviews", url: burbankReviews },
    { name: "Yucca Valley Home Depot reviews", url: yuccaValleyReviews },
    { name: "Placerville Home Depot reviews", url: placervilleReviews },
  ],
};

export function SunrunHomeDepotBody() {
  return <>
    <nav className="case-question-links" aria-label="Breadcrumb"><Link href="/">Home</Link><Link href="/research">Research</Link><Link href="/companies/sunrun">Sunrun</Link><span aria-current="page">Home Depot sales</span></nav>

      <p className="page-updated">By <Link href="/authors/jules-young">Jules Young</Link></p>

      <section className="info-section">
        <p>He just wanted out of the conversation.</p>
        <p>A Home Depot shopper says he was in the plumbing section when a Sunrun salesperson approached him about solar. So he tried an old trick: real address, fake phone number, fake email.</p>
        <p>Problem solved, right?</p>
        <p>Apparently not.</p>
        <p>The shopper later wrote on Reddit that someone showed up at his house while he was sleeping. The story was picked up September 16 by The Cool Down, where it turned into a debate over an increasingly familiar part of shopping at big-box stores: getting pitched on home services when you came in for something else.</p>
        <p><a href={coolDownSource} target="_blank" rel="noreferrer">Read The Cool Down’s September 16 report ↗</a></p>
      </section>

      <section className="info-section">
        <h2>This wasn’t a random place to meet Sunrun</h2>
        <p>Home Depot announced in 2019 that Sunrun would become its leading home-solar vendor in 15 states, with representatives planned for nearly 700 stores. Sunrun said in 2021 that its Home Depot presence had expanded further.</p>
        <p>And the retail strategy is bigger than one hardware chain. In its latest annual filing, Sunrun says it finds customers through retail, canvassing, field marketing, in-home sales and strategic retail partnerships.</p>
        <p>In other words, meeting Sunrun while shopping is part of the sales model, not an accident.</p>
        <p><a href={homeDepotPartnership} target="_blank" rel="noreferrer">Read Home Depot’s partnership announcement ↗</a><br/><a href={sunrun10k} target="_blank" rel="noreferrer">Read Sunrun’s latest annual filing at the SEC ↗</a></p>
      </section>

      <section className="info-section">
        <h2>And shoppers are still noticing in 2026</h2>
        <p>The Reddit story isn’t the only recent sign of Sunrun salespeople inside Home Depot stores.</p>
        <p>Home Depot’s own store-review pages contain 2026 comments from shoppers in California mentioning Sunrun salespeople in Mission Viejo, Burbank, Yucca Valley and Placerville. The reactions aren’t all the same. Some shoppers complained about being approached. One Placerville reviewer described a Home Depot-Sunrun salesperson as professional and not pushy.</p>
        <p>That mix is more useful than pretending every store encounter goes the same way. What it does show is that the Sunrun pitch inside Home Depot is still very much a thing shoppers are encountering in 2026.</p>
        <p><a href={missionViejoReviews} target="_blank" rel="noreferrer">Mission Viejo Home Depot reviews ↗</a><br/><a href={burbankReviews} target="_blank" rel="noreferrer">Burbank Home Depot reviews ↗</a><br/><a href={yuccaValleyReviews} target="_blank" rel="noreferrer">Yucca Valley Home Depot reviews ↗</a><br/><a href={placervilleReviews} target="_blank" rel="noreferrer">Placerville Home Depot reviews ↗</a></p>
      </section>

      <section className="info-section">
        <h2>The plumbing aisle can be the start of a 25-year relationship</h2>
        <p>That’s the part worth remembering.</p>
        <p>The conversation may be casual. The product isn’t.</p>
        <p>Sunrun’s leases and power purchase agreements can run for decades. We’ve spent considerably more time looking at what happens on the other end of those conversations: the contracts, complaints, investigations and court cases that can come years later.</p>
        <p>So if someone approaches you about solar while you’re shopping, there’s no emergency.</p>
        <p>Finish buying the faucet. Then do the homework.</p>
        <p><Link href="/research/sunrun-25-year-solar-contracts">See how Sunrun’s long-term solar contracts work →</Link><br/><Link href="/companies/sunrun">Research Sunrun complaints, investigations and consumer resources →</Link><br/><Link href="/states">Find solar consumer resources in your state →</Link></p>
      </section>

      <section className="info-section">
        <h2>Sources</h2>
        <p><strong>The Cool Down.</strong> <a href={coolDownSource} target="_blank" rel="noreferrer">Home Depot shopper gives Sunrun fake number, says a rep showed up at his house anyway ↗</a>, September 16, 2026.</p>
        <p><strong>Sunrun annual report / SEC.</strong> <a href={sunrun10k} target="_blank" rel="noreferrer">Sunrun 2025 annual report ↗</a> — current description of retail, field and in-home customer-acquisition channels.</p>
        <p><strong>The Home Depot.</strong> <a href={homeDepotPartnership} target="_blank" rel="noreferrer">2019 Sunrun retail expansion announcement ↗</a>.</p>
        <p><strong>Sunrun.</strong> <a href={sunrunHomeDepot} target="_blank" rel="noreferrer">2021 Home Depot expansion announcement ↗</a>.</p>
        <p><strong>The Home Depot store reviews.</strong> 2026 shopper reviews from Mission Viejo, Burbank, Yucca Valley and Placerville mentioning Sunrun salespeople in stores.</p>
      </section>

      <section className="info-section">
        <h2>More Sunrun research</h2>
        <p><Link href="/companies/sunrun">Sunrun Consumer Resource Center →</Link><br/><Link href="/research/sunrun-25-year-solar-contracts">Sunrun’s 25-year solar contracts →</Link><br/><Link href="/research/solar-sales-financing-after-complaint">Solar sales, financing and what happens after a complaint →</Link></p>
      </section>
  </>;
}
