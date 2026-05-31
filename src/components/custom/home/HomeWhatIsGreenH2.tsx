import Image from "next/image";
import { Leaf, ShieldCheck, Target } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { IMAGES } from "@/lib/images";

const BADGES = [
  { label1: "100%", label2: "CLEAN FUEL", node: <Leaf size={24} strokeWidth={1.8} /> },
  { label1: "ZERO CARBON", label2: "EMISSIONS", node: <CO2Glyph /> },
  { label1: "ENERGY", label2: "SECURITY", node: <ShieldCheck size={24} strokeWidth={1.8} /> },
  { label1: "SUSTAINABLE", label2: "FUTURE", node: <HandLeafGlyph /> },
  { label1: "FUEL OF", label2: "THE FUTURE", node: <H2Glyph /> },
];

const CHALLENGES = [
  {
    title: "High Cost",
    title2: "Of Production",
    slot: "challengeCost" as const,
    body: "Green Hydrogen currently costs significantly more than conventional fuels.",
    bullets: [
      "High capex for electrolyzers",
      "Expensive renewable power",
      "High cost of infrastructure",
    ],
    badge: <RupeeBadge />,
    badgeColor: "bg-mission",
  },
  {
    title: "Grid Dependence",
    title2: "& Renewable Intermittency",
    slot: "challengeGrid" as const,
    body:
      "Hydrogen production depends on stable, 24/7 renewable power which is not yet available at scale.",
    bullets: [
      "Intermittent solar & wind",
      "Grid stability issues",
      "High storage requirements",
    ],
    badge: <PylonBadge />,
    badgeColor: "bg-navy",
  },
  {
    title: "Coal & Fossil",
    title2: "Fuel Dependency",
    slot: "challengeFossil" as const,
    body:
      "India’s energy mix is still heavily dependent on coal and imported fossil fuels.",
    bullets: ["High carbon emissions", "Import dependency", "Volatile fuel prices"],
    badge: <MiningBadge />,
    badgeColor: "bg-[#6b3f24]", // warm brown
  },
];

