import type { GlossaryDictionary } from "./pt-BR"

export const es: GlossaryDictionary = {
  meta: {
    title: "Glosario FiveM & Qbox: términos técnicos para desarrollar servidores",
    description:
      "Diccionario completo de los términos que se usan al desarrollar servidores FiveM con Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin y más. Escrito para desarrolladores brasileños.",
    ogTitle: "Glosario FiveM & Qbox: términos técnicos",
    ogDescription: "Diccionario de términos de desarrollo FiveM, explicados en español.",
    articleDescription:
      "Diccionario de los términos que se usan al desarrollar en FiveM con Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin y más.",
  },
  home: "Inicio",
  breadcrumb: "Glosario",
  back: "Volver",
  eyebrow: "Referencia",
  updated: "Actualizado el",
  title: "Glosario FiveM & Qbox",
  intro:
    "Diccionario de los términos técnicos más usados al desarrollar servidores FiveM con Qbox. Escrito para desarrolladores brasileños que están empezando o que quieren entender mejor el ecosistema.",
  missing: {
    title: "¿Falta algún término?",
    text: "Sugiérelo en el Discord oficial: agregamos los más pedidos en la próxima actualización.",
    cta: "Sugerir un término en Discord",
  },
  terms: {
    ace: {
      definition:
        "Sistema de permisos nativo de FXServer basado en identifiers y principals. Define quién puede ejecutar comandos de administración o acceder a recursos restringidos. Se configura en el server.cfg con add_ace.",
      example: "add_ace identifier.fivem:TU_ID command allow",
    },
    ambient: {
      definition:
        "En GTA V, se refiere a los NPC y vehículos que el motor del juego reparte automáticamente por el mapa. En scripts de roleplay, normalmente conviene reducirlos o desactivarlos para ganar rendimiento.",
    },
    callback: {
      definition:
        "Mecanismo de ox_lib para la comunicación cliente-servidor con respuesta asíncrona. Reemplaza el viejo patrón de TriggerServerEvent + TriggerClientEvent para pares de petición y respuesta.",
      example: "lib.callback.await('plugintest:server:getConfig', false)",
    },
    cef: {
      definition:
        "Motor que renderiza la NUI en FiveM. Usa una versión de Chromium bastante antigua: algunas funciones modernas de CSS no funcionan, como backdrop-filter:blur.",
    },
    createThread: {
      definition:
        "Función de FiveM para ejecutar código asíncrono en bucle. Es el patrón en Lua para cualquier comportamiento continuo (bucles de renderizado, consulta periódica de estado, etc.).",
    },
    convar: {
      definition:
        "Console variable de FXServer. Configuración global que se define en el server.cfg (setr foo bar) y se lee con GetConvar('foo', 'default'). Se puede compartir entre resources.",
      example: 'setr mri:color "#00E699"',
    },
    dui: {
      definition:
        "Sistema de FiveM para renderizar páginas web como texturas en el mundo 3D, usado para waypoints, carteles y pantallas dentro del juego. A diferencia de la NUI, no cubre toda la pantalla.",
    },
    esx: {
      definition:
        "Framework clásico de FiveM basado en essentialmode. Rival histórico de QBCore. Hoy se mantiene a través del fork ESX Legacy. Tiene un catálogo enorme de scripts de pago.",
    },
    fxmanifest: {
      definition:
        "Archivo de manifiesto obligatorio en todo resource de FiveM. Declara client_scripts, server_scripts, ui_page, files, dependencias, versión de Lua y capabilities.",
    },
    fxserver: {
      definition:
        "Servidor oficial de FiveM. Ejecuta los scripts, gestiona las conexiones de los jugadores y expone la API que usan los resources. Suele correr integrado en txAdmin.",
    },
    gpl: {
      definition:
        "Licencia open source con copyleft fuerte, usada por Qbox, QBCore, ox_inventory y MRI Qbox. Permite el uso comercial, pero exige que los forks distribuidos mantengan el código abierto.",
    },
    lgpl: {
      definition:
        "Variante más permisiva de la GPL, usada en bibliotecas (ox_lib, @mriqbox/ui-kit). Permite que proyectos privativos usen la biblioteca sin volverse GPL; solo hay que publicar los cambios hechos a la biblioteca.",
    },
    nui: {
      definition:
        "Sistema de FiveM para mostrar una interfaz web encima del juego. Carga HTML/CSS/JS dentro de un iframe CEF. Para comunicar Lua ↔ JS usa SendNUIMessage y RegisterNUICallback.",
    },
    oxLib: {
      definition:
        "Biblioteca oficial de Overextended para FiveM. Ofrece menús, notificaciones, diálogos de input, callbacks tipados, sistema de locales y decenas de utilidades. Es la base de todo script Qbox moderno.",
    },
    oxInventory: {
      definition:
        "Sistema de inventario moderno de Overextended. Reemplazó a los inventarios legacy (qb-inventory, esx_inventory). Es el estándar actual en servidores Qbox/MRI.",
    },
    oxmysql: {
      definition:
        "Driver MySQL oficial de Overextended para FXServer. Reemplazó al antiguo mysql-async. Rinde mejor y sus queries se basan en promesas.",
    },
    qbcore: {
      definition:
        "Framework popular de FiveM, base de Qbox. Modular, con una comunidad enorme y el mayor catálogo de scripts de pago en Tebex. Técnicamente menos moderno que Qbox.",
    },
    qbox: {
      definition:
        "Fork moderno de QBCore mantenido por Overextended. Integración nativa con ox_lib, threading asíncrono y mejor rendimiento. Es la base de MRI Qbox.",
    },
    recipe: {
      definition:
        "Archivo de receta de txAdmin que define todos los resources, configuraciones y el esquema de base de datos necesarios para levantar un servidor de forma automática. MRI Qbox publica una recipe oficial.",
    },
    resource: {
      definition:
        "Unidad de código en FiveM: una carpeta con fxmanifest.lua y scripts Lua/UI. FXServer la carga con ensure foo en el server.cfg.",
    },
    resmon: {
      definition:
        "Resource Monitor: herramienta de FiveM dentro del juego (F8 → resmon) que muestra el uso de CPU de cada resource. Clave para depurar problemas de rendimiento.",
    },
    scenario: {
      definition:
        "Animación ambiental prediseñada de GTA V (por ejemplo, WORLD_HUMAN_SMOKING, WORLD_HUMAN_HANG_OUT_STREET). Se usa con TaskStartScenarioInPlace para darles vida a los peds.",
    },
    shadcn: {
      definition:
        "Biblioteca de componentes React para copiar y pegar, basada en Radix + Tailwind. Es el estilo visual de las NUI de MRI, a través de @mriqbox/ui-kit.",
    },
    tebex: {
      definition:
        "Marketplace que usa la comunidad FiveM para vender scripts, mapas, vehículos y assets. Plataforma de pago + licencias por clave.",
    },
    txadmin: {
      definition:
        "Panel web oficial para administrar servidores FiveM. Normalmente ya viene integrado en FXServer. Hace el deploy de recipes, monitorea el resmon y ofrece chat en vivo con los jugadores.",
    },
    vite: {
      definition:
        "Herramienta de build moderna para aplicaciones web (HMR rápido, ESBuild). Se usa para compilar las NUI en React de los scripts MRI (mri_Qadmin, mri_Qspawn, etc.).",
    },
  },
}
