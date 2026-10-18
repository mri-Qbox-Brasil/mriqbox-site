"use client"

import Link from "next/link"
import { AlertTriangle, ArrowLeft, CheckCircle2, Download, Monitor, Server } from "lucide-react"
import { Github } from "@/components/icons/github"
import { Button } from "@/components/ui/button"
import { parseArtifactsDb, type ArtifactsDb } from "@/lib/artifacts-db"
import { ROUTES, type Locale } from "@/lib/i18n"
import { DATA_BRANCH_URL, useLiveData } from "@/lib/live-data"
import { ArtifactsDebugList } from "./artifacts-debug-list"
import { ARTIFACTS_DB_REPO_URL, ARTIFACTS_DB_SITE_URL, artifactsDictionary } from "./dictionary"

export function ArtifactsView({ initial, locale }: { initial: ArtifactsDb; locale: Locale }) {
  const t = artifactsDictionary[locale]
  const artifacts = useLiveData(`${DATA_BRANCH_URL}/artifacts.json`, initial, parseArtifactsDb)
  const downloads = [
    { id: "windows", name: "Windows", href: artifacts.windowsDownloadLink, icon: <Monitor className="h-5 w-5" /> },
    { id: "linux", name: "Linux", href: artifacts.linuxDownloadLink, icon: <Server className="h-5 w-5" /> },
  ]

  return (
    <main className="container mx-auto max-w-5xl px-4 pb-12 pt-8 md:pt-10">
      <Button variant="ghost" size="sm" asChild className="mb-6">
        <Link href={ROUTES.home[locale]}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t.back}
        </Link>
      </Button>

      <header className="mb-8 border-b border-white/10 pb-8">
        <h1 className="text-5xl font-black leading-none tracking-[-0.055em] text-white md:text-6xl">{t.title}</h1>
        <div className="mt-5 flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary">
          <span className={`h-2 w-2 rounded-full ${artifacts.synced ? "bg-primary" : "bg-amber-400"}`} />
          {artifacts.synced ? t.status.synced : t.status.fallback}
        </div>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{t.intro}</p>
      </header>

      <section className="mb-9 grid gap-3 md:grid-cols-[1.35fr_0.65fr]">
        <div className="rounded-xl border border-primary/30 bg-primary/[0.06] px-6 py-5 md:px-7">
          <span className="text-[10px] font-black uppercase tracking-[0.18em] text-primary">{t.recommended.label}</span>
          <div className="mt-2 flex flex-wrap items-end gap-3">
            <strong className="text-5xl font-black leading-none tracking-[-0.06em] text-white md:text-6xl">
              {artifacts.synced ? artifacts.recommendedArtifact : t.recommended.notAvailable}
            </strong>
            <span className={`mb-1 flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold ${artifacts.synced ? "bg-primary/10 text-primary" : "bg-amber-400/10 text-amber-400"}`}>
              {artifacts.synced ? <CheckCircle2 className="h-3.5 w-3.5" /> : <AlertTriangle className="h-3.5 w-3.5" />}
              {artifacts.synced ? t.recommended.stable : t.recommended.unavailable}
            </span>
          </div>
          <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground md:text-sm">
            {artifacts.synced ? t.recommended.syncedNote : t.recommended.fallbackNote}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-xl border border-white/10 bg-card px-6 py-5">
          <div>
            <span className="text-[10px] font-black uppercase tracking-[0.18em] text-muted-foreground">{t.issues.label}</span>
            <strong className="mt-2 block text-4xl font-black leading-none tracking-tight text-white">
              {artifacts.brokenArtifacts.length.toLocaleString(locale)}
            </strong>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{t.issues.note}</p>
          </div>
          <Link href={ARTIFACTS_DB_REPO_URL} target="_blank" rel="noopener noreferrer" className="mt-4 flex items-center gap-2 text-xs font-semibold text-primary hover:underline">
            <Github className="h-4 w-4" /> {t.issues.source}
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-5 text-2xl font-bold text-white">{t.download.title}</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {downloads.map((item) => (
            <Link key={item.id} href={item.href} className="group flex items-center justify-between rounded-xl border border-white/10 bg-card p-5 transition-colors hover:border-primary/30" target="_blank" rel="noopener noreferrer">
              <div className="flex items-center gap-4"><span className="rounded-lg bg-primary/10 p-3 text-primary">{item.icon}</span><div><strong className="block text-white">{item.name}</strong><span className="text-xs text-muted-foreground">{t.download.build}</span></div></div>
              <Download className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      <ArtifactsDebugList artifacts={artifacts.brokenArtifacts} locale={locale} labels={t.list} sourceUrl={ARTIFACTS_DB_SITE_URL} />
    </main>
  )
}
