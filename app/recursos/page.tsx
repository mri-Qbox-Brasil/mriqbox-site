import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Github, ExternalLink, Shield, MapPin, Users, Shirt, MessageCircle, LayoutDashboard, Package, Box } from "lucide-react"
import type { LucideIcon } from "lucide-react"
import { breadcrumb, jsonLd, softwareApplication } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Recursos & Scripts — MRI Qbox Brasil",
  description:
    "Catálogo completo dos scripts MRI Qbox Brasil: framework Qbox traduzida, painel admin, spawn, multichar, aparência, chat e o design system @mriqbox/ui-kit.",
  alternates: { canonical: "/recursos" },
  openGraph: {
    title: "Recursos & Scripts MRI Qbox Brasil",
    description: "8 scripts open source pra servidor FiveM brasileiro: framework + painel admin + spawn + multichar + mais.",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "Recursos & Scripts MRI Qbox Brasil" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Recursos", path: "/recursos" },
])

interface Resource {
  name: string
  description: string
  icon: LucideIcon
  repo: string
  docs?: string
  tags: string[]
}

const RESOURCES: Resource[] = [
  {
    name: "mri_Qbox",
    description:
      "Framework Qbox completa traduzida pra português brasileiro — base de todo servidor MRI. Inclui core, jobs, gangs, money, vehicles, garages e os módulos essenciais Qbox/Qbcore.",
    icon: Package,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qbox",
    docs: "https://docs.mriqbox.com.br/mri",
    tags: ["framework", "core", "qbox"],
  },
  {
    name: "mri_Qadmin",
    description:
      "Painel administrativo completo com sistema de plugins: outros resources MRI se registram e aparecem no sidebar. Gerencia jogadores, vehicles, items, bans, permissões, logs, e oferece dashboards live em tempo real.",
    icon: LayoutDashboard,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qadmin",
    docs: "https://docs.mriqbox.com.br/mri_qadmin",
    tags: ["admin", "painel", "plugins"],
  },
  {
    name: "mri_Qspawn",
    description:
      "Sistema de spawn com câmera cinematográfica configurável ingame. Spawns em data/spawns.json, settings (fade, duração, animações) editáveis pelo painel admin sem restart. Funciona standalone via /adminspawn ou embedded no mri_Qadmin.",
    icon: MapPin,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qspawn",
    docs: "https://docs.mriqbox.com.br/mri_qspawn",
    tags: ["spawn", "cinematica"],
  },
  {
    name: "mri_Qmultichar",
    description:
      "Seleção de personagem moderna com NUI React. Suporta múltiplos slots, criação/exclusão, deletion segura e integração com mri_Qappearance para customização visual no momento da criação.",
    icon: Users,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qmultichar",
    docs: "https://docs.mriqbox.com.br/mri_qmultichar",
    tags: ["multichar", "personagem"],
  },
  {
    name: "mri_Qappearance",
    description:
      "Editor de aparência e roupas com preview em tempo real. Bridge para diferentes sistemas (illenium, fivem nativo) e integração nativa com lojas de roupa e barbeiros.",
    icon: Shirt,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qappearance",
    docs: "https://docs.mriqbox.com.br/mri_qappearance",
    tags: ["aparencia", "roupas"],
  },
  {
    name: "mri_Qchat",
    description:
      "Sistema de chat in-game com canais, comandos, OOC/IC, mute e moderação. Integrado com permissões do mri_Qadmin.",
    icon: MessageCircle,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qchat",
    docs: "https://docs.mriqbox.com.br/mri_qchat",
    tags: ["chat", "moderacao"],
  },
  {
    name: "mri_Qloadscreen",
    description:
      "Loadscreen customizável que aparece enquanto o jogador conecta. Suporta vídeos, imagens, música e mensagens dinâmicas.",
    icon: Shield,
    repo: "https://github.com/mri-Qbox-Brasil/mri_Qloadscreen",
    docs: "https://docs.mriqbox.com.br/mri_qloadscreen",
    tags: ["loadscreen", "ux"],
  },
  {
    name: "@mriqbox/ui-kit",
    description:
      "Design system shadcn-style consumido por todas as NUIs MRI. Componentes (button, card, dialog, table, etc.) com tema unificado via convar mri:color. Publicado no npm como pacote compartilhado.",
    icon: Box,
    repo: "https://github.com/mri-Qbox-Brasil/mri-ui-kit",
    tags: ["ui", "design-system", "npm"],
  },
]

export default function RecursosPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />
      {RESOURCES.map((r) => (
        <script
          key={`schema-${r.name}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd(
              softwareApplication({
                name: r.name,
                description: r.description,
                url: r.repo,
                applicationCategory: "DeveloperApplication",
              })
            ),
          }}
        />
      ))}
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <header className="mb-12">
          <h1 className="heading-mri text-4xl md:text-5xl mb-4">Recursos & Scripts</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Tudo que a MRI Qbox Brasil mantém: a framework completa, painel admin, spawn cinemático,
            multichar, editor de aparência, chat, loadscreen e o design system compartilhado.
          </p>
        </header>

        <div className="grid gap-4 md:grid-cols-2">
          {RESOURCES.map((r) => {
            const Icon = r.icon
            return (
              <Card key={r.name} className="p-6 flex flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h2 className="text-xl font-semibold">{r.name}</h2>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{r.description}</p>
                <div className="flex flex-wrap gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                  {r.tags.map((tag) => (
                    <span key={tag} className="px-2 py-0.5 rounded bg-muted">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={r.repo} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3.5 h-3.5 mr-1.5" />
                      Código
                    </Link>
                  </Button>
                  {r.docs && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={r.docs} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-3.5 h-3.5 mr-1.5" />
                        Docs
                      </Link>
                    </Button>
                  )}
                </div>
              </Card>
            )
          })}
        </div>

        <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Quer começar?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Veja o guia rápido de instalação e configure seu servidor em minutos.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild>
              <Link href="/comecar">Artifacts DB</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="https://docs.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                Documentação completa
              </Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
