"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Check, ChevronDown, Globe } from "lucide-react"
import { LOCALE_NAMES, LOCALE_SHORT, ROUTES, locales, routeFromPath, type Locale } from "@/lib/i18n"

export const LOCALE_STORAGE_KEY = "mriqbox-locale"

export function rememberLocale(locale: Locale) {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  } catch {}
}

// Same page in another locale, or that locale's home when the page has no translation (e.g. docs).
export function useLocaleHref() {
  const route = routeFromPath(usePathname() ?? "/") ?? "home"
  return (locale: Locale) => ROUTES[route][locale]
}

export function LanguageSwitcher({ current, label, onNavigate }: { current: Locale; label: string; onNavigate?: () => void }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const hrefFor = useLocaleHref()

  useEffect(() => {
    if (!open) return
    const close = (e: MouseEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === "Escape" : !ref.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", close)
    document.addEventListener("keydown", close)
    return () => {
      document.removeEventListener("mousedown", close)
      document.removeEventListener("keydown", close)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={label}
        className="flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-bold text-white hover:bg-white/10 hover:text-primary transition-colors"
      >
        <Globe className="w-4 h-4" />
        {LOCALE_SHORT[current]}
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul role="menu" className="absolute right-0 top-full mt-2 min-w-52 rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl p-1.5 shadow-2xl">
          {locales.map((locale) => (
            <li key={locale} role="none">
              <Link
                role="menuitem"
                href={hrefFor(locale)}
                hrefLang={locale}
                lang={locale}
                aria-current={locale === current ? "true" : undefined}
                onClick={() => {
                  rememberLocale(locale)
                  setOpen(false)
                  onNavigate?.()
                }}
                className={`flex items-center justify-between gap-3 rounded-xl px-3 py-2 text-sm transition-colors ${
                  locale === current ? "text-primary font-semibold" : "text-white hover:bg-white/5"
                }`}
              >
                {LOCALE_NAMES[locale]}
                {locale === current && <Check className="w-4 h-4" />}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
