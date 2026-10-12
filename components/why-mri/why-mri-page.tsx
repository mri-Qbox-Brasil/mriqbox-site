import Link from "next/link"
import { ArrowLeft, BookOpen, Code2, ShieldAlert, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { article, breadcrumb, formatDate, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale } from "@/lib/i18n"
import { whyMriDictionary } from "./content"
import { RichText, type Rich } from "./rich-text"

const PUBLISHED = "2026-05-01"
const UPDATED = "2026-06-01"

function Paragraphs({ items, locale }: { items: Rich[]; locale: Locale }) {
  return (
    <>
      {items.map((text, i) => (
        <p key={i} className={i > 0 ? "mt-3" : undefined}>
          <RichText text={text} locale={locale} />
        </p>
      ))}
    </>
  )
}

export function WhyMriPage({ locale }: { locale: Locale }) {
  const t = whyMriDictionary[locale]
  const path = ROUTES.whyMri[locale]
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.breadcrumb, path },
  ])
  const articleLd = article({
    headline: t.article.headline,
    description: t.article.description,
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

        <header className="mb-12">
          <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4 uppercase tracking-wider font-mono">
            <span>{t.eyebrow}</span>
            <span>·</span>
            <time dateTime={UPDATED}>
              {t.updated} {formatDate(UPDATED, locale)}
            </time>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{t.title}</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">{t.intro}</p>
        </header>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          {t.problems.map((problem) => (
            <Card key={problem.title} className="p-6 border-destructive/30">
              <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-destructive" />
                {problem.title}
              </h2>
              <Paragraphs items={problem.paragraphs} locale={locale} />
            </Card>
          ))}

          <Card className="p-6 border-primary/40 bg-gradient-to-br from-primary/5 to-primary-accent/5">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              {t.solution.title}
            </h2>
            <Paragraphs items={t.solution.paragraphs} locale={locale} />
            <ul className="list-disc ml-6 mt-3 space-y-1.5">
              {t.solution.list.map((item, i) => (
                <li key={i}>
                  <RichText text={item} locale={locale} />
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              {t.proof.title}
            </h2>
            <Paragraphs items={t.proof.paragraphs} locale={locale} />
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              {t.help.title}
            </h2>
            <p>{t.help.intro}</p>
            <ol className="list-decimal ml-6 mt-3 space-y-1.5">
              {t.help.steps.map((step, i) => (
                <li key={i}>
                  <RichText text={step} locale={locale} />
                </li>
              ))}
            </ol>
            <p className="mt-3">
              <RichText text={t.help.outro} locale={locale} />
            </p>
          </Card>
        </section>

        <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">{t.cta.title}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild>
              <Link href={ROUTES.artifacts[locale]}>{t.cta.button}</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
