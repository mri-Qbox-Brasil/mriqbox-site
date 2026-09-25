import { source } from "@/lib/source"
import { createFromSource } from "fumadocs-core/search/server"

// Busca Orama, sem Algolia. Conteúdo em pt-BR: usa o stemmer português (melhora
// a relevância vs o default english).
//
// - Vercel: busca no servidor — o browser manda a query e recebe só os
//   resultados. O índice estático passou do limite de 19 MB por página
//   pré-renderizada da Vercel depois que os ~120 manuais entraram.
// - GitHub Pages (output: export): não há servidor, então o índice é gerado no
//   build e a busca roda no browser.
const search = createFromSource(source, {
  language: "portuguese",
})

// Exigido pelo output: export (GitHub Pages). Na Vercel o GET le a query da
// request, entao a rota continua dinamica.
export const revalidate = false

export const GET = process.env.GITHUB_PAGES === "true" ? search.staticGET : search.GET
