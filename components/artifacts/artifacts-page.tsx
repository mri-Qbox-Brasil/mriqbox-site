import { breadcrumb, jsonLd } from "@/lib/schema"
import { getArtifactsDb } from "@/lib/artifacts-db"
import { ROUTES, type Locale } from "@/lib/i18n"
import { ArtifactsView } from "./artifacts-view"
import { artifactsDictionary } from "./dictionary"

export async function ArtifactsPage({ locale }: { locale: Locale }) {
  const t = artifactsDictionary[locale]
  const artifacts = await getArtifactsDb()
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.title, path: ROUTES.artifacts[locale] },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <ArtifactsView initial={artifacts} locale={locale} />
    </div>
  )
}
