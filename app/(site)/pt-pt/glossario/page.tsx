import { GlossaryPage } from "@/components/glossary/glossary-page"
import { glossaryDictionary } from "@/components/glossary/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = glossaryDictionary["pt-PT"]
export const metadata = pageMetadata("glossary", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function GlossarioPtPage() {
  return <GlossaryPage locale="pt-PT" />
}
