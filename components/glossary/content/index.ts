import type { Locale } from "@/lib/i18n"
import { ptBR, type GlossaryDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"
import { es } from "./es"
import { en } from "./en"

export type { GlossaryDictionary, GlossaryEntry } from "./pt-BR"

export const glossaryDictionary: Record<Locale, GlossaryDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
