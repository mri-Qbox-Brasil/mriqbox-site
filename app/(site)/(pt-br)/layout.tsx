import type { ReactNode } from "react"
import { SiteShell } from "@/components/site/site-shell"

export default function BrazilianLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="pt-BR">{children}</SiteShell>
}
