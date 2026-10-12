import { ArtifactsPage } from "@/components/artifacts/artifacts-page"
import { artifactsDictionary } from "@/components/artifacts/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = artifactsDictionary["pt-PT"]
export const metadata = pageMetadata("artifacts", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
})

export default function ArtifactsDbPtPtPage() {
  return <ArtifactsPage locale="pt-PT" />
}
