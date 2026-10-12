import { AboutPage } from "@/components/about/about-page"
import { aboutDictionary } from "@/components/about/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = aboutDictionary["pt-BR"]
export const metadata = pageMetadata("about", "pt-BR", { ...meta, twitterCard: "summary" })

export default function SobrePage() {
  return <AboutPage locale="pt-BR" />
}
