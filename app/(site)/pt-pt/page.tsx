import { HomePage, homeMetadata } from "@/components/home/home-page"

export const metadata = homeMetadata("pt-PT")

export default function PortugueseHomePage() {
  return <HomePage locale="pt-PT" />
}
