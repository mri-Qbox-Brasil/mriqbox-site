// Helpers de schema.org JSON-LD pra SEO. Cada subpagina inclui um <script
// type="application/ld+json"> com o output dessas funcoes, ajuda o Google
// a entender o conteudo e exibir rich snippets (breadcrumbs, FAQ, HowTo).

import { absoluteUrl } from "@/lib/site"

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function faqPage(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  }
}

export function howTo(
  name: string,
  description: string,
  steps: { name: string; text: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  }
}

export function softwareApplication(item: {
  name: string
  description: string
  url: string
  applicationCategory: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: item.name,
    description: item.description,
    applicationCategory: item.applicationCategory,
    operatingSystem: "FiveM",
    offers: { "@type": "Offer", price: "0", priceCurrency: "BRL" },
    url: item.url,
    publisher: { "@type": "Organization", name: "MRI Qbox Brasil", url: absoluteUrl("/") },
  }
}

export function article(item: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
  inLanguage?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.headline,
    description: item.description,
    inLanguage: item.inLanguage ?? "pt-BR",
    datePublished: item.datePublished,
    dateModified: item.dateModified ?? item.datePublished,
    author: { "@type": "Organization", name: "MRI Qbox Brasil", url: absoluteUrl("/") },
    publisher: {
      "@type": "Organization",
      name: "MRI Qbox Brasil",
      url: absoluteUrl("/"),
      logo: {
        "@type": "ImageObject",
        url: "https://assets.mriqbox.com.br/branding/logo1080.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": absoluteUrl(item.path),
    },
  }
}

// Formats an ISO date (YYYY-MM-DD) as long text in the page locale, e.g. "1 de junho de 2026".
export function formatDate(iso: string, locale: string): string {
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`)
  )
}

// Renderiza o JSON-LD como um <script> tag, usar dentro do JSX da pagina.
export function jsonLd(data: object) {
  return JSON.stringify(data)
}
