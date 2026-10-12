import type { ComparisonDictionary } from "./pt-BR"

export const ptPT: ComparisonDictionary = {
  meta: {
    title: "MRI Qbox vs QBCore vs ESX vs Qbox: comparação de frameworks FiveM",
    description:
      "Comparação objetiva entre as principais frameworks de servidor FiveM: MRI Qbox, QBCore, ESX e Qbox internacional. Stack técnica, manutenção, comunidade, desempenho e idioma.",
    ogTitle: "MRI Qbox vs QBCore vs ESX vs Qbox: comparação",
    ogDescription: "Que framework FiveM escolher? Tabela detalhada com critérios técnicos e de comunidade.",
    articleDescription:
      "Comparação objetiva entre as principais frameworks FiveM brasileiras e internacionais. Tabela com 10 critérios e análise de quando usar cada uma.",
  },
  home: "Início",
  breadcrumb: "Comparativo",
  back: "Voltar",
  eyebrow: "Análise",
  updated: "Atualizado a",
  title: "Comparação de frameworks FiveM",
  intro: {
    before: "Que framework escolher para o seu servidor FiveM de roleplay? Uma análise objetiva entre ",
    names: ["MRI Qbox", "Qbox internacional", "QBCore", "ESX"],
    and: " e ",
    after: ", as quatro opções mais usadas atualmente nos servidores brasileiros.",
  },
  summary: {
    title: "Resumo rápido",
    items: [
      {
        name: "MRI Qbox",
        text: "Qbox traduzido + scripts MRI prontos a usar. A melhor escolha para quem quer arrancar depressa em português do Brasil sem montar tudo de raiz.",
      },
      {
        name: "Qbox",
        text: "moderno, com ótimo desempenho e uma base técnica excelente. A melhor escolha para quem lê inglês técnico e quer total flexibilidade.",
      },
      {
        name: "QBCore",
        text: "comunidade enorme e o maior catálogo de scripts pagos no Tebex. A melhor escolha para quem dá prioridade à oferta de scripts prontos.",
      },
      {
        name: "ESX",
        text: "legado histórico, ainda ativa através do ESX Legacy. A melhor escolha para quem herdou um servidor ESX e não quer migrar.",
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
        qbcore: { value: "Inglês (traduções da comunidade)" },
        esx: { value: "Inglês (traduções da comunidade)" },
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
        criterion: "Desempenho (resmon)",
        mri: { value: "yes", note: "Igual ao Qbox upstream" },
        qbox: { value: "yes", note: "Otimizado, threading assíncrono" },
        qbcore: { value: "partial", note: "Bom, mas tem callbacks síncronos legacy" },
        esx: { value: "partial", note: "Depende muito da versão" },
      },
      {
        criterion: "Documentação em português",
        mri: { value: "yes", note: "mriqbox.com.br/docs" },
        qbox: { value: "no", note: "Só em inglês" },
        qbcore: { value: "partial", note: "Tutoriais dispersos em fóruns/YouTube" },
        esx: { value: "partial", note: "Comunidade brasileira antiga, fragmentada" },
      },
      {
        criterion: "Manutenção ativa",
        mri: { value: "yes", note: "Mantida + sincronizada com o Qbox upstream" },
        qbox: { value: "yes", note: "Equipa da Overextended ativa" },
        qbcore: { value: "yes", note: "Comunidade grande" },
        esx: { value: "partial", note: "ESX Legacy ativo, ESX original abandonado" },
      },
      {
        criterion: "Sistema de plugins oficial",
        mri: { value: "yes", note: "mri_Qadmin com barra lateral de plugins" },
        qbox: { value: "partial", note: "Convenção, não um padrão" },
        qbcore: { value: "no" },
        esx: { value: "no" },
      },
      {
        criterion: "Curva de aprendizagem",
        mri: { value: "Suave (português + docs)" },
        qbox: { value: "Média (exige inglês técnico)" },
        qbcore: { value: "Média (legacy menos exigente)" },
        esx: { value: "Suave (grande comunidade brasileira)" },
      },
      {
        criterion: "Compatibilidade com scripts pagos do Tebex",
        mri: { value: "yes", note: "Aceita scripts Qbox/QBCore" },
        qbox: { value: "yes" },
        qbcore: { value: "yes", note: "Maior catálogo no Tebex" },
        esx: { value: "yes", note: "Maior catálogo histórico" },
      },
      {
        criterion: "Ecossistema de scripts oficiais",
        mri: { value: "Suite MRI (Qadmin, Qspawn, Qmultichar, etc.)" },
        qbox: { value: "scripts qbx_*" },
        qbcore: { value: "scripts qb-*" },
        esx: { value: "scripts esx_*" },
      },
    ],
  },
  versus: [
    {
      title: "MRI Qbox vs Qbox internacional",
      paragraphs: [
        {
          text: "O MRI Qbox é, literalmente, o Qbox traduzido para português do Brasil e mantido em sincronia com o upstream da Overextended. Não é um fork divergente, é uma adaptação que pega em cada release do Qbox internacional e traduz mensagens, NPCs, jobs, gangs e documentação.",
        },
        {
          label: "Quando escolher a MRI:",
          text: "servidor brasileiro, equipa que não domina o inglês técnico, necessidade de documentação em português e de scripts complementares prontos (painel de administração, spawn cinematográfico, multichar moderno).",
        },
        {
          label: "Quando escolher o Qbox internacional:",
          text: "equipa bilingue, personalização profunda prevista, preferência por acompanhar o upstream em tempo real sem uma camada de tradução.",
        },
      ],
    },
    {
      title: "MRI Qbox vs QBCore",
      paragraphs: [
        {
          text: "O QBCore foi a base do Qbox: o Qbox é o fork moderno do QBCore, com integração nativa do ox_lib e melhorias de desempenho. Por consequência, o MRI Qbox (que descende do Qbox) também herda essas melhorias.",
        },
        {
          text: "O QBCore continua a ter uma comunidade ativa e o maior catálogo histórico de scripts pagos no Tebex. Muitos scripts QBCore funcionam diretamente no Qbox/MRI com pequenas adaptações (a compatibilidade é elevada), mas alguns dependem de helpers específicos do QB.",
        },
        {
          label: "Veredicto:",
          text: "para quem começa hoje do zero, o MRI Qbox (ou o Qbox) oferece uma base mais moderna. Para quem herdou ou já comprou muitos scripts QBCore, o melhor é ficar no QBCore.",
        },
      ],
    },
    {
      title: "MRI Qbox vs ESX",
      paragraphs: [
        {
          text: "O ESX e o Qbox são frameworks de gerações diferentes. O ESX vem dos primeiros anos do FiveM (originalmente baseado no essentialmode), o Qbox nasce de um design moderno (ox_lib + arquitetura modular).",
        },
        {
          text: "O ESX tem um catálogo de scripts gigantesco e uma comunidade brasileira muito antiga e ativa. Por outro lado, a arquitetura é mais difícil de manter: muitos scripts ESX exigem patches manuais a cada atualização.",
        },
        {
          label: "Veredicto:",
          text: "o ESX só faz sentido num servidor existente que já investiu em scripts ESX. Para começar hoje, o MRI Qbox/Qbox é a melhor escolha técnica.",
        },
      ],
    },
  ],
  cta: {
    title: "Pronto para começar?",
    text: "Consulte a lista completa de scripts da suite MRI e o guia de instalação.",
    button: "Artifacts DB",
  },
}
