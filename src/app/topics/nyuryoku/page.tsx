import Header from "@/components/Header";
import NoteCard from "@/components/NoteCard";
import { ArrowRightIcon } from "@/components/icons";
import Link from "next/link";

const title = "入力に迷わない";

const notes = [
  {
    title: "ジャーナルに一元化する",
    body: "iPhoneメモかNotionかObsidianか、どこに書くか迷うと手が止まる。まずジャーナルにどんどん書いていくことで入力先の迷いをなくす。新しいまとまりが出てきたら、後からユニークノートとしてインボックスに移せばいい。",
    tags: ["obsidian", "pkm"],
    date: "2026-04-16",
  },
  {
    title: "ボイスメモで喋るだけでも素材になる",
    body: "書けない日は声で残していい。文字起こし→Claudeでブロック化→インボックスに新規ノートという流れで、喋った内容がそのままメモの素材になる。",
    tags: ["obsidian", "voice-memo"],
    date: "2026-04-22",
  },
  {
    title: "完璧に書かなくていい",
    body: "ジャーナルに雑に放り込むだけでいい。整理や推敲はAIと一緒に後からできる。「何のメモか」を先に決めず、まず出すことだけを優先する。",
    tags: ["obsidian", "knowledge-management"],
    date: "2026-06-04",
  },
];

export default function NyuryokuTopicPage() {
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
