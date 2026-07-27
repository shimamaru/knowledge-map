import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

const title = "フォルダで分けない";

const notes = [
  {
    title: "リンクでつながるネットワーク構造",
    body: "MacやiPhoneのフォルダは家系図のように階層的で、一つのものは一つの場所にしか置けない。Obsidianはリンクベースのネットワーク構造で、一つのファイルが複数の関係を持てる。フォルダで分類しなくても、探しやすい形にできる。",
    tags: ["obsidian", "pkm"],
    date: "2026-04-16",
  },
  {
    title: "タグは1個で十分",
    body: "検索性を高くしすぎると管理コストが上がる。ほんの少しだけ検索性を上げれば十分で、タグは1個で全然大丈夫。フォルダ設計で挫折する人の9割は、分類そのものをやめて、まず全部inboxに放り込むところから変わった。",
    tags: ["obsidian", "pkm"],
    date: "2026-04-16",
  },
  {
    title: "「あとで整理する」フォルダは墓場",
    body: "\"あとで整理する\"フォルダ、作ったことがある。あれは正直墓場で、あとでは絶対に来ない。整理を自分の意志に任せるのをやめた日から、メモがちゃんと回るようになった。",
    tags: ["obsidian", "メモ術"],
    date: "2026-07-07",
  },
];

export default function FolderTopicPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-14 sm:px-10">
        <Link
          href="/"
          aria-label="ホームに戻る"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-foreground/40 transition-colors hover:text-foreground/70"
        >
          <ArrowRightIcon className="h-4 w-4 shrink-0 rotate-180" />
        </Link>
        <p className="mt-3 text-xs text-foreground/60">
          <Link href="/" className="hover:text-foreground">
            ホーム
          </Link>{" "}
          / {title}
        </p>
        <h1 className="font-serif-jp mt-4 text-3xl sm:text-4xl">{title}</h1>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {notes.map((note) => (
            <NoteCard key={note.title} note={note} />
          ))}
        </div>
      </main>
    </div>
  );
}
