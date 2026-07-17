import { docs } from "@/.source/server"
import { loader } from "fumadocs-core/source"

// Carrega o conteúdo MDX gerado (.source) e expõe a árvore de páginas,
// getPage, generateParams etc. baseUrl casa com a rota app/docs.
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
})
