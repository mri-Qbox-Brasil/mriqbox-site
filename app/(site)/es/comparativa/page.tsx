import { ComparisonPage } from "@/components/comparison/comparison-page"
import { comparisonDictionary } from "@/components/comparison/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = comparisonDictionary["es"]
export const metadata = pageMetadata("comparison", "es", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function ComparativaPage() {
  return <ComparisonPage locale="es" />
}
