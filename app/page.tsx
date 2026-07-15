import Link from "next/link"
import Image from "next/image"
import { ChevronDown, CheckCircle2, Zap, Shield, Code, ArrowRight, Github, Coffee } from "lucide-react"
import { faqPage, jsonLd } from "@/lib/schema"
import { InstallerMockup } from "./components/InstallerMockup"
import { ParceiroCarousel } from "./components/ParceiroCarousel"
import parceiros from "@/config/parceiros"

const FAQ_ITEMS = [
  {
    question: "Qual a diferença entre MRI Qbox e Qbox/QBCore?",
    answer: "MRI Qbox é a adaptação brasileira oficial da Qbox internacional (que por sua vez é a evolução do QBCore com integração nativa ao ox_lib). Mesma base, mas traduzida, com scripts complementares prontos e documentação em português."
  },
  {
    question: "É realmente gratuito?",
    answer: "Sim. Todo o código é open source sob GPL-3.0 / LGPL-3.0 (mesmo modelo do Qbox e Overextended) — pode usar comercialmente, modificar e contribuir. Os custos de infra são bancados pela comunidade via Patreon e anúncios."
  },
  {
    question: "Posso usar em servidor pago/comercial?",
    answer: "Pode. A GPL permite uso comercial em servidores. O que não pode é redistribuir versões modificadas fechadas (GPL exige código aberto em forks) nem usar a marca/logo sem autorização."
  },
  {
    question: "Tem suporte técnico?",
    answer: "Suporte voluntário no Discord oficial. Bugs/feature requests via GitHub Issues do repositório correspondente. Sem SLA, mas a comunidade é ativa e geralmente responde rápido."
  },
  {
    question: "Quanto tempo leva pra instalar?",
    answer: "Cerca de 30 minutos se você já tem txAdmin e MySQL prontos — basta importar a recipe MRI Qbox."
  },
  {
    question: "Como contribuo com o projeto?",
    answer: "Pull Requests nos repositórios do GitHub, relatos de bugs, traduções, melhoria de docs e participação no Discord. Apoio financeiro também ajuda — via Patreon."
  }
]

