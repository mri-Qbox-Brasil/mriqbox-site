"use client"

import Link from "next/link"
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

// Dentro de iframe (ex.: pagina Documentacao do painel admin in-game) o
// AdSense nao carrega: o CEF do FiveM desenha o iframe do anuncio fora do
// recorte do painel e ele fica preso na tela. Nunca muda durante a vida da
// pagina, entao o subscribe e vazio. No servidor e na hidratacao o valor e
// `true` (nao carrega); no client passa a refletir a janela real.
function subscribeNoop() {
  return () => {}
}

function getEmbeddedSnapshot(): boolean {
  return window.self !== window.top
}

function getEmbeddedServerSnapshot(): boolean {
  return true
}

// AdSense + banner LGPD.
//
// Estrategia: o script do AdSense (adsbygoogle.js) carrega SEMPRE, em
// qualquer pagina, antes do user clicar no banner. Isso e necessario pra
// passar a revisao do AdSense — o bot revisor nao clica em banner e
// precisa ver o script rodando pra verificar a propriedade do site.
//
// O banner LGPD ainda aparece e registra a escolha do user em localStorage.
// Pra estrita conformidade LGPD/GDPR no futuro, migrar pra Google Consent
// Mode v2 (gtag('consent', 'default', { ad_storage: 'denied' }) + update
// quando o user aceita). Por ora, modelo dos publishers BR padrao.
export function CookieConsent() {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const embedded = useSyncExternalStore(subscribeNoop, getEmbeddedSnapshot, getEmbeddedServerSnapshot)

  const choose = useCallback((value: Exclude<Consent, null>) => {
    localStorage.setItem(STORAGE_KEY, value)
    window.dispatchEvent(new Event(EVENT))
  }, [])

  return (
    <>
      {/* AdSense sempre on fora de iframe: necessario pra aprovacao + tracking de impressoes. */}
      {!embedded && (
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
              Usamos cookies para anúncios e métricas. Veja a{" "}
              <Link href="/privacidade" className="text-primary hover:underline">
                política de privacidade
              </Link>
              .
            </p>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="ghost" size="sm" onClick={() => choose("rejected")}>
                Recusar
              </Button>
              <Button size="sm" onClick={() => choose("accepted")}>
                OK
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CookieConsent
