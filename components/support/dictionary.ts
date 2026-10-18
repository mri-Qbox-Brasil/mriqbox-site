import type { Locale } from "@/lib/i18n"

// Prices mirror the MRI BOT plans and Patreon; update here when they change there.
export const PATREON_URL = "https://www.patreon.com/mriQboxBrasil/membership"

// Plan checkout page in MRI BOT: subscription plus one-time Pix and card payments.
const planUrl = (planId: string, pkg?: string) =>
  `https://shop.mriqbox.com.br/sub/${planId}${pkg ? `?package=${pkg}` : ""}`
export const PLAN_URLS = {
  monthly: planUrl("3ed1efb1-626f-4b73-a5b8-f02bd02468a9"),
  // Semiannual is the one-time 6-month package of the monthly plan.
  semiannual: planUrl("3ed1efb1-626f-4b73-a5b8-f02bd02468a9", "6"),
  // Yearly preselects the one-time 12-month package (Pix or card installments).
  yearly: planUrl("410fa86e-13f9-4b2d-8235-d100674312fc", "12"),
}

const ptBR = {
  meta: {
    title: "Nos apoie | MRI Qbox Brasil",
    description:
      "Apoie a MRI Qbox Brasil pelo Mercado Pago, em reais, ou pelo Patreon. O apoio mensal mantém a base FiveM gratuita e open source.",
    ogDescription: "Apoio mensal em reais pelo Mercado Pago ou pelo Patreon.",
  },
  back: "Voltar",
  home: "Início",
  eyebrow: "Nos apoie",
  title: "Ajude a manter a MRI Qbox gratuita",
  intro: {
    before: "A base, a documentação e o suporte são e continuam sendo ",
    strong: "100% gratuitos e open source",
    after: ". O apoio mensal de quem pode contribuir é o que mantém o projeto andando. Escolha a forma que for melhor pra você.",
  },
  plans: {
    title: "Escolha seu plano",
    subtitle: "Em reais pelo Mercado Pago, sem dólar e sem IOF. Pode cancelar quando quiser.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Cartão de crédito" },
    monthly: { label: "Mensal", price: "R$ 50", period: "por mês, como assinatura ou no Pix", cta: "Apoiar mensal" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, no Pix ou parcelado no cartão", cta: "Apoiar semestral" },
    yearly: { label: "Anual", price: "R$ 600", period: "por ano, no Pix, parcelado no cartão ou como assinatura", cta: "Apoiar anual" },
  },
  patreon: {
    title: "Fora do Brasil?",
    text: "Apoie pelo Patreon, em dólar:",
    price: "US$ 10/mês",
    cta: "Apoiar pelo Patreon",
  },
  benefits: {
    title: "O que você recebe",
    subtitle: "Os mesmos em qualquer plano, aqui ou no Patreon.",
    groups: [
      {
        title: "Na comunidade",
        items: [
          "Cargo de Apoiador no Discord",
          "Chat exclusivo com a Equipe MRI para bate-papo e dúvidas rápidas",
          "Suporte com prioridade",
          "Voto em enquetes exclusivas",
          "Chat de sugestões e de report de bugs da base",
        ],
      },
      {
        title: "No Instalador Oficial",
        items: [
          "Scripts de acesso antecipado, instalados direto no seu servidor",
          "Receita Beta antes de todo mundo",
          "Aba de banco de dados: conexão e backups automáticos",
          "Edição da identidade do servidor: logo, banners e server.cfg",
        ],
      },
    ],
  },
  supporters: {
    title: "Quem já apoia",
    countOne: "1 pessoa mantém o projeto vivo. Obrigado!",
    countMany: (n: number) => `${n} pessoas mantêm o projeto vivo. Obrigado!`,
    note: "Apoiadores aparecem aqui pelo nome e avatar do Discord.",
  },
  other: {
    title: "Outras formas de ajudar",
    subtitle: "Não dá pra contribuir com dinheiro agora? Tudo bem, isso também ajuda muito:",
    star: { title: "Dê uma estrela", text: "Nos repositórios do GitHub." },
    contribute: { title: "Contribua", text: "Com código, issues ou documentação." },
    discord: { title: "Ajude no Discord", text: "Tirando dúvidas de quem está começando." },
  },
}

export type SupportDictionary = typeof ptBR

