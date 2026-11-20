import Image from "next/image";
import Link from "next/link";

const destinations = [
  { href: "/stories", label: "Latest Stories" },
  { href: "/companies/sunrun", label: "Sunrun" },
  { href: "/lawsuits-settlements", label: "Lawsuits & Settlements" },
  { href: "/guides", label: "Consumer Help" },
  { href: "/resources", label: "States" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-header-brand" aria-label="SolarComplaint homepage">
          <Image src="/brand/solar-consumer-research.svg" alt="Solar Consumer Research" width={690} height={104} priority unoptimized />
        </Link>
        <nav className="site-header-desktop" aria-label="Primary navigation">
          {destinations.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
          <Link className="site-header-search" href="/search">Search</Link>
        </nav>
        <details className="site-header-mobile">
          <summary>Menu</summary>
          <nav aria-label="Mobile primary navigation">
            {destinations.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
            <Link href="/search">Search reporting</Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
