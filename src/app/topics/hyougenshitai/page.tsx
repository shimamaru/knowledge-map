import Header from "@/components/Header";
import TopicTree from "@/components/TopicTree";
import { ArrowRightIcon } from "@/components/icons";
import { readTopicDetail } from "@/lib/topicMarkdown";
import Link from "next/link";

export const dynamic = "force-dynamic";

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
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/60">
          {topic.description}
        </p>

        <TopicTree records={topic.records} topicTitle={topic.title} />
      </main>
    </div>
  );
}
