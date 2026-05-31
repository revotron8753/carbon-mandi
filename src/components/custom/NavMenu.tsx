import Link from "next/link";

import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/**
 * Primary desktop nav items. "Coming Soon" entries don't navigate and reveal a
 * tooltip on hover (pure CSS via `group-hover`). Used by both the global
 * Navbar and the homepage hero top bar.
 */
export function NavMenu({ className }: { className?: string }) {
  return (
    <ul className={cn("items-center gap-7", className)}>
      {NAV_LINKS.map((link) =>
        link.comingSoon ? (
          <li key={link.label} className="group relative">
            <span className="cursor-default text-[14px] font-medium text-ink/55 transition-colors group-hover:text-mission">
              {link.label}
            </span>
            {/* Coming-soon tooltip — appears on hover */}
            <span className="pointer-events-none absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2 whitespace-nowrap rounded-md bg-mission px-2.5 py-1 text-[11px] font-semibold text-white opacity-0 shadow-lg transition-opacity duration-150 group-hover:opacity-100">
              Coming Soon
              <span
                aria-hidden
                className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-mission"
              />
            </span>
          </li>
        ) : (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-[14px] font-medium text-ink transition-colors hover:text-mission"
            >
              {link.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}
