import { LegalPage } from "@/components/legal/legal-page"
import type { Locale } from "@/lib/i18n"
import { PRIVACY_UPDATED, privacyDictionary } from "./content"

export function PrivacyPage({ locale }: { locale: Locale }) {
  return <LegalPage locale={locale} route="privacy" updated={PRIVACY_UPDATED} t={privacyDictionary[locale]} />
}
