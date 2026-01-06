import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import GoogleAdsense from "@/components/googlead"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MRI Qbox Brasil - Framework FiveM Open Source",
  description:
    "Framework Qbox (Qbcore + Ox) traduzida e otimizada para servidores brasileiros de FiveM. 100% gratuito e open source.",
  keywords: "fivem, qbox, qbcore, ox, brasil, framework, gta v, servidor, rp, roleplay",
  authors: [{ name: "MRI Qbox Brasil" }],
  generator: "v0.app",
  icons: {
    icon: "https://assets.mriqbox.com.br/branding/logo96.png",
    apple: "https://assets.mriqbox.com.br/branding/logo96.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
      <GoogleAdsense />
    </html>
  )
}
