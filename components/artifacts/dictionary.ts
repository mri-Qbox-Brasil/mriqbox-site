import type { Locale } from "@/lib/i18n"

export const ARTIFACTS_DB_REPO_URL = "https://github.com/jgscripts/fivem-artifacts-db"
export const ARTIFACTS_DB_SITE_URL = "https://artifacts.jgscripts.com/"

const ptBR = {
  meta: {
    title: "Artifacts DB FiveM | MRI Qbox Brasil",
    description:
      "Consulte o artefato FXServer recomendado, baixe as versões para Windows ou Linux e veja builds com problemas conhecidos.",
    ogDescription: "Versões do FXServer sincronizadas com o banco de artefatos mantido pelo JG Scripts.",
  },
  back: "Voltar",
  home: "Início",
  title: "Artifacts DB",
  status: { synced: "Sincronizado com JG Scripts", fallback: "Exibindo dados de segurança" },
  intro:
    "Consulte a versão estável recomendada do FXServer e confira os artefatos com problemas conhecidos antes de atualizar seu servidor.",
  recommended: {
    label: "Versão recomendada",
    notAvailable: "N/D",
    stable: "Estável",
    unavailable: "Indisponível",
    syncedNote: "Build mais recente sem falhas conhecidas registradas no FiveM Artifacts DB.",
    fallbackNote:
      "A sincronização está temporariamente indisponível. Consulte a fonte original antes de escolher uma versão.",
  },
  issues: {
    label: "Problemas catalogados",
    note: "Versões ou intervalos documentados na base atual.",
    source: "Ver fonte no GitHub",
  },
  download: {
    title: "Baixar FXServer recomendado",
    build: "Build recomendada",
  },
  list: {
    title: "Debug de versões",
    subtitle: "Artefatos com falhas conhecidas e os motivos registrados pela comunidade.",
    openSource: "Abrir base original",
    placeholder: "Buscar versão ou problema...",
    searchLabel: "Buscar na lista de artefatos",
    clear: "Limpar busca",
    loadError: "A lista de debug não pôde ser carregada agora.",
    // {query} is replaced with the search text.
    noResults: "Nenhum artefato encontrado para “{query}”.",
  },
}

export type ArtifactsDictionary = typeof ptBR
export type ArtifactsListLabels = ArtifactsDictionary["list"]

const ptPT: ArtifactsDictionary = {
  meta: {
    title: "Artifacts DB FiveM | MRI Qbox Brasil",
    description:
      "Consulte o artefacto FXServer recomendado, descarregue as versões para Windows ou Linux e veja as builds com problemas conhecidos.",
    ogDescription: "Versões do FXServer sincronizadas com a base de artefactos mantida pela JG Scripts.",
  },
  back: "Voltar",
  home: "Início",
  title: "Artifacts DB",
  status: { synced: "Sincronizado com a JG Scripts", fallback: "A mostrar dados de reserva" },
  intro:
    "Consulte a versão estável recomendada do FXServer e verifique os artefactos com problemas conhecidos antes de atualizar o seu servidor.",
  recommended: {
    label: "Versão recomendada",
    notAvailable: "N/D",
    stable: "Estável",
    unavailable: "Indisponível",
    syncedNote: "A build mais recente sem falhas conhecidas registadas no FiveM Artifacts DB.",
    fallbackNote:
      "A sincronização está temporariamente indisponível. Consulte a fonte original antes de escolher uma versão.",
  },
  issues: {
    label: "Problemas catalogados",
    note: "Versões ou intervalos documentados na base atual.",
    source: "Ver a fonte no GitHub",
  },
  download: {
    title: "Descarregar o FXServer recomendado",
    build: "Build recomendada",
  },
  list: {
    title: "Diagnóstico de versões",
    subtitle: "Artefactos com falhas conhecidas e os motivos registados pela comunidade.",
    openSource: "Abrir a base original",
    placeholder: "Pesquisar versão ou problema...",
    searchLabel: "Pesquisar na lista de artefactos",
    clear: "Limpar pesquisa",
    loadError: "Não foi possível carregar a lista de diagnóstico de momento.",
    noResults: "Nenhum artefacto encontrado para “{query}”.",
  },
}

const es: ArtifactsDictionary = {
  meta: {
    title: "Artifacts DB FiveM | MRI Qbox Brasil",
    description:
      "Consulta el artifact de FXServer recomendado, descarga las versiones para Windows o Linux y revisa las builds con problemas conocidos.",
    ogDescription: "Versiones de FXServer sincronizadas con la base de artifacts que mantiene JG Scripts.",
  },
  back: "Volver",
  home: "Inicio",
  title: "Artifacts DB",
  status: { synced: "Sincronizado con JG Scripts", fallback: "Mostrando datos de respaldo" },
  intro:
    "Consulta la versión estable recomendada de FXServer y revisa los artifacts con problemas conocidos antes de actualizar tu servidor.",
  recommended: {
    label: "Versión recomendada",
    notAvailable: "N/D",
    stable: "Estable",
    unavailable: "No disponible",
    syncedNote: "La build más reciente sin fallas conocidas registradas en FiveM Artifacts DB.",
    fallbackNote:
      "La sincronización no está disponible por ahora. Consulta la fuente original antes de elegir una versión.",
  },
  issues: {
    label: "Problemas registrados",
    note: "Versiones o rangos documentados en la base actual.",
    source: "Ver la fuente en GitHub",
  },
  download: {
    title: "Descargar el FXServer recomendado",
    build: "Build recomendada",
  },
  list: {
    title: "Diagnóstico de versiones",
    subtitle: "Artifacts con fallas conocidas y los motivos que registró la comunidad.",
    openSource: "Abrir la base original",
    placeholder: "Buscar versión o problema...",
    searchLabel: "Buscar en la lista de artifacts",
    clear: "Limpiar búsqueda",
    loadError: "No se pudo cargar la lista de diagnóstico en este momento.",
    noResults: "No se encontró ningún artifact para “{query}”.",
  },
}

const en: ArtifactsDictionary = {
  meta: {
    title: "FiveM Artifacts DB | MRI Qbox Brasil",
    description:
      "Check the recommended FXServer artifact, download the Windows or Linux build and see which builds have known issues.",
    ogDescription: "FXServer versions synced with the artifacts database maintained by JG Scripts.",
  },
  back: "Back",
  home: "Home",
  title: "Artifacts DB",
  status: { synced: "Synced with JG Scripts", fallback: "Showing fallback data" },
  intro:
    "Check the recommended stable FXServer version and review the artifacts with known issues before you update your server.",
  recommended: {
    label: "Recommended version",
    notAvailable: "N/A",
    stable: "Stable",
    unavailable: "Unavailable",
    syncedNote: "Latest build with no known issues reported in FiveM Artifacts DB.",
    fallbackNote: "Sync is temporarily unavailable. Check the original source before picking a version.",
  },
  issues: {
    label: "Known issues",
    note: "Versions or ranges documented in the current database.",
    source: "View source on GitHub",
  },
  download: {
    title: "Download the recommended FXServer",
    build: "Recommended build",
  },
  list: {
    title: "Version debug",
    subtitle: "Artifacts with known issues and the reasons the community reported.",
    openSource: "Open the original database",
    placeholder: "Search a version or issue...",
    searchLabel: "Search the artifacts list",
    clear: "Clear search",
    loadError: "The debug list could not be loaded right now.",
    noResults: "No artifacts found for “{query}”.",
  },
}

export const artifactsDictionary: Record<Locale, ArtifactsDictionary> = { "pt-BR": ptBR, "pt-PT": ptPT, es, en }
