import type { ComponentProps } from "react"
import { Callout as FdCallout } from "fumadocs-ui/components/callout"

// O Nextra usa type="info|warning|error" (e às vezes tip/default); o Fumadocs
// usa "info|warn|error|success". Este wrapper mapeia os valores para o MDX
// migrado continuar funcionando sem edição.
const MAP: Record<string, "info" | "warn" | "error" | "success"> = {
  info: "info",
  warning: "warn",
  warn: "warn",
  error: "error",
  tip: "success",
  success: "success",
  default: "info",
}

export function Callout({
  type,
  ...props
}: Omit<ComponentProps<typeof FdCallout>, "type"> & { type?: string }) {
  return <FdCallout type={type ? (MAP[type] ?? "info") : "info"} {...props} />
}
