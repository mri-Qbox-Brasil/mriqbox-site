import { createMDX } from "fumadocs-mdx/next"

/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"

const nextConfig = {
  images: {
    unoptimized: true,
  },
  ...(isGithubPages && {
    output: "export",
    basePath: "/mriqbox-site",
    assetPrefix: "/mriqbox-site",
    // gera comecar/index.html -> evita 404 ao dar refresh em subrotas no GH Pages
    trailingSlash: true,
    // Exposto ao client: o cliente de busca do Fumadocs nao conhece o basePath
    // do Next (ele deriva de import.meta.env.BASE_URL do Vite, undefined aqui),
    // entao passamos o prefixo pra montar o endpoint /api/search correto.
    env: {
      NEXT_PUBLIC_BASE_PATH: "/mriqbox-site",
    },
  }),
}

const withMDX = createMDX()

export default withMDX(nextConfig)
