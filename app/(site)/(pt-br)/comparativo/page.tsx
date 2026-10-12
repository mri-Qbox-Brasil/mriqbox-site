import { ComparisonPage } from "@/components/comparison/comparison-page"
import { comparisonDictionary } from "@/components/comparison/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = comparisonDictionary["pt-BR"]
export const metadata = pageMetadata("comparison", "pt-BR", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function ComparativoPage() {
  return <ComparisonPage locale="pt-BR" />
}
