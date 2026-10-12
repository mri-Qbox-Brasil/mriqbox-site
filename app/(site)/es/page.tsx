import { HomePage, homeMetadata } from "@/components/home/home-page"

export const metadata = homeMetadata("es")

export default function SpanishHomePage() {
  return <HomePage locale="es" />
}
