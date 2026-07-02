import Link from "next/link";
import RecordCard from "@/components/RecordCard";
import type { RecordItem } from "@/data/records";

export default function RecentRecords({ records }: { records: RecordItem[] }) {
  return (
    <section className="px-6 py-10 sm:px-10">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm tracking-wide">最近の記録</h2>
        <Link
          href="/records"
          className="text-xs text-foreground/60 transition-colors hover:text-foreground"
        >
          すべて見る →
        </Link>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {records.map((record) => (
          <RecordCard key={record.url} record={record} />
        ))}
      </div>
    </section>
  );
}
