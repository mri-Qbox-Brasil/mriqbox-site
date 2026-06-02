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

// Renderiza o JSON-LD como um <script> tag — usar dentro do JSX da pagina.
export function jsonLd(data: object) {
  return JSON.stringify(data)
}
