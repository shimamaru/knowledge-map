"use client";

import { useState } from "react";
import { DocumentIcon } from "@/components/icons";
import { mediaIcons } from "@/data/mediaIcons";
import type { TopicRecord } from "@/lib/topicMarkdown";

const OTHER_CATEGORY = "その他";

type CategoryGroup = {
  category: string;
  description?: string;
  summary?: string;
  records: TopicRecord[];
};

type CategoryDefinition = {
  category: string;
  description: string;
  summary?: string;
  match: (record: TopicRecord) => boolean;
};

function includesAny(record: TopicRecord, keywords: string[]): boolean {
  const text = [
    record.title,
    record.description,
    record.media,
    record.date,
    ...record.tags,
  ].join(" ");

  return keywords.some((keyword) => text.includes(keyword));
}

const topicCategoryDefinitions: Record<string, CategoryDefinition[]> = {
  "眠れない": [
    {
      category: "血糖値コントロール",
      description: "食事とタンパク質の摂り方で、日中のだるさと過緊張を減らす",
      summary:
        "血糖値が乱高下すると、交感神経が刺激されて体が緊張しやすくなり、日中のだるさや眠気にもつながる。糖質だけを先に摂るのではなく、タンパク質を先に・こまめに入れることで血糖値の波を穏やかにし、過緊張そのものを落ち着けていくアプローチ。",
      match: (record) => includesAny(record, ["不眠症", "血糖値", "だるさ", "食事"]),
    },
    {
      category: "ボディワーク",
      description: "太極拳や経絡など、身体から力を抜くアプローチ",
      summary:
        "頭で「リラックスしよう」と考えるだけでは、こわばった体は緩まない。太極拳の脱力や経絡・アナトミーラインを通して身体の状態を読むことで、意志の力ではなく体の感覚から過緊張をほどいていく方向。",
      match: (record) => includesAny(record, ["太極拳", "力を抜く", "経絡", "アナトミー", "身体を読む", "本が読めない"]),
    },
    {
      category: "人との交流",
      description: "愚痴や対話で感情を外に出し、抱え込んだ緊張をほどく",
      summary:
        "抑え込んだ感情は、そのまま体の緊張として残ってしまう。一人で我慢せず、愚痴や対話として外に出すことで、感情由来の過緊張を手放していくアプローチ。",
      match: (record) => includesAny(record, ["愚痴"]),
    },
    {
      category: "刺激から離れる",
      description: "スマホ・通知・SNSとの距離を取り、過覚醒を落とす",
      summary:
        "通知やSNSは、意識していなくても脳を常に「反応する状態」に置き、過覚醒を助長する。物理的にスマホや刺激から距離を取ることで、脳と神経を休むモードに戻していくアプローチ。",
      match: (record) => includesAny(record, ["キャンプ", "デジタル", "スマホ", "通知", "SNS"]),
    },
  ],
  "働くのが怖い": [
    {
      category: "働く前に必要な居場所",
      description: "働けない理由を、能力ではなく関係性や場所から見直す",
      match: (record) => includesAny(record, ["居場所", "つながれる場所", "いていい"]),
    },
    {
      category: "自分に合う働き方を探す",
      description: "自己分析や占いも使いながら、合う形を言葉にする",
      match: (record) => includesAny(record, ["自己分析", "占い", "自己理解", "働き方"]),
    },
  ],
  "人と合わない": [
    {
      category: "体の反応で相性を見る",
      description: "呼吸・翌朝の体感から、人との安心感を確かめる",
      match: (record) => includesAny(record, ["呼吸", "翌朝", "相性", "体の反応"]),
    },
    {
      category: "相談できる関係をつくる",
      description: "親しさだけではなく、知恵や態度に支えられた相談を考える",
      match: (record) => includesAny(record, ["相談", "知恵", "想像力", "態度"]),
    },
    {
      category: "前提から話せる場所を探す",
      description: "生きにくさを、地域・社会背景・身体性まで遡って見る",
      match: (record) => includesAny(record, ["地方", "前提", "場所", "社会背景"]),
    },
  ],
  "表現したい": [
    {
      category: "声やAIで思考を形にする",
      description: "ボイスメモや配信を、考えを残して届ける道具にする",
      match: (record) => includesAny(record, ["ボイスメモ", "AI", "声", "配信者"]),
    },
    {
      category: "土地や生活から作品をつくる",
      description: "暮らしている場所や気配が、作品の核になる感覚を扱う",
      match: (record) => includesAny(record, ["土地", "松江", "小泉八雲", "作品世界"]),
    },
    {
      category: "痛みを外に出す表現",
      description: "劣等感や生活のリアルを、見られる形にして外へ出す",
      match: (record) => includesAny(record, ["芸術", "残酷さ", "劣等感", "痛み"]),
    },
  ],
};

