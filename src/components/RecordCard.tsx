"use client";

import Link from "next/link";
import { useState } from "react";
import { DocumentIcon } from "@/components/icons";
import { mediaIcons } from "@/data/mediaIcons";
import type { RecordItem } from "@/data/records";

function renderEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*([^*]+)\*\*$/);
    if (!match) return part;
    return (
      <strong key={i} className="font-semibold text-foreground">
        {match[1]}
      </strong>
    );
  });
}

function buildTagHref(tag: string, activeTag: string, preserveQuery: string): string {
  const params = new URLSearchParams();
  if (tag !== activeTag) params.set("tag", tag);
  if (preserveQuery) params.set("q", preserveQuery);
  const search = params.toString();
  return search ? `/records?${search}` : "/records";
}

const MAX_VISIBLE_TAGS = 3;

export default function RecordCard({
  record,
  activeTag = "",
  preserveQuery = "",
}: {
  record: RecordItem;
  activeTag?: string;
  preserveQuery?: string;
}) {
  const [detailOpen, setDetailOpen] = useState(false);
  const Icon = mediaIcons[record.media] ?? DocumentIcon;
  const linkLabel = record.media === "stand.fm" ? "stand.fmで聴く" : `${record.media}で開く`;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30">
      <div>
        <div className="flex h-4 items-center justify-between">
          <div className="flex min-w-0 items-center gap-1.5 text-[11px] uppercase tracking-wide text-foreground/45">
            <span>{record.media}</span>
            {record.topic && (
              <>
                <span className="normal-case text-foreground/25">/</span>
                <span className="truncate normal-case">{record.topic}</span>
              </>
            )}
          </div>
          <Icon className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/70" />
        </div>
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block min-h-[52px] overflow-hidden text-sm font-medium leading-relaxed text-foreground transition-colors [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] group-hover:text-foreground"
        >
          {record.title}
        </a>
        {record.description && (
          <p
            className={`mt-2 text-[13px] leading-6 text-foreground/70 ${
              detailOpen
                ? ""
                : "min-h-[48px] overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]"
            }`}
          >
            {record.description}
            {record.detail && !detailOpen && "…"}
            {record.detail && detailOpen && (
              <>
                {" "}
                {renderEmphasis(record.detail)}
              </>
            )}
          </p>
        )}
      </div>

      {record.detail && (
        <div className="mt-3">
          <button
            type="button"
            onClick={() => setDetailOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-sm text-[11px] font-semibold text-foreground/55 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          >
            <span
              className="inline-flex h-3 w-3 items-center justify-center transition-transform"
              style={{ transform: detailOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              <svg viewBox="0 0 10 10" className="h-2 w-2">
                <path d="M2 0 L8 5 L2 10 Z" fill="currentColor" />
              </svg>
            </span>
            {detailOpen ? "閉じる" : "続きを読む"}
          </button>
        </div>
      )}

      <div className="mt-5 flex h-[26px] flex-nowrap items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex min-w-0 flex-1 flex-nowrap items-center gap-1.5 overflow-hidden">
          {record.tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => {
            const active = tag === activeTag;

            return (
              <Link
                key={tag}
                href={buildTagHref(tag, activeTag, preserveQuery)}
                aria-current={active ? "true" : undefined}
                className={`shrink-0 truncate rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  active
                    ? "border-foreground/30 bg-platinum text-foreground"
                    : "border-transparent bg-platinum text-foreground hover:border-foreground/20 hover:bg-border"
                }`}
              >
                {tag}
              </Link>
            );
          })}
          {record.tags.length > MAX_VISIBLE_TAGS && (
            <span className="shrink-0 rounded-full px-2.5 py-1 text-[11px] text-foreground/45">
              +{record.tags.length - MAX_VISIBLE_TAGS}
            </span>
          )}
        </div>
        <span className="shrink-0 text-[11px] text-foreground/40">{record.date}</span>
      </div>

      {record.url && (
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <span className="inline-flex h-3 w-3 items-center justify-center">
            <svg viewBox="0 0 10 10" className="h-2 w-2">
              <path d="M2 0 L8 5 L2 10 Z" fill="currentColor" />
            </svg>
          </span>
          {linkLabel}
        </a>
      )}
    </div>
  );
}
