import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import CookieConsent from "@/components/cookie-consent"
import Script from "next/script"
import { RootProvider } from "fumadocs-ui/provider/next"
import PagefindSearchDialog from "@/components/pagefind-search-dialog"
import { SITE_URL, absoluteUrl } from "@/lib/site"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const OG_IMAGE = "https://assets.mriqbox.com.br/branding/logo1080.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MRI Qbox Brasil | Framework FiveM Open Source",
  description:
    "Framework FiveM open source baseada em Qbox, QBCore e Ox, traduzida e otimizada para servidores brasileiros. Gratuita, moderna e documentada em português.",
  keywords: ["FiveM", "framework FiveM", "Qbox Brasil", "QBCore Brasil", "servidor FiveM", "base FiveM", "Ox", "GTA RP", "roleplay", "open source"],
  applicationName: "MRI Qbox Brasil",
  authors: [{ name: "MRI Qbox Brasil" }],
  creator: "MRI Qbox Brasil",
  publisher: "MRI Qbox Brasil",
  category: "technology",
  referrer: "origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Favicon: mri.ico (mesmo da aba do docs.mriqbox.com.br) + icon.png 460px
  // (avatar MRI) pra crawlers/cards de preview que ignoram .ico. apple-icon
  // pro iOS home screen e cards que usam apple-touch-icon.
  icons: {
    icon: [
      { url: "/mri.ico", type: "image/x-icon" },
      { url: "/icon.png", type: "image/png", sizes: "460x460" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: absoluteUrl("/"),
    siteName: "MRI Qbox Brasil",
    title: "MRI Qbox Brasil | Framework FiveM Open Source",
    description:
      "Framework FiveM open source baseada em Qbox, QBCore e Ox. Gratuita, moderna e feita para servidores brasileiros.",
    images: [{ url: OG_IMAGE, width: 1080, height: 1080, alt: "MRI Qbox Brasil" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MRI Qbox Brasil | Framework FiveM Open Source",
    description:
      "Framework FiveM open source, gratuita e em português para servidores brasileiros.",
    images: [OG_IMAGE],
  },
}

// JSON-LD Schema.org — sinaliza pros crawlers (Google, AdSense reviewer) que
// somos uma organizacao real com presenca em multiplos canais. Ajuda a unir
// mriqbox.com.br (site + docs) + GitHub + Discord sob uma mesma marca.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MRI Qbox Brasil",
  alternateName: "MRI Qbox",
  url: absoluteUrl("/"),
  logo: OG_IMAGE,
  description:
    "Framework FiveM open source baseada em Qbox, QBCore e Ox, mantida pela comunidade brasileira.",
  sameAs: [
    "https://github.com/mri-Qbox-Brasil",
    "https://discord.mriqbox.com.br",
    "https://tela.mriqbox.com.br",
    "https://ui.mriqbox.com.br",
    "https://assets.mriqbox.com.br",
    "https://skills.mriqbox.com.br",
    "https://www.patreon.com/mriQboxBrasil",
  ],
}

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MRI Qbox Brasil",
  alternateName: "MRI Qbox",
  url: absoluteUrl("/"),
  inLanguage: "pt-BR",
  description: "Documentação, recursos e comunidade da framework FiveM open source MRI Qbox Brasil.",
  publisher: { "@type": "Organization", name: "MRI Qbox Brasil" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${inter.variable}`}>
      <body className="font-sans antialiased bg-background text-foreground">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        {/* RootProvider habilita a busca/contexto do Fumadocs (docs). Tema fixo
            em dark (site é dark-only). Busca Pagefind estática nos dois modos
            (Vercel e export): o bundle é gerado no build (ver
            scripts/build-pagefind.mjs) e o dialog usa a API JS do pagefind. */}
        <RootProvider
          theme={{ enabled: false }}
          search={{
            SearchDialog: PagefindSearchDialog,
          }}
        >
          {children}
        </RootProvider>
        <CookieConsent />
        {/* Cloudflare Web Analytics (sem cookies). O dominio principal nao passa
            pelo proxy da Cloudflare, entao o beacon e instalado aqui. Usa o site
            "www.mriqbox.com.br" do Web Analytics: o site ligado a zona so aceita
            trafego que passa pelo proxy. */}
        <Script
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token": "418412c332aa4355a803548160b2ef7c"}'
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}
