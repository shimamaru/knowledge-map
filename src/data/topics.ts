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
    description: "眠れない夜や、身体の緊張についての記録",
    icon: MoonIcon,
    href: "/topics/nemurenai",
  },
  {
    no: "02",
    title: "働くのが怖い",
    description: "働くことへの不安や、違和感についての記録",
    icon: CloudIcon,
    href: "/topics/hatarakukowai",
  },
  {
    no: "03",
    title: "人と合わない",
    description: "人間関係のしんどさや、孤独についての記録",
    icon: PersonIcon,
    href: "/topics/hitotoawanai",
  },
  {
    no: "04",
    title: "表現したい",
    description: "表現したい気持ちや、創作についての記録",
    icon: PencilIcon,
    href: "/topics/hyougenshitai",
  },
];
