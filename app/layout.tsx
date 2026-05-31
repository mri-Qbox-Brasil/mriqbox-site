import type React from "react"
import type { Metadata } from "next"
import { Saira } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

// Saira — mesma fonte usada nas NUIs MRI (Qspawn, Qadmin). Bold italic
// pra "premium racing" feel da identidade da suite.
const saira = Saira({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  variable: "--font-saira",
})

const SITE_URL = "https://mriqbox.com.br"
const OG_IMAGE = "https://assets.mriqbox.com.br/branding/logo1080.png"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "MRI Qbox Brasil - Framework FiveM Open Source",
  description:
    "Framework Qbox (Qbcore + Ox) traduzida e otimizada para servidores brasileiros de FiveM. 100% gratuito e open source.",
  keywords: ["fivem", "qbox", "qbcore", "ox", "brasil", "framework", "gta v", "servidor", "rp", "roleplay"],
  authors: [{ name: "MRI Qbox Brasil" }],
  alternates: { canonical: "/" },
  // Favicon mri.ico (96x96) — mesmo arquivo usado em docs.mriqbox.com.br
  // pra consistencia visual entre os dominios da suite na aba do browser.
  icons: {
    icon: { url: "/mri.ico", type: "image/x-icon" },
    apple: "/apple-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: SITE_URL,
    siteName: "MRI Qbox Brasil",
    title: "MRI Qbox Brasil - Framework FiveM Open Source",
    description:
      "Framework Qbox (Qbcore + Ox) traduzida e otimizada para servidores brasileiros de FiveM. 100% gratuito e open source.",
    images: [{ url: OG_IMAGE, width: 1080, height: 1080, alt: "MRI Qbox Brasil" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MRI Qbox Brasil - Framework FiveM Open Source",
    description:
      "Framework Qbox (Qbcore + Ox) traduzida e otimizada para servidores brasileiros de FiveM.",
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
  url: SITE_URL,
  logo: OG_IMAGE,
  description:
    "Adaptação brasileira open source da framework Qbox (Qbcore + Ox) para servidores FiveM.",
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
  url: SITE_URL,
  inLanguage: "pt-BR",
  publisher: { "@type": "Organization", name: "MRI Qbox Brasil" },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${saira.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
        {children}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
