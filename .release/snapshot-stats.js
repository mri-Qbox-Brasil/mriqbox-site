#!/usr/bin/env node
"use strict"

// Coleta o nosso PROPRIO historico de uso dos recursos MRI a partir do 5metrics
// e acumula em data/stats-history.json. Roda de tempos em tempos via GitHub
// Action (snapshot-stats.yml) e commita o arquivo.
//
// Por que ter historico proprio: o 5metrics so expoe o valor ATUAL na meta
// description (`used by X servers and Y players`). O grafico de serie temporal
// deles fica atras de um server action RSC (hash preso ao deploy + same-origin),
// que nao da pra consumir de forma estavel. Entao amostramos o valor atual a
// cada execucao e montamos a serie aqui — funciona ate no build estatico do
// GitHub Pages, que nao tem backend.
//
// A lista de recursos e a regex espelham app/page.tsx (mesma logica de MAX): se
// mexer la, mexa aqui.

const fs = require("fs")
const path = require("path")

const HISTORY = path.join("data", "stats-history.json")
const MAX_POINTS = 1000 // ~4 meses a cada 3h; corta o mais antigo

const MRI_RESOURCES = [
  "mri_Qloadscreen",
  "mri_Qobjects",
  "mri_Qbox",
  "mri_Qnitro",
  "mri_Qadmin",
  "mri_Qhud",
  "mri_Qspawn",
  "mri_Qblackout",
  "mri_Qcarkeys",
]

// Server action RSC do 5metrics: lista os servidores (top ~25 por rank) de um
// recurso. O id do action muda quando o 5metrics faz deploy — mantenha em sync
// com app/page.tsx (FIVEMETRICS_SERVERS_ACTION).
const FIVEMETRICS_SERVERS_ACTION = "401578d09ec9acd55c5b3e73c7c382ca742415877d"

// Servidores por recurso (id + jogadores), pra deduplicar a uniao.
async function fetchResourceServers(resource) {
  const res = await fetch(`https://5metrics.dev/resource/${resource}`, {
    method: "POST",
    headers: {
      "next-action": FIVEMETRICS_SERVERS_ACTION,
      "content-type": "text/plain;charset=UTF-8",
      accept: "text/x-component",
      "User-Agent": "MRIQbox-site/1.0",
    },
    body: JSON.stringify([{ order: "asc", locale: "$undefined", search: "", sort: "rank", page: 0, resource: [resource], owner: "$undefined" }]),
  })
  if (!res.ok) throw new Error(`${resource}: HTTP ${res.status}`)
  const text = await res.text()
  const out = []
  for (const m of text.matchAll(/"id":"([^"]+)"[^}]*?"players":(\d+)/g)) {
    out.push({ id: m[1], players: parseInt(m[2], 10) })
  }
  return out
}

// Agregado por recurso (meta description) — usado pro MAX de servidores e como
// fallback de jogadores se a uniao falhar.
async function fetchStats(resource) {
  const res = await fetch(`https://5metrics.dev/resource/${resource}`, {
    headers: { "User-Agent": "MRIQbox-site/1.0" },
  })
  if (!res.ok) throw new Error(`${resource}: HTTP ${res.status}`)
  const html = await res.text()
  // meta description: "used by X (...) servers and Y (...) players"
  const match = html.match(/used by (\d+)[^<]+servers and (\d+)/)
  if (!match) return null
  return { servers: parseInt(match[1], 10), players: parseInt(match[2], 10) }
}

function readHistory() {
  try {
    const raw = fs.readFileSync(HISTORY, "utf8")
    const arr = JSON.parse(raw)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

async function main() {
  // Agregado (meta): MAX de servidores + MAX de jogadores (fallback).
  const stats = await Promise.allSettled(MRI_RESOURCES.map(fetchStats))
  let servers = 0
  let players = 0
  let ok = false
  for (const r of stats) {
    if (r.status === "fulfilled" && r.value) {
      if (r.value.servers > servers) servers = r.value.servers
      if (r.value.players > players) players = r.value.players
      ok = true
    }
  }

  if (!ok) {
    console.error("Nenhum recurso respondeu — nao gravo ponto vazio.")
    process.exit(1)
  }

  // Jogadores: uniao dos servidores que rodam qualquer recurso, deduplicada por
  // servidor (o numero honesto — ver comentario em app/page.tsx). Se falhar,
  // fica o MAX da meta acima.
  try {
    const lists = await Promise.allSettled(MRI_RESOURCES.map(fetchResourceServers))
    const union = new Map()
    for (const r of lists) {
      if (r.status === "fulfilled") {
        for (const s of r.value) {
          const prev = union.get(s.id) || 0
          if (s.players > prev) union.set(s.id, s.players)
        }
      }
    }
    if (union.size > 0) {
      players = [...union.values()].reduce((a, b) => a + b, 0)
    }
  } catch {
    // mantem o MAX da meta
  }

  const history = readHistory()
  // ISO truncado na hora: dedup se rodar 2x na mesma hora (mantem o ultimo).
  const t = new Date().toISOString().slice(0, 13) + ":00:00.000Z"
  const point = { t, servers, players }

  if (history.length && history[history.length - 1].t === t) {
    history[history.length - 1] = point
  } else {
    history.push(point)
  }

  const trimmed = history.slice(-MAX_POINTS)

  fs.mkdirSync(path.dirname(HISTORY), { recursive: true })
  fs.writeFileSync(HISTORY, JSON.stringify(trimmed, null, 0) + "\n")

  console.log(`ok ${t} | ${servers} servers | ${players} players | ${trimmed.length} pontos`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
