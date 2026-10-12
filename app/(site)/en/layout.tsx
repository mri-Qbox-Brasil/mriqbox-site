import type { ReactNode } from "react"
import { SiteShell } from "@/components/site/site-shell"

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <SiteShell locale="en">{children}</SiteShell>
}
