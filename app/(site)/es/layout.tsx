import type { ReactNode } from "react"
import { SiteShell } from "@/components/site/site-shell"

export default function SpanishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="es">{children}</SiteShell>
}
