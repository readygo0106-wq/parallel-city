import { cityStates } from "./city-states";
import type { DecisionType, FutureResult, MetricKey, Metrics } from "./types";

const deltas: Record<DecisionType, Metrics> = {
  ecology: { greenCoverage: 18, birdHabitat: 22, buildingDensity: -8, heatIsland: -0.9, noise: -8, cultureRetention: 4 },
  balanced: { greenCoverage: 7, birdHabitat: 9, buildingDensity: 6, heatIsland: -0.2, noise: -2, cultureRetention: 7 },
  development: { greenCoverage: -8, birdHabitat: -13, buildingDensity: 22, heatIsland: 1.0, noise: 9, cultureRetention: -8 },
};

const narratives: Record<DecisionType, string> = {
  ecology: "More connected planting space could improve habitat and cooling, while limiting the room for additional building activity.",
  balanced: "A mixed approach could add some space for activity and some habitat improvements, with smaller changes to each indicator.",
  development: "More intensive building could support a denser district, while placing more pressure on habitat, heat, and noise conditions.",
};

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));
export function simulateDecision(decision: DecisionType): FutureResult {
  const base = cityStates[2026].metrics;
  const metrics = {} as Metrics;
  for (const key of Object.keys(base) as MetricKey[]) {
    const value = base[key] + deltas[decision][key];
    metrics[key] = Math.round(clamp(value, key === "heatIsland" ? 0 : 0, key === "heatIsland" ? 10 : 100) * 10) / 10;
  }
  return {
    year: 2050,
    decision,
    metrics,
    narrative: narratives[decision],
    methodology: "Experimental speculative simulation — not an official urban forecast.",
  };
}
