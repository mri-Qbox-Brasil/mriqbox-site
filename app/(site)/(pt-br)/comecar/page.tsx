import { ArtifactsPage } from "@/components/artifacts/artifacts-page"
import { artifactsDictionary } from "@/components/artifacts/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = artifactsDictionary["pt-BR"]
export const metadata = pageMetadata("artifacts", "pt-BR", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
})

export default function ArtifactsDbPage() {
  return <ArtifactsPage locale="pt-BR" />
}
