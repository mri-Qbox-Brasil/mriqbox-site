export type TeamMember = {
  login: string
  avatar_url: string
  html_url: string
  kofi_username?: string
}

export const TEAM_MEMBERS_URL = "https://users.mriqbox.com.br/public/members.json"
export const DISCORD_INVITE_URL = "https://discord.com/api/v9/invites/uEfGD4mmVh?with_counts=true"

// Keeps the section from shipping empty in the static build when the members service is down.
const TEAM_MEMBERS_FALLBACK: TeamMember[] = [
  { login: "BrunoOlivera07", avatar_url: "https://github.com/BrunoOlivera07.png?size=224", html_url: "https://github.com/BrunoOlivera07" },
  { login: "ggfto", avatar_url: "https://github.com/ggfto.png?size=224", html_url: "https://github.com/ggfto", kofi_username: "ggfto" },
  { login: "GordelaG", avatar_url: "https://github.com/GordelaG.png?size=224", html_url: "https://github.com/GordelaG", kofi_username: "GordelaG" },
  { login: "gvs006", avatar_url: "https://github.com/gvs006.png?size=224", html_url: "https://github.com/gvs006", kofi_username: "gvs006" },
  { login: "JJ4hts", avatar_url: "https://github.com/JJ4hts.png?size=224", html_url: "https://github.com/JJ4hts", kofi_username: "JJ4hts" },
  { login: "mur4i", avatar_url: "https://github.com/mur4i.png?size=224", html_url: "https://github.com/mur4i", kofi_username: "mur4i" },
  { login: "SubZeroGLX", avatar_url: "https://github.com/SubZeroGLX.png?size=224", html_url: "https://github.com/SubZeroGLX", kofi_username: "SubZeroGLX" },
  { login: "xstells", avatar_url: "https://github.com/xstells.png?size=224", html_url: "https://github.com/xstells", kofi_username: "xstells" },
]

const DISCORD_MEMBERS_FALLBACK = 3500

// The remote list is authoritative, even when empty.
export function parseTeamMembers(data: unknown): TeamMember[] | null {
  return Array.isArray(data) ? (data as TeamMember[]) : null
}

export function parseDiscordMemberCount(data: unknown): number | null {
  const count = (data as { approximate_member_count?: unknown } | null)?.approximate_member_count
  return typeof count === "number" && count > 0 ? count : null
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(TEAM_MEMBERS_URL)
    return (res.ok && parseTeamMembers(await res.json())) || TEAM_MEMBERS_FALLBACK
  } catch {
    return TEAM_MEMBERS_FALLBACK
  }
}

export async function getDiscordMemberCount(): Promise<number> {
  try {
    const res = await fetch(DISCORD_INVITE_URL)
    return (res.ok && parseDiscordMemberCount(await res.json())) || DISCORD_MEMBERS_FALLBACK
  } catch {
    return DISCORD_MEMBERS_FALLBACK
  }
}
