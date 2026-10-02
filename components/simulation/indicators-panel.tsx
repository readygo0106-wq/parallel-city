"use client";

import { cityStates, metricDetails, metricProvenance } from "@/lib/simulation/city-states";
import { useSimulation } from "@/lib/simulation/store";
import type { MetricKey } from "@/lib/simulation/types";
import { DataTag, Eyebrow } from "@/components/ui";

export function IndicatorsPanel() {
  const { state } = useSimulation();
  const metrics = cityStates[state.selectedYear].metrics;
  const provenance = metricProvenance(state.selectedYear);
  return (
    <section className="panel indicators-panel" aria-labelledby="indicators-title">
      <div className="panel-topline"><Eyebrow>02 / CITY VITALS</Eyebrow><span className="tiny-symbol">◌</span></div>
      <h2 id="indicators-title">Reading the<br /><em>urban habitat</em></h2>
      <div className="indicator-list">
        {(Object.keys(metricDetails) as MetricKey[]).map((key, index) => (
          <div className="indicator-row" key={key}>
            <div className="indicator-index">0{index + 1}</div>
            <div className="indicator-name"><strong>{metricDetails[key].label}</strong><span>{metrics[key].toFixed(metricDetails[key].precision)} {metricDetails[key].unit}</span></div>
            <span className="indicator-value">{metrics[key].toFixed(metricDetails[key].precision)}</span>
          </div>
        ))}
      </div>
      <div className="provenance-note"><DataTag>SIMULATION</DataTag><p>{provenance.sourceName}. Illustrative values, not observed measurements.</p></div>
    </section>
  );
}
