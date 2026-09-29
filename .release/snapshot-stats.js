#!/usr/bin/env node
"use strict"

// Coleta o uso dos recursos MRI a partir do 5metrics e grava:
//   - data/stats-history.json: serie temporal (servidores e jogadores);
//   - data/servers.json: lista atual de servidores que usam algum recurso MRI.
// Roda via GitHub Action (snapshot-stats.yml), que commita os dois arquivos. A
// home e a pagina /servidores so leem esses arquivos, sem chamar o 5metrics.
//
// Quais recursos contam: todo repo da org que NAO e fork e comeca com "mri_"
// (o sufixo "-source" dos repos privados sai do nome). Forks ficam de fora de
// proposito: o 5metrics identifica recurso pelo nome, e um fork tem o mesmo
// nome do original, entao contaria servidores que nao usam a MRI.
//
// Numeros sem repeticao: um servidor que roda varios recursos MRI entra uma
// vez so, com os jogadores dele contados uma vez.

const fs = require("fs")
const path = require("path")

const ORG = "mri-Qbox-Brasil"
const HISTORY = path.join("data", "stats-history.json")
const SERVERS = path.join("data", "servers.json")
const MAX_POINTS = 1000 // ~4 meses a cada 3h; corta o mais antigo
const PAGE_SIZE = 25 // tamanho da pagina do 5metrics
const MAX_PAGES = 40
const UA = { "User-Agent": "MRIQbox-site/1.0" }

// Ultimo id conhecido da server action do 5metrics. O id muda a cada deploy
// deles, entao o script descobre o atual lendo o JS publico da pagina; este
// valor so e usado se a descoberta falhar.
const FALLBACK_ACTION = "40350660aab06bd8fdc81357014e4285196c506366"

async function listMriResources() {
  const headers = { ...UA, Accept: "application/vnd.github+json" }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const names = new Set()
  for (let page = 1; page <= 20; page++) {
    const res = await fetch(`https://api.github.com/orgs/${ORG}/repos?per_page=100&type=all&page=${page}`, { headers })
    if (!res.ok) throw new Error(`GitHub: HTTP ${res.status}`)
    const repos = await res.json()
    for (const r of repos) {
      if (!r.fork && /^mri_/i.test(r.name)) names.add(r.name.replace(/-source$/i, ""))
    }
    if (repos.length < 100) break
  }
  return [...names].sort()
}

// Procura, nos chunks JS da pagina de recurso, a action que lista os servidores.
async function discoverAction() {
  try {
    const html = await (await fetch("https://5metrics.dev/resource/mri_Qbox", { headers: UA })).text()
    const chunks = [...new Set(html.match(/\/_next\/static\/chunks\/[^"]+\.js/g) || [])]
    for (const chunk of chunks) {
      const js = await (await fetch(`https://5metrics.dev${chunk}`, { headers: UA })).text()
      const m = js.match(/createServerReference\)\("([0-9a-f]{40,44})"[^)]*"fetchServerLeaderboard"\)/)
      if (m) return m[1]
    }
  } catch {
    // cai no fallback
  }
  console.warn("action do 5metrics nao encontrada nos chunks; usando o id conhecido")
  return FALLBACK_ACTION
}

async function fetchPage(action, resource, page) {
  const res = await fetch(`https://5metrics.dev/resource/${resource}`, {
    method: "POST",
    headers: { ...UA, "next-action": action, "content-type": "text/plain;charset=UTF-8", accept: "text/x-component" },
    body: JSON.stringify([
      { order: "asc", locale: "$undefined", search: "", sort: "rank", page, resource: [resource], owner: "$undefined" },
    ]),
  })
  if (!res.ok) throw new Error(`${resource} p${page}: HTTP ${res.status}`)
  const text = await res.text()
  // Resposta RSC: linhas "id:json". A lista de servidores e o unico array de objetos.
  const start = text.indexOf("[{")
  if (start < 0) {
    if (/Server action not found/i.test(text)) throw new Error("action do 5metrics invalida")
    return []
  }
  return JSON.parse(text.slice(start, text.lastIndexOf("}]") + 2))
}

// O 5metrics as vezes falha uma requisicao isolada: tenta de novo antes de
// desistir do recurso.
async function withRetry(fn, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      return await fn()
    } catch (err) {
      if (i >= tries) throw err
      await new Promise((r) => setTimeout(r, 1000 * i))
    }
  }
}

async function fetchResourceServers(action, resource) {
  const out = []
  for (let page = 0; page < MAX_PAGES; page++) {
    const list = await withRetry(() => fetchPage(action, resource, page))
    out.push(...list)
    if (list.length < PAGE_SIZE) break
  }
  return out
}

// Nomes de servidor FiveM podem vir com codigos de cor (^1, ^7...).
const cleanName = (name) => String(name || "").replace(/\^[0-9]/g, "").replace(/\s+/g, " ").trim()

function readHistory() {
  try {
    const arr = JSON.parse(fs.readFileSync(HISTORY, "utf8"))
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

async function main() {
  const [resources, action] = await Promise.all([listMriResources(), discoverAction()])
  console.log(`${resources.length} recursos mri_ na org | action ${action.slice(0, 8)}...`)

  const servers = new Map()
  let failed = 0
  let next = 0
  async function worker() {
    while (next < resources.length) {
      const resource = resources[next++]
      try {
        for (const s of await fetchResourceServers(action, resource)) {
          const entry = servers.get(s.id) || {
            id: s.id,
            name: cleanName(s.name),
            logo: s.logo || null,
            locale: s.locale || null,
            players: s.players || 0,
            maxPlayers: s.maxPlayers || 0,
            avgPlayers: s.avgPlayers || 0,
            resources: [],
          }
          if (!entry.resources.includes(resource)) entry.resources.push(resource)
          servers.set(s.id, entry)
        }
      } catch (err) {
        failed++
        console.warn(`x ${resource}: ${err.message}`)
      }
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker))

  // Recurso que falhou mesmo com retry deixaria o total menor que o real e o
  // grafico mostraria uma queda que nao aconteceu. Nesse caso nao grava nada:
  // perde-se um ponto, mas a serie continua correta.
  if (failed || !servers.size) {
    console.error(`${failed} recursos falharam (${servers.size} servidores coletados). Nada foi gravado.`)
    process.exit(1)
  }

  const list = [...servers.values()]
    .map((s) => ({ ...s, resources: s.resources.sort() }))
    .sort((a, b) => b.players - a.players || b.avgPlayers - a.avgPlayers || a.name.localeCompare(b.name))
  const players = list.reduce((sum, s) => sum + s.players, 0)

  const history = readHistory()
  // ISO truncado na hora: dedup se rodar 2x na mesma hora (mantem o ultimo).
  const t = new Date().toISOString().slice(0, 13) + ":00:00.000Z"
  const point = { t, servers: list.length, players }
  if (history.length && history[history.length - 1].t === t) history[history.length - 1] = point
  else history.push(point)

  fs.mkdirSync(path.dirname(HISTORY), { recursive: true })
  fs.writeFileSync(HISTORY, JSON.stringify(history.slice(-MAX_POINTS), null, 0) + "\n")
  fs.writeFileSync(SERVERS, JSON.stringify({ updatedAt: new Date().toISOString(), resources, servers: list }, null, 1) + "\n")

  console.log(`ok ${t} | ${list.length} servidores | ${players} jogadores`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
