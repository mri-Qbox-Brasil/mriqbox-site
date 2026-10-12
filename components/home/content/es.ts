import type { HomeDictionary } from "./pt-BR"

export const es: HomeDictionary = {
  meta: {
    title: "MRI Qbox Brasil | Framework FiveM Open Source",
    description:
      "Crea servidores FiveM con una base Qbox moderna, gratuita y en portugués. Instalación guiada, scripts optimizados, documentación completa y comunidad brasileña.",
    ogTitle: "MRI Qbox Brasil | La base FiveM hecha para Brasil",
    ogDescription: "Framework FiveM open source con Qbox, QBCore y Ox, instalación guiada y soporte de la comunidad brasileña.",
    twitterDescription: "Una base FiveM moderna, gratuita, optimizada y documentada en portugués.",
  },
  hero: {
    teamBadge: "Conoce a nuestro equipo",
    title: ["Menos configuración.", "Más creación."],
    subtitle:
      "Un framework FiveM open source basado en Qbox para que construyas servidores más rápidos, seguros y fáciles de mantener.",
  },
  chart: {
    servers: "servidores usando MRI",
    players: "jugadores en este momento",
    peak: "pico",
    lastDays: "últimos días",
    ariaLabel: "Jugadores conectados a lo largo del tiempo",
    empty:
      "Datos reales de servidores FiveM que usan scripts de MRI Qbox, actualizados periódicamente por 5metrics. El historial de uso aparecerá en los próximos días.",
  },
  installer: {
    eyebrow: "Nuevo instalador MRI disponible",
    title: "De la descarga al primer arranque. Sin complicaciones.",
    text: "El nuevo instalador te guía en cada paso, desde elegir el FXServer hasta configurar por completo el entorno MRI Qbox.",
    steps: ["FXServer", "Entorno", "MRI Qbox"],
    cta: "Abrir instalador",
  },
  mockup: {
    steps: ["Entorno", "Versión de Artifacts", "Receta", "Resumen", "Instalación", "Configuración", "Finalización"],
    next: "Siguiente",
    unavailable: "N/D",
    environment: {
      title: "Configura el entorno",
      text: "Elige dónde se instalará el servidor y configura la conexión.",
      baseFolder: "Carpeta base",
      database: "Conexión a la base de datos",
      installMariaDb: "Instalar MariaDB automáticamente",
      user: "Usuario",
      password: "Contraseña",
    },
    artifact: {
      title: "Versión de FXServer",
      text: "Selecciona la versión de los artifacts de FiveM que quieres usar.",
      officialPicks: "Recomendaciones oficiales",
      recommended: "Recomendado",
      knownIssues: "Problemas conocidos catalogados",
    },
    recipe: {
      title: "Receta del servidor",
      text: "¿Qué base te gustaría instalar en tu servidor?",
      base: "Base robusta y moderna con Ox_Core, recursos optimizados y scripts nativos.",
      beta: "Acceso anticipado a las novedades de MRI Qbox, disponible para quienes apoyan el desarrollo del proyecto.",
    },
    summary: {
      title: "Resumen de la instalación",
      text: "Revisa tus elecciones antes de iniciar el deploy.",
      baseFolder: "Carpeta base",
      artifact: "Artifact de FXServer",
      recommended: "Recomendado",
      recipe: "Receta",
      start: "Iniciar instalación",
    },
    install: { running: "Ejecutando tareas en segundo plano..." },
    config: {
      title: "Configuración del servidor",
      text: "¡Ya casi! Define los últimos detalles de tu entorno.",
      serverName: "Nombre del servidor",
      serverNameValue: "Mi Servidor FiveM",
      license: "Licencia CFX.re",
      getKey: "Obtener clave ↗",
      color: "Color del servidor (MRI)",
      finish: "Finalizar configuración",
    },
    success: {
      title: "¡Listo!",
      text: "Tu servidor se instaló correctamente y ya está listo para funcionar.",
      start: "Iniciar servidor ahora",
    },
    console: "Consola del servidor",
    thanks: {
      title: "¡Gracias!",
      subtitle: "Por elegir MRI Qbox",
      text: "Tu framework FiveM brasileño, open source y hecho con 💚 para la comunidad.",
    },
  },
  mriBot: {
    eyebrow: "Nuevo: MRI BOT",
    title: "Convierte tu Discord en un negocio.",
    text: "Tienda, tickets, encuestas y proyectos en un solo bot, administrado desde un panel web. Los pagos por Pix llegan directo a tu cuenta de Mercado Pago y el rol se entrega automáticamente.",
    highlights: {
      store: "Tienda con Pix y tarjeta",
      instantRole: "Rol entregado al instante",
      tickets: "Tickets profesionales",
      polls: "Encuestas por rol",
      freePlan: "Plan gratis para siempre",
    },
    cta: "Empezar gratis",
  },
  partners: {
    title: "Nuestros aliados",
    subtitle: "Tecnologías, comunidades y proyectos que apoyan y confían en MRI Qbox.",
  },
  team: {
    eyebrow: "Las personas detrás del código",
    title: ["Código abierto.", "Hecho por personas."],
    text: "Conoce a quienes dedican tiempo, experiencia y cuidado para que MRI Qbox siga evolucionando todos los días.",
    support: "Apoyar",
  },
  features: {
    title: "Ligera para empezar.",
    titleMuted: "Lista para crecer.",
    text: "Una base FiveM moderna, pensada para reducir el mantenimiento, evitar dependencias obsoletas y acompañar el crecimiento de tu ciudad.",
    performance: {
      title: "Rendimiento desde la arquitectura",
      text: "Construida sobre Qbox y el ecosistema Ox, con código ligero en el cliente y en el servidor para que tu ciudad sea rápida, estable y segura.",
    },
    ready: {
      title: "Lista desde el primer arranque",
      text: "Empieza con scripts profesionales ya configurados y traducidos al portugués. Menos tiempo traduciendo locales, más tiempo construyendo tu ciudad.",
    },
    ox: {
      title: "Ox desde la base",
      text: "Integración nativa con ox_lib, ox_inventory y ox_target desde el primer día, sin adaptaciones improvisadas.",
    },
  },
  metrics: {
    eyebrow: "MRI Qbox en números",
    title: "Todo para que tu ciudad empiece en grande.",
    text: "Código abierto, recursos integrados y una comunidad brasileña construyendo en conjunto.",
    free: { label: "Gratis y open source", text: "Libre para usar, estudiar y mejorar." },
    scripts: { label: "Scripts integrados", text: "Una base completa desde el primer arranque." },
    community: { label: "Comunidad activa", text: "Conocimiento compartido todos los días." },
    discord: { label: "Miembros en Discord", text: "Personas creando y jugando juntas." },
  },
  feedback: {
    title: "Lo que dice la comunidad",
    subtitle: "Mira lo que opinan quienes ya usan MRI Qbox en su día a día.",
    roles: {
      member: "Miembro de la comunidad",
      developer: "Desarrollador",
      ptCommunity: "Comunidad de Portugal",
      contentCreator: "Creadora de contenido",
      observer: "Observador",
    },
    quotes: {
      smith:
        "La base te da muchísimas posibilidades para crear scripts, a diferencia de otros frameworks donde crear un script es un enorme dolor de cabeza. Con mriqbox se avanza mucho, porque los caminos con ox son directos y la raíz del proyecto es clara y limpia, no como vrp, por ejemplo, donde administrar y desarrollar scripts es un desastre. ¡Felicitaciones al equipo!",
      alexandrear3:
        "Después de mucho tiempo buscando la base ideal, peleándome con bases filtradas llenas de errores y scripts mal optimizados, encontré MRI Qbox. Fue un hallazgo casual que cambió el rumbo de Legacy Empire. Por fin, una base totalmente en PT-BR, pensada para quien quiere profesionalismo sin el dolor de cabeza de traducir línea por línea.",
      nino:
        "¡La mejor base del momento! Estoy creando muchos scripts en ella con Antigravity, buenísima y fácil de manejar. Voy a compartir un trabajo de interfaz y un sistema de baile con modos y ranking, pero todavía no está listo. ¡Estoy logrando hacer todas las ideas que tengo en esta base!",
      koji: "¡El script mri_Qadmin está buenísimo! ¡Felicitaciones al equipo!",
      fazeres:
        "Los sigo desde hace poco, pero estoy planeando abrir un servidor aquí en Portugal y estoy considerando seriamente usar esta base. La humildad de ustedes es lo máximo.",
      smokey:
        "La base es buena, 10/10, y también puede ser el cimiento de tu proyecto. El equipo de programación merece felicitaciones, tiene muchísima paciencia... ⭐⭐⭐⭐⭐⭐⭐⭐⭐⭐",
      branca:
        "La usé en un directo para crear contenido y a mucha gente le encantó la base. Me encantó: fácil de instalar, bien completa y muy bien hecha. ¡Gracias, equipo! ❤️",
      lucasSousa:
        "Antes que nada, gran trabajo del equipo @MUR4I @G5 y del resto del equipo que no sé quiénes son jaja. Muy buena base, y encima gratis. Excelente trabajo.",
      vitimexe:
        "¡Buenísima para quien disfruta la interacción y la inmersión, es una gran opción! Claro que faltan algunos sistemas, ¡pero es perfecta!",
      lrwx:
        "Todavía no descargué la base, solo sigo a la comunidad desde hace unos días y, de lejos, es la mejor comunidad brasileña de FiveM... felicitaciones a los responsables.",
      araujo:
        "Excelente trabajo, me gustó la base y todo lo que podemos crear dentro de la ciudad. Sé que está en fase beta, pero está muy buena.",
      zerow: "Excelente producto, fácil de configurar y de sumarle nuevas actualizaciones. ¡Muy bueno!",
      gleibsonms: "Felicitaciones por la iniciativa. El producto ofrece muchísimo.",
      baumel:
        "Felicitaciones al equipo @MUR4I @G5 @Ailton Zamboti y al resto del equipo por el excelente trabajo de desarrollo. La optimización, la estabilidad y la facilidad de personalización son impresionantes y hacen que crear ciudades sea mucho más fluido. ¡El compromiso con las actualizaciones y el soporte a la comunidad marca toda la diferencia! 10/10",
    },
  },
  faq: {
    title: "Preguntas frecuentes",
    subtitle: "Todo lo que necesitas saber antes de empezar tu proyecto.",
    items: [
      {
        question: "¿Cuál es la diferencia entre MRI Qbox, Qbox y QBCore?",
        answer:
          "MRI Qbox es la adaptación brasileña de Qbox, la evolución moderna del ecosistema QBCore con integración nativa con Ox. Conserva la base que la comunidad ya conoce y suma traducción al portugués, documentación propia en portugués y recursos complementarios listos para servidores brasileños.",
      },
      {
        question: "¿De verdad es gratis?",
        answer:
          "Sí. MRI Qbox es gratuita y open source, con proyectos publicados bajo GPL-3.0 o LGPL-3.0. Puedes estudiar, modificar, contribuir y usar el software en proyectos comerciales, respetando la licencia de cada repositorio. La infraestructura se mantiene con el apoyo de la comunidad, de Patreon y de anuncios.",
      },
      {
        question: "¿Puedo usarla en un servidor comercial?",
        answer:
          "Sí. Las licencias permiten el uso comercial. Si distribuyes una versión modificada, puedes tener la obligación de publicar el código fuente y conservar los avisos de la licencia; consulta siempre la licencia del repositorio correspondiente. La marca y los logotipos de MRI Qbox tienen reglas propias y no deben representar otro proyecto sin autorización.",
      },
      {
        question: "¿Dónde encuentro soporte técnico?",
        answer:
          "El soporte es comunitario y voluntario, en el Discord oficial (en portugués). Para reportar bugs o sugerir nuevas funciones, abre un Issue en el repositorio correspondiente de GitHub. No hay SLA, pero las solicitudes con logs y pasos para reproducir el problema suelen atenderse más rápido.",
      },
      {
        question: "¿Cuánto tarda la instalación?",
        answer:
          "En condiciones normales, el nuevo instalador descarga y prepara la base MRI Qbox en unos 4 minutos. Al terminar, solo tienes que revisar la configuración del servidor y completar los ajustes específicos de tu ciudad.",
      },
      {
        question: "¿Cómo puedo contribuir al proyecto?",
        answer:
          "Puedes enviar Pull Requests, reportar bugs, sugerir mejoras, traducir contenido, mejorar la documentación o ayudar a otros miembros en Discord. Para apoyar la infraestructura y la continuidad del proyecto, también puedes contribuir a través de Patreon.",
      },
    ],
  },
  cta: {
    eyebrow: "Open source por principio. Brasileña de corazón. Hecha para ir más allá.",
    title: "Toda gran ciudad",
    titleEnd: "empieza por la base.",
    text: "Empieza gratis con MRI Qbox o únete al Discord para aprender, contribuir y construir junto a la comunidad brasileña.",
    download: "Descargar gratis",
    discord: "Unirse al Discord",
    github: "Ver en GitHub",
  },
}
