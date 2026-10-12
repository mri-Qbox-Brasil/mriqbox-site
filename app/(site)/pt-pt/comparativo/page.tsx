import { ComparisonPage } from "@/components/comparison/comparison-page"
import { comparisonDictionary } from "@/components/comparison/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = comparisonDictionary["pt-PT"]
export const metadata = pageMetadata("comparison", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function ComparativoPtPage() {
  return <ComparisonPage locale="pt-PT" />
}
