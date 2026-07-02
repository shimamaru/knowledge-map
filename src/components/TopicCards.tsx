import { ArrowRightIcon } from "./icons";
import { topics } from "@/data/topics";

export default function TopicCards() {
  return (
    <section id="topics" className="grid grid-cols-1 gap-4 px-6 sm:grid-cols-2 sm:px-10 lg:grid-cols-4">
      {topics.map((topic) => (
        <a
          key={topic.no}
          href={topic.href}
          className="group flex flex-col justify-between rounded-2xl border border-border bg-card p-5 transition-colors hover:border-foreground/40"
        >
          <div className="flex items-start justify-between">
            <span className="font-serif-jp text-lg text-foreground/60">{topic.no}</span>
            <topic.icon className="h-6 w-6 text-foreground/60 transition-colors group-hover:text-foreground" />
          </div>
          <div className="mt-6">
            <h3 className="font-serif-jp text-lg">{topic.title}</h3>
            <div className="mt-2 flex items-end justify-between gap-2">
              <p className="text-xs leading-relaxed text-foreground/60">
                {topic.description}
              </p>
              <ArrowRightIcon className="h-4 w-4 shrink-0 text-foreground/60 transition-transform group-hover:translate-x-1 group-hover:text-foreground" />
            </div>
          </div>
        </a>
      ))}
    </section>
  );
}
