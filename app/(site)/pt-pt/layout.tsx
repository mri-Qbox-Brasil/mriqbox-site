import type { ReactNode } from "react"
import { SiteShell } from "@/components/site/site-shell"

export default function EuropeanPortugueseLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="pt-PT">{children}</SiteShell>
}
