import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

const title = "AIに整理を任せる";

const notes = [
  {
    title: "整理しなくていい、というのが核心",
    body: "AIに渡す時に整理しなくていい、というのが一番大きい。どこに書いてもいい。整理しなくても勝手に整理できるパイプラインを作れば、勝手に分割されるし、勝手に取り出せるようになる。",
    tags: ["ai", "obsidian"],
    date: "2026-06-21",
  },
  {
    title: "録音→ブロック化→インデックス化",
    body: "録音した内容を文字起こしし、Claudeでブロック化して、インデックス化するフローを確立した。過去のアーカイブも同じ流れで再利用可能になる。喋ったことをそのままAIに入れて、自分自身の思考を進めたり外部発信につなげられるようになった。",
    tags: ["obsidian", "voice-memo"],
    date: "2026-06-03",
  },
  {
    title: "自分で構造化しようとしない",
    body: "これまでは自分で考えたことをある程度整理した状態で入れないといけなかった。それをやめて、判断はAIに預ける。書くことに集中して、関連しそうな過去のメモがあればAIがリンクの候補を教えてくれる。",
    tags: ["ai", "knowledge-management"],
    date: "2026-06-21",
  },
];

export default function AiSeiriTopicPage() {
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
