// Substitui GIFs de tutorial nos docs. Um GIF de 32s em 692x388 pesa ~42 MB;
// o mesmo conteudo em H.264 fica em ~1.8 MB (96% menor) e ainda ganha
// controles pra pausar/voltar, o que um GIF nao oferece.
//
// Assim como o DocsImg do mdx-components, o src precisa do basePath manual:
// assets em public/docs nao recebem o prefixo do Next automaticamente.
export function Video({
  src,
  poster,
  alt,
  className,
}: {
  src: string
  poster?: string
  alt?: string
  className?: string
}) {
  const bp = process.env.NEXT_PUBLIC_BASE_PATH ?? ""
  const prefix = (p: string) => (p.startsWith("/docs/") ? `${bp}${p}` : p)

  return (
    <video
      src={prefix(src)}
      poster={poster ? prefix(poster) : undefined}
      aria-label={alt}
      className={className ?? "w-full rounded-lg border border-fd-border"}
      autoPlay
      loop
      muted
      playsInline
      controls
      preload="metadata"
    />
  )
}

export default Video