export function HomeWhatIsGreenH2() {
  return (
    <>
      {/* ── SCREEN 2A — What Is Green Hydrogen? ─────────────────────── */}
      <section className="relative isolate flex min-h-dvh items-center overflow-hidden bg-paper">
        {/* Full-bleed 2a backdrop — anchored right so HOW IT'S MADE + H2 plant
            stay visible. Excess width crops cleanly from the empty-sky left. */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.section2BgTop.src}
            alt={IMAGES.section2BgTop.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-right"
          />
          {/* Desktop: white-to-transparent fade — left reads as a clean white
              panel, right blends into the photo. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(to_right,white_0%,white_28%,rgba(255,255,255,0.7)_45%,rgba(255,255,255,0)_62%)]"
          />
          {/* Mobile: full light wash so the heading + paragraph read over the
              plant photo (the right half is otherwise unwashed on a phone). */}
          <div aria-hidden className="absolute inset-0 bg-white/72 lg:hidden" />
        </div>

        {/* Content — overlays the left half */}
        <div className="mx-auto w-full max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <div className="max-w-xl">
            {/* "WHAT IS" smaller, "GREEN HYDROGEN?" big — matches reference hierarchy */}
            <h2 className="font-display leading-none tracking-tight">
              <span className="block text-[clamp(1.4rem,2.6vw,2.4rem)] font-extrabold uppercase text-ink">
                What Is
              </span>
              <span className="mt-1 block text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold uppercase text-mission">
                Green Hydrogen?
              </span>
            </h2>
            <div className="mt-5 h-1 w-14 bg-mission" />
            <p className="mt-7 max-w-md text-base leading-relaxed text-ink-soft md:text-[17px]">
              <strong className="font-bold text-ink">Green Hydrogen</strong> is a
              clean, sustainable fuel produced using renewable energy and water
              through electrolysis. It emits{" "}
              <strong className="font-bold text-mission">zero carbon</strong> and
              can power industries, transport, and economies of the future.
            </p>

            <ul className="mt-10 grid grid-cols-5 gap-x-3 gap-y-5">
              {BADGES.map((b) => (
                <li
                  key={b.label1 + b.label2}
                  className="flex flex-col items-center text-center"
                >
                  <span className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-mission bg-white text-mission">
                    {b.node}
                  </span>
                  <p className="mt-3 text-[10.5px] font-bold uppercase leading-tight tracking-wide text-ink">
                    {b.label1}
                    <br />
                    {b.label2}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SCREEN 2B — Current Challenges ──────────────────────────── */}
      <section className="relative isolate flex min-h-dvh flex-col overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.section2BgBottom.src}
            alt={IMAGES.section2BgBottom.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Slight darken so text reads */}
          <div aria-hidden className="absolute inset-0 bg-mission-deep/35" />
        </div>

        {/* Centered title + cards */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 py-10 lg:px-10 lg:py-12">
          {/* Title with bright-green decorative bars on left and right */}
          <div className="flex flex-col items-center">
            <div className="flex w-full max-w-3xl items-center justify-center gap-4">
              <span aria-hidden className="h-0.5 flex-1 bg-[#76b34f]" />
              <h3 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold uppercase tracking-tight text-white whitespace-nowrap">
                Current Challenges
              </h3>
              <span aria-hidden className="h-0.5 flex-1 bg-[#76b34f]" />
            </div>
            <p className="mt-3 max-w-2xl text-center text-[15px] text-white/85">
              Despite its potential, Green Hydrogen adoption faces key challenges
              today.
            </p>
          </div>

          {/* 3 horizontal challenge cards */}
          <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {CHALLENGES.map((c) => (
              <li
                key={c.title}
                className="relative rounded-2xl bg-white/95 text-ink shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)]"
              >
                {/* Floating icon — top, sitting over the boundary between
                    image and text. Half-overlaps the card top edge. */}
                <span
                  className={`absolute left-[34%] top-0 z-10 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-lg ${c.badgeColor}`}
                >
                  {c.badge}
                </span>

                <div className="grid grid-cols-[1fr_1.4fr] overflow-hidden rounded-2xl">
                  {/* Image — left column, full card height */}
                  <div className="relative">
                    <PhotoSlot
                      slot={c.slot}
                      fill
                      className="rounded-none ring-0"
                    />
                  </div>

                  {/* Text — right column */}
                  <div className="flex flex-col px-5 py-6">
                    <h4 className="font-display text-[15px] font-extrabold uppercase leading-tight text-mission">
                      {c.title}
                      <br />
                      {c.title2}
                    </h4>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                      {c.body}
                    </p>
                    <hr className="my-3 border-t border-dashed border-line" />
                    <ul className="space-y-1">
                      {c.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-start gap-2 text-[12.5px] text-ink-soft"
                        >
                          <span
                            aria-hidden
                            className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-mission"
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom strip — single row, target left, leaf+CLEANER ENERGY right */}
        <div className="relative">
          <div className="mx-auto w-full max-w-7xl px-6 pb-8 lg:px-10 lg:pb-10">
            <div className="grid grid-cols-1 items-center gap-4 rounded-xl bg-mission-soft/95 px-6 py-5 text-ink md:grid-cols-[1fr_auto_auto] md:gap-6">
              {/* Left — target + paragraph */}
              <div className="flex items-start gap-4">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mission-soft text-mission ring-1 ring-mission/20">
                  <Target size={16} strokeWidth={2} />
                </span>
                <p className="text-[14px] leading-relaxed text-ink">
                  <strong className="font-bold text-mission">Carbon Mandi</strong>{" "}
                  is addressing these challenges through a decentralized,
                  biomass-based Green Hydrogen ecosystem that reduces cost,
                  increases energy security, and empowers India&rsquo;s farmers.
                </p>
              </div>

              {/* Vertical divider */}
              <span aria-hidden className="hidden h-12 w-px bg-mission/25 md:block" />

              {/* Right — leaf + CLEANER ENERGY. STRONGER INDIA. */}
              <div className="flex items-center gap-3">
                <Leaf size={20} strokeWidth={1.8} className="text-mission" />
                <p className="font-display text-base font-extrabold uppercase leading-tight tracking-[0.04em] text-mission">
                  Cleaner Energy.
                  <br />
                  Stronger India.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── 5-badge glyphs (top section) ───────────────────────────────────── */

function H2Glyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill="#0d5c3d"
        fontFamily="Montserrat, system-ui"
      >
        H₂
      </text>
    </svg>
  );
}

function CO2Glyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fontSize="9"
        fontWeight="800"
        fill="#0d5c3d"
        fontFamily="Montserrat, system-ui"
      >
        CO₂
      </text>
      <line x1="6" y1="26" x2="26" y2="6" stroke="#0d5c3d" strokeWidth="1.6" />
    </svg>
  );
}

/** Hand cradling a leaf — for "Sustainable Future" badge. */
function HandLeafGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none">
      {/* Leaf */}
      <path
        d="M16 16 C 11 12 11 6 16 4 C 21 6 21 12 16 16 Z"
        stroke="#0d5c3d"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <line x1="16" y1="6" x2="16" y2="16" stroke="#0d5c3d" strokeWidth="1.2" />
      {/* Cupped hand */}
      <path
        d="M5 18 c 0 6 5 10 11 10 s 11 -4 11 -10"
        stroke="#0d5c3d"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Challenge-card icon glyphs (white on coloured circle) ──────────── */

function RupeeBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M7 6 H 17 M7 10 H 17 M8 14 H 12 c 2 0 4 -1 4 -3 M8 14 l 7 7"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PylonBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <path
        d="M12 3 L 6 21 M12 3 L 18 21 M8 11 H 16 M9.5 14 H 14.5 M9 18 H 15"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MiningBadge() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
      <rect x="4" y="14" width="16" height="6" rx="1.5" stroke="#fff" strokeWidth="1.6" />
      <circle cx="9" cy="22" r="1.5" stroke="#fff" strokeWidth="1.4" />
      <circle cx="15" cy="22" r="1.5" stroke="#fff" strokeWidth="1.4" />
      <path
        d="M7 14 l 3 -6 l 4 0 l 3 6"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
    </svg>
  );
}
