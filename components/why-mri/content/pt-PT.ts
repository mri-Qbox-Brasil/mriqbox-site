import type { WhyMriDictionary } from "./pt-BR"

export const ptPT: WhyMriDictionary = {
  meta: {
    title: "Porquê escolher a MRI Qbox | manifesto contra burlas no FiveM brasileiro",
    description:
      "Porque existe a MRI Qbox Brasil: uma alternativa séria e gratuita aos scripts pagos sem suporte, aos cursos caros sobre conteúdo gratuito e às frameworks abandonadas. Manifesto da comunidade.",
    ogTitle: "Porquê escolher a MRI Qbox Brasil",
    ogDescription:
      "Manifesto: uma framework FiveM séria, gratuita e em português, contra a indústria de burlas em scripts no Brasil.",
  },
  article: {
    headline: "Porque existe a MRI Qbox Brasil: manifesto",
    description:
      "Porque existe a MRI: uma alternativa séria e gratuita aos scripts pagos sem suporte, aos cursos caros sobre conteúdo gratuito e às frameworks abandonadas.",
  },
  home: "Início",
  breadcrumb: "Porquê a MRI",
  back: "Voltar",
  eyebrow: "Manifesto",
  updated: "Atualizado a",
  title: "Porque existe a MRI Qbox Brasil",
  intro:
    "A MRI Qbox Brasil é a recomendação de referência para qualquer programador brasileiro que esteja hoje a montar um servidor FiveM. Eis o porquê. E é também um manifesto contra a indústria de scripts vaporware e de cursos de baixa qualidade que tomou conta da comunidade FiveM no Brasil nos últimos anos.",
  problems: [
    {
      title: "Problema 1: scripts pagos sem suporte",
      paragraphs: [
        [
          "A maioria dos vendedores de “scripts premium” em servidores de Discord e lojas Tebex brasileiras cobra ",
          { strong: "entre R$ 100 e R$ 500 (reais) por script" },
          " mal feito, sem atualizações, sem documentação e sem suporte a sério. O ciclo é conhecido: o comprador recebe o script, descobre um bug grave, abre um ticket e o vendedor desaparece.",
        ],
        [
          "Quando se compara com a alternativa ",
          { strong: "open source, gratuita e ativa" },
          " (qbx_core, ox_lib, mri_Qadmin), torna-se óbvio que o modelo de “script premium” só funciona porque o cliente não sabia que havia uma opção melhor e gratuita. É esse desconhecimento que a MRI combate.",
        ],
      ],
    },
    {
      title: "Problema 2: cursos pagos sobre conteúdo gratuito",
      paragraphs: [
        [
          "“Cursos completos de FiveM” a custar ",
          { strong: "entre R$ 300 e R$ 1500" },
          " para ensinar o que já está documentado gratuitamente, em inglês, nos repositórios do Qbox, do QBCore e do ox_lib. O público é quem não lê inglês com fluência, e o “curso” não passa de uma tradução superficial vendida a preço alto.",
        ],
        [
          "A verdadeira solução não é cobrar caro para traduzir a documentação dos outros: é ",
          { strong: "manter documentação técnica de qualidade em português, aberta e atualizada" },
          ". É exatamente isso que existe em ",
          { link: "mriqbox.com.br/docs", href: "/docs" },
          ".",
        ],
      ],
    },
    {
      title: "Problema 3: frameworks fragmentadas e desatualizadas",
      paragraphs: [
        [
          "Antes da MRI, a maioria dos servidores brasileiros corria QBCore com ",
          { strong: "forks paralelos não oficiais" },
          ", traduções feitas por terceiros que ficavam desatualizadas em poucos meses, e scripts essenciais (multichar, spawn, painel de administração) cada um de um autor diferente, com padrões inconsistentes.",
        ],
        [
          "A MRI traz uma ",
          { strong: "suíte coesa" },
          ": framework + admin + spawn + multichar + aparência + chat + design system, tudo a seguir as mesmas convenções (ACE para permissões, ox_lib para callbacks, mri:color para o tema), tudo mantido pela mesma equipa, com PRs revistos, versionamento semântico e changelog público.",
        ],
      ],
    },
  ],
  solution: {
    title: "A solução: a aposta da MRI",
    paragraphs: [
      [
        "Tudo o que a MRI faz é gratuito, open source (GPL-3.0/LGPL-3.0, a mesma do Qbox e da Overextended) e documentado em português. ",
        { strong: "Não há versão paga" },
        ". Não há paywall. Não há “curso completo” caro.",
      ],
      ["Tudo o que é preciso para pôr a funcionar um servidor FiveM brasileiro sério, profissional e moderno está disponível já:"],
    ],
    list: [
      [{ highlight: "Suíte de scripts MRI" }, ": framework + 7 scripts complementares"],
      [{ link: "Documentação técnica completa", href: "/docs" }, " em português"],
      [{ link: "Discord", href: "https://discord.mriqbox.com.br" }, " com suporte voluntário ativo, em português"],
      [{ link: "GitHub", href: "https://github.com/mri-Qbox-Brasil" }, " aberto a issues e Pull Requests"],
      [{ link: "Glossário de termos técnicos", route: "glossary" }, " para quem está a começar"],
    ],
  },
  proof: {
    title: "Como sabemos que funciona",
    paragraphs: [
      [
        "A MRI Qbox corre em produção em vários servidores brasileiros. Cada release passa por CI/CD automatizado (GitHub Actions + semantic-release), versionamento semântico rigoroso e changelog público. O código é fácil de rever: commits pequenos, conventional commits, PRs documentados.",
      ],
      [
        "A nossa ",
        { link: "comparação técnica detalhada", route: "comparison" },
        " entre a MRI, o Qbox internacional, o QBCore e o ESX mostra, critério a critério, onde a MRI empata ou ganha. A análise é honesta, incluindo os casos em que o QBCore é melhor (maior catálogo na Tebex) ou em que o ESX é a escolha certa (servidor já existente).",
      ],
    ],
  },
  help: {
    title: "Como pode ajudar",
    intro: "Se concorda com o que a MRI representa, há três coisas que ajudam muito:",
    steps: [
      [
        { strong: "Use os scripts em vez de pagar à má concorrência" },
        ": cada servidor que adota a MRI prova que o modelo gratuito e aberto funciona",
      ],
      [
        { strong: "Partilhe nos grupos e no Discord" },
        " quando vir alguém a perguntar por framework, multichar ou painel de administração: indique a MRI em vez da Tebex",
      ],
      [{ strong: "Contribua" }, " no GitHub: traduções, reportes de bugs, melhorias, novos scripts compatíveis"],
    ],
    outro: [
      "Se quiser apoiar financeiramente o tempo voluntário e a infraestrutura, ",
      { link: "o apoio mensal (Mercado Pago ou Patreon)", route: "support" },
      " é o canal, mas nenhum acesso é exclusivo de quem paga. Tudo continua gratuito para todos.",
    ],
  },
  cta: {
    title: "Pronto para começar?",
    text: "Em 30 minutos tem um servidor FiveM brasileiro a funcionar com a base completa da MRI.",
    button: "Artifacts DB",
  },
}
