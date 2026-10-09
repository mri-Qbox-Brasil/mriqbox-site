import { SupportPage } from "@/components/support/support-page"
import { supportMetadata } from "@/lib/support-metadata"

export const metadata = supportMetadata("en")

export default function SupportEnPage() {
  return <SupportPage locale="en" />
}
