import type { CityState, MetricKey, SourceType } from "./types";

// These are illustrative scenario indices. No measured historical or live values are claimed.
export const cityStates: Record<CityState["year"], CityState> = {
  1910: { year: 1910, eraSource: "archive", description: "An archival era view of a coastal street, interpreted through a present-day scenario model.", metrics: { greenCoverage: 38, birdHabitat: 73, buildingDensity: 25, heatIsland: 1.1, noise: 42, cultureRetention: 91 } },
  2026: { year: 2026, eraSource: "simulation", description: "A baseline illustration of the current crossroads between habitat, heritage, and urban activity.", metrics: { greenCoverage: 27, birdHabitat: 53, buildingDensity: 61, heatIsland: 2.8, noise: 67, cultureRetention: 72 } },
  2035: { year: 2035, eraSource: "simulation", description: "An illustrative midpoint if competing pressures continue without a chosen intervention.", metrics: { greenCoverage: 25, birdHabitat: 50, buildingDensity: 65, heatIsland: 3.1, noise: 69, cultureRetention: 67 } },
  2050: { year: 2050, eraSource: "simulation", description: "An unselected reference scenario. Your decision will create a distinct 2050 outcome.", metrics: { greenCoverage: 23, birdHabitat: 46, buildingDensity: 69, heatIsland: 3.4, noise: 71, cultureRetention: 61 } },
};

export const metricDetails: Record<MetricKey, { label: string; unit: string; precision: number }> = {
  greenCoverage: { label: "Green coverage", unit: "%", precision: 0 },
  birdHabitat: { label: "Bird habitat", unit: "index", precision: 0 },
  buildingDensity: { label: "Building density", unit: "index", precision: 0 },
  heatIsland: { label: "Heat island", unit: "°C index", precision: 1 },
  noise: { label: "Noise", unit: "dB index", precision: 0 },
  cultureRetention: { label: "Culture retention", unit: "index", precision: 0 },
};

export function metricProvenance(year: CityState["year"]): { sourceType: SourceType; sourceName: string; observedAt: null; sourceUrl?: string } {
  return { sourceType: "simulation", sourceName: `Parallel City scenario model, ${year}`, observedAt: null };
}
