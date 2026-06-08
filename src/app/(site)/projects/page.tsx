import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ImageIcon, MapPin } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { ContactCtaButton } from "@/components/custom/contact/ContactCtaButton";
import { type ImageKey } from "@/lib/images";

export const metadata: Metadata = {
  title: "All National Projects",
  description:
    "Pioneering indigenous solutions across energy, industry and environment for a self-reliant India — Carbon Mandi's national projects.",
  alternates: { canonical: "/projects" },
};

/* ── Content ──────────────────────────────────────────────────────────────
   Project data mirrors the reference design. Org logos are provided later;
   for now each renders a named placeholder. Project photos use PhotoSlot. */

type Project = {
  no: string;
  brand: string;
  /** Brand / led-by logo under /public (SVG). */
  logo: string;
  /** Tailwind text-color class for the brand name (approximates the logo). */
  brandColor: string;
  title: string;
  description: string;
  location: string;
  ledBy: string;
  /** Strategic partners. `logo` is a path under /public when supplied. */
  partners: { name: string; logo?: string }[];
  image: ImageKey;
  href: string;
};

const PROJECTS: Project[] = [
  {
    no: "01",
    brand: "Carbon Mandi",
    logo: "/images/national-projects/logos/carbon-mandi.svg",
    brandColor: "text-mission",
    title: "India's First Hemp & Napier Biomass Based Green Hydrogen Fuel.",
    description:
      "Developing India's next generation clean fuel from hemp and napier biomass.",
    location: "Punjab, India",
    ledBy: "Carbon Mandi",
    partners: [
      {
        name: "IIT Ropar",
        logo: "/images/national-projects/logos/iit-ropar.svg",
      },
    ],
    image: "projectGreenH2",
    href: "/",
  },
  {
    no: "02",
    brand: "AIG",
    logo: "/images/national-projects/logos/aig.svg",
    brandColor: "text-blue-600",
    title: "India's First Zero Water Plasma Textile Processing.",
    description:
      "Revolutionizing textile manufacturing with plasma technology that eliminates water from processing.",
    location: "Pan India",
    ledBy: "AIG",
    partners: [
      { name: "Textile Research Association" },
      { name: "Thapar Institute of Engineering & Technology" },
    ],
    image: "projectPlasmaTextile",
    href: "#",
  },
  {
    no: "03",
    brand: "Right to Climate",
    logo: "/images/national-projects/logos/right-to-climate.svg",
    brandColor: "text-mission",
    title: "India's First NGO Working on Green Hydrogen Fuel.",
    description:
      "Driving awareness, policy support and adoption of green hydrogen for a cleaner, equitable future.",
    location: "Pan India",
    ledBy: "Right to Climate",
    partners: [{ name: "Vimla Art Forum" }, { name: "Indian Bravehearts" }],
    image: "projectRightToClimate",
    href: "#",
  },
  {
    no: "04",
    brand: "Q-LUB",
    logo: "/images/national-projects/logos/qlub.svg",
    brandColor: "text-mission-dark",
    title: "Plant Based Lubricants for High Performance of Vehicles.",
    description:
      "Engineered from plants. Built for performance. Cleaner mobility for a sustainable tomorrow.",
    location: "Pan India",
    ledBy: "Q-LUB",
    partners: [
      { name: "The Automotive Research Association (ARAI)" },
      { name: "Society of Indian Automobile Manufacturers (SIAM)" },
    ],
    image: "projectQLub",
    href: "#",
  },
  {
    no: "05",
    brand: "AquaWelder",
    logo: "/images/national-projects/logos/aquawelder.svg",
    brandColor: "text-sky-600",
    title: "On Demand Hydrogen Generation and Storage for Steel Industries.",
    description:
      "Reliable on-site hydrogen solutions enabling cleaner steel production and energy independence.",
    location: "Pan India",
    ledBy: "AquaWelder",
    partners: [{ name: "SAIL" }, { name: "TATA STEEL" }],
    image: "projectAquaWelder",
    href: "#",
  },
];

/* ── Page ─────────────────────────────────────────────────────────────── */

