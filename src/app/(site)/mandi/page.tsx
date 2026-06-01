import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Flame, Leaf, Phone } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import type { ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "Mandi — India's Biomass Aggregation Platform",
  description:
    "Carbon Mandi connects 15,000+ farmers across India — aggregating biomass feedstock and turning it into green hydrogen, CBG, carbon credits and sustainable partner products.",
};

/* ── Section data ─────────────────────────────────────────────────────── */

const BIOMASS: { title: string; slot: ImageKey; body: string }[] = [
  {
    title: "Napier Grass",
    slot: "mandiBiomassNapier",
    body: "High-yield energy crop ideal for green fuel production.",
  },
  {
    title: "Hemp Stalks",
    slot: "mandiBiomassHemp",
    body: "Strong, sustainable biomass ideal for industrial & energy use.",
  },
  {
    title: "Paddy Straw",
    slot: "mandiBiomassPaddy",
    body: "Abundant agri-residue perfect for clean energy conversion.",
  },
  {
    title: "Wheat Straw",
    slot: "mandiBiomassWheat",
    body: "Widely available biomass with high energy potential.",
  },
  {
    title: "Agri Residue",
    slot: "mandiBiomassAgri",
    body: "Mixed agri-residue sourced responsibly for a greener planet.",
  },
];

const PRODUCTS: {
  title: string;
  slot: ImageKey;
  body: string;
  icon: React.ReactNode;
}[] = [
  {
    title: "Green Hydrogen",
    slot: "mandiProductHydrogen",
    body: "Clean fuel for industry, mobility and a greener tomorrow.",
    icon: <H2Glyph />,
  },
  {
    title: "CBG",
    slot: "mandiProductCBG",
    body: "Renewable gas for a sustainable and self-reliant India.",
    icon: <Flame size={18} strokeWidth={2} />,
  },
  {
    title: "Carbon Credits",
    slot: "mandiProductCarbonCredits",
    body: "Enabling climate action and creating value for a better planet.",
    icon: <Leaf size={18} strokeWidth={2} />,
  },
];

