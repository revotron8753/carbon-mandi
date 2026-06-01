import Image from "next/image";
import {
  ArrowRight,
  BarChart3,
  Check,
  Droplet,
  Leaf,
  RefreshCw,
  Sprout,
} from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { IMAGES } from "@/lib/images";

const SIDE_STATS = [
  {
    label: "HIGH BIOMASS YIELD",
    body: "30–45 tons biomass per acre per year (combined).",
    Icon: BarChart3,
  },
  {
    label: "BETTER SOIL HEALTH",
    body: "Improves soil organic carbon and microbial activity.",
    Icon: Sprout,
  },
  {
    label: "CONTINUOUS FEEDSTOCK",
    body: "Perennial nature ensures year-round biomass supply.",
    Icon: RefreshCw,
  },
  {
    label: "CARBON SEQUESTRATION",
    body: "Captures more CO₂ and supports climate goals.",
    Icon: () => <CO2Round />,
  },
  {
    label: "RESOURCE EFFICIENT",
    body: "Low water requirement and high land productivity.",
    Icon: Droplet,
  },
];

const INTERCROPPING_BENEFITS = [
  {
    title: "Higher Total Biomass:",
    body: "Hemp (vertical) + Napier (bushy) maximize sunlight & space.",
  },
  {
    title: "Soil Protection:",
    body: "Napier protects soil, reduces erosion and retains moisture.",
  },
  {
    title: "Nutrient Synergy:",
    body: "Different root systems improve soil structure and fertility.",
  },
  {
    title: "Pest & Weed Management:",
    body: "Natural balance reduces pests and weeds.",
  },
  {
    title: "Year-Round Harvest:",
    body: "Napier can be cut multiple times, Hemp once – ensuring continuous feedstock.",
  },
];

const OUTPUTS = [
  {
    label: "GREEN HYDROGEN",
    body: "Clean fuel for industry, transport & power.",
    slot: "outputGreenH2" as const,
  },
  {
    label: "BIOCHAR",
    body: "Enhances soil health, locks carbon.",
    slot: "outputBiochar" as const,
  },
  {
    label: "CARBON CREDITS",
    body: "Additional climate revenue for farmers.",
    slot: "outputCarbonCredits" as const,
  },
  {
    label: "FIBER",
    body: "Used in textiles, composites, boards & bioproducts.",
    slot: "outputFiber" as const,
  },
  {
    label: "CONSTRUCTION MATERIALS",
    body: "Sustainable building & insulation materials.",
    slot: "outputConstruction" as const,
  },
];

