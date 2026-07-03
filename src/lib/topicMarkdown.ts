import { readFileSync, readdirSync } from "fs";
import path from "path";

export type TopicRecord = {
  title: string;
  media: string;
  date: string;
  tags: string[];
  url: string;
  description: string;
  detail: string;
};

export type TopicDetail = {
  title: string;
  description: string;
  records: TopicRecord[];
};

export function readTopicDetail(slug: string): TopicDetail {
  const dir = path.join(process.cwd(), "content", "topics", slug);
  const topicMeta = JSON.parse(
    readFileSync(path.join(dir, "_meta", "topic.json"), "utf-8")
  ) as { title: string; description: string };

  const recordFiles = readdirSync(dir).filter((file) => file.endsWith(".json"));
  const records = recordFiles
    .map((file) => JSON.parse(readFileSync(path.join(dir, file), "utf-8")) as TopicRecord)
    .sort((a, b) => b.date.localeCompare(a.date));

  return { title: topicMeta.title, description: topicMeta.description, records };
}
