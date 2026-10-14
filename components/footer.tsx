import Link from "next/link"
import Image from "next/image"
import { siteDictionary } from "@/components/site/dictionary"
import { ROUTES, type Locale } from "@/lib/i18n"

const LINK = "text-sm text-muted-foreground hover:text-white transition-colors"
const TITLE = "text-sm font-bold text-white tracking-wider uppercase mb-2"

export function Footer({ locale }: { locale: Locale }) {
  const t = siteDictionary[locale].footer
  const nav = siteDictionary[locale].nav
  return (
    <footer className="w-full border-t border-white/5 bg-background">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row justify-between gap-16">

        <div className="flex flex-col gap-8 max-w-sm">
          <Link href={ROUTES.home[locale]} className="flex items-center gap-3">
            <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="Logo" width={36} height={36} />
            <span className="font-bold text-xl text-white">MRI Qbox</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">{t.tagline}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>{t.project}</h4>
            <Link href={ROUTES.about[locale]} className={LINK}>{t.about}</Link>
            <Link href={ROUTES.artifacts[locale]} className={LINK}>{nav.artifacts}</Link>
            <Link href="/docs" className={LINK}>{nav.docs}</Link>
            <Link href={ROUTES.servers[locale]} className={LINK}>{t.servers}</Link>
            <Link href="https://tela.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>{nav.screenShare}</Link>
            <Link href="https://ui.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>{t.uiKit}</Link>
            <Link href="https://assets.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>{t.assets}</Link>
            <Link href="https://skills.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>{t.skills}</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>{t.content}</h4>
            <Link href={ROUTES.whyMri[locale]} className={LINK}>{t.manifesto}</Link>
            <Link href={ROUTES.comparison[locale]} className={LINK}>{t.comparison}</Link>
            <Link href={ROUTES.glossary[locale]} className={LINK}>{t.glossary}</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>{t.community}</h4>
            <Link href={ROUTES.discord[locale]} className={LINK}>Discord</Link>
            <Link href="https://github.com/mri-Qbox-Brasil" className={LINK}>GitHub</Link>
            <Link href="https://bot.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>{nav.mriBot}</Link>
            <Link href={ROUTES.support[locale]} className={LINK}>{nav.support}</Link>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className={TITLE}>{t.legal}</h4>
            <Link href={ROUTES.privacy[locale]} className={LINK}>{t.privacy}</Link>
            <Link href={ROUTES.terms[locale]} className={LINK}>{t.terms}</Link>
            <span className="text-xs text-muted-foreground/60 mt-4">© {new Date().getFullYear()} MRI Qbox Brasil.<br />{t.license}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
