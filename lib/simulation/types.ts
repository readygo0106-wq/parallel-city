export type BirdType = "black-tailed-gull" | "egret" | "migratory-sparrow";
export type DecisionType = "ecology" | "balanced" | "development";
export type SourceType = "archive" | "real" | "simulation" | "ai";
export type MetricKey = "greenCoverage" | "birdHabitat" | "buildingDensity" | "heatIsland" | "noise" | "cultureRetention";

export type Metrics = Record<MetricKey, number>;
export type CityState = {
  year: 1910 | 2026 | 2035 | 2050;
  eraSource: SourceType;
  description: string;
  metrics: Metrics;
};
export type FutureResult = {
  year: 2050;
  decision: DecisionType;
  metrics: Metrics;
  narrative: string;
  methodology: string;
};
export type SimulationState = {
  anonymousUserId: string | null;
  birdType: BirdType | null;
  locationId: string;
  selectedYear: CityState["year"];
  decision: DecisionType | null;
  simulationResult: FutureResult | null;
  persistence: "idle" | "saving" | "saved" | "unavailable";
};

export const LOCATION_ID = "3ac80bf0-a71f-4cf9-86ba-fced98009605";
export const LOCATION_SLUG = "qingdao-zhongshan-road";
export const YEARS = [1910, 2026, 2035, 2050] as const;
export const BIRDS: Record<BirdType, string> = {
  "black-tailed-gull": "Black-tailed gull",
  egret: "Egret",
  "migratory-sparrow": "Migratory sparrow",
};
export const DECISIONS: Record<DecisionType, string> = {
  ecology: "Protect ecology",
  balanced: "Balanced development",
  development: "Develop",
};
