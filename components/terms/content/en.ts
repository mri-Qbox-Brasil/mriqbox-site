import { DISCORD_URL, GITHUB_URL, QBOX_URL, type TermsDictionary } from "./pt-BR"

export const en: TermsDictionary = {
  meta: {
    title: "Terms of Use | MRI Qbox Brasil",
    description:
      "Terms of use for the mriqbox.com.br website, the GPL-3.0/LGPL-3.0 code published in the MRI Qbox Brasil repositories and the community Discord server.",
  },
  back: "Back",
  home: "Home",
  crumb: "Terms",
  heading: "Terms of Use",
  updated: "Last updated",
  intro: [
    "By accessing ",
    { code: "mriqbox.com.br" },
    " and its subdomains, or by using any code published in the MRI Qbox Brasil repositories on GitHub, you agree to these terms. If you do not agree, do not use the site or the scripts.",
  ],
  sections: [
    {
      title: "1. What we offer",
      blocks: [
        {
          paragraph: [
            "MRI Qbox Brasil distributes, free of charge, an adaptation of the open-source ",
            { href: QBOX_URL, text: "Qbox" },
            " framework (Qbcore + Ox) for Brazilian FiveM servers. The code is hosted at ",
            { href: GITHUB_URL, text: "github.com/mri-Qbox-Brasil" },
            " and licensed under ",
            { strong: "GPL-3.0" },
            " (scripts and frameworks) or ",
            { strong: "LGPL-3.0" },
            " (reusable libraries such as @mriqbox/ui-kit), following the same licensing model as Qbox and Overextended. Each repository states the applicable license in its ",
            { code: "LICENSE" },
            " file.",
          ],
        },
      ],
    },
    {
      title: "2. Permitted use",
      blocks: [
        {
          list: [
            ["Using the scripts on FiveM servers, commercial or not"],
            ["Modifying them to fit your server and contributing back via Pull Request"],
            [
              "Forking and redistributing, provided you keep the original GPL/LGPL license and make the modified code available (copyleft)",
            ],
          ],
        },
      ],
    },
    {
      title: "3. Prohibited use",
      blocks: [
        {
          list: [
            [
              "Redistributing ",
              { strong: "closed" },
              " modified versions: the GPL requires the code to remain open",
            ],
            [
              "Using the “MRI Qbox” brand, logos and visual identity without permission (the license covers the source code, not the trademark)",
            ],
            [
              "Attacking the site's infrastructure (abusive scraping, DDoS, exploiting vulnerabilities without responsible disclosure)",
            ],
            ["Using site content to train commercial AI models without permission"],
          ],
        },
      ],
    },
    {
      title: "4. No warranty",
      blocks: [
        {
          paragraph: [
            "The scripts are provided ",
            { strong: "“AS IS”" },
            ", without warranty of any kind. We are not liable for any loss, damage or problems on your server arising from their use. You are responsible for testing and validating everything before putting it into production.",
          ],
        },
      ],
    },
    {
      title: "5. Community (Discord)",
      blocks: [
        {
          paragraph: [
            "The MRI Qbox Brasil Discord server has its own rules, published internally. Abusive behavior, spam, or sharing cheats or copyrighted material results in a ban, without prior notice when necessary.",
          ],
        },
      ],
    },
    {
      title: "6. Advertising",
      blocks: [
        {
          paragraph: [
            "This site displays ads through Google AdSense, subject to your consent. We do not endorse the products or services advertised. Disputes with advertisers must be resolved directly with them or through Google.",
          ],
        },
      ],
    },
    {
      title: "7. Changes to these terms",
      blocks: [
        {
          paragraph: [
            "We may update these terms. Significant changes are announced on Discord. Continued use of the site after an update constitutes acceptance.",
          ],
        },
      ],
    },
    {
      title: "8. Governing law",
      blocks: [
        {
          paragraph: [
            "These terms are governed by the laws of the Federative Republic of Brazil. The courts of São Paulo/SP shall have jurisdiction over any dispute not resolved amicably.",
          ],
        },
      ],
    },
    {
      title: "9. Contact",
      blocks: [
        { paragraph: ["Questions about these terms: ", { href: DISCORD_URL, text: "discord.mriqbox.com.br" }, "."] },
      ],
    },
  ],
}
