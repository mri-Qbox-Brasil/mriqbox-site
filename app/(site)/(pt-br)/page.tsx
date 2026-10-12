import { HomePage, homeMetadata } from "@/components/home/home-page"

export const metadata = homeMetadata("pt-BR")

export default function BrazilianHomePage() {
  return <HomePage locale="pt-BR" />
}
