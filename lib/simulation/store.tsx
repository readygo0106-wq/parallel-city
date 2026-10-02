"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";
import { LOCATION_ID, type BirdType, type CityState, type DecisionType, type FutureResult, type SimulationState } from "./types";

const storageKey = "parallel-city-session-v1";
const initialState: SimulationState = {
  anonymousUserId: null, birdType: null, locationId: LOCATION_ID, selectedYear: 2026,
  decision: null, simulationResult: null, persistence: "idle",
};
let snapshot: SimulationState = initialState;
const listeners = new Set<() => void>();

function publish(next: SimulationState) {
  snapshot = next;
  if (typeof window !== "undefined") {
    try { window.localStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* Private browsing may block storage. */ }
  }
  listeners.forEach((listener) => listener());
}

function hydrate() {
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (!saved) return;
    const parsed = JSON.parse(saved) as Partial<SimulationState>;
    const years = [1910, 2026, 2035, 2050];
    publish({
      ...initialState,
      birdType: parsed.birdType && ["black-tailed-gull", "egret", "migratory-sparrow"].includes(parsed.birdType) ? parsed.birdType : null,
      selectedYear: years.includes(parsed.selectedYear ?? 0) ? parsed.selectedYear! : 2026,
      decision: parsed.decision && ["ecology", "balanced", "development"].includes(parsed.decision) ? parsed.decision : null,
      simulationResult: parsed.simulationResult?.year === 2050 ? parsed.simulationResult : null,
      persistence: parsed.persistence === "saved" ? "saved" : parsed.persistence === "unavailable" ? "unavailable" : "idle",
    });
  } catch { /* Malformed old state is ignored. */ }
}

const actions = {
  setBird: (birdType: BirdType) => publish({ ...snapshot, birdType }),
  setYear: (selectedYear: CityState["year"]) => publish({ ...snapshot, selectedYear }),
  setUser: (anonymousUserId: string) => publish({ ...snapshot, anonymousUserId }),
  setResult: (decision: DecisionType, simulationResult: FutureResult) => publish({ ...snapshot, decision, simulationResult, persistence: "saving" }),
  setPersistence: (persistence: SimulationState["persistence"]) => publish({ ...snapshot, persistence }),
  reset: () => publish(initialState),
};

const Context = createContext(actions);
export function SimulationProvider({ children }: { children: ReactNode }) {
  useEffect(() => { hydrate(); }, []);
  return <Context.Provider value={actions}>{children}</Context.Provider>;
}
export function useSimulation() {
  const state = useSyncExternalStore((listener) => { listeners.add(listener); return () => listeners.delete(listener); }, () => snapshot, () => initialState);
  return { state, ...useContext(Context) };
}
