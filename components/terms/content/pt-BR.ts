import type { LegalDictionary } from "@/components/legal/types"

export type TermsDictionary = LegalDictionary

export const QBOX_URL = "https://github.com/Qbox-project"
export const GITHUB_URL = "https://github.com/mri-Qbox-Brasil"
export const DISCORD_URL = "https://discord.mriqbox.com.br"

export const ptBR: TermsDictionary = {
  meta: {
    title: "Termos de Uso | MRI Qbox Brasil",
    description:
      "Termos de uso do site mriqbox.com.br, dos códigos GPL-3.0/LGPL-3.0 publicados nos repositórios da MRI Qbox Brasil e do servidor Discord da comunidade.",
  },
  back: "Voltar",
  home: "Início",
  crumb: "Termos",
  heading: "Termos de Uso",
  updated: "Última atualização",
  intro: [
    "Ao acessar ",
    { code: "mriqbox.com.br" },
    " e seus subdomínios, ou ao usar qualquer código publicado nos repositórios da MRI Qbox Brasil no GitHub, você concorda com estes termos. Se discordar, não use o site nem os scripts.",
  ],
  sections: [
    {
      title: "1. O que oferecemos",
      blocks: [
        {
          paragraph: [
            "A MRI Qbox Brasil distribui gratuitamente uma adaptação da framework open source ",
            { href: QBOX_URL, text: "Qbox" },
            " (Qbcore + Ox) para servidores FiveM brasileiros. O código é hospedado em ",
            { href: GITHUB_URL, text: "github.com/mri-Qbox-Brasil" },
            " e licenciado sob ",
            { strong: "GPL-3.0" },
            " (scripts e frameworks) ou ",
            { strong: "LGPL-3.0" },
            " (bibliotecas reutilizáveis como @mriqbox/ui-kit), seguindo o mesmo modelo de licenciamento do Qbox e Overextended. Cada repositório indica a licença aplicável no arquivo ",
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
            ["Usar os scripts em servidores FiveM, comerciais ou não"],
            ["Modificar pra adequar ao seu servidor e contribuir de volta via Pull Request"],
            [
              "Forkar e redistribuir, desde que mantendo a licença GPL/LGPL original e tornando o código modificado disponível (copyleft)",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Uso proibido",
      blocks: [
        {
          list: [
            ["Redistribuir versões modificadas ", { strong: "fechadas" }, ": GPL exige que o código permaneça aberto"],
            [
              "Usar a marca “MRI Qbox”, logos e identidade visual sem autorização (a licença cobre o código-fonte, não a marca registrada)",
            ],
            [
              "Atacar a infraestrutura do site (scraping abusivo, DDoS, exploração de vulnerabilidades sem disclosure responsável)",
            ],
            ["Usar conteúdo do site para treinar modelos de IA comerciais sem permissão"],
          ],
        },
      ],
    },
    {
      title: "4. Sem garantias",
      blocks: [
        {
          paragraph: [
            "Os scripts são fornecidos ",
            { strong: "“COMO ESTÃO”" },
            ", sem garantia de qualquer tipo. Não nos responsabilizamos por perdas, danos ou problemas no seu servidor decorrentes do uso. Você é responsável por testar e validar tudo antes de pôr em produção.",
          ],
        },
      ],
    },
    {
      title: "5. Comunidade (Discord)",
      blocks: [
        {
          paragraph: [
            "O servidor Discord da MRI Qbox Brasil tem regras próprias publicadas internamente. Comportamento abusivo, spam, divulgação de cheats ou de material protegido por copyright resulta em banimento, sem aviso prévio quando necessário.",
          ],
        },
      ],
    },
    {
      title: "6. Anúncios",
      blocks: [
        {
          paragraph: [
            "Este site exibe anúncios via Google AdSense, mediante seu consentimento. Não endossamos produtos ou serviços anunciados. Conflitos com anunciantes devem ser resolvidos diretamente com eles ou via Google.",
          ],
        },
      ],
    },
    {
      title: "7. Mudanças nestes termos",
      blocks: [
        {
          paragraph: [
            "Podemos atualizar estes termos. Mudanças significativas são anunciadas no Discord. Continuar usando o site após atualização constitui aceite.",
          ],
        },
      ],
    },
    {
      title: "8. Lei aplicável",
      blocks: [
        {
          paragraph: [
            "Estes termos são regidos pelas leis da República Federativa do Brasil. Foro de São Paulo/SP para qualquer disputa não resolvida amigavelmente.",
          ],
        },
      ],
    },
    {
      title: "9. Contato",
      blocks: [
        { paragraph: ["Dúvidas sobre estes termos: ", { href: DISCORD_URL, text: "discord.mriqbox.com.br" }, "."] },
      ],
    },
  ],
}
