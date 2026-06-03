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
 * Read-only Sanity API token (server-only — never reaches the browser, since
 * this client is only imported by server components). The dataset doesn't
 * return the full published content set anonymously, so reads need this token;
 * it's hardcoded as a fallback so frontend-only deploys (which can't set env
 * vars) still show all content. SANITY_API_READ_TOKEN overrides it when set.
 * This is a *read* token — rotate it at sanity.io/manage if the repo is public.
 */
const READ_TOKEN =
  process.env.SANITY_API_READ_TOKEN ||
  "skzF8knkUS61i8fZkHqlvQZTggXTEmB2QRh206g1KJR428sWPfj94IaXbPugkEjGsDh0KxMXb3tUz4ax4r3qleYQceaChhqLkywLdeAyIEf1m4V34EB1E67Ia0iEqDmOA4PVJusbrkF7uUPggunNcr5uPpwXZioeo8dKQSRmcQQmJBCRM4tR";

/**
 * Server-side read client. `perspective: "published"` ensures the live site
 * shows published content only, never drafts. CDN is off so reads always hit
 * fresh published data.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: READ_TOKEN,
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
