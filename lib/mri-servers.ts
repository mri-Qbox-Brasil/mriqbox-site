import serversData from "@/data/servers.json"

// Servidores que usam algum recurso MRI, gravados pela Action snapshot-stats
// (.release/snapshot-stats.js) a cada 3h. Já vêm sem repetição e ordenados por
// jogadores.
export type MriServer = {
  id: string
  name: string
  logo: string | null
  locale: string | null
  players: number
  maxPlayers: number
  avgPlayers: number
}

export const mriServers = serversData.servers as MriServer[]
export const mriServersUpdatedAt = serversData.updatedAt
export const totalServers = mriServers.length
export const totalPlayers = mriServers.reduce((sum, s) => sum + s.players, 0)

export const joinUrl = (id: string) => `https://cfx.re/join/${id}`
