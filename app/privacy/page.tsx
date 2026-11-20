import { InfoPage } from "../../components/info-page";
import Link from "next/link";

export const metadata = {
  title: "Privacy | Solar Consumer Research",
  description: "How Solar Consumer Research handles account, email, and private-question information.",
  alternates: { canonical: "/privacy" },
  openGraph: { url: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Public research. Private questions."
      lede="The public site can be browsed without an account. Personal information is requested only when someone chooses to submit a private question."
    >
      <section className="info-section">
        <h2>Information collected</h2>
        <ul>
          <li>Email address used to respond to a submitted question</li>
          <li>Selected state</li>
          <li>Questions intentionally submitted by the user</li>
          <li>Optional email address and explanation provided with a suggested public source</li>
          <li>Basic technical records needed to operate and protect the service</li>
          <li>Anonymous counts of article-link clicks and when story lists become visible, including the on-site source and destination paths; no search terms or personal identifiers are included in these events</li>
        </ul>
      </section>
      <section className="info-section">
        <h2>How it is used</h2>
        <p>Aggregate navigation counts help us understand whether readers can find reporting from the homepage, search results and related-story links. Cloudflare processes these events without names, account identifiers, search terms or cookies set by this feature.</p>
        <p>Email addresses are used to respond to submitted questions or to follow up about a suggested source. State and city information helps identify relevant public resources. Submitted questions and source suggestions are available only to authorized site administrators and service providers needed to deliver the submission notification.</p>
      </section>
      <section className="info-section">
        <h2>What is not done</h2>
        <p>Personal information is not published, sold, or used for paid listings or contractor referrals. The site does not request account numbers, financial details, Social Security numbers, or other sensitive identifiers.</p>
      </section>
      <section className="info-section">
        <h2>Service providers and requests</h2>
        <p>Supabase stores submitted questions and source suggestions. FormSubmit delivers the notification email to the site team. Cloudflare hosts the site, processes normal web requests, and provides form verification. To request access, correction, or deletion of submitted information, use the <Link href="/#questions">private question form</Link> and identify the message as a privacy request.</p>
      </section>
    </InfoPage>
  );
}
