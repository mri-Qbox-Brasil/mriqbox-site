import { ServersPage } from "@/components/servers/servers-page"
import { serversDictionary } from "@/components/servers/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = serversDictionary["en"]
export const metadata = pageMetadata("servers", "en", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function ServersEnPage() {
  return <ServersPage locale="en" />
}
