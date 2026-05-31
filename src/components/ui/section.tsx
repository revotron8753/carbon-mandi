import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  /** Optional eyebrow rendered above the heading. */
  eyebrow?: string;
  /** Optional big editorial heading. */
  heading?: React.ReactNode;
  /** Optional supporting line under the heading. */
  lede?: React.ReactNode;
  /** Tone of the section surface. */
  tone?: "paper" | "cream" | "mission";
  /** Tightens vertical padding for strip-style sections. */
  size?: "default" | "compact" | "tall";
}

export function Section({
  eyebrow,
  heading,
  lede,
  tone = "paper",
  size = "default",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      {...props}
      className={cn(
        "relative",
        tone === "paper" && "bg-paper text-ink",
        tone === "cream" && "bg-cream text-ink",
        tone === "mission" && "bg-mission text-white",
        size === "default" && "py-24 md:py-32",
        size === "compact" && "py-14 md:py-20",
        size === "tall" && "py-28 md:py-40",
        className
      )}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {(eyebrow || heading || lede) && (
          <header className="max-w-3xl">
            {eyebrow && (
              <p
                className={cn(
                  "text-[11px] font-medium uppercase tracking-[0.22em]",
                  tone === "mission" ? "text-white/70" : "text-mission"
                )}
              >
                {eyebrow}
              </p>
            )}
            {heading && (
              <h2
                className={cn(
                  "font-display mt-4 text-[clamp(2rem,4.2vw,3.6rem)] font-medium leading-[1.05] tracking-tight",
                  tone === "mission" ? "text-white" : "text-ink"
                )}
              >
                {heading}
              </h2>
            )}
            {lede && (
              <p
                className={cn(
                  "mt-5 max-w-2xl text-lg leading-relaxed",
                  tone === "mission" ? "text-white/80" : "text-ink-soft"
                )}
              >
                {lede}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
