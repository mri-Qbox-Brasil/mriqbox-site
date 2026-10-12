import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { article, breadcrumb, formatDate, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale } from "@/lib/i18n"
import { glossaryDictionary, type GlossaryEntry } from "./content"
import { GLOSSARY_GROUPS } from "./terms"

const PUBLISHED = "2026-05-20"
const UPDATED = "2026-06-01"

export function GlossaryPage({ locale }: { locale: Locale }) {
  const t = glossaryDictionary[locale]
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.breadcrumb, path: ROUTES.glossary[locale] },
  ])
  const articleLd = article({
    headline: t.meta.title,
    description: t.meta.articleDescription,
    path: ROUTES.glossary[locale],
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    inLanguage: locale,
  })

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
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
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">{t.title}</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">{t.intro}</p>
        </header>

        <nav className="mb-12 flex flex-wrap gap-2 text-sm">
          {GLOSSARY_GROUPS.map((g) => (
            <a
              key={g.letter}
              href={`#${g.letter}`}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors font-mono font-bold"
            >
              {g.letter}
            </a>
          ))}
        </nav>

        <section className="space-y-10">
          {GLOSSARY_GROUPS.map((group) => (
            <div key={group.letter} id={group.letter} className="scroll-mt-20">
              <h2 className="text-3xl font-black tracking-tight text-primary mb-6">{group.letter}</h2>
              <div className="space-y-4">
                {group.items.map((item) => {
                  const entry: GlossaryEntry = t.terms[item.id]
                  return (
                    <Card key={item.id} className="p-5">
                      <h3 className="text-lg font-bold text-foreground mb-2">{item.term}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{entry.definition}</p>
                      {entry.example && (
                        <pre className="mt-3 bg-muted p-3 rounded-md text-xs overflow-x-auto border border-border">
                          <code className="text-foreground font-mono">{entry.example}</code>
                        </pre>
                      )}
                    </Card>
                  )
                })}
              </div>
            </div>
          ))}
        </section>

        <Card className="p-8 mt-16 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">{t.missing.title}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.missing.text}</p>
          <Button asChild>
            <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
              {t.missing.cta}
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
