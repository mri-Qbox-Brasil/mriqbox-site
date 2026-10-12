import { GlossaryPage } from "@/components/glossary/glossary-page"
import { glossaryDictionary } from "@/components/glossary/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = glossaryDictionary["en"]
export const metadata = pageMetadata("glossary", "en", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  type: "article",
})

export default function GlossaryEnPage() {
  return <GlossaryPage locale="en" />
}
