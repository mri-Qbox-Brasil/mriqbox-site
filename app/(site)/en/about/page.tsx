import { AboutPage } from "@/components/about/about-page"
import { aboutDictionary } from "@/components/about/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = aboutDictionary["en"]
export const metadata = pageMetadata("about", "en", { ...meta, twitterCard: "summary" })

export default function AboutEnPage() {
  return <AboutPage locale="en" />
}
