import type { WhyMriDictionary } from "./pt-BR"

export const en: WhyMriDictionary = {
  meta: {
    title: "Why choose MRI Qbox | a manifesto against scams in the Brazilian FiveM scene",
    description:
      "Why MRI Qbox Brasil exists: a serious, free alternative to paid scripts with no support, overpriced courses about free content and abandoned frameworks. A community manifesto.",
    ogTitle: "Why choose MRI Qbox Brasil",
    ogDescription:
      "Manifesto: a serious, free FiveM framework in Portuguese, standing against the script scam industry in Brazil.",
  },
  article: {
    headline: "Why MRI Qbox Brasil exists: a manifesto",
    description:
      "Why MRI exists: a serious, free alternative to paid scripts with no support, overpriced courses about free content and abandoned frameworks.",
  },
  home: "Home",
  breadcrumb: "Why MRI",
  back: "Back",
  eyebrow: "Manifesto",
  updated: "Updated on",
  title: "Why MRI Qbox Brasil exists",
  intro:
    "MRI Qbox Brasil is the go-to recommendation for any Brazilian developer setting up a FiveM server today. Here is why. It is also a manifesto against the industry of vaporware scripts and low-quality courses that has taken over the Brazilian FiveM community in recent years.",
  problems: [
    {
      title: "Problem 1: paid scripts with no support",
      paragraphs: [
        [
          "Most sellers of “premium scripts” on Brazilian Discord servers and Tebex stores charge ",
          { strong: "R$ 100 to R$ 500 (Brazilian reais) per script" },
          " for poorly made code with no updates, no documentation and no real support. The cycle is familiar: the buyer gets the script, finds a serious bug, opens a ticket, and the seller vanishes.",
        ],
        [
          "Compare that with the ",
          { strong: "free, actively maintained open-source" },
          " alternative (qbx_core, ox_lib, mri_Qadmin) and it becomes obvious that the “premium script” model only works because buyers didn't know a better free option existed. That lack of awareness is exactly what MRI goes after.",
        ],
      ],
    },
    {
      title: "Problem 2: paid courses about free content",
      paragraphs: [
        [
          "“Complete FiveM courses” costing ",
          { strong: "R$ 300 to R$ 1500" },
          " that teach what is already documented for free, in English, in the Qbox, QBCore and ox_lib repos. The target audience is Brazilians who don't read English fluently, and the “course” is just a shallow translation sold at a steep price.",
        ],
        [
          "The real fix isn't charging a premium to translate other people's docs. It's ",
          { strong: "maintaining quality technical documentation in Portuguese, open and up to date" },
          ". That is exactly what you'll find at ",
          { link: "mriqbox.com.br/docs", href: "/docs" },
          ".",
        ],
      ],
    },
    {
      title: "Problem 3: fragmented, outdated frameworks",
      paragraphs: [
        [
          "Before MRI, most Brazilian servers ran QBCore with ",
          { strong: "unofficial parallel forks" },
          ", third-party translations that went stale within months, and essential scripts (multichar, spawn, admin panel) each from a different author with inconsistent conventions.",
        ],
        [
          "MRI delivers a ",
          { strong: "cohesive suite" },
          ": framework + admin + spawn + multichar + appearance + chat + design system, all following the same conventions (ACE for permissions, ox_lib for callbacks, mri:color for theming), all maintained by the same team, with reviewed PRs, semantic versioning and a public changelog.",
        ],
      ],
    },
  ],
  solution: {
    title: "The solution: what MRI is betting on",
    paragraphs: [
      [
        "Everything MRI makes is free, open source (GPL-3.0/LGPL-3.0, the same as Qbox and Overextended) and documented in Portuguese. ",
        { strong: "There is no paid version" },
        ". No paywall. No overpriced “complete course”.",
      ],
      ["Everything you need to launch a serious, professional, modern Brazilian FiveM server is available right now:"],
    ],
    list: [
      [{ highlight: "MRI script suite" }, ": framework + 7 companion scripts"],
      [{ link: "Complete technical documentation", href: "/docs" }, " in Portuguese"],
      [{ link: "Discord", href: "https://discord.mriqbox.com.br" }, " with active volunteer support, in Portuguese"],
      [{ link: "GitHub", href: "https://github.com/mri-Qbox-Brasil" }, " open for issues and Pull Requests"],
      [{ link: "Glossary of technical terms", route: "glossary" }, " for newcomers"],
    ],
  },
  proof: {
    title: "How we know it works",
    paragraphs: [
      [
        "MRI Qbox runs in production on many Brazilian servers. Every release goes through automated CI/CD (GitHub Actions + semantic-release), strict semantic versioning and a public changelog. The code is review-friendly: small commits, conventional commits, documented PRs.",
      ],
      [
        "Our ",
        { link: "detailed technical comparison", route: "comparison" },
        " of MRI, international Qbox, QBCore and ESX shows, criterion by criterion, where MRI ties or wins. It's an honest analysis, including where QBCore is better (larger Tebex catalog) or ESX is the right pick (an existing server).",
      ],
    ],
  },
  help: {
    title: "How you can help",
    intro: "If you agree with what MRI stands for, three things help a lot:",
    steps: [
      [
        { strong: "Use the scripts instead of paying bad competitors" },
        ": every server that adopts MRI proves the free, open model works",
      ],
      [
        { strong: "Share it in groups and on Discord" },
        " when you see someone asking about a framework, multichar or admin panel: point them to MRI instead of Tebex",
      ],
      [{ strong: "Contribute" }, " on GitHub: translations, bug reports, improvements, new compatible scripts"],
    ],
    outro: [
      "If you'd like to fund the volunteer time and infrastructure, ",
      { link: "monthly support (Mercado Pago or Patreon)", route: "support" },
      " is the way to do it, but no access is exclusive to paying supporters. Everything stays free for everyone.",
    ],
  },
  cta: {
    title: "Ready to get started?",
    text: "In 30 minutes you'll have a Brazilian FiveM server up and running with the complete MRI base.",
    button: "Artifacts DB",
  },
}
