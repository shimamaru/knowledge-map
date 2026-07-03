import { readFileSync } from "fs";
import path from "path";
import { records as fallbackRecords, type RecordItem } from "@/data/records";

const STANDFM_CHANNEL_ID = "6a1eeedd6eae39fcf566922c";
const STANDFM_RECORDS_PATH = path.join(process.cwd(), "content", "standfm-records.json");
let cachedStandfmRecords: RecordItem[] | null = null;

export const STANDFM_CHANNEL_URL = `https://stand.fm/channels/${STANDFM_CHANNEL_ID}`;

function isRecordItem(value: unknown): value is RecordItem {
  if (!value || typeof value !== "object") return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record.media === "string" &&
    typeof record.title === "string" &&
    typeof record.date === "string" &&
    Array.isArray(record.tags) &&
    record.tags.every((tag) => typeof tag === "string") &&
    typeof record.url === "string" &&
    typeof record.text === "string"
  );
}

function readLocalStandfmRecords(): RecordItem[] {
  if (cachedStandfmRecords) return cachedStandfmRecords;

  try {
    const data = JSON.parse(readFileSync(STANDFM_RECORDS_PATH, "utf-8")) as unknown;
    if (!Array.isArray(data)) return fallbackRecords;

    const records = data.filter(isRecordItem);
    cachedStandfmRecords = records.length > 0 ? records : fallbackRecords;
    return cachedStandfmRecords;
  } catch {
    return fallbackRecords;
  }
}

export function getStandfmRecords(limit = 9): RecordItem[] {
  return readLocalStandfmRecords().slice(0, limit);
}

export function getLatestStandfmRecords(limit = 3): RecordItem[] {
  return getStandfmRecords(limit);
}
