import { source } from "@/lib/source"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { docsLink, getMDXComponents } from "@/mdx-components"
import type { Metadata } from "next"
import { OG_IMAGE } from "@/lib/page-metadata"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      {/* Pagefind indexa só este bloco (título + descrição + corpo):
          nav, sidebar, TOC e footer ficam fora do índice. */}
      <div data-pagefind-body>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsDescription>{page.data.description}</DocsDescription>
        <DocsBody>
          <MDXContent components={getMDXComponents({ a: docsLink(page.url) })} />
        </DocsBody>
      </div>
    </DocsPage>
  )
}

export function generateStaticParams() {
  return source.generateParams()
}

export async function generateMetadata(props: {
  params: Promise<{ slug?: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const description = page.data.description
    ?? `${page.data.title}: documentação técnica em português da MRI Qbox Brasil para desenvolvimento de servidores FiveM.`

  return {
    title: `${page.data.title} | Documentação MRI Qbox`,
    description,
    alternates: { canonical: page.url },
    openGraph: {
      title: `${page.data.title} | Documentação MRI Qbox`,
      description,
      url: page.url,
      type: "article",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | Documentação MRI Qbox`,
      description,
      images: [OG_IMAGE],
    },
  }
}
