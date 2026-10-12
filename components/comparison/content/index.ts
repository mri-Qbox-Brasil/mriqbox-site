import type { Locale } from "@/lib/i18n"
import { ptBR, type ComparisonDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"
import { es } from "./es"
import { en } from "./en"

export type { ComparisonCell, ComparisonDictionary } from "./pt-BR"

export const comparisonDictionary: Record<Locale, ComparisonDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
