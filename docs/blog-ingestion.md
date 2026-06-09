# Automated blog ingestion

Programmatically create **published** blog articles in Sanity via a single HTTP
endpoint. Built for an automated pipeline (n8n, a cron job, a script, an LLM
agent, etc.).

- **Endpoint:** `POST https://www.carbonmandi.com/api/articles`
- **Source:** [`src/app/api/articles/route.ts`](../src/app/api/articles/route.ts)
- Articles appear immediately on `/blogs/blog` (index is dynamic); each article
  page renders on demand. No rebuild/redeploy needed per post.

---

## 1. One-time setup (required)

The endpoint needs two environment variables in **Vercel → Settings →
Environment Variables** (Production + Preview), then **redeploy**:

| Variable | What it is | How to get it |
|---|---|---|
| `SANITY_API_WRITE_TOKEN` | Sanity token with **Editor/write** permission (creates documents + uploads images). **Secret.** | sanity.io/manage → project `flhfm40u` → **API → Tokens → Add API token** → permission **Editor** → copy the `sk...` value |
| `BLOG_INGEST_SECRET` | A random string that protects the endpoint. **Secret.** | Generate any long random string, e.g. `openssl rand -hex 32` |

> Without these the endpoint returns `500 "Server not configured…"`.
> The write token is **different** from the existing read-only token.

---

## 2. Request format

```
POST /api/articles
Authorization: Bearer <BLOG_INGEST_SECRET>
Content-Type: application/json
```

### Body fields

| Field | Type | Required | Notes |
|---|---|---|---|
| `title` | string | ✅ | Article title. |
| `slug` | string | — | URL path. Auto-derived from `title` if omitted. Always normalised to lowercase-hyphen form (`first-blog`). |
| `excerpt` | string | — | Short summary shown in the listing. |
| `author` | string | — | |
| `categories` | string[] | — | Tags. |
| `publishedAt` | string (ISO date) | — | Defaults to now. |
| `markdown` | string | — | Body as Markdown — converted to Portable Text. |
| `body` | Portable Text[] | — | Body as ready-made Portable Text. **Takes precedence** over `markdown`. |
| `coverImageUrl` | string (URL) | — | Public image URL; fetched and uploaded to Sanity as the cover. |
| `seo` | `{ title?, description? }` | — | SEO/social overrides. |
| `overwrite` | boolean | — | If the slug already exists, replace it instead of returning 409. |

### Markdown support

The `markdown` field handles headings (`##`, `###`, `####`), bullet lists
(`-`/`*`), numbered lists (`1.`), blockquotes (`>`) and paragraphs. For rich
**inline** formatting (bold, links, inline images) send `body` as Portable Text
directly instead.

---

## 3. Responses

| Status | Meaning |
|---|---|
| `201` | Created. Body: `{ ok, id, slug, url, replaced }` |
| `400` | Missing `title` or invalid `body`. |
| `401` | Missing/wrong `Authorization` bearer token. |
| `409` | An article with that slug already exists (send `overwrite: true` to replace). |
| `500` | Server not configured (missing env var) or Sanity write failed. |

---

## 4. Examples

### Minimal (Markdown body)

```bash
curl -X POST https://www.carbonmandi.com/api/articles \
  -H "Authorization: Bearer $BLOG_INGEST_SECRET" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Green Hydrogen in India: 2026 Outlook",
    "excerpt": "Where biomass-based hydrogen is headed this year.",
    "author": "Carbon Mandi",
    "categories": ["Green Hydrogen", "Policy"],
    "coverImageUrl": "https://example.com/cover.jpg",
    "markdown": "## Introduction\n\nIndia is scaling green hydrogen...\n\n- Biomass feedstock\n- Rural income\n\n## Outlook\n\nThe road ahead looks bright."
  }'
```

### Idempotent re-run / update

Re-posting the same slug returns `409`. To update an existing post instead:

```json
{ "title": "...", "slug": "green-hydrogen-in-india-2026-outlook", "overwrite": true, "markdown": "..." }
```

---

## 5. Guidelines for the automation

1. **Always send a clean `slug`** (or rely on auto-derivation) — lowercase,
   hyphenated, unique. Reusing a legacy blog handle is shadowed by the old post.
2. **Unique slugs per post.** Treat the slug as the primary key; use
   `overwrite: true` only when intentionally editing an existing article.
3. **Cover images:** pass a stable public `coverImageUrl`. It's uploaded to
   Sanity once per post (re-running with `overwrite` re-uploads).
4. **Retries are safe** when you pin the `slug` + use `overwrite: true`.
5. **Keep the secret server-side.** Never expose `BLOG_INGEST_SECRET` or the
   write token in a browser/client.
6. **Rate:** Sanity write APIs are rate-limited; for bulk backfills, add a small
   delay between requests (e.g. 1–2/sec).

---

## Alternative: write directly to Sanity (no custom endpoint)

If you'd rather skip this endpoint, the automation can POST mutations straight to
the Sanity HTTP API
(`https://flhfm40u.api.sanity.io/v<version>/data/mutate/production`) with the
write token. This endpoint exists to add auth, validation, slug-safety, image
upload and Markdown→Portable Text conversion in one call.
