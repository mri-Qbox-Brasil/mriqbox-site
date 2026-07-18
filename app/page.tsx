import Link from "next/link"
import Image from "next/image"
import type { Metadata } from "next"
import { ChevronDown, CheckCircle2, Zap, Shield, Code, ArrowRight, Github, Coffee, Download } from "lucide-react"
import { faqPage, jsonLd } from "@/lib/schema"
import { InstallerMockup } from "./components/InstallerMockup"
import { ParceiroCarousel } from "./components/ParceiroCarousel"
import PlayersChart from "./components/PlayersChart"
import parceiros from "@/config/parceiros"
import statsHistory from "@/data/stats-history.json"

export const metadata: Metadata = {
  title: "MRI Qbox Brasil | Framework FiveM Open Source",
  description: "Crie servidores FiveM com uma base Qbox moderna, gratuita e em português. Instalação guiada, scripts otimizados, documentação completa e comunidade brasileira.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "MRI Qbox Brasil | A base FiveM feita para o Brasil",
    description: "Framework FiveM open source com Qbox, QBCore e Ox, instalação guiada e suporte da comunidade brasileira.",
    url: "/",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MRI Qbox Brasil | Framework FiveM Open Source",
    description: "Uma base FiveM moderna, gratuita, otimizada e documentada em português.",
  },
}

const FAQ_ITEMS = [
  {
    question: "Qual é a diferença entre MRI Qbox, Qbox e QBCore?",
    answer: "A MRI Qbox é a adaptação brasileira da Qbox, a evolução moderna do ecossistema QBCore com integração nativa ao Ox. Ela preserva a base que a comunidade já conhece e acrescenta tradução em português, documentação local e recursos complementares prontos para servidores brasileiros."
  },
  {
    question: "É realmente gratuito?",
    answer: "Sim. A MRI Qbox é gratuita e open source, com projetos publicados sob GPL-3.0 ou LGPL-3.0. Você pode estudar, modificar, contribuir e usar o software em projetos comerciais, respeitando a licença de cada repositório. A infraestrutura é mantida com o apoio da comunidade, do Patreon e de anúncios."
  },
  {
    question: "Posso usar em um servidor comercial?",
    answer: "Sim. As licenças permitem o uso comercial. Caso você distribua uma versão modificada, podem existir obrigações de disponibilizar o código-fonte e preservar os avisos da licença; consulte sempre a licença do repositório correspondente. A marca e os logotipos da MRI Qbox possuem regras próprias e não devem representar outro projeto sem autorização."
  },
  {
    question: "Onde encontro suporte técnico?",
    answer: "O suporte é comunitário e voluntário no Discord oficial. Para relatar bugs ou sugerir novos recursos, abra uma Issue no repositório correspondente do GitHub. Não há SLA, mas pedidos com logs e passos para reprodução costumam ser atendidos mais rapidamente."
  },
  {
    question: "Quanto tempo leva para instalar?",
    answer: "Em condições normais, o novo instalador baixa e prepara a base MRI Qbox em cerca de 4 minutos. Ao final, você só precisa revisar as configurações do servidor e concluir os ajustes específicos da sua cidade."
  },
  {
    question: "Como posso contribuir com o projeto?",
    answer: "Você pode enviar Pull Requests, relatar bugs, sugerir melhorias, traduzir conteúdos, aprimorar a documentação ou ajudar outros membros no Discord. Para apoiar a infraestrutura e a continuidade do projeto, também é possível contribuir pelo Patreon."
  }
]

