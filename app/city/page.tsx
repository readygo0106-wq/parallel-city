"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { AgentPanel } from "@/components/agents/agent-panel";
import { IndicatorsPanel } from "@/components/simulation/indicators-panel";
import { LiveMap } from "@/components/map/live-map";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { TimelineTrack } from "@/components/timeline/timeline-track";
import { DataTag, Eyebrow } from "@/components/ui";
import { cityStates } from "@/lib/simulation/city-states";
import { simulateDecision } from "@/lib/simulation/decision-engine";
import { useSimulation } from "@/lib/simulation/store";
import { DECISIONS, type DecisionType } from "@/lib/simulation/types";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function CityPage() {
  const router = useRouter();
  const { state, setUser, setResult, setPersistence } = useSimulation();
  const [choice, setChoice] = useState<DecisionType | null>(null);
  const [consent, setConsent] = useState(false);
  const [working, setWorking] = useState(false);
  const locked = useRef(false);
  const city = cityStates[state.selectedYear];

  async function submit() {
    if (!state.birdType || !choice || !consent || locked.current) return;
    locked.current = true;
    setWorking(true);
    const result = simulateDecision(choice);
    setResult(choice, result);
    const supabase = getBrowserSupabase();
    let saved = false;
    if (supabase && state.birdType) {
      try {
        const { data: sessionData } = await supabase.auth.getUser();
        let user = sessionData.user;
        if (!user) {
          const signedIn = await supabase.auth.signInAnonymously();
          if (signedIn.error) throw signedIn.error;
          user = signedIn.data.user;
        }
        if (!user) throw new Error("Anonymous session unavailable");
        setUser(user.id);
        const decisionId = crypto.randomUUID();
        const { error: decisionError } = await supabase.from("decisions").insert({
          id: decisionId, user_id: user.id, location_id: state.locationId,
          bird_type: state.birdType, decision_type: choice,
          ecology_weight: choice === "ecology" ? 1 : choice === "balanced" ? 0.5 : 0,
          development_weight: choice === "development" ? 1 : choice === "balanced" ? 0.5 : 0,
          culture_weight: choice === "balanced" ? 0.7 : 0.5,
        });
        if (decisionError) throw decisionError;
        const { error: resultError } = await supabase.from("simulation_results").insert({
          id: crypto.randomUUID(), decision_id: decisionId, user_id: user.id,
          future_year: 2050,
          green_coverage: result.metrics.greenCoverage, bird_habitat: result.metrics.birdHabitat,
          building_density: result.metrics.buildingDensity, heat_island: result.metrics.heatIsland,
          noise: result.metrics.noise, culture_retention: result.metrics.cultureRetention,
          result_json: { narrative: result.narrative, model: "v1" },
        });
        if (resultError) throw resultError;
        saved = true;
      } catch { /* An unavailable database must not block local simulation. */ }
    }
    setPersistence(saved ? "saved" : "unavailable");
    await new Promise((resolve) => setTimeout(resolve, 950));
    router.push("/future");
  }
  return (
    <>
      <SiteHeader />
      <main className="city-page page-shell">
        {working && <div className="simulation-overlay" role="status" aria-live="polite"><span>SIMULATING PARALLEL FUTURE</span><div className="simulation-progress"><i /></div><p>2026 → 2050</p></div>}
        <div className="page-title-row"><div><Eyebrow>FIELD SITE / 001 · QINGDAO</Eyebrow><h1>City / <em>temporal lens</em></h1><p>Zhongshan Road and the surrounding coastal blocks</p></div><div className="page-title-aside"><span>36.0671° N</span><span>120.3826° E</span><DataTag>{city.eraSource === "archive" ? "ARCHIVE ERA / MODEL VALUES" : "SIMULATION"}</DataTag></div></div>
        <div className="city-grid">
          <AgentPanel />
          <section className="city-map-panel" aria-label="Illustrated city concept map preview">
            <div className="map-panel-top"><span>CITY STUDY · QD–001</span><span>{state.selectedYear} / {city.eraSource.toUpperCase()} CONTEXT</span></div>
            <div className={`city-project-artwork city-artwork--${state.selectedYear}`}>
              <Image
                src="/assets/references/temporal-lens-interface-concept.png"
                alt="Detail of the original project concept showing an illustrated coastal Qingdao city block"
                fill
                sizes="(max-width: 760px) 200vw, (max-width: 1250px) 120vw, 1100px"
                className="city-project-artwork-image"
              />
              <span className="city-artwork-marker" aria-hidden="true"><i /></span>
            </div>
            <div className="map-panel-bottom"><span>ZHONGSHAN ROAD · QINGDAO</span><span>SIMULATED VISUALIZATION</span></div>
          </section>
          <IndicatorsPanel />
        </div>
        <LiveMap />
        <TimelineTrack />
        <p className="city-context"><strong>{state.selectedYear} / {city.eraSource.toUpperCase()}</strong> {city.description} All displayed metrics are illustrative model values.</p>
        <section className="decision-panel" aria-labelledby="decision-title"><div><Eyebrow>03 / MAKE A CHOICE</Eyebrow><h2 id="decision-title">Which direction should this corner explore?</h2><p>Each choice applies published, deterministic changes to the same 2026 model baseline.</p>{!state.birdType && <p>Choose a bird perspective before submitting a future. <Link className="text-link" href="/enter">CHOOSE YOUR BIRD ↗</Link></p>}</div><div className="decision-options">{(Object.entries(DECISIONS) as [DecisionType, string][]).map(([id, label]) => <button type="button" key={id} className={choice === id ? "decision-option decision-option--active" : "decision-option"} aria-pressed={choice === id} onClick={() => setChoice(id)}><span>0{Object.keys(DECISIONS).indexOf(id) + 1}</span><strong>{label}</strong><span aria-hidden="true">↗</span></button>)}</div>{choice && state.birdType && <div className="decision-consent"><p>Your anonymous decision will be stored and included in the collective future when the database is available. <Link href="/about">Learn more</Link></p><label><input type="checkbox" checked={consent} onChange={(event) => setConsent(event.target.checked)} /> Continue with anonymous participation</label></div>}<button type="button" className="primary-link primary-button" disabled={!state.birdType || !choice || !consent || working} onClick={submit}>{working ? "SIMULATING PARALLEL FUTURE…" : "CREATE YOUR 2050 FUTURE"}<span aria-hidden="true">↗</span></button></section>
        <p className="simulation-disclaimer">Experimental speculative simulation — not an official urban forecast.</p>
      </main>
      <SiteFooter />
    </>
  );
}
