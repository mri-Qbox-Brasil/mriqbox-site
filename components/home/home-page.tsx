import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { Zap, Shield, Code, ArrowRight, Coffee, Download } from "lucide-react"
import { Github } from "@/components/icons/github"
import { MriBotPromo } from "@/components/mri-bot-promo"
import parceiros from "@/config/parceiros"
import statsHistory from "@/data/stats-history.json"
import { getArtifactsDb } from "@/lib/artifacts-db"
import { ROUTES, type Locale } from "@/lib/i18n"
import { totalPlayers, totalServers } from "@/lib/mri-servers"
import { pageMetadata } from "@/lib/page-metadata"
import { faqPage, jsonLd } from "@/lib/schema"
import { homeDictionary, type FeedbackId, type FeedbackRole, type HomeDictionary } from "./content"
import { InstallerMockup } from "./InstallerMockup"
import { ParceiroCarousel } from "./ParceiroCarousel"
import PlayersChart from "./PlayersChart"

// Twitter keeps the main title with its own description, so it is set apart from Open Graph.
export function homeMetadata(locale: Locale): Metadata {
  const { meta } = homeDictionary[locale]
  const base = pageMetadata("home", locale, {
    title: meta.title,
    description: meta.description,
    ogTitle: meta.ogTitle,
    ogDescription: meta.ogDescription,
  })
  return { ...base, twitter: { card: "summary_large_image", title: meta.title, description: meta.twitterDescription } }
}

type Feedback = { id: FeedbackId; name: string; avatar: string; role: FeedbackRole | { org: string } }

const FEEDBACKS: Feedback[] = [
  { id: "smith", name: "Smith", role: "member", avatar: "./profiles/smith.webp" },
  { id: "alexandrear3", name: "alexandrear3", role: { org: "Legacy Empire" }, avatar: "./profiles/alexandrear3.webp" },
  { id: "nino", name: "nino_stark01", role: "developer", avatar: "./profiles/nino_stark01.webp" },
  { id: "koji", name: ".k0ji", role: "member", avatar: "./profiles/koji.webp" },
  { id: "fazeres", name: "Fazeres", role: "ptCommunity", avatar: "./profiles/Fazeres.webp" },
  { id: "smokey", name: "Smokey", role: "member", avatar: "./profiles/Smokey.webp" },
  { id: "branca", name: "Branca", role: "contentCreator", avatar: "./profiles/Branca.webp" },
  { id: "lucasSousa", name: "Lucas Sousa", role: "member", avatar: "./profiles/LucasSousa.webp" },
  { id: "vitimexe", name: "! VITIMexe", role: "member", avatar: "./profiles/VITIMexe.webp" },
  { id: "lrwx", name: "lrwx", role: "observer", avatar: "./profiles/lrwx.webp" },
  { id: "araujo", name: "Araújo", role: "member", avatar: "./profiles/Araújo.webp" },
  { id: "zerow", name: "Zerow", role: "member", avatar: "./profiles/Zerow.webp" },
  { id: "gleibsonms", name: "gleibsonms", role: "member", avatar: "./profiles/gleibsonms.webp" },
  { id: "baumel", name: "baumel_", role: "member", avatar: "./profiles/baumel.webp" },
]

type TeamMember = {
  login: string
  avatar_url: string
  html_url: string
  kofi_username?: string
}

// Keeps the section from shipping empty in the static build when the members service is down.
const TEAM_MEMBERS_FALLBACK: TeamMember[] = [
  { login: "BrunoOlivera07", avatar_url: "https://github.com/BrunoOlivera07.png?size=224", html_url: "https://github.com/BrunoOlivera07" },
  { login: "ggfto", avatar_url: "https://github.com/ggfto.png?size=224", html_url: "https://github.com/ggfto", kofi_username: "ggfto" },
  { login: "GordelaG", avatar_url: "https://github.com/GordelaG.png?size=224", html_url: "https://github.com/GordelaG", kofi_username: "GordelaG" },
  { login: "gvs006", avatar_url: "https://github.com/gvs006.png?size=224", html_url: "https://github.com/gvs006", kofi_username: "gvs006" },
  { login: "JJ4hts", avatar_url: "https://github.com/JJ4hts.png?size=224", html_url: "https://github.com/JJ4hts", kofi_username: "JJ4hts" },
  { login: "mur4i", avatar_url: "https://github.com/mur4i.png?size=224", html_url: "https://github.com/mur4i", kofi_username: "mur4i" },
  { login: "SubZeroGLX", avatar_url: "https://github.com/SubZeroGLX.png?size=224", html_url: "https://github.com/SubZeroGLX", kofi_username: "SubZeroGLX" },
  { login: "xstells", avatar_url: "https://github.com/xstells.png?size=224", html_url: "https://github.com/xstells", kofi_username: "xstells" },
]

