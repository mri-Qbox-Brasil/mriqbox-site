"use client"

import { useEffect, useState } from "react"
import { Github, Coffee } from "lucide-react"

interface Contributor {
  id: number | string
  login: string
  avatar_url: string
  kofi_username?: string
}

const LINK_BTN =
  "no-underline w-full inline-flex items-center justify-center gap-2 rounded-md border border-primary/20 bg-primary/15 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25"

function Avatar({ src, alt, initials }: { src: string; alt: string; initials: string }) {
  const [ok, setOk] = useState(true)
  return (
    <span className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-secondary text-lg font-semibold text-muted-foreground shadow-md">
      {initials}
      {ok && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 block h-full w-full max-w-none object-contain"
          style={{ margin: 0 }}
          onError={() => setOk(false)}
        />
      )}
    </span>
  )
}

function ContributorLink({ image, username, kofiName }: { image: string; username: string; kofiName?: string }) {
  const initials = username.slice(0, 2).toUpperCase()
  return (
    <div className="flex w-40 flex-col items-center gap-2">
      <Avatar src={image} alt={`${username}-avatar`} initials={initials} />
      <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className={LINK_BTN}>
        <Github className="h-4 w-4 shrink-0" />
        {username}
      </a>
      {kofiName && (
        <a href={`https://ko-fi.com/${kofiName}`} target="_blank" rel="noreferrer" className={LINK_BTN}>
          <Coffee className="h-4 w-4 shrink-0" />
          Apoie
        </a>
      )}
    </div>
  )
}

export default function Contributors() {
  const [contributors, setContributors] = useState<Contributor[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch("https://users.mriqbox.com.br/public/members.json")
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((data) => setContributors(data))
      .catch((err) => setError(err.message))
  }, [])

  if (error) {
    return <div className="text-destructive">Erro ao carregar dados: {error}</div>
  }

  return (
    <div className="mt-2 flex flex-wrap justify-evenly gap-4">
      {contributors.length > 0 ? (
        contributors.map((c) => (
          <ContributorLink key={c.id} image={c.avatar_url} username={c.login} kofiName={c.kofi_username} />
        ))
      ) : (
        <div>Carregando...</div>
      )}
    </div>
  )
}
