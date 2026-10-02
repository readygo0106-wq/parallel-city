import Link from "next/link";
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <span>THE PARALLEL CITY / QING DAO</span>
      <span>Experimental speculative simulation · <Link href="/about">Methodology & privacy</Link></span>
      <span>36.0671° N · 120.3826° E</span>
    </footer>
  );
}
