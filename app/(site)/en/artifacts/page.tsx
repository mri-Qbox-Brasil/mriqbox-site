import { ArtifactsPage } from "@/components/artifacts/artifacts-page"
import { artifactsDictionary } from "@/components/artifacts/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = artifactsDictionary["en"]
export const metadata = pageMetadata("artifacts", "en", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
})

export default function ArtifactsDbEnPage() {
  return <ArtifactsPage locale="en" />
}
