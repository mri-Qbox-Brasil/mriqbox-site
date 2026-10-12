import { SupportPage } from "@/components/support/support-page"
import { supportDictionary } from "@/components/support/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = supportDictionary["es"]
export const metadata = pageMetadata("support", "es", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function ApoyanosPage() {
  return <SupportPage locale="es" />
}
