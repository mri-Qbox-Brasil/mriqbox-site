// Gera o índice Pagefind ANTES do `next build`, direto do conteúdo MDX, em
// public/pagefind. Assim o índice entra no deploy da Vercel (public/ é
// coletado no início do build) e no `out/` do export (GITHUB_PAGES=true),
// sem depender do HTML pré-renderizado nem do binário via `npx`.
// Só docs/** entra no índice (idioma pt-br): as páginas de marketing dos
// locales (en/es/pt-pt) ficam fora, igual à busca Orama anterior.
//
// Cada página vira um HTML mínimo (título, descrição e corpo com headings
// com id) para o Pagefind gerar os sub-resultados com âncora. Os ids seguem
// o mesmo github-slugger que o fumadocs usa nos headings renderizados.
import { readdir, readFile, rm } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import GithubSlugger from "github-slugger"
import * as pagefind from "pagefind"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const contentDir = path.join(root, "content/docs")
const outputPath = path.join(root, "public/pagefind")

async function listDocs(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) files.push(...(await listDocs(full)))
    else if (/\.mdx?$/.test(e.name)) files.push(full)
  }
  return files
}

// content/docs/a/(grupo)/b.mdx -> /docs/a/b ; .../index.mdx -> pasta.
// No export (trailingSlash) o Next Link resolve /docs/a/b para /docs/a/b/.
export function urlFor(file) {
  const rel = path.relative(contentDir, file).replace(/\\/g, "/").replace(/\.mdx?$/, "")
  const segs = rel.split("/").filter((s) => !/^\(.+\)$/.test(s))
  if (segs.at(-1) === "index") segs.pop()
  return ["/docs", ...segs].join("/")
}

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/)
  if (!m) return { data: {}, body: src }
  const data = {}
  for (const line of m[1].split(/\r?\n/)) {
    const kv = line.match(/^(\w+):\s*(.*)$/)
    if (kv) data[kv[1]] = kv[2].trim().replace(/^(['"])(.*)\1$/, "$2")
  }
  return { data, body: src.slice(m[0].length) }
}

const escapeHtml = (s) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")

// Markdown/JSX inline -> texto puro. Code spans ficam literais (`<chave>`,
// `nve_iced_alamo`); fora deles some tag JSX, link e ênfase (`_` só fora de
// palavra, como no CommonMark).
function inlineText(s) {
  return s
    .split(/(`[^`]*`)/)
    .map((part, i) =>
      i % 2
        ? part.slice(1, -1)
        : part
            .replace(/\{\/\*[\s\S]*?\*\/\}/g, "")
            .replace(/<\/?[A-Za-z][^>]*>/g, " ")
            .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
            .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
            .replace(/(\*\*|\*|~~)(?=\S)(.*?\S)\1/g, "$2")
            .replace(/(?<!\w)(__|_)(?=\S)(.*?\S)\1(?!\w)/g, "$2"),
    )
    .join("")
    .replace(/\s+/g, " ")
    .trim()
}

export function mdxToHtml(src) {
  const { data, body } = parseFrontmatter(src)
  const slugger = new GithubSlugger()
  const out = []
  if (data.title) out.push(`<h1>${escapeHtml(data.title)}</h1>`)
  if (data.description) out.push(`<p>${escapeHtml(data.description)}</p>`)

  let fence = null
  let code = []
  for (const raw of body.split(/\r?\n/)) {
    const line = raw.trim()
    if (fence) {
      if (line.startsWith(fence)) {
        out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)
        fence = null
        code = []
      } else code.push(raw)
      continue
    }
    const open = line.match(/^(`{3,}|~{3,})/)
    if (open) {
      fence = open[1]
      continue
    }
    const h = line.match(/^(#{1,6})\s+(.*?)\s*#*$/)
    if (h) {
      // `## Título [#id-custom]` (sintaxe do fumadocs) ou slug do texto.
      const custom = h[2].match(/^(.*?)\s*\[#([^\]]+)\]$/)
      const text = inlineText(custom ? custom[1] : h[2])
      const id = custom ? custom[2] : slugger.slug(text)
      const level = Math.max(2, h[1].length)
      out.push(`<h${level} id="${escapeHtml(id)}">${escapeHtml(text)}</h${level}>`)
      continue
    }
    const text = inlineText(line.replace(/^(>|[-*+]|\d+\.)\s+/, "").replace(/^\|/, "").replace(/\|/g, " "))
    if (text && !/^[-:\s]+$/.test(text)) out.push(`<p>${escapeHtml(text)}</p>`)
  }
  if (fence && code.length) out.push(`<pre><code>${escapeHtml(code.join("\n"))}</code></pre>`)

  return {
    title: data.title,
    html: `<!doctype html><html lang="pt-br"><head><meta charset="utf-8"><title>${escapeHtml(data.title ?? "")}</title></head><body><main data-pagefind-body>${out.join("\n")}</main></body></html>`,
  }
}

async function main() {
  const files = (await listDocs(contentDir)).sort()
  const { index, errors } = await pagefind.createIndex({ forceLanguage: "pt-br" })
  if (!index) throw new Error(`pagefind createIndex falhou: ${errors.join("; ")}`)

  for (const file of files) {
    const { html } = mdxToHtml(await readFile(file, "utf8"))
    const res = await index.addHTMLFile({ url: urlFor(file), content: html })
    if (res.errors.length) {
      throw new Error(`pagefind ${path.relative(root, file)}: ${res.errors.join("; ")}`)
    }
  }

  await rm(outputPath, { recursive: true, force: true })
  const written = await index.writeFiles({ outputPath })
  if (written.errors.length) throw new Error(`pagefind writeFiles: ${written.errors.join("; ")}`)
  await pagefind.close()
  console.log(`[pagefind] ${files.length} páginas indexadas em ${path.relative(root, outputPath)}`)
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main().catch(async (err) => {
    console.error(err)
    await pagefind.close().catch(() => {})
    process.exit(1)
  })
}
