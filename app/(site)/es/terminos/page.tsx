import type { Metadata } from "next"
import { TermsPage } from "@/components/terms/terms-page"
import { termsDictionary } from "@/components/terms/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = termsDictionary["es"]
export const metadata: Metadata = {
  ...pageMetadata("terms", "es", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function TermsEsPage() {
  return <TermsPage locale="es" />
}
