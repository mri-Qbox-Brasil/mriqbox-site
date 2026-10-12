import { ComparisonPage } from "@/components/comparison/comparison-page"
import { comparisonDictionary } from "@/components/comparison/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = comparisonDictionary["en"]
export const metadata = pageMetadata("comparison", "en", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function ComparisonEnPage() {
  return <ComparisonPage locale="en" />
}
