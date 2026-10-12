import type { Locale } from "@/lib/i18n"

export const DISCORD_URL = "https://discord.mriqbox.com.br"
export const GITHUB_ORG_URL = "https://github.com/mri-Qbox-Brasil"
export const DISCORD_WIDGET_URL = "https://discord.com/widget?id=1210457748073091072&theme=dark"

const ptBR = {
  meta: {
    title: "Discord MRI Qbox Brasil | Suporte e comunidade FiveM",
    description:
      "Entre no Discord oficial da MRI Qbox Brasil para receber suporte, tirar dúvidas e participar da comunidade brasileira de desenvolvimento FiveM.",
    ogTitle: "Discord MRI Qbox Brasil",
    ogDescription: "Suporte, desenvolvimento e comunidade FiveM brasileira em um só lugar.",
    twitterDescription: "Entre na comunidade brasileira da MRI Qbox e receba suporte para seu servidor FiveM.",
  },
  badge: "24/7 SUPPORT",
  title: { first: "Precisa de ajuda?", highlight: "Nós te ajudamos." },
  intro:
    "A forma mais rápida de resolver seu problema é entrando na nossa comunidade do Discord e abrindo um ticket de suporte. Nossa equipe está sempre pronta para ajudar!",
  join: "Entrar no Discord",
  github: "Ver no GitHub",
  steps: [
    { title: "Entre no servidor", text: "Use o botão acima para entrar no nosso servidor oficial do Discord." },
    { title: "Abra um ticket", text: "Vá para o canal de suporte, abra um ticket e te ajudaremos." },
  ],
  goToChannel: "IR PARA O CANAL",
  liveStatus: "LIVE STATUS",
}

export type DiscordDictionary = typeof ptBR

const ptPT: DiscordDictionary = {
  meta: {
    title: "Discord MRI Qbox Brasil | Suporte e comunidade FiveM",
    description:
      "Junte-se ao Discord oficial da MRI Qbox Brasil para obter suporte, esclarecer dúvidas e fazer parte da comunidade brasileira de desenvolvimento FiveM.",
    ogTitle: "Discord MRI Qbox Brasil",
    ogDescription: "Suporte, desenvolvimento e a comunidade FiveM brasileira num só lugar.",
    twitterDescription: "Junte-se à comunidade brasileira da MRI Qbox e obtenha suporte para o seu servidor FiveM.",
  },
  badge: "SUPORTE 24/7",
  title: { first: "Precisa de ajuda?", highlight: "Nós ajudamos." },
  intro:
    "A forma mais rápida de resolver o seu problema é entrar na nossa comunidade do Discord e abrir um ticket de suporte. A nossa equipa está sempre pronta para ajudar!",
  join: "Entrar no Discord",
  github: "Ver no GitHub",
  steps: [
    { title: "Entre no servidor", text: "Utilize o botão acima para entrar no nosso servidor oficial do Discord." },
    { title: "Abra um ticket", text: "Vá ao canal de suporte, abra um ticket e nós ajudamos." },
  ],
  goToChannel: "IR PARA O CANAL",
  liveStatus: "ESTADO EM DIRETO",
}

const es: DiscordDictionary = {
  meta: {
    title: "Discord MRI Qbox Brasil | Soporte y comunidad FiveM",
    description:
      "Únete al Discord oficial de MRI Qbox Brasil para recibir soporte, resolver tus dudas y formar parte de la comunidad brasileña de desarrollo FiveM.",
    ogTitle: "Discord MRI Qbox Brasil",
    ogDescription: "Soporte, desarrollo y la comunidad FiveM brasileña en un solo lugar.",
    twitterDescription: "Únete a la comunidad brasileña de MRI Qbox y recibe soporte para tu servidor FiveM.",
  },
  badge: "SOPORTE 24/7",
  title: { first: "¿Necesitas ayuda?", highlight: "Te ayudamos." },
  intro:
    "La forma más rápida de resolver tu problema es unirte a nuestra comunidad de Discord y abrir un ticket de soporte. ¡Nuestro equipo siempre está listo para ayudarte!",
  join: "Unirme al Discord",
  github: "Ver en GitHub",
  steps: [
    { title: "Únete al servidor", text: "Usa el botón de arriba para entrar a nuestro servidor oficial de Discord." },
    { title: "Abre un ticket", text: "Ve al canal de soporte, abre un ticket y te ayudamos." },
  ],
  goToChannel: "IR AL CANAL",
  liveStatus: "ESTADO EN VIVO",
}

const en: DiscordDictionary = {
  meta: {
    title: "MRI Qbox Brasil Discord | FiveM support and community",
    description:
      "Join the official MRI Qbox Brasil Discord to get support, ask questions and be part of the Brazilian FiveM development community.",
    ogTitle: "MRI Qbox Brasil Discord",
    ogDescription: "Support, development and the Brazilian FiveM community in one place.",
    twitterDescription: "Join the Brazilian MRI Qbox community and get support for your FiveM server.",
  },
  badge: "24/7 SUPPORT",
  title: { first: "Need help?", highlight: "We've got you." },
  intro:
    "The fastest way to solve your problem is to join our Discord community and open a support ticket. Our team is always ready to help!",
  join: "Join the Discord",
  github: "View on GitHub",
  steps: [
    { title: "Join the server", text: "Use the button above to join our official Discord server." },
    { title: "Open a ticket", text: "Head to the support channel, open a ticket and we'll help you out." },
  ],
  goToChannel: "GO TO THE CHANNEL",
  liveStatus: "LIVE STATUS",
}

export const discordDictionary: Record<Locale, DiscordDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
