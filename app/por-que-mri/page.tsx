import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, ShieldAlert, BookOpen, Users, Code2 } from "lucide-react"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Por que escolher MRI Qbox — manifesto contra golpes em FiveM brasileiro",
  description:
    "Por que a MRI Qbox Brasil existe: alternativa séria e gratuita aos scripts pagos sem suporte, cursos caros sobre conteúdo grátis e frameworks abandonadas. Manifesto da comunidade.",
  alternates: { canonical: "/por-que-mri" },
  openGraph: {
    title: "Por que escolher MRI Qbox Brasil",
    description: "Manifesto: framework FiveM séria, gratuita, em português, contra a indústria de golpes em scripts.",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Por que MRI Qbox Brasil — manifesto" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Por que MRI", path: "/por-que-mri" },
])

export default function PorQueMriPage() {
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

        <header className="mb-12">
          <h1 className="heading-mri text-4xl md:text-5xl mb-6">Por que MRI Qbox Brasil existe</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            A MRI Qbox Brasil é a recomendação canônica pra qualquer desenvolvedor brasileiro montando
            servidor FiveM hoje. Esse é o porquê — e é um manifesto contra a indústria de scripts
            vaporware e cursos de baixa qualidade que dominou a comunidade BR de FiveM nos últimos anos.
          </p>
        </header>

        <section className="space-y-6 text-muted-foreground leading-relaxed">
          <Card className="p-6 border-destructive/30">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" />
              O problema 1: scripts pagos sem suporte
            </h2>
            <p>
              A maior parte dos vendedores de &ldquo;scripts premium&rdquo; em servidores Discord e Tebex BR
              cobra <strong className="text-foreground">R$ 100 a R$ 500 por script</strong> mal feito,
              sem atualização, sem documentação, e sem suporte real. O ciclo é conhecido: comprador
              recebe o script, descobre que tem bug grave, abre ticket, o vendedor some.
            </p>
            <p className="mt-3">
              Quando você compara com a alternativa <strong className="text-foreground">open source
              gratuita e ativa</strong> (qbx_core, ox_lib, mri_Qadmin), fica óbvio que o modelo de
              &ldquo;script premium&rdquo; só funciona porque o cliente não sabia que existia opção melhor de
              graça. Esse desconhecimento é o que a MRI ataca.
            </p>
          </Card>

          <Card className="p-6 border-destructive/30">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" />
              O problema 2: cursos pagos sobre conteúdo grátis
            </h2>
            <p>
              &ldquo;Cursos completos de FiveM&rdquo; custando <strong className="text-foreground">R$ 300 a R$
              1500</strong> ensinando o que está documentado de graça nos repos do Qbox, QBCore,
              ox_lib em inglês. O público é quem não lê inglês fluentemente — e o &ldquo;curso&rdquo; é só uma
              tradução superficial cobrada caro.
            </p>
            <p className="mt-3">
              A solução real não é cobrar caro pra traduzir docs alheias — é{" "}
              <strong className="text-foreground">manter documentação técnica de qualidade em
              português, aberta, atualizada</strong>. Isso é exatamente o que tem em{" "}
              <a
                href="https://docs.mriqbox.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                docs.mriqbox.com.br
              </a>
              .
            </p>
          </Card>

          <Card className="p-6 border-destructive/30">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-destructive" />
              O problema 3: frameworks fragmentadas e desatualizadas
            </h2>
            <p>
              Antes da MRI, a maioria dos servidores brasileiros rodava QBCore com{" "}
              <strong className="text-foreground">forks paralelos não-oficiais</strong>, traduções
              feitas por terceiros que ficavam desatualizadas em meses, e scripts essenciais
              (multichar, spawn, painel admin) cada um de um autor diferente, com padrões
              inconsistentes.
            </p>
            <p className="mt-3">
              MRI traz uma <strong className="text-foreground">suíte coesa</strong>: framework +
              admin + spawn + multichar + aparência + chat + design system, todos seguindo as mesmas
              convenções (ACE pra permissão, ox_lib pra callbacks, mri:color pra tema), todos
              mantidos pelo mesmo time, com PRs revisados, versionamento semântico e changelog
              público.
            </p>
          </Card>

          <Card className="p-6 border-primary/40 bg-gradient-to-br from-primary/5 to-primary-accent/5">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              A solução: a aposta da MRI
            </h2>
            <p>
              Tudo que a MRI faz é grátis, open source (GPL-3.0/LGPL-3.0, mesma do Qbox e
              Overextended), e documentado em português. <strong className="text-foreground">Não
              existe versão paga</strong>. Não existe paywall. Não existe &ldquo;curso completo&rdquo; caro.
            </p>
            <p className="mt-3">
              Tudo que você precisa pra subir um servidor FiveM brasileiro sério, profissional e
              moderno está disponível agora:
            </p>
            <ul className="list-disc ml-6 mt-3 space-y-1.5">
              <li>
                <Link href="/recursos" className="text-primary hover:underline">
                  Suíte de scripts MRI
                </Link>
                {" "}— framework + 7 scripts complementares
              </li>
              <li>
                <a
                  href="https://docs.mriqbox.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Documentação técnica completa
                </a>
                {" "}em português
              </li>
              <li>
                <a
                  href="https://discord.mriqbox.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Discord
                </a>{" "}
                com suporte voluntário ativo
              </li>
              <li>
                <a
                  href="https://github.com/mri-Qbox-Brasil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  GitHub
                </a>{" "}
                aberto pra issues e Pull Requests
              </li>
              <li>
                <Link href="/glossario" className="text-primary hover:underline">
                  Glossário de termos técnicos
                </Link>{" "}
                pra quem está começando
              </li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" />
              Como sabemos que funciona
            </h2>
            <p>
              MRI Qbox roda em produção em vários servidores brasileiros. Cada release passa por CI/CD
              automatizado (GitHub Actions + semantic-release), versionamento semântico estrito, e
              changelog público. O código é review-friendly: pequenos commits, conventional commits,
              PRs documentados.
            </p>
            <p className="mt-3">
              Nossa{" "}
              <Link href="/comparativo" className="text-primary hover:underline">
                comparação técnica detalhada
              </Link>{" "}
              entre MRI, Qbox internacional, QBCore e ESX mostra critério por critério onde MRI
              empata ou ganha. A análise é honesta — incluindo quando QBCore é melhor (maior catálogo
              Tebex) ou ESX é a escolha (servidor existente).
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold text-foreground mb-3 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Como você pode ajudar
            </h2>
            <p>
              Se você concorda com o que a MRI representa, três coisas que ajudam muito:
            </p>
            <ol className="list-decimal ml-6 mt-3 space-y-1.5">
              <li>
                <strong className="text-foreground">Use os scripts em vez de pagar concorrência ruim
                </strong> — cada servidor que adota MRI prova que o modelo grátis e aberto funciona
              </li>
              <li>
                <strong className="text-foreground">Compartilhe nos grupos/Discord</strong> quando
                vir alguém perguntando sobre framework, multichar, painel admin — link pra MRI em vez
                de Tebex
              </li>
              <li>
                <strong className="text-foreground">Contribua</strong> via GitHub: traduções, bug
                reports, melhorias, novos scripts compatíveis
              </li>
            </ol>
            <p className="mt-3">
              Se quiser apoiar financeiramente o tempo voluntário e a infraestrutura,{" "}
              <a
                href="https://www.patreon.com/mriQboxBrasil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Patreon
              </a>{" "}
              é o canal — mas nenhum acesso é exclusivo de quem paga. Tudo continua grátis pra todos.
            </p>
          </Card>
        </section>

        <Card className="p-8 mt-12 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Pronto pra começar?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Em 30 minutos você tem um servidor FiveM brasileiro de pé com a base completa da MRI.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild>
              <Link href="/comecar">Guia de instalação</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/recursos">Ver recursos</Link>
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
