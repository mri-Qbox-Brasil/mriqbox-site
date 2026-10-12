import type { GlossaryDictionary } from "./pt-BR"

export const ptPT: GlossaryDictionary = {
  meta: {
    title: "Glossário FiveM & Qbox: termos técnicos de desenvolvimento de servidores",
    description:
      "Dicionário completo dos termos usados no desenvolvimento de servidores FiveM com Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin e muito mais. Escrito a pensar nos programadores brasileiros.",
    ogTitle: "Glossário FiveM & Qbox: termos técnicos",
    ogDescription: "Dicionário de termos de desenvolvimento FiveM em português.",
    articleDescription:
      "Dicionário dos termos usados no desenvolvimento FiveM com Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin e muito mais.",
  },
  home: "Início",
  breadcrumb: "Glossário",
  back: "Voltar",
  eyebrow: "Referência",
  updated: "Atualizado a",
  title: "Glossário FiveM & Qbox",
  intro:
    "Dicionário dos termos técnicos mais usados no desenvolvimento de servidores FiveM com Qbox. Escrito para os programadores brasileiros que estão a começar ou que querem perceber melhor o ecossistema.",
  missing: {
    title: "Falta algum termo?",
    text: "Sugira-o no Discord oficial: acrescentamos os mais pedidos na próxima atualização.",
    cta: "Sugerir um termo no Discord",
  },
  terms: {
    ace: {
      definition:
        "Sistema de permissões nativo do FXServer, assente em identifiers e principals. Define quem pode executar comandos de administração ou aceder a recursos restritos. Configura-se no server.cfg com add_ace.",
      example: "add_ace identifier.fivem:O_SEU_ID command allow",
    },
    ambient: {
      definition:
        "No GTA V, refere-se aos NPCs e veículos que o motor do jogo espalha automaticamente pelo mapa. Em scripts de roleplay, convém normalmente reduzi-los ou desativá-los por questões de desempenho.",
    },
    callback: {
      definition:
        "Mecanismo do ox_lib para a comunicação entre cliente e servidor com resposta assíncrona. Substitui o antigo padrão de TriggerServerEvent + TriggerClientEvent nos pares de pedido e resposta.",
      example: "lib.callback.await('plugintest:server:getConfig', false)",
    },
    cef: {
      definition:
        "Motor que renderiza a NUI no FiveM. Usa uma versão do Chromium relativamente antiga: algumas funcionalidades modernas de CSS não funcionam, como backdrop-filter:blur.",
    },
    createThread: {
      definition:
        "Função do FiveM para correr código assíncrono em ciclo. É o padrão em Lua para qualquer comportamento contínuo (ciclos de renderização, verificação periódica de estado, etc.).",
    },
    convar: {
      definition:
        "Console variable do FXServer. Configuração global definida no server.cfg (setr foo bar) e lida com GetConvar('foo', 'default'). Pode ser partilhada entre resources.",
      example: 'setr mri:color "#00E699"',
    },
    dui: {
      definition:
        "Sistema do FiveM para renderizar páginas web como texturas no mundo 3D, usado em waypoints, painéis publicitários e ecrãs dentro do jogo. Ao contrário da NUI, não ocupa o ecrã inteiro.",
    },
    esx: {
      definition:
        "Framework FiveM clássica, baseada no essentialmode. Rival histórica do QBCore. Hoje é mantida através do fork ESX Legacy. Tem um catálogo enorme de scripts pagos.",
    },
    fxmanifest: {
      definition:
        "Ficheiro de manifesto obrigatório em qualquer resource FiveM. Declara client_scripts, server_scripts, ui_page, files, dependências, versão do Lua e capabilities.",
    },
    fxserver: {
      definition:
        "Servidor oficial do FiveM. Executa os scripts, gere as ligações dos jogadores e expõe a API que os resources utilizam. Costuma correr integrado no txAdmin.",
    },
    gpl: {
      definition:
        "Licença open source com copyleft forte, usada pelo Qbox, QBCore, ox_inventory e MRI Qbox. Permite o uso comercial, mas obriga a que os forks distribuídos mantenham o código aberto.",
    },
    lgpl: {
      definition:
        "Variante mais permissiva da GPL, usada em bibliotecas (ox_lib, @mriqbox/ui-kit). Permite que projetos proprietários utilizem a biblioteca sem passarem eles próprios a ser GPL; só as alterações à biblioteca têm de ser publicadas.",
    },
    nui: {
      definition:
        "Sistema do FiveM para mostrar uma interface web por cima do jogo. Carrega HTML/CSS/JS num iframe CEF. A comunicação Lua ↔ JS faz-se com SendNUIMessage e RegisterNUICallback.",
    },
    oxLib: {
      definition:
        "Biblioteca oficial da Overextended para FiveM. Disponibiliza menus, notificações, caixas de input, callbacks tipados, sistema de locales e dezenas de utilitários. É a base de qualquer script Qbox moderno.",
    },
    oxInventory: {
      definition:
        "Sistema de inventário moderno da Overextended. Substituiu os inventários legacy (qb-inventory, esx_inventory). É o padrão atual nos servidores Qbox/MRI.",
    },
    oxmysql: {
      definition:
        "Driver MySQL oficial da Overextended para o FXServer. Substituiu o antigo mysql-async. Tem melhor desempenho e queries baseadas em promises.",
    },
    qbcore: {
      definition:
        "Framework FiveM popular, base do Qbox. Modular, com uma comunidade enorme e o maior catálogo de scripts pagos no Tebex. Tecnicamente menos moderna do que o Qbox.",
    },
    qbox: {
      definition:
        "Fork moderno do QBCore mantido pela Overextended. Integração nativa com o ox_lib, threading assíncrono e melhor desempenho. É a base do MRI Qbox.",
    },
    recipe: {
      definition:
        "Ficheiro de receita do txAdmin que define todos os resources, configurações e o esquema da base de dados necessários para pôr um servidor a funcionar automaticamente. A MRI Qbox publica uma recipe oficial.",
    },
    resource: {
      definition:
        "Unidade de código no FiveM: uma pasta com fxmanifest.lua e scripts Lua/UI. É carregada pelo FXServer com ensure foo no server.cfg.",
    },
    resmon: {
      definition:
        "Resource Monitor: ferramenta do FiveM dentro do jogo (F8 → resmon) que mostra o consumo de CPU de cada resource. Essencial para depurar problemas de desempenho.",
    },
    scenario: {
      definition:
        "Animação ambiente pré-definida do GTA V (por exemplo, WORLD_HUMAN_SMOKING, WORLD_HUMAN_HANG_OUT_STREET). Usa-se com TaskStartScenarioInPlace para dar vida aos peds.",
    },
    shadcn: {
      definition:
        "Biblioteca de componentes React para copiar e colar, baseada em Radix + Tailwind. É o padrão visual das NUIs da MRI, através do @mriqbox/ui-kit.",
    },
    tebex: {
      definition:
        "Marketplace usado pela comunidade FiveM para vender scripts, mapas, veículos e assets. Plataforma de pagamento + licenciamento por chave.",
    },
    txadmin: {
      definition:
        "Painel web oficial para gerir servidores FiveM. Normalmente já vem integrado no FXServer. Faz o deploy de recipes, monitoriza o resmon e oferece chat em direto com os jogadores.",
    },
    vite: {
      definition:
        "Ferramenta de build moderna para aplicações web (HMR rápido, ESBuild). Usada para compilar as NUIs em React dos scripts MRI (mri_Qadmin, mri_Qspawn, etc.).",
    },
  },
}
