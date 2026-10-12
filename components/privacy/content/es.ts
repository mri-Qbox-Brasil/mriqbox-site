import type { PrivacyDictionary } from "./pt-BR"

export const es: PrivacyDictionary = {
  meta: {
    title: "Política de privacidad | MRI Qbox Brasil",
    description:
      "Cómo tratamos tus datos, cookies, analítica y anuncios en el sitio mriqbox.com.br y sus subdominios. Política completa conforme a la LGPD.",
  },
  back: "Volver",
  home: "Inicio",
  crumb: "Privacidad",
  heading: "Política de privacidad",
  updated: "Última actualización",
  intro: [
    "MRI Qbox Brasil (“nosotros”, “nuestro”, “MRI”) opera el sitio ",
    { code: "mriqbox.com.br" },
    " y los subdominios ",
    { code: "docs.mriqbox.com.br" },
    ", ",
    { code: "assets.mriqbox.com.br" },
    " y ",
    { code: "discord.mriqbox.com.br" },
    ". Esta política describe qué datos recopilamos, por qué los recopilamos y cómo puedes controlarlo.",
  ],
  sections: [
    {
      title: "Qué datos recopilamos",
      blocks: [
        { paragraph: ["No exigimos registro ni inicio de sesión. Los datos que recibimos provienen de tres fuentes:"] },
        {
          list: [
            [
              { strong: "Métricas anónimas" },
              " mediante Vercel Analytics, Vercel Speed Insights y Cloudflare Web Analytics: páginas visitadas, rendimiento y país aproximado. Sin cookies, sin datos personales identificables.",
            ],
            [
              { strong: "Anuncios de Google AdSense" },
              ": cuando aceptas el banner de consentimiento, se carga el script de AdSense y Google puede usar cookies para personalizar anuncios. Más detalles en la ",
              { href: "https://policies.google.com/technologies/ads", text: "política de publicidad de Google" },
              ".",
            ],
            [
              { strong: "Registros del servidor" },
              ": Vercel registra la IP, el user agent y la marca de tiempo por motivos de seguridad y depuración (se descartan en ~30 días).",
            ],
          ],
        },
      ],
    },
    {
      title: "Cookies",
      blocks: [
        {
          paragraph: [
            "Usamos una única cookie propia: ",
            { code: "mriqbox-consent" },
            " (almacenada en ",
            { code: "localStorage", plain: true },
            "), que guarda tu elección en el banner de consentimiento. Las demás cookies (analítica, anuncios) solo se establecen si las aceptas.",
          ],
        },
        {
          paragraph: [
            "Puedes revocar el consentimiento en cualquier momento borrando el ",
            { code: "localStorage" },
            " del sitio desde la configuración del navegador.",
          ],
        },
      ],
    },
    {
      title: "Base legal (LGPD)",
      blocks: [
        {
          paragraph: [
            "Para usuarios en Brasil, el tratamiento de datos se basa en el ",
            { strong: "consentimiento" },
            " (art. 7, I de la Ley 13.709/2018) para las cookies de anuncios y métricas, y en el ",
            { strong: "interés legítimo" },
            " (art. 7, IX) para los registros técnicos de seguridad.",
          ],
        },
      ],
    },
    {
      title: "Compartición de datos",
      blocks: [
        {
          paragraph: [
            "No vendemos datos. Los servicios de terceros que procesan métricas/anuncios en nuestro nombre son:",
          ],
        },
        {
          list: [
            [{ strong: "Vercel Inc." }, ": alojamiento, analítica, speed insights"],
            [{ strong: "Google LLC" }, ": AdSense (anuncios, con tu consentimiento)"],
          ],
        },
      ],
    },
    {
      title: "Tus derechos",
      blocks: [
        { paragraph: ["En cualquier momento puedes exigir:"] },
        {
          list: [
            ["Confirmación de si tratamos tus datos"],
            ["Acceso a los datos"],
            ["Corrección de datos incompletos/desactualizados"],
            ["Anonimización, bloqueo o eliminación"],
            ["Revocación del consentimiento"],
          ],
        },
        {
          paragraph: [
            "Haz tu solicitud a través del Discord oficial: ",
            { href: "https://discord.mriqbox.com.br", text: "discord.mriqbox.com.br" },
            ".",
          ],
        },
      ],
    },
    {
      title: "Menores",
      blocks: [
        {
          paragraph: [
            "Nuestro contenido es técnico (desarrollo de servidores FiveM) y no está dirigido a menores de 13 años. No recopilamos intencionalmente datos de niños.",
          ],
        },
      ],
    },
    {
      title: "Cambios",
      blocks: [
        {
          paragraph: [
            "Las actualizaciones de esta política se publican en esta página con la nueva fecha en la parte superior. Los cambios importantes se anuncian en el Discord de la comunidad.",
          ],
        },
      ],
    },
  ],
}
