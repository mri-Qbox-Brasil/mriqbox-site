import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ArrowUpRight, Check, Heart, MessageCircle, Star } from "lucide-react"
import { Github } from "@/components/icons/github"
import { SupportersWall } from "@/components/supporters-wall"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Nos apoie | MRI Qbox Brasil",
  description:
    "Apoie a MRI Qbox Brasil pelo Mercado Pago, em reais, ou pelo Patreon. O apoio mensal mantém a base FiveM gratuita e open source.",
  alternates: { canonical: "/apoie" },
  openGraph: {
    title: "Nos apoie | MRI Qbox Brasil",
    description: "Apoio mensal em reais pelo Mercado Pago ou pelo Patreon.",
    url: "/apoie",
    type: "website",
  },
  twitter: { card: "summary", title: "Nos apoie | MRI Qbox Brasil" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Nos apoie", path: "/apoie" },
])

// Preços espelham o que está publicado em cada plataforma. Ao mudar lá,
// atualizar aqui. Os benefícios são os mesmos em qualquer forma de apoio.
const SHOP_URL = "https://shop.mriqbox.com.br/mri"
const PATREON_URL = "https://www.patreon.com/mriQboxBrasil/membership"

const BENEFITS = [
  {
    title: "Na comunidade",
    items: [
      "Cargo de Apoiador no Discord",
      "Chat exclusivo com a Equipe MRI para bate-papo e dúvidas rápidas",
      "Suporte com prioridade",
      "Voto em enquetes exclusivas",
      "Chat de sugestões e de report de bugs da base",
    ],
  },
  {
    // Espelha o que o instalador libera pro cargo de apoiador (mri_installer_rust).
    title: "No Instalador Oficial",
    items: [
      "Scripts de acesso antecipado, instalados direto no seu servidor",
      "Receita Beta antes de todo mundo",
      "Aba de banco de dados: conexão e backups automáticos",
      "Edição da identidade do servidor: logo, banners e server.cfg",
    ],
  },
]

function Benefits({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3 text-sm">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ApoiePage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-primary mb-4 uppercase tracking-wider font-mono font-bold">
            <Heart className="w-4 h-4" />
            <span>Nos apoie</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">
            Ajude a manter a MRI Qbox gratuita
          </h1>
          <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
            A base, a documentação e o suporte são e continuam sendo{" "}
            <strong className="text-foreground">100% gratuitos e open source</strong>. O apoio mensal
            de quem pode contribuir é o que mantém o projeto andando. Escolha a forma que for melhor
            pra você.
          </p>
        </div>

        <Card className="p-8 mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-2">O que você recebe</h2>
          <p className="text-sm text-muted-foreground mb-6">
            Os benefícios são os mesmos em qualquer forma de apoio. Muda só como você paga.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground">
            {BENEFITS.map((group) => (
              <div key={group.title}>
                <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">{group.title}</h3>
                <Benefits items={group.items} />
              </div>
            ))}
          </div>
        </Card>

        <h2 className="text-2xl font-bold text-foreground mb-8">Escolha como apoiar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {/* Mercado Pago em destaque: é o caminho em reais, sem IOF/câmbio */}
          <Card className="p-8 flex flex-col gap-6 border-primary/40 relative">
            <span className="absolute -top-3 left-8 text-[10px] font-bold uppercase tracking-widest bg-primary text-primary-foreground px-3 py-1 rounded-full">
              Recomendado para o Brasil
            </span>
            <div>
              <h2 className="text-2xl font-bold text-foreground">Mercado Pago</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Em reais, sem dólar e sem IOF. Pagamento pela nossa loja.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Mensal</div>
                <div className="text-2xl font-extrabold text-foreground mt-1">R$ 50</div>
                <div className="text-xs text-muted-foreground">por mês</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Anual</div>
                <div className="text-2xl font-extrabold text-foreground mt-1">R$ 500</div>
                <div className="text-xs text-muted-foreground">por 12 meses · 2 meses grátis</div>
              </div>
            </div>

            <div className="flex-1" />

            <Button asChild size="lg" className="w-full font-bold">
              <Link href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                Apoiar pelo Mercado Pago
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>

          <Card className="p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Patreon</h2>
              <p className="text-sm text-muted-foreground mt-1">
                Cobrado em dólar. Bom pra quem está fora do Brasil ou já usa o Patreon.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Apoiador</div>
              <div className="text-2xl font-extrabold text-foreground mt-1">≈ R$ 62,50</div>
              <div className="text-xs text-muted-foreground">por mês · varia com o câmbio e o IOF</div>
            </div>

            <div className="flex-1" />

            <Button asChild size="lg" variant="outline" className="w-full font-bold">
              <Link href={PATREON_URL} target="_blank" rel="noopener noreferrer">
                Apoiar pelo Patreon
                <ArrowUpRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </Card>
        </div>

        <SupportersWall />

        <section className="mt-16 max-w-3xl">
          <h2 className="text-2xl font-bold text-foreground mb-3">Outras formas de ajudar</h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Não dá pra contribuir com dinheiro agora? Tudo bem, isso também ajuda muito:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="https://github.com/mri-Qbox-Brasil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors flex flex-col gap-2"
            >
              <Star className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Dê uma estrela</span>
              <span className="text-sm text-muted-foreground">Nos repositórios do GitHub.</span>
            </Link>
            <Link
              href="https://github.com/mri-Qbox-Brasil"
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors flex flex-col gap-2"
            >
              <Github className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Contribua</span>
              <span className="text-sm text-muted-foreground">Com código, issues ou documentação.</span>
            </Link>
            <Link
              href="/discord"
              className="p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-colors flex flex-col gap-2"
            >
              <MessageCircle className="w-5 h-5 text-primary" />
              <span className="font-bold text-foreground">Ajude no Discord</span>
              <span className="text-sm text-muted-foreground">Tirando dúvidas de quem está começando.</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
