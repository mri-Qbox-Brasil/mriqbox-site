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
    title: "Faça uma doação",
    subtitle: "Em reais pelo Mercado Pago, sem dólar e sem IOF. A doação mensal pode ser cancelada quando quiser.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Cartão de crédito" },
    donation:
      "O apoio é uma doação voluntária: a base continua gratuita pra todos, doando ou não. Doações não são reembolsáveis, exceto cobrança em duplicidade ou fraude.",
    monthly: { label: "Mensal", price: "R$ 50", period: "por mês, com renovação automática ou no Pix", cta: "Doar todo mês" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, no Pix ou parcelado no cartão", cta: "Doar por 6 meses" },
    yearly: { label: "Anual", price: "R$ 600", period: "por ano, no Pix, parcelado no cartão ou com renovação automática", cta: "Doar por 1 ano" },
  },
  patreon: {
    title: "Fora do Brasil?",
    text: "Apoie pelo Patreon, em dólar:",
    price: "US$ 10/mês",
    cta: "Apoiar pelo Patreon",
  },
  benefits: {
    title: "Como agradecimento",
    subtitle: "Os mesmos em todas as opções, aqui ou no Patreon. São um obrigado pelo apoio, não um serviço contratado. Esta lista pode mudar a qualquer momento.",
    groups: [
      {
        title: "Na comunidade",
        items: [
          "Cargo de Doador no Discord",
          "Chat exclusivo com a Equipe MRI para bate-papo e dúvidas rápidas",
          "Prioridade nas respostas da equipe, quando possível",
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
  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Preciso apoiar para usar a MRI?", a: "Não. Instalar um servidor completo, usar as receitas públicas e a base inteira, abrir o painel com console e pedir ajuda à comunidade é de graça, sem limite de tempo e sem conta paga." },
      { q: "Se eu parar de apoiar, meu servidor para?", a: "Não. Os arquivos do servidor ficam com você e continuam funcionando. Só as ferramentas extras do instalador deixam de aparecer." },
      { q: "Os scripts da base têm trava ou escrow?", a: "Não. Nenhum script da base é autenticado ou criptografado. O código é aberto e fica no seu servidor." },
      { q: "Como o cargo chega até mim?", a: "É automático. O cargo chega assim que a doação é confirmada, e o instalador libera na hora o que o cargo dá acesso naquele momento." },
    ],
  },
  supporters: {
    title: "Quem já apoia",
    countOne: "1 pessoa mantém o projeto vivo. Obrigado!",
    countMany: (n: number) => `${n} pessoas mantêm o projeto vivo. Obrigado!`,
    note: "Doadores aparecem aqui pelo nome e avatar do Discord.",
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
    title: "Donating from Brazil?",
    subtitle: "In BRL through Mercado Pago, no currency conversion. Monthly donations can be cancelled anytime.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Credit card" },
    donation:
      "Support is a voluntary donation: the base stays free for everyone, donor or not. Donations are non-refundable, except for duplicate charges or fraud.",
    monthly: { label: "Monthly", price: "R$ 50", period: "per month, auto-renewing or with Pix", cta: "Donate monthly" },
    semiannual: { label: "6 months", price: "R$ 300", period: "for 6 months, with Pix or card installments", cta: "Donate for 6 months" },
    yearly: { label: "Yearly", price: "R$ 600", period: "per year, with Pix, card installments or auto-renewing", cta: "Donate for 1 year" },
  },
  patreon: {
    title: "Support us on Patreon",
    text: "Monthly membership, charged in US dollars:",
    price: "US$ 10/month",
    cta: "Join on Patreon",
  },
  benefits: {
    title: "As a thank you",
    subtitle: "The same for every option, on Patreon or Mercado Pago. They are a thank you for your support, not a paid service. This list may change at any time.",
    groups: [
      {
        title: "In the community",
        items: [
          "Donor role on Discord",
          "Private chat with the MRI team for quick questions",
          "Priority in team replies, when possible",
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
  faq: {
    title: "Frequently asked questions",
    items: [
      { q: "Do I need to support to use MRI?", a: "No. Installing a full server, using the public recipes and the whole framework, opening the panel with its console and asking the community for help are free, with no time limit and no paid account." },
      { q: "If I stop supporting, does my server stop?", a: "No. The server files stay with you and keep working. Only the extra installer tools stop showing." },
      { q: "Do the framework scripts have locks or escrow?", a: "No. No framework script is authenticated or encrypted. The code is open and stays on your server." },
      { q: "How do I get the role?", a: "It is automatic. The role arrives as soon as the donation is confirmed, and the installer immediately unlocks whatever the role gives access to at that time." },
    ],
  },
  supporters: {
    title: "Our donors",
    countOne: "1 person keeps the project alive. Thank you!",
    countMany: (n: number) => `${n} people keep the project alive. Thank you!`,
    note: "Donors show up here with their Discord name and avatar.",
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
    title: "Doa a partir do Brasil?",
    subtitle: "Em reais pelo Mercado Pago, sem conversão de moeda. O donativo mensal pode ser cancelado quando quiser.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Cartão de crédito" },
    donation:
      "O apoio é um donativo voluntário: a base continua gratuita para todos, doando ou não. Os donativos não são reembolsáveis, exceto em caso de cobrança em duplicado ou fraude.",
    monthly: { label: "Mensal", price: "R$ 50", period: "por mês, com renovação automática ou por Pix", cta: "Doar todos os meses" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, por Pix ou em prestações no cartão", cta: "Doar por 6 meses" },
    yearly: { label: "Anual", price: "R$ 600", period: "por ano, por Pix, em prestações no cartão ou com renovação automática", cta: "Doar por 1 ano" },
  },
  patreon: {
    title: "Apoie-nos no Patreon",
    text: "Subscrição mensal, cobrada em dólares:",
    price: "US$ 10/mês",
    cta: "Aderir no Patreon",
  },
  benefits: {
    title: "Como agradecimento",
    subtitle: "Os mesmos em todas as opções, no Patreon ou no Mercado Pago. São um obrigado pelo apoio, não um serviço contratado. Esta lista pode mudar a qualquer momento.",
    groups: [
      {
        title: "Na comunidade",
        items: [
          "Cargo de Doador no Discord",
          "Chat exclusivo com a Equipa MRI para conversa e dúvidas rápidas",
          "Prioridade nas respostas da equipa, sempre que possível",
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
  faq: {
    title: "Perguntas frequentes",
    items: [
      { q: "Preciso de apoiar para usar a MRI?", a: "Não. Instalar um servidor completo, usar as receitas públicas e a base inteira, abrir o painel com consola e pedir ajuda à comunidade é gratuito, sem limite de tempo e sem conta paga." },
      { q: "Se deixar de apoiar, o meu servidor para?", a: "Não. Os ficheiros do servidor ficam consigo e continuam a funcionar. Só as ferramentas extra do instalador deixam de aparecer." },
      { q: "Os scripts da base têm bloqueio ou escrow?", a: "Não. Nenhum script da base é autenticado ou encriptado. O código é aberto e fica no seu servidor." },
      { q: "Como recebo o cargo?", a: "É automático. O cargo é atribuído assim que o donativo é confirmado, e o instalador desbloqueia de imediato aquilo a que o cargo dá acesso nesse momento." },
    ],
  },
  supporters: {
    title: "Quem já apoia",
    countOne: "1 pessoa mantém o projeto vivo. Obrigado!",
    countMany: (n: number) => `${n} pessoas mantêm o projeto vivo. Obrigado!`,
    note: "Os doadores aparecem aqui com o nome e o avatar do Discord.",
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
    title: "¿Donas desde Brasil?",
    subtitle: "En reales con Mercado Pago, sin conversión de moneda. La donación mensual se puede cancelar cuando quieras.",
    methods: { pix: "Pix", mercadoPago: "Mercado Pago", card: "Tarjeta de crédito" },
    donation:
      "El apoyo es una donación voluntaria: la base sigue siendo gratuita para todos, dones o no. Las donaciones no son reembolsables, salvo cobro duplicado o fraude.",
    monthly: { label: "Mensual", price: "R$ 50", period: "al mes, con renovación automática o con Pix", cta: "Donar cada mes" },
    semiannual: { label: "Semestral", price: "R$ 300", period: "por 6 meses, con Pix o en cuotas con tarjeta", cta: "Donar por 6 meses" },
    yearly: { label: "Anual", price: "R$ 600", period: "al año, con Pix, en cuotas con tarjeta o con renovación automática", cta: "Donar por 1 año" },
  },
  patreon: {
    title: "Apóyanos en Patreon",
    text: "Membresía mensual, cobrada en dólares:",
    price: "US$ 10/mes",
    cta: "Unirme en Patreon",
  },
  benefits: {
    title: "Como agradecimiento",
    subtitle: "Los mismos en todas las opciones, en Patreon o en Mercado Pago. Son un agradecimiento por tu apoyo, no un servicio contratado. Esta lista puede cambiar en cualquier momento.",
    groups: [
      {
        title: "En la comunidad",
        items: [
          "Rol de Donante en Discord",
          "Chat privado con el equipo MRI para charlar y resolver dudas rápidas",
          "Prioridad en las respuestas del equipo, cuando sea posible",
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
  faq: {
    title: "Preguntas frecuentes",
    items: [
      { q: "¿Necesito apoyar para usar MRI?", a: "No. Instalar un servidor completo, usar las recetas públicas y toda la base, abrir el panel con consola y pedir ayuda a la comunidad es gratis, sin límite de tiempo y sin cuenta de pago." },
      { q: "Si dejo de apoyar, ¿mi servidor se detiene?", a: "No. Los archivos del servidor se quedan contigo y siguen funcionando. Solo dejan de aparecer las herramientas extra del instalador." },
      { q: "¿Los scripts de la base tienen bloqueo o escrow?", a: "No. Ningún script de la base está autenticado ni cifrado. El código es abierto y queda en tu servidor." },
      { q: "¿Cómo recibo el rol?", a: "Es automático. El rol llega en cuanto se confirma la donación, y el instalador desbloquea al instante aquello a lo que el rol da acceso en ese momento." },
    ],
  },
  supporters: {
    title: "Quienes ya apoyan",
    countOne: "1 persona mantiene vivo el proyecto. ¡Gracias!",
    countMany: (n: number) => `${n} personas mantienen vivo el proyecto. ¡Gracias!`,
    note: "Los donantes aparecen aquí con su nombre y avatar de Discord.",
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
