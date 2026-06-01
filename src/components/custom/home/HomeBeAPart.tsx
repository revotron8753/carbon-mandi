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
    <section className="relative isolate overflow-hidden bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-24">
        {/* Heading at the top of the section */}
        <div className="max-w-3xl">
          <h2 className="font-display font-extrabold uppercase leading-[1.02] tracking-tight">
            <span className="block text-[clamp(1.5rem,2.6vw,2.05rem)] text-ink">
              Be A Part Of
            </span>
            <span className="block text-[clamp(2rem,4vw,3rem)] text-mission">
              India&rsquo;s Green Hydrogen Revolution
            </span>
          </h2>
          <span aria-hidden className="mt-4 block h-[3px] w-12 rounded-full bg-mission" />
          <p className="mt-4 max-w-xl text-[14px] leading-relaxed text-ink-soft">
            Together, we can build a clean, self-reliant, and future-ready India
            powered by farmers, driven by innovation, and inspired by
            sustainability.
          </p>
        </div>

        {/* We Invite — 4 invitation cards in a full-width row */}
        <p className="mt-12 text-[13px] font-extrabold uppercase tracking-[0.16em] text-mission">
          We Invite Visionaries &amp; Change Makers
        </p>
        <ul className="no-scrollbar mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0">
          {INVITES.map((inv) => (
            <li
              key={inv.label}
              className="flex shrink-0 basis-[62%] snap-start flex-col rounded-xl border border-line bg-white p-2.5 shadow-sm sm:basis-auto"
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

        {/* Closing banner — quote + Join-the-Movement / QR over the scene photo */}
        <div className="relative isolate mt-12 overflow-hidden rounded-2xl">
          <PhotoSlot
            slot="beAPartHero"
            fill
            className="rounded-none ring-0"
            imgClassName="object-cover object-[50%_35%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-[linear-gradient(to_right,rgba(10,58,38,0.94)_0%,rgba(10,58,38,0.8)_50%,rgba(10,58,38,0.5)_100%)]"
          />
          <div className="relative grid grid-cols-1 gap-7 p-7 lg:grid-cols-[1fr_auto] lg:items-center lg:gap-10 lg:p-10">
            {/* Quote */}
            <div>
              <Quote size={30} strokeWidth={1.5} className="text-white/70" />
              <p className="font-display mt-2 text-[clamp(1.3rem,2vw,1.75rem)] font-extrabold leading-[1.18] tracking-tight text-white">
                A Greener India. A Stronger India. A Self-Reliant
                India.&rdquo;
              </p>
              <p className="mt-3 text-[14px] font-semibold text-white/90">
                Let&rsquo;s Build It. Together.
              </p>
            </div>

            {/* Join the Movement + QR */}
            <div className="flex items-center gap-4 rounded-xl bg-white/10 px-5 py-4 text-white ring-1 ring-white/20 backdrop-blur-sm">
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
