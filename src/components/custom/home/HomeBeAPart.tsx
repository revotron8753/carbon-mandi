import {
  Atom,
  HandshakeIcon as Handshake,
  Quote,
  Users,
} from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";

const INVITES = [
  {
    label: "LEADERS &\nPOLICY MAKERS",
    slot: "invitePolicyMakers" as const,
    bullets: [
      "Shape policies for a clean energy future",
      "Drive India's energy independence",
      "Empower rural India",
    ],
    Icon: Users,
  },
  {
    label: "INVESTORS &\nFUNDERS",
    slot: "inviteInvestors" as const,
    bullets: [
      "High impact. Scalable model. Attractive returns.",
      "Be part of a $26B+ green hydrogen opportunity",
      "Invest in a sustainable future",
    ],
    Icon: Handshake,
  },
  {
    label: "RESEARCHERS &\nACADEMIA",
    slot: "inviteResearchers" as const,
    bullets: [
      "Advance green hydrogen technology",
      "Collaborate on real-world solutions",
      "Drive innovation at scale",
    ],
    Icon: Atom,
  },
  {
    label: "INDUSTRY &\nINNOVATORS",
    slot: "inviteInnovators" as const,
    bullets: [
      "Collaborate for real impact",
      "Build next-gen solutions",
      "Create long-term value together",
    ],
    Icon: Users,
  },
];

export function HomeBeAPart() {
  return (
    <section className="relative isolate overflow-hidden bg-paper">
      {/* ── Background image layer (integrated later) + left white wash ─────
          Mirrors the Who-Benefits approach: a full-bleed PhotoSlot sits behind
          everything, washed solid-white over the left content column and fading
          to clear so the right-hand scene (turbine, H₂ plant, flag, field)
          reads through behind the quote + Join-the-Movement band. */}
      <div className="absolute inset-0 -z-10">
        <PhotoSlot
          slot="beAPartHero"
          fill
          className="rounded-none ring-0"
          imgClassName="object-cover object-[50%_35%]"
        />
        {/* Desktop: left→right white wash (content left, scene right). */}
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block lg:bg-[linear-gradient(to_right,white_0%,white_38%,rgba(255,255,255,0.72)_44%,rgba(255,255,255,0.28)_52%,rgba(255,255,255,0.08)_60%,transparent_66%)]"
        />
        {/* Mobile: full light wash so text reads over the whole scene. */}
        <div aria-hidden className="absolute inset-0 bg-white/70 lg:hidden" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.42fr_1fr] lg:gap-10">
          {/* ── LEFT — heading + invitation cards ──────────────────────── */}
          <div className="flex flex-col">
            <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-tight">
              <span className="block text-[clamp(1.5rem,2.6vw,2.05rem)] text-ink">
                Be A Part Of
              </span>
              <span className="block text-[clamp(2rem,4vw,3rem)] text-mission">
                India&rsquo;s Green Hydrogen
              </span>
              <span className="block text-[clamp(2rem,4vw,3rem)] text-mission">
                Revolution
              </span>
            </h2>
            <span aria-hidden className="mt-3 block h-[3px] w-12 rounded-full bg-mission" />

            <p className="mt-4 max-w-xl text-[13.5px] leading-relaxed text-ink-soft">
              Together, we can build a clean, self-reliant, and future-ready
              India powered by farmers, driven by innovation, and inspired by
              sustainability.
            </p>

            <p className="mt-7 text-center text-[13px] font-extrabold uppercase tracking-[0.16em] text-mission">
              We Invite Visionaries &amp; Change Makers
            </p>

            {/* 4 invitation cards in a single row */}
            <ul className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {INVITES.map((inv) => (
                <li
                  key={inv.label}
                  className="flex flex-col rounded-xl border border-line bg-white p-2.5 shadow-sm"
                >
                  <div className="flex items-start gap-2">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-mission text-white">
                      <inv.Icon size={15} strokeWidth={1.8} />
                    </span>
                    <p className="whitespace-pre-line text-[10px] font-extrabold uppercase leading-tight text-ink">
                      {inv.label}
                    </p>
                  </div>

                  <PhotoSlot
                    slot={inv.slot}
                    aspectRatio="3/2"
                    className="mt-2.5 rounded-lg ring-1 ring-line"
                  />

                  <ul className="mt-2.5 space-y-1.5">
                    {inv.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-1.5 text-[10.5px] leading-snug text-ink-soft"
                      >
                        <span
                          aria-hidden
                          className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-mission"
                        />
                        {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          {/* ── RIGHT — quote (top) + Join band (bottom) over the scene ──── */}
          <div className="relative flex flex-col">
            {/* Quote — sits over the lighter sky portion of the backdrop */}
            <div className="pt-1">
              <Quote size={30} strokeWidth={1.5} className="text-mission/70" />
              <p className="font-display mt-2 text-[clamp(1.3rem,2vw,1.75rem)] font-extrabold leading-[1.18] tracking-tight text-mission">
                A Greener India.
                <br />
                A Stronger India.
                <br />
                A Self-Reliant India.&rdquo;
              </p>
              <p className="mt-3 text-[14px] font-semibold text-ink">
                Let&rsquo;s Build It. Together.
              </p>
            </div>

            {/* Join the Movement band — pinned to the bottom of the column so it
                lines up with the card row; bleeds to the right extreme. */}
            <div className="mt-auto -mr-6 flex items-center gap-4 bg-mission px-5 py-4 text-white lg:-mr-10 lg:px-7 lg:py-5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white ring-1 ring-white/40">
                <Users size={18} strokeWidth={1.8} />
              </span>
              <p className="font-display flex-1 text-[clamp(0.8rem,1vw,0.95rem)] font-extrabold uppercase leading-snug tracking-wide">
                Join The Movement.
                <br />
                Be A Partner. Be A Champion.
                <br />
                Be The Change India Needs.
              </p>
              <span aria-hidden className="h-14 w-px shrink-0 bg-white/30" />
              <div className="flex shrink-0 flex-col items-center">
                <QRPlaceholder />
                <p className="mt-2 text-[10px] font-medium uppercase tracking-wide text-white/85">
                  Scan to Connect
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Placeholder QR code visual — replace with a real generated QR (linking to /contact)
 * during the asset pass.
 */
function QRPlaceholder() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-20 w-20 rounded-md bg-white p-2 text-mission"
      role="img"
      aria-label="QR code placeholder"
    >
      {/* Corner brackets */}
      <rect x="4" y="4" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="10" y="10" width="10" height="10" fill="currentColor" />
      <rect x="74" y="4" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="80" y="10" width="10" height="10" fill="currentColor" />
      <rect x="4" y="74" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="3" />
      <rect x="10" y="80" width="10" height="10" fill="currentColor" />
      {/* Random "data" dots */}
      {[
        [34, 6],
        [40, 8],
        [44, 14],
        [50, 6],
        [54, 12],
        [60, 18],
        [66, 6],
        [34, 26],
        [42, 30],
        [48, 36],
        [56, 26],
        [62, 32],
        [68, 38],
        [34, 50],
        [42, 56],
        [48, 50],
        [56, 56],
        [62, 50],
        [68, 56],
        [74, 50],
        [80, 56],
        [86, 50],
        [34, 70],
        [42, 74],
        [50, 80],
        [56, 70],
        [62, 76],
        [68, 70],
        [74, 76],
        [82, 80],
        [88, 70],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="4" height="4" fill="currentColor" />
      ))}
    </svg>
  );
}
