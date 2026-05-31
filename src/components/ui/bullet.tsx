import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

interface BulletListProps {
  items: React.ReactNode[];
  className?: string;
  tone?: "default" | "compact";
}

/**
 * Branded green-checkmark bullet list — used across hero, Why India,
 * Hemp & Napier, IIT Ropar, etc.
 */
export function BulletList({ items, className, tone = "default" }: BulletListProps) {
  return (
    <ul className={cn("space-y-3", tone === "compact" && "space-y-2.5", className)}>
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span className="mt-[3px] inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mission text-white">
            <Check size={12} strokeWidth={3} />
          </span>
          <span className={cn("text-ink", tone === "compact" ? "text-[15px]" : "text-base")}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
