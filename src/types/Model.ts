/**
 * Centralized shared TypeScript types.
 *
 * Hand-written shapes mirroring the Sanity schemas. Once a real Sanity project
 * is connected we can replace/augment these with generated types via
 * `npx sanity@latest typegen generate`.
 */
import type { PortableTextBlock } from "@portabletext/types";
import type { SanityImageSource } from "@sanity/image-url";

export type SanityImage = SanityImageSource;

export interface SocialLink {
  platform: string;
  url: string;
}

export interface SiteSettings {
  title: string;
  tagline?: string;
  description?: string;
  logo?: SanityImage;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  socials?: SocialLink[];
}

export type ProjectStatus = "active" | "upcoming" | "completed";

export interface Project {
  _id: string;
  name: string;
  slug: string;
  tagline?: string;
  summary?: string;
  status?: ProjectStatus;
  location?: string;
  externalUrl?: string;
  logo?: SanityImage;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
}

export interface TeamMember {
  _id: string;
  name: string;
  role?: string;
  region?: string;
  bio?: string;
  photo?: SanityImage;
  socials?: SocialLink[];
}

export interface Product {
  _id: string;
  name: string;
  slug: string;
  category?: string;
  shortDescription?: string;
  image?: SanityImage;
  indiaMartUrl?: string;
}

export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
  publishedAt: string;
  coverImage?: SanityImage;
  body?: PortableTextBlock[];
}

export interface CsrInitiative {
  title?: string;
  description?: string;
  image?: SanityImage;
}

export interface CsrPage {
  title: string;
  tagline?: string;
  intro?: string;
  heroImage?: SanityImage;
  body?: PortableTextBlock[];
  initiatives?: CsrInitiative[];
}
