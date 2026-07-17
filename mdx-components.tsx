import defaultMdxComponents from "fumadocs-ui/mdx"
import type { MDXComponents } from "mdx/types"
import type { ComponentProps, ComponentType } from "react"
import { Steps, Step } from "fumadocs-ui/components/steps"
import { Files, Folder, File } from "fumadocs-ui/components/files"
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

// <img> cru no MDX com caminho absoluto /docs/... (assets em public/docs) não
// recebe o basePath do Next automaticamente. Este wrapper prefixa o basePath
// (vazio em produção, /mriqbox-site no GitHub Pages) e delega ao img padrão do
// Fumadocs (mantém o zoom). Imagens markdown já vêm resolvidas via _next/ e
// passam sem alteração.
const DefaultImg = (defaultMdxComponents as MDXComponents).img as
  | ComponentType<ComponentProps<"img">>
  | undefined
function DocsImg({ src, ...props }: ComponentProps<"img">) {
  const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const finalSrc = typeof src === "string" && src.startsWith("/docs/") ? `${bp}${src}` : src
  return DefaultImg ? (
    <DefaultImg src={finalSrc} {...props} />
  ) : (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={finalSrc} alt={props.alt ?? ""} {...props} />
  )
}

// Componentes disponíveis globalmente dentro do MDX. Assim os arquivos migrados
// não precisam de imports (nextra/components e @components/* são removidos na
// conversão da Fase 3).
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: DocsImg,
    // <img> JSX explícito no MDX não passa pelo mapa de componentes; a conversão
    // reescreve <img> -> <DocsImage> para o basePath ser aplicado nos assets.
    DocsImage: DocsImg,
    // Nextra -> Fumadocs
    Callout,
    Tabs,
    Tab,
    Steps,
    Step,
    Files,
    Folder,
    File,
    // Tabelas do Nextra -> elementos nativos (o Fumadocs estiliza <table>)
    Table: (props: ComponentProps<"table">) => <table {...props} />,
    Tr: (props: ComponentProps<"tr">) => <tr {...props} />,
    Td: (props: ComponentProps<"td">) => <td {...props} />,
    Th: (props: ComponentProps<"th">) => <th {...props} />,
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
