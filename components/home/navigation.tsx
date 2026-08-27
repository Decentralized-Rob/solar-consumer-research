import Image from "next/image";

export function HomeHeader({
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}) {
  return (
    <header className="home-header">
      <a className="home-wordmark" href="#top" aria-label="Solar Consumer Research home">
        <Image className="brand-logo" src="/brand/solar-consumer-research.svg" alt="" width={690} height={104} priority unoptimized />
      </a>
      <button
        className="home-menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="home-navigation"
        onClick={onMenuToggle}
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
      <nav
        id="home-navigation"
        className={`home-nav ${menuOpen ? "is-open" : ""}`}
        aria-label="Primary navigation"
      >
        <a href="#start" onClick={onMenuClose}>Start here</a>
        <a href="/research" onClick={onMenuClose}>Research</a>
        <a href="/resources" onClick={onMenuClose}>States</a>
        <a href="/federal-resources" onClick={onMenuClose}>Federal</a>
        <a href="/guides" onClick={onMenuClose}>Guides</a>
        <a href="/about" onClick={onMenuClose}>About</a>
      </nav>
      <a className="home-header-action" href="#questions">Ask a question</a>
    </header>
  );
}

export function HomeFooter() {
  return (
    <footer className="home-footer">
      <div className="home-wrap home-footer-inner">
        <div>
          <strong>Solar Consumer Research</strong>
          <p>Independent public-source research for residential solar consumers.</p>
        </div>
        <nav aria-label="Footer navigation">
          <a href="/research">Research</a>
          <a href="/resources">Resources</a>
          <a href="/federal-resources">Federal</a>
          <a href="/guides">Guides</a>
          <a href="/updates">Updates</a>
          <a href="/methodology">Methodology</a>
          <a href="/technology">Technology</a>
          <a href="/corrections">Corrections</a>
          <a href="/privacy">Privacy</a>
          <a href="/disclaimer">Disclaimer</a>
        </nav>
        <p>General information only. No legal advice or attorney-client relationship.</p>
      </div>
    </footer>
  );
}
