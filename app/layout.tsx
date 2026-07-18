import type React from "react"
import type { Metadata } from "next"
import { Nunito_Sans, Montserrat_Alternates, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieConsent from "@/components/cookie-consent"
import { RootProvider } from "fumadocs-ui/provider/next"
import "./globals.css"

const nunito = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-nunito",
})

const montserrat = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const SITE_URL = "https://mriqbox.com.br"
const OG_IMAGE = "https://assets.mriqbox.com.br/branding/logo1080.png"

// Build de dev no GitHub Pages: serve sob /mriqbox-site e nao deve ser indexado.
// O basePath nao e aplicado automaticamente aos icons do metadata, entao
// prefixamos manualmente aqui.
const IS_GITHUB_PAGES = process.env.GITHUB_PAGES === "true"
const BP = IS_GITHUB_PAGES ? "/mriqbox-site" : ""

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
  // Versao de dev (GitHub Pages) nao deve aparecer nos buscadores.
  ...(IS_GITHUB_PAGES && { robots: { index: false, follow: false } }),
  // Favicon: mri.ico (mesmo da aba do docs.mriqbox.com.br) + icon.png 460px
  // (avatar MRI) pra crawlers/cards de preview que ignoram .ico. apple-icon
  // pro iOS home screen e cards que usam apple-touch-icon.
  icons: {
    icon: [
      { url: `${BP}/mri.ico`, type: "image/x-icon" },
      { url: `${BP}/icon.png`, type: "image/png", sizes: "460x460" },
    ],
    apple: `${BP}/apple-icon.png`,
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
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
// mriqbox.com.br + docs.mriqbox.com.br + GitHub + Discord sob uma mesma marca.
const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "MRI Qbox Brasil",
  alternateName: "MRI Qbox",
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    "Framework FiveM open source baseada em Qbox, QBCore e Ox, mantida pela comunidade brasileira.",
  sameAs: [
    "https://github.com/mri-Qbox-Brasil",
    "https://discord.mriqbox.com.br",
    "https://docs.mriqbox.com.br",
    "https://www.patreon.com/mriQboxBrasil",
  ],
}

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "MRI Qbox Brasil",
  alternateName: "MRI Qbox",
  url: SITE_URL,
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
            em dark (site é dark-only) e busca Orama estática. O endpoint inclui
            o basePath (vazio em produção, /mriqbox-site no GitHub Pages). */}
        <RootProvider
          theme={{ enabled: false }}
          search={{
            options: {
              type: "static",
              api: `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/search`,
            },
          }}
        >
          {children}
        </RootProvider>
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
