import type { WhyMriDictionary } from "./pt-BR"

export const es: WhyMriDictionary = {
  meta: {
    title: "Por qué elegir MRI Qbox | manifiesto contra las estafas en el FiveM brasileño",
    description:
      "Por qué existe MRI Qbox Brasil: una alternativa seria y gratuita a los scripts pagos sin soporte, a los cursos caros sobre contenido gratuito y a los frameworks abandonados. Manifiesto de la comunidad.",
    ogTitle: "Por qué elegir MRI Qbox Brasil",
    ogDescription:
      "Manifiesto: un framework FiveM serio, gratuito y en portugués, contra la industria de estafas con scripts en Brasil.",
  },
  article: {
    headline: "Por qué existe MRI Qbox Brasil: manifiesto",
    description:
      "Por qué existe MRI: una alternativa seria y gratuita a los scripts pagos sin soporte, a los cursos caros sobre contenido gratuito y a los frameworks abandonados.",
  },
  home: "Inicio",
  breadcrumb: "Por qué MRI",
  back: "Volver",
  eyebrow: "Manifiesto",
  updated: "Actualizado el",
  title: "Por qué existe MRI Qbox Brasil",
  intro:
    "MRI Qbox Brasil es la recomendación de referencia para cualquier desarrollador brasileño que esté armando un servidor FiveM hoy. Este es el porqué, y también es un manifiesto contra la industria de scripts vaporware y cursos de baja calidad que dominó la comunidad brasileña de FiveM en los últimos años.",
  problems: [
    {
      title: "Problema 1: scripts pagos sin soporte",
      paragraphs: [
        [
          "La mayoría de los vendedores de “scripts premium” en servidores de Discord y tiendas Tebex brasileñas cobra ",
          { strong: "de R$ 100 a R$ 500 (reales brasileños) por script" },
          " mal hecho, sin actualizaciones, sin documentación y sin soporte real. El ciclo es conocido: el comprador recibe el script, descubre que tiene un bug grave, abre un ticket y el vendedor desaparece.",
        ],
        [
          "Cuando lo comparas con la alternativa ",
          { strong: "open source, gratuita y activa" },
          " (qbx_core, ox_lib, mri_Qadmin), queda claro que el modelo de “script premium” solo funciona porque el cliente no sabía que existía una opción mejor y gratis. Ese desconocimiento es lo que MRI combate.",
        ],
      ],
    },
    {
      title: "Problema 2: cursos pagos sobre contenido gratuito",
      paragraphs: [
        [
          "“Cursos completos de FiveM” que cuestan ",
          { strong: "de R$ 300 a R$ 1500" },
          " y enseñan lo que ya está documentado gratis, en inglés, en los repos de Qbox, QBCore y ox_lib. El público son personas que no leen inglés con fluidez, y el “curso” no es más que una traducción superficial vendida a precio alto.",
        ],
        [
          "La verdadera solución no es cobrar caro por traducir la documentación ajena: es ",
          { strong: "mantener documentación técnica de calidad en portugués, abierta y actualizada" },
          ". Eso es justo lo que hay en ",
          { link: "mriqbox.com.br/docs", href: "/docs" },
          ".",
        ],
      ],
    },
    {
      title: "Problema 3: frameworks fragmentados y desactualizados",
      paragraphs: [
        [
          "Antes de MRI, la mayoría de los servidores brasileños corría QBCore con ",
          { strong: "forks paralelos no oficiales" },
          ", traducciones hechas por terceros que quedaban desactualizadas en pocos meses, y scripts esenciales (multichar, spawn, panel de administración) cada uno de un autor distinto, con estándares inconsistentes.",
        ],
        [
          "MRI ofrece una ",
          { strong: "suite coherente" },
          ": framework + admin + spawn + multichar + apariencia + chat + design system, todos con las mismas convenciones (ACE para permisos, ox_lib para callbacks, mri:color para el tema), todos mantenidos por el mismo equipo, con PRs revisados, versionado semántico y changelog público.",
        ],
      ],
    },
  ],
  solution: {
    title: "La solución: la apuesta de MRI",
    paragraphs: [
      [
        "Todo lo que hace MRI es gratis, open source (GPL-3.0/LGPL-3.0, la misma de Qbox y Overextended) y está documentado en portugués. ",
        { strong: "No existe versión paga" },
        ". No hay paywall. No hay “curso completo” caro.",
      ],
      ["Todo lo que necesitas para levantar un servidor FiveM brasileño serio, profesional y moderno está disponible ahora:"],
    ],
    list: [
      [{ highlight: "Suite de scripts MRI" }, ": framework + 7 scripts complementarios"],
      [{ link: "Documentación técnica completa", href: "/docs" }, " en portugués"],
      [{ link: "Discord", href: "https://discord.mriqbox.com.br" }, " con soporte voluntario activo, en portugués"],
      [{ link: "GitHub", href: "https://github.com/mri-Qbox-Brasil" }, " abierto a issues y Pull Requests"],
      [{ link: "Glosario de términos técnicos", route: "glossary" }, " para quienes están empezando"],
    ],
  },
  proof: {
    title: "Cómo sabemos que funciona",
    paragraphs: [
      [
        "MRI Qbox corre en producción en varios servidores brasileños. Cada release pasa por CI/CD automatizado (GitHub Actions + semantic-release), versionado semántico estricto y changelog público. El código es fácil de revisar: commits pequeños, conventional commits, PRs documentados.",
      ],
      [
        "Nuestra ",
        { link: "comparativa técnica detallada", route: "comparison" },
        " entre MRI, Qbox internacional, QBCore y ESX muestra, criterio por criterio, dónde MRI empata o gana. El análisis es honesto, incluso cuando QBCore es mejor (catálogo más grande en Tebex) o cuando ESX es la opción indicada (servidor ya existente).",
      ],
    ],
  },
  help: {
    title: "Cómo puedes ayudar",
    intro: "Si estás de acuerdo con lo que MRI representa, hay tres cosas que ayudan mucho:",
    steps: [
      [
        { strong: "Usa los scripts en lugar de pagarle a la mala competencia" },
        ": cada servidor que adopta MRI demuestra que el modelo gratuito y abierto funciona",
      ],
      [
        { strong: "Compártelo en grupos y en Discord" },
        " cuando veas a alguien preguntando por un framework, multichar o panel de administración: recomienda MRI en lugar de Tebex",
      ],
      [{ strong: "Contribuye" }, " en GitHub: traducciones, reportes de bugs, mejoras, nuevos scripts compatibles"],
    ],
    outro: [
      "Si quieres apoyar económicamente el tiempo voluntario y la infraestructura, ",
      { link: "el apoyo mensual (Mercado Pago o Patreon)", route: "support" },
      " es el canal, pero ningún acceso es exclusivo de quien paga. Todo sigue siendo gratis para todos.",
    ],
  },
  cta: {
    title: "¿Listo para empezar?",
    text: "En 30 minutos tienes un servidor FiveM brasileño funcionando con la base completa de MRI.",
    button: "Artifacts DB",
  },
}
