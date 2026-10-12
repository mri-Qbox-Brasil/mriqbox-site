import type { Metadata } from "next"
import { TermsPage } from "@/components/terms/terms-page"
import { termsDictionary } from "@/components/terms/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = termsDictionary["pt-BR"]
export const metadata: Metadata = {
  ...pageMetadata("terms", "pt-BR", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function TermosPage() {
  return <TermsPage locale="pt-BR" />
}
