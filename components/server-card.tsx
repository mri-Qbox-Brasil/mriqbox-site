import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import { joinUrl, type MriServer } from "@/lib/mri-servers"

const MAX_CHIPS = 3

export function ServerCard({ server }: { server: MriServer }) {
  const online = server.players > 0
  const extra = server.resources.length - MAX_CHIPS

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-card p-5 transition-colors hover:border-primary/40">
      <div className="flex items-center gap-3 min-w-0">
        {server.logo ? (
          <Image
            src={server.logo}
            alt=""
            width={44}
            height={44}
            unoptimized
            className="h-11 w-11 shrink-0 rounded-xl bg-white/5 object-cover"
          />
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-lg font-black text-white/60">
            {server.name.charAt(0).toUpperCase() || "?"}
          </div>
        )}
        <div className="min-w-0">
          <h3 className="truncate font-bold text-white" title={server.name}>
            {server.name}
          </h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className={`h-1.5 w-1.5 rounded-full ${online ? "bg-primary" : "bg-white/20"}`} />
            {online ? (
              <span>
                <strong className="text-white">{server.players}</strong>
                {server.maxPlayers ? ` / ${server.maxPlayers}` : ""} jogadores
              </span>
            ) : (
              <span>sem jogadores agora</span>
            )}
          </div>
        </div>
      </div>

      <ul className="flex flex-wrap gap-1.5">
        {server.resources.slice(0, MAX_CHIPS).map((r) => (
          <li key={r} className="rounded-md bg-white/5 px-2 py-0.5 font-mono text-[11px] text-white/70">
            {r}
          </li>
        ))}
        {extra > 0 && (
          <li className="rounded-md bg-white/5 px-2 py-0.5 text-[11px] text-white/50" title={server.resources.slice(MAX_CHIPS).join(", ")}>
            +{extra}
          </li>
        )}
      </ul>

      <Link
        href={joinUrl(server.id)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/5 py-2 text-xs font-bold text-white transition-colors hover:border-primary/50 hover:text-primary"
      >
        Entrar no servidor
        <ArrowUpRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
