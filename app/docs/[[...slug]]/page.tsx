import { source } from "@/lib/source"
import {
  DocsPage,
  DocsBody,
  DocsTitle,
  DocsDescription,
} from "fumadocs-ui/page"
import { notFound } from "next/navigation"
import { getMDXComponents } from "@/mdx-components"
import type { Metadata } from "next"

export default async function Page(props: {
  params: Promise<{ slug?: string[] }>
}) {
  const params = await props.params
  const page = source.getPage(params.slug)
  if (!page) notFound()

  const MDXContent = page.data.body

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <MDXContent components={getMDXComponents()} />
      </DocsBody>
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
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.data.title} | Documentação MRI Qbox`,
      description,
    },
  }
}
