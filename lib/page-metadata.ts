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

// O Next nao mescla openGraph/twitter da pagina com o do layout: quem define o
// objeto perde as images herdadas. Por isso toda pagina repete o card gerado
// em app/opengraph-image.tsx.
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: "MRI Qbox Brasil — Framework FiveM Open Source" }

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
      images: [OG_IMAGE],
    },
    twitter: { card: meta.twitterCard ?? "summary_large_image", title: ogTitle, description: ogDescription, images: [OG_IMAGE] },
  }
}
