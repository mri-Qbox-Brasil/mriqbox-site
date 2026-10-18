import { createMDX } from "fumadocs-mdx/next"
import path from "node:path"
import { fileURLToPath } from "node:url"

const projectRoot = path.dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: projectRoot,
  // Static site served by GitHub Pages at www.mriqbox.com.br.
  output: "export",
  // Emits route/index.html so GitHub Pages finds nested routes on refresh.
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

const withMDX = createMDX()

const config = withMDX(nextConfig)

// Built with --webpack (Next 16 turbopack can't parse fumadocs-mdx rules); drop the unused turbopack block to keep the log clean.
delete config.turbopack

export default config
