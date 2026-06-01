import Image from "next/image";
import { Fuel, Leaf, Lightbulb, Target } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { IMAGES } from "@/lib/images";

const HIGHLIGHTS = [
  {
    icon: <Fuel size={20} strokeWidth={1.8} />,
    copy: (
      <>
        India imports nearly{" "}
        <strong className="font-bold text-ink">85%</strong> of its fuel
        requirements every year.
      </>
    ),
    tone: "mission" as const,
  },
  {
    icon: <Leaf size={20} strokeWidth={1.8} />,
    copy: (
      <>
        At the same time, millions of acres of agricultural land produce
        biomass that often remains underutilized.
      </>
    ),
    tone: "mission" as const,
  },
  {
    icon: <Lightbulb size={20} strokeWidth={1.8} />,
    copy: (
      <strong className="font-bold text-navy">
        What if India&rsquo;s farms could become India&rsquo;s future energy
        fields?
      </strong>
    ),
    tone: "navy" as const,
  },
];

const CARDS = [
  {
    n: "01",
    label: "Problem",
    body: "India depends on imported fuels.",
    slot: "problemShip" as const,
    tabBg: "bg-[#b94032]",
    iconBg: "bg-[#fbe9e6]",
    iconRing: "ring-[#b94032]",
    iconColor: "text-[#b94032]",
    titleColor: "text-[#b94032]",
    glyph: <ShipGlyph />,
  },
  {
    n: "02",
    label: "Opportunity",
    body: "India has abundant biomass and farming land.",
    slot: "opportunityField" as const,
    tabBg: "bg-mission",
    iconBg: "bg-mission-soft",
    iconRing: "ring-mission",
    iconColor: "text-mission",
    titleColor: "text-mission",
    glyph: <SproutGlyph />,
  },
  {
    n: "03",
    label: "Solution",
    body: "Convert biomass into Green Hydrogen through a Circular Economy model.",
    slot: "solutionPlant" as const,
    tabBg: "bg-navy",
    iconBg: "bg-navy-soft",
    iconRing: "ring-navy",
    iconColor: "text-navy",
    titleColor: "text-navy",
    glyph: <H2Glyph />,
  },
];

