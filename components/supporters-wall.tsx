import type { Locale } from "@/lib/i18n"
import { getSupporters } from "@/lib/supporters"
import { LiveSupporters } from "./live-supporters"

export async function SupportersWall({ locale }: { locale: Locale }) {
  return <LiveSupporters initial={await getSupporters()} locale={locale} />
}
