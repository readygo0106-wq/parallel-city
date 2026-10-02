import Link from "next/link";
import { CollectivePreview, type CollectiveStats } from "@/components/collective/collective-preview";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { DataTag, Eyebrow, SectionHeading } from "@/components/ui";
import { RestartButton } from "@/components/simulation/restart-button";
import { getServerSupabase } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function CollectivePage() {
  let stats: CollectiveStats | null = null;
  try {
    const supabase = await getServerSupabase();
    if (supabase) {
      const { data, error } = await supabase.rpc("public_decision_stats").single();
      if (!error && data) {
        const row = data as Record<string, unknown>;
        stats = { total: Number(row.total) || 0, ecology: Number(row.ecology) || 0, balanced: Number(row.balanced) || 0, development: Number(row.development) || 0 };
      }
    }
  } catch { /* An outage renders a clear unavailable state. */ }
  return (
    <>
      <SiteHeader />
      <main className="collective-page page-shell">
        <div className="page-title-row"><div><Eyebrow>QINGDAO · 2050</Eyebrow><h1>Collective <em>future</em></h1><p>Many decisions, one evolving public portrait.</p></div><DataTag>{stats ? "PUBLIC DATABASE" : "DATA UNAVAILABLE"}</DataTag></div>
        <div className="collective-hero"><div className="collective-hero-copy"><span>PUBLIC OBSERVATORY / 001</span><h2>A city is made of many choices.</h2><p>These percentages count completed anonymous scenarios from this site. Individual responses stay private.</p><Link className="text-link" href="/city">EXPLORE THE CITY ↗</Link></div><div className="collective-ornament" aria-hidden="true"><span>✦</span><span>✦</span><span>✦</span><span>✦</span><span>✦</span></div></div>
        <SectionHeading number="04" title="The public record" aside="COMPLETED DECISIONS ONLY" />
        <CollectivePreview stats={stats} unavailable={!stats} />
        <div className="collective-restart"><RestartButton /></div>
        <p className="simulation-disclaimer">Totals are queried from completed, non-test database records. When the database is unavailable, no participation estimate is shown.</p>
      </main>
      <SiteFooter />
    </>
  );
}
