import type { ReactNode } from "react"
import { Accordions, Accordion } from "fumadocs-ui/components/accordion"

interface Props {
  children?: ReactNode
  label?: string
}

// Substitui o CollapsibleTable do Nextra (que usava MriAccordion) pelo
// Accordion do Fumadocs, já no tema dos docs.
export default function CollapsibleTable({ children, label = "Lista" }: Props) {
  return (
    <Accordions type="single" className="mt-4 w-full">
      <Accordion title={label}>{children}</Accordion>
    </Accordions>
  )
}
