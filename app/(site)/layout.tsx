import type { ReactNode } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

// Chrome do site institucional. Fica num route group pra NAO envolver /docs
// (que tem o layout proprio do Fumadocs) nem as rotas de metadata na raiz.
// Toda pagina nova dentro de (site) ja nasce com nav e footer.
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
