export type NoteCardData = {
  title: string;
  body: string;
  tags: string[];
  date: string;
};

export default function NoteCard({ note }: { note: NoteCardData }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-sm font-semibold leading-relaxed text-foreground">{note.title}</p>
      <p className="mt-2 text-[13px] leading-6 text-foreground/70">{note.body}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex flex-wrap items-center gap-1.5">
          {note.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-platinum px-2.5 py-1 text-[11px] text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="shrink-0 text-[11px] text-foreground/40">{note.date}</span>
      </div>
    </div>
  );
}
