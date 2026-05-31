import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Github, MessageCircle, Code2, Users, Download, Zap, Globe, Shield } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image
                src="https://assets.mriqbox.com.br/branding/logo96.png"
                alt="MRI Qbox Brasil Logo"
                width={32}
                height={32}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-bold">MRI Qbox Brasil</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/recursos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Recursos
            </Link>
            <Link href="/comecar" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Como começar
            </Link>
            <Link
              href="https://docs.mriqbox.com.br"
              target="_blank" rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Docs
            </Link>
            <Link href="/sobre" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Sobre
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-4 h-4 mr-2" />
                Discord
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-4 py-24 md:py-32 overflow-hidden">
        {/* Parallax Background */}
        <div
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url(https://assets.mriqbox.com.br/branding/logo1080.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Dark overlay mask */}
          <div className="absolute inset-0 bg-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted border border-border text-xs text-muted-foreground mb-6">
            <Zap className="w-3 h-3" />
            Framework Qbox Adaptada para o Brasil
          </div>
          <h1 className="heading-mri text-4xl md:text-6xl mb-6 text-balance">
            A Framework FiveM
            <span className="text-gradient block">para Servidores Brasileiros</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Framework open-source que combina Qbcore e Ox, totalmente traduzida e otimizada para a comunidade brasileira
            de FiveM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="https://docs.mriqbox.com.br/mri/instalacao" target="_blank" rel="noopener noreferrer">
                <Download className="w-5 h-5 mr-2" />
                Instale agora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer">
                <Github className="w-5 h-5 mr-2" />
                Ver no GitHub
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Entrar no Discord
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4 text-sm text-muted-foreground">
            <code className="px-3 py-1 rounded-md bg-muted border border-border font-mono">
              Bem-vindo à MRI Qbox Brasil!
            </code>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Gratuito</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">PT-BR</div>
            <div className="text-sm text-muted-foreground">Traduzido</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">Open</div>
            <div className="text-sm text-muted-foreground">Source</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-primary mb-1">Suporte</div>
            <div className="text-sm text-muted-foreground">Online</div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="heading-mri text-3xl md:text-4xl mb-4">Por que escolher MRI Qbox?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A melhor solução para criar servidores FiveM profissionais no Brasil
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tradução Completa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Framework 100% traduzida e adaptada para o português brasileiro, facilitando o desenvolvimento.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Segurança & Performance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Otimizado para máxima performance e segurança em colaboração com a equipe internacional.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Scripts de Qualidade</h3>
            <p className="text-muted-foreground leading-relaxed">
              Base sólida com scripts profissionais e bem documentados para acelerar seu desenvolvimento.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Faça parte de uma comunidade crescente de desenvolvedores brasileiros apaixonados por FiveM.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fácil Instalação</h3>
            <p className="text-muted-foreground leading-relaxed">
              Instale com o txAdmin e comece a desenvolver em minutos com nossa documentação. Dúvidas? Acesse o discord
              da comunidade!
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qbcore + Ox</h3>
            <p className="text-muted-foreground leading-relaxed">
              Melhor dos dois mundos combinados em uma framework poderosa e flexível.
            </p>
          </Card>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="heading-mri text-3xl md:text-4xl mb-4">Perguntas frequentes</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Dúvidas comuns de quem está começando ou avaliando a framework
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Qual a diferença entre MRI Qbox e Qbox/QBCore?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              MRI Qbox é a adaptação brasileira oficial da Qbox internacional (que por sua vez é a evolução
              do QBCore com integração nativa ao ox_lib). Mesma base, mas traduzida, com scripts
              complementares prontos e documentação em português.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">É realmente gratuito?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sim. Todo o código é open source sob licença MIT — pode usar comercialmente, modificar e
              redistribuir. Os custos de infra são bancados pela comunidade via Patreon e anúncios.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Posso usar em servidor pago/comercial?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pode. A licença MIT permite uso comercial. O que não pode é revender o código se passando
              pela MRI Qbox Brasil ou usar a marca/logo sem autorização. Detalhes nos{" "}
              <Link href="/termos" className="text-primary hover:underline">
                termos de uso
              </Link>
              .
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Tem suporte técnico?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Suporte voluntário no{" "}
              <a
                href="https://discord.mriqbox.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Discord
              </a>
              . Bugs/feature requests via GitHub Issues do repositório correspondente. Sem SLA, mas a
              comunidade é ativa e geralmente responde rápido.
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Quanto tempo leva pra instalar?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Cerca de 30 minutos se você já tem txAdmin e MySQL prontos — basta importar a recipe.
              Veja o{" "}
              <Link href="/comecar" className="text-primary hover:underline">
                guia rápido
              </Link>{" "}
              ou a{" "}
              <a
                href="https://docs.mriqbox.com.br/mri/instalacao"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                documentação completa
              </a>
              .
            </p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-2">Como contribuo com o projeto?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pull Requests nos repositórios do{" "}
              <a
                href="https://github.com/mri-Qbox-Brasil"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                GitHub
              </a>
              , relatos de bugs, traduções, melhoria de docs e participação no Discord. Apoio financeiro
              também ajuda — via Patreon.
            </p>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
            <div className="text-center">
              <h2 className="heading-mri text-3xl md:text-4xl mb-4">Junte-se à Comunidade</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Entre no nosso Discord para suporte, compartilhar scripts, tirar dúvidas e colaborar com outros
                desenvolvedores brasileiros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-base px-8">
                  <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Discord
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
                  <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
                  <Link href="https://www.patreon.com/mriQboxBrasil" target="_blank" rel="noopener noreferrer">
                    Apoiar no Patreon
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/30">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 relative">
                  <Image
                    src="https://assets.mriqbox.com.br/branding/logo96.png"
                    alt="MRI Qbox Brasil Logo"
                    width={24}
                    height={24}
                    className="object-contain"
                  />
                </div>
                <span className="font-bold">MRI Qbox Brasil</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Adaptação brasileira open source da framework Qbox (Qbcore + Ox) para servidores FiveM
                de roleplay. 100% gratuita.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3">Projeto</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/sobre" className="text-muted-foreground hover:text-foreground transition-colors">Sobre</Link></li>
                <li><Link href="/recursos" className="text-muted-foreground hover:text-foreground transition-colors">Recursos</Link></li>
                <li><Link href="/comecar" className="text-muted-foreground hover:text-foreground transition-colors">Como começar</Link></li>
                <li><Link href="https://docs.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Documentação</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-3">Comunidade</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Discord</Link></li>
                <li><Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">GitHub</Link></li>
                <li><Link href="https://www.patreon.com/mriQboxBrasil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">Patreon</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border">
            <span className="text-sm text-muted-foreground">© 2025 MRI Qbox Brasil. Open Source (MIT).</span>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacidade" className="text-muted-foreground hover:text-foreground transition-colors">Privacidade</Link>
              <Link href="/termos" className="text-muted-foreground hover:text-foreground transition-colors">Termos</Link>
              <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </Link>
              <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Discord">
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
