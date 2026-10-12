import type { GlossaryDictionary } from "./pt-BR"

export const en: GlossaryDictionary = {
  meta: {
    title: "FiveM & Qbox Glossary: technical terms for server development",
    description:
      "A complete dictionary of the terms used in FiveM server development with Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin and more. Written for Brazilian developers.",
    ogTitle: "FiveM & Qbox Glossary: technical terms",
    ogDescription: "A dictionary of FiveM development terms, explained in English.",
    articleDescription:
      "A dictionary of the terms used in FiveM development with Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin and more.",
  },
  home: "Home",
  breadcrumb: "Glossary",
  back: "Back",
  eyebrow: "Reference",
  updated: "Updated",
  title: "FiveM & Qbox Glossary",
  intro:
    "A dictionary of the technical terms you will run into most when building FiveM servers with Qbox. Written for Brazilian developers who are just getting started or want a better grasp of the ecosystem.",
  missing: {
    title: "Missing a term?",
    text: "Suggest it on the official Discord: we add the most requested ones in the next deploy.",
    cta: "Suggest a term on Discord",
  },
  terms: {
    ace: {
      definition:
        "FXServer's native permission system, built on identifiers and principals. It controls who can run admin commands or access restricted resources. Configured in server.cfg with add_ace.",
      example: "add_ace identifier.fivem:YOUR_ID command allow",
    },
    ambient: {
      definition:
        "In GTA V, the NPCs and vehicles the game engine spreads across the map on its own. In roleplay scripts you usually want to reduce or disable them for performance.",
    },
    callback: {
      definition:
        "ox_lib's mechanism for client-server communication with an async response. It replaces the old TriggerServerEvent + TriggerClientEvent pattern for request/response pairs.",
      example: "lib.callback.await('plugintest:server:getConfig', false)",
    },
    cef: {
      definition:
        "The engine that renders the NUI in FiveM. It ships a fairly old Chromium version, so some modern CSS features don't work, such as backdrop-filter:blur.",
    },
    createThread: {
      definition:
        "FiveM function for running async code in a loop. The standard Lua pattern for any continuous behavior (render loops, state polling, etc.).",
    },
    convar: {
      definition:
        "An FXServer console variable. A global setting defined in server.cfg (setr foo bar) and read with GetConvar('foo', 'default'). It can be shared across resources.",
      example: 'setr mri:color "#00E699"',
    },
    dui: {
      definition:
        "FiveM system for rendering web pages as textures in the 3D world, used for waypoints, billboards and in-game screens. Unlike the NUI, it doesn't cover the whole screen.",
    },
    esx: {
      definition:
        "A classic FiveM framework based on essentialmode. QBCore's long-standing rival. Today it lives on through the ESX Legacy fork. Huge catalog of paid scripts.",
    },
    fxmanifest: {
      definition:
        "The manifest file every FiveM resource must have. It declares client_scripts, server_scripts, ui_page, files, dependencies, the Lua version and capabilities.",
    },
    fxserver: {
      definition:
        "The official FiveM server. It runs the scripts, manages player connections and exposes the API that resources use. It usually runs embedded in txAdmin.",
    },
    gpl: {
      definition:
        "A strong copyleft open-source license used by Qbox, QBCore, ox_inventory and MRI Qbox. It allows commercial use but requires distributed forks to keep their code open.",
    },
    lgpl: {
      definition:
        "A more permissive variant of the GPL, used for libraries (ox_lib, @mriqbox/ui-kit). Proprietary projects can use the library without becoming GPL themselves; only changes to the library itself must be published.",
    },
    nui: {
      definition:
        "FiveM system for showing a web interface on top of the game. It loads HTML/CSS/JS through a CEF iframe. Lua ↔ JS communication goes through SendNUIMessage and RegisterNUICallback.",
    },
    oxLib: {
      definition:
        "Overextended's official library for FiveM. It provides menus, notifications, input dialogs, typed callbacks, a locale system and dozens of utilities. The foundation of every modern Qbox script.",
    },
    oxInventory: {
      definition:
        "Overextended's modern inventory system. It replaced legacy inventories (qb-inventory, esx_inventory). The current standard on Qbox/MRI servers.",
    },
    oxmysql: {
      definition:
        "Overextended's official MySQL driver for FXServer. It replaced the legacy mysql-async. Faster, with promise-based queries.",
    },
    qbcore: {
      definition:
        "A popular FiveM framework and the foundation of Qbox. Modular, with a huge community and the largest catalog of paid scripts on Tebex. Technically less modern than Qbox.",
    },
    qbox: {
      definition:
        "A modern fork of QBCore maintained by Overextended. Native ox_lib integration, async threading and better performance. The foundation of MRI Qbox.",
    },
    recipe: {
      definition:
        "A txAdmin recipe file that defines every resource, config and DB schema needed to spin up a server automatically. MRI Qbox publishes an official recipe.",
    },
    resource: {
      definition:
        "The unit of code in FiveM: a folder with an fxmanifest.lua and Lua/UI scripts. FXServer loads it with ensure foo in server.cfg.",
    },
    resmon: {
      definition:
        "Resource Monitor: FiveM's in-game tool (F8 → resmon) that shows CPU usage per resource. Essential for debugging performance.",
    },
    scenario: {
      definition:
        "A prebuilt GTA V ambient animation (e.g. WORLD_HUMAN_SMOKING, WORLD_HUMAN_HANG_OUT_STREET). Played with TaskStartScenarioInPlace to bring peds to life.",
    },
    shadcn: {
      definition:
        "A copy-paste React component library built on Radix + Tailwind. The visual standard of MRI's NUIs, through @mriqbox/ui-kit.",
    },
    tebex: {
      definition:
        "The marketplace the FiveM community uses to sell scripts, maps, vehicles and assets. Payments + key-based licensing.",
    },
    txadmin: {
      definition:
        "The official web panel for managing FiveM servers. It usually comes embedded in FXServer. It deploys recipes, monitors resmon and offers live chat with players.",
    },
    vite: {
      definition:
        "A modern build tool for web apps (fast HMR, ESBuild). Used to build the React NUIs of the MRI scripts (mri_Qadmin, mri_Qspawn, etc.).",
    },
  },
}
