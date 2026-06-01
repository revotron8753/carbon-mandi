/**
 * Static site configuration that isn't content-managed.
 */
export const SITE = {
  name: "Carbon Mandi",
  shortDescription:
    "India's first hemp & napier biomass based green hydrogen initiative.",
  // Canonical host — matches Shopify's existing www subdomain so URLs are byte-identical.
  url: "https://www.carbonmandi.com",
  email: "hello@carbonmandi.com",
  phone: "+91 98765 43210",
} as const;

export interface NavLink {
  label: string;
  href: string;
  /** When true the item doesn't navigate and shows a "Coming Soon" hint. */
  comingSoon?: boolean;
}

/** Primary navigation. ("मंडी" = "Mandi" in Hindi.) */
export const NAV_LINKS: NavLink[] = [
  { label: "National Projects", href: "#", comingSoon: true },
  { label: "Team", href: "#", comingSoon: true },
  { label: "मंडी", href: "/mandi" },
  { label: "Blogs", href: "/blogs/blog" },
];
