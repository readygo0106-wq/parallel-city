import type { ReactNode } from "react";

export function Eyebrow({ children }: { children: ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

export function DataTag({ children = "VISUAL PREVIEW" }: { children?: ReactNode }) {
  return <span className="data-tag">{children}</span>;
}

export function SectionHeading({ number, title, aside }: { number: string; title: string; aside?: string }) {
  return (
    <div className="section-heading">
      <div className="section-heading-main"><span>{number}</span><h2>{title}</h2></div>
      {aside ? <span className="section-heading-aside">{aside}</span> : null}
    </div>
  );
}
