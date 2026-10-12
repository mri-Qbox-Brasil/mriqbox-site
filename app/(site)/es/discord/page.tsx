import { DiscordPage } from "@/components/discord/discord-page"
import { discordDictionary } from "@/components/discord/dictionary"
import { pageMetadata } from "@/lib/page-metadata"

const { meta } = discordDictionary["es"]
const base = pageMetadata("discord", "es", {
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle,
  ogDescription: meta.ogDescription,
})
export const metadata = { ...base, twitter: { ...base.twitter, description: meta.twitterDescription } }

export default function DiscordEsPage() {
  return <DiscordPage locale="es" />
}
