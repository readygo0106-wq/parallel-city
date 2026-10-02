import type { DataAvailability } from "./types";

export async function getRecentBirdObservationStatus(): Promise<DataAvailability<{ count: number; sourceUrl: string }>> {
  // No observation claim is displayed without eBird access and validated response data.
  if (!process.env.EBIRD_API_KEY) return { available: false, reason: "eBird API access is not configured" };
  try {
    const response = await fetch("https://api.ebird.org/v2/data/obs/CN-SD/recent?maxResults=20", { headers: { "X-eBirdApiToken": process.env.EBIRD_API_KEY }, next: { revalidate: 3600 }, signal: AbortSignal.timeout(5000) });
    if (!response.ok) throw new Error("eBird unavailable");
    const rows: unknown = await response.json();
    if (!Array.isArray(rows)) throw new Error("Invalid observation response");
    return { available: true, data: { count: rows.length, sourceUrl: "https://ebird.org/region/CN-SD" } };
  } catch { return { available: false, reason: "Recent eBird observations are unavailable" }; }
}
