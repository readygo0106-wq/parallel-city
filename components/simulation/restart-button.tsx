"use client";

import { useRouter } from "next/navigation";
import { useSimulation } from "@/lib/simulation/store";

export function RestartButton() {
  const router = useRouter();
  const { reset } = useSimulation();
  return <button type="button" className="text-link restart-button" onClick={() => { reset(); router.push("/enter"); }}>START A NEW FLIGHT ↗</button>;
}
