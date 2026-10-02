import type { BirdType, CityState, Metrics } from "@/lib/simulation/types";

export type AgentId = "bird" | "planner" | "historian" | "ecologist";
export type AgentMessage = { agent: AgentId; text: string };
export const agents: Record<AgentId, { displayName: string; role: string; goal: string; constraints: string; avatar: string; instruction: string }> = {
  bird: { displayName: "Bird Agent", role: "Urban wildlife", goal: "Seek safe movement and shelter", constraints: "Avoid claiming verified local bird counts", avatar: "coral", instruction: "Speak as a bird observing possible habitat conditions, without inventing species observations." },
  planner: { displayName: "Urban Planner", role: "Public space", goal: "Balance access, activity and maintenance", constraints: "Avoid treating model indices as official plans", avatar: "teal", instruction: "Explain possible street and building tradeoffs in conditional terms." },
  historian: { displayName: "Historian", role: "Cultural memory", goal: "Keep the place legible across change", constraints: "Do not invent dates or landmark facts", avatar: "sand", instruction: "Discuss continuity and heritage as scenario concerns, without fabricated archival facts." },
  ecologist: { displayName: "Ecologist", role: "Habitat systems", goal: "Connect green space and environmental comfort", constraints: "No scientific prediction claims", avatar: "forest", instruction: "Explain conditional habitat, heat and noise tradeoffs; describe all indices as illustrative." },
};

export type DebateContext = { year: CityState["year"]; birdType: BirdType | null; metrics: Metrics };
export function demoDebate(context: DebateContext): AgentMessage[] {
  return [
    { agent: "bird", text: `From my flight path in the ${context.year} scenario, connected shelter would matter. The habitat index here is illustrative, not a bird survey.` },
    { agent: "planner", text: "A street can hold public activity and quieter edges. Each decision changes the model's building and green-space indices in a different way." },
    { agent: "historian", text: "Changes should consider how Zhongshan Road remains recognizable. The culture-retention index is a design prompt, not a measured heritage score." },
    { agent: "ecologist", text: "More vegetation could improve shade and habitat in this scenario, while denser building may add pressure. These are conditional model outcomes." },
  ];
}

export function isDebateContext(value: unknown): value is DebateContext {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  if (![1910, 2026, 2035, 2050].includes(Number(item.year))) return false;
  if (item.birdType !== null && !["black-tailed-gull", "egret", "migratory-sparrow"].includes(String(item.birdType))) return false;
  if (!item.metrics || typeof item.metrics !== "object") return false;
  const metrics = item.metrics as Record<string, unknown>;
  return ["greenCoverage", "birdHabitat", "buildingDensity", "heatIsland", "noise", "cultureRetention"].every((key) => typeof metrics[key] === "number" && Number.isFinite(metrics[key]) && Number(metrics[key]) >= 0 && Number(metrics[key]) <= 100);
}

export function isAgentMessages(value: unknown): value is AgentMessage[] {
  return Array.isArray(value) && value.length === 4 && new Set(value.map((item) => item?.agent)).size === 4 &&
    value.every((item) => item && ["bird", "planner", "historian", "ecologist"].includes(item.agent) && typeof item.text === "string" && item.text.length > 0 && item.text.length <= 450);
}
