import { ServersPage } from "@/components/servers/servers-page"
import { serversDictionary } from "@/components/servers/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = serversDictionary["pt-PT"]
export const metadata = pageMetadata("servers", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
  twitterCard: "summary",
})

export default function ServersPtPtPage() {
  return <ServersPage locale="pt-PT" />
}
