import { DISCORD_URL, GITHUB_URL, QBOX_URL, type TermsDictionary } from "./pt-BR"

export const es: TermsDictionary = {
  meta: {
    title: "Términos de uso | MRI Qbox Brasil",
    description:
      "Términos de uso del sitio mriqbox.com.br, del código GPL-3.0/LGPL-3.0 publicado en los repositorios de MRI Qbox Brasil y del servidor de Discord de la comunidad.",
  },
  back: "Volver",
  home: "Inicio",
  crumb: "Términos",
  heading: "Términos de uso",
  updated: "Última actualización",
  intro: [
    "Al acceder a ",
    { code: "mriqbox.com.br" },
    " y sus subdominios, o al usar cualquier código publicado en los repositorios de MRI Qbox Brasil en GitHub, aceptas estos términos. Si no estás de acuerdo, no uses el sitio ni los scripts.",
  ],
  sections: [
    {
      title: "1. Qué ofrecemos",
      blocks: [
        {
          paragraph: [
            "MRI Qbox Brasil distribuye gratuitamente una adaptación del framework open source ",
            { href: QBOX_URL, text: "Qbox" },
            " (Qbcore + Ox) para servidores FiveM brasileños. El código está alojado en ",
            { href: GITHUB_URL, text: "github.com/mri-Qbox-Brasil" },
            " y licenciado bajo ",
            { strong: "GPL-3.0" },
            " (scripts y frameworks) o ",
            { strong: "LGPL-3.0" },
            " (bibliotecas reutilizables como @mriqbox/ui-kit), siguiendo el mismo modelo de licenciamiento de Qbox y Overextended. Cada repositorio indica la licencia aplicable en el archivo ",
            { code: "LICENSE" },
            ".",
          ],
        },
      ],
    },
    {
      title: "2. Uso permitido",
      blocks: [
        {
          list: [
            ["Usar los scripts en servidores FiveM, comerciales o no"],
            ["Modificarlos para adaptarlos a tu servidor y contribuir de vuelta mediante Pull Request"],
            [
              "Hacer fork y redistribuir, siempre que mantengas la licencia GPL/LGPL original y pongas a disposición el código modificado (copyleft)",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Uso prohibido",
      blocks: [
        {
          list: [
            [
              "Redistribuir versiones modificadas ",
              { strong: "cerradas" },
              ": la GPL exige que el código permanezca abierto",
            ],
            [
              "Usar la marca “MRI Qbox”, sus logotipos e identidad visual sin autorización (la licencia cubre el código fuente, no la marca registrada)",
            ],
            [
              "Atacar la infraestructura del sitio (scraping abusivo, DDoS, explotación de vulnerabilidades sin divulgación responsable)",
            ],
            ["Usar contenido del sitio para entrenar modelos de IA comerciales sin permiso"],
          ],
        },
      ],
    },
    {
      title: "4. Sin garantías",
      blocks: [
        {
          paragraph: [
            "Los scripts se proporcionan ",
            { strong: "“TAL CUAL”" },
            ", sin garantía de ningún tipo. No nos hacemos responsables de pérdidas, daños o problemas en tu servidor derivados de su uso. Eres responsable de probar y validar todo antes de ponerlo en producción.",
          ],
        },
      ],
    },
    {
      title: "5. Comunidad (Discord)",
      blocks: [
        {
          paragraph: [
            "El servidor de Discord de MRI Qbox Brasil tiene sus propias reglas, publicadas internamente. El comportamiento abusivo, el spam o la difusión de cheats o de material protegido por derechos de autor resulta en baneo, sin previo aviso cuando sea necesario.",
          ],
        },
      ],
    },
    {
      title: "6. Anuncios",
      blocks: [
        {
          paragraph: [
            "Este sitio muestra anuncios a través de Google AdSense, con tu consentimiento. No respaldamos los productos o servicios anunciados. Los conflictos con anunciantes deben resolverse directamente con ellos o a través de Google.",
          ],
        },
      ],
    },
    {
      title: "7. Cambios en estos términos",
      blocks: [
        {
          paragraph: [
            "Podemos actualizar estos términos. Los cambios significativos se anuncian en Discord. Seguir usando el sitio después de una actualización constituye aceptación.",
          ],
        },
      ],
    },
    {
      title: "8. Ley aplicable",
      blocks: [
        {
          paragraph: [
            "Estos términos se rigen por las leyes de la República Federativa de Brasil. Para cualquier disputa que no se resuelva de forma amistosa, el fuero competente es el de São Paulo/SP.",
          ],
        },
      ],
    },
    {
      title: "9. Contacto",
      blocks: [
        { paragraph: ["Dudas sobre estos términos: ", { href: DISCORD_URL, text: "discord.mriqbox.com.br" }, "."] },
      ],
    },
  ],
}
