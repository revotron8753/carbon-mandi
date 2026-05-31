import {
  ArrowRight,
  Beaker,
  Factory,
  FlaskRound,
  Globe2,
  Leaf,
  Plane,
  Ship,
  Truck,
  Zap,
} from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";

const USES = [
  {
    label: "INDUSTRY",
    slot: "useIndustry" as const,
    body: "Clean energy for industrial processes, heat, and operations.",
    Icon: Factory,
  },
  {
    label: "TRANSPORT\n& LOGISTICS",
    slot: "useTransport" as const,
    body: "Zero-emission fuel for trucks, buses, rail and long-haul transport.",
    Icon: Truck,
  },
  {
    label: "POWER\nGENERATION",
    slot: "usePower" as const,
    body: "Reliable, dispatchable power for a stable and secure grid.",
    Icon: Zap,
  },
  {
    label: "SHIPPING\n& MARITIME",
    slot: "useShipping" as const,
    body: "Clean fuel for ships and ports, reducing marine emissions.",
    Icon: Ship,
  },
  {
    label: "AVIATION",
    slot: "useAviation" as const,
    body: "Sustainable aviation fuel pathway for a low-carbon aviation future.",
    Icon: Plane,
  },
  {
    label: "CHEMICALS\n& REFINERIES",
    slot: "useChemicals" as const,
    body: "Green feedstock for ammonia, methanol, refining and more.",
    Icon: FlaskRound,
  },
];

const VALIDATION = [
  {
    label: "FEEDSTOCK",
    label2: "VALIDATION",
    body: "Ensuring quality & consistency of Hemp & Napier biomass.",
    Icon: Leaf,
  },
  {
    label: "GASIFICATION",
    label2: "VALIDATION",
    body: "Optimizing syngas production from biomass.",
    Icon: () => <FlameIcon />,
  },
  {
    label: "HYDROGEN PURITY",
    label2: "VALIDATION",
    body: "Achieving high-purity hydrogen suitable for industries.",
    Icon: () => <H2RoundIcon />,
  },
  {
    label: "CARBON ACCOUNTING",
    label2: "VALIDATION",
    body: "Measuring real climate impact through robust methodologies.",
    Icon: () => <CO2RoundIcon />,
  },
];

const TRL = [
  { tier: "TRL 3", label: "Proof of Concept" },
  { tier: "TRL 4", label: "Lab Validation\n(Completed)" },
  { tier: "TRL 5", label: "Pilot Validation\n(In Progress)" },
  { tier: "TRL 6", label: "Pilot Demonstration\n(Next Phase)" },
  { tier: "TRL 7+", label: "Pre-Commercial\nDeployment" },
];

const VALIDATION_BADGES = [
  { label: "IIT ROPAR", label2: "INCUBATED", glyph: <IITRoparBadge /> },
  { label: "LAB", label2: "VALIDATION", glyph: <Beaker size={18} strokeWidth={1.8} /> },
  { label: "PILOT", label2: "DEMONSTRATION", glyph: <PilotIcon /> },
  { label: "REAL WORLD", label2: "IMPACT", glyph: <Globe2 size={18} strokeWidth={1.8} /> },
];

