import type { Metadata } from "next"
import { PrivacyPage } from "@/components/privacy/privacy-page"
import { privacyDictionary } from "@/components/privacy/content"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = privacyDictionary["en"]
export const metadata: Metadata = {
  ...pageMetadata("privacy", "en", { title: meta.title, description: meta.description, twitterCard: "summary" }),
  robots: { index: true, follow: true },
}

export default function PrivacyEnPage() {
  return <PrivacyPage locale="en" />
}
