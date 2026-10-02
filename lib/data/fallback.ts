import type { DataAvailability } from "./types";

export function unavailable<T>(reason: string): DataAvailability<T> { return { available: false, reason }; }
