import Header from "@/components/Header";
import TopicTree from "@/components/TopicTree";
import { ArrowRightIcon } from "@/components/icons";
import { readTopicDetail } from "@/lib/topicMarkdown";
import Link from "next/link";

export const dynamic = "force-dynamic";

const pageDescription =
  "書いたメモが取り出せず埋もれていた状態から、ObsidianとAIの組み合わせで、考えたことを資産として使えるようにしていく記録。";

const sections = [
  {
    no: "01",
    title: "入力に迷わない",
    items: [
      {
        title: "分類は後回しでいい",
        detail: "デイリーノートに、思ったことをそのまま書く。フォルダも見出しも考えなくていい。",
      },
      {
        title: "声で残してもいい",
        detail: "書けない日はボイスメモで喋るだけでも素材になる。あとでテキストにすればいい。",
      },
      {
        title: "「何のメモか」を先に決めない",
        detail: "意味づけは書いた後でいい。まず出すことだけを優先する。",
      },
    ],
  },
  {
    no: "02",
    title: "フォルダで分けない",
    items: [
      {
        title: "リンクでつながる仕組みを使う",
        detail: "Obsidianはフォルダの階層ではなく、メモ同士のリンクで成り立っている。",
      },
      {
        title: "タグは1つで十分",
        detail: "細かく分類しようとするほど、その場で迷って手が止まる。",
      },
      {
        title: "「あとで整理する」フォルダを作らない",
        detail: "作った時点でそこが墓場になる。今の場所にそのまま置いておく。",
      },
    ],
  },
  {
    no: "03",
    title: "AIに整理を任せる",
    items: [
      {
        title: "書いたものをAIに読ませる",
        detail: "自分で構造化しようとせず、ブロックごとに分けてもらう。",
      },
      {
        title: "判断はAIに預ける",
        detail: "「これは何の話か」を考える手間を減らし、書くことに集中する。",
      },
      {
        title: "関連メモの候補をもらう",
        detail: "過去に似た内容があれば、AIがリンク先の候補を教えてくれる。",
      },
    ],
  },
  {
    no: "04",
    title: "取り出して使う",
    items: [
      {
        title: "メモは取り出す場所だと考える",
        detail: "しまっておく場所ではなく、あとで検索して呼び出す場所として使う。",
      },
      {
        title: "検索で出てきたら十分",
        detail: "完璧に整理されていなくても、出てきた時点で元は取れている。",
      },
      {
        title: "見返して初めて気づくこともある",
        detail: "書いた当時はわからなかった意味が、後から見えることもある。",
      },
    ],
  },
];

export default function ObsidianTopicPage() {
  const topic = readTopicDetail("obsidian");

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
          / {topic.title}
        </p>
        <h1 className="font-serif-jp mt-4 text-3xl sm:text-4xl">{topic.title}</h1>
        <p className="mt-4 max-w-2xl border-l-2 border-foreground/20 pl-4 text-[15px] leading-7 text-foreground/75">
          {pageDescription}
        </p>

        <div className="mt-12 space-y-12">
          {sections.map((section) => (
            <section key={section.no}>
              <div className="mb-5 flex items-baseline gap-3">
                <span className="font-serif-jp text-sm text-foreground/40">{section.no}</span>
                <h2 className="font-serif-jp text-lg">{section.title}</h2>
              </div>
              <ul className="space-y-2.5">
                {section.items.map((item) => (
                  <li
                    key={item.title}
                    className="rounded-xl border border-border bg-platinum/50 p-4 sm:p-5"
                  >
                    <p className="text-[15px] font-semibold leading-relaxed text-foreground">
                      {item.title}
                    </p>
                    <p className="mt-1 text-sm leading-relaxed text-foreground/60">
                      {item.detail}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <TopicTree
          records={topic.records}
          topicTitle={topic.title}
          showExternalLink={false}
        />
      </main>
    </div>
  );
}