export default function ProjectsPage() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-paper">
        {/* Mobile — full-bleed hero image as a background, softened with a white
            wash so the heading + paragraph stay readable on top. */}
        <div className="absolute inset-0 -z-10 lg:hidden">
          <PhotoSlot
            slot="projectsHero"
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
            slot="projectsHero"
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
              <p className="text-[13px] font-semibold uppercase tracking-[0.2em] text-mission">
                National Initiatives
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold uppercase leading-[0.98] tracking-tight text-mission">
                All National
                <br />
                Projects
              </h1>
              <span aria-hidden className="mt-6 block h-px w-16 bg-line" />
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Pioneering indigenous solutions across energy, industry and
                environment for a self-reliant India.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROJECT ROWS ──────────────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <ul className="space-y-8">
            {PROJECTS.map((p) => (
              <li key={p.no}>
                <ProjectRow project={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

/* ── Row ──────────────────────────────────────────────────────────────── */

const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-md bg-mission px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-mission-dark";

function ProjectRow({ project: p }: { project: Project }) {
  // Project 01 (Carbon Mandi) is treated differently: it keeps its Strategic
  // Partners, uses a compact emblem logo, and links Know More to the home page.
  const isFirst = p.no === "01";

  return (
    <article className="grid overflow-hidden rounded-2xl bg-paper ring-1 ring-line lg:grid-cols-[120px_minmax(0,1fr)_minmax(0,1.05fr)]">
      {/* Number panel */}
      <div className="order-1 flex items-center justify-between bg-mission px-6 py-4 text-white lg:flex-col lg:items-start lg:justify-start lg:py-8">
        <span className="font-display text-4xl font-extrabold leading-none lg:text-5xl">
          {p.no}
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/80 lg:mt-3">
          National
          <br className="hidden lg:block" /> Project
        </span>
        <span
          aria-hidden
          className="hidden h-px w-8 bg-white/40 lg:mt-4 lg:block"
        />
      </div>

      {/* Content panel */}
      <div className="order-3 flex flex-col p-6 lg:order-2 lg:p-8">
        {/* Brand */}
        <div className="flex items-center">
          <BrandLogo
            src={p.logo}
            alt={p.brand}
            className={isFirst ? "max-h-11 max-w-44" : "max-h-16 max-w-56"}
          />
        </div>

        {/* Title */}
        <h2 className="mt-3 font-display text-xl font-bold leading-snug tracking-tight text-ink lg:text-2xl">
          {p.title}
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
          {p.description}
        </p>

        {/* Meta */}
        <div className="mt-6 flex flex-wrap gap-x-10 gap-y-5">
          <Meta label="Location">
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-ink">
              <MapPin size={15} className="text-mission" strokeWidth={2} />
              {p.location}
            </span>
          </Meta>

          <Meta label="Led By">
            <BrandLogo src={p.logo} alt={p.ledBy} className="max-h-7 max-w-30" />
          </Meta>

          {isFirst && (
            <Meta
              label={
                p.partners.length > 1
                  ? "Strategic Partners"
                  : "Strategic Partner"
              }
            >
              <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                {p.partners.map((partner) => (
                  <li
                    key={partner.name}
                    className="flex items-center gap-2 text-[13px] font-medium text-ink"
                  >
                    {partner.logo ? (
                      <BrandLogo
                        src={partner.logo}
                        alt={partner.name}
                        className="max-h-6 max-w-20"
                      />
                    ) : (
                      <LogoPlaceholder size="xs" label={partner.name} />
                    )}
                    {partner.name}
                  </li>
                ))}
              </ul>
            </Meta>
          )}
        </div>

        {/* CTA — project 01 goes home; the rest open the contact form. */}
        <div className="mt-auto pt-7">
          {isFirst ? (
            <Link href={p.href} className={CTA_CLASS}>
              Know More
              <ArrowRight size={15} strokeWidth={2.2} />
            </Link>
          ) : (
            <ContactCtaButton
              source={`National Project — ${p.brand}`}
              className={CTA_CLASS}
            >
              Know More
              <ArrowRight size={15} strokeWidth={2.2} />
            </ContactCtaButton>
          )}
        </div>
      </div>

      {/* Image panel */}
      <div className="relative order-2 min-h-56 lg:order-3 lg:min-h-full">
        <PhotoSlot
          slot={p.image}
          fill
          className="rounded-none ring-0"
          imgClassName="object-cover"
        />
      </div>
    </article>
  );
}

/* ── Bits ─────────────────────────────────────────────────────────────── */

function Meta({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">
        {label}
      </p>
      {children}
    </div>
  );
}

/** A real brand / led-by logo (SVG). Plain <img> — next/image won't optimise
    SVG without `dangerouslyAllowSVG`, and there's no benefit here. */
function BrandLogo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={`${alt} logo`}
      loading="lazy"
      className={`w-auto object-contain ${className}`}
    />
  );
}

/**
 * Square placeholder for an organisation logo (real logos arrive later).
 * `label` is used for accessibility so the slot still announces what it is.
 */
function LogoPlaceholder({
  size,
  label,
}: {
  size: "xs" | "sm";
  label: string;
}) {
  const dim = size === "sm" ? "h-7 w-7" : "h-6 w-6";
  return (
    <span
      role="img"
      aria-label={`${label} logo`}
      title={`${label} logo`}
      className={`flex shrink-0 items-center justify-center rounded-md bg-card ring-1 ring-line ${dim}`}
    >
      <ImageIcon
        size={size === "sm" ? 14 : 12}
        strokeWidth={1.6}
        className="text-mission/40"
      />
    </span>
  );
}
