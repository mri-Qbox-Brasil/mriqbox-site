import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServerCard } from "@/components/server-card"
import { breadcrumb, jsonLd } from "@/lib/schema"
import { mriServers, mriServersUpdatedAt, totalPlayers, totalServers } from "@/lib/mri-servers"

export const metadata: Metadata = {
  title: "Servidores que usam a MRI Qbox | FiveM",
  description:
    "Servidores FiveM que usam scripts da MRI Qbox Brasil, com jogadores conectados agora e os recursos MRI de cada um.",
  alternates: { canonical: "/servidores" },
  openGraph: {
    title: "Servidores que usam a MRI Qbox",
    description: "Servidores FiveM rodando scripts da MRI Qbox Brasil agora.",
    url: "/servidores",
    type: "website",
  },
  twitter: { card: "summary", title: "Servidores que usam a MRI Qbox" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Servidores", path: "/servidores" },
])

const fmtUpdated = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  })

export default function ServidoresPage() {
  const online = mriServers.filter((s) => s.players > 0)
  const offline = mriServers.filter((s) => s.players === 0)

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-primary mb-4 uppercase tracking-wider font-mono font-bold">
            <Server className="w-4 h-4" />
            <span>Servidores</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Servidores que usam a MRI Qbox
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">{totalServers.toLocaleString("pt-BR")} servidores</strong> usam
            algum script da MRI Qbox, com{" "}
            <strong className="text-foreground">{totalPlayers.toLocaleString("pt-BR")} jogadores</strong>{" "}
            conectados agora. Cada servidor entra uma vez, mesmo usando vários scripts.
          </p>
          <p className="text-xs text-muted-foreground/70 mt-3">
            Dados do{" "}
            <a href="https://5metrics.dev" target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
              5metrics
            </a>
            , atualizados a cada 3 horas. Última atualização: {fmtUpdated(mriServersUpdatedAt)}.
          </p>
        </div>

        {online.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-5">
              Com jogadores agora <span className="text-muted-foreground font-normal">({online.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {online.map((s) => (
                <ServerCard key={s.id} server={s} />
              ))}
            </div>
          </section>
        )}

        {offline.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5">
              Sem jogadores no momento <span className="text-muted-foreground font-normal">({offline.length})</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {offline.map((s) => (
                <ServerCard key={s.id} server={s} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
