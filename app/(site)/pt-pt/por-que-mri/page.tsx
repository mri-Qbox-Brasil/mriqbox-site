import { WhyMriPage } from "@/components/why-mri/why-mri-page"
import { whyMriDictionary } from "@/components/why-mri/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = whyMriDictionary["pt-PT"]
export const metadata = pageMetadata("whyMri", "pt-PT", { ...meta, type: "article" })

export default function PorQueMriPtPage() {
  return <WhyMriPage locale="pt-PT" />
}
