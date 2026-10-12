import type { Locale } from "@/lib/i18n"
import { ptBR, type HomeDictionary } from "./pt-BR"
import { ptPT } from "./pt-PT"
import { es } from "./es"
import { en } from "./en"

export type { HomeDictionary, MockupDictionary, FeedbackId, FeedbackRole } from "./pt-BR"

export const homeDictionary: Record<Locale, HomeDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
