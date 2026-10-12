import type { Locale } from "@/lib/i18n"
import { ptBR, type PrivacyDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"
import { es } from "./es"
import { en } from "./en"

export type { PrivacyDictionary }

// Month of the last policy change (YYYY-MM), shown at the top in every locale.
export const PRIVACY_UPDATED = "2026-09"

export const privacyDictionary: Record<Locale, PrivacyDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
