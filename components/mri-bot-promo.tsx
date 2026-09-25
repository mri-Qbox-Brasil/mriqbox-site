import Link from "next/link"
import { ArrowUpRight, Bot, Gift, ShoppingBag, Ticket, Vote, Zap } from "lucide-react"

export const MRI_BOT_URL = "https://bot.mriqbox.com.br"

// Destaques do MRI BOT, espelhando a landing em bot.mriqbox.com.br.
const HIGHLIGHTS = [
  { icon: ShoppingBag, label: "Loja com Pix e cartão" },
  { icon: Zap, label: "Cargo entregue na hora" },
  { icon: Ticket, label: "Tickets profissionais" },
  { icon: Vote, label: "Enquetes por cargo" },
  { icon: Gift, label: "Plano grátis pra sempre" },
]

// Chamada para o MRI BOT na home, no mesmo estilo do card do instalador.
export function MriBotPromo() {
  return (
    <section className="w-full px-6 pb-16">
      <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f0e] p-6 sm:p-8">
        <div className="pointer-events-none absolute -left-20 -bottom-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-3 flex items-center gap-2.5">
              <Bot className="h-4 w-4 text-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Novo: MRI BOT</span>
            </div>
            <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
              Transforme seu Discord em um negócio.
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
              Loja, tickets, enquetes e projetos num bot só, gerenciado por um painel web. O Pix cai
              direto na sua conta do Mercado Pago e o cargo é entregue automaticamente.
            </p>

            <ul className="mt-5 flex flex-wrap gap-2">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white/80"
                >
                  <Icon className="h-3.5 w-3.5 text-primary" />
                  {label}
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
            Começar grátis
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  )
}
