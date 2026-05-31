import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/constants";

/**
 * Montserrat across the whole system — body and display.
 * Loading a wide weight range lets us use 300/400 for body, 500/600
 * for emphasis, and 700/800 for large editorial headings.
 */
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${SITE.name} — ${SITE.shortDescription}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.shortDescription,
  metadataBase: new URL(SITE.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
    >
      {/* suppressHydrationWarning is scoped to <body> only — silences harmless
          attribute mismatches injected by browser extensions (Grammarly,
          ColorZilla, etc.). Does not affect any other hydration checks. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-ink"
      >
        {children}
      </body>
    </html>
  );
}
