import type { MetadataRoute } from "next"

const SITE_URL = "https://mriqbox.com.br"

// Necessario pro `output: export` (build do GitHub Pages); inocuo na Vercel.
export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  const routes: { path: string; priority: number; changeFrequency: "monthly" | "weekly" }[] = [
    { path: "/", priority: 1, changeFrequency: "weekly" },
    { path: "/por-que-mri", priority: 0.95, changeFrequency: "monthly" },
    { path: "/recursos", priority: 0.9, changeFrequency: "monthly" },
    { path: "/comecar", priority: 0.9, changeFrequency: "monthly" },
    { path: "/comparativo", priority: 0.8, changeFrequency: "monthly" },
    { path: "/glossario", priority: 0.7, changeFrequency: "monthly" },
    { path: "/sobre", priority: 0.6, changeFrequency: "monthly" },
    { path: "/privacidade", priority: 0.3, changeFrequency: "monthly" },
    { path: "/termos", priority: 0.3, changeFrequency: "monthly" },
  ]
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))
}
