import Link from "next/link"
import { Headphones, ArrowRight } from "lucide-react"
import { Github } from "@/components/icons/github"
import type { Locale } from "@/lib/i18n"
import { DISCORD_URL, DISCORD_WIDGET_URL, GITHUB_ORG_URL, discordDictionary } from "./dictionary"

export function DiscordPage({ locale }: { locale: Locale }) {
  const t = discordDictionary[locale]
  const [joinStep, ticketStep] = t.steps

  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background text-foreground font-sans relative flex flex-col">
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-[100px] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <div className="flex flex-col gap-5 max-w-xl">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-primary/20 bg-primary/10 w-fit">
            <Headphones className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">{t.badge}</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            {t.title.first}<br />
            <span className="text-primary">{t.title.highlight}</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{t.intro}</p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href={DISCORD_URL} className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 rounded-xl text-primary-foreground font-bold text-base transition-all">
              {t.join}
            </Link>
            <Link href={GITHUB_ORG_URL} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 text-white font-bold text-base transition-all hover:bg-white/10 hover:border-white/30 backdrop-blur-md">
              <Github className="h-5 w-5" />
              {t.github}
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex flex-col gap-2 hover:border-primary/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white font-bold mb-1">1</div>
              <h3 className="text-lg font-bold text-white">{joinStep.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{joinStep.text}</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex flex-col gap-2 hover:border-primary/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold mb-1">2</div>
              <h3 className="text-lg font-bold text-white">{ticketStep.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{ticketStep.text}</p>
              <span className="text-[10px] font-bold text-primary mt-1 flex items-center gap-1">{t.goToChannel} <ArrowRight className="w-3 h-3" /></span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center lg:justify-end h-full">
          <div className="relative w-full max-w-[400px] h-[500px] max-h-[75vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            <div className="h-10 bg-[#202225] w-full flex items-center px-4 gap-2 border-b border-black/50 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F4BF4F]"></div>
              <div className="w-3 h-3 rounded-full bg-[#61C554]"></div>
              <span className="ml-auto text-[10px] text-white/50 font-semibold tracking-widest">{t.liveStatus}</span>
            </div>
            <iframe
              src={DISCORD_WIDGET_URL}
              width="100%"
              height="100%"
              allowTransparency={true}
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="bg-[#2f3136] flex-1"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  )
}