const FEEDBACKS = [
  {
    name: "Smith",
    role: "Membro da Comunidade",
    content: "Base ela entrega uma possibilidade de criação de script muito alta, diferente de outros frameworks, que a criação de script é uma dor de cabeça enorme, com o mriqbox, adianta bastante, já que são caminhos diretos com ox, a raiz do projeto é direta e reta, diferente de um exemplo, o vrp, que para gerenciar e desenvolver scripts é uma negação, a equipe está de parabéns!",
    avatar: "./profiles/smith.webp"
  },
  {
    name: "alexandrear3",
    role: "Legacy Empire",
    content: "Depois de muito tempo procurando a base ideal, batendo cabeça com bases vazadas cheias de erros e scripts mal otimizados, encontrei a Miri Qbox. Foi um achado por acaso que mudou o rumo do Legacy Empire. Finalmente, uma base totalmente em PT-BR, pensada para quem quer profissionalismo sem a dor de cabeça de traduzir linha por linha.",
    avatar: "./profiles/alexandrear3.webp"
  },
  {
    name: "nino_stark01",
    role: "Desenvolvedor",
    content: "A melhor base do momento eu estou criando muitos scripts nela com o anti gravity mto top fácil de manusear top de mais vou deixar um trabalho de interface e sistema de danca com modos e ranking mas nao esta pronto ainda porem eu estou conseguindo fazer tudo que tenho de ideia nessa base!!!",
    avatar: "./profiles/nino_stark01.webp"
  },
  {
    name: ".k0ji",
    role: "Membro da Comunidade",
    content: "Script mri_Qadmin tá muito show! Parabéns a equipe!!",
    avatar: "./profiles/koji.webp"
  },
  {
    name: "Fazeres",
    role: "Comunidade PT",
    content: "Acompanho á pouco tempo, entretanto estou a programar abrir um servidor aqui em Portugal, estou seriamente usar esta base, a humildade de vocês é muito top.",
    avatar: "./profiles/Fazeres.webp"
  },
  {
    name: "Smokey",
    role: "Membro da Comunidade",
    content: "A Base é boa 10/10, ela pode ser também um alicerce do seu projeto. A equipe de programação, estão de parabéns, muito paciente... ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
    avatar: "./profiles/Smokey.webp"
  },
  {
    name: "Branca",
    role: "Criadora de Conteúdo",
    content: "Usei em live para criar conteúdo e muita gente amou a base. Adorei, fácil de instalar e bem completa, muito bem feita. Obrigada pessoal ❤️",
    avatar: "./profiles/Branca.webp"
  },
  {
    name: "Lucas Sousa",
    role: "Membro da Comunidade",
    content: "Primeiramente belo trabalho à equipe @MUR4I @G5 e o resto da equipe que eu não sei quem é kk base muito boa por ser free excelente trabalho.",
    avatar: "./profiles/LucasSousa.webp"
  },
  {
    name: "! VITIMexe",
    role: "Membro da Comunidade",
    content: "Top demais pra quem gosta de interação e imersão é uma ótima opção claro que falta alguns sistemas mas é perfeito!",
    avatar: "./profiles/VITIMexe.webp"
  },
  {
    name: "lrwx",
    role: "Observador",
    content: "Não baixei a base ainda apenas estou acompanhando a comunidade faz alguns dias e de longe, essa é a melhor comunidade brasileira de fivem... parabéns aos responsáveis.",
    avatar: "./profiles/lrwx.webp"
  },
  {
    name: "Araújo",
    role: "Membro da Comunidade",
    content: "Excelente trabalho, gostei da base e das coisas que podemos criar dentro da cidade, sei que tá em fase beta, mas está mt boa.",
    avatar: "./profiles/Araújo.webp"
  },
  {
    name: "Zerow",
    role: "Membro da Comunidade",
    content: "Ótimo produto, fácil de configurar e adicionar novas atualizações também. Muito Bom!",
    avatar: "./profiles/Zerow.webp"
  },
  {
    name: "gleibsonms",
    role: "Membro da Comunidade",
    content: "Parabéns pela iniciativa. O produto entrega muita coisa.",
    avatar: "./profiles/gleibsonms.webp"
  },
  {
    name: "baumel_",
    role: "Membro da Comunidade",
    content: "Parabéns à equipe @MUR4I @G5 @Ailton Zamboti e o resto da equipe pelo excelente trabalho no desenvolvimento, a otimização, estabilidade e facilidade de personalização são impressionantes, tornando a experiência de criação de cidades muito mais fluida. O comprometimento com atualizações e suporte à comunidade faz toda a diferença! 10/10",
    avatar: "./profiles/baumel.webp"
  }
]

type TeamMember = {
  login: string
  avatar_url: string
  html_url: string
  kofi_username?: string
}

// O build do GitHub Pages e estatico. Se o servico que agrega os membros
// estiver indisponivel naquele momento, esta lista impede que a secao seja
// publicada vazia. Os dados remotos continuam sendo usados quando disponiveis.
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

