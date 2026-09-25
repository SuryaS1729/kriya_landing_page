import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Pin the workspace root. Without this, Turbopack walks up and trips over a
  // stray package-lock.json in the parent directory.
  turbopack: {
    root: path.join(import.meta.dirname),
  },
};

export default nextConfig;
