import type { ComponentType } from "react";
import { CloudIcon, MoonIcon, PencilIcon, PersonIcon } from "@/components/icons";

export type Topic = {
  no: string;
  title: string;
  description: string;
  icon: ComponentType<{ className?: string }>;
  href: string;
};

export const topics: Topic[] = [
  {
    no: "01",
    title: "入力に迷わない",
    description: "分類やタグ付けを考えず、まずそのまま書き出す",
    icon: MoonIcon,
    href: "/topics/nyuryoku",
  },
  {
    no: "02",
    title: "フォルダで分けない",
    description: "リンクでつながる仕組みを使い、分類に時間を使わない",
    icon: CloudIcon,
    href: "/topics/folder",
  },
  {
    no: "03",
    title: "AIに整理を任せる",
    description: "書いたものをAIに読ませ、構造化は預けてしまう",
    icon: PersonIcon,
    href: "/topics/ai-seiri",
  },
  {
    no: "04",
    title: "取り出して使う",
    description: "メモは取り出す場所。検索して出てくれば十分",
    icon: PencilIcon,
    href: "/topics/toridashi",
  },
];
