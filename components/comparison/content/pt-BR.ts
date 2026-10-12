export type CellStatus = "yes" | "no" | "partial"
export type ComparisonCell = { value: CellStatus; note?: string } | { value: string }
export type ComparisonRow = { criterion: string; mri: ComparisonCell; qbox: ComparisonCell; qbcore: ComparisonCell; esx: ComparisonCell }
export type ComparisonParagraph = { label?: string; text: string }

export type ComparisonDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string; articleDescription: string }
  home: string
  breadcrumb: string
  back: string
  eyebrow: string
  updated: string
  title: string
  intro: { before: string; names: string[]; and: string; after: string }
  summary: { title: string; items: { name: string; text: string }[] }
  table: { title: string; criterion: string; rows: ComparisonRow[] }
  versus: { title: string; paragraphs: ComparisonParagraph[] }[]
  cta: { title: string; text: string; button: string }
}

export const ptBR: ComparisonDictionary = {
  meta: {
    title: "MRI Qbox vs QBCore vs ESX vs Qbox: comparativo de frameworks FiveM",
    description:
      "Comparativo objetivo entre as principais frameworks de servidor FiveM: MRI Qbox, QBCore, ESX e Qbox internacional. Stack técnica, manutenção, comunidade, performance e idioma.",
    ogTitle: "MRI Qbox vs QBCore vs ESX vs Qbox: comparativo",
    ogDescription: "Qual framework FiveM escolher? Tabela detalhada com critérios técnicos e de comunidade.",
    articleDescription:
      "Comparativo objetivo entre as principais frameworks FiveM brasileiras e internacionais. Tabela de 10 critérios e análise quando usar cada uma.",
  },
  home: "Início",
  breadcrumb: "Comparativo",
  back: "Voltar",
  eyebrow: "Análise",
  updated: "Atualizado em",
  title: "Comparativo de frameworks FiveM",
  intro: {
    before: "Qual framework escolher pro seu servidor FiveM de roleplay? Análise objetiva entre ",
    names: ["MRI Qbox", "Qbox internacional", "QBCore", "ESX"],
    and: " e ",
    after: ", as quatro opções mais usadas em servidores brasileiros hoje.",
  },
  summary: {
    title: "Resumo rápido",
    items: [
      {
        name: "MRI Qbox",
        text: "Qbox traduzido + scripts MRI prontos. Melhor escolha se você quer começar rápido em PT-BR sem montar tudo do zero.",
      },
      {
        name: "Qbox",
        text: "moderno, performático, base técnica excelente. Melhor escolha se você lê inglês técnico e quer flexibilidade total.",
      },
      {
        name: "QBCore",
        text: "comunidade gigantesca, maior catálogo de scripts pagos no Tebex. Melhor escolha se você prioriza disponibilidade de scripts prontos.",
      },
      {
        name: "ESX",
        text: "legado histórico, ainda ativa via ESX Legacy. Melhor escolha se você herdou um servidor ESX existente e não quer migrar.",
      },
    ],
  },
  table: {
    title: "Tabela comparativa",
    criterion: "Critério",
    rows: [
      {
        criterion: "Idioma nativo",
        mri: { value: "Português (BR)" },
        qbox: { value: "Inglês" },
        qbcore: { value: "Inglês (traduções via comunidade)" },
        esx: { value: "Inglês (traduções via comunidade)" },
      },
      {
        criterion: "Licença",
        mri: { value: "GPL-3.0 / LGPL-3.0" },
        qbox: { value: "GPL-3.0" },
        qbcore: { value: "GPL-3.0" },
        esx: { value: "GPL-3.0" },
      },
      {
        criterion: "Base de dependências",
        mri: { value: "Qbox + ox_lib + oxmysql" },
        qbox: { value: "ox_lib + oxmysql nativo" },
        qbcore: { value: "ox_lib (recente) ou legacy" },
        esx: { value: "essentialmode (legacy) ou oxmysql" },
      },
      {
        criterion: "Performance (resmon)",
        mri: { value: "yes", note: "Igual ao Qbox upstream" },
        qbox: { value: "yes", note: "Otimizado, threading async" },
        qbcore: { value: "partial", note: "Bom mas tem callbacks sync legacy" },
        esx: { value: "partial", note: "Depende fortemente da versão" },
      },
      {
        criterion: "Documentação em português",
        mri: { value: "yes", note: "mriqbox.com.br/docs" },
        qbox: { value: "no", note: "Só inglês" },
        qbcore: { value: "partial", note: "Tutoriais soltos em fórum/YouTube" },
        esx: { value: "partial", note: "Comunidade BR antiga, fragmentada" },
      },
      {
        criterion: "Atualização ativa",
        mri: { value: "yes", note: "Mantida + sync com upstream Qbox" },
        qbox: { value: "yes", note: "Time Overextended ativo" },
        qbcore: { value: "yes", note: "Comunidade grande" },
        esx: { value: "partial", note: "ESX Legacy ativo, ESX original abandonado" },
      },
      {
        criterion: "Plugin system oficial",
        mri: { value: "yes", note: "mri_Qadmin com sidebar de plugins" },
        qbox: { value: "partial", note: "Convenção, não padrão" },
        qbcore: { value: "no" },
        esx: { value: "no" },
      },
      {
        criterion: "Curva de aprendizado",
        mri: { value: "Suave (PT + docs)" },
        qbox: { value: "Média (exige inglês técnico)" },
        qbcore: { value: "Média (legacy menos exigente)" },
        esx: { value: "Suave (comunidade BR grande)" },
      },
      {
        criterion: "Compatibilidade com scripts pagos do Tebex",
        mri: { value: "yes", note: "Aceita scripts Qbox/Qbcore" },
        qbox: { value: "yes" },
        qbcore: { value: "yes", note: "Maior catálogo no Tebex" },
        esx: { value: "yes", note: "Maior catálogo histórico" },
      },
      {
        criterion: "Ecossistema de scripts oficiais",
        mri: { value: "Suite MRI (Qadmin, Qspawn, Qmultichar, etc)" },
        qbox: { value: "qbx_* scripts" },
        qbcore: { value: "qb-* scripts" },
        esx: { value: "esx_* scripts" },
      },
    ],
  },
  versus: [
    {
      title: "MRI Qbox vs Qbox internacional",
      paragraphs: [
        {
          text: "MRI Qbox é literalmente o Qbox traduzido pra português brasileiro, mantido em sincronia com o upstream da Overextended. Não é um fork divergente, é uma adaptação que pega cada release do Qbox internacional e traduz mensagens, NPCs, jobs, gangs e documentação.",
        },
        {
          label: "Quando escolher MRI:",
          text: "servidor brasileiro, equipe que não lê inglês técnico fluente, quer documentação em PT e scripts complementares prontos (painel admin, spawn cinematográfico, multichar moderno).",
        },
        {
          label: "Quando escolher Qbox internacional:",
          text: "equipe bilíngue, customização profunda esperada, prefere acompanhar o upstream em tempo real sem camada de tradução.",
        },
      ],
    },
    {
      title: "MRI Qbox vs QBCore",
      paragraphs: [
        {
          text: "QBCore foi a base do Qbox: o Qbox é o fork moderno do QBCore com integração nativa do ox_lib e melhorias de performance. Por consequência, MRI Qbox (que descende do Qbox) também herda essas melhorias.",
        },
        {
          text: "QBCore ainda tem comunidade ativa e o maior catálogo histórico de scripts pagos no Tebex. Muitos scripts QBCore funcionam direto no Qbox/MRI com pequenas adaptações (a compatibilidade é alta), mas alguns dependem de helpers QB-específicos.",
        },
        {
          label: "Veredito:",
          text: "se você está começando do zero hoje, MRI Qbox (ou Qbox) entrega uma base mais moderna. Se você herdou ou já comprou muitos scripts QBCore, fica em QBCore.",
        },
      ],
    },
    {
      title: "MRI Qbox vs ESX",
      paragraphs: [
        {
          text: "ESX e Qbox são frameworks de gerações diferentes. ESX vem dos primeiros anos do FiveM (essentialmode-based originalmente), Qbox é do design moderno (ox_lib + arquitetura modular).",
        },
        {
          text: "ESX tem catálogo de scripts gigantesco e comunidade BR muito antiga e ativa. Por outro lado, a arquitetura é mais difícil de manter: muitos scripts ESX exigem patches manuais a cada update.",
        },
        {
          label: "Veredito:",
          text: "ESX só faz sentido pra servidor existente que já tem investimento em scripts ESX. Pra começar hoje, MRI Qbox/Qbox é a escolha técnica melhor.",
        },
      ],
    },
  ],
  cta: {
    title: "Pronto pra começar?",
    text: "Veja a lista completa de scripts da suite MRI e o guia de instalação.",
    button: "Artifacts DB",
  },
}
