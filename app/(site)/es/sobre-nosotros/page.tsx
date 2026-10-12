import { AboutPage } from "@/components/about/about-page"
import { aboutDictionary } from "@/components/about/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = aboutDictionary["es"]
export const metadata = pageMetadata("about", "es", { ...meta, twitterCard: "summary" })

export default function SobreNosotrosPage() {
  return <AboutPage locale="es" />
}
