import type { PrivacyDictionary } from "./pt-BR"

export const ptPT: PrivacyDictionary = {
  meta: {
    title: "Política de Privacidade | MRI Qbox Brasil",
    description:
      "Como tratamos os seus dados pessoais, cookies, métricas e anúncios no site mriqbox.com.br e respetivos subdomínios. Política completa em conformidade com a LGPD.",
  },
  back: "Voltar",
  home: "Início",
  crumb: "Privacidade",
  heading: "Política de Privacidade",
  updated: "Última atualização",
  intro: [
    "A MRI Qbox Brasil (“nós”, “nosso”, “MRI”) gere o site ",
    { code: "mriqbox.com.br" },
    " e os subdomínios ",
    { code: "docs.mriqbox.com.br" },
    ", ",
    { code: "assets.mriqbox.com.br" },
    " e ",
    { code: "discord.mriqbox.com.br" },
    ". Esta política descreve que dados recolhemos, por que razão os recolhemos e como os pode controlar.",
  ],
  sections: [
    {
      title: "Que dados recolhemos",
      blocks: [
        { paragraph: ["Não exigimos registo nem início de sessão. Os dados que recebemos provêm de três fontes:"] },
        {
          list: [
            [
              { strong: "Métricas anónimas" },
              " através do Vercel Analytics, Vercel Speed Insights e Cloudflare Web Analytics: páginas visitadas, desempenho e país aproximado. Sem cookies, sem dados pessoais identificáveis.",
            ],
            [
              { strong: "Anúncios do Google AdSense" },
              ": quando aceita o aviso de consentimento, o script do AdSense é carregado e a Google pode utilizar cookies para personalizar anúncios. Mais informações na ",
              { href: "https://policies.google.com/technologies/ads", text: "política de anúncios da Google" },
              ".",
            ],
            [
              { strong: "Registos do servidor" },
              ": a Vercel regista o IP, o user agent e o timestamp por motivos de segurança e depuração (eliminados ao fim de ~30 dias).",
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
            "Utilizamos um único cookie próprio: ",
            { code: "mriqbox-consent" },
            " (guardado em ",
            { code: "localStorage", plain: true },
            "), que regista a sua escolha no aviso de consentimento. Os restantes cookies (métricas, anúncios) só são definidos se os aceitar.",
          ],
        },
        {
          paragraph: [
            "Pode retirar o consentimento a qualquer momento, apagando o ",
            { code: "localStorage" },
            " do site nas definições do navegador.",
          ],
        },
      ],
    },
    {
      title: "Fundamento jurídico (LGPD)",
      blocks: [
        {
          paragraph: [
            "Para utilizadores no Brasil, o tratamento de dados pessoais baseia-se no ",
            { strong: "consentimento" },
            " (art. 7.º, I, da Lei 13.709/2018) para os cookies de anúncios e de métricas, e no ",
            { strong: "interesse legítimo" },
            " (art. 7.º, IX) para os registos técnicos de segurança.",
          ],
        },
      ],
    },
    {
      title: "Partilha de dados",
      blocks: [
        {
          paragraph: [
            "Não vendemos dados. Os serviços de terceiros que tratam métricas/anúncios em nosso nome são:",
          ],
        },
        {
          list: [
            [{ strong: "Vercel Inc." }, ": alojamento, métricas, speed insights"],
            [{ strong: "Google LLC" }, ": AdSense (anúncios, mediante o seu consentimento)"],
          ],
        },
      ],
    },
    {
      title: "Direitos do titular",
      blocks: [
        { paragraph: ["Enquanto titular dos dados, pode, a qualquer momento, exigir:"] },
        {
          list: [
            ["A confirmação de que tratamos dados seus"],
            ["O acesso aos dados"],
            ["A retificação de dados incompletos/desatualizados"],
            ["A anonimização, o bloqueio ou a eliminação"],
            ["A retirada do consentimento"],
          ],
        },
        {
          paragraph: [
            "Faça o pedido através do Discord oficial: ",
            { href: "https://discord.mriqbox.com.br", text: "discord.mriqbox.com.br" },
            ".",
          ],
        },
      ],
    },
    {
      title: "Crianças",
      blocks: [
        {
          paragraph: [
            "O nosso conteúdo é técnico (desenvolvimento de servidores FiveM) e não se destina a menores de 13 anos. Não recolhemos intencionalmente dados de crianças.",
          ],
        },
      ],
    },
    {
      title: "Alterações",
      blocks: [
        {
          paragraph: [
            "As atualizações desta política são publicadas nesta página, com a nova data no topo. As alterações relevantes são anunciadas no Discord da comunidade.",
          ],
        },
      ],
    },
  ],
}