const PARTNERS: { title: string; slot: ImageKey; body: string }[] = [
  {
    title: "Organic Potting Mix",
    slot: "mandiPartnerPottingMix",
    body: "Nutrient-rich soil mix for healthy plant growth.",
  },
  {
    title: "Plant Based Lubricants",
    slot: "mandiPartnerLubricants",
    body: "High performance, eco-friendly lubricants for all applications.",
  },
  {
    title: "Jute Products",
    slot: "mandiPartnerJute",
    body: "Sustainable, biodegradable and responsibly crafted.",
  },
  {
    title: "Hemp Fabric",
    slot: "mandiPartnerHempFabric",
    body: "Strong, durable and naturally sustainable.",
  },
  {
    title: "Natural Cleaners",
    slot: "mandiPartnerCleaners",
    body: "Tough on dirt, gentle on you and the planet.",
  },
  {
    title: "Coir Products",
    slot: "mandiPartnerCoir",
    body: "Eco-friendly solutions for a greener tomorrow.",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function MandiPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-paper">
        {/* Mobile — full-bleed hero image as a background, softened with a white
            wash so the heading + paragraph stay readable on top. */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <PhotoSlot
            slot="mandiHero"
            fill
            priority
            className="rounded-none ring-0"
            imgClassName="object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-white/72" />
        </div>

        {/* Right-half hero image — bleeds to the right viewport edge on desktop,
            fading into the white panel that holds the heading. */}
        <div className="absolute inset-y-0 right-0 -z-10 hidden w-[54%] lg:block">
          <PhotoSlot
            slot="mandiHero"
            fill
            priority
            className="rounded-none ring-0"
            imgClassName="object-cover object-left"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,white_0%,rgba(255,255,255,0.6)_14%,rgba(255,255,255,0)_38%)]"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid min-h-96 grid-cols-1 items-center gap-8 lg:min-h-[clamp(26rem,42vw,34rem)] lg:grid-cols-2">
            <div className="py-12 lg:py-20">
              <h1 className="font-display text-[clamp(2.3rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight text-mission">
                India&rsquo;s Biomass
                <br />
                Aggregation Platform
              </h1>
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft md:text-base">
                Connecting 15,000+ farmers across India to power a cleaner,
                self-reliant and sustainable future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── EXPLORE BIOMASS ───────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <SectionTitle>Explore Biomass</SectionTitle>

          <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {BIOMASS.map((b) => (
              <li
                key={b.title}
                className="flex flex-col rounded-2xl bg-white p-3.5 shadow-[0_18px_50px_-32px_rgba(13,92,61,0.45)] ring-1 ring-line"
              >
                <PhotoSlot
                  slot={b.slot}
                  aspectRatio="4/3"
                  className="rounded-xl"
                  imgClassName="object-cover"
                />
                <h3 className="mt-4 text-[16px] font-bold text-ink">{b.title}</h3>
                <p className="mt-2 flex-1 text-[13px] leading-relaxed text-ink-soft">
                  {b.body}
                </p>
                <EnquireButton />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── OUR FINAL PRODUCTS ────────────────────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <SectionTitle>Our Final Products</SectionTitle>

          <ul className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
            {PRODUCTS.map((p) => (
              <li
                key={p.title}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_18px_50px_-32px_rgba(13,92,61,0.45)] ring-1 ring-line"
              >
                <PhotoSlot
                  slot={p.slot}
                  aspectRatio="16/9"
                  className="rounded-none ring-0"
                  imgClassName="object-cover"
                />
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mission text-white">
                      {p.icon}
                    </span>
                    <h3 className="text-[18px] font-bold text-ink">{p.title}</h3>
                  </div>
                  <p className="mt-3 flex-1 text-[13.5px] leading-relaxed text-ink-soft">
                    {p.body}
                  </p>
                  <EnquireButton />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── SUSTAINABLE PRODUCTS FROM OUR PARTNERS ────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <SectionTitle>Sustainable Products From Our Partners</SectionTitle>

          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {PARTNERS.map((p) => (
              <li
                key={p.title}
                className="flex flex-col rounded-2xl bg-white p-3 shadow-[0_18px_50px_-32px_rgba(13,92,61,0.45)] ring-1 ring-line"
              >
                <PhotoSlot
                  slot={p.slot}
                  aspectRatio="1/1"
                  className="rounded-xl"
                  imgClassName="object-cover"
                />
                <h3 className="mt-3 text-[13.5px] font-bold leading-tight text-ink">
                  {p.title}
                </h3>
                <p className="mt-1.5 flex-1 text-[11.5px] leading-snug text-ink-soft">
                  {p.body}
                </p>
                <EnquireButton compact />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── CTA BAND ──────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-mission-deep text-white">
        {/* Left sapling image — bleeds to the left viewport edge on desktop. */}
        <div className="absolute inset-y-0 left-0 -z-10 hidden w-[26%] lg:block">
          <PhotoSlot
            slot="mandiCtaSapling"
            fill
            className="rounded-none ring-0"
            imgClassName="object-cover"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_left,#0a3a26_0%,rgba(10,58,38,0.5)_30%,transparent_70%)]"
          />
        </div>
        {/* Faint leaf line-art on the right */}
        <Leaf
          aria-hidden
          size={220}
          strokeWidth={1}
          className="pointer-events-none absolute -right-10 top-1/2 -z-10 hidden -translate-y-1/2 text-white/5 lg:block"
        />

        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="grid grid-cols-1 items-center gap-6 py-10 lg:grid-cols-[26%_1fr] lg:gap-10">
            {/* Mobile sapling image */}
            <div className="lg:hidden">
              <PhotoSlot
                slot="mandiCtaSapling"
                aspectRatio="16/9"
                className="rounded-xl ring-0"
                imgClassName="object-cover"
              />
            </div>

            <div className="lg:col-start-2">
              <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-white">
                Be a Part of India&rsquo;s Green Energy Revolution
              </h2>
              <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/80">
                Let&rsquo;s build a self-reliant, sustainable and prosperous
                India together.
              </p>
              <Link
                href="/contact"
                className="mt-5 inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-[13.5px] font-bold text-mission-deep transition-colors hover:bg-white/90"
              >
                Partner With Us
                <ArrowRight size={16} strokeWidth={2.2} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Local components ─────────────────────────────────────────────────── */

/** Centered section heading: ── 🌿 TITLE ── */
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-center gap-4">
      <span aria-hidden className="hidden h-px w-12 bg-line sm:block lg:w-20" />
      <span className="flex items-center gap-2.5">
        <Leaf size={20} strokeWidth={1.8} className="shrink-0 text-mission" />
        <h2 className="font-display text-center text-[clamp(1.25rem,2.4vw,1.9rem)] font-extrabold uppercase tracking-tight text-ink">
          {children}
        </h2>
      </span>
      <span aria-hidden className="hidden h-px w-12 bg-line sm:block lg:w-20" />
    </div>
  );
}

/** Outlined "Call to Enquire Now" button used on every card. */
function EnquireButton({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/contact"
      className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-line font-semibold text-ink transition-colors hover:border-mission hover:text-mission ${
        compact ? "px-3 py-2 text-[11px]" : "px-4 py-2.5 text-[12.5px]"
      }`}
    >
      <Phone size={compact ? 12 : 14} strokeWidth={2} />
      Call to Enquire Now
    </Link>
  );
}

/** H₂ glyph for the Green Hydrogen product icon. */
function H2Glyph() {
  return <span className="text-[13px] font-extrabold leading-none">H₂</span>;
}