const DISCORD_MEMBERS_FALLBACK = 3500

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch("https://users.mriqbox.com.br/public/members.json", { next: { revalidate: 3600 } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const members: unknown = await res.json()
    if (!Array.isArray(members)) throw new Error("Invalid members response")
    // The remote list is authoritative, even when empty.
    return members as TeamMember[]
  } catch {
    return TEAM_MEMBERS_FALLBACK
  }
}

async function getDiscordMemberCount(): Promise<number> {
  try {
    const res = await fetch("https://discord.com/api/v9/invites/uEfGD4mmVh?with_counts=true", { next: { revalidate: 3600 } })
    if (res.ok) {
      const data = await res.json()
      if (data.approximate_member_count) return data.approximate_member_count
    }
  } catch {}
  return DISCORD_MEMBERS_FALLBACK
}

function formatThousands(count: number, locale: Locale): string {
  const value = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(count / 1000)
  return `+${value}k`
}

function FeedbackCard({ feedback, t, hidden }: { feedback: Feedback; t: HomeDictionary["feedback"]; hidden?: boolean }) {
  const role = typeof feedback.role === "string" ? t.roles[feedback.role] : feedback.role.org
  return (
    <div aria-hidden={hidden || undefined} className="w-[300px] sm:w-[360px] md:w-[420px] shrink-0 p-6 md:p-8 rounded-2xl bg-card border border-white/5 flex flex-col gap-4 md:gap-6 hover:border-primary/30 transition-colors">
      <p className="text-white/80 leading-relaxed italic line-clamp-4 text-sm md:text-base">
        &ldquo;{t.quotes[feedback.id]}&rdquo;
      </p>
      <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
        <div className="relative w-10 h-10 md:w-12 md:h-12 shrink-0">
          <Image src={feedback.avatar} alt={feedback.name} fill className="rounded-full bg-white/10 object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="font-bold text-white text-sm md:text-base">{feedback.name}</span>
          <span className="text-xs text-primary">{role}</span>
        </div>
      </div>
    </div>
  )
}

