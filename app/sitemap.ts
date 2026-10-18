import type { MetadataRoute } from "next"
import { source } from "@/lib/source"
import { ROUTES, locales, type RouteId } from "@/lib/i18n"
import { absoluteUrl } from "@/lib/site"

// Required by `output: export`.
export const dynamic = "force-static"

const PAGES: Record<RouteId, { priority: number; changeFrequency: "monthly" | "weekly" }> = {
  home: { priority: 1, changeFrequency: "weekly" },
  whyMri: { priority: 0.95, changeFrequency: "monthly" },
  artifacts: { priority: 0.9, changeFrequency: "monthly" },
  comparison: { priority: 0.8, changeFrequency: "monthly" },
  glossary: { priority: 0.7, changeFrequency: "monthly" },
  servers: { priority: 0.7, changeFrequency: "weekly" },
  about: { priority: 0.6, changeFrequency: "monthly" },
  discord: { priority: 0.6, changeFrequency: "monthly" },
  support: { priority: 0.6, changeFrequency: "monthly" },
  privacy: { priority: 0.3, changeFrequency: "monthly" },
  terms: { priority: 0.3, changeFrequency: "monthly" },
}

export default function sitemap(): MetadataRoute.Sitemap {
  const sitePages: MetadataRoute.Sitemap = (Object.keys(PAGES) as RouteId[]).flatMap((id) => {
    const languages = {
      ...Object.fromEntries(locales.map((l) => [l, absoluteUrl(ROUTES[id][l])])),
      "x-default": absoluteUrl(ROUTES[id]["pt-BR"]),
    }
    return locales.map((locale) => ({
      url: absoluteUrl(ROUTES[id][locale]),
      changeFrequency: PAGES[id].changeFrequency,
      // Translations rank a notch below the Brazilian original.
      priority: locale === "pt-BR" ? PAGES[id].priority : Math.round(PAGES[id].priority * 80) / 100,
      alternates: { languages },
    }))
  })

  const docsPages: MetadataRoute.Sitemap = source.getPages().map((page) => ({
    url: absoluteUrl(page.url),
    changeFrequency: "monthly",
    priority: page.url === "/docs" ? 0.85 : 0.65,
  }))

  return [...sitePages, ...docsPages]
}