const en: SupportDictionary = {
  meta: {
    title: "Support us | MRI Qbox Brasil",
    description:
      "Support MRI Qbox Brasil on Patreon or, from Brazil, through Mercado Pago. Monthly support keeps the FiveM framework free and open source.",
    ogDescription: "Monthly support on Patreon, or in BRL through Mercado Pago.",
  },
  back: "Back",
  home: "Home",
  eyebrow: "Support us",
  title: "Help keep MRI Qbox free",
  intro: {
    before: "The framework, the docs and the support are and will stay ",
    strong: "100% free and open source",
    after: ". Monthly support from those who can contribute is what keeps the project going. Pick whatever works best for you.",
  },
  plans: {
    title: "Paying from Brazil?",
    subtitle: "In BRL through Mercado Pago, no currency conversion. Cancel anytime.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Credit card" },
    monthly: { label: "Monthly", price: "R$ 50", period: "per month, as a subscription or with Pix", cta: "Support monthly" },
    semiannual: { label: "6 months", price: "R$ 300", period: "for 6 months, with Pix or card installments", cta: "Support for 6 months" },
    yearly: { label: "Yearly", price: "R$ 600", period: "per year, with Pix, card installments or as a subscription", cta: "Support yearly" },
  },
  patreon: {
    title: "Support us on Patreon",
    text: "Monthly membership, charged in US dollars:",
    price: "US$ 10/month",
    cta: "Join on Patreon",
  },
  benefits: {
    title: "What you get",
    subtitle: "The same on every plan, on Patreon or Mercado Pago.",
    groups: [
      {
        title: "In the community",
        items: [
          "Supporter role on Discord",
          "Private chat with the MRI team for quick questions",
          "Priority support",
          "Vote on exclusive polls",
          "Suggestion and bug report channels for the framework",
        ],
      },
      {
        title: "In the Official Installer",
        items: [
          "Early-access scripts, installed straight to your server",
          "Beta recipe before everyone else",
          "Database tab: connection and automatic backups",
          "Edit your server identity: logo, banners and server.cfg",
        ],
      },
    ],
  },
  supporters: {
    title: "Our supporters",
    countOne: "1 person keeps the project alive. Thank you!",
    countMany: (n: number) => `${n} people keep the project alive. Thank you!`,
    note: "Supporters show up here with their Discord name and avatar.",
  },
  other: {
    title: "Other ways to help",
    subtitle: "Can't contribute money right now? No problem, this helps a lot too:",
    star: { title: "Give us a star", text: "On our GitHub repositories." },
    contribute: { title: "Contribute", text: "With code, issues or docs." },
    discord: { title: "Help on Discord", text: "Answering questions from newcomers." },
  },
}

const ptPT: SupportDictionary = {
  meta: {
    title: "Apoie-nos | MRI Qbox Brasil",
    description:
      "Apoie a MRI Qbox Brasil pelo Patreon ou, a partir do Brasil, pelo Mercado Pago. O apoio mensal mantém a base FiveM gratuita e open source.",
    ogDescription: "Apoio mensal pelo Patreon, ou em reais pelo Mercado Pago.",
  },
  back: "Voltar",
  home: "Início",
  eyebrow: "Apoie-nos",
  title: "Ajude a manter a MRI Qbox gratuita",
  intro: {
    before: "A base, a documentação e o suporte são e vão continuar a ser ",
    strong: "100% gratuitos e open source",
    after: ". O apoio mensal de quem pode contribuir é o que mantém o projeto a andar. Escolha a forma que lhe for mais conveniente.",
  },
  plans: {
    title: "Paga a partir do Brasil?",
    subtitle: "Em reais pelo Mercado Pago, sem conversão de moeda. Pode cancelar quando quiser.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Cartão de crédito" },
    monthly: { label: "Mensal", price: "R$ 50", period: "por mês, como subscrição ou por Pix", cta: "Apoiar mensalmente" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, por Pix ou em prestações no cartão", cta: "Apoiar semestralmente" },
    yearly: { label: "Anual", price: "R$ 600", period: "por ano, por Pix, em prestações no cartão ou como subscrição", cta: "Apoiar anualmente" },
  },
  patreon: {
    title: "Apoie-nos no Patreon",
    text: "Subscrição mensal, cobrada em dólares:",
    price: "US$ 10/mês",
    cta: "Aderir no Patreon",
  },
  benefits: {
    title: "O que recebe",
    subtitle: "Os mesmos em qualquer plano, no Patreon ou no Mercado Pago.",
    groups: [
      {
        title: "Na comunidade",
        items: [
          "Cargo de Apoiador no Discord",
          "Chat exclusivo com a Equipa MRI para conversa e dúvidas rápidas",
          "Suporte prioritário",
          "Voto em sondagens exclusivas",
          "Canais de sugestões e de reporte de bugs da base",
        ],
      },
      {
        title: "No Instalador Oficial",
        items: [
          "Scripts de acesso antecipado, instalados diretamente no seu servidor",
          "Receita Beta antes de toda a gente",
          "Separador de base de dados: ligação e cópias de segurança automáticas",
          "Edição da identidade do servidor: logótipo, banners e server.cfg",
        ],
      },
    ],
  },
  supporters: {
    title: "Quem já apoia",
    countOne: "1 pessoa mantém o projeto vivo. Obrigado!",
    countMany: (n: number) => `${n} pessoas mantêm o projeto vivo. Obrigado!`,
    note: "Os apoiantes aparecem aqui com o nome e o avatar do Discord.",
  },
  other: {
    title: "Outras formas de ajudar",
    subtitle: "Não dá para contribuir com dinheiro agora? Não faz mal, isto também ajuda muito:",
    star: { title: "Dê uma estrela", text: "Nos repositórios do GitHub." },
    contribute: { title: "Contribua", text: "Com código, issues ou documentação." },
    discord: { title: "Ajude no Discord", text: "A tirar dúvidas de quem está a começar." },
  },
}

