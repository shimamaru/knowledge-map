import { records } from "@/data/records";

export default function RecentRecords() {
  return (
    <section className="px-6 py-10 sm:px-10">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h2 className="text-sm tracking-wide">最近の記録</h2>
        <a href="#" className="text-xs text-foreground/60 transition-colors hover:text-foreground">
          すべて見る →
        </a>
      </div>
      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {records.map((record) => (
          <a
            key={record.title}
            href="#"
            className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/40"
          >
            <div className="flex items-start justify-between">
              <span className="text-xs text-foreground/60">{record.media}</span>
              <record.icon className="h-5 w-5 shrink-0 text-foreground/60 transition-colors group-hover:text-foreground" />
            </div>
            <p className="mt-3 text-sm leading-relaxed">{record.title}</p>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
              <div className="flex flex-wrap gap-1.5">
                {record.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-platinum px-2 py-0.5 text-[11px] text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <span className="text-xs text-foreground/60">{record.date}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
