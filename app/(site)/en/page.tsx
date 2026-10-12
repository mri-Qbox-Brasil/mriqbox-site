import { HomePage, homeMetadata } from "@/components/home/home-page"

export const metadata = homeMetadata("en")

export default function EnglishHomePage() {
  return <HomePage locale="en" />
}
