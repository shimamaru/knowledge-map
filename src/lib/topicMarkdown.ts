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

export type TopicRecordWithTopic = TopicRecord & {
  topic: string;
};

const topicDetailCache = new Map<string, TopicDetail>();
let allTopicRecordsCache: TopicRecordWithTopic[] | null = null;

export function readTopicDetail(slug: string): TopicDetail {
  const cached = topicDetailCache.get(slug);
  if (cached) return cached;

  const dir = path.join(process.cwd(), "content", "topics", slug);
  const topicMeta = JSON.parse(
    readFileSync(path.join(dir, "_meta", "topic.json"), "utf-8")
  ) as { title: string; description: string };

  const recordFiles = readdirSync(dir).filter((file) => file.endsWith(".json"));
  const records = recordFiles
    .map((file) => JSON.parse(readFileSync(path.join(dir, file), "utf-8")) as TopicRecord)
    .sort((a, b) => b.date.localeCompare(a.date));

  const detail = { title: topicMeta.title, description: topicMeta.description, records };
  topicDetailCache.set(slug, detail);
  return detail;
}

export function readAllTopicRecords(): TopicRecordWithTopic[] {
  if (allTopicRecordsCache) return allTopicRecordsCache;

  const topicsDir = path.join(process.cwd(), "content", "topics");

  allTopicRecordsCache = readdirSync(topicsDir, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .flatMap((entry) => {
      const topic = readTopicDetail(entry.name);
      return topic.records.map((record) => ({ ...record, topic: topic.title }));
    })
    .sort((a, b) => b.date.localeCompare(a.date));

  return allTopicRecordsCache;
}
