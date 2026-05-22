import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import CookieConsent from "@/components/cookie-consent"
import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
    ],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={`dark ${geist.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <CookieConsent />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
