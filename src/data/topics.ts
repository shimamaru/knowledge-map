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
    title: "眠れない",
    description: "眠れない夜の理由を、体のロジックで読み解く記録",
    icon: MoonIcon,
    href: "/topics/nemurenai",
  },
  {
    no: "02",
    title: "働くのが怖い",
    description: "働く前に必要な居場所を、少しずつ見つけていく記録",
    icon: CloudIcon,
    href: "/topics/hatarakukowai",
  },
  {
    no: "03",
    title: "人と合わない",
    description: "人との違和感を、体の反応から読み解いていく記録",
    icon: PersonIcon,
    href: "/topics/hitotoawanai",
  },
  {
    no: "04",
    title: "表現したい",
    description: "痛みや弱さを、表現に変えていく記録",
    icon: PencilIcon,
    href: "/topics/hyougenshitai",
  },
];
