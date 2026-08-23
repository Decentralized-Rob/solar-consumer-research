import type { Metadata } from "next";
import { LinkSubmissionForm } from "../../components/link-submission-form";
import { InfoPage } from "../../components/info-page";

export const metadata: Metadata = {
  title: "Technology and Source Submissions | Solar Consumer Research",
  description: "How Solar Consumer Research is built, what its services do, and how to suggest a public source for review.",
  alternates: { canonical: "/technology" },
  openGraph: { url: "/technology" },
};

export default function TechnologyPage() {
  return <InfoPage eyebrow="Technology and participation" title="Built to keep the research public and the intake private." lede="The site uses a small, practical stack. It is designed to make public-source research easier to use while keeping submitted questions and source suggestions out of public view.">
    <section className="info-section"><h2>Technology stack</h2><ul><li><strong>Next.js and React</strong> render the site’s pages and forms.</li><li><strong>Cloudflare</strong> hosts and delivers the site. Cloudflare Turnstile checks public forms before the site accepts a submission.</li><li><strong>Supabase</strong> stores private question and source-submission records. They are not published automatically.</li><li><strong>FormSubmit</strong> sends the site team an email notification when a new question is received.</li></ul></section>
    <section className="info-section"><h2>How the research is maintained</h2><p>Automation can help organize public material and flag changes. A person reviews the original source before a listing is published or materially updated. The source itself remains the authority.</p></section>
    <section className="info-section"><h2>Suggest a source</h2><p>Submit a public link that would make the directory more useful. Suggestions are not placements. They are reviewed for relevance, source quality, and whether the information can be accurately described.</p><LinkSubmissionForm /></section>
  </InfoPage>;
}
