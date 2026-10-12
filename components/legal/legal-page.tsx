import { Fragment } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { breadcrumb, jsonLd } from "@/lib/schema"
import { ROUTES, type Locale, type RouteId } from "@/lib/i18n"
import type { LegalDictionary, RichText } from "./types"

function Rich({ text }: { text: RichText }) {
  return text.map((part, i) => {
    if (typeof part === "string") return part
    if ("code" in part) return <code key={i} className={part.plain ? undefined : "text-primary"}>{part.code}</code>
    if ("strong" in part) return <strong key={i} className="text-foreground">{part.strong}</strong>
    return (
      <a key={i} href={part.href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
        {part.text}
      </a>
    )
  })
}

function formatMonth(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}-01T00:00:00Z`)
  )
}

export function LegalPage({
  locale,
  route,
  updated,
  t,
}: {
  locale: Locale
  route: RouteId
  updated: string
  t: LegalDictionary
}) {
  const breadcrumbLd = breadcrumb([
    { name: t.home, path: ROUTES.home[locale] },
    { name: t.crumb, path: ROUTES[route][locale] },
  ])

  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbLd) }} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={ROUTES.home[locale]}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.back}
          </Link>
        </Button>

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">{t.heading}</h1>
          <p className="text-sm text-muted-foreground mb-8">
            {t.updated}: {formatMonth(updated, locale)}
          </p>

          <section className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              <Rich text={t.intro} />
            </p>

            {t.sections.map((section) => (
              <Fragment key={section.title}>
                <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">{section.title}</h2>
                {section.blocks.map((block, i) =>
                  "paragraph" in block ? (
                    <p key={i}>
                      <Rich text={block.paragraph} />
                    </p>
                  ) : (
                    <ul key={i} className="list-disc ml-6 space-y-2">
                      {block.list.map((item, j) => (
                        <li key={j}>
                          <Rich text={item} />
                        </li>
                      ))}
                    </ul>
                  )
                )}
              </Fragment>
            ))}
          </section>
        </article>
      </div>
    </div>
  )
}
