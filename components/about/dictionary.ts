import type { Locale } from "@/lib/i18n"
import type { Rich } from "@/components/why-mri/rich-text"

export type AboutDictionary = {
  meta: { title: string; description: string; ogTitle: string; ogDescription: string }
  home: string
  breadcrumb: string
  back: string
  eyebrow: string
  updated: string
  title: string
  intro: Rich
  why: { title: string; text: Rich }
  mission: { title: string; items: Rich[] }
  maintain: { title: string; intro: string; items: { name: string; description: string }[] }
  funding: { title: string; text: Rich }
  contact: { title: string; text: string; docs: string }
}

// Resource names stay the same in every locale; only their descriptions change.
const RESOURCES = ["mri_Qadmin", "mri_Qspawn", "mri_Qmultichar", "mri_Qappearance", "mri_Qchat", "@mriqbox/ui-kit"] as const

const describe = (descriptions: string[]) => RESOURCES.map((name, i) => ({ name, description: descriptions[i] }))

const ptBR: AboutDictionary = {
  meta: {
    title: "Sobre a MRI Qbox Brasil: quem somos e por que existimos",
    description:
      "História, missão e equipe por trás da MRI Qbox Brasil: adaptação brasileira open source da framework Qbox para servidores FiveM.",
    ogTitle: "Sobre a MRI Qbox Brasil",
    ogDescription: "Comunidade brasileira mantenedora da adaptação Qbox open source.",
  },
  home: "Início",
  breadcrumb: "Sobre",
  back: "Voltar",
  eyebrow: "Sobre",
  updated: "Atualizado em",
  title: "Sobre a MRI Qbox Brasil",
  intro: [
    "Somos uma comunidade brasileira de desenvolvedores de FiveM que mantém a adaptação local da framework ",
    { strong: "Qbox" },
    " (a evolução pós-fork do QBCore com integração nativa ao Overextended/ox_lib).",
  ],
  why: {
    title: "Por que existimos",
    text: [
      "A maioria dos servidores brasileiros de roleplay usa frameworks em inglês, com documentação fragmentada e adaptações feitas por terceiros (sem padrão e geralmente desatualizadas). A MRI Qbox nasceu pra resolver isso: ",
      { strong: "uma base oficial em português" },
      ", atualizada junto com o upstream Qbox internacional, com documentação, suporte e padrões consistentes.",
    ],
  },
  mission: {
    title: "Nossa missão",
    items: [
      [
        "Manter ",
        { strong: "100% gratuita" },
        " e ",
        { strong: "open source" },
        " (GPL-3.0 / LGPL-3.0, mesmo modelo do Qbox e Overextended) a base que servidores brasileiros precisam pra começar",
      ],
      [{ strong: "Documentar tudo em português" }, " de forma técnica e acessível, com exemplos reais"],
      [
        "Construir um ",
        { strong: "design system compartilhado" },
        " (@mriqbox/ui-kit) para que scripts MRI tenham identidade visual consistente",
      ],
      ["Promover boas práticas: versionamento semântico, CI/CD, conventional commits, testes"],
    ],
  },
  maintain: {
    title: "O que mantemos",
    intro: "Além da framework Qbox traduzida, mantemos uma suíte de scripts complementares prontos pra produção:",
    items: describe([
      "painel admin com sistema de plugins",
      "spawn cinematográfico configurável ingame",
      "seleção de personagem moderna",
      "editor de aparência e roupas",
      "chat in-game",
      "design system React/Tailwind compartilhado",
    ]),
  },
  funding: {
    title: "Como nos sustentamos",
    text: [
      "O projeto é mantido pela equipe da MRI Qbox Brasil em tempo voluntário. Os custos de infraestrutura (domínio, CDN, hosting da documentação) são cobertos pelo ",
      { link: "apoio mensal (Mercado Pago ou Patreon)", route: "support" },
      " e pela receita de anúncios no site. Tudo que entra é reinvestido em ferramentas e documentação.",
    ],
  },
  contact: {
    title: "Contato",
    text: "O canal principal de comunicação é o Discord. Issues técnicas vão pelo GitHub do repositório correspondente.",
    docs: "Documentação",
  },
}

