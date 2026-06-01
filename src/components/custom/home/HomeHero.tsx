import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Users } from "lucide-react";

import { IMAGES } from "@/lib/images";
import { MandiLogo } from "./MandiLogo";
import { NavMenu } from "../NavMenu";

const TRUST_ITEMS = [
  { label1: "IIT Ropar", label2: "Incubated", emblem: <IITRoparEmblem /> },
  {
    label1: "National Climate Goal",
    label2: "Aligned",
    emblem: <ClimateGoalEmblem />,
  },
  { label1: "Green Hydrogen", label2: "Pilot", emblem: <H2Emblem /> },
  { label1: "Circular Economy", label2: "Model", emblem: <CircularEmblem /> },
  { label1: "Made in", label2: "India", emblem: <LionEmblem /> },
];

const BOTTOM_STRIP = [
  { label: "ATMANIRBHAR BHARAT", sub: "Energy Independence", emblem: <IndiaMapMini /> },
  { label: "LOWER EMISSIONS", sub: "For A Greener Tomorrow", emblem: <CO2Mini /> },
  {
    label: "EMPOWERING FARMERS",
    sub: "From Farmer to Energy Producer",
    emblem: <FarmerMini />,
  },
  { label: "TRILLION DOLLAR OPPORTUNITY", sub: "Green Hydrogen Economy", emblem: <ChartMini /> },
  { label: "INVEST IN INDIA", sub: "Invest in the Future", emblem: <RupeeMini /> },
];

