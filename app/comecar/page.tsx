import type { Metadata } from "next"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, CheckCircle2, Download, ExternalLink, Github, Monitor, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { breadcrumb, jsonLd } from "@/lib/schema"
import { getArtifactsDb } from "@/lib/artifacts-db"

export const metadata: Metadata = {
  title: "Artifacts DB FiveM | MRI Qbox Brasil",
  description: "Consulte o artefato FXServer recomendado, baixe as versões para Windows ou Linux e veja builds com problemas conhecidos.",
  alternates: { canonical: "/comecar" },
  openGraph: {
    title: "Artifacts DB FiveM | MRI Qbox Brasil",
    description: "Versões do FXServer sincronizadas com o banco de artefatos mantido pelo JG Scripts.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Artifacts DB FiveM | MRI Qbox Brasil" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Artifacts DB", path: "/comecar" },
])

export default async function ArtifactsDbPage() {
  const artifacts = await getArtifactsDb()

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />

      <main className="container mx-auto max-w-5xl px-4 pb-12 pt-8 md:pt-10">
        <Button variant="ghost" size="sm" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>

        <header className="mb-8 border-b border-white/10 pb-8">
          <h1 className="text-5xl font-black leading-none tracking-[-0.055em] text-white md:text-6xl">Artifacts DB</h1>
          <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
            <span className={`h-2 w-2 rounded-full ${artifacts.synced ? "bg-primary" : "bg-amber-400"}`} />
            {artifacts.synced ? "Sincronizado com JG Scripts" : "Exibindo dados de segurança"}
          </div>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Consulte a versão estável recomendada do FXServer e confira os artefatos com problemas conhecidos antes de atualizar seu servidor.
          </p>
        </header>

        <section className="mb-9 grid gap-3 md:grid-cols-[1.35fr_0.65fr]">
          <div className="rounded-xl border border-primary/30 bg-primary/[0.06] px-6 py-5 md:px-7">
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">Versão recomendada</span>
            <div className="mt-2 flex flex-wrap items-end gap-3">
              <strong className="text-5xl font-black leading-none tracking-[-0.06em] text-white md:text-6xl">{artifacts.recommendedArtifact}</strong>
              <span className={`mb-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${artifacts.synced ? "bg-primary/10 text-primary" : "bg-amber-400/10 text-amber-400"}`}>
                {artifacts.synced ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
                {artifacts.synced ? "Estável" : "Indisponível"}
              </span>
            </div>
            <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
              {artifacts.synced
                ? "Build mais recente sem falhas conhecidas registradas no FiveM Artifacts DB."
                : "A sincronização está temporariamente indisponível. Consulte a fonte original antes de escolher uma versão."}
            </p>
          </div>

          <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-card px-6 py-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">Problemas catalogados</span>
              <strong className="mt-2 block text-4xl font-black leading-none tracking-tight text-white">{artifacts.brokenArtifacts.length}</strong>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Versões ou intervalos documentados na base atual.</p>
            </div>
            <Link href="https://github.com/jgscripts/fivem-artifacts-db" target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
              <Github className="h-4 w-4" /> Ver fonte no GitHub
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-5 text-2xl font-bold text-white">Baixar FXServer recomendado</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link href={artifacts.windowsDownloadLink} className="group flex items-center justify-between rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-primary/30" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-4"><span className="rounded-lg bg-primary/10 p-3 text-primary"><Monitor className="h-5 w-5" /></span><div><strong className="block text-white">Windows</strong><span className="text-xs text-muted-foreground">Build recomendada</span></div></div>
              <Download className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
            <Link href={artifacts.linuxDownloadLink} className="group flex items-center justify-between rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-primary/30" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-4"><span className="rounded-lg bg-primary/10 p-3 text-primary"><Server className="h-5 w-5" /></span><div><strong className="block text-white">Linux</strong><span className="text-xs text-muted-foreground">Build recomendada</span></div></div>
              <Download className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          </div>
        </section>

        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div><h2 className="text-2xl font-bold text-white">Debug de versões</h2><p className="mt-2 text-sm text-muted-foreground">Artefatos com falhas conhecidas e os motivos registrados pela comunidade.</p></div>
            <Link href="https://artifacts.jgscripts.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-semibold text-primary hover:underline">Abrir base original <ExternalLink className="h-4 w-4" /></Link>
          </div>

          {artifacts.brokenArtifacts.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-white/10">
              {artifacts.brokenArtifacts.map((item) => (
                <div key={`${item.artifact}-${item.reason}`} className="grid gap-2 border-b border-white/10 bg-card p-5 last:border-b-0 md:grid-cols-[180px_1fr]">
                  <div className="flex items-center gap-2 font-mono font-bold text-amber-400"><AlertTriangle className="h-4 w-4 shrink-0" />{item.artifact}</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.reason}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-white/10 bg-card p-6 text-sm text-muted-foreground">
              A lista de debug não pôde ser carregada agora. A versão de segurança acima continua disponível.
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
