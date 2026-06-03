/**
 * Bridge between the app (src/) and the Sanity studio config (sanity/),
 * which lives outside src/. Pages import everything Sanity-related from here.
 */
import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../../sanity/env";
import { urlFor } from "../../sanity/lib/image";

export { urlFor };
export * from "../../sanity/lib/queries";

/**
 * Server-side read client. The `production` dataset is public-read, so the
 * token is optional — when present (SANITY_API_READ_TOKEN, a server-only env
 * var never shipped to the browser) it's used; when absent, public reads still
 * work, so a frontend-only deploy needs no secret. `perspective: "published"`
 * ensures the live site shows published content only, never drafts. CDN is off
 * so reads always hit fresh published data.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  perspective: "published",
});

/**
 * Fetch helper. Always reads fresh so studio edits show on the next refresh —
 * important while the client is actively editing content. Before launch this
 * should move to ISR + on-demand webhook revalidation (Phase 5) for caching.
 */
export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {}
): Promise<T> {
  return client.fetch<T>(query, params, { cache: "no-store" });
}
