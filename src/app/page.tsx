"use client";

import { useCallback, useState } from "react";
import MermaidDiagram from "@/components/MermaidDiagram";
import StepCard from "@/components/StepCard";
import { flowSteps } from "@/data/flowSteps";

const FLOW_CHART = `flowchart LR
  A[困りごと: 何から手をつけていいかわからない] --> B[紙にジャーナリング]
  B --> C[ボイスメモで1分喋る]
  C --> D[Obsidianに素材化]
  D --> E[Claudeに読ませて今日やることを1つ聞く]
  E --> F[それだけをやる]

  classDef step fill:#0a1622,stroke:#6a96b0,stroke-width:1.5px,color:#dfe7ec,rx:8,ry:8

  class A,B,C,D,E,F step`;

export default function Home() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedStep = flowSteps.find((s) => s.id === selectedId);
  const handleNodeClick = useCallback((id: string) => setSelectedId(id), []);

  return (
    <div className="min-h-screen bg-[#0a1622]">
      <main className="flex flex-col items-center px-6 py-10">
        <div className="w-full">
          <MermaidDiagram chart={FLOW_CHART} onNodeClick={handleNodeClick} />
        </div>
        {selectedStep && <StepCard step={selectedStep} />}
      </main>
    </div>
  );
}
