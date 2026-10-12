import { SupportPage } from "@/components/support/support-page"
import { supportDictionary } from "@/components/support/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = supportDictionary["pt-BR"]
export const metadata = pageMetadata("support", "pt-BR", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function ApoiePage() {
  return <SupportPage locale="pt-BR" />
}