export function HomeHempNapier() {
  return (
    <section>
      {/* ── 4A: Why Hemp & Napier — full-viewport panel ────────────────
          Layout: hemp+napier image bleeds full width, cream panel fades in
          on the left over the photo, stat tiles overlay on the right, and
          HEMP / NAPIER GRASS pills sit at the bottom of the visible image. */}
      <div className="relative isolate flex items-center overflow-hidden">
        {/* Backdrop image — full-bleed, anchored slightly right so the mature
            hemp + napier composition stays visible on the right side. */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.section4Bg.src}
            alt={IMAGES.section4Bg.alt}
            fill
            sizes="100vw"
            priority
            className="object-cover object-[60%_50%]"
          />
          {/* Desktop: cream fade on the left so the content panel reads clearly
              while the image stays exposed from ~50% onward. */}
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(to_right,#faf8f3_0%,#faf8f3_42%,rgba(250,248,243,0.55)_55%,rgba(250,248,243,0)_68%)]"
          />
          {/* Mobile: full cream wash so the heading + intro read over the crop. */}
          <div aria-hidden className="absolute inset-0 bg-[#faf8f3]/75 lg:hidden" />
        </div>

        {/* Content + stat tiles */}
        <div className="mx-auto w-full max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.25fr_auto] lg:items-center lg:gap-12">
            {/* LEFT — heading + cellulose (sits over the cream area) */}
            <div className="max-w-xl">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-mission-soft text-mission ring-1 ring-mission/15">
                  <Leaf size={16} strokeWidth={1.8} />
                </span>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-mission">
                  Why
                </p>
                <span aria-hidden className="inline-block h-px w-10 bg-mission/35" />
              </div>
              <h2 className="font-display mt-2 text-[clamp(2.4rem,5vw,4.4rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-mission">
                Hemp &amp; Napier?
              </h2>
              <p className="mt-4 max-w-md text-base font-semibold leading-snug text-mission/85">
                One Crop Combination. Multiple Benefits. Endless Possibilities.
              </p>
              <p className="mt-5 max-w-md text-[14px] leading-relaxed text-ink-soft">
                Hemp and Napier are high-biomass, fast-growing crops that are
                climate-resilient, farmer-friendly and ideal for Green Hydrogen
                production through a{" "}
                <span className="text-mission">Circular Economy</span>.
              </p>

              {/* Cellulose card */}
              <div className="mt-7 overflow-hidden rounded-xl ring-1 ring-line bg-paper/95">
                <div className="bg-mission px-5 py-3 text-center">
                  <p className="text-[12px] font-extrabold uppercase tracking-wide text-white">
                    High Cellulose Content = Higher Energy Potential
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-px bg-line">
                  <CelluloseTile
                    name="HEMP"
                    pct="55–60%"
                    sub="Strong stems, fast growth and high fiber yield."
                    glyph={<HempLeafBig />}
                    side="left"
                  />
                  <CelluloseTile
                    name="NAPIER GRASS"
                    pct="35–40%"
                    sub="High biomass yield, perennial and resilient."
                    glyph={<NapierGrassBig />}
                    side="right"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT — 5 stat tiles overlaying the image */}
            <ul className="flex flex-col gap-2.5 lg:w-72">
              {SIDE_STATS.map((s) => (
                <li
                  key={s.label}
                  className="flex items-start gap-3 rounded-xl bg-paper/95 px-4 py-3 shadow-[0_8px_24px_-12px_rgba(13,92,61,0.25)] ring-1 ring-line backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-mission-soft text-mission ring-1 ring-mission/15">
                    <s.Icon size={16} strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-[11px] font-extrabold uppercase tracking-wide text-ink">
                      {s.label}
                    </p>
                    <p className="mt-0.5 text-[12px] leading-snug text-ink-soft">
                      {s.body}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* HEMP / NAPIER GRASS overlay pills — bottom of the visible image area */}
        <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-10 hidden justify-center lg:flex">
          <div className="ml-[55%] flex gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-md bg-mission-deep/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md">
              <HempIcon /> HEMP
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-md bg-mission-deep/90 px-4 py-2 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-md">
              <NapierIcon /> NAPIER GRASS
            </span>
          </div>
        </div>
      </div>

      {/* ── 4B: Intercropping + Circular Economy — combined viewport ──
          4.png shows through on the left ~3% sliver. Two stacked panels
          (cream + paper) cover the rest. */}
      <div className="relative isolate flex flex-col overflow-hidden">
        {/* 4.png backdrop — full bleed, visible only where the inner panels
            don't cover (i.e. the left sliver). */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={IMAGES.section4Bg.src}
            alt={IMAGES.section4Bg.alt}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Content rail — offset from the left so the backdrop sliver shows */}
        <div className="flex flex-1 flex-col pl-8 lg:pl-12">
          {/* — Top panel: How Does It Work? / Intercropping (cream tint) — */}
          <div className="flex-1 bg-cream/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
              <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.8fr_1.4fr] lg:gap-12">
                {/* Left — title + roots */}
                <div>
                  <div className="flex items-center gap-3">
                    <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-ink">
                      How Does It Work?
                    </p>
                    <span aria-hidden className="inline-block h-px flex-1 bg-mission/40" />
                    <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-mission" />
                  </div>
                  <h3 className="font-display mt-5 text-[clamp(1.3rem,2.3vw,1.7rem)] font-extrabold uppercase leading-tight tracking-tight text-mission">
                    Intercropping Model
                  </h3>
                  <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-ink-soft">
                    Hemp and Napier grown together on the same field create a
                    natural, mutually beneficial ecosystem.
                  </p>

                  {/* Two roots circles + plus */}
                  <div className="mt-5 flex items-center gap-2">
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper ring-1 ring-line">
                      <RootsIcon />
                    </span>
                    <span aria-hidden className="text-lg font-extrabold text-mission">+</span>
                    <span className="flex h-16 w-16 items-center justify-center rounded-full bg-paper ring-1 ring-line">
                      <RootsIcon variant="grass" />
                    </span>
                  </div>
                </div>

                {/* Center — intercropping image (HEMP / NAPIER pill labels are
                    baked into the asset). */}
                <div className="overflow-hidden rounded-xl ring-1 ring-line">
                  <PhotoSlot
                    slot="intercroppingField"
                    aspectRatio="16/9"
                    className="rounded-none ring-0"
                  />
                </div>

                {/* Right — benefit bullets in a soft tinted panel */}
                <ul className="space-y-3 rounded-2xl bg-mission-soft/45 p-5 ring-1 ring-mission/15">
                  {INTERCROPPING_BENEFITS.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-mission text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      <p className="text-[12.5px] leading-snug text-ink">
                        <strong className="font-bold text-ink">
                          {b.title}
                        </strong>{" "}
                        {b.body}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* — Bottom panel: Supports Circular Economy (paper) — */}
          <div className="flex-1 bg-paper/95 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-14">
              <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_2.8fr_auto] lg:items-center lg:gap-6">
                {/* Left — heading */}
                <div>
                  <h3 className="font-display text-[clamp(1.3rem,2.1vw,1.7rem)] font-extrabold uppercase leading-tight tracking-tight text-mission">
                    Supports
                    <br />
                    Circular Economy
                  </h3>
                  <p className="mt-3 max-w-xs text-[12.5px] leading-relaxed text-ink-soft">
                    Every harvest creates multiple valuable outputs with zero
                    waste.
                  </p>
                  <div className="mt-3 h-1 w-12 bg-mission" />
                </div>

                {/* Center — 5 round outputs with arrows */}
                <ul className="flex flex-wrap items-start justify-center gap-y-4">
                  {OUTPUTS.map((o, i) => (
                    <li key={o.label} className="flex items-center">
                      <div className="flex w-24 flex-col items-center text-center md:w-28">
                        <div className="relative h-16 w-16 overflow-hidden rounded-full ring-2 ring-mission/30 md:h-[72px] md:w-[72px]">
                          <PhotoSlot
                            slot={o.slot}
                            aspectRatio="1/1"
                            className="rounded-full ring-0"
                          />
                        </div>
                        <p className="mt-2 text-[10px] font-extrabold uppercase tracking-wide text-mission">
                          {o.label}
                        </p>
                        <p className="mt-0.5 text-[9.5px] leading-tight text-ink-muted">
                          {o.body}
                        </p>
                      </div>
                      {i < OUTPUTS.length - 1 && (
                        <span aria-hidden className="mx-0.5 hidden text-mission md:inline">
                          <ArrowRight size={14} strokeWidth={1.8} />
                        </span>
                      )}
                    </li>
                  ))}
                </ul>

                {/* Right — final value box (compact) */}
                <div className="flex items-center justify-center rounded-2xl bg-mission p-4 text-center text-white lg:h-full lg:w-32">
                  <p className="font-display text-[11.5px] font-bold leading-tight">
                    From Farm
                    <br />
                    to Fuel to Future
                    <br />
                    <br />
                    <span className="text-[10px] font-medium opacity-90">
                      Everything is
                    </span>
                    <br />
                    <span className="text-base font-extrabold">Value.</span>
                    <br />
                    <span className="text-[10px] font-medium opacity-90">
                      Nothing is
                    </span>
                    <br />
                    <span className="text-base font-extrabold">Waste.</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CelluloseTile({
  name,
  pct,
  sub,
  glyph,
  side,
}: {
  name: string;
  pct: string;
  sub: string;
  glyph: React.ReactNode;
  /** Which side the illustration sits on, mirroring the reference design. */
  side: "left" | "right";
}) {
  return (
    <div className="bg-paper p-5">
      <div
        className={
          "flex items-center gap-4 " +
          (side === "left" ? "flex-row" : "flex-row-reverse")
        }
      >
        <div className="shrink-0">{glyph}</div>
        <div className="flex-1">
          <p className="text-[12px] font-extrabold uppercase tracking-wide text-mission">
            {name}
          </p>
          <p className="mt-0.5 text-[10px] uppercase tracking-wide text-ink-muted">
            Cellulose Content
          </p>
          <p className="font-display mt-1 text-[clamp(1.5rem,2.2vw,2rem)] font-extrabold leading-none text-mission">
            {pct}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[11.5px] leading-snug text-ink-soft">{sub}</p>
    </div>
  );
}

/** Compact hemp leaf used in the overlay pill at the bottom of 4A. */
function HempIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="#ffffff">
      <path d="M12 3 q -2 5 0 11 q 2 -6 0 -11 Z" />
      <path transform="rotate(-30 12 14)" d="M12 3 q -2 5 0 11 q 2 -6 0 -11 Z" />
      <path transform="rotate(30 12 14)" d="M12 3 q -2 5 0 11 q 2 -6 0 -11 Z" />
      <path transform="rotate(-60 12 14)" d="M12 5 q -1.5 4 0 9 q 1.5 -4 0 -9 Z" />
      <path transform="rotate(60 12 14)" d="M12 5 q -1.5 4 0 9 q 1.5 -4 0 -9 Z" />
    </svg>
  );
}

