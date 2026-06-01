import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import { SITE } from "@/lib/constants";
import { MandiLogo } from "./home/MandiLogo";

const PROJECT_LINKS = [
  { label: "Green Hydrogen", href: "/projects" },
  { label: "Circular Economy", href: "/#circular-economy" },
  { label: "Farm to Fuel", href: "/#farm-to-fuel" },
  { label: "Climate Goals 2030", href: "/right-to-climate" },
];

const CONNECT_LINKS = [
  { label: "Partnerships", href: "/contact" },
  { label: "Investors", href: "/contact" },
  { label: "Researchers", href: "/contact" },
  { label: "Media", href: "/contact" },
];

function IndiaMap({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 2 c -2 0 -4 2 -5 4 c -2 3 -3 7 -4 10 c 0 2 1 3 2 3 c 1 0 2 2 3 4 c 1 1 2 1 2 -1 c 1 -3 3 -5 5 -7 c 2 -2 3 -4 3 -7 c 0 -3 -3 -6 -6 -6 Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-paper">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr]">
          {/* Brand block */}
          <div>
            <Link href="/" className="inline-flex flex-col gap-2" aria-label="Carbon Mandi — home">
              <MandiLogo className="h-11 w-auto" />
              <span className="text-[11px] font-medium tracking-wide text-ink-muted">
                Farm to Fuel. Future for All.
              </span>
            </Link>
            <div className="mt-7 h-px w-12 bg-mission" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              India&rsquo;s Hemp &amp; Napier
              <br />
              Green Hydrogen Initiative
            </p>
          </div>

          {/* Project column */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
              Project
            </h3>
            <div className="mt-3 h-px w-10 bg-mission" />
            <ul className="mt-6 space-y-4">
              {PROJECT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center justify-between gap-3 text-[15px] text-ink-soft transition-colors hover:text-mission"
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="text-ink-muted transition-colors group-hover:text-mission"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <h3 className="text-sm font-extrabold uppercase tracking-[0.12em] text-ink">
              Connect
            </h3>
            <div className="mt-3 h-px w-10 bg-mission" />
            <ul className="mt-6 space-y-4">
              {CONNECT_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group inline-flex items-center justify-between gap-3 text-[15px] text-ink-soft transition-colors hover:text-mission"
                  >
                    <span>{link.label}</span>
                    <ArrowRight
                      size={14}
                      strokeWidth={1.8}
                      className="text-ink-muted transition-colors group-hover:text-mission"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom strip */}
      <div className="border-t border-line bg-cream/70">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 py-5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted md:flex-row md:justify-center md:gap-8 lg:px-10">
          <Leaf size={18} strokeWidth={1.8} className="text-mission" />
          <span>IIT Ropar Incubated</span>
          <span aria-hidden className="hidden h-3 w-px bg-line md:inline-block" />
          <span>Made in India</span>
          <span aria-hidden className="hidden h-3 w-px bg-line md:inline-block" />
          <span>Building Energy Independence</span>
          <IndiaMap className="h-7 w-auto text-mission/70" />
        </div>
        <p className="border-t border-line py-3 text-center text-[10px] uppercase tracking-[0.22em] text-ink-muted">
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
