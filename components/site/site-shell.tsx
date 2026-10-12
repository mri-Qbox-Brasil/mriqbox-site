import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LanguageSuggest } from "@/components/site/language-suggest"
import type { Locale } from "@/lib/i18n"

// Site chrome per locale; /docs keeps its own Fumadocs layout outside the (site) group.
export function SiteShell({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <div lang={locale}>
      <Navbar locale={locale} />
      <LanguageSuggest current={locale} />
      {children}
      <Footer locale={locale} />
    </div>
  )
}
