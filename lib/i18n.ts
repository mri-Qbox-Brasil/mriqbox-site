// Portuguese stays at the root URLs; English pages live under /en.
export const locales = ["pt-BR", "en"] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = "pt-BR"
