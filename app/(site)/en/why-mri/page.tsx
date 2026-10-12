import { WhyMriPage } from "@/components/why-mri/why-mri-page"
import { whyMriDictionary } from "@/components/why-mri/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = whyMriDictionary["en"]
export const metadata = pageMetadata("whyMri", "en", { ...meta, type: "article" })

export default function WhyMriEnPage() {
  return <WhyMriPage locale="en" />
}
