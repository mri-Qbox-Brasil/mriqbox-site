import { ptBR, type HomeDictionary } from "./pt-BR"

export const ptPT: HomeDictionary = {
  meta: {
    title: "MRI Qbox Brasil | Framework FiveM Open Source",
    description:
      "Crie servidores FiveM com uma base Qbox moderna, gratuita e em português. Instalação guiada, scripts otimizados, documentação completa e comunidade brasileira.",
    ogTitle: "MRI Qbox Brasil | A base FiveM feita para o Brasil",
    ogDescription: "Framework FiveM open source com Qbox, QBCore e Ox, instalação guiada e apoio da comunidade brasileira.",
    twitterDescription: "Uma base FiveM moderna, gratuita, otimizada e documentada em português.",
  },
  hero: {
    teamBadge: "Conheça a nossa equipa",
    title: ["Menos configuração.", "Mais criação."],
    subtitle:
      "Uma framework FiveM open source assente na Qbox, para construir servidores mais rápidos, seguros e fáceis de manter.",
  },
  chart: {
    servers: "servidores a usar MRI",
    players: "jogadores neste momento",
    peak: "pico",
    lastDays: "últimos dias",
    ariaLabel: "Jogadores ligados ao longo do tempo",
    empty:
      "Dados reais de servidores FiveM que usam scripts da MRI Qbox, atualizados periodicamente pelo 5metrics. O histórico de utilização vai aparecer nos próximos dias.",
  },
  installer: {
    eyebrow: "Novo instalador MRI disponível",
    title: "Da transferência ao primeiro arranque. Sem complicações.",
    text: "O novo instalador guia-o em cada etapa, da escolha do FXServer à configuração completa do ambiente MRI Qbox.",
    steps: ["FXServer", "Ambiente", "MRI Qbox"],
    cta: "Abrir instalador",
  },
  mockup: {
    steps: ["Ambiente", "Versão do Artefacto", "Receita", "Resumo", "Instalação", "Configuração", "Finalização"],
    next: "Seguinte",
    unavailable: "N/D",
    environment: {
      title: "Configurar o Ambiente",
      text: "Escolha onde o servidor vai ser instalado e configure a ligação.",
      baseFolder: "Pasta Base",
      database: "Ligação à Base de Dados",
      installMariaDb: "Instalar o MariaDB automaticamente",
      user: "Utilizador",
      password: "Palavra-passe",
    },
    artifact: {
      title: "Versão do FXServer",
      text: "Selecione a versão dos artefactos do FiveM que pretende utilizar.",
      officialPicks: "Recomendações Oficiais",
      recommended: "Recomendado",
      knownIssues: "Problemas conhecidos catalogados",
    },
    recipe: {
      title: "Receita do Servidor",
      text: "Que base pretende instalar no seu servidor?",
      base: "Base robusta e moderna com Ox_Core, recursos otimizados e scripts nativos.",
      beta: "Acesso antecipado às novidades da MRI Qbox, disponível para quem apoia o desenvolvimento do projeto.",
    },
    summary: {
      title: "Resumo da Instalação",
      text: "Reveja as suas escolhas antes de iniciar o deploy.",
      baseFolder: "Pasta Base",
      artifact: "Artefacto FXServer",
      recommended: "Recomendado",
      recipe: "Receita",
      start: "Iniciar Instalação",
    },
    install: { running: "A executar tarefas em segundo plano..." },
    config: {
      title: "Configuração do Servidor",
      text: "Quase lá! Defina os últimos detalhes do seu ambiente.",
      serverName: "Nome do Servidor",
      serverNameValue: "O Meu Servidor FiveM",
      license: "Licença CFX.re",
      getKey: "Obter Chave ↗",
      color: "Cor do Servidor (MRI)",
      finish: "Concluir Configuração",
    },
    success: {
      title: "Sucesso!",
      text: "O seu servidor foi instalado com sucesso e já está pronto a funcionar!",
      start: "Iniciar Servidor Agora",
    },
    console: "Consola do Servidor",
    thanks: {
      title: "Obrigado!",
      subtitle: "Por escolher a MRI Qbox",
      text: "A sua framework FiveM brasileira, open-source e feita com 💚 para a comunidade.",
    },
  },
  mriBot: {
    eyebrow: "Novo: MRI BOT",
    title: "Transforme o seu Discord num negócio.",
    text: "Loja, tickets, sondagens e projetos num único bot, gerido a partir de um painel web. Os pagamentos por Pix caem diretamente na sua conta Mercado Pago e o cargo é atribuído automaticamente.",
    highlights: {
      store: "Loja com Pix e cartão",
      instantRole: "Cargo atribuído na hora",
      tickets: "Tickets profissionais",
      polls: "Sondagens por cargo",
      freePlan: "Plano gratuito para sempre",
    },
    cta: "Começar grátis",
  },
  partners: {
    title: "Os Nossos Parceiros",
    subtitle: "Tecnologias, comunidades e projetos que apoiam e confiam na MRI Qbox.",
  },
  team: {
    eyebrow: "As pessoas por trás do código",
    title: ["Código aberto.", "Construído por pessoas."],
    text: "Conheça quem dedica tempo, experiência e cuidado para manter a MRI Qbox a evoluir todos os dias.",
    support: "Apoiar",
  },
  features: {
    title: "Leve para começar.",
    titleMuted: "Pronta para crescer.",
    text: "Uma base FiveM moderna, pensada para reduzir a manutenção, evitar dependências ultrapassadas e acompanhar o crescimento da sua cidade.",
    performance: {
      title: "Desempenho de raiz",
      text: "Construída sobre a Qbox e o ecossistema Ox, com código enxuto no cliente e no servidor para manter a sua cidade rápida, estável e segura.",
    },
    ready: {
      title: "Pronta no primeiro arranque",
      text: "Comece com scripts profissionais já configurados e em português. Menos tempo a traduzir locales, mais tempo a construir a sua cidade.",
    },
    ox: {
      title: "Ox desde a base",
      text: "Integração nativa com ox_lib, ox_inventory e ox_target desde o primeiro dia, sem adaptações improvisadas.",
    },
  },
  metrics: {
    eyebrow: "MRI Qbox em números",
    title: "Tudo para a sua cidade começar em grande.",
    text: "Código aberto, recursos integrados e uma comunidade brasileira a construir em conjunto.",
    free: { label: "Gratuito e open source", text: "Livre para usar, estudar e evoluir." },
    scripts: { label: "Scripts integrados", text: "Uma base completa desde o primeiro arranque." },
    community: { label: "Comunidade ativa", text: "Conhecimento partilhado todos os dias." },
    discord: { label: "Membros no Discord", text: "Pessoas a criar e a jogar em conjunto." },
  },
  feedback: {
    title: "O que diz a comunidade",
    subtitle: "Veja o feedback de quem já utiliza a MRI Qbox no dia a dia.",
    roles: {
      member: "Membro da Comunidade",
      developer: "Programador",
      ptCommunity: "Comunidade PT",
      contentCreator: "Criadora de Conteúdos",
      observer: "Observador",
    },
    // Real community quotes, kept as written by their authors.
    quotes: ptBR.feedback.quotes,
  },
  faq: {
    title: "Perguntas Frequentes",
    subtitle: "Tudo o que precisa de saber antes de começar o seu projeto.",
    items: [
      {
        question: "Qual é a diferença entre MRI Qbox, Qbox e QBCore?",
        answer:
          "A MRI Qbox é a adaptação brasileira da Qbox, a evolução moderna do ecossistema QBCore com integração nativa com o Ox. Mantém a base que a comunidade já conhece e acrescenta tradução para português, documentação própria e recursos complementares prontos para servidores brasileiros.",
      },
      {
        question: "É mesmo gratuito?",
        answer:
          "Sim. A MRI Qbox é gratuita e open source, com projetos publicados sob GPL-3.0 ou LGPL-3.0. Pode estudar, modificar, contribuir e usar o software em projetos comerciais, respeitando a licença de cada repositório. A infraestrutura é mantida com o apoio da comunidade, do Patreon e de anúncios.",
      },
      {
        question: "Posso usá-la num servidor comercial?",
        answer:
          "Sim. As licenças permitem a utilização comercial. Se distribuir uma versão modificada, poderá ter de disponibilizar o código-fonte e manter os avisos da licença; consulte sempre a licença do repositório correspondente. A marca e os logótipos da MRI Qbox têm regras próprias e não devem representar outro projeto sem autorização.",
      },
      {
        question: "Onde encontro apoio técnico?",
        answer:
          "O apoio é comunitário e voluntário, no Discord oficial. Para reportar bugs ou sugerir novas funcionalidades, abra uma Issue no repositório correspondente do GitHub. Não há SLA, mas os pedidos com logs e passos para reproduzir o problema costumam ser atendidos mais depressa.",
      },
      {
        question: "Quanto tempo demora a instalação?",
        answer:
          "Em condições normais, o novo instalador transfere e prepara a base MRI Qbox em cerca de 4 minutos. No final, só precisa de rever as configurações do servidor e concluir os ajustes específicos da sua cidade.",
      },
      {
        question: "Como posso contribuir para o projeto?",
        answer:
          "Pode enviar Pull Requests, reportar bugs, sugerir melhorias, traduzir conteúdos, melhorar a documentação ou ajudar outros membros no Discord. Para apoiar a infraestrutura e a continuidade do projeto, também pode contribuir através do Patreon.",
      },
    ],
  },
  cta: {
    eyebrow: "Open source por princípio. Brasileira por essência. Feita para ir mais longe.",
    title: "Uma grande cidade",
    titleEnd: "começa pela base.",
    text: "Comece gratuitamente com a MRI Qbox ou entre no Discord para aprender, contribuir e construir com a comunidade brasileira.",
    download: "Transferir gratuitamente",
    discord: "Entrar no Discord",
    github: "Ver no GitHub",
  },
}
