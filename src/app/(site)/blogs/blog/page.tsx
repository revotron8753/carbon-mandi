import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { blogPath, getAllBlogs, getExcerpt } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Articles · Resources",
  description:
    "Insights on green hydrogen, biomass, carbon credits and India's climate mission — from the Carbon Mandi team.",
  alternates: { canonical: "/blogs/blog" },
};

export default function BlogIndexPage() {
  const blogs = getAllBlogs();

  return (
    <section className="min-h-screen bg-cream">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-24 lg:px-8">
        <header className="max-w-3xl">
          <p className="text-[11px] font-extrabold uppercase tracking-[0.22em] text-mission">
            Resources
          </p>
          <h1 className="font-display mt-4 text-[clamp(2.4rem,4.5vw,3.6rem)] font-bold leading-[1.05] tracking-tight text-ink">
            Articles
          </h1>
          <p className="mt-5 text-lg text-ink-soft">
            {blogs.length} articles on green hydrogen, biomass, carbon credits
            and India&rsquo;s climate mission.
          </p>
        </header>

        <ul className="mt-14 grid grid-cols-1 gap-x-10 gap-y-14 md:grid-cols-2">
          {blogs.map((b) => (
            <li key={b.handle}>
              <Link href={blogPath(b.handle)} className="group block">
                {/* Cover image */}
                {b.coverImage ? (
                  <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-paper ring-1 ring-line">
                    <Image
                      src={b.coverImage}
                      alt={b.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                ) : (
                  <div className="relative flex aspect-[16/9] items-center justify-center rounded-2xl bg-paper ring-1 ring-line">
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-ink-muted">
                      Carbon Mandi
                    </p>
                  </div>
                )}

                {/* Title */}
                <h2 className="font-display mt-6 text-2xl font-bold leading-snug tracking-tight text-ink underline decoration-ink/40 underline-offset-[6px] transition-colors group-hover:text-mission group-hover:decoration-mission md:text-[1.6rem]">
                  {b.title}
                </h2>

                {/* Excerpt */}
                <p className="mt-4 line-clamp-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">
                  {getExcerpt(b, 220)}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
