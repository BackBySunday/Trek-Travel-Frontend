import type { NextConfig } from "next";

// Trek/organizer images are served from the public R2 bucket (and any
// NEXT_PUBLIC_MEDIA_BASE_URL override), so next/image must allow those hosts.
const extraHosts = [process.env.NEXT_PUBLIC_MEDIA_BASE_URL, process.env.MEDIA_PUBLIC_BASE_URL]
  .filter((u): u is string => Boolean(u))
  .flatMap((u) => {
    try {
      return [new URL(u).hostname];
    } catch {
      return [];
    }
  });

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.r2.dev" },
      { protocol: "https", hostname: "**.r2.cloudflarestorage.com" },
      ...extraHosts.map((hostname) => ({ protocol: "https" as const, hostname })),
    ],
  },
};

export default nextConfig;
