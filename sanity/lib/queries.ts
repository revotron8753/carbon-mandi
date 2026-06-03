import { defineQuery } from "next-sanity";

// ── Site settings (singleton) ────────────────────────────────────────────────
export const siteSettingsQuery = defineQuery(`
  *[_type == "siteSettings"][0]{
    title, tagline, description, logo, contactEmail, contactPhone, address, socials
  }
`);

// ── Projects ─────────────────────────────────────────────────────────────────
export const projectsQuery = defineQuery(`
  *[_type == "project"] | order(order asc){
    _id, name, "slug": slug.current, tagline, summary, status, location, logo, heroImage
  }
`);

export const projectBySlugQuery = defineQuery(`
  *[_type == "project" && slug.current == $slug][0]{
    _id, name, "slug": slug.current, tagline, summary, status, location,
    externalUrl, logo, heroImage, body, seo
  }
`);

export const projectSlugsQuery = defineQuery(`
  *[_type == "project" && defined(slug.current)]{ "slug": slug.current }
`);

// ── Team ─────────────────────────────────────────────────────────────────────
export const teamQuery = defineQuery(`
  *[_type == "teamMember"] | order(order asc){
    _id, name, role, group, country, bio, linkedin, photo
  }
`);

// ── Partners (Global Ecosystem logos) ─────────────────────────────────────────
export const partnersQuery = defineQuery(`
  *[_type == "partner"] | order(order asc){
    _id, name, url, logo
  }
`);

// ── Products (Mandi) ─────────────────────────────────────────────────────────
export const productsQuery = defineQuery(`
  *[_type == "product"] | order(order asc){
    _id, name, "slug": slug.current, category, icon, shortDescription, image, indiaMartUrl
  }
`);

// ── Articles ─────────────────────────────────────────────────────────────────
export const articlesQuery = defineQuery(`
  *[_type == "article"] | order(publishedAt desc){
    _id, title, "slug": slug.current, excerpt, author, categories, publishedAt, coverImage
  }
`);

export const articleBySlugQuery = defineQuery(`
  *[_type == "article" && slug.current == $slug][0]{
    _id, title, "slug": slug.current, excerpt, author, categories, publishedAt,
    coverImage, body, seo
  }
`);

export const articleSlugsQuery = defineQuery(`
  *[_type == "article" && defined(slug.current)]{ "slug": slug.current }
`);

// ── CSR page (singleton) ──────────────────────────────────────────────────────
export const csrPageQuery = defineQuery(`
  *[_type == "csrPage"][0]{
    title, tagline, intro, heroImage, body, initiatives, seo
  }
`);
