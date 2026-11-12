#!/usr/bin/env node
"use strict"

// Publica a documentacao de resources em content/docs/mri/resources (Fumadocs).
//
// FONTE UNICA DE VERDADE: as receitas do mriTxRecipe (branch main).
//   - repo ativo na receita base (base.yaml)  -> publica normal;
//   - repo ativo so na beta (beta.yaml)       -> publica com "(beta)" no titulo,
//     se DOCS_PUBLISH_BETA nao for false/0/off/no;
//   - fora das receitas, ou sem MANUAL.md     -> NAO publica, e a pagina e apagada.
// Linha comentada na receita nao conta. A lite e um subconjunto da base.
//
// O MANUAL.md vem do <repo>-source quando ele existe e tem o arquivo (fonte
// privada); senao do proprio <repo>. A pagina sai sempre com o nome do repo da
// receita (o publico).
//
// Uso:
//   node ingest-docs.js              reconcilia tudo (sync semanal / receita mudou)
//   node ingest-docs.js <slug>[,...] so esses slugs (aviso de MANUAL.md de um repo)
//
// Qualquer erro de rede/API que nao seja 404 aborta ANTES de escrever ou apagar:
// melhor nao atualizar do que apagar paginas por uma falha momentanea.
//
// O Fumadocs renderiza .md como Markdown puro (sem expressoes MDX). So
// normalizamos o realce de codigo (cfg -> ini, que o shiki nao conhece) e
// injetamos frontmatter com o titulo. Quem garante que renderiza e o passo de
// build no workflow, que roda antes do commit.

const fs = require("fs")
const path = require("path")

const ORG = "mri-Qbox-Brasil"
const RECIPE_REPO = "mriTxRecipe"
const RESOURCES = path.join("content", "docs", "mri", "resources")
const META = path.join(RESOURCES, "meta.json")
const RESOURCES_TITLE = "Resources"
const TOKEN = process.env.GH_TOKEN
const OFF = ["false", "0", "off", "no"]
const PUBLISH_BETA = !OFF.includes((process.env.DOCS_PUBLISH_BETA || "").trim().toLowerCase())

