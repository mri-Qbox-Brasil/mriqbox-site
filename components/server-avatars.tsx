import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { mriServers, totalServers } from "@/lib/mri-servers"

const AVATARS = 12
const AVATARS_MOBILE = 8 // no celular cabe uma linha só

function Badge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      className={`${className} h-8 min-w-8 items-center justify-center rounded-full border-2 border-background bg-primary px-1.5 text-[10px] font-black text-primary-foreground`}
    >
      {children}
    </span>
  )
}

// Logos agrupados dos servidores com mais jogadores (só os que têm logo), com
// "+N" pro resto. Fica dentro do card do gráfico da home e leva pra /servidores.
export function ServerAvatars() {
  const withLogo = mriServers.filter((s) => s.logo).slice(0, AVATARS)
  if (!withLogo.length) return null
  const rest = totalServers - withLogo.length
  const restMobile = totalServers - Math.min(withLogo.length, AVATARS_MOBILE)

  return (
    <Link
      href="/servidores"
      aria-label={`Ver os ${totalServers} servidores que usam MRI`}
      className="group flex flex-wrap items-center -space-x-2"
    >
      {withLogo.map((s, i) => (
        <Image
          key={s.id}
          src={s.logo as string}
          alt={s.name}
          title={s.name}
          width={32}
          height={32}
          unoptimized
          className={`h-8 w-8 rounded-full border-2 border-background bg-card object-cover transition-transform group-hover:-translate-y-0.5 ${
            i >= AVATARS_MOBILE ? "hidden sm:block" : ""
          }`}
        />
      ))}
      {restMobile > 0 && <Badge className="flex sm:hidden">+{restMobile}</Badge>}
      {rest > 0 && <Badge className="hidden sm:flex">+{rest}</Badge>}
    </Link>
  )
}
