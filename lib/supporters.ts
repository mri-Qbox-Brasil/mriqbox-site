export type Supporter = { name: string; avatar: string }

// Public supporter list from mri-qbot (GET /public/supporters): Discord members with a supporter role.
export const SUPPORTERS_API =
  process.env.SUPPORTERS_API_URL ?? "https://api.mriqbox.com.br/public/supporters"

export function parseSupporters(data: unknown): Supporter[] | null {
  const list = (data as { supporters?: unknown } | null)?.supporters
  if (!Array.isArray(list)) return null
  return list.filter(
    (item): item is Supporter =>
      Boolean(item) && typeof item.name === "string" && typeof item.avatar === "string",
  )
}

export async function getSupporters(): Promise<Supporter[]> {
  try {
    const res = await fetch(SUPPORTERS_API, { signal: AbortSignal.timeout(5000) })
    if (!res.ok) return []
    return parseSupporters(await res.json()) ?? []
  } catch {
    return []
  }
}
