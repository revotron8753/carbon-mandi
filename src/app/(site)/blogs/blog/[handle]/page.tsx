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

interface Params {
  handle: string;
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
  if (!blog) return {};

  const title = blog.seoTitle ?? blog.title;
  const description = getExcerpt(blog);
  const canonical = blogPath(handle);
  const ogImages = blog.coverImage ? [{ url: blog.coverImage }] : undefined;

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
  if (!blog) notFound();

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
