import type { RecordItem } from "@/data/records";
import { getStandfmRecords } from "@/lib/standfm";
import { readAllTopicRecords } from "@/lib/topicMarkdown";

const MIN_TAG_OCCURRENCE = 2;

function formatTopicRecordDate(date: string): string {
  return date.replaceAll("-", ".");
}

function topicRecordsToRecordItems(): RecordItem[] {
  return readAllTopicRecords().map((record) => ({
    media: record.media,
    title: record.title,
    date: formatTopicRecordDate(record.date),
    tags: record.tags,
    url: record.url,
    description: record.description,
    detail: record.detail,
    topic: record.topic,
  }));
}

function mergeRecords(records: RecordItem[]): RecordItem[] {
  const seen = new Set<string>();
  const merged: RecordItem[] = [];

  for (const record of records) {
    const key = record.url || `${record.title}-${record.date}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(record);
  }

  return merged.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getAllRecords(): Promise<RecordItem[]> {
  const standfmRecords = await getStandfmRecords();
  return mergeRecords([...standfmRecords, ...topicRecordsToRecordItems()]);
}

export function uniqueTags(records: RecordItem[]): string[] {
  const counts = new Map<string, number>();
  for (const record of records) {
    for (const tag of record.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .filter(([, count]) => count >= MIN_TAG_OCCURRENCE)
    .map(([tag]) => tag)
    .sort((a, b) => a.localeCompare(b, "ja"));
}
