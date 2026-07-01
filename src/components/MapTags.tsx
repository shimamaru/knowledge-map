const tags = [
  "睡眠",
  "身体",
  "緊張",
  "食事",
  "働き方",
  "孤独",
  "創作",
  "自己理解",
  "居場所",
  "AI活用",
];

export default function MapTags() {
  return (
    <section className="px-6 py-10 sm:px-10">
      <h2 className="border-b border-border pb-3 text-sm tracking-wide">タグ</h2>
      <div className="mt-4 flex flex-wrap gap-3">
        {tags.map((tag) => (
          <a
            key={tag}
            href="#"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm transition-colors hover:border-foreground/40 hover:bg-platinum"
          >
            {tag}
          </a>
        ))}
      </div>
    </section>
  );
}
