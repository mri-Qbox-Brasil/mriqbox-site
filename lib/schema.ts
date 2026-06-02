// Helpers de schema.org JSON-LD pra SEO. Cada subpagina inclui um <script
// type="application/ld+json"> com o output dessas funcoes — ajuda o Google
// a entender o conteudo e exibir rich snippets (breadcrumbs, FAQ, HowTo).

const SITE_URL = "https://mriqbox.com.br"

export function breadcrumb(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
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
    publisher: { "@type": "Organization", name: "MRI Qbox Brasil", url: SITE_URL },
  }
}

export function article(item: {
  headline: string
  description: string
  path: string
  datePublished: string
  dateModified?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: item.headline,
    description: item.description,
    inLanguage: "pt-BR",
    datePublished: item.datePublished,
    dateModified: item.dateModified ?? item.datePublished,
    author: { "@type": "Organization", name: "MRI Qbox Brasil", url: SITE_URL },
    publisher: {
      "@type": "Organization",
      name: "MRI Qbox Brasil",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: "https://assets.mriqbox.com.br/branding/logo1080.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}${item.path}`,
    },
  }
}

// Formata data ISO (YYYY-MM-DD) pra texto BR ("1 de junho de 2026").
export function formatDateBR(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number)
  const months = [
    "janeiro", "fevereiro", "março", "abril", "maio", "junho",
    "julho", "agosto", "setembro", "outubro", "novembro", "dezembro",
  ]
  return `${d} de ${months[m - 1]} de ${y}`
}

// Renderiza o JSON-LD como um <script> tag — usar dentro do JSX da pagina.
export function jsonLd(data: object) {
  return JSON.stringify(data)
}
