import Link from "next/link";
import Header from "@/components/Header";
import RecordCard from "@/components/RecordCard";
import { SearchIcon } from "@/components/icons";
import type { RecordItem } from "@/data/records";
import { getAllRecords, uniqueTags } from "@/lib/records";

export const dynamic = "force-dynamic";

type RecordsPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
  }>;
};

function normalizeQuery(value: string): string {
  return value.trim().toLowerCase();
}

function matchesQuery(record: RecordItem, query: string): boolean {
  if (!query) return true;
  const target = [
    record.title,
    record.description,
    record.detail,
    record.media,
    record.date,
    record.topic,
    ...record.tags,
  ].join(" ").toLowerCase();

  return normalizeQuery(query)
    .split(/\s+/)
    .every((word) => target.includes(word));
}

function buildRecordsHref({ tag, query }: { tag?: string; query?: string }): string {
  const params = new URLSearchParams();
  if (tag) params.set("tag", tag);
  if (query) params.set("q", query);
  const search = params.toString();
  return search ? `/records?${search}` : "/records";
}

export default async function RecordsPage({ searchParams }: RecordsPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const tag = params.tag?.trim() ?? "";
  const records = await getAllRecords();
  const tags = uniqueTags(records);
  const filteredRecords = records.filter(
    (record) => (!tag || record.tags.includes(tag)) && matchesQuery(record, query),
  );
  const resultLabel = tag
    ? `${tag} の記録`
    : query
      ? "検索結果"
      : "すべての記録";
  const clearQueryHref = buildRecordsHref({ tag });
  const clearTagHref = buildRecordsHref({ query });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-4 py-8 sm:px-10 sm:py-10">
        <div className="mx-auto max-w-5xl">
          <p className="text-xs text-foreground/60">
            <Link href="/" className="hover:text-foreground">
              ホーム
            </Link>{" "}
            / 記録
          </p>
          <h1 className="font-serif-jp mt-4 text-3xl sm:text-4xl">記録</h1>

          <form action="/records" className="mt-6 flex w-full items-center gap-2">
            {tag && <input type="hidden" name="tag" value={tag} />}
            <input
              type="search"
              name="q"
              defaultValue={query}
              aria-label="記録を検索"
              placeholder="タイトル・本文・タグを検索"
              className="h-11 min-w-0 flex-1 rounded-full border border-border bg-card px-4 text-sm outline-none transition-colors placeholder:text-foreground/35 focus:border-foreground/40"
            />
            <button
              type="submit"
              aria-label="検索"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-card transition-colors hover:border-foreground/40 hover:bg-platinum"
            >
              <SearchIcon className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-2">
            {tags.map((item) => {
              const active = item === tag;
              const href = active
                ? buildRecordsHref({ query })
                : buildRecordsHref({ tag: item, query });

              return (
                <Link
                  key={item}
                  href={href}
                  aria-current={active ? "true" : undefined}
                  className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                    active
                      ? "border-foreground/40 bg-platinum text-foreground"
                      : "border-border bg-card text-foreground/70 hover:border-foreground/40"
                  }`}
                >
                  {item}
                </Link>
              );
            })}
            {(tag || query) && (
              <>
                {query && (
                  <Link
                    href={clearQueryHref}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-foreground/40"
                  >
                    検索解除
                  </Link>
                )}
                {tag && (
                  <Link
                    href={clearTagHref}
                    className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-foreground/40"
                  >
                    タグ解除
                  </Link>
                )}
                <Link
                  href="/records"
                  className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-foreground/40"
                >
                  解除
                </Link>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm tracking-wide">
              {resultLabel}
            </h2>
            <span className="text-xs text-foreground/50">{filteredRecords.length}件</span>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 items-start gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecords.map((record) => (
                <RecordCard
                  key={record.url}
                  record={record}
                  activeTag={tag}
                  preserveQuery={query}
                />
              ))}
            </div>
          ) : (
            <div className="mt-6 border border-border bg-card px-5 py-6 text-sm leading-7 text-foreground/65">
              一致する記録がありません。検索語を短くするか、タグを外して探してみてください。
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
