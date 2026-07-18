export interface BrokenArtifact {
  artifact: string
  reason: string
}

export interface ArtifactsDb {
  recommendedArtifact: string
  windowsDownloadLink: string
  linuxDownloadLink: string
  brokenArtifacts: BrokenArtifact[]
  synced: boolean
}

const ARTIFACTS_DB_URL = "https://artifacts.jgscripts.com/jsonv2"

const FALLBACK: ArtifactsDb = {
  recommendedArtifact: "N/D",
  windowsDownloadLink: "https://runtime.fivem.net/artifacts/fivem/build_server_windows/master/",
  linuxDownloadLink: "https://runtime.fivem.net/artifacts/fivem/build_proot_linux/master/",
  brokenArtifacts: [],
  synced: false,
}

export async function getArtifactsDb(): Promise<ArtifactsDb> {
  try {
    const response = await fetch(ARTIFACTS_DB_URL, {
      next: { revalidate: 300 },
      headers: { Accept: "application/json" },
    })

    if (!response.ok) throw new Error(`Artifacts DB respondeu HTTP ${response.status}`)

    const data: unknown = await response.json()
    if (!data || typeof data !== "object") throw new Error("Resposta inválida do Artifacts DB")

    const db = data as Record<string, unknown>
    if (
      typeof db.recommendedArtifact !== "string" ||
      typeof db.windowsDownloadLink !== "string" ||
      typeof db.linuxDownloadLink !== "string" ||
      !Array.isArray(db.brokenArtifacts)
    ) {
      throw new Error("Formato incompatível do Artifacts DB")
    }

    const brokenArtifacts = db.brokenArtifacts
      .filter(
        (item): item is BrokenArtifact =>
          Boolean(item) &&
          typeof item === "object" &&
          typeof (item as BrokenArtifact).artifact === "string" &&
          typeof (item as BrokenArtifact).reason === "string",
      )
      .sort((a, b) => {
        const versionA = Number.parseInt(a.artifact.match(/\d+/)?.[0] ?? "0", 10)
        const versionB = Number.parseInt(b.artifact.match(/\d+/)?.[0] ?? "0", 10)
        return versionB - versionA || b.artifact.localeCompare(a.artifact, undefined, { numeric: true })
      })

    return {
      recommendedArtifact: db.recommendedArtifact,
      windowsDownloadLink: db.windowsDownloadLink,
      linuxDownloadLink: db.linuxDownloadLink,
      brokenArtifacts,
      synced: true,
    }
  } catch {
    return FALLBACK
  }
}