const ptPT: AboutDictionary = {
  meta: {
    title: "Sobre a MRI Qbox Brasil: quem somos e porque existimos",
    description:
      "História, missão e equipa por trás da MRI Qbox Brasil, a adaptação brasileira open source da framework Qbox para servidores FiveM.",
    ogTitle: "Sobre a MRI Qbox Brasil",
    ogDescription: "A comunidade brasileira que mantém a adaptação open source do Qbox.",
  },
  home: "Início",
  breadcrumb: "Sobre",
  back: "Voltar",
  eyebrow: "Sobre",
  updated: "Atualizado a",
  title: "Sobre a MRI Qbox Brasil",
  intro: [
    "Somos uma comunidade brasileira de programadores de FiveM que mantém a adaptação local da framework ",
    { strong: "Qbox" },
    " (a evolução pós-fork do QBCore, com integração nativa com a Overextended/ox_lib).",
  ],
  why: {
    title: "Porque existimos",
    text: [
      "A maioria dos servidores brasileiros de roleplay usa frameworks em inglês, com documentação fragmentada e adaptações feitas por terceiros (sem padrão e, em geral, desatualizadas). A MRI Qbox nasceu para resolver isso: ",
      { strong: "uma base oficial em português" },
      ", atualizada a par do upstream internacional do Qbox, com documentação, suporte e padrões consistentes.",
    ],
  },
  mission: {
    title: "A nossa missão",
    items: [
      [
        "Manter ",
        { strong: "100% gratuita" },
        " e ",
        { strong: "open source" },
        " (GPL-3.0 / LGPL-3.0, o mesmo modelo do Qbox e da Overextended) a base de que os servidores brasileiros precisam para começar",
      ],
      [{ strong: "Documentar tudo em português" }, " de forma técnica e acessível, com exemplos reais"],
      [
        "Construir um ",
        { strong: "design system partilhado" },
        " (@mriqbox/ui-kit) para que os scripts MRI tenham uma identidade visual consistente",
      ],
      ["Promover boas práticas: versionamento semântico, CI/CD, conventional commits, testes"],
    ],
  },
  maintain: {
    title: "O que mantemos",
    intro: "Além da framework Qbox traduzida, mantemos uma suíte de scripts complementares prontos para produção:",
    items: describe([
      "painel de administração com sistema de plugins",
      "spawn cinematográfico configurável dentro do jogo",
      "seleção de personagem moderna",
      "editor de aparência e roupa",
      "chat dentro do jogo",
      "design system React/Tailwind partilhado",
    ]),
  },
  funding: {
    title: "Como nos sustentamos",
    text: [
      "O projeto é mantido pela equipa da MRI Qbox Brasil em regime de voluntariado. Os custos de infraestrutura (domínio, CDN, alojamento da documentação) são cobertos pelo ",
      { link: "apoio mensal (Mercado Pago ou Patreon)", route: "support" },
      " e pelas receitas de anúncios no site. Tudo o que entra é reinvestido em ferramentas e documentação.",
    ],
  },
  contact: {
    title: "Contacto",
    text: "O principal canal de comunicação é o Discord, em português. As issues técnicas seguem pelo GitHub do repositório correspondente.",
    docs: "Documentação",
  },
}