/** Compact napier grass blades used in the overlay pill at the bottom of 4A. */
function NapierIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
      <g stroke="#ffffff" strokeWidth="1.4" strokeLinecap="round">
        <path d="M12 21 C 10 14 11 7 9 3" />
        <path d="M12 21 C 12 14 13 7 11 2" />
        <path d="M12 21 C 14 14 13 7 15 3" />
      </g>
    </svg>
  );
}

/** Detailed 7-leaflet cannabis leaf, used in the HEMP cellulose tile. */
function HempLeafBig() {
  return (
    <svg viewBox="0 0 64 70" className="h-16 w-16" fill="none">
      {/* Stem */}
      <line x1="32" y1="68" x2="32" y2="50" stroke="#0d5c3d" strokeWidth="1.5" />
      <g fill="#0d5c3d" stroke="#073d28" strokeWidth="0.7" strokeLinejoin="round">
        {/* Top leaflet */}
        <path d="M32 50 q -3 -18 0 -46 q 3 28 0 46 Z" />
        {/* Upper-left / upper-right */}
        <path transform="rotate(-32 32 50)" d="M32 50 q -3 -16 0 -40 q 3 24 0 40 Z" />
        <path transform="rotate(32 32 50)" d="M32 50 q -3 -16 0 -40 q 3 24 0 40 Z" />
        {/* Mid-left / mid-right */}
        <path transform="rotate(-62 32 50)" d="M32 50 q -3 -14 0 -32 q 3 18 0 32 Z" />
        <path transform="rotate(62 32 50)" d="M32 50 q -3 -14 0 -32 q 3 18 0 32 Z" />
        {/* Bottom-left / bottom-right */}
        <path transform="rotate(-88 32 50)" d="M32 50 q -3 -10 0 -22 q 3 12 0 22 Z" />
        <path transform="rotate(88 32 50)" d="M32 50 q -3 -10 0 -22 q 3 12 0 22 Z" />
      </g>
    </svg>
  );
}

