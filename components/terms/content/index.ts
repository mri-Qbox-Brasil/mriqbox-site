import type { Locale } from "@/lib/i18n"
import { ptBR, type TermsDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"
import { es } from "./es"
import { en } from "./en"

export type { TermsDictionary }

// Month of the last terms change (YYYY-MM), shown at the top in every locale.
export const TERMS_UPDATED = "2026-05"

export const termsDictionary: Record<Locale, TermsDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
