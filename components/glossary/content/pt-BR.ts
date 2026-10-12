import type { GlossaryTermId } from "../terms"

export type GlossaryEntry = { definition: string; example?: string }

export const ptBR = {
  meta: {
    title: "Glossário FiveM & Qbox: termos técnicos de desenvolvimento de servidor",
    description:
      "Dicionário completo de termos usados no desenvolvimento de servidores FiveM com Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin e mais. Para desenvolvedores brasileiros.",
    ogTitle: "Glossário FiveM & Qbox: termos técnicos",
    ogDescription: "Dicionário de termos de desenvolvimento FiveM em português.",
    articleDescription:
      "Dicionário de termos usados no desenvolvimento FiveM com Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin e mais.",
  },
  home: "Início",
  breadcrumb: "Glossário",
  back: "Voltar",
  eyebrow: "Referência",
  updated: "Atualizado em",
  title: "Glossário FiveM & Qbox",
  intro:
    "Dicionário dos termos técnicos mais usados no desenvolvimento de servidores FiveM com Qbox. Escrito pra desenvolvedores brasileiros que estão começando ou querem entender melhor o ecossistema.",
  missing: {
    title: "Faltou algum termo?",
    text: "Sugira no Discord oficial: adicionamos os mais pedidos no próximo deploy.",
    cta: "Sugerir termo no Discord",
  },
  terms: {
    ace: {
      definition:
        "Sistema de permissões nativo do FXServer baseado em identifiers e princípios. Define quem pode rodar comandos administrativos ou acessar recursos restritos. Configurado no server.cfg via add_ace.",
      example: "add_ace identifier.fivem:SEU_ID command allow",
    },
    ambient: {
      definition:
        "No GTA V, refere-se a NPCs/veículos espalhados pelo mapa automaticamente pelo engine. Em scripts de roleplay, geralmente é desejável reduzir ou desabilitar pra performance.",
    },
    callback: {
      definition:
        "Mecanismo do ox_lib pra comunicação cliente-servidor com resposta assíncrona. Substitui o padrão antigo de TriggerServerEvent + TriggerClientEvent pra pares request/response.",
      example: "lib.callback.await('plugintest:server:getConfig', false)",
    },
    cef: {
      definition:
        "Engine que renderiza a NUI no FiveM. Versão do Chromium relativamente antiga: algumas features CSS modernas não funcionam, como backdrop-filter:blur.",
    },
    createThread: {
      definition:
        "Função do FiveM pra rodar código async em loop. Padrão Lua pra qualquer comportamento contínuo (loops de renderização, polling de estado, etc).",
    },
    convar: {
      definition:
        "Console variable do FXServer. Configuração global definida via server.cfg (setr foo bar) e lida via GetConvar('foo', 'default'). Pode ser shared entre resources.",
      example: 'setr mri:color "#00E699"',
    },
    dui: {
      definition:
        "Sistema do FiveM pra renderizar páginas web como texturas no mundo 3D, usado pra waypoints, billboards, telas in-game. Diferente da NUI que cobre a tela inteira.",
    },
    esx: {
      definition:
        "Framework FiveM clássica baseada em essentialmode. Concorrente histórica do QBCore. Hoje mantida via fork ESX Legacy. Catálogo gigante de scripts pagos.",
    },
    fxmanifest: {
      definition:
        "Arquivo manifesto obrigatório em todo resource FiveM. Declara client_scripts, server_scripts, ui_page, files, dependências, versão do Lua e capabilities.",
    },
    fxserver: {
      definition:
        "Servidor oficial do FiveM. Roda os scripts, gerencia conexões dos jogadores e expõe a API que os resources consomem. Costuma rodar embutido no txAdmin.",
    },
    gpl: {
      definition:
        "Licença open source copyleft forte usada pelo Qbox, QBCore, ox_inventory e MRI Qbox. Permite uso comercial mas exige que forks distribuídos mantenham o código aberto.",
    },
    lgpl: {
      definition:
        "Variante mais permissiva da GPL, usada pra bibliotecas (ox_lib, @mriqbox/ui-kit). Permite que projetos proprietários consumam a lib sem virar GPL eles mesmos; só modificações na lib precisam ser publicadas.",
    },
    nui: {
      definition:
        "Sistema do FiveM pra mostrar interface web sobre o jogo. Carrega HTML/CSS/JS via um iframe CEF. Pra comunicar Lua ↔ JS usa SendNUIMessage e RegisterNUICallback.",
    },
    oxLib: {
      definition:
        "Biblioteca oficial da Overextended pra FiveM. Fornece menus, notify, input dialogs, callbacks tipados, locale system e dezenas de utilitários. Base de todo script Qbox moderno.",
    },
    oxInventory: {
      definition:
        "Sistema de inventário moderno da Overextended. Substituiu inventários legacy (qb-inventory, esx_inventory). Padrão atual em servidores Qbox/MRI.",
    },
    oxmysql: {
      definition:
        "Driver MySQL oficial da Overextended pro FXServer. Substituiu o mysql-async legacy. Mais performático, queries promise-based.",
    },
    qbcore: {
      definition:
        "Framework FiveM popular, base do Qbox. Modular, comunidade gigante, maior catálogo de scripts pagos no Tebex. Tecnicamente menos moderna que Qbox.",
    },
    qbox: {
      definition:
        "Fork moderno do QBCore mantido pela Overextended. Integração nativa com ox_lib, threading async, performance superior. Base do MRI Qbox.",
    },
    recipe: {
      definition:
        "Arquivo de receita do txAdmin que define todos os resources, configs e DB schema necessários pra subir um servidor automaticamente. MRI Qbox publica uma recipe oficial.",
    },
    resource: {
      definition:
        "Unidade de código no FiveM: uma pasta com fxmanifest.lua e scripts Lua/UI. Carregada pelo FXServer via ensure foo no server.cfg.",
    },
    resmon: {
      definition:
        "Resource Monitor: ferramenta in-game do FiveM (F8 → resmon) que mostra uso de CPU por resource. Crítico pra debug de performance.",
    },
    scenario: {
      definition:
        "Animação ambiente pré-fabricada do GTA V (ex: WORLD_HUMAN_SMOKING, WORLD_HUMAN_HANG_OUT_STREET). Usada via TaskStartScenarioInPlace pra dar vida aos peds.",
    },
    shadcn: {
      definition:
        "Biblioteca de componentes React copy-paste baseada em Radix + Tailwind. Padrão visual usado nas NUIs MRI via @mriqbox/ui-kit.",
    },
    tebex: {
      definition:
        "Marketplace usado pela comunidade FiveM pra vender scripts, mapas, veículos e assets. Plataforma de pagamento + licenciamento via key.",
    },
    txadmin: {
      definition:
        "Painel web oficial pra gerenciar servidores FiveM. Geralmente já vem embutido no FXServer. Faz deploy de recipes, monitora resmon, oferece chat ao vivo com jogadores.",
    },
    vite: {
      definition:
        "Build tool moderno pra apps web (HMR rápido, ESBuild). Usado pra buildar as NUIs React dos scripts MRI (mri_Qadmin, mri_Qspawn, etc).",
    },
  } satisfies Record<GlossaryTermId, GlossaryEntry>,
}

export type GlossaryDictionary = typeof ptBR
