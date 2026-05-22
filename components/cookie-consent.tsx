"use client"

import Script from "next/script"
import { useCallback, useSyncExternalStore } from "react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "mriqbox-consent"
const ADSENSE_CLIENT = "ca-pub-8817321986799686"
const EVENT = "mriqbox-consent-change"

type Consent = "accepted" | "rejected" | null

// Le o consentimento via useSyncExternalStore — padrao React pra estado
// externo (localStorage), evita setState em effect e lida com SSR via
// getServerSnapshot. Mudancas no mesmo tab disparam um Event custom (o
// evento nativo `storage` so dispara entre tabs).
function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback)
  window.addEventListener("storage", callback)
  return () => {
    window.removeEventListener(EVENT, callback)
    window.removeEventListener("storage", callback)
  }
}

function getSnapshot(): Consent {
  return (localStorage.getItem(STORAGE_KEY) as Consent) ?? null
}

function getServerSnapshot(): Consent {
  return null
}

// Gate de consentimento (LGPD): o script do AdSense so carrega depois do
// usuario aceitar. Persistido em localStorage. Indeciso = banner; rejeitado
// = nenhum ad, sem banner.
export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  const choose = useCallback((value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new Event(EVENT))
  }, [])

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

      {consent === null && (
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
