import type { Metadata } from "next"
import { OG_LOCALES, ROUTES, locales, type Locale, type RouteId } from "@/lib/i18n"

export type PageMeta = {
  title: string
  description: string
  ogTitle?: string
  ogDescription?: string
  type?: "website" | "article"
  twitterCard?: "summary" | "summary_large_image"
}

export function pageMetadata(route: RouteId, locale: Locale, meta: PageMeta): Metadata {
  const path = ROUTES[route][locale]
  const ogTitle = meta.ogTitle ?? meta.title
  const ogDescription = meta.ogDescription ?? meta.description
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, ROUTES[route][l]])),
        "x-default": ROUTES[route]["pt-BR"],
      },
    },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: path,
      type: meta.type ?? "website",
      locale: OG_LOCALES[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => OG_LOCALES[l]),
    },
    twitter: { card: meta.twitterCard ?? "summary_large_image", title: ogTitle, description: ogDescription },
  }
}
