import type { PrivacyDictionary } from "./pt-BR"

export const en: PrivacyDictionary = {
  meta: {
    title: "Privacy Policy | MRI Qbox Brasil",
    description:
      "How we handle your data, cookies, analytics and ads on mriqbox.com.br and its subdomains. Full policy in compliance with the LGPD.",
  },
  back: "Back",
  home: "Home",
  crumb: "Privacy",
  heading: "Privacy Policy",
  updated: "Last updated",
  intro: [
    "MRI Qbox Brasil (“we”, “our”, “MRI”) operates the ",
    { code: "mriqbox.com.br" },
    " website and the subdomains ",
    { code: "docs.mriqbox.com.br" },
    ", ",
    { code: "assets.mriqbox.com.br" },
    " and ",
    { code: "discord.mriqbox.com.br" },
    ". This policy describes what data we collect, why we collect it and how you can control it.",
  ],
  sections: [
    {
      title: "What data we collect",
      blocks: [
        { paragraph: ["We don't require sign-up or login. The data we receive comes from three sources:"] },
        {
          list: [
            [
              { strong: "Anonymous metrics" },
              " via Vercel Analytics, Vercel Speed Insights and Cloudflare Web Analytics: pages visited, performance and approximate country. No cookies, no personally identifiable data.",
            ],
            [
              { strong: "Google AdSense ads" },
              ": when you accept the consent banner, the AdSense script is loaded and Google may use cookies to personalize ads. Details in ",
              { href: "https://policies.google.com/technologies/ads", text: "Google's advertising policy" },
              ".",
            ],
            [
              { strong: "Server logs" },
              ": Vercel records IP address, user agent and timestamp for security and debugging purposes (discarded after ~30 days).",
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
            "We use a single first-party cookie: ",
            { code: "mriqbox-consent" },
            " (stored in ",
            { code: "localStorage", plain: true },
            "), which saves your choice in the consent banner. Other cookies (analytics, ads) are only set if you accept them.",
          ],
        },
        {
          paragraph: [
            "You can withdraw your consent at any time by clearing the site's ",
            { code: "localStorage" },
            " in your browser settings.",
          ],
        },
      ],
    },
    {
      title: "Legal basis (LGPD)",
      blocks: [
        {
          paragraph: [
            "For users in Brazil, data processing is based on ",
            { strong: "consent" },
            " (Art. 7, I of Law 13,709/2018) for advertising and analytics cookies, and on ",
            { strong: "legitimate interest" },
            " (Art. 7, IX) for technical security logs.",
          ],
        },
      ],
    },
    {
      title: "Sharing",
      blocks: [
        { paragraph: ["We don't sell data. The third-party services that process metrics/ads on our behalf are:"] },
        {
          list: [
            [{ strong: "Vercel Inc." }, ": hosting, analytics, speed insights"],
            [{ strong: "Google LLC" }, ": AdSense (ads, subject to your consent)"],
          ],
        },
      ],
    },
    {
      title: "Your rights",
      blocks: [
        { paragraph: ["You may, at any time, request:"] },
        {
          list: [
            ["Confirmation of whether we process your data"],
            ["Access to the data"],
            ["Correction of incomplete/outdated data"],
            ["Anonymization, blocking or deletion"],
            ["Withdrawal of consent"],
          ],
        },
        {
          paragraph: [
            "Send your request through the official Discord: ",
            { href: "https://discord.mriqbox.com.br", text: "discord.mriqbox.com.br" },
            ".",
          ],
        },
      ],
    },
    {
      title: "Children",
      blocks: [
        {
          paragraph: [
            "Our content is technical (FiveM server development) and is not directed at children under 13. We do not knowingly collect data from children.",
          ],
        },
      ],
    },
    {
      title: "Changes",
      blocks: [
        {
          paragraph: [
            "Updates to this policy are published on this page with a new date at the top. Material changes are announced on the community Discord.",
          ],
        },
      ],
    },
  ],
}