export function HomeWhoUsesH2() {
  return (
    <section className="flex min-h-dvh flex-col bg-paper">
      {/* ── TOP PANEL — WHO WILL USE HYDROGEN? ───────────────────────── */}
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[auto_1fr] lg:items-center lg:gap-24">
            {/* Heading — compact column hugging the left, with a big gap to
                the right so the section breathes. */}
            <div className="lg:w-[clamp(16rem,18vw,18rem)]">
              <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold uppercase leading-[1.04] tracking-tight">
                <span className="block whitespace-nowrap text-ink">Who Will Use</span>
                <span className="block text-mission">Hydrogen?</span>
              </h2>
              <div className="mt-3 h-1 w-12 bg-mission" />
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink">
                Powering Industries. Enabling Progress. Building a Clean Future.
              </p>
            </div>

            {/* 6 industry cards */}
            <ul className="grid grid-cols-3 gap-3 md:grid-cols-6">
              {USES.map((u) => (
                <li key={u.label} className="flex flex-col">
                  <div className="flex items-start gap-1.5">
                    <u.Icon size={16} strokeWidth={1.8} className="mt-0.5 shrink-0 text-mission" />
                    <p className="whitespace-pre-line text-[10.5px] font-extrabold uppercase leading-tight text-ink">
                      {u.label}
                    </p>
                  </div>
                  <div className="mt-2 overflow-hidden rounded-md ring-1 ring-line">
                    <PhotoSlot slot={u.slot} aspectRatio="1/1" className="rounded-none ring-0" />
                  </div>
                  <p className="mt-2 text-[10.5px] leading-snug text-ink-soft">
                    {u.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── GREEN STRIP ───────────────────────────────────────────────── */}
      <div className="bg-mission-soft">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-3 lg:px-10">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mission text-white">
            <Globe2 size={16} strokeWidth={1.8} />
          </span>
          <p className="flex-1 text-[13px] text-ink">
            <strong className="font-bold text-mission">Green Hydrogen</strong>{" "}
            is a versatile, future-ready fuel for every sector driving
            India&rsquo;s economy.
          </p>
          <Skyline className="hidden h-10 w-auto text-mission md:block" />
        </div>
      </div>

      {/* ── BOTTOM PANEL — CAN THIS ACTUALLY BE BUILT? (NAVY) ──────────
          Photos extend FULL height on left and right. TRL card lives
          inside the CENTER column at its bottom. 4-badges card overlays
          the bottom of the RIGHT column's scientist photo. */}
      <div className="relative isolate flex flex-1 flex-col bg-navy text-white">
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-[1.1fr_1.6fr_1.1fr]">
          {/* LEFT — full-height IIT Ropar backdrop + heading overlay */}
          <div className="relative isolate overflow-hidden">
            <div className="absolute inset-0 -z-10">
              <PhotoSlot
                slot="iitRoparCampus"
                fill
                className="rounded-none ring-0"
              />
              {/* Vertical top-down darken — protects the heading + description
                  area regardless of where the photo's bright spots fall, then
                  fades to clear so the IIT Ropar sign + grass stay readable. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(11,31,61,0.78)_0%,rgba(11,31,61,0.62)_25%,rgba(11,31,61,0.32)_45%,rgba(11,31,61,0.08)_65%,transparent_82%)]"
              />
              {/* Right-edge feather — fades photo smoothly into the navy
                  centre column instead of a hard vertical seam. */}
              <div
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(to_right,transparent_0%,transparent_62%,rgba(16,42,82,0.5)_85%,rgba(16,42,82,1)_100%)]"
              />
            </div>
            <div className="p-7 lg:p-10">
              <h3 className="font-display text-[clamp(1.4rem,2.4vw,2rem)] font-extrabold uppercase leading-[1.05] tracking-tight text-white">
                Can This Actually Be Built?
              </h3>
              <p className="font-display mt-2 text-[clamp(1.05rem,1.7vw,1.4rem)] font-extrabold uppercase leading-tight text-mission-soft">
                Yes. And We Are Already Building.
              </p>
              <p className="mt-4 max-w-md text-[12.5px] leading-relaxed text-white/85">
                Carbon Mandi is incubated at IIT Ropar and is progressing
                through a structured technology validation roadmap.
              </p>
            </div>
          </div>

          {/* CENTER — validation focus (flex-1 top), TRL card pinned bottom */}
          <div className="flex flex-col p-7 lg:px-10 lg:py-10">
            <div className="flex flex-1 flex-col justify-center">
              <div className="flex items-center gap-3">
                <span aria-hidden className="inline-block h-px flex-1 bg-white/25" />
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/85">
                  Our Validation Focus
                </p>
                <span aria-hidden className="inline-block h-px flex-1 bg-white/25" />
              </div>

              <ul className="mt-6 grid grid-cols-4 gap-1">
                {VALIDATION.map((v, i) => (
                  <li
                    key={v.label}
                    className="relative flex flex-col items-center text-center"
                  >
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-navy">
                      <v.Icon size={20} strokeWidth={1.8} />
                    </span>
                    {i < VALIDATION.length - 1 && (
                      <span
                        aria-hidden
                        className="absolute right-[-10px] top-4 hidden text-white/45 md:inline"
                      >
                        <ArrowRight size={14} strokeWidth={2} />
                      </span>
                    )}
                    <p className="mt-3 text-[10px] font-extrabold uppercase leading-tight text-white">
                      {v.label}
                      <br />
                      {v.label2}
                    </p>
                    <p className="mt-1.5 text-[9.5px] leading-tight text-white/65">
                      {v.body}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            {/* TRL card pinned to bottom of CENTER column only */}
            <div className="mt-6 rounded-xl bg-white/95 px-5 py-3 text-navy">
              <p className="text-[10.5px] font-extrabold uppercase tracking-[0.18em] text-navy/70">
                Technology Readiness Roadmap
              </p>
              <ol className="mt-2 flex flex-wrap items-center justify-between gap-y-2 gap-x-1">
                {TRL.map((t, i) => (
                  <li key={t.tier} className="flex items-center gap-1">
                    <div className="flex flex-col items-center text-center">
                      <span className="font-display text-[13px] font-extrabold text-navy">
                        {t.tier}
                      </span>
                      <span className="mt-0.5 whitespace-pre-line text-[9px] leading-tight text-navy/60">
                        {t.label}
                      </span>
                    </div>
                    {i < TRL.length - 1 && (
                      <span aria-hidden className="text-navy/40">
                        <ArrowRight size={12} strokeWidth={2} />
                      </span>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT — full-height scientist photo + 4-badge card overlaid at bottom */}
          <div className="relative isolate overflow-hidden">
            <PhotoSlot
              slot="iitRoparLab"
              fill
              className="rounded-none ring-0"
            />
            {/* Left-edge feather — fades the scientist photo smoothly out of
                the navy centre column instead of a hard vertical seam. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(16,42,82,1)_0%,rgba(16,42,82,0.55)_18%,transparent_45%,transparent_100%)]"
            />
            {/* Badges card overlays the bottom of the scientist photo */}
            <ul className="absolute inset-x-4 bottom-4 grid grid-cols-2 gap-2 rounded-xl bg-white/95 px-3 py-3 text-navy shadow-lg lg:grid-cols-4">
              {VALIDATION_BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-1.5">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/8 text-navy ring-1 ring-navy/15">
                    {b.glyph}
                  </span>
                  <span className="text-[8.5px] font-extrabold uppercase leading-tight text-navy">
                    {b.label}
                    <br />
                    {b.label2}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── icons / glyphs ──────────────────────────────────────────────────── */

function FlameIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3 c -1 4 -5 6 -5 11 a 5 5 0 0 0 10 0 c 0 -3 -2 -5 -3 -8 c -1 -2 -2 -2 -2 -3 Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function H2RoundIcon() {
  return <span className="text-base font-extrabold leading-none">H₂</span>;
}

function CO2RoundIcon() {
  return <span className="text-[11px] font-extrabold leading-none">CO₂</span>;
}

function IITRoparBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="12" r="4" fill="currentColor" />
    </svg>
  );
}

function PilotIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect x="6" y="8" width="6" height="13" stroke="currentColor" strokeWidth="1.6" />
      <rect x="14" y="11" width="5" height="10" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 8 v -3 M14 11 v -2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

/** Mini skyline used on the green tagline strip — buildings + wind +
 *  solar panels + a few trees, all drawn in the parent's text colour. */
function Skyline({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 320 32" className={className} fill="currentColor" aria-hidden>
      {/* Trees on left */}
      <path d="M4 28 q -3 -8 4 -10 q 7 2 4 10 Z" />
      <path d="M14 28 q -3 -10 5 -12 q 8 2 5 12 Z" />
      {/* Wind turbine left */}
      <line x1="32" y1="28" x2="32" y2="14" stroke="currentColor" strokeWidth="1" />
      <path d="M32 14 l -5 -5 l 5 0 z M32 14 l 5 -5 l 0 5 z M32 14 l 0 6 l -5 0 z" />
      {/* Buildings */}
      <rect x="46" y="14" width="12" height="14" />
      <rect x="60" y="10" width="10" height="18" />
      <rect x="72" y="18" width="14" height="10" />
      <rect x="88" y="8" width="10" height="20" />
      <rect x="100" y="14" width="12" height="14" />
      {/* Solar panels */}
      <rect x="118" y="22" width="14" height="6" />
      <line x1="125" y1="22" x2="125" y2="28" stroke="#fff" strokeWidth="0.4" />
      {/* More buildings + chimney */}
      <rect x="138" y="14" width="10" height="14" />
      <rect x="150" y="6" width="6" height="22" />
      <rect x="156" y="12" width="14" height="16" />
      <rect x="172" y="18" width="12" height="10" />
      {/* Wind turbine middle */}
      <line x1="194" y1="28" x2="194" y2="12" stroke="currentColor" strokeWidth="1" />
      <path d="M194 12 l -5 -5 l 5 0 z M194 12 l 5 -5 l 0 5 z M194 12 l 0 6 l -5 0 z" />
      {/* Buildings */}
      <rect x="206" y="16" width="12" height="12" />
      <rect x="220" y="10" width="10" height="18" />
      <rect x="232" y="14" width="14" height="14" />
      <rect x="248" y="8" width="8" height="20" />
      {/* Solar panels */}
      <rect x="258" y="22" width="14" height="6" />
      {/* Wind turbine right */}
      <line x1="280" y1="28" x2="280" y2="14" stroke="currentColor" strokeWidth="1" />
      <path d="M280 14 l -5 -5 l 5 0 z M280 14 l 5 -5 l 0 5 z M280 14 l 0 6 l -5 0 z" />
      {/* Trees on right */}
      <path d="M298 28 q -3 -9 5 -11 q 7 2 5 11 Z" />
      <path d="M310 28 q -3 -7 4 -9 q 6 2 4 9 Z" />
    </svg>
  );
}
