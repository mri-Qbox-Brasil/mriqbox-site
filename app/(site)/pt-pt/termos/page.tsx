import type { Metadata } from "next"
import { TermsPage } from "@/components/terms/terms-page"
import { termsDictionary } from "@/components/terms/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = termsDictionary["pt-PT"]
export const metadata: Metadata = {
  ...pageMetadata("terms", "pt-PT", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function TermsPtPtPage() {
  return <TermsPage locale="pt-PT" />
}
