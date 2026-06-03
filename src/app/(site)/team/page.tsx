import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { ContactCtaButton } from "@/components/custom/contact/ContactCtaButton";
import { sanityFetch, urlFor, teamQuery, partnersQuery } from "@/lib/sanity";

export const metadata: Metadata = {
  title: "Global Team — Carbon Mandi",
  description:
    "Meet the partners, institutions and global leaders driving Carbon Mandi's circular bioeconomy — and the ground experts behind its mission and execution.",
};

const GLOBAL_GROUP = "Global Climate Experts";
const EXEC_GROUP = "Carbon Mandi Executive Team";

/** Country code → flag emoji (matches the options in the teamMember schema). */
const FLAGS: Record<string, string> = {
  IN: "🇮🇳",
  DE: "🇩🇪",
  ZA: "🇿🇦",
  GB: "🇬🇧",
  US: "🇺🇸",
  FR: "🇫🇷",
  NL: "🇳🇱",
  AE: "🇦🇪",
  SG: "🇸🇬",
  AU: "🇦🇺",
};

/* ── Sanity result shapes ─────────────────────────────────────────────── */

// `photo`/`logo` are raw Sanity image objects; `urlFor` accepts them directly.
type SanityImage = { asset?: { _ref?: string } } | null;

type Member = {
  _id: string;
  name: string;
  role?: string;
  group?: string;
  country?: string;
  bio?: string;
  linkedin?: string;
  photo?: SanityImage;
};

type Partner = {
  _id: string;
  name: string;
  url?: string;
  logo?: SanityImage;
};

/* ── Page ─────────────────────────────────────────────────────────────── */

