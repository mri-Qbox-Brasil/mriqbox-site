import type { ComparisonDictionary } from "./pt-BR"

export const es: ComparisonDictionary = {
  meta: {
    title: "MRI Qbox vs QBCore vs ESX vs Qbox: comparativa de frameworks FiveM",
    description:
      "Comparativa objetiva entre los principales frameworks para servidores FiveM: MRI Qbox, QBCore, ESX y Qbox internacional. Stack técnico, mantenimiento, comunidad, rendimiento e idioma.",
    ogTitle: "MRI Qbox vs QBCore vs ESX vs Qbox: comparativa",
    ogDescription: "¿Qué framework FiveM elegir? Tabla detallada con criterios técnicos y de comunidad.",
    articleDescription:
      "Comparativa objetiva entre los principales frameworks FiveM brasileños e internacionales. Tabla de 10 criterios y análisis de cuándo usar cada uno.",
  },
  home: "Inicio",
  breadcrumb: "Comparativa",
  back: "Volver",
  eyebrow: "Análisis",
  updated: "Actualizado el",
  title: "Comparativa de frameworks FiveM",
  intro: {
    before: "¿Qué framework elegir para tu servidor FiveM de roleplay? Análisis objetivo entre ",
    names: ["MRI Qbox", "Qbox internacional", "QBCore", "ESX"],
    and: " y ",
    after: ", las cuatro opciones más usadas hoy en los servidores brasileños.",
  },
  summary: {
    title: "Resumen rápido",
    items: [
      {
        name: "MRI Qbox",
        text: "Qbox traducido + scripts MRI listos para usar. La mejor opción si quieres arrancar rápido en portugués de Brasil sin armar todo desde cero.",
      },
      {
        name: "Qbox",
        text: "moderno, con gran rendimiento y una base técnica excelente. La mejor opción si lees inglés técnico y quieres flexibilidad total.",
      },
      {
        name: "QBCore",
        text: "comunidad gigantesca y el mayor catálogo de scripts de pago en Tebex. La mejor opción si lo que más te importa es tener scripts listos disponibles.",
      },
      {
        name: "ESX",
        text: "legado histórico, todavía activo gracias a ESX Legacy. La mejor opción si heredaste un servidor ESX y no quieres migrar.",
      },
    ],
  },
  table: {
    title: "Tabla comparativa",
    criterion: "Criterio",
    rows: [
      {
        criterion: "Idioma nativo",
        mri: { value: "Portugués (BR)" },
        qbox: { value: "Inglés" },
        qbcore: { value: "Inglés (traducciones de la comunidad)" },
        esx: { value: "Inglés (traducciones de la comunidad)" },
      },
      {
        criterion: "Licencia",
        mri: { value: "GPL-3.0 / LGPL-3.0" },
        qbox: { value: "GPL-3.0" },
        qbcore: { value: "GPL-3.0" },
        esx: { value: "GPL-3.0" },
      },
      {
        criterion: "Dependencias base",
        mri: { value: "Qbox + ox_lib + oxmysql" },
        qbox: { value: "ox_lib + oxmysql nativo" },
        qbcore: { value: "ox_lib (reciente) o legacy" },
        esx: { value: "essentialmode (legacy) u oxmysql" },
      },
      {
        criterion: "Rendimiento (resmon)",
        mri: { value: "yes", note: "Igual que Qbox upstream" },
        qbox: { value: "yes", note: "Optimizado, threading asíncrono" },
        qbcore: { value: "partial", note: "Bueno, pero tiene callbacks síncronos legacy" },
        esx: { value: "partial", note: "Depende mucho de la versión" },
      },
      {
        criterion: "Documentación en portugués",
        mri: { value: "yes", note: "mriqbox.com.br/docs" },
        qbox: { value: "no", note: "Solo en inglés" },
        qbcore: { value: "partial", note: "Tutoriales sueltos en foros/YouTube" },
        esx: { value: "partial", note: "Comunidad brasileña antigua, fragmentada" },
      },
      {
        criterion: "Mantenimiento activo",
        mri: { value: "yes", note: "Mantenida + sincronizada con Qbox upstream" },
        qbox: { value: "yes", note: "Equipo de Overextended activo" },
        qbcore: { value: "yes", note: "Comunidad grande" },
        esx: { value: "partial", note: "ESX Legacy activo, ESX original abandonado" },
      },
      {
        criterion: "Sistema de plugins oficial",
        mri: { value: "yes", note: "mri_Qadmin con barra lateral de plugins" },
        qbox: { value: "partial", note: "Convención, no estándar" },
        qbcore: { value: "no" },
        esx: { value: "no" },
      },
      {
        criterion: "Curva de aprendizaje",
        mri: { value: "Suave (portugués + docs)" },
        qbox: { value: "Media (exige inglés técnico)" },
        qbcore: { value: "Media (legacy menos exigente)" },
        esx: { value: "Suave (gran comunidad brasileña)" },
      },
      {
        criterion: "Compatibilidad con scripts de pago de Tebex",
        mri: { value: "yes", note: "Acepta scripts Qbox/QBCore" },
        qbox: { value: "yes" },
        qbcore: { value: "yes", note: "Mayor catálogo en Tebex" },
        esx: { value: "yes", note: "Mayor catálogo histórico" },
      },
      {
        criterion: "Ecosistema de scripts oficiales",
        mri: { value: "Suite MRI (Qadmin, Qspawn, Qmultichar, etc.)" },
        qbox: { value: "scripts qbx_*" },
        qbcore: { value: "scripts qb-*" },
        esx: { value: "scripts esx_*" },
      },
    ],
  },
  versus: [
    {
      title: "MRI Qbox vs Qbox internacional",
      paragraphs: [
        {
          text: "MRI Qbox es, literalmente, Qbox traducido al portugués de Brasil y sincronizado con el upstream de Overextended. No es un fork que se aparta del original, es una adaptación que toma cada release de Qbox internacional y traduce mensajes, NPC, jobs, gangs y documentación.",
        },
        {
          label: "Cuándo elegir MRI:",
          text: "servidor brasileño, equipo que no lee inglés técnico con fluidez, que quiere documentación en portugués y scripts complementarios listos (panel de administración, spawn cinematográfico, multichar moderno).",
        },
        {
          label: "Cuándo elegir Qbox internacional:",
          text: "equipo bilingüe, personalización profunda prevista, preferencia por seguir el upstream en tiempo real sin una capa de traducción.",
        },
      ],
    },
    {
      title: "MRI Qbox vs QBCore",
      paragraphs: [
        {
          text: "QBCore fue la base de Qbox: Qbox es el fork moderno de QBCore, con integración nativa de ox_lib y mejoras de rendimiento. Por lo tanto, MRI Qbox (que desciende de Qbox) también hereda esas mejoras.",
        },
        {
          text: "QBCore todavía tiene una comunidad activa y el mayor catálogo histórico de scripts de pago en Tebex. Muchos scripts QBCore funcionan directamente en Qbox/MRI con pequeños ajustes (la compatibilidad es alta), pero algunos dependen de helpers propios de QB.",
        },
        {
          label: "Veredicto:",
          text: "si empiezas hoy desde cero, MRI Qbox (o Qbox) te da una base más moderna. Si heredaste o ya compraste muchos scripts QBCore, quédate en QBCore.",
        },
      ],
    },
    {
      title: "MRI Qbox vs ESX",
      paragraphs: [
        {
          text: "ESX y Qbox son frameworks de generaciones distintas. ESX viene de los primeros años de FiveM (originalmente basado en essentialmode), Qbox nace de un diseño moderno (ox_lib + arquitectura modular).",
        },
        {
          text: "ESX tiene un catálogo de scripts gigantesco y una comunidad brasileña muy antigua y activa. Por otro lado, su arquitectura es más difícil de mantener: muchos scripts ESX exigen parches manuales en cada actualización.",
        },
        {
          label: "Veredicto:",
          text: "ESX solo tiene sentido para un servidor existente que ya invirtió en scripts ESX. Para empezar hoy, MRI Qbox/Qbox es la mejor opción técnica.",
        },
      ],
    },
  ],
  cta: {
    title: "¿Listo para empezar?",
    text: "Mira la lista completa de scripts de la suite MRI y la guía de instalación.",
    button: "Artifacts DB",
  },
}
