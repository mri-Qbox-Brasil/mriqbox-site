import type { LegalDictionary } from "@/components/legal/types"

export type PrivacyDictionary = LegalDictionary

export const ptBR: PrivacyDictionary = {
  meta: {
    title: "Política de Privacidade | MRI Qbox Brasil",
    description:
      "Como tratamos seus dados, cookies, analytics e anúncios no site mriqbox.com.br e subdomínios. Política completa em conformidade com LGPD.",
  },
  back: "Voltar",
  home: "Início",
  crumb: "Privacidade",
  heading: "Política de Privacidade",
  updated: "Última atualização",
  intro: [
    "A MRI Qbox Brasil (“nós”, “nosso”, “MRI”) opera o site ",
    { code: "mriqbox.com.br" },
    " e os subdomínios ",
    { code: "docs.mriqbox.com.br" },
    ", ",
    { code: "assets.mriqbox.com.br" },
    " e ",
    { code: "discord.mriqbox.com.br" },
    ". Esta política descreve quais dados coletamos, por que coletamos e como você pode controlar isso.",
  ],
  sections: [
    {
      title: "Quais dados coletamos",
      blocks: [
        { paragraph: ["Não exigimos cadastro nem login. Os dados que recebemos vêm de três fontes:"] },
        {
          list: [
            [
              { strong: "Métricas anônimas" },
              " via Vercel Analytics, Vercel Speed Insights e Cloudflare Web Analytics: páginas acessadas, performance e país aproximado. Sem cookies, sem dados pessoais identificáveis.",
            ],
            [
              { strong: "Anúncios do Google AdSense" },
              ": quando você aceita o banner de consentimento, o script do AdSense é carregado e o Google pode usar cookies para personalizar anúncios. Detalhes em ",
              { href: "https://policies.google.com/technologies/ads", text: "política de anúncios do Google" },
              ".",
            ],
            [
              { strong: "Logs do servidor" },
              ": Vercel registra IP, user agent e timestamp por motivos de segurança e debug (descartados em ~30 dias).",
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
            "Usamos um único cookie próprio: ",
            { code: "mriqbox-consent" },
            " (armazenado em ",
            { code: "localStorage", plain: true },
            ") que guarda sua escolha no banner de consentimento. Os demais cookies (analytics, ads) só são definidos se você aceitar.",
          ],
        },
        {
          paragraph: [
            "Você pode revogar o consentimento a qualquer momento limpando o ",
            { code: "localStorage" },
            " do site pelas configurações do navegador.",
          ],
        },
      ],
    },
    {
      title: "Base legal (LGPD)",
      blocks: [
        {
          paragraph: [
            "Para usuários no Brasil, o tratamento de dados é baseado em ",
            { strong: "consentimento" },
            " (Art. 7º, I da Lei 13.709/2018) para cookies de anúncios e métricas, e ",
            { strong: "legítimo interesse" },
            " (Art. 7º, IX) para logs técnicos de segurança.",
          ],
        },
      ],
    },
    {
      title: "Compartilhamento",
      blocks: [
        { paragraph: ["Não vendemos dados. Os serviços terceirizados que processam métricas/anúncios em nosso nome são:"] },
        {
          list: [
            [{ strong: "Vercel Inc." }, ": hospedagem, analytics, speed insights"],
            [{ strong: "Google LLC" }, ": AdSense (anúncios, mediante seu consentimento)"],
          ],
        },
      ],
    },
    {
      title: "Seus direitos",
      blocks: [
        { paragraph: ["Você pode, a qualquer momento, exigir:"] },
        {
          list: [
            ["Confirmação se tratamos dados seus"],
            ["Acesso aos dados"],
            ["Correção de dados incompletos/desatualizados"],
            ["Anonimização, bloqueio ou eliminação"],
            ["Revogação do consentimento"],
          ],
        },
        {
          paragraph: [
            "Solicite pelo Discord oficial: ",
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
            "Nosso conteúdo é técnico (desenvolvimento de servidores FiveM) e não é direcionado a menores de 13 anos. Não coletamos dados intencionalmente de crianças.",
          ],
        },
      ],
    },
    {
      title: "Alterações",
      blocks: [
        {
          paragraph: [
            "Atualizações nesta política são publicadas nesta página com nova data no topo. Mudanças materiais são anunciadas no Discord da comunidade.",
          ],
        },
      ],
    },
  ],
}
