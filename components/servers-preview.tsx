import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ServerCard } from "@/components/server-card"
import { mriServers, totalServers } from "@/lib/mri-servers"

const PREVIEW = 6

// Prévia na home: os servidores com mais jogadores agora, com link pra lista
// completa em /servidores.
export function ServersPreview() {
  const top = mriServers.filter((s) => s.players > 0).slice(0, PREVIEW)
  if (!top.length) return null

  return (
    <section className="w-full max-w-5xl mx-auto px-6 pb-16">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold text-white tracking-tight">Servidores rodando MRI agora</h2>
          <p className="text-[15px] text-white/40 mt-2">
            Cidades que usam scripts da MRI Qbox, pelos jogadores conectados.
          </p>
        </div>
        <Link
          href="/servidores"
          className="inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary/80 transition-colors shrink-0"
        >
          Ver todos os {totalServers.toLocaleString("pt-BR")}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {top.map((s) => (
          <ServerCard key={s.id} server={s} />
        ))}
      </div>
    </section>
  )
}
