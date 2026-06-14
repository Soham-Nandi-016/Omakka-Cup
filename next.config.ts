import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  distDir: ".next-local",
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  /* config options here */
};

export default nextConfig;
