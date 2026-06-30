"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

let counter = 0;

mermaid.initialize({
  startOnLoad: false,
  theme: "base",
  themeVariables: {
    background: "#0a1622",
    primaryColor: "#0a1622",
    primaryTextColor: "#dfe7ec",
    primaryBorderColor: "#6a96b0",
    lineColor: "#6a96b0",
    secondaryColor: "#0a1622",
    tertiaryColor: "#0a1622",
    fontFamily: "var(--font-geist-sans), sans-serif",
  },
  flowchart: {
    curve: "linear",
    htmlLabels: true,
  },
  securityLevel: "loose",
});

export default function MermaidDiagram({
  chart,
  onNodeClick,
}: {
  chart: string;
  onNodeClick?: (id: string) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const idRef = useRef(`mermaid-${counter++}`);

  useEffect(() => {
    let active = true;
    mermaid.render(idRef.current, chart).then(({ svg }) => {
      if (!active || !ref.current) return;
      ref.current.innerHTML = svg;

      ref.current.querySelectorAll<SVGGElement>(".node").forEach((node) => {
        const nodeId = node.id.match(/flowchart-([A-Za-z0-9_]+)-/)?.[1];
        if (!nodeId) return;
        node.style.cursor = "pointer";
        node.addEventListener("click", () => onNodeClick?.(nodeId));
      });
    });
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chart]);

  return <div ref={ref} className="overflow-x-auto" />;
}
