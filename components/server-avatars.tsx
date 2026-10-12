import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { mriServers, totalServers } from "@/lib/mri-servers"
import { ROUTES, type Locale } from "@/lib/i18n"
import { serversDictionary } from "@/components/servers/dictionary"

const AVATARS = 12
const AVATARS_MOBILE = 8 // a single row fits on phones

function Badge({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      className={`${className} h-8 min-w-8 items-center justify-center rounded-full border-2 border-background bg-primary px-1.5 text-[10px] font-black text-primary-foreground`}
    >
      {children}
    </span>
  )
}

// Logos of the busiest servers that have one, plus "+N" for the rest; links to the servers page.
export function ServerAvatars({ locale = "pt-BR" }: { locale?: Locale }) {
  const withLogo = mriServers.filter((s) => s.logo).slice(0, AVATARS)
  if (!withLogo.length) return null
  const rest = totalServers - withLogo.length
  const restMobile = totalServers - Math.min(withLogo.length, AVATARS_MOBILE)

  return (
    <Link
      href={ROUTES.servers[locale]}
      aria-label={serversDictionary[locale].avatarsLabel.replace("{count}", totalServers.toLocaleString(locale))}
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
      {restMobile > 0 && <Badge className="flex sm:hidden">+{restMobile.toLocaleString(locale)}</Badge>}
      {rest > 0 && <Badge className="hidden sm:flex">+{rest.toLocaleString(locale)}</Badge>}
    </Link>
  )
}
