import type { Locale } from "@/lib/i18n"

export const FIVEMETRICS_URL = "https://5metrics.dev"

const ptBR = {
  meta: {
    title: "Servidores que usam a MRI Qbox | FiveM",
    description:
      "Servidores FiveM que usam scripts da MRI Qbox Brasil, com jogadores conectados agora e os recursos MRI de cada um.",
    ogTitle: "Servidores que usam a MRI Qbox",
    ogDescription: "Servidores FiveM rodando scripts da MRI Qbox Brasil agora.",
  },
  back: "Voltar",
  home: "Início",
  eyebrow: "Servidores",
  title: "Servidores que usam a MRI Qbox",
  // Rendered as: <strong>{servers} {serversUnit}</strong>{middle}<strong>{players} {playersUnit}</strong>{after}
  intro: {
    serversUnit: "servidores",
    middle: " usam algum script da MRI Qbox, com ",
    playersUnit: "jogadores",
    after: " conectados agora. Cada servidor entra uma vez, mesmo usando vários scripts.",
  },
  source: {
    before: "Dados do ",
    after: ", atualizados a cada 3 horas. Última atualização: ",
    end: ".",
  },
  thanks: {
    title: "Obrigado por manterem os créditos",
    text: "Cada cidade desta lista usa os scripts da MRI Qbox com o nome original, mantendo os créditos de quem desenvolveu. É isso que nos permite mostrar o alcance do projeto e continuar oferecendo tudo de graça e open source. Valeu demais!",
  },
  online: "Com jogadores agora",
  offline: "Sem jogadores no momento",
  card: {
    players: "jogadores",
    noPlayers: "sem jogadores agora",
    join: "Entrar no servidor",
  },
  // {count} is replaced with the number of servers.
  avatarsLabel: "Ver os {count} servidores que usam MRI",
}

export type ServersDictionary = typeof ptBR

const ptPT: ServersDictionary = {
  meta: {
    title: "Servidores que utilizam a MRI Qbox | FiveM",
    description:
      "Servidores FiveM que utilizam scripts da MRI Qbox Brasil, com os jogadores ligados neste momento e os recursos MRI de cada um.",
    ogTitle: "Servidores que utilizam a MRI Qbox",
    ogDescription: "Servidores FiveM a correr scripts da MRI Qbox Brasil neste momento.",
  },
  back: "Voltar",
  home: "Início",
  eyebrow: "Servidores",
  title: "Servidores que utilizam a MRI Qbox",
  intro: {
    serversUnit: "servidores",
    middle: " utilizam algum script da MRI Qbox, com ",
    playersUnit: "jogadores",
    after: " ligados neste momento. Cada servidor conta uma só vez, mesmo que utilize vários scripts.",
  },
  source: {
    before: "Dados do ",
    after: ", atualizados a cada 3 horas. Última atualização: ",
    end: ".",
  },
  thanks: {
    title: "Obrigado por manterem os créditos",
    text: "Cada cidade desta lista utiliza os scripts da MRI Qbox com o nome original, mantendo os créditos de quem os desenvolveu. É isso que nos permite mostrar o alcance do projeto e continuar a oferecer tudo de forma gratuita e open source. Muito obrigado!",
  },
  online: "Com jogadores neste momento",
  offline: "Sem jogadores de momento",
  card: {
    players: "jogadores",
    noPlayers: "sem jogadores neste momento",
    join: "Entrar no servidor",
  },
  avatarsLabel: "Ver os {count} servidores que utilizam a MRI",
}

const es: ServersDictionary = {
  meta: {
    title: "Servidores que usan MRI Qbox | FiveM",
    description:
      "Servidores FiveM que usan scripts de MRI Qbox Brasil, con los jugadores conectados ahora y los recursos MRI de cada uno.",
    ogTitle: "Servidores que usan MRI Qbox",
    ogDescription: "Servidores FiveM que ejecutan scripts de MRI Qbox Brasil ahora mismo.",
  },
  back: "Volver",
  home: "Inicio",
  eyebrow: "Servidores",
  title: "Servidores que usan MRI Qbox",
  intro: {
    serversUnit: "servidores",
    middle: " usan algún script de MRI Qbox, con ",
    playersUnit: "jugadores",
    after: " conectados ahora. Cada servidor cuenta una sola vez, aunque use varios scripts.",
  },
  source: {
    before: "Datos de ",
    after: ", actualizados cada 3 horas. Última actualización: ",
    end: ".",
  },
  thanks: {
    title: "Gracias por mantener los créditos",
    text: "Cada ciudad de esta lista usa los scripts de MRI Qbox con su nombre original y mantiene los créditos de quienes los desarrollaron. Eso es lo que nos permite mostrar el alcance del proyecto y seguir ofreciendo todo gratis y open source. ¡Muchas gracias!",
  },
  online: "Con jugadores ahora",
  offline: "Sin jugadores en este momento",
  card: {
    players: "jugadores",
    noPlayers: "sin jugadores ahora",
    join: "Entrar al servidor",
  },
  avatarsLabel: "Ver los {count} servidores que usan MRI",
}

const en: ServersDictionary = {
  meta: {
    title: "Servers using MRI Qbox | FiveM",
    description:
      "FiveM servers running MRI Qbox Brasil scripts, with the players connected right now and the MRI resources each one uses.",
    ogTitle: "Servers using MRI Qbox",
    ogDescription: "FiveM servers running MRI Qbox Brasil scripts right now.",
  },
  back: "Back",
  home: "Home",
  eyebrow: "Servers",
  title: "Servers using MRI Qbox",
  intro: {
    serversUnit: "servers",
    middle: " run at least one MRI Qbox script, with ",
    playersUnit: "players",
    after: " connected right now. Each server is counted once, even if it runs several scripts.",
  },
  source: {
    before: "Data from ",
    after: ", updated every 3 hours. Last updated: ",
    end: ".",
  },
  thanks: {
    title: "Thanks for keeping the credits",
    text: "Every city on this list runs MRI Qbox scripts under their original names, keeping the credits of the people who built them. That is what lets us show how far the project reaches and keep offering everything free and open source. Thank you so much!",
  },
  online: "With players now",
  offline: "No players right now",
  card: {
    players: "players",
    noPlayers: "no players right now",
    join: "Join server",
  },
  avatarsLabel: "See the {count} servers using MRI",
}

export const serversDictionary: Record<Locale, ServersDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }

// Brazilian visitors see São Paulo time as before; other locales get UTC with the zone shown.
export function formatUpdatedAt(iso: string, locale: Locale): string {
  const brazil = locale === "pt-BR"
  return new Date(iso).toLocaleString(locale, {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: brazil ? "America/Sao_Paulo" : "UTC",
    timeZoneName: brazil ? undefined : "short",
  })
}
