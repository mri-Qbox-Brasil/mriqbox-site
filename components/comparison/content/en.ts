import type { ComparisonDictionary } from "./pt-BR"

export const en: ComparisonDictionary = {
  meta: {
    title: "MRI Qbox vs QBCore vs ESX vs Qbox: FiveM framework comparison",
    description:
      "An objective comparison of the main FiveM server frameworks: MRI Qbox, QBCore, ESX and international Qbox. Tech stack, maintenance, community, performance and language.",
    ogTitle: "MRI Qbox vs QBCore vs ESX vs Qbox: comparison",
    ogDescription: "Which FiveM framework should you pick? A detailed table with technical and community criteria.",
    articleDescription:
      "An objective comparison of the main Brazilian and international FiveM frameworks. A 10-criteria table and when to use each one.",
  },
  home: "Home",
  breadcrumb: "Comparison",
  back: "Back",
  eyebrow: "Analysis",
  updated: "Updated",
  title: "FiveM framework comparison",
  intro: {
    before: "Which framework should you pick for your FiveM roleplay server? An objective look at ",
    names: ["MRI Qbox", "international Qbox", "QBCore", "ESX"],
    and: " and ",
    after: ", the four most used options on Brazilian servers today.",
  },
  summary: {
    title: "Quick summary",
    items: [
      {
        name: "MRI Qbox",
        text: "Qbox translated + ready-made MRI scripts. Best choice if you want to get going fast in Brazilian Portuguese without building everything from scratch.",
      },
      {
        name: "Qbox",
        text: "modern, fast, an excellent technical foundation. Best choice if you read technical English and want full flexibility.",
      },
      {
        name: "QBCore",
        text: "a massive community and the largest catalog of paid scripts on Tebex. Best choice if having ready-made scripts available is your priority.",
      },
      {
        name: "ESX",
        text: "the historic legacy option, still active through ESX Legacy. Best choice if you inherited an existing ESX server and don't want to migrate.",
      },
    ],
  },
  table: {
    title: "Comparison table",
    criterion: "Criterion",
    rows: [
      {
        criterion: "Native language",
        mri: { value: "Portuguese (BR)" },
        qbox: { value: "English" },
        qbcore: { value: "English (community translations)" },
        esx: { value: "English (community translations)" },
      },
      {
        criterion: "License",
        mri: { value: "GPL-3.0 / LGPL-3.0" },
        qbox: { value: "GPL-3.0" },
        qbcore: { value: "GPL-3.0" },
        esx: { value: "GPL-3.0" },
      },
      {
        criterion: "Core dependencies",
        mri: { value: "Qbox + ox_lib + oxmysql" },
        qbox: { value: "Native ox_lib + oxmysql" },
        qbcore: { value: "ox_lib (recent) or legacy" },
        esx: { value: "essentialmode (legacy) or oxmysql" },
      },
      {
        criterion: "Performance (resmon)",
        mri: { value: "yes", note: "Same as upstream Qbox" },
        qbox: { value: "yes", note: "Optimized, async threading" },
        qbcore: { value: "partial", note: "Good, but has legacy sync callbacks" },
        esx: { value: "partial", note: "Depends heavily on the version" },
      },
      {
        criterion: "Docs in Portuguese",
        mri: { value: "yes", note: "mriqbox.com.br/docs" },
        qbox: { value: "no", note: "English only" },
        qbcore: { value: "partial", note: "Scattered forum/YouTube tutorials" },
        esx: { value: "partial", note: "Old, fragmented Brazilian community" },
      },
      {
        criterion: "Actively maintained",
        mri: { value: "yes", note: "Maintained + synced with upstream Qbox" },
        qbox: { value: "yes", note: "Active Overextended team" },
        qbcore: { value: "yes", note: "Large community" },
        esx: { value: "partial", note: "ESX Legacy active, original ESX abandoned" },
      },
      {
        criterion: "Official plugin system",
        mri: { value: "yes", note: "mri_Qadmin with a plugin sidebar" },
        qbox: { value: "partial", note: "A convention, not a standard" },
        qbcore: { value: "no" },
        esx: { value: "no" },
      },
      {
        criterion: "Learning curve",
        mri: { value: "Gentle (Portuguese + docs)" },
        qbox: { value: "Medium (requires technical English)" },
        qbcore: { value: "Medium (legacy is less demanding)" },
        esx: { value: "Gentle (large Brazilian community)" },
      },
      {
        criterion: "Works with paid Tebex scripts",
        mri: { value: "yes", note: "Runs Qbox/QBCore scripts" },
        qbox: { value: "yes" },
        qbcore: { value: "yes", note: "Largest catalog on Tebex" },
        esx: { value: "yes", note: "Largest historical catalog" },
      },
      {
        criterion: "Official script ecosystem",
        mri: { value: "MRI suite (Qadmin, Qspawn, Qmultichar, etc.)" },
        qbox: { value: "qbx_* scripts" },
        qbcore: { value: "qb-* scripts" },
        esx: { value: "esx_* scripts" },
      },
    ],
  },
  versus: [
    {
      title: "MRI Qbox vs international Qbox",
      paragraphs: [
        {
          text: "MRI Qbox is literally Qbox translated into Brazilian Portuguese, kept in sync with Overextended's upstream. It isn't a diverging fork; it's an adaptation that takes every international Qbox release and translates messages, NPCs, jobs, gangs and documentation.",
        },
        {
          label: "When to choose MRI:",
          text: "a Brazilian server, a team that isn't fluent in technical English, and you want docs in Portuguese plus ready-made companion scripts (admin panel, cinematic spawn, modern multichar).",
        },
        {
          label: "When to choose international Qbox:",
          text: "a bilingual team, deep customization ahead, and a preference for tracking upstream in real time with no translation layer.",
        },
      ],
    },
    {
      title: "MRI Qbox vs QBCore",
      paragraphs: [
        {
          text: "QBCore was the foundation of Qbox: Qbox is the modern fork of QBCore, with native ox_lib integration and performance improvements. As a result, MRI Qbox (which descends from Qbox) inherits those improvements too.",
        },
        {
          text: "QBCore still has an active community and the largest historical catalog of paid scripts on Tebex. Many QBCore scripts run on Qbox/MRI with only small tweaks (compatibility is high), but some depend on QB-specific helpers.",
        },
        {
          label: "Verdict:",
          text: "if you're starting from scratch today, MRI Qbox (or Qbox) gives you a more modern foundation. If you inherited or already bought a lot of QBCore scripts, stay on QBCore.",
        },
      ],
    },
    {
      title: "MRI Qbox vs ESX",
      paragraphs: [
        {
          text: "ESX and Qbox are frameworks from different generations. ESX comes from FiveM's early years (originally essentialmode-based), while Qbox comes from modern design (ox_lib + modular architecture).",
        },
        {
          text: "ESX has a gigantic script catalog and a long-standing, active Brazilian community. On the other hand, its architecture is harder to maintain: many ESX scripts need manual patches with every update.",
        },
        {
          label: "Verdict:",
          text: "ESX only makes sense for an existing server that has already invested in ESX scripts. For starting today, MRI Qbox/Qbox is the better technical choice.",
        },
      ],
    },
  ],
  cta: {
    title: "Ready to get started?",
    text: "See the full list of MRI suite scripts and the installation guide.",
    button: "Artifacts DB",
  },
}