export function HomeNationalOpportunity() {
  return (
    <>
      {/* ── SCREEN 3A — Intro: heading + mission + 3 highlights + backdrop ── */}
      <section className="relative isolate flex items-center overflow-hidden bg-paper">
        {/* 3a backdrop — full width, anchored right so the India+H2 composite stays visible */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.indiaOpportunityMap.src}
            alt={IMAGES.indiaOpportunityMap.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-right"
          />
          {/* Mobile: full light wash so the heading + copy read over the
              flag/map (the content spans full width on a phone). Desktop is
              left unwashed as designed. */}
          <div aria-hidden className="absolute inset-0 bg-white/72 lg:hidden" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          {/* Eyebrow with green line */}
          <div className="flex items-center gap-3">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-mission">
              India&rsquo;s National Opportunity
            </p>
            <span aria-hidden className="inline-block h-px flex-1 max-w-md bg-mission/40" />
            <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-mission" />
          </div>

          {/* 2-col content */}
          <div className="mt-12 grid grid-cols-1 gap-12 lg:mt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12">
            {/* LEFT — heading + mission box */}
            <div>
              <h2 className="font-display text-[clamp(2rem,4vw,3.2rem)] font-extrabold leading-[1.06] tracking-tight">
                <span className="block text-ink">India Already Has Everything</span>
                <span className="block text-ink">Needed To Lead The</span>
                <span className="block text-mission">Green Hydrogen Revolution</span>
              </h2>

              <div className="mt-8 inline-flex max-w-xl items-start gap-4 rounded-xl bg-mission-soft/85 px-5 py-4 ring-1 ring-mission/15 backdrop-blur-sm">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-mission ring-1 ring-mission/20">
                  <Leaf size={16} strokeWidth={1.8} />
                </span>
                <p className="text-[14px] leading-relaxed text-ink">
                  Carbon Mandi is building a decentralized Farm-to-Fuel
                  ecosystem using Hemp and Napier biomass to support
                  India&rsquo;s{" "}
                  <strong className="font-bold text-mission">
                    National Green Hydrogen Mission
                  </strong>{" "}
                  and{" "}
                  <strong className="font-bold text-mission">Climate Goals 2030</strong>.
                </p>
              </div>
            </div>

            {/* RIGHT — 3 stat highlights */}
            <ul className="space-y-7 lg:space-y-8">
              {HIGHLIGHTS.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className={
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-paper/95 ring-1 backdrop-blur " +
                      (h.tone === "navy"
                        ? "text-navy ring-navy/20"
                        : "text-mission ring-mission/20")
                    }
                  >
                    {h.icon}
                  </span>
                  <p className="max-w-sm text-[14px] leading-snug text-ink">
                    {h.copy}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── SCREEN 3B — 3 P/O/S cards + Our Mission strip ─────────────── */}
      <section className="relative flex flex-col bg-paper">
        {/* Cards + mission strip */}
        <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-6 py-20 lg:px-10 lg:py-24">
          <ul className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {CARDS.map((c) => (
              <li
                key={c.n}
                className="relative flex flex-col overflow-hidden rounded-2xl bg-paper ring-1 ring-line"
              >
                {/* Numbered tab top-left */}
                <span
                  className={`absolute left-6 top-0 z-10 inline-flex items-center justify-center rounded-b-md px-3.5 py-1.5 text-[11px] font-extrabold tracking-wide text-white ${c.tabBg}`}
                >
                  {c.n}
                </span>

                <div className="px-6 pt-10 pb-5">
                  <div className="flex items-center gap-4">
                    <span
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ring-2 ${c.iconBg} ${c.iconRing} ${c.iconColor}`}
                    >
                      {c.glyph}
                    </span>
                    <p className={`font-display text-xl font-extrabold uppercase tracking-wide ${c.titleColor}`}>
                      {c.label}
                    </p>
                  </div>
                  <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">
                    {c.body}
                  </p>
                </div>
                {/* Image fills the remaining card height (min-h-72) so all three
                    card bottoms align even when the top text wraps to a different
                    number of lines. Soft white→transparent fade blends the photo
                    into the card body above. */}
                <div className="relative min-h-72 flex-1">
                  <PhotoSlot slot={c.slot} fill className="rounded-none ring-0" />
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-14 bg-linear-to-b from-white via-white/60 to-transparent"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Our Mission strip — pinned to bottom of viewport */}
        <div>
          <div className="mx-auto w-full max-w-7xl px-6 pb-10 lg:px-10 lg:pb-12">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-cream px-6 py-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mission text-white">
                <Target size={16} strokeWidth={2} />
              </span>
              <p className="text-[14px] font-medium text-ink">
                <strong className="font-bold text-ink">Our Mission:</strong>{" "}
                Empower Farmers. Strengthen Rural India. Build Aatmanirbhar
                Energy.{" "}
                <span className="font-bold text-mission">For India.</span>{" "}
                <span className="font-bold text-mission">By India.</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Card icon glyphs ─────────────────────────────────────────────── */

function ShipGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path
        d="M5 21 h 22 l -2 4 H 7 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M9 21 v -7 h 14 v 7" stroke="currentColor" strokeWidth="1.6" />
      <path d="M11 14 v -3 h 10 v 3" stroke="currentColor" strokeWidth="1.6" />
      <line x1="16" y1="8" x2="16" y2="14" stroke="currentColor" strokeWidth="1.6" />
      <line x1="13" y1="17" x2="19" y2="17" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function SproutGlyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <path
        d="M16 28 V 14 M16 14 C 11 12 8 8 9 4 c 5 0 8 4 7 10 M16 14 c 5 -2 8 -6 7 -10 c -5 0 -8 4 -7 10"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 22 c 4 -2 8 -2 12 0 c 4 -2 8 -2 12 0"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function H2Glyph() {
  return (
    <svg viewBox="0 0 32 32" className="h-6 w-6" fill="none">
      <text
        x="16"
        y="22"
        textAnchor="middle"
        fontSize="14"
        fontWeight="800"
        fill="currentColor"
        fontFamily="Montserrat, system-ui"
      >
        H₂
      </text>
    </svg>
  );
}
