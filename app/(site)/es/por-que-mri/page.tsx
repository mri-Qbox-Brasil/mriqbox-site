import { WhyMriPage } from "@/components/why-mri/why-mri-page"
import { whyMriDictionary } from "@/components/why-mri/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = whyMriDictionary["es"]
export const metadata = pageMetadata("whyMri", "es", { ...meta, type: "article" })

export default function PorQueMriEsPage() {
  return <WhyMriPage locale="es" />
}
