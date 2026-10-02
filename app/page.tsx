import Link from "next/link";
import Image from "next/image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Eyebrow, SectionHeading } from "@/components/ui";

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero page-grid" aria-labelledby="hero-title">
          <div className="hero-copy">
            <Eyebrow>FIELD NOTES FROM A POSSIBLE CITY · 001</Eyebrow>
            <h1 id="hero-title">THE<br />PARALLEL<br /><em>CITY</em><span>QING DAO</span></h1>
            <div className="hero-rule" />
            <p className="hero-question">What if you were a bird?</p>
            <p className="hero-description">How would you choose the future of this city? Enter an illustrated urban atlas, listen to its many voices, and imagine what comes next.</p>
            <Link className="primary-link" href="/enter">ENTER THE CITY <span aria-hidden="true">↗</span></Link>
            <div className="hero-meta"><span>36.0671° N / 120.3826° E</span><span>SCROLL TO EXPLORE ↓</span></div>
          </div>
          <div className="hero-art">
            <Image
              src="/assets/brand/illustrated-qingdao-cover.png"
              alt="Original illustrated Qingdao coast cover concept with the project's title and exhibition entry artwork"
              fill
              sizes="(max-width: 760px) 100vw, 55vw"
              className="hero-project-artwork"
              preload
            />
            <div className="hero-art-caption"><span>FIG. 01 / ORIGINAL QINGDAO COVER ARTWORK</span><span>PROJECT ARCHIVE</span></div>
          </div>
        </section>

        <section className="intro-section page-shell">
          <SectionHeading number="01" title="A living city atlas" aside="OBSERVE / DEBATE / DECIDE" />
          <div className="intro-grid"><p className="intro-lead">Every street has more than one future.</p><div><p>Travel through Qingdao from the perspective of a bird. Explore the changing city, hear from different agents, and make a choice about the place they share.</p><p className="small-note">This is an experimental speculative simulation. Future outcomes are illustrative, not scientific predictions.</p></div></div>
        </section>

        <section className="journey-section page-shell">
          <SectionHeading number="02" title="Your route through the city" aside="AN INTERACTIVE EXHIBITION" />
          <div className="journey-grid">
            <div className="journey-card"><span>01 / OBSERVE</span><strong>Enter the urban archive</strong><p>See how one coastal corner changes through time.</p><span className="journey-glyph" aria-hidden="true">◌</span></div>
            <div className="journey-card"><span>02 / LISTEN</span><strong>Hear four perspectives</strong><p>Wildlife, planning, history, and ecology each tell a different story.</p><span className="journey-glyph" aria-hidden="true">✳</span></div>
            <div className="journey-card"><span>03 / CHOOSE</span><strong>Shape a parallel future</strong><p>Make a decision and compare its imagined effects.</p><span className="journey-glyph" aria-hidden="true">↗</span></div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
