import {
  BarChart3,
  Building2,
  Globe2,
  HeartHandshake,
  Leaf,
  Quote,
  ShieldCheck,
  Sprout,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { cn } from "@/lib/utils";
import { MandiLogo } from "./MandiLogo";

const BENEFITS = [
  {
    label: "FARMERS",
    tagline: "Higher Income. Stronger Future.",
    slot: "benefitFarmers" as const,
    bullets: [
      "New, high-value income source",
      "Multiple revenue streams",
      "Reduced input costs",
      "Year-round employment",
    ],
    Icon: Users,
  },
  {
    label: "RURAL\nCOMMUNITIES",
    tagline: "Jobs. Skills. Growth.",
    slot: "benefitCommunity" as const,
    bullets: [
      "Local jobs in farming & hydrogen ecosystem",
      "Skill development",
      "Stronger rural economy",
      "Reduced migration",
    ],
    Icon: Users,
  },
  {
    label: "INDUSTRIES",
    tagline: "Clean Energy. Competitive Advantage.",
    slot: "benefitIndustries" as const,
    bullets: [
      "Reliable green fuel supply",
      "Lower carbon footprint",
      "Energy security",
      "Cost competitiveness",
    ],
    Icon: Building2,
  },
  {
    label: "INDIA",
    tagline: "Energy Independence. Atmanirbhar Bharat.",
    slot: "benefitIndia" as const,
    bullets: [
      "Reduced fuel imports",
      "Stronger energy security",
      "Green jobs & innovation",
      "Leadership in clean energy",
    ],
    Icon: () => <FlagIcon />,
  },
  {
    label: "PLANET",
    tagline: "Lower Emissions. Better Tomorrow.",
    slot: "benefitPlanet" as const,
    bullets: [
      "Significant CO₂ reduction",
      "Cleaner air and environment",
      "Climate-resilient future",
      "Nature-positive growth",
    ],
    Icon: Globe2,
  },
];

const BENEFIT_BADGES = [
  { label: "INCLUSIVE GROWTH", Icon: Users },
  { label: "RURAL EMPOWERMENT", Icon: Leaf },
  { label: "ECONOMIC PROSPERITY", Icon: TrendingUp },
  { label: "CLIMATE ACTION", Icon: Globe2 },
];

const OPPORTUNITY_STATS = [
  {
    value: "$150+",
    unit: "BILLION",
    label: "Global Green Hydrogen Market by 2030",
    Icon: BarChart3,
  },
  {
    value: "520",
    unit: "MMTPA",
    label: "Global Green Hydrogen Demand by 2050",
    Icon: () => <H2RoundSmall />,
  },
  {
    value: "$26+",
    unit: "BILLION",
    label: "India Green Hydrogen Market Opportunity by 2030",
    Icon: () => <RupeeIcon />,
  },
  {
    value: "5",
    unit: "MMT",
    label: "India's Target Annual Green Hydrogen Production by 2030",
    Icon: () => <IndiaIcon />,
  },
  {
    value: "500",
    unit: "GW",
    label: "Non-fossil Energy Capacity Target by 2030",
    Icon: () => <PanelIcon />,
  },
  {
    value: ">85%",
    unit: "",
    label: "Current Fuel Import Dependency",
    Icon: ShieldCheck,
  },
];

const VISION_STATS = [
  { value: "10+ MILLION", label: "Acres under Hemp & Napier cultivation", Icon: Sprout },
  { value: "100+", label: "Decentralized Green Hydrogen Plants", Icon: Leaf },
  {
    value: "100 MMT+",
    label: "Green Hydrogen Production Potential",
    Icon: () => <H2RoundSmall />,
  },
  {
    value: "100+ MILLION TONNES",
    label: "CO₂ Emission Reduction Potential",
    Icon: () => <CO2RoundSmall />,
  },
];

export function HomeWhoBenefits() {
  // NOTE: `min-h-dvh` is intentionally omitted from the <section> while BLOCK 2
  // is disabled, so the bottom strip's `mt-auto` doesn't leave a gap. Restore
  // `min-h-dvh` when re-enabling the opportunity block.
  return (
    <section className="flex flex-col bg-paper">
      {/* ── BLOCK 1 — WHO BENEFITS? — full-section photo backdrop with
          left white-wash (cards area) + bottom-right dark green wash
          (badges area). Photo dissolves smoothly into both surfaces. */}
      <div className="relative isolate overflow-hidden">
        {/* Full-section photo + stacked gradient washes */}
        <div className="absolute inset-0 -z-10">
          <PhotoSlot slot="whoBenefitsHero" fill className="rounded-none ring-0" />
          {/* Left white wash — solid white over the cards area, smooth fade
              through the middle, fully transparent on the right where the
              father + son + plant should read clearly. */}
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,white_0%,white_52%,rgba(255,255,255,0.78)_60%,rgba(255,255,255,0.4)_68%,rgba(255,255,255,0.12)_78%,transparent_88%)]"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.65fr_1fr]">
          {/* LEFT — heading + REAL IMPACT eyebrow + description + 5 cards
              (sits over the white-washed half of the backdrop) */}
          <div className="relative px-6 pt-6 pb-3 lg:px-10 lg:pt-7">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mission-soft text-mission ring-1 ring-mission/15">
                <Leaf size={14} strokeWidth={1.8} />
              </span>
              <h2 className="font-display text-[clamp(1.5rem,3vw,2.4rem)] font-extrabold uppercase leading-none tracking-tight text-mission">
                Who Benefits?
              </h2>
            </div>
            <p className="mt-2 flex items-center gap-3 text-[11px] font-extrabold uppercase tracking-[0.16em] text-mission">
              Real Impact. Real People. Real Change.
              <span aria-hidden className="inline-block h-px w-10 bg-mission/40" />
            </p>
            <p className="mt-2 max-w-2xl text-[12.5px] leading-relaxed text-ink-soft">
              Our model creates a positive ripple effect across farmers,
              communities, industries and the planet.
            </p>

            {/* 5 stakeholder cards */}
            <ul className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-5">
              {BENEFITS.map((b, idx) => {
                // On phones the 5-card grid is 2 columns, leaving the last card
                // alone in its row — let it span both columns (with a wider
                // banner crop) so the row reads as balanced. Desktop is 5-up.
                const isWide = idx === BENEFITS.length - 1;
                return (
                <li
                  key={b.label}
                  className={cn(
                    "flex flex-col overflow-hidden rounded-xl border border-line bg-paper",
                    isWide && "max-lg:col-span-2"
                  )}
                >
                  <div className="bg-mission-soft px-3 py-2">
                    <div className="flex items-start gap-2">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-mission text-white">
                        <b.Icon size={12} strokeWidth={1.8} />
                      </span>
                      <div className="min-w-0">
                        <p className="whitespace-pre-line text-[10px] font-extrabold uppercase leading-tight text-ink">
                          {b.label}
                        </p>
                        <p className="mt-0.5 text-[10px] font-medium leading-tight text-ink-soft">
                          {b.tagline}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div
                    className={cn(
                      "relative w-full overflow-hidden",
                      isWide ? "max-lg:aspect-[16/7] lg:aspect-[4/5]" : "aspect-[4/5]"
                    )}
                  >
                    <PhotoSlot
                      slot={b.slot}
                      fill
                      className="rounded-none ring-0"
                      imgClassName="object-cover object-top"
                    />
                  </div>
                  <ul className="flex-1 space-y-1 px-3 py-2.5">
                    {b.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-1.5 text-[10.5px] leading-snug text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-mission"
                        />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT — quote overlay at top, badges floating over dark green bottom wash */}
          <div className="relative isolate flex flex-col px-6 pt-7 pb-4 lg:px-8 lg:pt-8 lg:pb-5">
            {/* Dark mission wash — short strip just behind the badges, with
                a soft top fade so it doesn't look like a hard rectangle. */}
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(7,61,40,0.92)_0%,rgba(7,61,40,0.88)_10%,rgba(7,61,40,0.55)_18%,rgba(7,61,40,0.2)_26%,transparent_34%)]"
            />

            {/* Quote overlay at the TOP */}
            <div>
              <Quote size={26} strokeWidth={1.5} className="text-mission/70" />
              <p className="font-display mt-1 text-[clamp(1.05rem,1.7vw,1.4rem)] font-extrabold uppercase leading-tight text-mission">
                Empowering Farmers.
                <br />
                Energizing India.
                <br />
                Healing The Planet.
              </p>
              <p className="mt-3 max-w-xs text-[12.5px] leading-snug text-ink">
                Building a prosperous, sustainable and self-reliant India.
                <Quote size={14} strokeWidth={1.5} className="ml-1 inline align-baseline text-mission/65" />
              </p>
            </div>

            {/* 4 badges floating over the solid bottom of the wash */}
            <ul className="mt-auto flex items-end justify-around gap-2 pt-6">
              {BENEFIT_BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-2 text-left">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25">
                    <b.Icon size={15} strokeWidth={1.8} />
                  </span>
                  <span className="whitespace-pre-line text-[9px] font-extrabold uppercase leading-tight text-white">
                    {b.label.replace(" ", "\n")}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── BLOCK 2 — HOW BIG IS THE OPPORTUNITY? ───────────────────────
          TEMPORARILY DISABLED — section is still being worked on. To bring it
          back, change `false` below to `true` (or remove the `{false && (` …
          `)}` wrapper). Nothing inside has been deleted. */}
      {false && (
      <div className="bg-linear-to-br from-white via-white to-navy-soft/50">
        <div className="mx-auto w-full max-w-7xl px-6 py-8 lg:px-10 lg:py-10">
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.9fr_1fr] lg:gap-6">
            {/* LEFT PANEL — heading+photo column | stat grid + callout column */}
            <div className="grid grid-cols-1 gap-5 md:grid-cols-[0.92fr_1.5fr] md:gap-5">
              {/* Heading + subtext + plant photo */}
              <div className="flex flex-col">
                <h3 className="font-display text-[clamp(1.5rem,2.5vw,2.1rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-navy">
                  <span className="block whitespace-nowrap">How Big Is The</span>
                  <span className="block">Opportunity?</span>
                </h3>
                <span aria-hidden className="mt-3 block h-[3px] w-12 rounded-full bg-mission" />
                <p className="mt-3 text-[13px] font-medium leading-relaxed text-ink">
                  India has the resources.
                  <br />
                  The need is urgent.
                  <br />
                  The opportunity is{" "}
                  <strong className="font-extrabold text-mission">massive.</strong>
                </p>

                {/* Green-H₂ plant photo — bleeds to the LEFT extreme of the
                    section (cancels the container's left padding) and flexes to
                    fill the column so its bottom aligns with the callout. */}
                <div className="relative mt-5 -ml-6 aspect-[16/10] overflow-hidden rounded-r-xl md:aspect-auto md:min-h-44 md:flex-1 lg:-ml-10">
                  <PhotoSlot
                    slot="hydrogenPlant"
                    fill
                    className="rounded-none ring-0"
                    imgClassName="object-cover object-center"
                  />
                </div>
              </div>

              {/* Stat grid + once-in-a-generation callout */}
              <div className="flex flex-col gap-3.5">
                <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {OPPORTUNITY_STATS.map((s) => (
                    <li
                      key={s.label}
                      className="flex flex-col items-center rounded-xl border border-navy/12 bg-white/70 px-3 py-3.5 text-center"
                    >
                      {/* icon + thin divider + number (centered as a group) */}
                      <div className="flex items-center justify-center gap-2.5">
                        <span className="shrink-0 text-navy/80">
                          <s.Icon size={20} strokeWidth={1.5} />
                        </span>
                        <span aria-hidden className="h-8 w-px bg-navy/15" />
                        <div className="leading-none">
                          <p className="font-display text-[1.45rem] font-extrabold leading-none tracking-tight text-navy">
                            {s.value}
                          </p>
                          {s.unit && (
                            <p className="font-display mt-1 text-[11px] font-extrabold tracking-wide text-navy/70">
                              {s.unit}
                            </p>
                          )}
                        </div>
                      </div>
                      <p className="mt-2.5 text-[10.5px] leading-snug text-ink-soft">
                        {s.label}
                      </p>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex items-start gap-3 rounded-xl border border-navy/12 bg-paper px-4 py-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-paper text-navy ring-1 ring-navy/20">
                    <Target size={16} strokeWidth={1.8} />
                  </span>
                  <p className="text-[12px] leading-snug text-ink-soft">
                    <strong className="font-display block text-[13px] font-extrabold uppercase tracking-wide text-navy">
                      A Once-In-A-Generation Opportunity
                    </strong>
                    To build a clean energy superpower, create millions of jobs,
                    boost rural incomes and{" "}
                    <strong className="font-bold text-mission">
                      secure India&rsquo;s energy future.
                    </strong>
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT PANEL — Our Vision At Scale (stats + India map graphic) */}
            <div className="relative flex flex-col overflow-hidden rounded-2xl bg-navy-soft p-5 ring-1 ring-navy/10 lg:p-6">
              <p className="text-[12px] font-extrabold uppercase tracking-[0.16em] text-navy">
                Our Vision At Scale
              </p>
              <p className="font-display mt-1 max-w-xs text-[15px] font-extrabold leading-snug text-navy">
                Building India&rsquo;s Largest Decentralized Green Hydrogen
                Ecosystem
              </p>

              <span aria-hidden className="mt-3 block h-px w-full bg-navy/15" />

              {/* stats on the left, India map filling the right */}
              <div className="mt-4 grid flex-1 grid-cols-[1.3fr_1fr] items-center gap-2">
                <ul className="space-y-4">
                  {VISION_STATS.map((v) => (
                    <li key={v.value} className="flex items-center gap-2.5">
                      <span className="shrink-0 text-mission">
                        <v.Icon size={22} strokeWidth={1.6} />
                      </span>
                      <div className="min-w-0">
                        <p className="font-display text-[16px] font-extrabold leading-none text-mission">
                          {v.value}
                        </p>
                        <p className="mt-1 text-[10px] leading-tight text-ink-soft">
                          {v.label}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* India map — bleeds to the RIGHT (and bottom) extreme of the
                    card by cancelling the card's padding on those edges. */}
                <div className="relative -mr-5 -mb-5 -mt-5 min-h-44 self-stretch lg:-mr-6 lg:-mb-6 lg:-mt-6">
                  <PhotoSlot
                    slot="visionAtScaleMap"
                    fill
                    className="rounded-none bg-transparent ring-0"
                    imgClassName="object-contain object-right-bottom"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ── BOTTOM STRIP — Big For India. ────────────────────────────── */}
      <div className="mt-auto bg-mission-soft">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-5 gap-y-2 px-6 py-3 lg:px-10">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-mission text-white">
            <HeartHandshake size={14} strokeWidth={1.8} />
          </span>
          <p className="flex-1 text-[11.5px] font-extrabold uppercase tracking-wide text-navy">
            Big For India. Good For The Planet. Great For The Future.
          </p>
          <span aria-hidden className="hidden h-7 w-px bg-navy/15 md:block" />
          <p className="text-[11px] text-ink-soft md:max-w-xs">
            Carbon Mandi is unlocking the power of farms to fuel
            India&rsquo;s future with Green Hydrogen.
          </p>
          <span aria-hidden className="hidden h-7 w-px bg-navy/15 md:block" />
          <div className="flex flex-col gap-1">
            <MandiLogo className="h-8 w-auto" />
            <span className="text-[7.5px] font-semibold tracking-wide text-mission/70">
              Farm to Fuel. Future for All.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── glyphs ─────────────────────────────────────────────────────────── */

function FlagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3">
      <line x1="5" y1="3" x2="5" y2="21" stroke="currentColor" strokeWidth="1.6" />
      <rect x="5" y="3" width="14" height="11" stroke="currentColor" strokeWidth="1.6" />
      <line x1="5" y1="9" x2="19" y2="9" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function H2RoundSmall() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[8.5px] font-extrabold leading-none">
      H₂
    </span>
  );
}

function CO2RoundSmall() {
  return (
    <span className="flex h-5 w-5 items-center justify-center rounded-full border border-current text-[7px] font-extrabold leading-none">
      CO₂
    </span>
  );
}

function RupeeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M7 6 H 17 M7 10 H 17 M8 14 H 12 c 2 0 4 -1 4 -3 M8 14 l 7 7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function IndiaIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <path
        d="M12 2 c -2 0 -4 2 -5 4 c -2 3 -3 7 -4 10 c 0 2 1 3 2 3 c 1 0 2 2 3 4 c 1 1 2 1 2 -1 c 1 -3 3 -5 5 -7 c 2 -2 3 -4 3 -7 c 0 -3 -3 -6 -6 -6 Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-3.5 w-3.5">
      <rect x="3" y="6" width="18" height="12" stroke="currentColor" strokeWidth="1.6" />
      <line x1="9" y1="6" x2="9" y2="18" stroke="currentColor" strokeWidth="1.4" />
      <line x1="15" y1="6" x2="15" y2="18" stroke="currentColor" strokeWidth="1.4" />
      <line x1="3" y1="12" x2="21" y2="12" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 18 v 3 M9 21 h 6" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
