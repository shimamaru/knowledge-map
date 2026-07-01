import type { ComponentType } from "react";
import { DocumentIcon, PlayIcon, WaveformIcon } from "@/components/icons";

export type RecordItem = {
  media: string;
  title: string;
  date: string;
  tags: string[];
  icon: ComponentType<{ className?: string }>;
};

export const records: RecordItem[] = [
  {
    media: "stand.fm",
    title: "眠れない夜と身体の緊張について",
    date: "2024.05.12",
    tags: ["睡眠", "緊張"],
    icon: WaveformIcon,
  },
  {
    media: "note",
    title: "働く前に、まず尊厳やつながりが必要かもしれない",
    date: "2024.05.10",
    tags: ["働き方", "自己理解"],
    icon: DocumentIcon,
  },
  {
    media: "YouTube",
    title: "自分の感覚を置き去りにしない働き方",
    date: "2024.05.08",
    tags: ["働き方", "AI活用"],
    icon: PlayIcon,
  },
];
