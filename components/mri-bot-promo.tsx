import Link from "next/link"
import { ArrowUpRight, Bot, Gift, ShoppingBag, Ticket, Vote, Zap } from "lucide-react"
import type { HomeDictionary } from "@/components/home/content"

export const MRI_BOT_URL = "https://bot.mriqbox.com.br"

// Mirrors the highlights of the landing at bot.mriqbox.com.br.
const HIGHLIGHTS = [
  { id: "store", icon: ShoppingBag },
  { id: "instantRole", icon: Zap },
  { id: "tickets", icon: Ticket },
  { id: "polls", icon: Vote },
  { id: "freePlan", icon: Gift },
] as const

// Same visual style as the installer card on the home page.
export function MriBotPromo({ t }: { t: HomeDictionary["mriBot"] }) {
  return (
    <section className="w-full px-6 pb-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f0e] p-6 sm:p-8">
        <div className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2.5">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">{t.eyebrow}</span>
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">{t.title}</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.text}</p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {HIGHLIGHTS.map(({ id, icon: Icon }) => (
                <li
                  key={id}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {t.highlights[id]}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href={MRI_BOT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-full shrink-0 items-center justify-between gap-6 rounded-xl bg-primary px-6 py-4 text-sm font-black text-primary-foreground transition-colors hover:bg-primary/90 md:w-auto"
          >
            {t.cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
