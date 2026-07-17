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

const config = withMDX(nextConfig)

// Buildamos com --webpack (o turbopack do Next 16 nao parseia as regras que o
// fumadocs-mdx injeta). Essas regras de turbopack ficam no config sem uso e so
// geram um warning de schema invalido — removemos pra manter o log limpo.
delete config.turbopack

export default config
