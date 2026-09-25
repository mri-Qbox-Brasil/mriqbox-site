import Image from "next/image"

// Lista pública de apoiadores servida pelo mri-qbot (GET /public/supporters):
// quem tem cargo de apoiador no Discord. Busca no servidor e revalida a cada
// 10 min. Se a API falhar ou a lista vier vazia, a seção some.
const SUPPORTERS_API =
  process.env.SUPPORTERS_API_URL ?? "https://api.mriqbox.com.br/public/supporters"

type Supporter = { name: string; avatar: string }

async function getSupporters(): Promise<Supporter[]> {
  try {
    const res = await fetch(SUPPORTERS_API, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    })
    if (!res.ok) return []
    const data = (await res.json()) as { supporters?: Supporter[] }
    return Array.isArray(data.supporters) ? data.supporters : []
  } catch {
    return []
  }
}

export async function SupportersWall() {
  const supporters = await getSupporters()
  if (!supporters.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-2">Quem já apoia</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {supporters.length === 1
          ? "1 pessoa mantém o projeto vivo. Obrigado!"
          : `${supporters.length} pessoas mantêm o projeto vivo. Obrigado!`}
      </p>
      <ul className="flex flex-wrap gap-3">
        {supporters.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4"
          >
            <Image
              src={s.avatar}
              alt=""
              width={28}
              height={28}
              unoptimized
              className="rounded-full"
            />
            <span className="text-sm text-foreground">{s.name}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground/70 mt-4">
        Apoiadores aparecem aqui pelo nome e avatar do Discord.
      </p>
    </section>
  )
}
