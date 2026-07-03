import Header from "@/components/Header";
import TopicTree from "@/components/TopicTree";
import { ArrowRightIcon } from "@/components/icons";
import { readTopicDetail } from "@/lib/topicMarkdown";
import Link from "next/link";

export const dynamic = "force-dynamic";

const pageDescription =
  "人と合わないと感じる違和感は、相性の良し悪しだけでは説明できないことが多い。相談のしやすさは親密さより知恵や想像力で決まること、地方では前提から話せる場所が少なかったこと、相性はその場ではなく翌朝の体に出ること。人間関係のしんどさや孤独を、身体の反応や社会背景まで遡って読み解いていく記録。";

export default function HitoToAwanaiTopicPage() {
  const topic = readTopicDetail("hitotoawanai");

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
