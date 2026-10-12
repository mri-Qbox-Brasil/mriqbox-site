"use client"

import Link from "next/link"
import { useSyncExternalStore } from "react"
import { X } from "lucide-react"
import { localeFromLanguageTag, type Locale } from "@/lib/i18n"
import { siteDictionary } from "@/components/site/dictionary"
import { LOCALE_STORAGE_KEY, rememberLocale, useLocaleHref } from "@/components/site/language-switcher"

const EVENT = "mriqbox-locale-change"

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback)
  return () => window.removeEventListener(EVENT, callback)
}

// Browser language as a site locale, unless the visitor already picked or dismissed one.
function getSnapshot(): Locale | null {
  try {
    if (localStorage.getItem(LOCALE_STORAGE_KEY)) return null
  } catch {
    return null
  }
  for (const tag of navigator.languages ?? [navigator.language]) {
    const locale = localeFromLanguageTag(tag)
    if (locale) return locale
  }
  return "en"
}

export function LanguageSuggest({ current }: { current: Locale }) {
  const preferred = useSyncExternalStore(subscribe, getSnapshot, () => null)
  const hrefFor = useLocaleHref()
  if (!preferred || preferred === current) return null

  const t = siteDictionary[preferred].suggest
  const settle = (locale: Locale) => {
    rememberLocale(locale)
    window.dispatchEvent(new Event(EVENT))
  }

  return (
    <div
      lang={preferred}
      className="fixed top-[100px] left-1/2 -translate-x-1/2 z-40 w-[calc(100%-32px)] max-w-md flex items-center gap-3 rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl px-4 py-3 shadow-2xl text-sm"
    >
      <span className="flex-1 text-muted-foreground">{t.text}</span>
      <Link
        href={hrefFor(preferred)}
        hrefLang={preferred}
        onClick={() => settle(preferred)}
        className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:bg-primary/90 transition-colors"
      >
        {t.action}
      </Link>
      <button
        type="button"
        onClick={() => settle(current)}
        aria-label={t.dismiss}
        className="shrink-0 rounded-full p-1 text-muted-foreground hover:text-white hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  )
}
