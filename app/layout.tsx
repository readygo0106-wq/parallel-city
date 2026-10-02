import type { Metadata } from "next";
import "./globals.css";
import { SimulationProvider } from "@/lib/simulation/store";

export const metadata: Metadata = {
  title: {
    default: "The Parallel City · Qingdao",
    template: "%s · The Parallel City",
  },
  description:
    "An illustrated urban ecology atlas and speculative city simulation set in Qingdao.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body><SimulationProvider>{children}</SimulationProvider></body>
    </html>
  );
}
