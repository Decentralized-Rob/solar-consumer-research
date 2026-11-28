import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="home-footer">
      <div className="home-wrap home-footer-inner">
        <div>
          <strong>Solar Consumer Research</strong>
          <p>Independent public-source research for residential solar consumers.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/stories">Latest Stories</Link>
          <Link href="/companies/sunrun">Sunrun Lawsuits &amp; Settlements</Link>
          <Link href="/research/sunrun-complaints-what-to-check">Sunrun Complaints</Link>
          <Link href="/lawsuits-settlements">Lawsuits &amp; Settlements</Link>
          <Link href="/search">Search</Link>
          <Link href="/research">Research</Link>
          <Link href="/about">About</Link>
          <a href="/resources">Resources</a>
          <a href="/federal-resources">Federal</a>
          <a href="/guides">Guides</a>
          <a href="/updates">Updates</a>
          <a href="/methodology">Methodology</a>
          <a href="/technology">Technology</a>
          <a href="/corrections">Corrections</a>
          <a href="/privacy">Privacy</a>
          <a href="/disclaimer">Disclaimer</a>
          <a href="https://www.facebook.com/SolarComplaint/" target="_blank" rel="noreferrer">Facebook</a>
          <a href="#">Back to top</a>
        </nav>
        <p>General information only. No legal advice or attorney-client relationship.</p>
      </div>
    </footer>
  );
}
