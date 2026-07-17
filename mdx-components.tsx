import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import { Steps, Step } from "fumadocs-ui/components/steps"
import { Callout } from "@/components/docs/callout"
import { Tabs, Tab } from "@/components/docs/tabs"
import Contributors from "@/components/docs/contributors"
import ResourceLinks from "@/components/docs/resource-links"
import CollapsibleTable from "@/components/docs/collapsible-table"
import {
  GhButton,
  DocButton,
  DownloadButton,
  ReleaseButton,
  NpmButton,
} from "@/components/docs/link-button"
import { CreatorCode, CreatorCodes } from "@/components/docs/creator-code"

// Componentes disponíveis globalmente dentro do MDX. Assim os arquivos migrados
// não precisam de imports (nextra/components e @components/* são removidos na
// conversão da Fase 3).
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    // Nextra -> Fumadocs
    Callout,
    Tabs,
    Tab,
    Steps,
    Step,
    // Componentes próprios (refeitos no design do site)
    Contributors,
    ResourceLinks,
    CollapsibleTable,
    GhButton,
    DocButton,
    DownloadButton,
    ReleaseButton,
    NpmButton,
    CreatorCode,
    CreatorCodes,
    ...components,
  }
}
