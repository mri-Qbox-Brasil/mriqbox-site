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
  const results = await Promise.allSettled(MRI_RESOURCES.map(fetchStats))

  let servers = 0
  let players = 0
  let ok = false
  for (const r of results) {
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