export async function HomePage({ locale }: { locale: Locale }) {
  const t = homeDictionary[locale]
  const [artifactsDb, teamMembers, discordMembers] = await Promise.all([
    getArtifactsDb(),
    getTeamMembers(),
    getDiscordMemberCount(),
  ])

  const features = [
    { id: "performance", icon: Zap, ...t.features.performance },
    { id: "ready", icon: Code, ...t.features.ready },
    { id: "ox", icon: Shield, ...t.features.ox },
  ]

  const metrics = [
    { id: "free", value: "100%", ...t.metrics.free },
    { id: "scripts", value: "+50", ...t.metrics.scripts },
    { id: "community", value: "24/7", ...t.metrics.community },
    { id: "discord", value: formatThousands(discordMembers, locale), ...t.metrics.discord },
  ]
  const metricCellClasses = [
    "border-b border-primary-foreground/15 sm:border-r lg:border-b-0",
    "border-b border-primary-foreground/15 lg:border-r lg:border-b-0",
    "border-b border-primary-foreground/15 sm:border-b-0 sm:border-r lg:border-b-0",
    "",
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPage(t.faq.items)) }} />

      <section className="relative w-full pt-[180px] pb-[60px] px-6 flex flex-col items-center justify-center text-center">
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <a href="#team" className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-primary/20 bg-primary/10 w-fit mb-6 hover:bg-primary/20 transition-colors group">
          <div className="flex -space-x-2 mr-1">
            {teamMembers.slice(0, 4).map((member) => (
              <div key={member.login} className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-background">
                <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-sm font-bold text-primary">{t.hero.teamBadge}</span>
        </a>

        <h1 className="text-5xl md:text-[72px] font-extrabold text-primary leading-[1.05] tracking-tight mb-6 max-w-4xl">
          {t.hero.title[0]}<br />
          {t.hero.title[1]}
        </h1>

        <p className="text-lg md:text-xl text-white font-medium mb-10 max-w-2xl">{t.hero.subtitle}</p>

        <div className="mt-8 w-full flex justify-center px-4">
          <PlayersChart data={statsHistory} current={totalPlayers} servers={totalServers} locale={locale} t={t.chart} />
        </div>

        <div className="mt-16 w-full max-w-5xl px-4 text-left">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f0e] p-6 sm:p-7 md:rounded-b-none md:border-b-0">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,153,0.45)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">{t.installer.eyebrow}</span>
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">{t.installer.title}</h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.installer.text}</p>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-white/60">
                  {t.installer.steps.map((step, idx) => (
                    <span key={step} className="contents">
                      {idx > 0 && <ArrowRight className="h-3 w-3 text-white/30" />}
                      <span><strong className="mr-1.5 text-primary">{String(idx + 1).padStart(2, "0")}</strong>{step}</span>
                    </span>
                  ))}
                </div>
              </div>

              <Link href="/docs/mri/instalacao" className="group inline-flex w-full shrink-0 items-center justify-between gap-6 rounded-xl bg-primary px-6 py-4 text-sm font-black text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
                {t.installer.cta}
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          <div className="hidden md:block">
            <InstallerMockup
              t={t.mockup}
              className="rounded-t-none"
              recommendedArtifact={artifactsDb.recommendedArtifact}
              brokenArtifactsCount={artifactsDb.brokenArtifacts.length}
              artifactsSynced={artifactsDb.synced}
            />
          </div>
        </div>
      </section>

      <MriBotPromo t={t.mriBot} />

      <section className="w-full flex flex-col items-center justify-center py-10 gap-8 border-b border-white/5 overflow-hidden">
        <div className="flex flex-col items-center gap-3 mb-6 px-6 text-center">
          <h2 className="text-3xl font-bold text-white tracking-tight">{t.partners.title}</h2>
          <p className="text-[15px] text-white/40 max-w-md">{t.partners.subtitle}</p>
        </div>
        <ParceiroCarousel parceiros={parceiros} />
      </section>

      <section id="team" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[96px] flex flex-col items-center justify-center border-b border-white/5">
        <div className="mb-12 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-primary">{t.team.eyebrow}</span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            {t.team.title[0]}<br />{t.team.title[1]}
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">{t.team.text}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
          {teamMembers.map((member) => (
            <div key={member.login} className="group flex h-full flex-col items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.015] p-5 transition-colors hover:border-primary/20 hover:bg-primary/[0.025]">
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 transition-colors group-hover:border-primary/50">
                <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
              </div>

              <div className="flex w-full flex-1 flex-col justify-end gap-2">
                <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-[#091811] px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#0d2218]">
                  <Github className="w-4 h-4" />
                  {member.login}
                </a>
                {member.kofi_username && (
                  <a href={`https://ko-fi.com/${member.kofi_username}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-4 py-2 text-sm font-semibold text-white/65 transition-colors hover:border-primary/20 hover:bg-primary/5 hover:text-primary">
                    <Coffee className="w-4 h-4" />
                    {t.team.support}
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[120px] flex flex-col lg:flex-row gap-20">
        <div className="flex-1 sticky top-32 h-fit">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            {t.features.title}<br />
            <span className="text-muted-foreground">{t.features.titleMuted}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">{t.features.text}</p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {features.map(({ id, icon: Icon, title, text }) => (
            <div key={id} className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-semibold text-white">{title}</h3>
              <p className="text-muted-foreground leading-relaxed">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative w-full overflow-hidden border-y border-primary/30 bg-primary text-primary-foreground">
        <div className="pointer-events-none absolute -right-24 -top-48 h-[520px] w-[520px] bg-[url('https://assets.mriqbox.com.br/branding/logo1080.png')] bg-contain bg-center bg-no-repeat opacity-[0.06] mix-blend-multiply" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,rgba(255,255,255,0.12),transparent_40%)]" />

        <div className="relative z-10 mx-auto grid max-w-[1440px] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="flex flex-col justify-center border-b border-primary-foreground/15 px-6 py-12 md:px-12 lg:border-b-0 lg:border-r lg:py-14">
            <span className="mb-4 text-[10px] font-black uppercase tracking-[0.24em] text-primary-foreground/60">{t.metrics.eyebrow}</span>
            <h2 className="max-w-md text-3xl font-black leading-[0.95] tracking-[-0.04em] md:text-4xl">{t.metrics.title}</h2>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-primary-foreground/65">{t.metrics.text}</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric, idx) => (
              <div key={metric.id} className={`grid min-h-44 grid-rows-[4rem_2.5rem_3rem] content-center px-6 py-8 md:px-8 ${metricCellClasses[idx]}`}>
                <span className={`flex items-end text-5xl font-black leading-none tracking-[-0.06em] ${metric.id === "discord" ? "md:text-5xl lg:text-6xl" : "md:text-6xl"}`}>
                  {metric.value}
                </span>
                <span className="flex items-start pt-3 text-xs font-black uppercase tracking-[0.12em]">{metric.label}</span>
                <span className="text-xs leading-relaxed text-primary-foreground/55">{metric.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-20 flex flex-col items-center gap-8 md:gap-12 overflow-hidden border-t border-white/5">
        <div className="text-center max-w-2xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.feedback.title}</h2>
          <p className="text-muted-foreground text-base md:text-lg">{t.feedback.subtitle}</p>
        </div>

        <div className="relative w-full overflow-hidden group">
          <div className="absolute top-0 bottom-0 left-0 w-8 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-8 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/* The list renders twice and the track moves -50%, so the loop reset is invisible. */}
          <div className="flex gap-4 md:gap-6 py-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {FEEDBACKS.map((feedback) => (
              <FeedbackCard key={`a-${feedback.id}`} feedback={feedback} t={t.feedback} />
            ))}
            {FEEDBACKS.map((feedback) => (
              <FeedbackCard key={`b-${feedback.id}`} feedback={feedback} t={t.feedback} hidden />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[120px] flex flex-col items-center gap-16">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t.faq.title}</h2>
          <p className="text-muted-foreground text-lg">{t.faq.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {t.faq.items.map((item) => (
            <div key={item.question} className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">{item.question}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-[120px]">
        <div className="w-full rounded-[2rem] bg-glass border border-white/10 px-6 py-14 md:p-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="mb-5 flex items-center gap-2 relative z-10">
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">{t.cta.eyebrow}</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
            {t.cta.title}<br className="hidden sm:block" /> {t.cta.titleEnd}
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-10 relative z-10 leading-relaxed">{t.cta.text}</p>
          <div className="flex w-full max-w-3xl flex-col sm:flex-row sm:flex-wrap justify-center gap-4 relative z-10">
            <Link href="/docs/mri/instalacao" className="flex items-center justify-center gap-3 rounded-xl bg-primary px-8 py-4 text-primary-foreground font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] hover:shadow-[0_0_40px_-10px_rgba(0,230,153,0.4)] whitespace-nowrap">
              <Download className="h-5 w-5" />
              {t.cta.download}
            </Link>
            <Link href={ROUTES.discord[locale]} className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-white font-bold transition-all hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 hover:text-white backdrop-blur-md hover:scale-[1.02] whitespace-nowrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/discord/ffffff" alt="" aria-hidden="true" className="h-5 w-5" />
              {t.cta.discord}
            </Link>
            <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-white font-bold transition-all hover:bg-white/10 hover:border-white/30 hover:text-white backdrop-blur-md hover:scale-[1.02] whitespace-nowrap">
              <Github className="h-5 w-5" />
              {t.cta.github}
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
