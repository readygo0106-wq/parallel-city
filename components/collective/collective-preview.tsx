import { DataTag } from "@/components/ui";

export type CollectiveStats = { total: number; ecology: number; balanced: number; development: number };
const choices = [{ label: "Protect ecology", key: "ecology" }, { label: "Balanced development", key: "balanced" }, { label: "Develop", key: "development" }] as const;

export function CollectivePreview({ stats, unavailable = false }: { stats: CollectiveStats | null; unavailable?: boolean }) {
  return (
    <div className="collective-preview">
      <div className="collective-number"><span>TOTAL PARALLEL FUTURES</span><strong>{stats ? stats.total : "—"}</strong><p>{unavailable ? "The public database is unavailable right now." : stats?.total === 0 ? "Be the first to shape this future." : "Completed anonymous decisions in the public record."}</p></div>
      <div className="collective-bars">
        {choices.map((choice, index) => (
          <div className="collective-bar" key={choice.key}>
            <div><span>0{index + 1} / {choice.label}</span><span>{stats ? `${stats.total ? Math.round(stats[choice.key] / stats.total * 100) : 0}%` : "—"}</span></div>
            <div className="bar-track" aria-hidden="true"><div className="bar-fill" style={{ width: `${stats?.total ? stats[choice.key] / stats.total * 100 : 0}%` }} /></div>
          </div>
        ))}
        <DataTag>{stats ? "PUBLIC DATABASE" : "DATABASE UNAVAILABLE"}</DataTag>
      </div>
    </div>
  );
}
