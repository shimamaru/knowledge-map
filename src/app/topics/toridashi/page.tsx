import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

const title = "取り出して使う";

const notes = [
  {
    title: "メモは「保存する場所」ではなく「取り出す場所」",
    body: "他のツールは「入れる場所」で終わってしまうが、Obsidianは「取り出せる場所」として使える。フォルダではなくリンクでつながっているので、キーワードで検索すれば関連するものが全部出てくる。",
    tags: ["obsidian", "knowledge-management"],
    date: "2026-06-04",
  },
  {
    title: "考えが多い人ほど、取り出す仕組みが先",
    body: "問題は考えが足りないことではなく、取り出せる仕組みがないこと。整理力よりも先に「雑に入れて後で取り出せる仕組み」が必要。何年も思想を書いてきたのに出せない苦しみが、この仕組みが整ったことでなくなった。",
    tags: ["obsidian", "content-strategy"],
    date: "2026-06-04",
  },
  {
    title: "そういえばあれ、にAIが応えてくれる",
    body: "入力するだけで勝手に整理されて、「そういえばなんだったっけ」にAIが反応してくれるようになる。完璧に整理されていなくても、検索して出てきた時点で十分に元は取れている。",
    tags: ["ai", "obsidian"],
    date: "2026-06-21",
  },
];

export default function ToridashiTopicPage() {
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
