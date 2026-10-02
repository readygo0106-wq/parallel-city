"use client";

import { useEffect, useRef, useState } from "react";
import { Map, Marker, Popup, setWorkerUrl } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { AtlasMap } from "./atlas-map";

export function LiveMap() {
  const container = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    if (!container.current) return;
    let map: Map | null = null;
    try {
      setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");
      map = new Map({
        container: container.current,
        center: [120.3826, 36.0671], zoom: 14.5,
        style: { version: 8, sources: { osm: { type: "raster", tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"], tileSize: 256, attribution: "© OpenStreetMap contributors" } }, layers: [{ id: "osm", type: "raster", source: "osm" }] },
      });
      new Marker({ color: "#d77d67" }).setLngLat([120.3826, 36.0671]).setPopup(new Popup().setText("Zhongshan Road study area")).addTo(map);
      map.on("error", () => setFailed(true));
    } catch { queueMicrotask(() => setFailed(true)); }
    return () => { map?.remove(); };
  }, []);
  return <section className="live-map-section" aria-label="Real map context for Qingdao Zhongshan Road"><div className="live-map-heading"><strong>REAL MAP CONTEXT</strong><span>OpenStreetMap · Zhongshan Road area</span></div><div className="live-map-wrap"><div className="live-map-canvas" ref={container} />{failed && <div className="map-fallback-visual"><AtlasMap variant="mini" /><p className="map-fallback">Map tiles are unavailable; this is an illustrated orientation map. <a href="https://www.openstreetmap.org/#map=15/36.0671/120.3826" target="_blank" rel="noreferrer">Open OpenStreetMap ↗</a></p></div>}</div></section>;
}
