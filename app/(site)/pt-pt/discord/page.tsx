import { DiscordPage } from "@/components/discord/discord-page"
import { discordDictionary } from "@/components/discord/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = discordDictionary["pt-PT"]
const base = pageMetadata("discord", "pt-PT", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
})
export const metadata = { ...base, twitter: { ...base.twitter, description: meta.twitterDescription } }

export default function DiscordPtPtPage() {
  return <DiscordPage locale="pt-PT" />
}
