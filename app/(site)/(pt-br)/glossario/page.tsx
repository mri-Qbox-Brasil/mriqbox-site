import { GlossaryPage } from "@/components/glossary/glossary-page"
import { glossaryDictionary } from "@/components/glossary/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = glossaryDictionary["pt-BR"]
export const metadata = pageMetadata("glossary", "pt-BR", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function GlossarioPage() {
  return <GlossaryPage locale="pt-BR" />
}
