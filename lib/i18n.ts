// Brazilian Portuguese stays at the root URLs; the other locales live under a prefix.
export const locales = ["pt-BR", "pt-PT", "es", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "pt-BR"

export const LOCALE_PREFIXES: Record<Locale, string> = { "pt-BR": "", "pt-PT": "/pt-pt", es: "/es", en: "/en" }

export const LOCALE_NAMES: Record<Locale, string> = {
  "pt-BR": "Português (Brasil)",
  "pt-PT": "Português (Portugal)",
  es: "Español",
  en: "English",
}

export const LOCALE_SHORT: Record<Locale, string> = { "pt-BR": "PT-BR", "pt-PT": "PT-PT", es: "ES", en: "EN" }

export const OG_LOCALES: Record<Locale, string> = { "pt-BR": "pt_BR", "pt-PT": "pt_PT", es: "es_ES", en: "en_US" }

// Path of every site page in each locale; pt-PT reuses the Brazilian slugs.
export const ROUTES = {
  home: { "pt-BR": "/", "pt-PT": "/pt-pt", es: "/es", en: "/en" },
  artifacts: { "pt-BR": "/comecar", "pt-PT": "/pt-pt/comecar", es: "/es/artifacts", en: "/en/artifacts" },
  whyMri: { "pt-BR": "/por-que-mri", "pt-PT": "/pt-pt/por-que-mri", es: "/es/por-que-mri", en: "/en/why-mri" },
  comparison: { "pt-BR": "/comparativo", "pt-PT": "/pt-pt/comparativo", es: "/es/comparativa", en: "/en/comparison" },
  glossary: { "pt-BR": "/glossario", "pt-PT": "/pt-pt/glossario", es: "/es/glosario", en: "/en/glossary" },
  about: { "pt-BR": "/sobre", "pt-PT": "/pt-pt/sobre", es: "/es/sobre-nosotros", en: "/en/about" },
  discord: { "pt-BR": "/discord", "pt-PT": "/pt-pt/discord", es: "/es/discord", en: "/en/discord" },
  servers: { "pt-BR": "/servidores", "pt-PT": "/pt-pt/servidores", es: "/es/servidores", en: "/en/servers" },
  support: { "pt-BR": "/apoie", "pt-PT": "/pt-pt/apoie", es: "/es/apoyanos", en: "/en/support" },
  privacy: { "pt-BR": "/privacidade", "pt-PT": "/pt-pt/privacidade", es: "/es/privacidad", en: "/en/privacy" },
  terms: { "pt-BR": "/termos", "pt-PT": "/pt-pt/termos", es: "/es/terminos", en: "/en/terms" },
} satisfies Record<string, Record<Locale, string>>

export type RouteId = keyof typeof ROUTES

export const routeIds = Object.keys(ROUTES) as RouteId[]

export function localePath(route: RouteId, locale: Locale): string {
  return ROUTES[route][locale]
}

function normalize(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/"
}

export function localeFromPath(pathname: string): Locale {
  const first = `/${normalize(pathname).split("/")[1] ?? ""}`
  return locales.find((locale) => LOCALE_PREFIXES[locale] === first) ?? defaultLocale
}

export function routeFromPath(pathname: string): RouteId | undefined {
  const path = normalize(pathname)
  return routeIds.find((id) => locales.some((locale) => ROUTES[id][locale] === path))
}

// Maps a browser language tag to a site locale (any other Portuguese reads the Brazilian version).
export function localeFromLanguageTag(tag: string): Locale | undefined {
  const lower = tag.toLowerCase()
  if (lower === "pt-pt") return "pt-PT"
  if (lower.startsWith("pt")) return "pt-BR"
  if (lower.startsWith("es")) return "es"
  if (lower.startsWith("en")) return "en"
  return undefined
}
