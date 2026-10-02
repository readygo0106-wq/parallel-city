import type { SourceType } from "@/lib/simulation/types";

export type Provenance<T> = { value: T; unit: string; sourceType: SourceType; sourceName: string; observedAt: string | null; sourceUrl?: string };
export type DataAvailability<T> = { available: true; data: T } | { available: false; reason: string };
