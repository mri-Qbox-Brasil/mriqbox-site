import { DISCORD_URL, GITHUB_URL, QBOX_URL, type TermsDictionary } from "./pt-BR"

export const ptPT: TermsDictionary = {
  meta: {
    title: "Termos de Utilização | MRI Qbox Brasil",
    description:
      "Termos de utilização do site mriqbox.com.br, do código GPL-3.0/LGPL-3.0 publicado nos repositórios da MRI Qbox Brasil e do servidor Discord da comunidade.",
  },
  back: "Voltar",
  home: "Início",
  crumb: "Termos",
  heading: "Termos de Utilização",
  updated: "Última atualização",
  intro: [
    "Ao aceder a ",
    { code: "mriqbox.com.br" },
    " e aos respetivos subdomínios, ou ao utilizar qualquer código publicado nos repositórios da MRI Qbox Brasil no GitHub, aceita estes termos. Se não concordar, não utilize o site nem os scripts.",
  ],
  sections: [
    {
      title: "1. O que oferecemos",
      blocks: [
        {
          paragraph: [
            "A MRI Qbox Brasil distribui gratuitamente uma adaptação da framework open source ",
            { href: QBOX_URL, text: "Qbox" },
            " (Qbcore + Ox) para servidores FiveM brasileiros. O código está alojado em ",
            { href: GITHUB_URL, text: "github.com/mri-Qbox-Brasil" },
            " e licenciado ao abrigo da ",
            { strong: "GPL-3.0" },
            " (scripts e frameworks) ou da ",
            { strong: "LGPL-3.0" },
            " (bibliotecas reutilizáveis como @mriqbox/ui-kit), seguindo o mesmo modelo de licenciamento do Qbox e do Overextended. Cada repositório indica a licença aplicável no ficheiro ",
            { code: "LICENSE" },
            ".",
          ],
        },
      ],
    },
    {
      title: "2. Utilização permitida",
      blocks: [
        {
          list: [
            ["Utilizar os scripts em servidores FiveM, comerciais ou não"],
            ["Modificá-los para os adaptar ao seu servidor e contribuir de volta através de Pull Request"],
            [
              "Fazer fork e redistribuir, desde que mantenha a licença GPL/LGPL original e disponibilize o código modificado (copyleft)",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Utilização proibida",
      blocks: [
        {
          list: [
            [
              "Redistribuir versões modificadas ",
              { strong: "fechadas" },
              ": a GPL exige que o código permaneça aberto",
            ],
            [
              "Utilizar a marca “MRI Qbox”, os logótipos e a identidade visual sem autorização (a licença abrange o código-fonte, não a marca registada)",
            ],
            [
              "Atacar a infraestrutura do site (scraping abusivo, DDoS, exploração de vulnerabilidades sem divulgação responsável)",
            ],
            ["Utilizar conteúdo do site para treinar modelos de IA comerciais sem autorização"],
          ],
        },
      ],
    },
    {
      title: "4. Ausência de garantias",
      blocks: [
        {
          paragraph: [
            "Os scripts são fornecidos ",
            { strong: "“TAL COMO ESTÃO”" },
            ", sem garantia de qualquer tipo. Não nos responsabilizamos por perdas, danos ou problemas no seu servidor decorrentes da sua utilização. É da sua responsabilidade testar e validar tudo antes de colocar em produção.",
          ],
        },
      ],
    },
    {
      title: "5. Comunidade (Discord)",
      blocks: [
        {
          paragraph: [
            "O servidor Discord da MRI Qbox Brasil tem regras próprias, publicadas internamente. Comportamento abusivo, spam, divulgação de cheats ou de material protegido por direitos de autor resulta em banimento, sem aviso prévio quando necessário.",
          ],
        },
      ],
    },
    {
      title: "6. Anúncios",
      blocks: [
        {
          paragraph: [
            "Este site apresenta anúncios através do Google AdSense, mediante o seu consentimento. Não subscrevemos os produtos ou serviços anunciados. Os litígios com anunciantes devem ser resolvidos diretamente com eles ou através da Google.",
          ],
        },
      ],
    },
    {
      title: "7. Alterações a estes termos",
      blocks: [
        {
          paragraph: [
            "Podemos atualizar estes termos. As alterações significativas são anunciadas no Discord. A utilização continuada do site após uma atualização constitui aceitação.",
          ],
        },
      ],
    },
    {
      title: "8. Lei aplicável",
      blocks: [
        {
          paragraph: [
            "Estes termos regem-se pelas leis da República Federativa do Brasil. Para qualquer litígio não resolvido amigavelmente, é competente o foro de São Paulo/SP.",
          ],
        },
      ],
    },
    {
      title: "9. Contacto",
      blocks: [
        { paragraph: ["Dúvidas sobre estes termos: ", { href: DISCORD_URL, text: "discord.mriqbox.com.br" }, "."] },
      ],
    },
  ],
}