export default async function TeamPage() {
  const [members, partners] = await Promise.all([
    sanityFetch<Member[]>(teamQuery),
    sanityFetch<Partner[]>(partnersQuery),
  ]);

  const global = members.filter((m) => m.group === GLOBAL_GROUP);
  const exec = members.filter((m) => m.group === EXEC_GROUP);

  return (
    <>
      {/* ── OUR PARTNERS · GLOBAL ECOSYSTEM ───────────────────────────── */}
      <section className="bg-paper">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-20">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_1.4fr] lg:gap-16">
            {/* Left — eyebrow, heading, copy */}
            <div>
              <p className="text-[13px] font-semibold uppercase tracking-[0.18em] text-mission">
                Our Partners
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.2rem,4.4vw,3.4rem)] font-extrabold uppercase leading-[1.04] tracking-tight text-mission">
                Global
                <br />
                Ecosystem
              </h1>
              <span aria-hidden className="mt-6 block h-px w-16 bg-line" />
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Carbon Mandi is built on a strong global ecosystem of partners,
                institutions, and experts who share our vision for a sustainable
                and prosperous future.
              </p>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-soft">
                Together, we&rsquo;re driving the circular bioeconomy and
                creating a positive impact for people and the planet.
              </p>
            </div>

            {/* Right — partner logo grid. A gap-px grid over a line-colored
                background renders clean hairline dividers at any column count. */}
            <ul className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-line ring-1 ring-line sm:grid-cols-3">
              {partners.map((p) => (
                <li
                  key={p._id}
                  className="flex items-center justify-center bg-paper p-5 sm:p-6"
                >
                  <PartnerLogo partner={p} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── GLOBAL CLIMATE EXPERTS ────────────────────────────────────── */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
          <SectionHeading>Global Climate Experts</SectionHeading>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
            Global leaders in hydrogen, mobility and the circular economy
            steering Carbon Mandi&rsquo;s technical direction and world-class
            standards.
          </p>

          <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {global.map((m) => (
              <MemberCard key={m._id} member={m} />
            ))}
          </ul>
        </div>
      </section>

      {/* ── CARBON MANDI EXECUTIVE TEAM ───────────────────────────────── */}
      {exec.length > 0 && (
        <section className="bg-paper">
          <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10 lg:py-16">
            <SectionHeading>Carbon Mandi Executive Team</SectionHeading>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
              The driving force behind Carbon Mandi&rsquo;s mission and
              day-to-day execution.
            </p>

            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {exec.map((m) => (
                <MemberCard key={m._id} member={m} />
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* ── CTA BAND ──────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-mission-deep text-white">
        {/* Left plant image — bleeds to the left viewport edge on desktop. */}
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
            {/* Mobile plant image */}
            <div className="lg:hidden">
              <PhotoSlot
                slot="mandiCtaSapling"
                aspectRatio="16/9"
                className="rounded-xl ring-0"
                imgClassName="object-cover"
              />
            </div>

            <div className="lg:col-start-2 lg:flex lg:items-center lg:justify-between lg:gap-8">
              <div>
                <h2 className="font-display text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold leading-tight tracking-tight text-white">
                  Building a Sustainable Future Together
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-white/80">
                  Partner with us to accelerate the transition to a clean,
                  circular, and inclusive bioeconomy.
                </p>
              </div>
              <ContactCtaButton
                source="Partner With Us"
                className="mt-5 inline-flex shrink-0 items-center justify-center gap-2 rounded-md bg-white px-6 py-3 text-[13.5px] font-bold text-mission-deep transition-colors hover:bg-white/90 lg:mt-0"
              >
                Partner With Us
                <ArrowRight size={16} strokeWidth={2.2} />
              </ContactCtaButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ── Local components ─────────────────────────────────────────────────── */

/**
 * Left-aligned section heading with a two-segment underline accent.
 * `subtle` renders the heading in mission green (used for the ground team).
 */
function SectionHeading({
  children,
  subtle = false,
}: {
  children: React.ReactNode;
  subtle?: boolean;
}) {
  return (
    <div>
      <h2
        className={`font-display text-[clamp(1.25rem,2.4vw,1.9rem)] font-extrabold uppercase tracking-tight ${
          subtle ? "text-mission" : "text-ink"
        }`}
      >
        {children}
      </h2>
      <div aria-hidden className="mt-3 flex items-center gap-2">
        <span className="h-[3px] w-14 rounded-full bg-mission" />
        <span className="h-[3px] w-8 rounded-full bg-mission/40" />
      </div>
    </div>
  );
}

/** Inline LinkedIn glyph (lucide build here has no Linkedin export). */
function LinkedInGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm6 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95C20.4 8.75 22 10.6 22 14v7h-4v-6.2c0-1.48-.03-3.38-2.06-3.38-2.06 0-2.38 1.6-2.38 3.27V21H9V9Z" />
    </svg>
  );
}

/** Initials fallback shown before a real headshot is uploaded. */
function initials(name: string) {
  return name
    .split(/\s+/)
    .filter((w) => /[A-Za-z]/.test(w))
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

/** Member portrait — Sanity image if uploaded, else an initials placeholder. */
function MemberPhoto({ member }: { member: Member }) {
  if (member.photo?.asset) {
    const src = urlFor(member.photo)
      .width(480)
      .height(600)
      .fit("crop")
      .auto("format")
      .url();
    return (
      <Image
        src={src}
        alt={member.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
        className="object-cover"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-mission-soft">
      <span className="font-display text-3xl font-extrabold text-mission/70">
        {initials(member.name)}
      </span>
    </div>
  );
}

/** White team card: portrait, name, green role, bio and a LinkedIn chip. */
function MemberCard({ member }: { member: Member }) {
  const flag = member.country ? FLAGS[member.country] : undefined;

  return (
    <li className="group relative flex flex-col rounded-2xl bg-white p-3 shadow-[0_18px_50px_-32px_rgba(13,92,61,0.45)] ring-1 ring-line transition-shadow duration-300 hover:shadow-[0_24px_60px_-30px_rgba(13,92,61,0.55)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-line">
        <MemberPhoto member={member} />
        {flag && (
          <span
            className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-base leading-none shadow-sm ring-1 ring-line"
            aria-hidden
          >
            {flag}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col px-1.5 pb-1 pt-4">
        <h3 className="text-[16px] font-bold text-ink">{member.name}</h3>
        {member.role && (
          <p className="mt-1 text-[12.5px] font-bold text-mission">
            {member.role}
          </p>
        )}
        {/* Touch devices can't hover, so show the bio inline for them. */}
        {member.bio && (
          <p className="mt-2.5 hidden text-[13px] leading-relaxed text-ink-soft [@media(hover:none)]:block">
            {member.bio}
          </p>
        )}
        {member.linkedin && (
          <Link
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name} on LinkedIn`}
            className="mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mission text-white transition-colors hover:bg-mission-dark"
          >
            <LinkedInGlyph className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>

      {/* On hover the card "pops": an expanded copy fades + scales in over the
          compact card — the SAME photo stays visible, and the card now extends
          to reveal the full role and bio. Auto-height so nothing is ever
          clipped; absolutely positioned and elevated so neighbours don't move.
          Hidden on touch devices, which read the inline bio above instead. */}
      {member.bio && (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-40 flex origin-top scale-95 flex-col rounded-2xl bg-white p-3 opacity-0 shadow-[0_34px_80px_-24px_rgba(13,92,61,0.6)] ring-1 ring-line transition-all duration-200 ease-out group-hover:scale-100 group-hover:opacity-100 [@media(hover:none)]:hidden">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl ring-1 ring-line">
            <MemberPhoto member={member} />
            {flag && (
              <span
                className="absolute left-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-base leading-none shadow-sm ring-1 ring-line"
                aria-hidden
              >
                {flag}
              </span>
            )}
          </div>
          <div className="flex flex-col px-1.5 pb-1 pt-4">
            <h3 className="text-[16px] font-bold text-ink">{member.name}</h3>
            {member.role && (
              <p className="mt-1 text-[12.5px] font-bold text-mission">
                {member.role}
              </p>
            )}
            <p className="mt-2.5 text-[13px] leading-relaxed text-ink-soft">
              {member.bio}
            </p>
            {member.linkedin && (
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on LinkedIn`}
                className="pointer-events-auto mt-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-mission text-white transition-colors hover:bg-mission-dark"
              >
                <LinkedInGlyph className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </div>
      )}
    </li>
  );
}

/** Partner logo cell — Sanity logo if uploaded, else the partner name. */
function PartnerLogo({ partner }: { partner: Partner }) {
  const inner = partner.logo?.asset ? (
    <Image
      src={urlFor(partner.logo).width(300).fit("max").auto("format").url()}
      alt={partner.name}
      width={150}
      height={50}
      className="h-auto max-h-12 w-auto object-contain"
    />
  ) : (
    <span className="text-center text-[12.5px] font-semibold leading-tight text-ink-soft">
      {partner.name}
    </span>
  );

  return partner.url ? (
    <Link
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex w-full items-center justify-center"
    >
      {inner}
    </Link>
  ) : (
    inner
  );
}
