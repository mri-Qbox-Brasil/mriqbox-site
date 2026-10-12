import { AboutPage } from "@/components/about/about-page"
import { aboutDictionary } from "@/components/about/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = aboutDictionary["pt-PT"]
export const metadata = pageMetadata("about", "pt-PT", { ...meta, twitterCard: "summary" })

export default function SobrePtPage() {
  return <AboutPage locale="pt-PT" />
}
