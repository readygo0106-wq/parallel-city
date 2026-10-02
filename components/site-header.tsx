import Link from "next/link";

const links = [
  { href: "/city", label: "City lens" },
  { href: "/future", label: "Parallel future" },
  { href: "/collective", label: "Collective future" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="wordmark" href="/" aria-label="The Parallel City: Qingdao, home">
        <span className="wordmark-mark" aria-hidden="true">✦</span>
        <span>THE PARALLEL CITY <em>QING DAO</em></span>
      </Link>
      <nav className="site-nav" aria-label="Main navigation">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>{link.label}</Link>
        ))}
      </nav>
      <span className="header-edition">AN URBAN ECOLOGICAL ATLAS · 001</span>
    </header>
  );
}
