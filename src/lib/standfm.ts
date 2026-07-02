import { records as fallbackRecords, type RecordItem } from "@/data/records";

const STANDFM_SEED_EPISODE_URL = "https://stand.fm/episodes/6a3fd574ac08572069cbff13";
const STANDFM_CHANNEL_ID = "6a1eeedd6eae39fcf566922c";

export const STANDFM_CHANNEL_URL = `https://stand.fm/channels/${STANDFM_CHANNEL_ID}`;

function channelRef(channelId: string): string {
  return Buffer.from(`Channel:${channelId}`, "utf-8").toString("base64");
}

type RelayValue = {
  __typename?: string;
  episodeId?: string;
  title?: string;
  publishedAt?: number;
  channel?: { __ref?: string };
};

type EpisodeSummary = {
  episodeId: string;
  title: string;
  publishedAt: number;
};

const TAG_ALIASES: Record<string, string | null> = {
  standfm: null,
  "stand.fm": null,
  身体感覚: "身体",
  "心と体": "身体",
  セルフケア: "身体",
};

const TAG_RULES = [
  { tag: "睡眠", keywords: ["眠", "不眠", "寝", "熟睡"] },
  { tag: "身体", keywords: ["身体", "体", "自律神経", "緊張", "呼吸", "血糖値", "首"] },
  { tag: "緊張", keywords: ["緊張", "防衛反応", "抵抗感", "こわば"] },
  { tag: "食事", keywords: ["食事", "血糖値", "糖質", "タンパク質"] },
  { tag: "働き方", keywords: ["働", "就活", "バイト", "仕事"] },
  { tag: "人間関係", keywords: ["人間関係", "人当たり", "相性", "初対面", "相談"] },
  { tag: "孤独", keywords: ["孤独", "地方", "居場所"] },
  { tag: "創作", keywords: ["創作", "作品", "芸術", "表現", "声"] },
  { tag: "自己理解", keywords: ["自己理解", "内省", "無意識", "夢診断", "ホロスコープ", "直感"] },
  { tag: "AI活用", keywords: ["AI", "Claude", "Obsidian", "ジャーナリング"] },
];

function formatDate(timestamp: number): string {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .format(new Date(timestamp))
    .replaceAll("/", ".");
}

function decodeHtml(value: string): string {
  return value
    .replace(/&#x([0-9a-f]+);/gi, (_, hex: string) => String.fromCodePoint(Number.parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, code: string) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/g, "\"")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

function cleanText(value: string): string {
  return value
    .replace(/#[^\s#]+/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractEpisodeDescription(html: string): string {
  const match = html.match(/<meta[^>]+name="description"[^>]+content="([\s\S]*?)"\/?>/);
  return match ? decodeHtml(match[1]) : "";
}

function normalizeTag(tag: string): string | null {
  const normalized = tag.replace(/^#/, "").trim();
  if (!normalized) return null;
  return Object.prototype.hasOwnProperty.call(TAG_ALIASES, normalized)
    ? TAG_ALIASES[normalized]
    : normalized;
}

function extractHashtagTags(value: string): string[] {
  const tags: string[] = [];
  const pattern = /#([^\s#]+)/g;
  let match = pattern.exec(value);

  while (match) {
    const tag = normalizeTag(match[1]);
    if (tag) tags.push(tag);
    match = pattern.exec(value);
  }

  return tags;
}

function buildTags(title: string, rawText: string): string[] {
  const text = `${title} ${rawText}`;
  const tags = extractHashtagTags(rawText);

  for (const rule of TAG_RULES) {
    if (rule.keywords.some((keyword) => text.includes(keyword))) {
      tags.push(rule.tag);
    }
  }

  const uniqueTags = [...new Set(tags)];
  return uniqueTags.length > 0 ? uniqueTags.slice(0, 6) : ["自己理解"];
}

function parseLatestEpisodes(html: string, limit: number): EpisodeSummary[] {
  const match = html.match(/window\.__SERVER_RELAY_STATE__ = (\{[\s\S]*?\})<\/script>/);
  if (!match) return [];

  const relayState = JSON.parse(match[1]) as Record<string, RelayValue>;
  const targetChannelRef = channelRef(STANDFM_CHANNEL_ID);
  const episodes = Object.values(relayState)
    .filter(
      (value) =>
        value.__typename === "Episode" &&
        value.episodeId &&
        value.title &&
        typeof value.publishedAt === "number" &&
        value.channel?.__ref === targetChannelRef,
    )
    .sort((a, b) => b.publishedAt! - a.publishedAt!);

  const seen = new Set<string>();
  return episodes
    .filter((episode) => {
      if (seen.has(episode.episodeId!)) return false;
      seen.add(episode.episodeId!);
      return true;
    })
    .slice(0, limit)
    .map((episode) => ({
      episodeId: episode.episodeId!,
      title: episode.title!,
      publishedAt: episode.publishedAt!,
    }));
}

async function fetchEpisodeDescription(episodeId: string): Promise<string> {
  const response = await fetch(`https://stand.fm/episodes/${episodeId}`, {
    cache: "no-store",
    headers: {
      "User-Agent": "Mozilla/5.0",
    },
  });
  if (!response.ok) return "";

  return extractEpisodeDescription(await response.text());
}

async function buildRecord(summary: EpisodeSummary): Promise<RecordItem> {
  const description = await fetchEpisodeDescription(summary.episodeId);
  const text = cleanText(description);

  return {
    media: "stand.fm",
    title: summary.title,
    date: formatDate(summary.publishedAt),
    tags: buildTags(summary.title, description),
    url: `https://stand.fm/episodes/${summary.episodeId}`,
    text,
  };
}

export async function getStandfmRecords(limit = 9): Promise<RecordItem[]> {
  try {
    const response = await fetch(STANDFM_SEED_EPISODE_URL, {
      cache: "no-store",
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });
    if (!response.ok) return fallbackRecords.slice(0, limit);

    const episodes = parseLatestEpisodes(await response.text(), limit);
    const records = await Promise.all(episodes.map((episode) => buildRecord(episode)));
    return records.length > 0 ? records : fallbackRecords.slice(0, limit);
  } catch {
    return fallbackRecords.slice(0, limit);
  }
}

export async function getLatestStandfmRecords(limit = 3): Promise<RecordItem[]> {
  return getStandfmRecords(limit);
}
