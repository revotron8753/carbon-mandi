"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Mobile navigation triggered by tapping the "Made in India" flag.
 * Reveals the primary nav links (plus a Join-as-Partner CTA) in a dropdown.
 * Used by the homepage hero, which absorbs its own header.
 */
export function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      {/* Trigger — the flag itself */}
      <button
        type="button"
        aria-label="Open navigation menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-ink"
      >
        <span className="leading-tight">
          MADE IN
          <br />
          INDIA
        </span>
        <Image
          src="/images/indian-flag.png"
          alt="Indian flag"
          width={30}
          height={20}
          className={cn(
            "h-auto w-7 rounded-sm ring-1 transition-shadow",
            open ? "ring-2 ring-mission" : "ring-line"
          )}
        />
      </button>

      {open && (
        <>
          {/* Tap-away backdrop */}
          <button
            type="button"
            aria-hidden
            tabIndex={-1}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-40 cursor-default"
          />
          <ul className="absolute right-0 top-full z-50 mt-2 w-56 overflow-hidden rounded-xl border border-line bg-paper p-2 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.35)]">
            {NAV_LINKS.map((link) =>
              link.comingSoon ? (
                <li key={link.label}>
                  <span className="flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium text-ink/55">
                    {link.label}
                    <span className="rounded-full bg-mission-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mission">
                      Soon
                    </span>
                  </span>
                </li>
              ) : (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-md px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
            <li className="pt-1">
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="block rounded-md bg-mission px-3 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-mission-dark"
              >
                Join As Partner
              </Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}