/** Tall napier-grass blades, used in the NAPIER GRASS cellulose tile. */
function NapierGrassBig() {
  return (
    <svg viewBox="0 0 64 70" className="h-16 w-16" fill="none">
      <g
        stroke="#0d5c3d"
        strokeWidth="2.4"
        strokeLinecap="round"
        fill="none"
      >
        <path d="M32 66 C 26 46, 30 24, 22 4" />
        <path d="M32 66 C 32 44, 34 22, 30 2" />
        <path d="M32 66 C 38 44, 36 22, 42 4" />
        <path d="M32 66 C 22 50, 18 28, 12 12" />
        <path d="M32 66 C 42 50, 46 28, 52 12" />
      </g>
    </svg>
  );
}

function CO2Round() {
  return (
    <span className="flex h-4 w-4 items-center justify-center text-[8px] font-extrabold">
      CO₂
    </span>
  );
}

function RootsIcon({ variant }: { variant?: "grass" }) {
  if (variant === "grass") {
    return (
      <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none">
        <path d="M30 5 v 35 M22 8 v 32 M38 8 v 32 M14 14 v 25 M46 14 v 25" stroke="#0d5c3d" strokeWidth="2" />
        <path d="M30 40 c -10 0 -16 8 -18 16 M30 40 c 10 0 16 8 18 16 M30 40 v 18" stroke="#0d5c3d" strokeWidth="1.5" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 60 60" className="h-14 w-14" fill="none">
      <path d="M30 5 v 35" stroke="#0d5c3d" strokeWidth="2" />
      {[-50, -25, 0, 25, 50].map((rot, i) => (
        <path
          key={i}
          transform={`rotate(${rot} 30 20)`}
          d="M30 20 q 2 -10 0 -18 q -2 8 0 18 Z"
          fill="#3f7a5b"
          stroke="#0d5c3d"
          strokeWidth="1"
        />
      ))}
      <path d="M30 40 c -10 0 -14 8 -16 16 M30 40 c 10 0 14 8 16 16 M30 40 v 18" stroke="#0d5c3d" strokeWidth="1.5" />
    </svg>
  );
}
