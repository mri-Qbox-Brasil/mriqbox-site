import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Check, X, Minus } from "lucide-react"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "MRI Qbox vs QBCore vs ESX vs Qbox — comparativo de frameworks FiveM",
  description:
    "Comparativo objetivo entre as principais frameworks de servidor FiveM: MRI Qbox, QBCore, ESX e Qbox internacional. Stack técnica, manutenção, comunidade, performance e idioma.",
  alternates: { canonical: "/comparativo" },
  openGraph: {
    title: "MRI Qbox vs QBCore vs ESX vs Qbox — comparativo",
    description: "Qual framework FiveM escolher? Tabela detalhada com critérios técnicos e de comunidade.",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Comparativo de frameworks FiveM brasileiras" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Comparativo", path: "/comparativo" },
])

type Cell = { value: "yes" | "no" | "partial"; note?: string } | { value: string }

const ROWS: { criterio: string; mri: Cell; qbox: Cell; qbcore: Cell; esx: Cell }[] = [
  {
    criterio: "Idioma nativo",
    mri: { value: "Português (BR)" },
    qbox: { value: "Inglês" },
    qbcore: { value: "Inglês (traduções via comunidade)" },
    esx: { value: "Inglês (traduções via comunidade)" },
  },
  {
    criterio: "Licença",
    mri: { value: "GPL-3.0 / LGPL-3.0" },
    qbox: { value: "GPL-3.0" },
    qbcore: { value: "GPL-3.0" },
    esx: { value: "GPL-3.0" },
  },
  {
    criterio: "Base de dependências",
    mri: { value: "Qbox + ox_lib + oxmysql" },
    qbox: { value: "ox_lib + oxmysql nativo" },
    qbcore: { value: "ox_lib (recente) ou legacy" },
    esx: { value: "essentialmode (legacy) ou oxmysql" },
  },
  {
    criterio: "Performance (resmon)",
    mri: { value: "yes", note: "Igual ao Qbox upstream" },
    qbox: { value: "yes", note: "Otimizado, threading async" },
    qbcore: { value: "partial", note: "Bom mas tem callbacks sync legacy" },
    esx: { value: "partial", note: "Depende fortemente da versão" },
  },
  {
    criterio: "Documentação em português",
    mri: { value: "yes", note: "docs.mriqbox.com.br" },
    qbox: { value: "no", note: "Só inglês" },
    qbcore: { value: "partial", note: "Tutoriais soltos em fórum/YouTube" },
    esx: { value: "partial", note: "Comunidade BR antiga, fragmentada" },
  },
  {
    criterio: "Atualização ativa",
    mri: { value: "yes", note: "Mantida + sync com upstream Qbox" },
    qbox: { value: "yes", note: "Time Overextended ativo" },
    qbcore: { value: "yes", note: "Comunidade grande" },
    esx: { value: "partial", note: "ESX Legacy ativo, ESX original abandonado" },
  },
  {
    criterio: "Plugin system oficial",
    mri: { value: "yes", note: "mri_Qadmin com sidebar de plugins" },
    qbox: { value: "partial", note: "Convenção, não padrão" },
    qbcore: { value: "no" },
    esx: { value: "no" },
  },
  {
    criterio: "Curva de aprendizado",
    mri: { value: "Suave (PT + docs)" },
    qbox: { value: "Média (exige inglês técnico)" },
    qbcore: { value: "Média (legacy menos exigente)" },
    esx: { value: "Suave (comunidade BR grande)" },
  },
  {
    criterio: "Compatibilidade com scripts pagos do Tebex",
    mri: { value: "yes", note: "Aceita scripts Qbox/Qbcore" },
    qbox: { value: "yes" },
    qbcore: { value: "yes", note: "Maior catálogo no Tebex" },
    esx: { value: "yes", note: "Maior catálogo histórico" },
  },
  {
    criterio: "Ecossistema de scripts oficiais",
    mri: { value: "Suite MRI (Qadmin, Qspawn, Qmultichar, etc)" },
    qbox: { value: "qbx_* scripts" },
    qbcore: { value: "qb-* scripts" },
    esx: { value: "esx_* scripts" },
  },
]

function cellRender(c: Cell) {
  if ("note" in c && c.note && (c.value === "yes" || c.value === "no" || c.value === "partial")) {
    return (
      <div className="flex items-start gap-2">
        {c.value === "yes" && <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />}
        {c.value === "no" && <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />}
        {c.value === "partial" && <Minus className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />}
        <span className="text-xs text-muted-foreground">{c.note}</span>
      </div>
    )
  }
  if (c.value === "yes") return <Check className="w-4 h-4 text-primary" />
  if (c.value === "no") return <X className="w-4 h-4 text-destructive" />
  if (c.value === "partial") return <Minus className="w-4 h-4 text-muted-foreground" />
  return <span className="text-sm">{c.value}</span>
}

