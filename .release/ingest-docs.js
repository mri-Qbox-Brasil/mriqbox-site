#!/usr/bin/env node
"use strict"

// Baixa o MANUAL.md de um ou mais repositorios e publica em
// content/docs/mri/resources (formato Fumadocs).
//
// Serve os dois caminhos com a mesma logica:
//   - update-doc.yml    (repository_dispatch: 1 repo por vez, incremental)
//   - sync-all-docs.yml (workflow_dispatch: o catalogo inteiro, 1 commit so)
//
// Entrada: JSON (array ou objeto unico) via argv[2] ou stdin.
//   { org, repo, slug?, name?, doc_file? }
//
//   repo -> DE ONDE o arquivo e baixado
//   slug -> SOB QUAL nome o arquivo .md e publicado (default: repo)
//   name -> titulo amigavel na sidebar (default: repo)
//
// O Fumadocs renderiza .md como Markdown puro (sem expressoes MDX: chaves e
// sinais de menor vao literais). Por isso nao ha saneamento de MDX aqui — so
// normalizamos o realce de codigo (cfg -> ini, que o shiki nao conhece) e
// injetamos frontmatter com o titulo. Quem garante que renderiza e o passo de
// build no workflow, que roda antes do commit.

const fs = require("fs")
const path = require("path")

const RESOURCES = path.join("content", "docs", "mri", "resources")
const META = path.join(RESOURCES, "meta.json")
const RESOURCES_TITLE = "Resources"
const TOKEN = process.env.GH_TOKEN

async function fetchDoc({ org, repo, doc_file }) {
  const url = `https://api.github.com/repos/${org}/${repo}/contents/${doc_file}`
  const res = await fetch(url, {
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "mriqbox-site",
    },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${org}/${repo}: HTTP ${res.status}`)
  return res.text()
}

// remove frontmatter existente (se vier no MANUAL)
function stripFrontmatter(text) {
  const m = text.match(/^﻿?---\r?\n[\s\S]*?\r?\n---\r?\n?/)
  return m ? text.slice(m[0].length) : text
}

// remove o primeiro H1 (o titulo vira DocsTitle via frontmatter) e normaliza
// linguagens de code fence desconhecidas
function transform(body) {
  const lines = body.split(/\r?\n/)
  const out = []
  let inFence = false
  let h1removed = false
  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence
    if (!inFence && !h1removed && /^#\s+\S/.test(line)) {
      h1removed = true
      continue
    }
    out.push(line)
  }
  let text = out.join("\n")
  text = text.replace(/^(\s*(?:```|~~~))cfg\b/gm, "$1ini")
  return text.replace(/^\s*\n+/, "")
}

function frontmatter(title) {
  const safe = /[:#'"\[\]{}]|^\s|\s$/.test(title) ? JSON.stringify(title) : title
  return `---\ntitle: ${safe}\n---\n\n`
}

// meta.json lista, em ordem alfabetica, os .md que existem em disco. Assim ele
// se autocorrige: ao remover um .md, a entrada some sozinha. Os nomes amigaveis
// moram no frontmatter de cada arquivo (a sidebar do Fumadocs usa o title).
function writeMeta() {
  const slugs = fs
    .readdirSync(RESOURCES)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.slice(0, -3))
    .sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()))
  fs.writeFileSync(META, JSON.stringify({ title: RESOURCES_TITLE, pages: slugs }, null, 2) + "\n")
}

async function main() {
  if (!TOKEN) {
    console.error("GH_TOKEN nao definido.")
    process.exit(1)
  }

  const raw = process.argv[2] || fs.readFileSync(0, "utf8")
  const input = JSON.parse(raw)
  const items = Array.isArray(input) ? input : [input]

  fs.mkdirSync(RESOURCES, { recursive: true })

  const missing = []
  let written = 0

  for (const item of items) {
    const org = item.org || "mri-Qbox-Brasil"
    const repo = item.repo
    const slug = item.slug || repo
    const name = item.name || repo
    const doc_file = item.doc_file || "MANUAL.md"

    let doc
    try {
      doc = await fetchDoc({ org, repo, doc_file })
    } catch (err) {
      console.error(`x ${repo}: ${err.message}`)
      process.exitCode = 1
      continue
    }

    // Um repo sem MANUAL.md nao e erro: o catalogo cobre mais repos do que ja
    // foram documentados. Avisa e segue.
    if (doc === null) {
      missing.push(repo)
      continue
    }

    const out = frontmatter(name) + transform(stripFrontmatter(doc))
    fs.writeFileSync(path.join(RESOURCES, `${slug}.md`), out)
    written++
    console.log(`ok ${slug}  (de ${org}/${repo})`)
  }

  writeMeta()

  console.log(`\npublicados: ${written} | sem MANUAL.md: ${missing.length}`)
  if (missing.length) console.log(`sem doc: ${missing.join(", ")}`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
