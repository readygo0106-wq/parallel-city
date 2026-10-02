import type { DataAvailability, Provenance } from "./types";

export async function getCurrentTemperature(): Promise<DataAvailability<Provenance<number>>> {
  const url = "https://api.open-meteo.com/v1/forecast?latitude=36.0671&longitude=120.3826&current=temperature_2m&timezone=Asia%2FShanghai";
  try {
    const response = await fetch(url, { next: { revalidate: 900 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error("Weather service unavailable");
    const json = await response.json() as { current?: { temperature_2m?: number; time?: string } };
    if (typeof json.current?.temperature_2m !== "number" || !json.current.time) throw new Error("Missing observation");
    return { available: true, data: { value: json.current.temperature_2m, unit: "°C", sourceType: "real", sourceName: "Open-Meteo current weather model", observedAt: json.current.time, sourceUrl: "https://open-meteo.com/en/docs" } };
  } catch { return { available: false, reason: "Current weather is unavailable" }; }
}
