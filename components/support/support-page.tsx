import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Check, CreditCard, Heart, MessageCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "@/components/icons/github"
import { BrazilFlag, MercadoPagoIcon, PatreonIcon, PixIcon, UsaFlag } from "@/components/icons/brands"
import { SupportersWall } from "@/components/supporters-wall"
import { breadcrumb, jsonLd } from "@/lib/schema"
import type { Locale } from "@/lib/i18n"
import { PATREON_URL, PLAN_URLS, SUPPORT_PATHS, supportDictionary, type SupportDictionary } from "./dictionary"

const LOCALE_LABELS: Record<Locale, string> = { "pt-BR": "PT", en: "EN" }

function LanguageSwitch({ current }: { current: Locale }) {
  return (
    <div className="flex items-center rounded-full border border-white/10 p-0.5 text-xs font-bold">
      {(Object.keys(SUPPORT_PATHS) as Locale[]).map((locale) => (
        <Link
          key={locale}
          href={SUPPORT_PATHS[locale]}
          hrefLang={locale}
          aria-current={locale === current ? "page" : undefined}
          className={`rounded-full px-3 py-1 transition-colors ${
            locale === current ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-white"
          }`}
        >
          {LOCALE_LABELS[locale]}
        </Link>
      ))}
    </div>
  )
}

function Benefits({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

function PaymentMethods({ t }: { t: SupportDictionary }) {
  const methods = [
    { id: "pix", label: t.plans.methods.pix, icon: <PixIcon className="h-4 w-4 text-[#32BCAD]" /> },
    { id: "mercado-pago", label: t.plans.methods.mercadoPago, icon: <MercadoPagoIcon className="h-4 w-4 text-[#00B1EA]" /> },
    { id: "card", label: t.plans.methods.card, icon: <CreditCard className="h-4 w-4 text-muted-foreground" /> },
  ]
  return (
    <ul className="flex flex-wrap gap-2 mb-6">
      {methods.map((method) => (
        <li
          key={method.id}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-semibold text-foreground"
        >
          {method.icon}
          {method.label}
        </li>
      ))}
    </ul>
  )
}

function BrlPlans({ t, primary }: { t: SupportDictionary; primary: boolean }) {
  const plans = [
    { id: "monthly", ...t.plans.monthly, href: PLAN_URLS.monthly, primary },
    { id: "yearly", ...t.plans.yearly, href: PLAN_URLS.yearly, primary: false },
  ]
  return (
    <section>
      <h2 className="flex items-center gap-3 text-2xl font-bold text-foreground mb-2">
        <BrazilFlag className="h-5 w-7 shrink-0 rounded-[3px]" />
        {t.plans.title}
      </h2>
      <p className="text-sm text-muted-foreground mb-4">{t.plans.subtitle}</p>
      <PaymentMethods t={t} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-8 flex flex-col gap-5 ${plan.primary ? "border-primary/50" : ""}`}>
            <div>
              <div className="flex items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">{plan.label}</div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <PixIcon className="h-4 w-4 text-[#32BCAD]" />
                  <CreditCard className="h-4 w-4" />
                </div>
              </div>
              <div className="text-4xl font-extrabold text-foreground mt-2">{plan.price}</div>
              <div className="text-sm text-muted-foreground mt-1">{plan.period}</div>
            </div>
            <Button asChild size="lg" variant={plan.primary ? "default" : "outline"} className="w-full font-bold mt-auto">
              <Link href={plan.href} target="_blank" rel="noopener noreferrer">
                {plan.cta}
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        ))}
      </div>
    </section>
  )
}

function PatreonOption({ t, primary }: { t: SupportDictionary; primary: boolean }) {
  return (
    <Card
      className={`p-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
        primary ? "border-primary/50 sm:p-8" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        <UsaFlag className={`shrink-0 rounded-[3px] mt-1 ${primary ? "h-6 w-8" : "h-5 w-7"}`} />
        <div>
          <h2 className={`font-bold text-foreground ${primary ? "text-2xl" : "text-base"}`}>{t.patreon.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {t.patreon.text} <strong className="text-foreground whitespace-nowrap">{t.patreon.price}</strong>
          </p>
        </div>
      </div>
      <Button asChild size={primary ? "lg" : "default"} variant={primary ? "default" : "outline"} className="font-bold shrink-0">
        <Link href={PATREON_URL} target="_blank" rel="noopener noreferrer">
          <PatreonIcon className="w-4 h-4 mr-2" />
          {t.patreon.cta}
          <ArrowUpRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </Card>
  )
}

export function SupportPage({ locale }: { locale: Locale }) {
  const t = supportDictionary[locale]
  // Visitors reading in English are abroad, so Patreon (USD) leads there; BRL leads in Portuguese.
  const patreonFirst = locale === "en"
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: "/" },
    { name: t.eyebrow, path: SUPPORT_PATHS[locale] },
  ])

  return (
    <div lang={locale} className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="flex items-center justify-between mb-8">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.back}
            </Link>
          </Button>
          <LanguageSwitch current={locale} />
        </div>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-primary mb-4 uppercase tracking-wider font-mono font-bold">
            <Heart className="w-4 h-4" />
            <span>{t.eyebrow}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{t.title}</h1>
          <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            {t.intro.before}
            <strong className="text-foreground">{t.intro.strong}</strong>
            {t.intro.after}
          </p>
        </div>

        {patreonFirst ? (
          <>
            <PatreonOption t={t} primary />
            <div className="mt-12">
              <BrlPlans t={t} primary={false} />
            </div>
          </>
        ) : (
          <>
            <BrlPlans t={t} primary />
            <div className="mt-6">
              <PatreonOption t={t} primary={false} />
            </div>
          </>
        )}

        <Card className="p-8 mt-14">
          <h2 className="text-2xl font-bold text-foreground mb-2">{t.benefits.title}</h2>
          <p className="text-sm text-muted-foreground mb-6">{t.benefits.subtitle}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
            {t.benefits.groups.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">{group.title}</h3>
                <Benefits items={group.items} />
              </div>
            ))}
          </div>
        </Card>

        <SupportersWall t={t.supporters} />

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-3">{t.other.title}</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">{t.other.subtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { ...t.other.star, href: "https://github.com/mri-Qbox-Brasil", icon: Star, external: true },
              { ...t.other.contribute, href: "https://github.com/mri-Qbox-Brasil", icon: Github, external: true },
              { ...t.other.discord, href: "/discord", icon: MessageCircle, external: false },
            ].map(({ title, text, href, icon: Icon, external }) => (
              <Link
                key={title}
                href={href}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors flex flex-col gap-2"
              >
                <Icon className="w-5 h-5 text-primary" />
                <span className="font-bold text-foreground">{title}</span>
                <span className="text-sm text-muted-foreground">{text}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
