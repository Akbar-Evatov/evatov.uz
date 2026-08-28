import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Every route here is statically prerenderable, so we emit a plain static
   * bundle to `out/`. That deploys to Cloudflare as static assets — no server
   * runtime, no adapter, no cold starts.
   */
  output: "export",
  // No next/image is used, but the export target requires the loader be off.
  images: { unoptimized: true },
};

export default nextConfig;