function groupByDefinedCategory(records: TopicRecord[], topicTitle: string): CategoryGroup[] | null {
  const definitions = topicCategoryDefinitions[topicTitle];
  if (!definitions) return null;

  const groups = new Map<string, CategoryGroup>();
  for (const definition of definitions) {
    groups.set(definition.category, {
      category: definition.category,
      description: definition.description,
      summary: definition.summary,
      records: [],
    });
  }
  groups.set(OTHER_CATEGORY, { category: OTHER_CATEGORY, records: [] });

  for (const record of records) {
    const definition = definitions.find((item) => item.match(record));
    const category = definition?.category ?? OTHER_CATEGORY;
    groups.get(category)!.records.push(record);
  }

  return [...groups.values()].filter((group) => group.records.length > 0);
}

function groupByCategory(records: TopicRecord[], topicTitle: string): CategoryGroup[] {
  const definedGroups = groupByDefinedCategory(records, topicTitle);
  if (definedGroups) return definedGroups;

  // トピック共通の主題タグ(1つ目)を除いた、サブタグの出現回数を数える
  const tagCounts = new Map<string, number>();
  for (const record of records) {
    for (const tag of record.tags.slice(1)) {
      tagCounts.set(tag, (tagCounts.get(tag) ?? 0) + 1);
    }
  }

  const groups = new Map<string, TopicRecord[]>();

  for (const record of records) {
    const subTags = record.tags.slice(1);
    // そのレコードが持つサブタグの中で、トピック全体で最も頻出するものをカテゴリにする
    const category = subTags.reduce<string | null>((best, tag) => {
      if (best === null) return tag;
      return (tagCounts.get(tag) ?? 0) > (tagCounts.get(best) ?? 0) ? tag : best;
    }, null) ?? OTHER_CATEGORY;

    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push(record);
  }

  const entries = [...groups.entries()].filter(([category]) => category !== OTHER_CATEGORY);
  const other = groups.get(OTHER_CATEGORY);

  const sorted = entries.sort((a, b) => b[1].length - a[1].length);
  if (other) sorted.push([OTHER_CATEGORY, other]);

  return sorted.map(([category, records]) => ({ category, records }));
}

function renderEmphasis(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    const match = part.match(/^\*\*([^*]+)\*\*$/);
    if (!match) return part;
    return (
      <strong key={i} className="font-semibold text-foreground">
        {match[1]}
      </strong>
    );
  });
}

