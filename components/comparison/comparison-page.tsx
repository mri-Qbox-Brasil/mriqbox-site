import { Fragment } from "react"
import Link from "next/link"
import { ArrowLeft, Check, Minus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { article, breadcrumb, formatDate, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale } from "@/lib/i18n"
import { comparisonDictionary, type ComparisonCell } from "./content"

const PUBLISHED = "2026-05-15"
const UPDATED = "2026-06-01"

function cellRender(c: ComparisonCell) {
  if ("note" in c && c.note && (c.value === "yes" || c.value === "no" || c.value === "partial")) {
    return (
      <div className="flex items-start gap-2">
        {c.value === "yes" && <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
        {c.value === "no" && <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
        {c.value === "partial" && <Minus className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />}
        <span className="text-xs text-muted-foreground">{c.note}</span>
      </div>
    )
  }
  if (c.value === "yes") return <Check className="w-4 h-4 text-primary" />
  if (c.value === "no") return <X className="w-4 h-4 text-destructive" />
  if (c.value === "partial") return <Minus className="w-4 h-4 text-muted-foreground" />
  return <span className="text-sm">{c.value}</span>
}

export function ComparisonPage({ locale }: { locale: Locale }) {
  const t = comparisonDictionary[locale]
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.breadcrumb, path: ROUTES.comparison[locale] },
  ])
  const articleLd = article({
    headline: t.meta.title,
    description: t.meta.articleDescription,
    path: ROUTES.comparison[locale],
    datePublished: PUBLISHED,
    dateModified: UPDATED,
    inLanguage: locale,
  })
  const lastName = t.intro.names.length - 1

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
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
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            {t.intro.before}
            {t.intro.names.map((name, i) => (
              <Fragment key={name}>
                {i > 0 && (i === lastName ? t.intro.and : ", ")}
                <strong className="text-foreground">{name}</strong>
              </Fragment>
            ))}
            {t.intro.after}
          </p>
        </header>

        <section className="space-y-6 text-muted-foreground leading-relaxed mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">{t.summary.title}</h2>
            <ul className="space-y-3">
              {t.summary.items.map((item) => (
                <li key={item.name}>
                  <strong className="text-foreground">{item.name}</strong>: {item.text}
                </li>
              ))}
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-black tracking-tight mb-6">{t.table.title}</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground sticky left-0 bg-background">{t.table.criterion}</th>
                  <th className="text-left p-3 font-semibold text-primary">MRI Qbox</th>
                  <th className="text-left p-3 font-semibold text-foreground">Qbox</th>
                  <th className="text-left p-3 font-semibold text-foreground">QBCore</th>
                  <th className="text-left p-3 font-semibold text-foreground">ESX</th>
                </tr>
              </thead>
              <tbody>
                {t.table.rows.map((row) => (
                  <tr key={row.criterion} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground sticky left-0 bg-background">{row.criterion}</td>
                    <td className="p-3">{cellRender(row.mri)}</td>
                    <td className="p-3">{cellRender(row.qbox)}</td>
                    <td className="p-3">{cellRender(row.qbcore)}</td>
                    <td className="p-3">{cellRender(row.esx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-muted-foreground leading-relaxed mb-12">
          {t.versus.map((card) => (
            <Card key={card.title} className="p-6">
              <h2 className="text-2xl font-bold text-foreground mb-3">{card.title}</h2>
              {card.paragraphs.map((paragraph, i) => (
                <p key={i} className={i > 0 ? "mt-3" : undefined}>
                  {paragraph.label && <strong className="text-foreground">{paragraph.label}</strong>}
                  {paragraph.label && " "}
                  {paragraph.text}
                </p>
              ))}
            </Card>
          ))}
        </section>

        <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">{t.cta.title}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t.cta.text}</p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button variant="outline" asChild>
              <Link href={ROUTES.artifacts[locale]}>{t.cta.button}</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
