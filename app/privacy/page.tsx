import { InfoPage } from "../../components/info-page";
import Link from "next/link";

export const metadata = { title: "Privacy | Solar Consumer Research" };

export default function PrivacyPage() {
  return (
    <InfoPage
      eyebrow="Privacy"
      title="Public research. Private questions."
      lede="Most of the site can be browsed without an account. Personal information is requested only when a user chooses to sign in or submit a private question."
    >
      <section className="info-section">
        <h2>Information collected</h2>
        <ul>
          <li>Email address used for passwordless sign-in</li>
          <li>Selected state</li>
          <li>Questions intentionally submitted by the user</li>
          <li>Basic technical records needed to operate and protect the service</li>
        </ul>
      </section>
      <section className="info-section">
        <h2>How it is used</h2>
        <p>Email addresses are used for account access. State information helps route content. Questions and responses remain private to the signed-in user and authorized site administrators.</p>
      </section>
      <section className="info-section">
        <h2>What is not done</h2>
        <p>Personal information is not published, sold, or used for paid listings or contractor referrals. The site does not request account numbers, financial details, Social Security numbers, or other sensitive identifiers.</p>
      </section>
      <section className="info-section">
        <h2>Service providers and requests</h2>
        <p>Supabase provides authentication and database services. Hosting infrastructure processes normal web requests. To request access, correction, or deletion of account information, use the <Link href="/#questions">private question form</Link> and identify the message as a privacy request.</p>
      </section>
    </InfoPage>
  );
}
