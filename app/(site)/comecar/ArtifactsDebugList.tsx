"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AlertTriangle, ExternalLink, Search, X } from "lucide-react"
import type { BrokenArtifact } from "@/lib/artifacts-db"

export function ArtifactsDebugList({ artifacts }: { artifacts: BrokenArtifact[] }) {
  const [query, setQuery] = useState("")

  const filteredArtifacts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR")
    if (!normalizedQuery) return artifacts

    return artifacts.filter((item) =>
      `${item.artifact} ${item.reason}`.toLocaleLowerCase("pt-BR").includes(normalizedQuery),
    )
  }, [artifacts, query])

  return (
    <section>
      <div className="mb-5 flex flex-col gap-4">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-2xl font-bold text-white">Debug de versões</h2>
            <p className="mt-2 text-sm text-muted-foreground">Artefatos com falhas conhecidas e os motivos registrados pela comunidade.</p>
          </div>
          <Link href="https://artifacts.jgscripts.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
            Abrir base original <ExternalLink className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative max-w-md">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar versão ou problema..."
            aria-label="Buscar na lista de artefatos"
            className="h-11 w-full rounded-lg border border-white/10 bg-card pl-10 pr-11 text-sm text-white outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Limpar busca"
              className="absolute right-2 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-white/5 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {filteredArtifacts.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-white/10">
          {filteredArtifacts.map((item) => (
            <div key={`${item.artifact}-${item.reason}`} className="grid gap-2 border-b border-white/10 bg-card p-5 last:border-b-0 md:grid-cols-[180px_1fr]">
              <div className="flex items-center gap-2 font-mono font-bold text-amber-400"><AlertTriangle className="h-4 w-4 shrink-0" />{item.artifact}</div>
              <p className="text-sm leading-relaxed text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-white/10 bg-card p-6 text-sm text-muted-foreground">
          {artifacts.length === 0
            ? "A lista de debug não pôde ser carregada agora."
            : `Nenhum artefato encontrado para “${query.trim()}”.`}
        </div>
      )}
    </section>
  )
}
