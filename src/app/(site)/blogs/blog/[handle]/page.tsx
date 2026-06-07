import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import {
  blogPath,
  getAllBlogHandles,
  getBlogByHandle,
  getExcerpt,
} from "@/lib/blogs";
import { SITE } from "@/lib/constants";
import { client, urlFor, articleBySlugQuery } from "@/lib/sanity";
import { PortableBody } from "@/components/custom/PortableBody";
import type { PortableTextBlock } from "@portabletext/types";

interface Params {
  handle: string;
}

/** A CMS-authored article (the Sanity fallback when no legacy JSON blog matches). */
type Article = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  author?: string;
  categories?: string[];
  publishedAt?: string;
  coverImage?: { asset?: { _ref?: string } } | null;
  body?: PortableTextBlock[];
  seo?: { title?: string; description?: string } | null;
};

/**
 * Article lookup for the Sanity fallback. Uses ISR (revalidate) rather than the
 * shared `sanityFetch` (which is `no-store`): this route is SSG via
 * generateStaticParams, and a `no-store` read on a non-prerendered slug bails
 * the static render with DYNAMIC_SERVER_USAGE. A revalidated read lets unknown
 * slugs render (or 404) on demand and refresh every minute.
 */
function getArticle(slug: string) {
  return client.fetch<Article | null>(
    articleBySlugQuery,
    { slug },
    { next: { revalidate: 60 } }
  );
}

/**
 * Pre-generate every blog at build time — preserves the exact /blogs/blog/<handle>
 * URL each post had on Shopify so search rankings carry over.
 */
export async function generateStaticParams(): Promise<Params[]> {
  return getAllBlogHandles().map((handle) => ({ handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { handle } = await params;
  const blog = getBlogByHandle(handle);

  // Legacy JSON blog takes precedence; otherwise fall back to a CMS article.
  let title: string;
  let description: string | undefined;
  let ogImages: { url: string }[] | undefined;

  if (blog) {
    title = blog.seoTitle ?? blog.title;
    description = getExcerpt(blog);
    ogImages = blog.coverImage ? [{ url: blog.coverImage }] : undefined;
  } else {
    const article = await getArticle(handle);
    if (!article) return {};
    title = article.seo?.title ?? article.title;
    description = article.seo?.description ?? article.excerpt;
    ogImages = article.coverImage?.asset
      ? [{ url: urlFor(article.coverImage).width(1200).height(630).fit("crop").url() }]
      : undefined;
  }

  const canonical = blogPath(handle);

  return {
    // `absolute` bypasses the root layout's `%s | Carbon Mandi` template —
    // the rendered <title> is exactly the article title, preserving the
    // existing Shopify SEO surface as faithfully as possible.
    title: { absolute: title },
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title,
      description,
      url: canonical,
      siteName: SITE.name,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { handle } = await params;
  const blog = getBlogByHandle(handle);

  // No legacy JSON blog? Try a CMS-authored article before 404-ing.
  if (!blog) {
    const article = await getArticle(handle);
    if (!article) notFound();
    return <ArticlePost article={article} />;
  }

  return (
    <article className="bg-cream pb-24">
      {/* Breadcrumb strip */}
      <nav aria-label="Breadcrumb" className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link
            href="/blogs/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-mission"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            All Articles
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pt-12 lg:pt-16">
        {/* Cover image — top, prominent */}
        {blog.coverImage && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="font-display mt-10 text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-ink">
          {blog.title}
        </h1>

        {/* Meta line */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
          {blog.author && (
            <span>
              By <span className="font-semibold text-ink">{blog.author}</span>
            </span>
          )}
          {blog.tags.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <ul className="flex flex-wrap items-center gap-2">
                {blog.tags.slice(0, 4).map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-mission-soft px-3 py-0.5 text-[11px] font-semibold text-mission"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Body */}
        <div
          className="prose prose-neutral prose-headings:font-display prose-headings:text-mission prose-headings:font-bold prose-a:text-mission prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-img:rounded-lg mt-10 max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </div>
    </article>
  );
}

/* ── CMS-authored article (Sanity) ──────────────────────────────────────── */

function ArticlePost({ article }: { article: Article }) {
  const cover = article.coverImage?.asset
    ? urlFor(article.coverImage).width(1280).height(720).fit("crop").auto("format").url()
    : null;
  const date = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  return (
    <article className="bg-cream pb-24">
      {/* Breadcrumb strip */}
      <nav aria-label="Breadcrumb" className="bg-paper">
        <div className="mx-auto max-w-5xl px-6 py-5">
          <Link
            href="/blogs/blog"
            className="inline-flex items-center gap-1.5 text-[12px] font-medium uppercase tracking-[0.18em] text-ink-muted transition-colors hover:text-mission"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            All Articles
          </Link>
        </div>
      </nav>

      <div className="mx-auto max-w-3xl px-6 pt-12 lg:pt-16">
        {/* Cover image */}
        {cover && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
            <Image
              src={cover}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
        )}

        {/* Title */}
        <h1 className="font-display mt-10 text-[clamp(2rem,4.2vw,3.2rem)] font-bold leading-[1.1] tracking-tight text-ink">
          {article.title}
        </h1>

        {/* Meta line */}
        <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-ink-muted">
          {article.author && (
            <span>
              By <span className="font-semibold text-ink">{article.author}</span>
            </span>
          )}
          {date && (
            <>
              {article.author && <span aria-hidden>·</span>}
              <time dateTime={article.publishedAt}>{date}</time>
            </>
          )}
          {article.categories && article.categories.length > 0 && (
            <>
              <span aria-hidden>·</span>
              <ul className="flex flex-wrap items-center gap-2">
                {article.categories.slice(0, 4).map((t) => (
                  <li
                    key={t}
                    className="rounded-full bg-mission-soft px-3 py-0.5 text-[11px] font-semibold text-mission"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* Body */}
        <div className="prose prose-neutral prose-headings:font-display prose-headings:text-mission prose-headings:font-bold prose-a:text-mission prose-a:no-underline hover:prose-a:underline prose-strong:text-ink prose-img:rounded-lg mt-10 max-w-none">
          {article.body && <PortableBody value={article.body} />}
        </div>
      </div>
    </article>
  );
}
