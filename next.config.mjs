import { createMDX } from "fumadocs-mdx/next"
import path from "node:path"
import { fileURLToPath } from "node:url"

/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_PAGES === "true"
const projectRoot = path.dirname(fileURLToPath(import.meta.url))

const nextConfig = {
  outputFileTracingRoot: projectRoot,
  images: {
    unoptimized: true,
  },
  // /recursos (lista de scripts) saiu no redesign; o equivalente agora e a
  // secao de resources da doc. O `output: export` do GitHub Pages nao suporta
  // redirects, entao so entram no build da Vercel.
  ...(!isGithubPages && {
    async redirects() {
      return [
        { source: "/recursos", destination: "/docs/mri/resources", permanent: true },
      ]
    },
  }),
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
