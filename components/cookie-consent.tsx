"use client"

import { useEffect, useState } from "react"
import Script from "next/script"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "mriqbox-consent"
const ADSENSE_CLIENT = "ca-pub-8817321986799686"

type Consent = "accepted" | "rejected" | null

// Gate de consentimento (LGPD): o script do AdSense so carrega depois do
// usuario aceitar. Persistido em localStorage. Enquanto indeciso, mostra
// o banner; rejeitado = nenhum ad, sem banner.
export function CookieConsent() {
  const [consent, setConsent] = useState<Consent>(null)
  const [decided, setDecided] = useState(true) // evita flash do banner no SSR

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Consent
    setConsent(stored)
    setDecided(stored !== null)
  }, [])

  const choose = (value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value)
    setConsent(value)
    setDecided(true)
  }

  return (
    <>
      {consent === "accepted" && (
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}

      {!decided && (
        <div className="fixed bottom-0 inset-x-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Usamos cookies para anúncios e métricas. Você pode aceitar ou recusar.
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => choose("rejected")}>
                Recusar
              </Button>
              <Button size="sm" onClick={() => choose("accepted")}>
                Aceitar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent
