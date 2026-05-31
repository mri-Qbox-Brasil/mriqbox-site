import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Download, MessageCircle, ExternalLink } from "lucide-react"

export const metadata: Metadata = {
  title: "Como começar com MRI Qbox Brasil",
  description:
    "Guia rápido de instalação da framework MRI Qbox em servidores FiveM via txAdmin. Pré-requisitos, passo-a-passo e próximos passos.",
  alternates: { canonical: "/comecar" },
}

export default function ComecarPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <h1 className="heading-mri text-4xl md:text-5xl mb-4">Como começar</h1>
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
          Subir um servidor FiveM com MRI Qbox leva menos de 30 minutos se você já tem txAdmin
          rodando. Este é o caminho mais curto — para configurações avançadas, consulte a{" "}
          <Link
            href="https://docs.mriqbox.com.br"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            documentação completa
          </Link>
          .
        </p>

        <section className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-3">Pré-requisitos</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground">
              <li>Servidor com FiveM/FXServer instalado</li>
              <li>
                <strong className="text-foreground">txAdmin</strong> 7+ (geralmente já vem no FXServer)
              </li>
              <li>MySQL 8+ ou MariaDB 10.6+ acessível</li>
              <li>Node.js 18+ (para builds de UI dos scripts MRI)</li>
              <li>Familiaridade básica com Lua e linha de comando</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-3">1. Recipe MRI Qbox no txAdmin</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              A forma mais rápida é importar a recipe oficial pelo txAdmin: na criação do servidor,
              cole a URL da recipe MRI Qbox. O txAdmin baixa todas as dependências (ox_lib, oxmysql,
              qbx_core, mri_Qbox) e configura banco automaticamente.
            </p>
            <Button asChild>
              <Link
                href="https://docs.mriqbox.com.br/mri/instalacao"
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Recipe + passo-a-passo nos docs
              </Link>
            </Button>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-3">2. Configurar convar suite-wide</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Todos os scripts MRI compartilham um tema através da convar{" "}
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded">mri:color</code>. Defina no seu{" "}
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded">server.cfg</code>:
            </p>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto border border-border">
              <code className="text-foreground font-mono">
                setr mri:color &quot;#00E699&quot;
              </code>
            </pre>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              Qualquer hex válido funciona. Mudar a convar em runtime atualiza as NUIs ao vivo (mri_Qadmin,
              mri_Qspawn, mri_Qmultichar) sem restart.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-3">3. Permissões iniciais (ACE)</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              No <code className="text-primary bg-muted px-1.5 py-0.5 rounded">server.cfg</code>, dê
              permissões pro seu identifier abrir o painel admin:
            </p>
            <pre className="bg-muted p-4 rounded-md text-sm overflow-x-auto border border-border">
              <code className="text-foreground font-mono whitespace-pre">{`add_ace identifier.fivem:SEU_ID command allow
add_ace identifier.fivem:SEU_ID mri_Qspawn.admin allow
add_ace identifier.fivem:SEU_ID qadmin.action.manage_settings allow`}</code>
            </pre>
            <p className="text-muted-foreground mt-3 text-sm leading-relaxed">
              <code className="text-primary bg-muted px-1 rounded">command</code> cobre god/console como
              fallback, então normalmente já libera tudo.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-3">4. Subir o servidor</h2>
            <p className="text-muted-foreground leading-relaxed">
              Inicie o txAdmin, start o server profile. Conecte com o FiveM. Em jogo:{" "}
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded">/qadmin</code> abre o painel
              administrativo;{" "}
              <code className="text-primary bg-muted px-1.5 py-0.5 rounded">/adminspawn</code> gerencia
              spawns. Se algo não abrir, verifique a console F8 do FiveM.
            </p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-3">Próximos passos</h2>
            <ul className="list-disc ml-6 space-y-2 text-muted-foreground mb-6">
              <li>
                Adicionar/editar spawns ingame pelo{" "}
                <code className="text-primary bg-muted px-1 rounded">/adminspawn</code>
              </li>
              <li>
                Customizar o multichar e a aparência ({" "}
                <Link href="/recursos" className="text-primary hover:underline">
                  ver lista de scripts
                </Link>
                )
              </li>
              <li>
                Configurar jobs e gangs nos arquivos do{" "}
                <code className="text-primary bg-muted px-1 rounded">mri_Qbox</code>
              </li>
              <li>Entrar no Discord pra tirar dúvidas e compartilhar feedback</li>
            </ul>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link
                  href="https://docs.mriqbox.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Documentação completa
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://discord.mriqbox.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Discord
                </Link>
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
