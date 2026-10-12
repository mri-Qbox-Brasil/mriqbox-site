import { ArtifactsPage } from "@/components/artifacts/artifacts-page"
import { artifactsDictionary } from "@/components/artifacts/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = artifactsDictionary["es"]
export const metadata = pageMetadata("artifacts", "es", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
})

export default function ArtifactsDbEsPage() {
  return <ArtifactsPage locale="es" />
}