const es: SupportDictionary = {
  meta: {
    title: "Apóyanos | MRI Qbox Brasil",
    description:
      "Apoya a MRI Qbox Brasil en Patreon o, desde Brasil, con Mercado Pago. El apoyo mensual mantiene la base FiveM gratuita y open source.",
    ogDescription: "Apoyo mensual en Patreon, o en reales con Mercado Pago.",
  },
  back: "Volver",
  home: "Inicio",
  eyebrow: "Apóyanos",
  title: "Ayuda a mantener MRI Qbox gratis",
  intro: {
    before: "La base, la documentación y el soporte son y seguirán siendo ",
    strong: "100% gratuitos y open source",
    after: ". El apoyo mensual de quienes pueden contribuir es lo que mantiene el proyecto en marcha. Elige la forma que mejor te funcione.",
  },
  plans: {
    title: "¿Pagas desde Brasil?",
    subtitle: "En reales con Mercado Pago, sin conversión de moneda. Cancela cuando quieras.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Tarjeta de crédito" },
    monthly: { label: "Mensual", price: "R$ 50", period: "al mes, como suscripción o con Pix", cta: "Apoyar mensual" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, con Pix o en cuotas con tarjeta", cta: "Apoyar semestral" },
    yearly: { label: "Anual", price: "R$ 600", period: "al año, con Pix, en cuotas con tarjeta o como suscripción", cta: "Apoyar anual" },
  },
  patreon: {
    title: "Apóyanos en Patreon",
    text: "Membresía mensual, cobrada en dólares:",
    price: "US$ 10/mes",
    cta: "Unirme en Patreon",
  },
  benefits: {
    title: "Lo que recibes",
    subtitle: "Los mismos en cualquier plan, en Patreon o en Mercado Pago.",
    groups: [
      {
        title: "En la comunidad",
        items: [
          "Rol de Apoyador en Discord",
          "Chat privado con el equipo MRI para charlar y resolver dudas rápidas",
          "Soporte prioritario",
          "Voto en encuestas exclusivas",
          "Canales de sugerencias y reporte de bugs de la base",
        ],
      },
      {
        title: "En el Instalador Oficial",
        items: [
          "Scripts de acceso anticipado, instalados directo en tu servidor",
          "Receta Beta antes que nadie",
          "Pestaña de base de datos: conexión y copias de seguridad automáticas",
          "Edición de la identidad del servidor: logo, banners y server.cfg",
        ],
      },
    ],
  },
  supporters: {
    title: "Quienes ya apoyan",
    countOne: "1 persona mantiene vivo el proyecto. ¡Gracias!",
    countMany: (n: number) => `${n} personas mantienen vivo el proyecto. ¡Gracias!`,
    note: "Los apoyadores aparecen aquí con su nombre y avatar de Discord.",
  },
  other: {
    title: "Otras formas de ayudar",
    subtitle: "¿No puedes aportar dinero ahora? No pasa nada, esto también ayuda mucho:",
    star: { title: "Danos una estrella", text: "En nuestros repositorios de GitHub." },
    contribute: { title: "Contribuye", text: "Con código, issues o documentación." },
    discord: { title: "Ayuda en Discord", text: "Respondiendo dudas de quienes empiezan." },
  },
}

export const supportDictionary: Record<Locale, SupportDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
