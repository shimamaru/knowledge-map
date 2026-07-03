import Link from "next/link";
import type { RecordItem } from "@/data/records";
import { uniqueTags } from "@/lib/records";

export default function MapTags({ records }: { records: RecordItem[] }) {
  const tags = uniqueTags(records);

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