export default function ComparativoPage() {
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

        <header className="mb-12">
          <h1 className="heading-mri text-4xl md:text-5xl mb-4">Comparativo de frameworks FiveM</h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            Qual framework escolher pro seu servidor FiveM de roleplay? Análise objetiva entre{" "}
            <strong className="text-foreground">MRI Qbox</strong>,{" "}
            <strong className="text-foreground">Qbox internacional</strong>,{" "}
            <strong className="text-foreground">QBCore</strong> e{" "}
            <strong className="text-foreground">ESX</strong> — as quatro opções mais usadas em servidores
            brasileiros hoje.
          </p>
        </header>

        <section className="space-y-6 text-muted-foreground leading-relaxed mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">Resumo rápido</h2>
            <ul className="space-y-3">
              <li>
                <strong className="text-foreground">MRI Qbox</strong> — Qbox traduzido + scripts MRI prontos.
                Melhor escolha se você quer começar rápido em PT-BR sem montar tudo do zero.
              </li>
              <li>
                <strong className="text-foreground">Qbox</strong> — moderno, performático, base técnica
                excelente. Melhor escolha se você lê inglês técnico e quer flexibilidade total.
              </li>
              <li>
                <strong className="text-foreground">QBCore</strong> — comunidade gigantesca, maior catálogo
                de scripts pagos no Tebex. Melhor escolha se você prioriza disponibilidade de scripts
                prontos.
              </li>
              <li>
                <strong className="text-foreground">ESX</strong> — legado histórico, ainda ativa via ESX
                Legacy. Melhor escolha se você herdou um servidor ESX existente e não quer migrar.
              </li>
            </ul>
          </Card>
        </section>

        <section className="mb-12">
          <h2 className="heading-mri text-3xl mb-6">Tabela comparativa</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-3 font-semibold text-foreground sticky left-0 bg-background">Critério</th>
                  <th className="text-left p-3 font-semibold text-primary">MRI Qbox</th>
                  <th className="text-left p-3 font-semibold text-foreground">Qbox</th>
                  <th className="text-left p-3 font-semibold text-foreground">QBCore</th>
                  <th className="text-left p-3 font-semibold text-foreground">ESX</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((row) => (
                  <tr key={row.criterio} className="border-b border-border/50">
                    <td className="p-3 font-medium text-foreground sticky left-0 bg-background">{row.criterio}</td>
                    <td className="p-3">{cellRender(row.mri)}</td>
                    <td className="p-3">{cellRender(row.qbox)}</td>
                    <td className="p-3">{cellRender(row.qbcore)}</td>
                    <td className="p-3">{cellRender(row.esx)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-6 text-muted-foreground leading-relaxed mb-12">
          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">MRI Qbox vs Qbox internacional</h2>
            <p>
              MRI Qbox é literalmente o Qbox traduzido pra português brasileiro, mantido em sincronia com
              o upstream da Overextended. Não é um fork divergente — é uma adaptação que pega cada release
              do Qbox internacional e traduz mensagens, NPCs, jobs, gangs e documentação.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Quando escolher MRI:</strong> servidor brasileiro, equipe
              que não lê inglês técnico fluente, quer documentação em PT e scripts complementares prontos
              (painel admin, spawn cinematográfico, multichar moderno).
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Quando escolher Qbox internacional:</strong> equipe
              bilíngue, customização profunda esperada, prefere acompanhar o upstream em tempo real sem
              camada de tradução.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">MRI Qbox vs QBCore</h2>
            <p>
              QBCore foi a base do Qbox — o Qbox é o fork moderno do QBCore com integração nativa do
              ox_lib e melhorias de performance. Por consequência, MRI Qbox (que descende do Qbox) também
              herda essas melhorias.
            </p>
            <p className="mt-3">
              QBCore ainda tem comunidade ativa e o maior catálogo histórico de scripts pagos no Tebex.
              Muitos scripts QBCore funcionam direto no Qbox/MRI com pequenas adaptações (a compatibilidade
              é alta), mas alguns dependem de helpers QB-específicos.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Veredito:</strong> se você está começando do zero hoje, MRI
              Qbox (ou Qbox) entrega uma base mais moderna. Se você herdou ou já comprou muitos scripts
              QBCore, fica em QBCore.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3">MRI Qbox vs ESX</h2>
            <p>
              ESX e Qbox são frameworks de gerações diferentes. ESX vem dos primeiros anos do FiveM
              (essentialmode-based originalmente), Qbox é do design moderno (ox_lib + arquitetura
              modular).
            </p>
            <p className="mt-3">
              ESX tem catálogo de scripts gigantesco e comunidade BR muito antiga e ativa. Por outro lado,
              a arquitetura é mais difícil de manter — muitos scripts ESX exigem patches manuais a cada
              update.
            </p>
            <p className="mt-3">
              <strong className="text-foreground">Veredito:</strong> ESX só faz sentido pra servidor
              existente que já tem investimento em scripts ESX. Pra começar hoje, MRI Qbox/Qbox é a
              escolha técnica melhor.
            </p>
          </Card>
        </section>

        <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Pronto pra começar?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Veja a lista completa de scripts da suite MRI e o guia de instalação.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild>
              <Link href="/recursos">Ver recursos</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/comecar">Como começar</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
