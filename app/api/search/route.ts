import { source } from "@/lib/source"
import { createFromSource } from "fumadocs-core/search/server"

// Busca Orama estática — o índice é gerado no build e a busca roda no browser
// (compatível com output: export). Sem Algolia.
export const revalidate = false

export const { staticGET: GET } = createFromSource(source)
