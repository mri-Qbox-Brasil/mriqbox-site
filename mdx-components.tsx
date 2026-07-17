import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"

// Componentes disponíveis globalmente dentro do MDX. Os componentes do Nextra
// (Callout, Tabs, Steps, ...) e os próprios entram aqui na Fase 2.
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...components,
  }
}
