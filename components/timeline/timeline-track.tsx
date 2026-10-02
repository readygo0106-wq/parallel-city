"use client";

import { YEARS } from "@/lib/simulation/types";
import { useSimulation } from "@/lib/simulation/store";
import { DataTag, Eyebrow } from "@/components/ui";

export function TimelineTrack() {
  const { state, setYear } = useSimulation();
  const index = YEARS.indexOf(state.selectedYear);
  function step(direction: number) { setYear(YEARS[Math.max(0, Math.min(YEARS.length - 1, index + direction))]); }
  return (
    <section className="timeline-panel" aria-labelledby="timeline-title">
      <div className="timeline-copy"><Eyebrow>THE TEMPORAL LENS</Eyebrow><h2 id="timeline-title">One city, many possible times.</h2><p>Explore the archive and compare imagined futures.</p></div>
      <div className="timeline-visual" aria-label="Choose a year from 1910 to 2050">
        <div className="timeline-line" aria-hidden="true" />
        {YEARS.map((year) => (
          <button type="button" className={`timeline-year ${year === state.selectedYear ? "timeline-year--current" : ""}`} aria-pressed={year === state.selectedYear} onClick={() => setYear(year)} onKeyDown={(event) => { if (event.key === "ArrowRight") { event.preventDefault(); step(1); } if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); } }} key={year}>
            <span className="timeline-dot" aria-hidden="true"/><strong>{year}</strong><span>{year === 1910 ? "ARCHIVE ERA" : year === 2026 ? "BASELINE" : "SCENARIO"}</span>
          </button>
        ))}
      </div>
      <input className="timeline-range" type="range" min="0" max="3" step="1" value={index} onChange={(event) => setYear(YEARS[Number(event.target.value)])} aria-label="Drag to change the selected year" />
      <DataTag>MODEL VALUES · NOT MEASURED</DataTag>
    </section>
  );
}
