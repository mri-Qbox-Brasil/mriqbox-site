import { LegalPage } from "@/components/legal/legal-page"
import type { Locale } from "@/lib/i18n"
import { TERMS_UPDATED, termsDictionary } from "./content"

export function TermsPage({ locale }: { locale: Locale }) {
  return <LegalPage locale={locale} route="terms" updated={TERMS_UPDATED} t={termsDictionary[locale]} />
}
