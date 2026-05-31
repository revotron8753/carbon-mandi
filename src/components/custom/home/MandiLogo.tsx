import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Brand lockup — the official Carbon Mandi logo (icon + "CARBON MANDI"
 * wordmark). The artwork is a horizontal lockup (~2.7:1), so drive the size
 * with a height + `w-auto` (e.g. `h-9 w-auto`). Because the wordmark is baked
 * in, callers should NOT place a separate "CARBON MANDI" text beside it.
 */
export function MandiLogo({ className }: { className?: string }) {
  return (
    <Image
      src="/images/logo.svg"
      alt="Carbon Mandi"
      width={268}
      height={98}
      unoptimized
      className={cn("h-auto w-auto object-contain", className)}
    />
  );
}
