import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Política de Privacidade — MRI Qbox Brasil",
  description:
    "Como tratamos seus dados, cookies, analytics e anúncios no site mriqbox.com.br e subdomínios. Política completa em conformidade com LGPD.",
  alternates: { canonical: "/privacidade" },
  robots: { index: true, follow: true },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Privacidade", path: "/privacidade" },
])

export default function PrivacidadePage() {
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

        <article className="prose prose-invert max-w-none">
          <h1 className="text-4xl font-bold mb-2">Política de Privacidade</h1>
          <p className="text-sm text-muted-foreground mb-8">Última atualização: maio de 2026</p>

          <section className="space-y-4 text-muted-foreground leading-relaxed">
            <p>
              A MRI Qbox Brasil (&ldquo;nós&rdquo;, &ldquo;nosso&rdquo;, &ldquo;MRI&rdquo;) opera o site{" "}
              <code className="text-primary">mriqbox.com.br</code> e os subdomínios{" "}
              <code className="text-primary">docs.mriqbox.com.br</code>,{" "}
              <code className="text-primary">assets.mriqbox.com.br</code> e{" "}
              <code className="text-primary">discord.mriqbox.com.br</code>. Esta política descreve quais dados
              coletamos, por que coletamos e como você pode controlar isso.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Quais dados coletamos</h2>
            <p>Não exigimos cadastro nem login. Os dados que recebemos vêm de três fontes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong className="text-foreground">Métricas anônimas</strong> via Vercel Analytics e Vercel
                Speed Insights — páginas acessadas, performance e país aproximado. Sem cookies, sem dados
                pessoais identificáveis.
              </li>
              <li>
                <strong className="text-foreground">Anúncios do Google AdSense</strong> — quando você aceita
                o banner de consentimento, o script do AdSense é carregado e o Google pode usar cookies para
                personalizar anúncios. Detalhes em{" "}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  política de anúncios do Google
                </a>
                .
              </li>
              <li>
                <strong className="text-foreground">Logs do servidor</strong> — Vercel registra IP, user
                agent e timestamp por motivos de segurança e debug (descartados em ~30 dias).
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Cookies</h2>
            <p>
              Usamos um único cookie próprio: <code className="text-primary">mriqbox-consent</code> (armazenado
              em <code>localStorage</code>) que guarda sua escolha no banner de consentimento. Os demais
              cookies (analytics, ads) só são definidos se você aceitar.
            </p>
            <p>
              Você pode revogar o consentimento a qualquer momento limpando o{" "}
              <code className="text-primary">localStorage</code> do site pelas configurações do navegador.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Base legal (LGPD)</h2>
            <p>
              Para usuários no Brasil, o tratamento de dados é baseado em <strong className="text-foreground">consentimento</strong>{" "}
              (Art. 7º, I da Lei 13.709/2018) para cookies de anúncios e métricas, e{" "}
              <strong className="text-foreground">legítimo interesse</strong> (Art. 7º, IX) para logs
              técnicos de segurança.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Compartilhamento</h2>
            <p>
              Não vendemos dados. Os serviços terceirizados que processam métricas/anúncios em nosso nome
              são:
            </p>
            <ul className="list-disc ml-6 space-y-2">
              <li>
                <strong className="text-foreground">Vercel Inc.</strong> — hospedagem, analytics, speed
                insights
              </li>
              <li>
                <strong className="text-foreground">Google LLC</strong> — AdSense (anúncios, mediante seu
                consentimento)
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Seus direitos</h2>
            <p>Você pode, a qualquer momento, exigir:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li>Confirmação se tratamos dados seus</li>
              <li>Acesso aos dados</li>
              <li>Correção de dados incompletos/desatualizados</li>
              <li>Anonimização, bloqueio ou eliminação</li>
              <li>Revogação do consentimento</li>
            </ul>
            <p>
              Solicite pelo Discord oficial:{" "}
              <a
                href="https://discord.mriqbox.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                discord.mriqbox.com.br
              </a>
              .
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Crianças</h2>
            <p>
              Nosso conteúdo é técnico (desenvolvimento de servidores FiveM) e não é direcionado a menores
              de 13 anos. Não coletamos dados intencionalmente de crianças.
            </p>

            <h2 className="text-2xl font-bold text-foreground mt-8 mb-3">Alterações</h2>
            <p>
              Atualizações nesta política são publicadas nesta página com nova data no topo. Mudanças
              materiais são anunciadas no Discord da comunidade.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
