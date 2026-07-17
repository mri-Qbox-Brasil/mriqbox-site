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
  }),
}

export default nextConfig
