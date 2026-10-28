import { Ionicons } from "@expo/vector-icons";
import type { ComponentProps } from "react";

type IconName = ComponentProps<typeof Ionicons>["name"];

const ICONS: Record<string, IconName> = {
  electrical: "flash",
  mechanics: "car",
  welding: "water",
  tailoring: "shirt",
  agriculture: "leaf",
  plumbing: "construct",
  carpentry: "hammer",
  bricklaying: "business"
};

// Programs without an icon above get a generic tool icon
export function iconFor(program: string): IconName {
  return ICONS[program.toLowerCase()] ?? "build";
}
