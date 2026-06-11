import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Static export — the site deploys to GitHub Pages, which serves files,
  // not a Node server. `yarn build` writes the site to `out/`.
  output: "export",

  // GitHub Pages serves project sites from a subpath
  // (nicksgit1.github.io/portfolio). The deploy workflow sets
  // NEXT_PUBLIC_BASE_PATH=/portfolio; local dev serves from `/`.
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",

  // next/image optimization needs a server; not used yet, but this keeps
  // a future <Image> from silently breaking the static export.
  images: { unoptimized: true },
};

export default nextConfig;
