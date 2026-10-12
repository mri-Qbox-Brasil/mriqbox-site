import { WhyMriPage } from "@/components/why-mri/why-mri-page"
import { whyMriDictionary } from "@/components/why-mri/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = whyMriDictionary["pt-BR"]
export const metadata = pageMetadata("whyMri", "pt-BR", { ...meta, type: "article" })

export default function PorQueMriPage() {
  return <WhyMriPage locale="pt-BR" />
}
