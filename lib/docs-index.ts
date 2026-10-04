import { source } from "@/lib/source"

// Docs split into chunks for the installer Help tab (local search + AI answer citing links).

export interface DocsChunk {
  /** Page URL relative to the site. */
  url: string
  /** Slug trail, e.g. "mri > resources". */
  path: string
  page: string
  section: string
  text: string
}

const MAX_CHUNK = 2400
const MAX_CODE = 1200

/** Drops frontmatter, imports and JSX tags, keeping their inner text. */
export function cleanMdx(raw: string): string {
  const lines = raw.replace(/\r\n/g, "\n").replace(/^---\n[\s\S]*?\n---\n/, "").split("\n")
  const out: string[] = []
  let fence: string[] | null = null
  let inTag = false
  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed.startsWith("```")) {
      if (fence) {
        const body = fence.join("\n")
        out.push("```", body.length > MAX_CODE ? body.slice(0, MAX_CODE) + "\n..." : body, "```")
        fence = null
      } else {
        fence = []
      }
      continue
    }
    if (fence) { fence.push(line.replace(/^ {4}/, "")); continue }
    if (/^(import|export)\s/.test(trimmed)) continue
    if (inTag) { if (trimmed.includes(">")) inTag = false; continue }
    // Multi-line JSX opening tag: skip its attribute lines.
    if (/^<[A-Z][\w.]*$/.test(trimmed) || (/^<[A-Z]/.test(trimmed) && !trimmed.includes(">"))) { inTag = true; continue }
    const text = trimmed
      .replace(/<\/?[A-Z][\w.]*(\s[^>]*)?\/?>/g, "")
      .replace(/<br\s*\/?>/g, "")
      .trim()
    // Tag-only lines become blank; avoid stacking blanks.
    if (!text && trimmed && out[out.length - 1] === "") continue
    out.push(text)
  }
  return out.join("\n").replace(/\n{3,}/g, "\n\n").trim()
}

/** Splits by ## and ### headings, then by paragraph when still too long. */
export function splitSections(text: string, pageTitle: string): { section: string; text: string }[] {
  const parts: { section: string; text: string }[] = []
  let current = { section: pageTitle, lines: [] as string[] }
  let inCode = false
  const flush = () => {
    const body = current.lines.join("\n").trim()
    if (body) parts.push(...splitLong(current.section, body))
  }
  for (const line of text.split("\n")) {
    if (line.startsWith("```")) inCode = !inCode
    const heading = !inCode && line.match(/^#{2,3}\s+(.+)$/)
    if (heading) {
      flush()
      current = { section: heading[1].replace(/[`*]/g, "").trim(), lines: [] }
    } else {
      current.lines.push(line)
    }
  }
  flush()
  return parts
}

function splitLong(section: string, body: string) {
  if (body.length <= MAX_CHUNK) return [{ section, text: body }]
  const out: { section: string; text: string }[] = []
  let buf = ""
  for (const para of body.split(/\n\n/)) {
    if (buf && buf.length + para.length > MAX_CHUNK) {
      out.push({ section, text: buf.trim() })
      buf = ""
    }
    buf += para + "\n\n"
  }
  if (buf.trim()) out.push({ section, text: buf.trim().slice(0, MAX_CHUNK * 2) })
  return out
}

export async function buildDocsIndex(): Promise<DocsChunk[]> {
  const chunks: DocsChunk[] = []
  for (const page of source.getPages()) {
    const raw = await page.data.getText("raw")
    const title = page.data.title ?? page.url
    const crumbs = page.slugs.slice(0, -1).join(" > ")
    const intro = page.data.description ? `${page.data.description}\n\n` : ""
    for (const part of splitSections(intro + cleanMdx(raw), title)) {
      chunks.push({ url: page.url, path: crumbs, page: title, section: part.section, text: part.text })
    }
  }
  return chunks
}
