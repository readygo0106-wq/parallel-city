"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DataTag, Eyebrow } from "@/components/ui";
import { BIRDS, type BirdType } from "@/lib/simulation/types";
import { useSimulation } from "@/lib/simulation/store";
import { getBrowserSupabase } from "@/lib/supabase/client";

export default function BirdPage() {
  const router = useRouter();
  const { state, setBird, setUser } = useSimulation();
  async function begin() {
    if (!state.birdType) return;
    const supabase = getBrowserSupabase();
    if (supabase) {
      try {
        const { data } = await supabase.auth.getUser();
        const user = data.user ?? (await supabase.auth.signInAnonymously()).data.user;
        if (user) setUser(user.id);
      } catch { /* Exploration continues when auth is unavailable. */ }
    }
    router.push("/city");
  }
  return (
    <>
      <SiteHeader />
      <main className="bird-page page-shell">
        <div className="bird-intro"><Eyebrow>FIELD GUIDE / YOUR POINT OF VIEW</Eyebrow><h1>Become <em>a bird.</em></h1><p>Lift above the coast. From here, a street is also a habitat, a memory, and a choice about the future.</p></div>
        <div className="bird-stage">
          <Image
            src="/assets/maps/bird-migration-relief-map.jpg"
            alt="Project illustration of a coastal relief map with bird imagery and migration arrows; the routes are illustrative"
            fill
            sizes="(max-width: 760px) 100vw, 95vw"
            className="bird-project-artwork"
          />
          <div className="bird-stage-label">BIRD MIGRATION STUDY / ILLUSTRATIVE ROUTES</div>
        </div>
        <section className="bird-choice" aria-label="Choose your bird perspective"><h2>Choose your point of view</h2><div className="bird-choice-grid">{(Object.entries(BIRDS) as [BirdType, string][]).map(([id, label]) => <button type="button" className={state.birdType === id ? "bird-option bird-option--selected" : "bird-option"} aria-pressed={state.birdType === id} onClick={() => setBird(id)} key={id}><span aria-hidden="true">✳</span><strong>{label}</strong><small>{id === "black-tailed-gull" ? "Coast and open air" : id === "egret" ? "Wet edges and habitat" : "Streets and shelter"}</small></button>)}</div></section>
        <div className="bird-exit"><div><DataTag>ANONYMOUS EXPLORATION</DataTag><p>Your flight begins over Zhongshan Road. No name or email is needed.</p></div><button className="primary-link primary-button" type="button" onClick={begin} disabled={!state.birdType}>BEGIN THE FLIGHT <span aria-hidden="true">↗</span></button></div>
      </main>
      <SiteFooter />
    </>
  );
}
