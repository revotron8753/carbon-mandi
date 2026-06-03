"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { NAV_LINKS } from "@/lib/constants";
import { MandiLogo } from "./home/MandiLogo";
import { NavMenu } from "./NavMenu";
import { useContactModal } from "./contact/ContactModalProvider";

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { open: openContact } = useContactModal();

  // Homepage absorbs the logo and Made-in-India badge inside the hero, so
  // the global navbar is hidden there. Other pages keep it.
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center" aria-label="Carbon Mandi — home">
          <MandiLogo className="h-11 w-auto" />
        </Link>

        <NavMenu className="hidden lg:flex" />

        <div className="hidden lg:block">
          <button
            type="button"
            onClick={() => openContact("Join the Mission")}
            className="rounded-md bg-mission px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-mission-dark"
          >
            Join the Mission
          </button>
        </div>

        <button
          type="button"
          className="lg:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <ul className="flex flex-col gap-1 border-t border-line bg-paper px-6 py-4 lg:hidden">
          {NAV_LINKS.map((link) =>
            link.comingSoon ? (
              <li key={link.label}>
                <span className="flex items-center justify-between rounded-md px-2 py-2 text-sm font-medium text-ink/55">
                  {link.label}
                  <span className="rounded-full bg-mission-soft px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-mission">
                    Coming Soon
                  </span>
                </span>
              </li>
            ) : (
              <li key={link.label}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-md px-2 py-2 text-sm font-medium text-ink hover:bg-cream"
                >
                  {link.label}
                </Link>
              </li>
            )
          )}
          <li className="px-2 pt-3">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                openContact("Join the Mission");
              }}
              className="inline-flex w-full justify-center rounded-md bg-mission px-5 py-2.5 text-sm font-semibold text-white"
            >
              Join the Mission
            </button>
          </li>
        </ul>
      )}
    </header>
  );
}
