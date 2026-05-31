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

const SOCIALS = [
  { label: "LinkedIn", Icon: LinkedInIcon, href: "#" },
  { label: "X (Twitter)", Icon: XIcon, href: "#" },
  { label: "Instagram", Icon: InstagramIcon, href: "#" },
  { label: "YouTube", Icon: YouTubeIcon, href: "#" },
];

function LinkedInIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1-.02 5 2.5 2.5 0 0 1 .02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.76-2.05 4.02 0 4.76 2.65 4.76 6.1V21h-4v-5.3c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4z" />
    </svg>
  );
}

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden>
      <rect x="2" y="2" width="20" height="20" rx="5.5" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" strokeWidth="1.8" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23 12s0-3.2-.4-4.7a2.5 2.5 0 0 0-1.77-1.77C19.2 5.1 12 5.1 12 5.1s-7.2 0-8.83.43A2.5 2.5 0 0 0 1.4 7.3C1 8.8 1 12 1 12s0 3.2.4 4.7a2.5 2.5 0 0 0 1.77 1.77C4.8 18.9 12 18.9 12 18.9s7.2 0 8.83-.43a2.5 2.5 0 0 0 1.77-1.77C23 15.2 23 12 23 12zM9.75 15.02V8.98L15.5 12z" />
    </svg>
  );
}

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
            <ul className="mt-7 flex flex-wrap items-center gap-5">
              {SOCIALS.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    aria-label={s.label}
                    className="block text-ink transition-colors hover:text-mission"
                  >
                    <s.Icon className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
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
