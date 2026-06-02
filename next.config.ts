import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project (a stray lockfile in the parent
  // directory otherwise makes Next infer the wrong root).
  turbopack: {
    root: __dirname,
  },
  images: {
    remotePatterns: [
      // Sanity-hosted images.
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  // SEO: preserve rankings from the old Shopify URLs by permanently (308)
  // redirecting them to their new homes. 308 is cached by search engines and
  // passes link equity like a 301.
  async redirects() {
    return [
      {
        source: "/pages/green-hydrogen-pilot",
        destination: "/",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