// Server action RSC do 5metrics que devolve a lista de servidores (top ~25 por
// rank) de um recurso — o unico jeito de ter dados POR SERVIDOR (a meta
// description so tem agregado, que nao da pra deduplicar). O id do action muda
// quando o 5metrics faz deploy; se quebrar, caimos no MAX da meta (lower bound)
// e o site segue funcionando.
const FIVEMETRICS_SERVERS_ACTION = "401578d09ec9acd55c5b3e73c7c382ca742415877d"

async function fetchResourceServers(resource: string): Promise<{ id: string; players: number }[]> {
  const res = await fetch(`https://5metrics.dev/resource/${resource}`, {
    method: "POST",
    next: { revalidate: 3600 },
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
  const out: { id: string; players: number }[] = []
  for (const m of text.matchAll(/"id":"([^"]+)"[^}]*?"players":(\d+)/g)) {
    out.push({ id: m[1], players: parseInt(m[2], 10) })
  }
  return out
}

export default async function HomePage() {
  // Stats ao vivo do 5metrics — recursos mri_Q com presenca real (os demais tem
  // 1 servidor ou nao estao indexados). 5metrics nao tem endpoint de listagem,
  // entao enumeramos.
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

  let totalServers = 173  // fallback: max de servidores (e.g. Qobjects)
  let totalPlayers = 800  // fallback: uniao de jogadores deduplicada

  try {
    const results = await Promise.allSettled(
      MRI_RESOURCES.map((r) =>
        fetch(`https://5metrics.dev/resource/${r}`, {
          next: { revalidate: 3600 },
          headers: { "User-Agent": "MRIQbox-site/1.0" },
        }).then((res) => res.text())
      )
    )

    let maxServers = 0
    let maxPlayers = 0
    let anySucceeded = false

    for (const result of results) {
      if (result.status === "fulfilled") {
        // Extract from the meta description: "used by X (...) servers and Y (...) players"
        const match = result.value.match(/used by (\d+)[^<]+servers and (\d+)/)
        if (match) {
          const s = parseInt(match[1])
          const p = parseInt(match[2])
          if (s > maxServers) maxServers = s
          if (p > maxPlayers) maxPlayers = p
          anySucceeded = true
        }
      }
    }

    if (anySucceeded) {
      totalServers = maxServers
      totalPlayers = maxPlayers // base/fallback; sobrescrito pela uniao abaixo
    }
  } catch {
    // keep fallback defaults
  }

  // "Jogadores utilizando neste momento": uniao dos servidores que rodam
  // QUALQUER recurso MRI, deduplicada por servidor. Somar por recurso contaria
  // o mesmo jogador varias vezes (um server roda varios mri_Q ao mesmo tempo);
  // o MAX da meta subestima (ignora servers que rodam outro recurso). A uniao
  // dedup e o numero honesto. Se o action do 5metrics falhar, fica o MAX.
  try {
    const lists = await Promise.allSettled(MRI_RESOURCES.map(fetchResourceServers))
    const union = new Map<string, number>()
    for (const r of lists) {
      if (r.status === "fulfilled") {
        for (const s of r.value) {
          const prev = union.get(s.id) ?? 0
          if (s.players > prev) union.set(s.id, s.players)
        }
      }
    }
    if (union.size > 0) {
      totalPlayers = [...union.values()].reduce((a, b) => a + b, 0)
    }
  } catch {
    // mantem o MAX da meta
  }

  let teamMembers: TeamMember[] = TEAM_MEMBERS_FALLBACK
  try {
    const teamRes = await fetch("https://users.mriqbox.com.br/public/members.json", {
      next: { revalidate: 3600 }
    })
    if (!teamRes.ok) throw new Error(`HTTP ${teamRes.status}`)

    const members: unknown = await teamRes.json()
    if (!Array.isArray(members)) throw new Error("Resposta de membros invalida")

    // O JSON remoto e autoritativo: inclusive uma lista vazia representa a
    // configuracao atual. O fallback local so entra em falhas de rede/HTTP ou
    // quando a resposta nao tem o formato esperado.
    teamMembers = members as TeamMember[]
  } catch {
    // Mantem o fallback local no build estatico e em falhas temporarias da API.
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqPage(FAQ_ITEMS)) }} />

      {/* Navbar (Nexatlas style - Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] z-50 h-[64px] px-6 flex items-center justify-between bg-card/60 backdrop-blur-xl border border-white/5 rounded-full transition-all">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="MRI Qbox Brasil Logo" width={24} height={24} className="object-contain" />
          <span className="font-semibold text-sm tracking-widest uppercase text-white">MRI Qbox</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/recursos" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Recursos</Link>
          <Link href="/comecar" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Como começar</Link>
          <Link href="/docs" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Documentação</Link>
          <Link href="/sobre" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Saber Mais</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/discord" className="text-xs font-bold uppercase tracking-wider text-primary-foreground px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-full transition-all flex items-center gap-2">
            Acesse o Discord
          </Link>
        </div>
      </nav>

      {/* Hero Section (Centered like Nexatlas) */}
      <section className="relative w-full pt-[180px] pb-[60px] px-6 flex flex-col items-center justify-center text-center">
        {/* Background Gradients */}
        <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />

        <a href="#equipe" className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-primary/20 bg-primary/10 w-fit mb-6 hover:bg-primary/20 transition-colors group">
          <div className="flex -space-x-2 mr-1">
            {teamMembers.slice(0, 4).map((member) => (
              <div key={member.login} className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-background">
                <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
              </div>
            ))}
          </div>
          <span className="text-sm font-bold text-primary">Conheça nossa equipe</span>
        </a>

        <h1 className="text-5xl md:text-[72px] font-extrabold text-primary leading-[1.05] tracking-tight mb-6 max-w-4xl">
          Menos configuração.<br />
          Mais criação.
        </h1>

        <p className="text-lg md:text-xl text-white font-medium mb-10 max-w-2xl">
          Uma framework FiveM open source que une Qbox e Ox para você construir servidores mais rápidos, seguros e fáceis de manter.
        </p>

        {/* 5metrics live stats + historico */}
        <div className="mt-8 w-full flex justify-center px-4">
          <PlayersChart data={statsHistory} current={totalPlayers} servers={totalServers} />
        </div>

        {/* New installer introduction */}
        <div className="mt-16 w-full max-w-5xl px-4 text-left">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#0c0f0e] p-6 sm:p-7 md:rounded-b-none md:border-b-0">
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent" />

            <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between md:gap-8">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,153,0.45)]" />
                  <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Novo instalador MRI disponível</span>
                </div>
                <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                  Do download ao primeiro start. Sem complicação.
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
                  O novo instalador conduz cada etapa, da escolha do FXServer à configuração completa do ambiente MRI Qbox.
                </p>

                <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-bold uppercase tracking-wider text-white/60">
                  <span><strong className="mr-1.5 text-primary">01</strong>FXServer</span>
                  <ArrowRight className="h-3 w-3 text-white/30" />
                  <span><strong className="mr-1.5 text-primary">02</strong>Ambiente</span>
                  <ArrowRight className="h-3 w-3 text-white/30" />
                  <span><strong className="mr-1.5 text-primary">03</strong>MRI Qbox</span>
                </div>
              </div>

              <Link href="/docs/mri/instalacao" className="group inline-flex w-full shrink-0 items-center justify-between gap-6 rounded-xl bg-primary px-6 py-4 text-sm font-black text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
                Abrir instalador
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/10 transition-transform group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Installer Mockup — desktop only */}
          <div className="hidden md:block">
            <InstallerMockup className="rounded-t-none" />
          </div>
        </div>
      </section>

      {/* Social Proof — Parceiros */}
      <section className="w-full flex flex-col items-center justify-center py-10 gap-8 border-b border-white/5 overflow-hidden">
        <div className="flex flex-col items-center gap-3 mb-6">
          <h2 className="text-3xl font-bold text-white tracking-tight">Nossos Parceiros</h2>
          <p className="text-[15px] text-white/40">Tecnologias, comunidades e projetos que apoiam e confiam na MRI Qbox.</p>
        </div>
        <ParceiroCarousel parceiros={parceiros} />
      </section>

      {/* Team Section */}
      <section id="equipe" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[96px] flex flex-col items-center justify-center border-b border-white/5">
        <div className="mb-12 flex max-w-2xl flex-col items-center text-center">
          <span className="mb-4 text-[10px] font-black uppercase tracking-[0.22em] text-primary">As pessoas por trás do código</span>
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Código aberto.<br />Construído por pessoas.
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-base">
            Conheça quem dedica tempo, experiência e cuidado para manter a MRI Qbox evoluindo todos os dias.
          </p>
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
                    Apoie
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features (Nexatlas layout) */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[120px] flex flex-col lg:flex-row gap-20">
        <div className="flex-1 sticky top-32 h-fit">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
            Leve para começar.<br />
            <span className="text-muted-foreground">Pronta para crescer.</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Uma base FiveM moderna, pensada para reduzir manutenção, evitar dependências ultrapassadas e acompanhar o crescimento da sua cidade.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {/* Feature Card 1 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Desempenho por arquitetura</h3>
            <p className="text-muted-foreground leading-relaxed">
              Construída sobre Qbox e o ecossistema Ox, com código enxuto no cliente e no servidor para manter sua cidade rápida, estável e segura.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Pronta no primeiro start</h3>
            <p className="text-muted-foreground leading-relaxed">
              Comece com scripts profissionais configurados e em português. Menos tempo traduzindo locales, mais tempo construindo sua cidade.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Ox desde a base</h3>
            <p className="text-muted-foreground leading-relaxed">
              Integração nativa com ox_lib, ox_inventory e ox_target desde o primeiro dia, sem adaptações improvisadas.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Counter */}
      <section className="w-full bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://assets.mriqbox.com.br/branding/logo1080.png')] bg-cover bg-center opacity-10 mix-blend-overlay" />
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 relative z-10 flex flex-col md:flex-row justify-between gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="flex flex-col items-center flex-1 pt-6 md:pt-0">
            <span className="text-5xl font-extrabold text-white mb-2">100%</span>
            <span className="text-primary-foreground/80 font-medium">Gratuito e Open Source</span>
          </div>
          <div className="flex flex-col items-center flex-1 pt-6 md:pt-0">
            <span className="text-5xl font-extrabold text-white mb-2">+50</span>
            <span className="text-primary-foreground/80 font-medium">Scripts Integrados</span>
          </div>
          <div className="flex flex-col items-center flex-1 pt-6 md:pt-0">
            <span className="text-5xl font-extrabold text-white mb-2">24/7</span>
            <span className="text-primary-foreground/80 font-medium">Comunidade Ativa</span>
          </div>
        </div>
      </section>

      {/* Feedback Carousel Section */}
      <section className="w-full py-20 flex flex-col items-center gap-12 overflow-hidden border-t border-white/5">
        <div className="text-center max-w-2xl px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">O que a comunidade diz</h2>
          <p className="text-muted-foreground text-lg">Veja o feedback de quem já utiliza o MRI Qbox no dia a dia.</p>
        </div>

        {/* Marquee Wrapper - seamless infinite scroll */}
        <div className="relative w-full overflow-hidden group">
          {/* Fading Edges */}
          <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

          {/*
            The track contains the full list TWICE side by side.
            The animation moves -50% (= one full copy width), so when
            it resets to 0 the visual is identical — completely seamless.
          */}
          <div className="flex gap-6 py-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
            {/* First copy */}
            {FEEDBACKS.map((feedback, idx) => (
              <div key={`a-${idx}`} className="w-[420px] shrink-0 p-8 rounded-2xl bg-card border border-white/5 flex flex-col gap-6 hover:border-primary/30 transition-colors">
                <p className="text-muted-foreground leading-relaxed italic line-clamp-4">
                  &ldquo;{feedback.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <Image src={feedback.avatar} alt={feedback.name} width={48} height={48} className="rounded-full bg-white/10 object-cover" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{feedback.name}</span>
                    <span className="text-xs text-primary">{feedback.role}</span>
                  </div>
                </div>
              </div>
            ))}
            {/* Second copy — makes the loop seamless */}
            {FEEDBACKS.map((feedback, idx) => (
              <div key={`b-${idx}`} aria-hidden className="w-[420px] shrink-0 p-8 rounded-2xl bg-card border border-white/5 flex flex-col gap-6 hover:border-primary/30 transition-colors">
                <p className="text-muted-foreground leading-relaxed italic line-clamp-4">
                  &ldquo;{feedback.content}&rdquo;
                </p>
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-white/5">
                  <Image src={feedback.avatar} alt={feedback.name} width={48} height={48} className="rounded-full bg-white/10 object-cover" />
                  <div className="flex flex-col">
                    <span className="font-bold text-white">{feedback.name}</span>
                    <span className="text-xs text-primary">{feedback.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Grid */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[120px] flex flex-col items-center gap-16">
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Perguntas Frequentes</h2>
          <p className="text-muted-foreground text-lg">Tudo que você precisa saber antes de iniciar seu projeto.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {FAQ_ITEMS.map((item, idx) => (
            <div key={idx} className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4">
              <h3 className="text-xl font-semibold text-white">{item.question}</h3>
              <p className="text-muted-foreground leading-relaxed text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="w-full max-w-[1440px] mx-auto px-6 md:px-12 pb-[120px]">
        <div className="w-full rounded-[2rem] bg-glass border border-white/10 px-6 py-14 md:p-20 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute -left-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
          <div className="absolute inset-x-16 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          <div className="mb-5 flex items-center gap-2 relative z-10">
            <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,230,153,0.5)]" />
            <span className="text-[10px] font-black uppercase tracking-[0.22em] text-primary">Open source por princípio. Brasileira por essência. Feita para ir além.</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
            Uma grande cidade<br className="hidden sm:block" /> começa pela base.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground max-w-2xl mb-10 relative z-10 leading-relaxed">
            Comece gratuitamente com a MRI Qbox ou entre no Discord para aprender, contribuir e construir com a comunidade brasileira.
          </p>
          <div className="flex w-full max-w-lg flex-col sm:flex-row gap-3 relative z-10">
            <Link href="/docs/mri/instalacao" className="flex min-h-16 flex-1 items-center justify-center gap-3 rounded-xl bg-primary px-7 py-4 text-primary-foreground font-black transition-colors hover:bg-primary/90 shadow-[0_0_30px_-10px_rgba(0,230,153,0.4)]">
              <Download className="h-5 w-5" />
              Baixar gratuitamente
            </Link>
            <Link href="/discord" className="flex min-h-16 flex-1 items-center justify-center gap-3 rounded-xl border border-[#5865F2] bg-[#5865F2] px-7 py-4 text-white font-black shadow-[0_0_30px_-12px_rgba(88,101,242,0.65)] transition-colors hover:border-[#4752C4] hover:bg-[#4752C4]">
              {/* Simple Icons: Discord brand mark */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://cdn.simpleicons.org/discord/ffffff" alt="" aria-hidden="true" className="h-5 w-5" />
              Entrar no Discord
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full border-t border-white/5 bg-background">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row justify-between gap-16">

          {/* Brand & Newsletter */}
          <div className="flex flex-col gap-8 max-w-sm">
            <Link href="/" className="flex items-center gap-3">
              <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="Logo" width={36} height={36} />
              <span className="font-bold text-xl text-white">MRI Qbox</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Uma base FiveM open source para criar sem limites. Feita no Brasil para cidades que querem ir além.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-2">Projeto</h4>
              <Link href="/sobre" className="text-sm text-muted-foreground hover:text-white transition-colors">Sobre nós</Link>
              <Link href="/recursos" className="text-sm text-muted-foreground hover:text-white transition-colors">Recursos</Link>
              <Link href="/comecar" className="text-sm text-muted-foreground hover:text-white transition-colors">Como começar</Link>
              <Link href="/docs" className="text-sm text-muted-foreground hover:text-white transition-colors">Documentação</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-2">Comunidade</h4>
              <Link href="/discord" className="text-sm text-muted-foreground hover:text-white transition-colors">Discord</Link>
              <Link href="https://github.com/mri-Qbox-Brasil" className="text-sm text-muted-foreground hover:text-white transition-colors">GitHub</Link>
              <Link href="https://www.patreon.com/mriQboxBrasil" className="text-sm text-muted-foreground hover:text-white transition-colors">Patreon</Link>
            </div>
            <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-2">Legal</h4>
              <Link href="/privacidade" className="text-sm text-muted-foreground hover:text-white transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-sm text-muted-foreground hover:text-white transition-colors">Termos de Uso</Link>
              <span className="text-xs text-muted-foreground/60 mt-4">© {new Date().getFullYear()} MRI Qbox Brasil.<br />Licença GPL-3.0.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
