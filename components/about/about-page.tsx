import Link from "next/link"
import { ArrowLeft, Code2, Globe, Heart, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github } from "@/components/icons/github"
import { RichText } from "@/components/why-mri/rich-text"
import { article, breadcrumb, formatDate, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale } from "@/lib/i18n"
import { aboutDictionary } from "./dictionary"

const PUBLISHED = "2026-05-01"
const UPDATED = "2026-06-01"

export function AboutPage({ locale }: { locale: Locale }) {
  const t = aboutDictionary[locale]
  const path = ROUTES.about[locale]
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.breadcrumb, path },
  ])
  const articleLd = article({
    headline: t.title,
    description: t.meta.description,
    path,
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    inLanguage: locale,
  })

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={ROUTES.home[locale]}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>

        <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 uppercase tracking-wider font-mono">
          <span>{t.eyebrow}</span>
          <span>·</span>
          <time dateTime={UPDATED}>
            {t.updated} {formatDate(UPDATED, locale)}
          </time>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{t.title}</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          <RichText text={t.intro} locale={locale} />
        </p>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              {t.why.title}
            </h2>
            <p>
              <RichText text={t.why.text} locale={locale} />
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              {t.mission.title}
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              {t.mission.items.map((item, i) => (
                <li key={i}>
                  <RichText text={item} locale={locale} />
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              {t.maintain.title}
            </h2>
            <p className="mb-4">{t.maintain.intro}</p>
            <ul className="list-disc ml-6 space-y-2">
              {t.maintain.items.map((item) => (
                <li key={item.name}>
                  <strong className="text-foreground">{item.name}</strong>: {item.description}
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">{t.funding.title}</h2>
            <p>
              <RichText text={t.funding.text} locale={locale} />
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">{t.contact.title}</h2>
            <p className="mb-4">{t.contact.text}</p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/docs">{t.contact.docs}</Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
