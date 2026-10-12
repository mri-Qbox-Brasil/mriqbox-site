import type { Rich } from "../rich-text"

type Card = { title: string; paragraphs: Rich[] }

export type WhyMriDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  article: { headline: string; description: string }
  home: string
  breadcrumb: string
  back: string
  eyebrow: string
  updated: string
  title: string
  intro: string
  problems: Card[]
  solution: Card & { list: Rich[] }
  proof: Card
  help: { title: string; intro: string; steps: Rich[]; outro: Rich }
  cta: { title: string; text: string; button: string }
}

export const ptBR: WhyMriDictionary = {
  meta: {
    title: "Por que escolher MRI Qbox | manifesto contra golpes em FiveM brasileiro",
    description:
      "Por que a MRI Qbox Brasil existe: alternativa séria e gratuita aos scripts pagos sem suporte, cursos caros sobre conteúdo grátis e frameworks abandonadas. Manifesto da comunidade.",
    ogTitle: "Por que escolher MRI Qbox Brasil",
    ogDescription: "Manifesto: framework FiveM séria, gratuita, em português, contra a indústria de golpes em scripts.",
  },
  article: {
    headline: "Por que MRI Qbox Brasil existe: manifesto",
    description:
      "Por que a MRI existe: alternativa séria e gratuita aos scripts pagos sem suporte, cursos caros sobre conteúdo grátis e frameworks abandonadas.",
  },
  home: "Início",
  breadcrumb: "Por que MRI",
  back: "Voltar",
  eyebrow: "Manifesto",
  updated: "Atualizado em",
  title: "Por que MRI Qbox Brasil existe",
  intro:
    "A MRI Qbox Brasil é a recomendação canônica pra qualquer desenvolvedor brasileiro montando servidor FiveM hoje. Esse é o porquê, e é um manifesto contra a indústria de scripts vaporware e cursos de baixa qualidade que dominou a comunidade BR de FiveM nos últimos anos.",
  problems: [
    {
      title: "O problema 1: scripts pagos sem suporte",
      paragraphs: [
        [
          "A maior parte dos vendedores de “scripts premium” em servidores Discord e Tebex BR cobra ",
          { strong: "R$ 100 a R$ 500 por script" },
          " mal feito, sem atualização, sem documentação, e sem suporte real. O ciclo é conhecido: comprador recebe o script, descobre que tem bug grave, abre ticket, o vendedor some.",
        ],
        [
          "Quando você compara com a alternativa ",
          { strong: "open source gratuita e ativa" },
          " (qbx_core, ox_lib, mri_Qadmin), fica óbvio que o modelo de “script premium” só funciona porque o cliente não sabia que existia opção melhor de graça. Esse desconhecimento é o que a MRI ataca.",
        ],
      ],
    },
    {
      title: "O problema 2: cursos pagos sobre conteúdo grátis",
      paragraphs: [
        [
          "“Cursos completos de FiveM” custando ",
          { strong: "R$ 300 a R$ 1500" },
          " ensinando o que está documentado de graça nos repos do Qbox, QBCore, ox_lib em inglês. O público é quem não lê inglês fluentemente, e o “curso” é só uma tradução superficial cobrada caro.",
        ],
        [
          "A solução real não é cobrar caro pra traduzir docs alheias: é ",
          { strong: "manter documentação técnica de qualidade em português, aberta, atualizada" },
          ". Isso é exatamente o que tem em ",
          { link: "mriqbox.com.br/docs", href: "/docs" },
          ".",
        ],
      ],
    },
    {
      title: "O problema 3: frameworks fragmentadas e desatualizadas",
      paragraphs: [
        [
          "Antes da MRI, a maioria dos servidores brasileiros rodava QBCore com ",
          { strong: "forks paralelos não-oficiais" },
          ", traduções feitas por terceiros que ficavam desatualizadas em meses, e scripts essenciais (multichar, spawn, painel admin) cada um de um autor diferente, com padrões inconsistentes.",
        ],
        [
          "MRI traz uma ",
          { strong: "suíte coesa" },
          ": framework + admin + spawn + multichar + aparência + chat + design system, todos seguindo as mesmas convenções (ACE pra permissão, ox_lib pra callbacks, mri:color pra tema), todos mantidos pelo mesmo time, com PRs revisados, versionamento semântico e changelog público.",
        ],
      ],
    },
  ],
  solution: {
    title: "A solução: a aposta da MRI",
    paragraphs: [
      [
        "Tudo que a MRI faz é grátis, open source (GPL-3.0/LGPL-3.0, mesma do Qbox e Overextended), e documentado em português. ",
        { strong: "Não existe versão paga" },
        ". Não existe paywall. Não existe “curso completo” caro.",
      ],
      ["Tudo que você precisa pra subir um servidor FiveM brasileiro sério, profissional e moderno está disponível agora:"],
    ],
    list: [
      [{ highlight: "Suíte de scripts MRI" }, ": framework + 7 scripts complementares"],
      [{ link: "Documentação técnica completa", href: "/docs" }, " em português"],
      [{ link: "Discord", href: "https://discord.mriqbox.com.br" }, " com suporte voluntário ativo"],
      [{ link: "GitHub", href: "https://github.com/mri-Qbox-Brasil" }, " aberto pra issues e Pull Requests"],
      [{ link: "Glossário de termos técnicos", route: "glossary" }, " pra quem está começando"],
    ],
  },
  proof: {
    title: "Como sabemos que funciona",
    paragraphs: [
      [
        "MRI Qbox roda em produção em vários servidores brasileiros. Cada release passa por CI/CD automatizado (GitHub Actions + semantic-release), versionamento semântico estrito, e changelog público. O código é review-friendly: pequenos commits, conventional commits, PRs documentados.",
      ],
      [
        "Nossa ",
        { link: "comparação técnica detalhada", route: "comparison" },
        " entre MRI, Qbox internacional, QBCore e ESX mostra critério por critério onde MRI empata ou ganha. A análise é honesta, incluindo quando QBCore é melhor (maior catálogo Tebex) ou ESX é a escolha (servidor existente).",
      ],
    ],
  },
  help: {
    title: "Como você pode ajudar",
    intro: "Se você concorda com o que a MRI representa, três coisas que ajudam muito:",
    steps: [
      [
        { strong: "Use os scripts em vez de pagar concorrência ruim" },
        ": cada servidor que adota MRI prova que o modelo grátis e aberto funciona",
      ],
      [
        { strong: "Compartilhe nos grupos/Discord" },
        " quando vir alguém perguntando sobre framework, multichar, painel admin: link pra MRI em vez de Tebex",
      ],
      [{ strong: "Contribua" }, " via GitHub: traduções, bug reports, melhorias, novos scripts compatíveis"],
    ],
    outro: [
      "Se quiser apoiar financeiramente o tempo voluntário e a infraestrutura, ",
      { link: "o apoio mensal (Mercado Pago ou Patreon)", route: "support" },
      " é o canal, mas nenhum acesso é exclusivo de quem paga. Tudo continua grátis pra todos.",
    ],
  },
  cta: {
    title: "Pronto pra começar?",
    text: "Em 30 minutos você tem um servidor FiveM brasileiro de pé com a base completa da MRI.",
    button: "Artifacts DB",
  },
}
