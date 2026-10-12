import { GlossaryPage } from "@/components/glossary/glossary-page"
import { glossaryDictionary } from "@/components/glossary/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = glossaryDictionary["es"]
export const metadata = pageMetadata("glossary", "es", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function GlosarioPage() {
  return <GlossaryPage locale="es" />
}
