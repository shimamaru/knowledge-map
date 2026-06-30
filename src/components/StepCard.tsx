"use client";

import { useState } from "react";
import type { FlowStep } from "@/data/flowSteps";

export default function StepCard({ step }: { step: FlowStep }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 w-full max-w-2xl rounded-xl border border-[#6a96b0] bg-[#0a1622] p-6">
      <p className="text-xs tracking-wide text-[#6a96b0]">選択中</p>
      <h2 className="mt-1 text-lg font-semibold text-[#dfe7ec]">{step.label}</h2>

      {step.references && step.references.length > 0 && (
        <div className="mt-4 border-t border-[#6a96b0]/30">
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex w-full items-center justify-between py-3 text-left text-sm font-medium text-[#dfe7ec]"
          >
            <span>参考URL</span>
            <span className="text-[#6a96b0]">{open ? "−" : "+"}</span>
          </button>
          {open && (
            <ul className="grid gap-3 pb-4 sm:grid-cols-2">
              {step.references.map((ref) => (
                <li key={ref.url}>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block overflow-hidden rounded-lg border border-[#6a96b0]/40 hover:border-[#a3c6d6]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={ref.thumbnail}
                      alt={ref.title}
                      className="aspect-video w-full object-cover"
                    />
                    <p className="p-2 text-xs text-[#dfe7ec]">{ref.title}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
