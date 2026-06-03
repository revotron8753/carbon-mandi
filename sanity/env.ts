// These are the public Sanity coordinates for this site (a NEXT_PUBLIC project
// ID + dataset are shipped to the browser anyway, so they're not secrets). They
// default to the real values so the app builds and reads content even when env
// vars aren't configured on the host (e.g. a frontend-only Vercel deploy). Env
// vars still override, so other datasets/projects can be targeted locally.
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "flhfm40u";
