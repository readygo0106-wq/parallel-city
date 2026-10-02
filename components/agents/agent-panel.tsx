"use client";

import { useRef, useState } from "react";
import { agents, type AgentMessage } from "@/lib/ai/agents";
import { cityStates } from "@/lib/simulation/city-states";
import { useSimulation } from "@/lib/simulation/store";
import { DataTag, Eyebrow } from "@/components/ui";

export function AgentPanel() {
  const { state } = useSimulation();
  const [messages, setMessages] = useState<AgentMessage[]>([]);
  const [mode, setMode] = useState<"idle" | "loading" | "demo" | "live">("idle");
  const requestLock = useRef(false);
  async function openDebate() {
    if (requestLock.current) return;
    requestLock.current = true;
    setMode("loading");
    try {
      const used = Number(window.sessionStorage.getItem("agent-requests") || 0);
      if (used >= 6) throw new Error("Session limit");
      window.sessionStorage.setItem("agent-requests", String(used + 1));
      const response = await fetch("/api/agents", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ year: state.selectedYear, birdType: state.birdType, metrics: cityStates[state.selectedYear].metrics }) });
      if (!response.ok) throw new Error("Agent service unavailable");
      const result = await response.json() as { mode: "demo" | "live"; messages: AgentMessage[] };
      if (!Array.isArray(result.messages) || result.messages.length !== 4) throw new Error("Invalid response");
      setMessages(result.messages);
      setMode(result.mode === "live" ? "live" : "demo");
    } catch {
      const { demoDebate } = await import("@/lib/ai/agents");
      setMessages(demoDebate({ year: state.selectedYear, birdType: state.birdType, metrics: cityStates[state.selectedYear].metrics }));
      setMode("demo");
    } finally {
      requestLock.current = false;
    }
  }
  return (
    <section className="panel agent-panel" aria-labelledby="agents-title">
      <div className="panel-topline"><Eyebrow>01 / THE VOICES</Eyebrow><span className="tiny-symbol">✳</span></div>
      <h2 id="agents-title">Who speaks for<br /><em>this corner?</em></h2>
      <p className="panel-intro">Four perspectives debate the future of Zhongshan Road. Open when you are ready; changing the timeline does not call AI.</p>
      <div className="agent-list">
        {Object.entries(agents).map(([id, agent]) => (
          <div className="agent-row" key={id}>
            <div className={`agent-avatar agent-avatar--${agent.avatar}`} aria-hidden="true">{agent.displayName[0]}</div>
            <div><strong>{agent.displayName}</strong><span>{agent.role}</span></div>
            <span className="agent-arrow" aria-hidden="true">↗</span>
          </div>
        ))}
      </div>
      <div className="agent-question"><span>DEBATE QUESTION</span><p>“What should happen to this corner?”</p></div>
      <button className="agent-open" type="button" disabled={mode === "loading"} onClick={openDebate}>{mode === "loading" ? "OPENING DEBATE…" : messages.length ? "REFRESH DEBATE ↗" : "OPEN DEBATE ↗"}</button>
      {messages.length > 0 && <div className="agent-messages" aria-live="polite">{messages.map((message) => <div key={message.agent}><strong>{agents[message.agent].displayName}</strong><p>{message.text}</p></div>)}</div>}
      <div className="panel-foot"><DataTag>{mode === "live" ? "LIVE AI" : "DEMO AGENT MODE"}</DataTag><span>{mode === "live" ? "Generated for this scenario" : "Curated conditional dialogue"}</span></div>
    </section>
  );
}