const FEEDBACKS = [
  {
    name: "Smith",
    role: "Membro da Comunidade",
    content: "Base ela entrega uma possibilidade de criação de script muito alta, diferente de outros frameworks, que a criação de script é uma dor de cabeça enorme, com o mriqbox, adianta bastante, já que são caminhos diretos com ox, a raiz do projeto é direta e reta, diferente de um exemplo, o vrp, que para gerenciar e desenvolver scripts é uma negação, a equipe está de parabéns!",
    avatar: "/profiles/smith.webp"
  },
  {
    name: "alexandrear3",
    role: "Legacy Empire",
    content: "Depois de muito tempo procurando a base ideal, batendo cabeça com bases vazadas cheias de erros e scripts mal otimizados, encontrei a Miri Qbox. Foi um achado por acaso que mudou o rumo do Legacy Empire. Finalmente, uma base totalmente em PT-BR, pensada para quem quer profissionalismo sem a dor de cabeça de traduzir linha por linha.",
    avatar: "/profiles/alexandrear3.webp"
  },
  {
    name: "nino_stark01",
    role: "Desenvolvedor",
    content: "A melhor base do momento eu estou criando muitos scripts nela com o anti gravity mto top fácil de manusear top de mais vou deixar um trabalho de interface e sistema de danca com modos e ranking mas nao esta pronto ainda porem eu estou conseguindo fazer tudo que tenho de ideia nessa base!!!",
    avatar: "/profiles/nino_stark01.webp"
  },
  {
    name: ".k0ji",
    role: "Membro da Comunidade",
    content: "Script mri_Qadmin tá muito show! Parabéns a equipe!!",
    avatar: "/profiles/.k0ji.webp"
  },
  {
    name: "Fazeres",
    role: "Comunidade PT",
    content: "Acompanho á pouco tempo, entretanto estou a programar abrir um servidor aqui em Portugal, estou seriamente usar esta base, a humildade de vocês é muito top.",
    avatar: "/profiles/Fazeres.webp"
  },
  {
    name: "Smokey",
    role: "Membro da Comunidade",
    content: "A Base é boa 10/10, ela pode ser também um alicerce do seu projeto. A equipe de programação, estão de parabéns, muito paciente... ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
    avatar: "/profiles/Smokey.webp"
  },
  {
    name: "Branca",
    role: "Criadora de Conteúdo",
    content: "Usei em live para criar conteúdo e muita gente amou a base. Adorei, fácil de instalar e bem completa, muito bem feita. Obrigada pessoal ❤️",
    avatar: "/profiles/Branca.webp"
  },
  {
    name: "Lucas Sousa",
    role: "Membro da Comunidade",
    content: "Primeiramente belo trabalho à equipe @MUR4I @G5 e o resto da equipe que eu não sei quem é kk base muito boa por ser free excelente trabalho.",
    avatar: "/profiles/LucasSousa.webp"
  },
  {
    name: "! VITIMexe",
    role: "Membro da Comunidade",
    content: "Top demais pra quem gosta de interação e imersão é uma ótima opção claro que falta alguns sistemas mas é perfeito!",
    avatar: "/profiles/VITIMexe.webp"
  },
  {
    name: "lrwx",
    role: "Observador",
    content: "Não baixei a base ainda apenas estou acompanhando a comunidade faz alguns dias e de longe, essa é a melhor comunidade brasileira de fivem... parabéns aos responsáveis.",
    avatar: "/profiles/lrwx.webp"
  },
  {
    name: "Araújo",
    role: "Membro da Comunidade",
    content: "Excelente trabalho, gostei da base e das coisas que podemos criar dentro da cidade, sei que tá em fase beta, mas está mt boa.",
    avatar: "/profiles/Araújo.webp"
  },
  {
    name: "Zerow",
    role: "Membro da Comunidade",
    content: "Ótimo produto, fácil de configurar e adicionar novas atualizações também. Muito Bom!",
    avatar: "/profiles/Zerow.webp"
  },
  {
    name: "gleibsonms",
    role: "Membro da Comunidade",
    content: "Parabéns pela iniciativa. O produto entrega muita coisa.",
    avatar: "/profiles/gleibsonms.webp"
  },
  {
    name: "baumel_",
    role: "Membro da Comunidade",
    content: "Parabéns à equipe @MUR4I @G5 @Ailton Zamboti e o resto da equipe pelo excelente trabalho no desenvolvimento, a otimização, estabilidade e facilidade de personalização são impressionantes, tornando a experiência de criação de cidades muito mais fluida. O comprometimento com atualizações e suporte à comunidade faz toda a diferença! 10/10",
    avatar: "/profiles/baumel.webp"
  }
]

