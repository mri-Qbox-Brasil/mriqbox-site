import { SupportPage } from "@/components/support/support-page"
import { supportDictionary } from "@/components/support/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = supportDictionary["en"]
export const metadata = pageMetadata("support", "en", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function SupportEnPage() {
  return <SupportPage locale="en" />
}
