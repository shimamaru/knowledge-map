import Link from "next/link";
import Header from "@/components/Header";
import RecordCard from "@/components/RecordCard";
import { SearchIcon } from "@/components/icons";
import { getStandfmRecords } from "@/lib/standfm";

export const dynamic = "force-dynamic";

type RecordsPageProps = {
  searchParams: Promise<{
    q?: string;
    tag?: string;
  }>;
};

function matchesQuery(record: { title: string; text: string }, query: string): boolean {
  if (!query) return true;
  const target = `${record.title} ${record.text}`.toLowerCase();
  return target.includes(query.toLowerCase());
}

const MIN_TAG_OCCURRENCE = 2;

function uniqueTags(records: { tags: string[] }[]): string[] {
  const counts = new Map<string, number>();
  for (const record of records) {
    for (const tag of record.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_TAG_OCCURRENCE)
    .map(([tag]) => tag)
    .sort((a, b) => a.localeCompare(b, "ja"));
}

export default async function RecordsPage({ searchParams }: RecordsPageProps) {
  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const tag = params.tag?.trim() ?? "";
  const records = await getStandfmRecords();
  const tags = uniqueTags(records);
  const filteredRecords = records.filter(
    (record) => (!tag || record.tags.includes(tag)) && matchesQuery(record, query),
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="px-6 py-10 sm:px-10">
        <div className="max-w-5xl">
          <p className="text-xs text-foreground/60">
            <Link href="/" className="hover:text-foreground">
              ホーム
            </Link>{" "}
            / 記録
          </p>
          <h1 className="font-serif-jp mt-4 text-3xl sm:text-4xl">記録</h1>

          <form action="/records" className="mt-6 flex max-w-xl items-center gap-2">
            {tag && <input type="hidden" name="tag" value={tag} />}
            <input
              type="search"
              name="q"
              defaultValue={query}
              aria-label="投稿を検索"
              placeholder="タイトルと本文を検索"
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
            {tags.map((item) => (
              <Link
                key={item}
                href={`/records?tag=${encodeURIComponent(item)}${query ? `&q=${encodeURIComponent(query)}` : ""}`}
                className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                  item === tag
                    ? "border-foreground/40 bg-platinum text-foreground"
                    : "border-border bg-card text-foreground/70 hover:border-foreground/40"
                }`}
              >
                {item}
              </Link>
            ))}
            {(tag || query) && (
              <Link
                href="/records"
                className="rounded-full border border-border bg-card px-3 py-1 text-xs text-foreground/60 transition-colors hover:border-foreground/40"
              >
                解除
              </Link>
            )}
          </div>

          <div className="mt-8 flex items-center justify-between border-b border-border pb-3">
            <h2 className="text-sm tracking-wide">
              {tag ? `${tag} の投稿` : query ? "検索結果" : "すべての投稿"}
            </h2>
            <span className="text-xs text-foreground/50">{filteredRecords.length}件</span>
          </div>

          {filteredRecords.length > 0 ? (
            <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filteredRecords.map((record) => (
                <RecordCard key={record.url} record={record} showText />
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-foreground/60">一致する投稿がありません。</p>
          )}
        </div>
      </main>
    </div>
  );
}
