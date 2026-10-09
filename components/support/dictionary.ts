import type { Locale } from "@/lib/i18n"

// Prices mirror the MRI BOT plans and Patreon; update here when they change there.
export const PATREON_URL = "https://www.patreon.com/mriQboxBrasil/membership"

// Plan checkout page in MRI BOT: subscription plus one-time Pix and card payments.
const planUrl = (planId: string, pkg?: string) =>
  `https://shop.mriqbox.com.br/sub/${planId}${pkg ? `?package=${pkg}` : ""}`
export const PLAN_URLS = {
  monthly: planUrl("3ed1efb1-626f-4b73-a5b8-f02bd02468a9"),
  // Yearly preselects the one-time 12-month package (Pix or card installments).
  yearly: planUrl("410fa86e-13f9-4b2d-8235-d100674312fc", "12"),
}

export const SUPPORT_PATHS: Record<Locale, string> = {
  "pt-BR": "/apoie",
  en: "/en/support",
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
    yearly: { label: "Anual", price: "R$ 500", period: "por ano, no Pix, parcelado no cartão ou como assinatura", cta: "Apoiar anual" },
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
    yearly: { label: "Yearly", price: "R$ 500", period: "per year, with Pix, card installments or as a subscription", cta: "Support yearly" },
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

export const supportDictionary: Record<Locale, SupportDictionary> = { "pt-BR": ptBR, en }