export function HomeHero() {
  return (
    <section className="relative isolate flex min-h-dvh flex-col overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 -z-10">
        {IMAGES.heroBackground.src ? (
          <Image
            src={IMAGES.heroBackground.src}
            alt={IMAGES.heroBackground.alt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          <HeroPlaceholder />
        )}
        {/* Soft top→bottom wash so text always reads */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.55)_0%,rgba(255,255,255,0.25)_45%,rgba(255,255,255,0.15)_100%)]"
        />
      </div>

      {/* Logo + Made in India */}
      <div className="mx-auto flex w-full max-w-7xl items-start justify-between px-6 pt-4 lg:px-10 lg:pt-5">
        <Link href="/" className="inline-flex flex-col gap-1.5" aria-label="Carbon Mandi — home">
          <MandiLogo className="h-10 w-auto md:h-11" />
          <span className="text-[10px] font-medium tracking-wide text-ink-soft md:text-[10.5px]">
            Farm to Fuel. Future for All.
          </span>
        </Link>

        {/* Primary nav (desktop) — National Projects · Team · Blogs */}
        <NavMenu className="hidden self-center lg:flex" />

        <div className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.08em] text-ink">
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
            className="h-auto w-7 rounded-sm ring-1 ring-line"
          />
        </div>
      </div>

      {/* Main content — fills remaining space, vertically centered */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-6 py-4 text-center lg:px-10">
        <h1 className="font-display text-[clamp(2rem,5.5vw,4.5rem)] font-extrabold uppercase leading-[1.02] tracking-tight text-mission">
          National Green
          <br />
          Hydrogen Mission
        </h1>

        <p className="mt-3 max-w-3xl text-[clamp(1rem,1.6vw,1.4rem)] font-semibold leading-snug text-ink md:mt-4">
          India&apos;s First Hemp &amp; Napier Biomass
          <br className="hidden sm:block" />
          Based Green Hydrogen Initiative
        </p>

        <p className="mt-4 flex flex-wrap items-center justify-center gap-3 text-saffron-deep">
          <span aria-hidden className="inline-block h-px w-8 bg-saffron-deep" />
          <span className="font-display text-[clamp(1.05rem,1.9vw,1.6rem)] font-bold">
            Ab Bharat Ke Har Khet Mein Tel Ka Kua Hoga
          </span>
          <span aria-hidden className="inline-block h-px w-8 bg-saffron-deep" />
        </p>

        <p className="mt-4 text-[15px] font-bold text-ink md:text-base">
          Farm to Fuel. Farmer to Energy Producer. India to Energy Independence.
        </p>

        <p className="mx-auto mt-2.5 max-w-2xl text-[13px] font-semibold leading-relaxed text-ink md:text-sm">
          Supporting India&apos;s Climate Goals 2030 through Green Hydrogen,
          Circular Economy and Rural Innovation.
        </p>

        {/* Trust bar */}
        <ul className="mx-auto mt-6 grid w-full max-w-5xl grid-cols-2 items-center gap-x-3 gap-y-3 rounded-2xl bg-paper/95 px-5 py-3.5 shadow-[0_20px_60px_-30px_rgba(13,92,61,0.25)] ring-1 ring-line backdrop-blur sm:grid-cols-3 md:grid-cols-5 md:px-7 md:py-4">
          {TRUST_ITEMS.map((item) => (
            <li key={item.label1} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-mission">
                {item.emblem}
              </span>
              <span className="text-left text-[11.5px] font-bold leading-tight text-ink">
                {item.label1}
                <br />
                {item.label2}
              </span>
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-5 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <Link
            href="/projects"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-mission-deep px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:bg-mission-dark"
          >
            <Leaf size={15} strokeWidth={2} />
            Explore The National Project
            <ArrowRight size={15} strokeWidth={2.2} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-3 rounded-md bg-saffron-cta px-6 py-3.5 text-[13px] font-extrabold uppercase tracking-[0.06em] text-white transition-colors hover:brightness-95"
          >
            <Users size={15} strokeWidth={2} />
            Join As Partner
            <ArrowRight size={15} strokeWidth={2.2} />
          </Link>
        </div>
      </div>

      {/* Bottom green strip — pinned to bottom of the viewport-height section */}
      <div className="bg-mission-deep text-white">
        <ul className="mx-auto grid max-w-7xl grid-cols-2 gap-x-5 gap-y-3 px-6 py-4 md:grid-cols-5 lg:px-10">
          {BOTTOM_STRIP.map((item) => (
            <li key={item.label} className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center text-mission-soft">
                {item.emblem}
              </span>
              <span className="leading-tight">
                <span className="block text-[11.5px] font-extrabold uppercase tracking-wide text-white">
                  {item.label}
                </span>
                <span className="block text-[10.5px] text-white/75">
                  {item.sub}
                </span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ── Placeholder for the hero background when no image is provided ─────── */
function HeroPlaceholder() {
  return (
    <div className="h-full w-full bg-[linear-gradient(135deg,#fbe7cb_0%,#f5efe0_30%,#e9f2ed_70%,#bcd3c3_100%)]">
      <div className="flex h-full items-center justify-center">
        <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-mission/60">
          Hero Photograph &middot; hero-background.jpg
        </p>
      </div>
    </div>
  );
}

/* ── Trust bar emblems (tiny inline SVGs) ─────────────────────────────── */
function IITRoparEmblem() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="16" cy="16" r="6" fill="currentColor" />
      <g stroke="#ffffff" strokeWidth="0.8">
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const x1 = 16 + Math.cos(a) * 2;
          const y1 = 16 + Math.sin(a) * 2;
          const x2 = 16 + Math.cos(a) * 6;
          const y2 = 16 + Math.sin(a) * 6;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
    </svg>
  );
}

function ClimateGoalEmblem() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.6" />
      <ellipse cx="16" cy="16" rx="11" ry="5" stroke="currentColor" strokeWidth="1.2" />
      <line x1="5" y1="16" x2="27" y2="16" stroke="currentColor" strokeWidth="1.2" />
      <line x1="16" y1="5" x2="16" y2="27" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

function H2Emblem() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <rect x="9" y="6" width="14" height="22" rx="3" stroke="currentColor" strokeWidth="1.6" />
      <text x="16" y="20" textAnchor="middle" fontSize="9" fontWeight="800" fill="currentColor" fontFamily="Montserrat, system-ui">
        H₂
      </text>
      <line x1="11" y1="28" x2="11" y2="31" stroke="currentColor" strokeWidth="1.4" />
      <line x1="21" y1="28" x2="21" y2="31" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CircularEmblem() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <path
        d="M22 12 a 9 9 0 1 0 3 7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M19 8 l 4 4 l -4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M10 20 a 9 9 0 1 0 -3 -7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M13 24 l -4 -4 l 4 -4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LionEmblem() {
  return (
    <svg viewBox="0 0 32 32" fill="none">
      <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
      <path
        d="M9 21 c 2 -6 5 -8 7 -8 s 5 2 7 8 M12 16 q 4 -2 8 0 M14 13 q 2 -1 4 0"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* ── Bottom strip emblems ─────────────────────────────────────────────── */
function IndiaMapMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2 c -2 0 -4 2 -5 4 c -2 3 -3 7 -4 10 c 0 2 1 3 2 3 c 1 0 2 2 3 4 c 1 1 2 1 2 -1 c 1 -3 3 -5 5 -7 c 2 -2 3 -4 3 -7 c 0 -3 -3 -6 -6 -6 Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}

function CO2Mini() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M6 16 a 4 4 0 1 1 1 -7 a 5 5 0 0 1 10 1 a 3 3 0 0 1 -1 6 Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <text x="12" y="15" textAnchor="middle" fontSize="6" fontWeight="800" fill="currentColor" fontFamily="Montserrat">
        CO₂
      </text>
    </svg>
  );
}

function FarmerMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <ellipse cx="12" cy="5" rx="4.5" ry="1.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 22 c 0 -5 3 -8 6 -8 s 6 3 6 8" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function ChartMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4 19 V 5 H 20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M7 17 l 4 -5 l 3 3 l 6 -8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M18 7 l 2 0 l 0 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function RupeeMini() {
  return (
    <svg viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.6" />
      <path
        d="M8 8 H 16 M8 11 H 16 M9 14 H 12 c 1.5 0 3 -1 3 -3 M9 14 l 5 5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
