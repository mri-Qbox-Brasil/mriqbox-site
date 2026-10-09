import { SupportPage } from "@/components/support/support-page"
import { supportMetadata } from "@/lib/support-metadata"

export const metadata = supportMetadata("pt-BR")

export default function ApoiePage() {
  return <SupportPage locale="pt-BR" />
}
