import type { Metadata } from "next"
import { PrivacyPage } from "@/components/privacy/privacy-page"
import { privacyDictionary } from "@/components/privacy/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = privacyDictionary["pt-BR"]
export const metadata: Metadata = {
  ...pageMetadata("privacy", "pt-BR", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function PrivacidadePage() {
  return <PrivacyPage locale="pt-BR" />
}