async function getRaw(p) {
  const res = await fetch(`https://api.github.com/repos/${ORG}/${p}`, {
    headers: {
      Authorization: `token ${TOKEN}`,
      Accept: "application/vnd.github.v3.raw",
      "User-Agent": "mriqbox-site",
    },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`${p}: HTTP ${res.status}`)
  return res.text()
}

// Repos da org ativos numa receita (linhas comentadas sao recursos desativados).
async function recipeRepos(file) {
  const text = await getRaw(`${RECIPE_REPO}/contents/recipes/${file}`)
  if (text === null) throw new Error(`receita ${file} nao encontrada`)
  const found = new Set()
  for (const line of text.split("\n")) {
    if (/^\s*#/.test(line)) continue
    const m = line.match(new RegExp(`github\\.com/${ORG}/([A-Za-z0-9_.-]+)`))
    if (m) found.add(m[1].replace(/\.git$/, ""))
  }
  if (!found.size) throw new Error(`receita ${file} sem nenhum repo da org`)
  return found
}

const ACRONYMS = new Set([
  "PS", "CW", "ND", "CDN", "MDT", "PMA", "RHD", "IPL", "UI", "NPWD",
  "MM", "ARS", "LVC", "FPS", "HUD", "NPC",
])

// mri_Qbackpack -> "MRI Qbackpack"; mri_Qblips_v1 -> "MRI Qblips v1";
// ps-housing -> "PS Housing".
function friendlyName(repo) {
  const mri = repo.match(/^mri[_-]Q(.+)$/i)
  if (mri) return `MRI Q${mri[1].replace(/[_-]/g, " ")}`
  return repo
    .split(/[_-]/)
    .filter(Boolean)
    .map((w) => (ACRONYMS.has(w.toUpperCase()) ? w.toUpperCase() : w[0].toUpperCase() + w.slice(1)))
    .join(" ")
}

// Devolve { from, doc } ou null se nenhum dos dois repos tem o arquivo.
async function fetchManual(repo) {
  for (const from of [`${repo}-source`, repo]) {
    const doc = await getRaw(`${from}/contents/MANUAL.md`)
    if (doc !== null) return { from, doc }
  }
  return null
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
  const safe = /[:#'"\[\]{}()]|^\s|\s$/.test(title) ? JSON.stringify(title) : title
  return `---\ntitle: ${safe}\n---\n\n`
}

const BETA_NOTE =
  "> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. " +
  "Pode mudar sem aviso.\n\n"

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

// Limita as chamadas simultaneas a API.
async function mapLimit(items, n, fn) {
  const out = new Array(items.length)
  let i = 0
  await Promise.all(
    Array.from({ length: n }, async () => {
      while (i < items.length) {
        const k = i++
        out[k] = await fn(items[k])
      }
    }),
  )
  return out
}

async function main() {
  if (!TOKEN) {
    console.error("GH_TOKEN nao definido.")
    process.exit(1)
  }

  const only = (process.argv[2] || "")
    .split(",")
    .map((s) => s.trim().replace(/-source$/, ""))
    .filter(Boolean)

  const base = await recipeRepos("base.yaml")
  const beta = await recipeRepos("beta.yaml")
  console.log(`receitas: base ${base.size} | beta ${beta.size} | beta publicada: ${PUBLISH_BETA ? "sim" : "nao"}`)

  // Candidatos: tudo das receitas (modo completo) ou so os slugs pedidos.
  const candidates = only.length ? only : [...new Set([...base, ...beta])]

  // Fase 1: decide e baixa tudo em memoria. Nada e escrito se algo falhar.
  const plan = await mapLimit(candidates, 8, async (slug) => {
    const tier = base.has(slug) ? "base" : beta.has(slug) ? "beta" : null
    if (!tier) return { slug, skip: "fora das receitas" }
    if (tier === "beta" && !PUBLISH_BETA) return { slug, skip: "so na beta (DOCS_PUBLISH_BETA desligada)" }
    const manual = await fetchManual(slug)
    if (!manual) return { slug, skip: "sem MANUAL.md" }
    const name = friendlyName(slug) + (tier === "beta" ? " (beta)" : "")
    const body = (tier === "beta" ? BETA_NOTE : "") + transform(stripFrontmatter(manual.doc))
    return { slug, tier, from: manual.from, out: frontmatter(name) + body }
  })

  // Fase 2: escreve as publicadas e apaga o resto.
  fs.mkdirSync(RESOURCES, { recursive: true })
  const publish = new Set()
  for (const p of plan) {
    if (!p.out) continue
    publish.add(p.slug)
    fs.writeFileSync(path.join(RESOURCES, `${p.slug}.md`), p.out)
    console.log(`ok ${p.slug}${p.tier === "beta" ? " (beta)" : ""}  (de ${ORG}/${p.from})`)
  }

  // Modo completo: toda pagina fora do plano sai. Modo parcial: so as pedidas.
  const existing = fs.readdirSync(RESOURCES).filter((f) => f.endsWith(".md")).map((f) => f.slice(0, -3))
  const scope = only.length ? existing.filter((s) => only.includes(s)) : existing
  const reasons = Object.fromEntries(plan.filter((p) => p.skip).map((p) => [p.slug, p.skip]))
  let removed = 0
  for (const slug of scope) {
    if (publish.has(slug)) continue
    fs.unlinkSync(path.join(RESOURCES, `${slug}.md`))
    removed++
    console.log(`removida ${slug}  (${reasons[slug] || "fora das receitas"})`)
  }

  writeMeta()

  const skipped = plan.filter((p) => p.skip)
  console.log(`\npublicadas: ${publish.size} | removidas: ${removed} | fora: ${skipped.length}`)
  for (const p of skipped) console.log(`  - ${p.slug}: ${p.skip}`)
}

main().catch((err) => {
  console.error(err.message || err)
  process.exit(1)
})
