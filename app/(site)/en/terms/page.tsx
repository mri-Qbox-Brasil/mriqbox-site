import type { Metadata } from "next"
import { TermsPage } from "@/components/terms/terms-page"
import { termsDictionary } from "@/components/terms/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = termsDictionary["en"]
export const metadata: Metadata = {
  ...pageMetadata("terms", "en", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function TermsEnPage() {
  return <TermsPage locale="en" />
}