export default async function HomePage() {
  // Fetch live stats from 5metrics — all MRI resources in parallel
  const MRI_RESOURCES = [
    "mri_Qbox",
    "mri_Qobjects",
    "mri_Qblackout",
    "mri_Qcarkeys",
  ]

  let totalServers = 150  // fallback max (e.g. Qobjects)
  let totalPlayers = 208  // fallback max

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
      totalPlayers = maxPlayers
    }
  } catch {
    // keep fallback defaults
  }

  let teamMembers: any[] = []
  try {
    const teamRes = await fetch("https://users.mriqbox.com.br/public/members.json", {
      next: { revalidate: 3600 }
    })
    teamMembers = await teamRes.json()
  } catch {
    // fallback or empty
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
          <Link href="https://docs.mriqbox.com.br" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Suporte</Link>
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
          Crie com precisão.<br />
          Jogue com segurança.
        </h1>

        <p className="text-lg md:text-xl text-white font-medium mb-10 max-w-2xl">
          A framework open-source que combina Qbcore e Ox, tornando a base do seu servidor mais prática e segura.
        </p>

        <Link href="https://docs.mriqbox.com.br/mri/instalacao" className="px-8 py-3.5 bg-primary hover:bg-primary/90 rounded-full text-primary-foreground font-bold text-lg transition-all hover:scale-105">
          Instalar agora
        </Link>

        {/* 5metrics live stats */}
        <div className="mt-8 flex items-center gap-6 md:gap-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(0,230,153,0.5)]" />
            <span className="text-base md:text-lg text-muted-foreground">
              <span className="font-bold text-white text-lg md:text-xl">{totalServers}</span> servidores rodando
            </span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-primary/80 animate-pulse shadow-[0_0_10px_rgba(0,230,153,0.3)]" style={{ animationDelay: "0.5s" }} />
            <span className="text-base md:text-lg text-muted-foreground">
              <span className="font-bold text-white text-lg md:text-xl">{totalPlayers}</span> jogadores utilizando
            </span>
          </div>
          <div className="w-px h-6 bg-white/20" />
          <a href="https://5metrics.dev/resource/mri_Qbox" target="_blank" rel="noopener noreferrer" className="text-xs md:text-sm text-muted-foreground/60 hover:text-white transition-colors">
            via 5metrics
          </a>
        </div>

        {/* Installer Mockup */}
        <div className="mt-16 w-full px-4">
          <InstallerMockup />
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
      <section id="equipe" className="w-full max-w-[1440px] mx-auto px-6 md:px-12 py-[80px] flex flex-col items-center justify-center border-b border-white/5">
        <h2 className="text-2xl text-white font-medium mb-12 text-center">Esses são os responsáveis por manter esse projeto rodando:</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 w-full max-w-4xl">
          {teamMembers.map((member) => (
            <div key={member.login} className="flex flex-col items-center gap-4">
              <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-primary/20 hover:border-primary transition-colors">
                <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
              </div>

              <div className="flex flex-col w-full gap-2">
                <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#091811] hover:bg-[#0d2218] border border-primary/20 text-primary rounded-md py-2 px-4 w-full transition-colors font-medium">
                  <Github className="w-4 h-4" />
                  {member.login}
                </a>
                {member.kofi_username && (
                  <a href={`https://ko-fi.com/${member.kofi_username}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-[#091811] hover:bg-[#0d2218] border border-primary/20 text-primary rounded-md py-2 px-4 w-full transition-colors font-medium">
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
            Construído para<br />
            <span className="text-muted-foreground">Performance e Escala</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-md">
            Tudo o que você precisa para rodar um servidor de alta qualidade, sem a dor de cabeça de scripts desatualizados e bugs constantes.
          </p>
        </div>

        <div className="flex-1 flex flex-col gap-6">
          {/* Feature Card 1 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Segurança e Otimização</h3>
            <p className="text-muted-foreground leading-relaxed">
              Baseado na Qbox internacional e Ox ecosystem. O código roda leve no cliente e no servidor, suportando centenas de jogadores.
            </p>
          </div>

          {/* Feature Card 2 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Code className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Base Pronta & Traduzida</h3>
            <p className="text-muted-foreground leading-relaxed">
              Inicie com dezenas de scripts profissionais já configurados e 100% em português. Não perca tempo traduzindo locales.
            </p>
          </div>

          {/* Feature Card 3 */}
          <div className="p-8 rounded-2xl bg-glass border border-white/5 flex flex-col gap-4 group hover:border-primary/50 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-semibold text-white">Integração Nativa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Feito para funcionar perfeitamente com ox_lib, ox_inventory e ox_target desde o primeiro dia.
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
        <div className="w-full rounded-[2rem] bg-glass border border-white/10 p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 bg-primary/10 blur-[100px] pointer-events-none" />

          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 relative z-10">
            Pronto para revolucionar<br />seu servidor?
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mb-10 relative z-10">
            Junte-se à comunidade MRI Qbox Brasil e eleve a qualidade do seu roleplay hoje mesmo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 relative z-10">
            <Link href="https://docs.mriqbox.com.br/mri/instalacao" className="flex items-center justify-center gap-2 px-10 py-5 bg-primary hover:bg-primary-accent rounded-xl text-white font-semibold text-lg transition-all shadow-[0_0_30px_-10px_rgba(0,230,153,0.4)]">
              Começar Gratuitamente
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
              A base open source definitiva para o seu servidor FiveM. Desempenho, segurança e modernidade para a comunidade brasileira.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-sm font-bold text-white tracking-wider uppercase mb-2">Projeto</h4>
              <Link href="/sobre" className="text-sm text-muted-foreground hover:text-white transition-colors">Sobre nós</Link>
              <Link href="/recursos" className="text-sm text-muted-foreground hover:text-white transition-colors">Recursos</Link>
              <Link href="/comecar" className="text-sm text-muted-foreground hover:text-white transition-colors">Como começar</Link>
              <Link href="https://docs.mriqbox.com.br" className="text-sm text-muted-foreground hover:text-white transition-colors">Documentação</Link>
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
