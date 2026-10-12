"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Github } from "@/components/icons/github"
import { LanguageSwitcher } from "@/components/site/language-switcher"
import { siteDictionary } from "@/components/site/dictionary"
import { ROUTES, type Locale } from "@/lib/i18n"

// Secondary links (manifesto, about, comparison, glossary...) live only in the footer to keep the nav short.
function navLinks(locale: Locale) {
  const t = siteDictionary[locale].nav
  return [
    { href: "/docs", label: t.docs },
    { href: ROUTES.artifacts[locale], label: t.artifacts },
    { href: "https://tela.mriqbox.com.br", label: t.screenShare, external: true },
    { href: "https://bot.mriqbox.com.br", label: t.mriBot, external: true, badge: t.newBadge },
    { href: ROUTES.support[locale], label: t.support },
  ]
}

const linkTarget = (l: { external?: boolean }) =>
  l.external ? { target: "_blank", rel: "noopener noreferrer" } : {}

const GITHUB_URL = "https://github.com/mri-Qbox-Brasil"

function NavBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-primary px-1.5 py-0.5 text-[9px] font-black leading-none text-primary-foreground">
      {label}
    </span>
  )
}

export function Navbar({ locale }: { locale: Locale }) {
  const [isOpen, setIsOpen] = useState(false)
  const t = siteDictionary[locale].nav
  const links = navLinks(locale)

  return (
    <>
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-50 h-[64px] px-6 flex items-center justify-between bg-card/60 backdrop-blur-xl border border-white/5 rounded-full transition-all">
        <Link href={ROUTES.home[locale]} className="flex items-center gap-2">
          <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="MRI Qbox Brasil Logo" width={24} height={24} className="object-contain" />
          <span className="whitespace-nowrap font-semibold text-sm tracking-widest uppercase text-white">MRI Qbox</span>
        </Link>

        <div className="hidden xl:flex items-center gap-4 xl:gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} {...linkTarget(l)} className="whitespace-nowrap text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors inline-flex items-center gap-1.5">{l.label}{l.badge && <NavBadge label={l.badge} />}</Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher current={locale} label={t.language} />
          <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hidden xl:flex p-2 rounded-full text-white hover:text-primary hover:bg-white/10 transition-colors">
            <Github className="w-5 h-5" />
          </Link>

          <Link href={ROUTES.discord[locale]} className="hidden xl:flex whitespace-nowrap text-xs font-bold uppercase tracking-wider text-primary-foreground px-5 py-2 sm:py-2.5 bg-primary hover:bg-primary/90 rounded-full transition-all items-center gap-2 hover:scale-105">
            {t.discord}
          </Link>

          <button
            className="xl:hidden flex items-center justify-center p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={t.menu}
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1200px] z-40 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl xl:hidden animate-in slide-in-from-top-4 fade-in">
          {links.map((l) => (
            <Link key={l.href} href={l.href} {...linkTarget(l)} onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5 flex items-center gap-2">{l.label}{l.badge && <NavBadge label={l.badge} />}</Link>
          ))}
          <Link href={GITHUB_URL} onClick={() => setIsOpen(false)} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5 flex items-center gap-2">
            <Github className="w-4 h-4" /> GitHub
          </Link>
          <Link href={ROUTES.discord[locale]} onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-primary-foreground px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 text-center">
            {t.discord}
          </Link>
        </div>
      )}
    </>
  )
}