const es: AboutDictionary = {
  meta: {
    title: "Sobre MRI Qbox Brasil: quiénes somos y por qué existimos",
    description:
      "Historia, misión y equipo detrás de MRI Qbox Brasil, la adaptación brasileña open source del framework Qbox para servidores FiveM.",
    ogTitle: "Sobre MRI Qbox Brasil",
    ogDescription: "La comunidad brasileña que mantiene la adaptación open source de Qbox.",
  },
  home: "Inicio",
  breadcrumb: "Sobre nosotros",
  back: "Volver",
  eyebrow: "Sobre nosotros",
  updated: "Actualizado el",
  title: "Sobre MRI Qbox Brasil",
  intro: [
    "Somos una comunidad brasileña de desarrolladores de FiveM que mantiene la adaptación local del framework ",
    { strong: "Qbox" },
    " (la evolución post-fork de QBCore, con integración nativa con Overextended/ox_lib).",
  ],
  why: {
    title: "Por qué existimos",
    text: [
      "La mayoría de los servidores brasileños de roleplay usa frameworks en inglés, con documentación fragmentada y adaptaciones hechas por terceros (sin estándar y, por lo general, desactualizadas). MRI Qbox nació para resolver eso: ",
      { strong: "una base oficial en portugués" },
      ", actualizada junto con el upstream internacional de Qbox, con documentación, soporte y estándares consistentes.",
    ],
  },
  mission: {
    title: "Nuestra misión",
    items: [
      [
        "Mantener ",
        { strong: "100% gratuita" },
        " y ",
        { strong: "open source" },
        " (GPL-3.0 / LGPL-3.0, el mismo modelo de Qbox y Overextended) la base que los servidores brasileños necesitan para empezar",
      ],
      [{ strong: "Documentar todo en portugués" }, " de forma técnica y accesible, con ejemplos reales"],
      [
        "Construir un ",
        { strong: "design system compartido" },
        " (@mriqbox/ui-kit) para que los scripts MRI tengan una identidad visual consistente",
      ],
      ["Promover buenas prácticas: versionado semántico, CI/CD, conventional commits, tests"],
    ],
  },
  maintain: {
    title: "Lo que mantenemos",
    intro: "Además del framework Qbox traducido, mantenemos una suite de scripts complementarios listos para producción:",
    items: describe([
      "panel de administración con sistema de plugins",
      "spawn cinematográfico configurable dentro del juego",
      "selección de personaje moderna",
      "editor de apariencia y ropa",
      "chat dentro del juego",
      "design system React/Tailwind compartido",
    ]),
  },
  funding: {
    title: "Cómo nos sostenemos",
    text: [
      "El proyecto lo mantiene el equipo de MRI Qbox Brasil con tiempo voluntario. Los costos de infraestructura (dominio, CDN, hosting de la documentación) se cubren con el ",
      { link: "apoyo mensual (Mercado Pago o Patreon)", route: "support" },
      " y con los ingresos por anuncios en el sitio. Todo lo que entra se reinvierte en herramientas y documentación.",
    ],
  },
  contact: {
    title: "Contacto",
    text: "El canal principal de comunicación es Discord, en portugués. Los issues técnicos van por el GitHub del repositorio correspondiente.",
    docs: "Documentación (en portugués)",
  },
}

const en: AboutDictionary = {
  meta: {
    title: "About MRI Qbox Brasil: who we are and why we exist",
    description:
      "The story, mission and team behind MRI Qbox Brasil, the open-source Brazilian adaptation of the Qbox framework for FiveM servers.",
    ogTitle: "About MRI Qbox Brasil",
    ogDescription: "The Brazilian community that maintains the open-source Qbox adaptation.",
  },
  home: "Home",
  breadcrumb: "About",
  back: "Back",
  eyebrow: "About",
  updated: "Updated on",
  title: "About MRI Qbox Brasil",
  intro: [
    "We're a Brazilian community of FiveM developers maintaining the local adaptation of the ",
    { strong: "Qbox" },
    " framework (the post-fork evolution of QBCore, with native Overextended/ox_lib integration).",
  ],
  why: {
    title: "Why we exist",
    text: [
      "Most Brazilian roleplay servers run on English-language frameworks, with fragmented documentation and third-party adaptations (no shared standard and usually outdated). MRI Qbox was created to fix that: ",
      { strong: "an official base in Portuguese" },
      ", kept in sync with upstream international Qbox, with consistent documentation, support and conventions.",
    ],
  },
  mission: {
    title: "Our mission",
    items: [
      [
        "Keep the base Brazilian servers need to get started ",
        { strong: "100% free" },
        " and ",
        { strong: "open source" },
        " (GPL-3.0 / LGPL-3.0, the same model as Qbox and Overextended)",
      ],
      [{ strong: "Document everything in Portuguese" }, ", technical yet approachable, with real examples"],
      [
        "Build a ",
        { strong: "shared design system" },
        " (@mriqbox/ui-kit) so MRI scripts have a consistent visual identity",
      ],
      ["Promote good practices: semantic versioning, CI/CD, conventional commits, testing"],
    ],
  },
  maintain: {
    title: "What we maintain",
    intro: "Besides the translated Qbox framework, we maintain a suite of production-ready companion scripts:",
    items: describe([
      "admin panel with a plugin system",
      "cinematic spawn, configurable in-game",
      "modern character selection",
      "appearance and clothing editor",
      "in-game chat",
      "shared React/Tailwind design system",
    ]),
  },
  funding: {
    title: "How we're funded",
    text: [
      "The project is maintained by the MRI Qbox Brasil team on volunteer time. Infrastructure costs (domain, CDN, documentation hosting) are covered by ",
      { link: "monthly support (Mercado Pago or Patreon)", route: "support" },
      " and by ad revenue on the site. Everything that comes in goes back into tools and documentation.",
    ],
  },
  contact: {
    title: "Contact",
    text: "Our main communication channel is Discord, in Portuguese. Technical issues go to the GitHub of the relevant repository.",
    docs: "Docs (in Portuguese)",
  },
}

export const aboutDictionary: Record<Locale, AboutDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
