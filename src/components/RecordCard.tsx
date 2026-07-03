import Link from "next/link";
import { WaveformIcon } from "@/components/icons";
import type { RecordItem } from "@/data/records";

function excerpt(text: string, maxLength = 120): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}

export default function RecordCard({
  record,
  showText = false,
  activeTag = "",
  preserveQuery = "",
}: {
  record: RecordItem;
  showText?: boolean;
  activeTag?: string;
  preserveQuery?: string;
}) {
  const buildTagHref = (tag: string) => {
    const params = new URLSearchParams();
    if (tag !== activeTag) params.set("tag", tag);
    if (preserveQuery) params.set("q", preserveQuery);
    const search = params.toString();
    return search ? `/records?${search}` : "/records";
  };

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/40">
      <div>
        <div className="flex items-start justify-between">
          <div className="flex min-w-0 flex-wrap items-center gap-1.5 text-xs text-foreground/55">
            <span>{record.media}</span>
            {record.topic && (
              <>
                <span className="text-foreground/25">/</span>
                <span className="truncate">{record.topic}</span>
              </>
            )}
          </div>
          <WaveformIcon className="h-5 w-5 shrink-0 text-foreground/60" />
        </div>
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 block text-[15px] font-medium leading-relaxed transition-colors hover:text-foreground/70"
        >
          {record.title}
        </a>
        {showText && record.text && (
          <p className="mt-2 text-[13px] leading-6 text-foreground/65">
            {excerpt(record.text)}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1.5">
          {record.tags.map((tag) => {
            const active = tag === activeTag;

            return (
              <Link
                key={tag}
                href={buildTagHref(tag)}
                aria-current={active ? "true" : undefined}
                className={`rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  active
                    ? "border-foreground/30 bg-platinum text-foreground"
                    : "border-transparent bg-platinum text-foreground hover:border-foreground/20 hover:bg-border"
                }`}
              >
                {tag}
              </Link>
            );
          })}
        </div>
        <span className="text-xs text-foreground/60">{record.date}</span>
      </div>
    </article>
  );
}
