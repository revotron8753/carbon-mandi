"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

/**
 * Global route-change loader. Shows a spinning Carbon Mandi mark on every
 * internal navigation — including instant/static pages (home, projects) that
 * never trigger the server `loading.tsx` Suspense fallback.
 *
 * It listens for internal link clicks (and browser back/forward), shows a
 * full-screen overlay, then hides once the new route commits — with a minimum
 * visible time so it doesn't flicker on instant pages.
 */
const MIN_VISIBLE_MS = 450;
const SAFETY_MS = 10000;

export function RouteLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const shownAt = useRef(0);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Start the loader on internal link clicks + browser navigation.
  useEffect(() => {
    const start = () => {
      shownAt.current = Date.now();
      setVisible(true);
      if (safety.current) clearTimeout(safety.current);
      safety.current = setTimeout(() => setVisible(false), SAFETY_MS);
    };

    const onClick = (e: MouseEvent) => {
      // Capture phase — runs before next/link calls preventDefault(), so we
      // detect the navigation intent that Link is about to handle client-side.
      if (e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement | null)?.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      const target = anchor.getAttribute("target");
      if (!href || (target && target !== "_self")) return;
      if (anchor.hasAttribute("download")) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:")
      )
        return;

      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external link
      // Same page (or just a hash on the current page) — nothing to load.
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;

      start();
    };

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", start);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", start);
      if (safety.current) clearTimeout(safety.current);
    };
  }, []);

  // Hide once the route has committed (pathname changed), honouring a minimum
  // visible time. Runs only on pathname change, so toggling `visible` on click
  // never schedules a premature hide.
  useEffect(() => {
    if (!visible) return;
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt.current));
    const t = setTimeout(() => setVisible(false), remaining);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      role="status"
      aria-label="Loading"
      className="fixed inset-0 z-200 flex items-center justify-center bg-paper/85 backdrop-blur-sm"
    >
      <Image
        src="/images/cm-coin.png"
        alt=""
        width={547}
        height={556}
        unoptimized
        priority
        className="h-16 w-auto animate-spin [animation-duration:1.1s] sm:h-20"
      />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
