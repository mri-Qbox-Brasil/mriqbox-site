import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Github, MessageCircle, Heart, Code2, Globe } from "lucide-react"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Sobre a MRI Qbox Brasil — quem somos e por que existimos",
  description:
    "História, missão e equipe por trás da MRI Qbox Brasil — adaptação brasileira open source da framework Qbox para servidores FiveM.",
  alternates: { canonical: "/sobre" },
  openGraph: {
    title: "Sobre a MRI Qbox Brasil",
    description: "Comunidade brasileira mantenedora da adaptação Qbox open source.",
    type: "website",
  },
  twitter: { card: "summary", title: "Sobre a MRI Qbox Brasil" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Sobre", path: "/sobre" },
])

export default function SobrePage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <h1 className="heading-mri text-4xl md:text-5xl mb-6">Sobre a MRI Qbox Brasil</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Somos uma comunidade brasileira de desenvolvedores de FiveM que mantém a adaptação local da
          framework <strong className="text-foreground">Qbox</strong> (a evolução pós-fork do QBCore com
          integração nativa ao Overextended/ox_lib).
        </p>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              Por que existimos
            </h2>
            <p>
              A maioria dos servidores brasileiros de roleplay usa frameworks em inglês, com documentação
              fragmentada e adaptações feitas por terceiros (sem padrão e geralmente desatualizadas). A MRI
              Qbox nasceu pra resolver isso: <strong className="text-foreground">uma base oficial em
              português</strong>, atualizada junto com o upstream Qbox internacional, com documentação,
              suporte e padrões consistentes.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Nossa missão
            </h2>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                Manter <strong className="text-foreground">100% gratuita</strong> e{" "}
                <strong className="text-foreground">open source</strong> (GPL-3.0 / LGPL-3.0, mesmo
                modelo do Qbox e Overextended) a base que servidores
                brasileiros precisam pra começar
              </li>
              <li>
                <strong className="text-foreground">Documentar tudo em português</strong> de forma técnica e
                acessível, com exemplos reais
              </li>
              <li>
                Construir um <strong className="text-foreground">design system compartilhado</strong>{" "}
                (@mriqbox/ui-kit) para que scripts MRI tenham identidade visual consistente
              </li>
              <li>
                Promover boas práticas: versionamento semântico, CI/CD, conventional commits, testes
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              O que mantemos
            </h2>
            <p className="mb-4">
              Além da framework Qbox traduzida, mantemos uma suíte de scripts complementares prontos pra
              produção:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong className="text-foreground">mri_Qadmin</strong> — painel admin com sistema de
                plugins
              </li>
              <li>
                <strong className="text-foreground">mri_Qspawn</strong> — spawn cinematográfico configurável
                ingame
              </li>
              <li>
                <strong className="text-foreground">mri_Qmultichar</strong> — seleção de personagem moderna
              </li>
              <li>
                <strong className="text-foreground">mri_Qappearance</strong> — editor de aparência e roupas
              </li>
              <li>
                <strong className="text-foreground">mri_Qchat</strong> — chat in-game
              </li>
              <li>
                <strong className="text-foreground">@mriqbox/ui-kit</strong> — design system React/Tailwind
                compartilhado
              </li>
            </ul>
            <p className="mt-4">
              Lista completa em{" "}
              <Link href="/recursos" className="text-primary hover:underline">
                /recursos
              </Link>
              .
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">Como nos sustentamos</h2>
            <p>
              O projeto é mantido pela equipe da MRI Qbox Brasil em tempo voluntário. Os custos de
              infraestrutura (domínio, CDN, hosting da documentação) são cobertos por apoiadores via{" "}
              <a
                href="https://www.patreon.com/mriQboxBrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Patreon
              </a>
              {" "}e pela receita de anúncios no site. Tudo que entra é reinvestido em ferramentas e
              documentação.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">Contato</h2>
            <p className="mb-4">
              O canal principal de comunicação é o Discord. Issues técnicas vão pelo GitHub do repositório
              correspondente.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://docs.mriqbox.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentação
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
