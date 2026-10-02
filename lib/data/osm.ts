import type { Provenance } from "./types";

export const qingdaoLocation: Provenance<{ latitude: number; longitude: number; label: string }> = {
  value: { latitude: 36.0671, longitude: 120.3826, label: "Zhongshan Road study area, Qingdao" },
  unit: "coordinates",
  sourceType: "real",
  sourceName: "OpenStreetMap geographic context",
  observedAt: null,
  sourceUrl: "https://www.openstreetmap.org/#map=15/36.0671/120.3826",
};
