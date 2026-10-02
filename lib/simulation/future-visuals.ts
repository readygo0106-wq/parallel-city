import type { DecisionType } from "./types";

export const futureVisuals: Record<DecisionType, { image: string; className: string; caption: string }> = {
  ecology: { image: "/assets/references/temporal-lens-interface-concept.png", className: "future-visual--ecology", caption: "Planting and habitat emphasis" },
  balanced: { image: "/assets/references/temporal-lens-interface-concept.png", className: "future-visual--balanced", caption: "Mixed public space emphasis" },
  development: { image: "/assets/references/temporal-lens-interface-concept.png", className: "future-visual--development", caption: "Built-form emphasis" },
};
