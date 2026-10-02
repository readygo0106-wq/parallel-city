"use client";

import Image from "next/image";
import Link from "next/link";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DataTag, Eyebrow } from "@/components/ui";
import { cityStates, metricDetails } from "@/lib/simulation/city-states";
import { futureVisuals } from "@/lib/simulation/future-visuals";
import { useSimulation } from "@/lib/simulation/store";
import { BIRDS, DECISIONS, type MetricKey } from "@/lib/simulation/types";

export default function FuturePage() {
  const { state } = useSimulation();
  const result = state.simulationResult;
  const treatment = result ? futureVisuals[result.decision] : null;
  return <><SiteHeader /><main className="future-page page-shell">
    {!result || !treatment ? <div className="empty-result"><Eyebrow>YOUR PARALLEL CITY / 2050</Eyebrow><h1>Your future begins with a decision.</h1><p>Choose a bird perspective, explore Zhongshan Road, and shape a speculative 2050 scenario.</p><Link className="primary-link" href="/bird">START THE JOURNEY <span aria-hidden="true">↗</span></Link></div> : <>
      <div className="page-title-row"><div><Eyebrow>YOUR PARALLEL CITY / 2050</Eyebrow><h1>A future <em>in motion.</em></h1><p>{state.birdType ? BIRDS[state.birdType] : "Bird perspective"} · {DECISIONS[result.decision]}</p></div><DataTag>SIMULATION</DataTag></div>
      <div className="future-feature"><div className={`future-feature-art future-visual ${treatment.className}`}><Image src={treatment.image} alt="Original project illustration reinterpreted with a visual treatment for the selected future scenario" fill sizes="(max-width: 760px) 100vw, 58vw" /><span className="future-visual-label">SIMULATED VISUALIZATION · {treatment.caption}</span></div><div className="future-feature-copy"><span>FUTURE STUDY / QD–001</span><h2>{DECISIONS[result.decision]}</h2><p>{result.narrative}</p><DataTag>{state.persistence === "saved" ? "ANONYMOUS RESULT SAVED" : "LOCAL RESULT · DATABASE UNAVAILABLE"}</DataTag></div></div>
      <section className="future-comparison" aria-labelledby="compare-title"><div className="section-heading"><div className="section-heading-main"><span>03</span><h2 id="compare-title">2026 / 2050 comparison</h2></div><span className="section-heading-aside">ILLUSTRATIVE MODEL VALUES</span></div><div className="comparison-grid">{(Object.keys(metricDetails) as MetricKey[]).map((key) => <div className="comparison-card" key={key}><span>{metricDetails[key].label}</span><div><strong>{cityStates[2026].metrics[key].toFixed(metricDetails[key].precision)}</strong><span aria-hidden="true">→</span><strong>{result.metrics[key].toFixed(metricDetails[key].precision)}</strong><small>{metricDetails[key].unit}</small></div><small>2026 model → 2050 scenario</small></div>)}</div></section>
      <p className="simulation-disclaimer">{result.methodology} The 2026 baseline and 2050 changes are illustrative scenario values, not measured observations. Artwork is original project imagery with a branch-specific visual treatment.</p>
      <div className="future-actions"><Link className="primary-link" href="/collective">VIEW COLLECTIVE FUTURE <span aria-hidden="true">↗</span></Link><Link className="text-link" href="/city">REVISIT THE CITY ↗</Link></div>
    </>}
  </main><SiteFooter /></>;
}
