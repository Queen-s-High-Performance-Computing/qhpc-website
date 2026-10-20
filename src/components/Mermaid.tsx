"use client";

import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: true,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "var(--font-mono)",
  themeVariables: {
    primaryColor: "#4A90D9",
    primaryTextColor: "#E8EDF5",
    primaryBorderColor: "#1E293B",
    lineColor: "#64748B",
    secondaryColor: "#8B7FB8",
    tertiaryColor: "#1A2332",
  },
});

export function Mermaid({ chart }: { chart: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      mermaid.contentLoaded();
      // Force re-render of mermaid diagram
      const renderChart = async () => {
        try {
          const { svg } = await mermaid.render(`mermaid-${Math.random().toString(36).substring(7)}`, chart);
          if (ref.current) {
            ref.current.innerHTML = svg;
          }
        } catch (error) {
          console.error("Mermaid render error:", error);
        }
      };
      renderChart();
    }
  }, [chart]);

  return <div ref={ref} className="mermaid-container flex justify-center py-8 overflow-x-auto" />;
}
