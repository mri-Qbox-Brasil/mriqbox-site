import { SupportPage } from "@/components/support/support-page"
import { supportDictionary } from "@/components/support/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = supportDictionary["pt-PT"]
export const metadata = pageMetadata("support", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function ApoiePtPage() {
  return <SupportPage locale="pt-PT" />
}
