import Link from "next/link"
import { ArrowLeft, Heart, Server } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServerCard } from "@/components/server-card"
import { breadcrumb, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale } from "@/lib/i18n"
import { mriServers, mriServersUpdatedAt, totalPlayers, totalServers, type MriServer } from "@/lib/mri-servers"
import { FIVEMETRICS_URL, formatUpdatedAt, serversDictionary } from "./dictionary"

function ServerGrid({ servers, locale }: { servers: MriServer[]; locale: Locale }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {servers.map((s) => (
        <ServerCard key={s.id} server={s} locale={locale} />
      ))}
    </div>
  )
}

export function ServersPage({ locale }: { locale: Locale }) {
  const t = serversDictionary[locale]
  const online = mriServers.filter((s) => s.players > 0)
  const offline = mriServers.filter((s) => s.players === 0)
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.eyebrow, path: ROUTES.servers[locale] },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={ROUTES.home[locale]}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>

        <div className="max-w-3xl mb-10">
          <div className="flex items-center gap-2 text-xs text-primary mb-4 uppercase tracking-wider font-mono font-bold">
            <Server className="w-4 h-4" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{t.title}</h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            <strong className="text-foreground">
              {totalServers.toLocaleString(locale)} {t.intro.serversUnit}
            </strong>
            {t.intro.middle}
            <strong className="text-foreground">
              {totalPlayers.toLocaleString(locale)} {t.intro.playersUnit}
            </strong>
            {t.intro.after}
          </p>
          <p className="text-xs text-muted-foreground/70 mt-3">
            {t.source.before}
            <a href={FIVEMETRICS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white underline">
              5metrics
            </a>
            {t.source.after}
            {formatUpdatedAt(mriServersUpdatedAt, locale)}
            {t.source.end}
          </p>
        </div>

        {/* Servers are detected only by the original resource name, so this list is who kept the credits. */}
        <div className="mb-12 flex gap-4 rounded-2xl border border-primary/30 bg-primary/5 p-6">
          <Heart className="h-6 w-6 shrink-0 text-primary" />
          <div>
            <h2 className="font-bold text-foreground mb-1">{t.thanks.title}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">{t.thanks.text}</p>
          </div>
        </div>

        {online.length > 0 && (
          <section className="mb-14">
            <h2 className="text-xl font-bold text-foreground mb-5">
              {t.online} <span className="text-muted-foreground font-normal">({online.length.toLocaleString(locale)})</span>
            </h2>
            <ServerGrid servers={online} locale={locale} />
          </section>
        )}

        {offline.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-foreground mb-5">
              {t.offline} <span className="text-muted-foreground font-normal">({offline.length.toLocaleString(locale)})</span>
            </h2>
            <ServerGrid servers={offline} locale={locale} />
          </section>
        )}
      </div>
    </div>
  )
}