function RecordCard({ record }: { record: TopicRecord }) {
  const [detailOpen, setDetailOpen] = useState(false);
  const Icon = mediaIcons[record.media] ?? DocumentIcon;
  const linkLabel = record.media === "stand.fm" ? "stand.fmで聴く" : `${record.media}で開く`;

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-foreground/30">
      <div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] uppercase tracking-wide text-foreground/45">
            {record.media}
          </span>
          <Icon className="h-4 w-4 shrink-0 text-foreground/40 transition-colors group-hover:text-foreground/70" />
        </div>
        <p className="mt-3 text-sm font-medium leading-relaxed text-foreground transition-colors group-hover:text-foreground">
          {record.title}
        </p>
        {record.description && !detailOpen && (
          <p className="mt-2 overflow-hidden text-[13px] leading-6 text-foreground/70 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {record.description}
          </p>
        )}
      </div>

      {record.detail && (
        <div className="mt-4">
          <button
            type="button"
            onClick={() => setDetailOpen((v) => !v)}
            className="inline-flex items-center gap-1 rounded-sm text-[11px] font-semibold text-foreground/55 transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
          >
            <span
              className="inline-flex h-3 w-3 items-center justify-center transition-transform"
              style={{ transform: detailOpen ? "rotate(90deg)" : "rotate(0deg)" }}
            >
              <svg viewBox="0 0 10 10" className="h-2 w-2">
                <path d="M2 0 L8 5 L2 10 Z" fill="currentColor" />
              </svg>
            </span>
            {detailOpen ? "要点を閉じる" : "要点を読む"}
          </button>
          {detailOpen && (
            <div className="mt-3 border-l-2 border-border pl-3">
              <p className="text-[13px] leading-7 text-foreground/75">
                {renderEmphasis(record.detail)}
              </p>
            </div>
          )}
        </div>
      )}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border/60 pt-3">
        <div className="flex flex-wrap gap-1.5">
          {record.tags.map((tag) => (
            <span key={tag} className="rounded-full bg-platinum px-2 py-0.5 text-[11px] text-foreground">
              {tag}
            </span>
          ))}
        </div>
        <span className="text-[11px] text-foreground/40">{record.date}</span>
      </div>

      {record.url && (
        <a
          href={record.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-[11px] font-semibold text-foreground/70 transition-colors hover:border-foreground/30 hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
        >
          <span className="inline-flex h-3 w-3 items-center justify-center">
            <svg viewBox="0 0 10 10" className="h-2 w-2">
              <path d="M2 0 L8 5 L2 10 Z" fill="currentColor" />
            </svg>
          </span>
          {linkLabel}
        </a>
      )}
    </div>
  );
}

function CategoryNode({ group }: { group: CategoryGroup }) {
  const [open, setOpen] = useState(false);
  const isOther = group.category === OTHER_CATEGORY;

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-4 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 ${
          open ? "bg-platinum" : "bg-platinum/60 hover:bg-platinum"
        }`}
      >
        <span
          className="flex h-4 w-4 shrink-0 items-center justify-center text-foreground/40 transition-transform"
          style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)" }}
        >
          <svg viewBox="0 0 10 10" className="h-2.5 w-2.5">
            <path d="M2 0 L8 5 L2 10 Z" fill="currentColor" />
          </svg>
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-semibold leading-snug text-foreground">
            {group.category}
          </span>
          {group.description && (
            <span className="mt-1 block text-xs leading-relaxed text-foreground/65">
              {group.description}
            </span>
          )}
        </span>
        {isOther && (
          <span className="rounded-full bg-border px-2 py-0.5 text-[10px] text-foreground/70">
            未分類
          </span>
        )}
        <span className="shrink-0 text-xs tabular-nums text-foreground/40">
          {group.records.length}件
        </span>
      </button>

      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-out"
        style={{
          maxHeight: open ? `${group.records.length * 600 + 40}px` : "0px",
        }}
      >
        <div className="px-1 pt-4">
          <div className="grid grid-cols-1 items-start gap-4 pb-1 sm:grid-cols-2">
            {group.records.map((record) => (
              <RecordCard key={record.title} record={record} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TopicTree({
  records,
  topicTitle,
}: {
  records: TopicRecord[];
  topicTitle: string;
}) {
  const groups = groupByCategory(records, topicTitle);

  return (
    <div className="mt-10">
      <div className="space-y-3">
        {groups.map((group) => (
          <CategoryNode key={group.category} group={group} />
        ))}
      </div>
    </div>
  );
}
