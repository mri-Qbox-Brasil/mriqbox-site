"use client"

import { useEffect, useMemo } from "react"
import {
  SearchDialog,
  SearchDialogClose,
  SearchDialogContent,
  SearchDialogFooter,
  SearchDialogHeader,
  SearchDialogIcon,
  SearchDialogInput,
  SearchDialogList,
  SearchDialogOverlay,
} from "fumadocs-ui/components/dialog/search"
import { useDocsSearch } from "fumadocs-core/search/client"
import type { SharedProps } from "fumadocs-ui/contexts/search"
import type { ReactNode } from "react"

// Prefixo do site no GitHub Pages (vazio na Vercel/produção).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? ""

// Instância única do Pagefind (bundle gerado no build em /pagefind ou
// /mriqbox-site/pagefind). Idioma fixo pt-br: a doc é só em português
// (os locales en/es/pt-pt têm só as páginas de marketing, fora do índice).
let instancePromise: Promise<{
  search: (term: string) => Promise<{ results: Array<{ data: () => Promise<PagefindData> }> }>
}> | null = null

interface PagefindData {
  url: string
  excerpt: string
  meta?: { title?: string }
  sub_results?: Array<{ url: string; title: string; excerpt?: string }>
}

function getPagefind() {
  if (!instancePromise) {
    instancePromise = (async () => {
      const mod = await import(
        /* webpackIgnore: true */ `${BASE_PATH}/pagefind/pagefind.js`
      )
      const pf = mod.createInstance({ basePath: `${BASE_PATH}/pagefind/` })
      await pf.init("pt-br")
      return pf
    })()
  }
  return instancePromise
}

// Breadcrumbs a partir da URL (/docs/mri/resources/rhd_garage/ -> [mri, resources]).
function breadcrumbsFor(url: string): string[] {
  try {
    const segs = new URL(url, "https://example.com").pathname.split("/").filter(Boolean)
    const docsIdx = segs.indexOf("docs")
    const rest = docsIdx >= 0 ? segs.slice(docsIdx + 1) : segs
    return rest.slice(0, -1)
  } catch {
    return []
  }
}

// Cliente no formato que o useDocsSearch espera: { deps, search }.
const pagefindClient = {
  deps: ["pagefind"],
  async search(query: string) {
    const pf = await getPagefind()
    const res = await pf.search(query)
    const items: Array<{
      id: string
      type: "page" | "text"
      content: string
      breadcrumbs: string[]
      url: string
    }> = []
    for (const r of res.results.slice(0, 12)) {
      const data: PagefindData = await r.data()
      const title = data.meta?.title?.trim() || data.url
      items.push({
        id: data.url,
        type: "page",
        content: title,
        breadcrumbs: breadcrumbsFor(data.url),
        url: data.url,
      })
      for (const sub of (data.sub_results ?? []).slice(0, 2)) {
        items.push({
          id: sub.url,
          type: "text",
          content: sub.excerpt || sub.title,
          breadcrumbs: [...breadcrumbsFor(sub.url), sub.title],
          url: sub.url,
        })
      }
      if (items.length >= 30) break
    }
    return items
  },
}

export interface PagefindSearchDialogProps extends SharedProps {
  links?: Array<[name: string, href: string]>
  delayMs?: number
  footer?: ReactNode
}

// Mesma UI/atalho do dialog padrão (Ctrl+K continua no SearchProvider);
// só a fonte dos resultados troca (Orama servidor -> Pagefind estático).
export default function PagefindSearchDialog({
  open,
  onOpenChange,
  links = [],
  delayMs,
  footer,
  ...props
}: PagefindSearchDialogProps) {
  const { search, setSearch, query } = useDocsSearch({
    client: pagefindClient,
    delayMs,
  })

  // Pré-carrega o bundle (wasm + índice) com o dialog ainda fechado.
  useEffect(() => {
    getPagefind().catch((err) => {
      console.warn("[pagefind] bundle indisponível (dev sem build?)", err)
    })
  }, [])

  const defaultItems = useMemo(() => {
    if (links.length === 0) return null
    return links.map(([name, link]) => ({
      type: "page" as const,
      id: name,
      content: name,
      url: link,
    }))
  }, [links])

  return (
    <SearchDialog
      search={search}
      onSearchChange={setSearch}
      isLoading={query.isLoading}
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <SearchDialogOverlay />
      <SearchDialogContent>
        <SearchDialogHeader>
          <SearchDialogIcon />
          <SearchDialogInput />
          <SearchDialogClose />
        </SearchDialogHeader>
        <SearchDialogList items={query.data !== "empty" ? query.data : defaultItems} />
      </SearchDialogContent>
      <SearchDialogFooter>{footer}</SearchDialogFooter>
    </SearchDialog>
  )
}
