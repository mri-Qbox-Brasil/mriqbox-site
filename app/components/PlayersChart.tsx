// Card de "jogadores utilizando neste exato momento": lidera com o valor AO VIVO
// (soma dos conectados agora nos servidores que rodam recursos MRI, buscado em
// page.tsx via 5metrics) e mostra a tendencia dos ultimos dias como um grafico
// de area.
//
// O grafico e SVG renderizado no servidor — nenhum JS vai pro cliente, entao
// funciona no export estatico do GitHub Pages. A serie vem de
// data/stats-history.json, alimentado pela Action snapshot-stats.yml.

type Point = { t: string; servers: number; players: number }

const W = 720
const H = 150
const PAD_X = 8
const PAD_TOP = 16
const PAD_BOTTOM = 18

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
}

export default function PlayersChart({ data, current }: { data: Point[]; current: number }) {
  const points = [...data].sort((a, b) => a.t.localeCompare(b.t))
  const hasSeries = points.length >= 2

  const players = points.map((p) => p.players)
  const peak = Math.max(current, ...(players.length ? players : [current]))
  const yMax = Math.ceil((peak * 1.15) / 50) * 50 || 50

  const innerW = W - PAD_X * 2
  const innerH = H - PAD_TOP - PAD_BOTTOM
  const x = (i: number) => PAD_X + (points.length <= 1 ? innerW : (i / (points.length - 1)) * innerW)
  const y = (v: number) => PAD_TOP + innerH - (v / yMax) * innerH

  const line = players.map((v, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
  const area = `${line} L ${x(points.length - 1).toFixed(1)} ${(PAD_TOP + innerH).toFixed(1)} L ${x(0).toFixed(1)} ${(PAD_TOP + innerH).toFixed(1)} Z`

  return (
    <div className="w-full max-w-2xl rounded-2xl border border-white/5 bg-card/40 backdrop-blur-sm p-5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,230,153,0.6)] mt-1.5" />
          <div className="text-left">
            <div className="text-3xl md:text-4xl font-black text-white leading-none">{current.toLocaleString("pt-BR")}</div>
            <div className="text-xs uppercase tracking-wider text-white/60 mt-1">jogadores utilizando neste momento</div>
          </div>
        </div>
        {hasSeries && (
          <span className="text-xs text-muted-foreground/60 whitespace-nowrap">
            pico <span className="font-bold text-primary">{peak.toLocaleString("pt-BR")}</span>
          </span>
        )}
      </div>

      {hasSeries ? (
        <>
          <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto mt-3" preserveAspectRatio="none" role="img" aria-label="Jogadores conectados ao longo do tempo">
            <defs>
              <linearGradient id="playersAreaFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgb(0,230,153)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="rgb(0,230,153)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#playersAreaFill)" />
            <path d={line} fill="none" stroke="rgb(0,230,153)" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            <circle cx={x(points.length - 1)} cy={y(players[players.length - 1])} r="4" fill="rgb(0,230,153)" />
            <circle cx={x(points.length - 1)} cy={y(players[players.length - 1])} r="8" fill="rgb(0,230,153)" fillOpacity="0.2" />
          </svg>
          <div className="flex items-center justify-between mt-1 text-[10px] uppercase tracking-wider text-muted-foreground/50">
            <span>{fmtDate(points[0].t)}</span>
            <span>últimos dias</span>
            <span>{fmtDate(points[points.length - 1].t)}</span>
          </div>
        </>
      ) : (
        <p className="mt-3 text-[11px] text-muted-foreground/50">Coletando histórico de uso — a tendência aparece nos próximos dias.</p>
      )}
    </div>
  )
}
