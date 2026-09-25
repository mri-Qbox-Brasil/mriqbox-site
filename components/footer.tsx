import Link from "next/link"
import Image from "next/image"

const LINK = "text-sm text-muted-foreground hover:text-white transition-colors"
const TITLE = "text-sm font-bold text-white tracking-wider uppercase mb-2"

export function Footer() {
  return (
    <footer className="w-full border-t border-white/5 bg-background">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-20 flex flex-col lg:flex-row justify-between gap-16">

        {/* Brand */}
        <div className="flex flex-col gap-8 max-w-sm">
          <Link href="/" className="flex items-center gap-3">
            <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="Logo" width={36} height={36} />
            <span className="font-bold text-xl text-white">MRI Qbox</span>
          </Link>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Uma base FiveM open source para criar sem limites. Feita no Brasil para cidades que querem ir além.
          </p>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 lg:gap-20">
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>Projeto</h4>
            <Link href="/sobre" className={LINK}>Sobre nós</Link>
            <Link href="/comecar" className={LINK}>Artifacts DB</Link>
            <Link href="/docs" className={LINK}>Documentação</Link>
            <Link href="https://tela.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className={LINK}>Compartilhar Tela</Link>
          </div>
          {/* Páginas de conteúdo/SEO — existiam desde o site antigo mas tinham
              ficado sem nenhum link interno (só no sitemap). */}
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>Conteúdo</h4>
            <Link href="/por-que-mri" className={LINK}>Manifesto</Link>
            <Link href="/comparativo" className={LINK}>Comparativo</Link>
            <Link href="/glossario" className={LINK}>Glossário</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className={TITLE}>Comunidade</h4>
            <Link href="/discord" className={LINK}>Discord</Link>
            <Link href="https://github.com/mri-Qbox-Brasil" className={LINK}>GitHub</Link>
            <Link href="/apoie" className={LINK}>Nos apoie</Link>
          </div>
          <div className="flex flex-col gap-4 col-span-2 md:col-span-1">
            <h4 className={TITLE}>Legal</h4>
            <Link href="/privacidade" className={LINK}>Privacidade</Link>
            <Link href="/termos" className={LINK}>Termos de Uso</Link>
            <span className="text-xs text-muted-foreground/60 mt-4">© {new Date().getFullYear()} MRI Qbox Brasil.<br />Licença GPL-3.0.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
