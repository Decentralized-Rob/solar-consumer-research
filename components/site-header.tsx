"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const destinations = [
  { href: "/stories", label: "Latest Stories" },
  { href: "/companies/sunrun", label: "Sunrun Research" },
  { href: "/lawsuits-settlements", label: "Lawsuits & Settlements" },
  { href: "/guides", label: "Consumer Help" },
  { href: "/resources", label: "States" },
];

export function SiteHeader() {
  const menuRef = useRef<HTMLDetailsElement>(null);

  function closeMobileMenu() {
    if (menuRef.current) menuRef.current.open = false;
  }

  useEffect(() => {
    function closeOnOutsidePointer(event: PointerEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuRef.current.open = false;
      }
    }
    document.addEventListener("pointerdown", closeOnOutsidePointer);
    return () => document.removeEventListener("pointerdown", closeOnOutsidePointer);
  }, []);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-brand" aria-label="SolarComplaint homepage" onClick={closeMobileMenu}>
          <Image src="/brand/solar-consumer-research.svg" alt="Solar Consumer Research" width={690} height={104} priority unoptimized />
        </Link>
        <nav className="site-header-desktop" aria-label="Primary navigation">
          {destinations.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="site-header-search" href="/search">Search</Link>
        </nav>
        <details
          ref={menuRef}
          className="site-header-mobile"
          onKeyDown={(event) => {
            if (event.key === "Escape") {
              closeMobileMenu();
              event.currentTarget.querySelector("summary")?.focus();
            }
          }}
        >
          <summary>Menu</summary>
          <nav aria-label="Mobile primary navigation">
            {destinations.map(item => <Link href={item.href} key={item.href} onClick={closeMobileMenu}>{item.label}</Link>)}
            <Link href="/search" onClick={closeMobileMenu}>Search reporting</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
