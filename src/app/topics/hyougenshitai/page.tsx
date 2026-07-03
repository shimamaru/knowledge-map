import Header from "@/components/Header";
import TopicTree from "@/components/TopicTree";
import { ArrowRightIcon } from "@/components/icons";
import { readTopicDetail } from "@/lib/topicMarkdown";
import Link from "next/link";

export const dynamic = "force-dynamic";

const pageDescription =
  "表現したい気持ちは、技術やセンスだけでなく、その人の弱さや履歴、生活のリアルな痛みが言葉や声に滲み出ることから生まれる。土地の気配が作品を作ること、劣等感を少し離れた場所から見られる形にすること、ボイスメモとAIで思考を再利用できる形に整えること。表現することと生きることのつながりを見つめていく記録。";

export default function HyougenShitaiTopicPage() {
  const topic = readTopicDetail("hyougenshitai");

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

        <TopicTree records={topic.records} topicTitle={topic.title} />
      </main>
    </div>
  );
}
