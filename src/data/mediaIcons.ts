import type { ComponentType } from "react";
import { DocumentIcon, PlayIcon, WaveformIcon } from "@/components/icons";

export const mediaIcons: Record<string, ComponentType<{ className?: string }>> = {
  "stand.fm": WaveformIcon,
  note: DocumentIcon,
  YouTube: PlayIcon,
};
