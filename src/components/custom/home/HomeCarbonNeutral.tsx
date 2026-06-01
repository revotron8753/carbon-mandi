import Link from "next/link";
import { ArrowRight, Leaf } from "lucide-react";

import { PhotoSlot } from "@/components/ui/photo-slot";
import { MandiLogo } from "./MandiLogo";

const BULLETS = [
  "Plants trees in your name",
  "Supports rural livelihoods",
  "Creates verified climate impact",
];

export function HomeCarbonNeutral() {
  return (
    <section className="relative isolate flex min-h-[40rem] flex-col overflow-hidden bg-paper lg:min-h-[46rem]">
      {/* ── Full-bleed background scene + washes ────────────────────────────
          The planting image captures the whole block. A left-to-right white
          wash keeps the logo + heading + card readable while the farmer & girl
          read clearly on the right; a bottom dark wash carries the quote. */}
      <div className="absolute inset-0 -z-10">
        <PhotoSlot
          slot="plantTree"
          fill
          className="rounded-none ring-0"
          imgClassName="object-cover object-center"
        />
        {/* mobile readability wash — removed at lg where the side wash takes over */}
        <div aria-hidden className="absolute inset-0 bg-white/55 lg:bg-transparent" />
        {/* left white wash */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[linear-gradient(to_right,white_0%,white_36%,rgba(255,255,255,0.82)_46%,rgba(255,255,255,0.35)_58%,transparent_70%)]"
        />
        {/* bottom dark wash for the quote strip */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-44 bg-[linear-gradient(to_top,rgba(12,22,10,0.9)_0%,rgba(12,22,10,0.55)_45%,transparent_100%)]"
        />
      </div>

      {/* ── Top: logo + headline + CTA card (left column) ──────────────────── */}
      <div className="mx-auto w-full max-w-7xl flex-1 px-6 pt-12 lg:px-10 lg:pt-16">
        <Link href="/" className="inline-flex flex-col gap-1.5" aria-label="Carbon Mandi — home">
          <MandiLogo className="h-11 w-auto md:h-12" />
          <span className="text-[10.5px] font-medium tracking-wide text-ink-soft md:text-[11px]">
            Farm to Fuel. Future for All.
          </span>
        </Link>

        <div className="mt-10 max-w-xl lg:mt-14">
          <h2 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-[1.05] tracking-tight">
            <span className="block text-ink">Make Your Visit</span>
            <span className="block text-mission">Carbon Neutral</span>
          </h2>
          <span
            aria-hidden
            className="mt-5 block h-[3px] w-28 rounded-full bg-linear-to-r from-mission to-transparent"
          />

          <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
            A small action today can support climate restoration tomorrow.
          </p>

          {/* CTA card */}
          <div className="mt-8 max-w-md rounded-2xl bg-white/95 p-5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)] ring-1 ring-black/5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-mission ring-1 ring-mission/30">
                <Leaf size={24} strokeWidth={1.8} />
              </span>
              <p className="font-display text-[1.9rem] font-extrabold leading-none text-ink">
                <span className="align-top text-[1.1rem] font-bold">₹</span>299
              </p>
              <span aria-hidden className="mx-1 h-12 w-px bg-line" />
              <ul className="space-y-1.5">
                {BULLETS.map((b) => (
                  <li
                    key={b}
                    className="flex items-center gap-2 text-[12.5px] leading-snug text-ink"
                  >
                    <Leaf size={13} strokeWidth={2} className="shrink-0 text-mission" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <Link
              href="/right-to-climate"
              className="mt-4 flex items-center justify-between gap-3 rounded-xl bg-linear-to-r from-mission-dark to-mission px-6 py-3.5 text-white shadow-sm transition-opacity hover:opacity-95"
            >
              <span className="inline-flex items-center gap-3 text-[15px] font-extrabold">
                <Leaf size={18} strokeWidth={2} />
                Plant A Tree
              </span>
              <ArrowRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom: centered quote over the dark wash ──────────────────────── */}
      <div className="relative z-10 px-6 pb-7 pt-6 text-center lg:px-10">
        <div className="flex justify-center text-white/90">
          <Leaf size={18} strokeWidth={1.8} />
        </div>
        <p className="font-display mx-auto mt-2 max-w-3xl text-[clamp(0.95rem,1.5vw,1.2rem)] font-semibold leading-snug text-white">
          <span className="mr-1 align-middle text-[1.3em] font-bold text-[#7cc59e]">
            &ldquo;
          </span>
          The future is not built by one innovation. It is built by millions of
          small actions.
          <span className="ml-1 align-middle text-[1.3em] font-bold text-[#7cc59e]">
            &rdquo;
          </span>
        </p>
      </div>
    </section>
  );
}
