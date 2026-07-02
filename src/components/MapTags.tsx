import Link from "next/link";
import type { RecordItem } from "@/data/records";

function getTags(records: RecordItem[]): string[] {
  const counts = new Map<string, number>();
  for (const record of records) {
    for (const tag of record.tags) counts.set(tag, (counts.get(tag) ?? 0) + 1);
  }

  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "ja"))
    .map(([tag]) => tag);
}

export default function MapTags({ records }: { records: RecordItem[] }) {
  const tags = getTags(records);

  return (
    <section className="px-6 py-10 sm:px-10">
      <h2 className="border-b border-border pb-3 text-sm tracking-wide">タグ</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <Link
            key={tag}
            href={`/records?tag=${encodeURIComponent(tag)}`}
            className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-platinum"
          >
            {tag}
          </Link>
        ))}
      </div>
    </section>
  );
}
