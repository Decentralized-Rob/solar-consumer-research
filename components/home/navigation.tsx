"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function HomeHeader({
  menuOpen,
  onMenuToggle,
  onMenuClose,
}: {
  menuOpen: boolean;
  onMenuToggle: () => void;
  onMenuClose: () => void;
}) {
  const [researchOpen, setResearchOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const closeMenu = () => {
    setResearchOpen(false);
    setResourcesOpen(false);
    onMenuClose();
  };

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
        <Link href="/#start" onClick={closeMenu}>Start here</Link>
        <div className={`home-nav-group ${researchOpen ? "is-expanded" : ""}`}>
          <div className="home-nav-group-label">
            <a href="/research" onClick={closeMenu}>Research</a>
            <button
              type="button"
              aria-label="Show research pages"
              aria-expanded={researchOpen}
              onClick={() => setResearchOpen((current) => !current)}
            >
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
          <div className="home-nav-submenu">
            <a href="/research/solar-sales-financing-after-complaint" onClick={closeMenu}>
              Solar Sales, Financing and What Happens After a Complaint
            </a>
            <a href="/cases/titan-solar-power" onClick={closeMenu}>Titan Solar Power</a>
            <a href="/cases/connecticut-attorney-general-sunrun-lawsuit" onClick={closeMenu}>
              Connecticut AG v. Sunrun
            </a>
          </div>
        </div>
        <a href="/resources" onClick={closeMenu}>States</a>
        <div className={`home-nav-group ${resourcesOpen ? "is-expanded" : ""}`}>
          <div className="home-nav-group-label">
            <a href="/federal-resources" onClick={closeMenu}>Resources</a>
            <button
              type="button"
              aria-label="Show consumer resources"
              aria-expanded={resourcesOpen}
              onClick={() => setResourcesOpen((current) => !current)}
            >
              <span aria-hidden="true">⌄</span>
            </button>
          </div>
          <div className="home-nav-submenu">
            <a href="/federal-resources" onClick={closeMenu}>Federal Resources</a>
            <a href="/guides" onClick={closeMenu}>Consumer Guides</a>
          </div>
        </div>
        <a href="/about" onClick={closeMenu}>About</a>
      </nav>
      <Link className="home-header-action" href="/#questions">Ask for free research help</Link>
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
          <a href="https://www.facebook.com/SolarComplaint/" target="_blank" rel="noreferrer">Facebook</a>
        </nav>
        <p>General information only. No legal advice or attorney-client relationship.</p>
      </div>
    </footer>
  );
}
