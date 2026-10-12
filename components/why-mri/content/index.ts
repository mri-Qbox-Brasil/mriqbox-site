import type { Locale } from "@/lib/i18n"
import { en } from "./en"
import { es } from "./es"
import { ptBR, type WhyMriDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"

export type { WhyMriDictionary } from "./pt-BR"

export const whyMriDictionary: Record<Locale, WhyMriDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
