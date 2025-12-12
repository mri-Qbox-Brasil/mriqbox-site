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
            <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#community" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Comunidade
            </Link>
            <Link
              href="https://github.com/mri-Qbox-Brasil"
              target="_blank"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              GitHub
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href="https://discord.mriqbox.com.br" target="_blank">
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
            backgroundAttachment: "fixed",
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            A Framework FiveM
            <span className="text-gradient block">para Servidores Brasileiros</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto leading-relaxed">
            Framework open-source que combina Qbcore e Ox, totalmente traduzida e otimizada para a comunidade brasileira
            de FiveM.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" asChild className="text-base px-8">
              <Link href="https://docs.mriqbox.com.br/mri/instalacao" target="_blank">
                <Download className="w-5 h-5 mr-2" />
                Instale agora
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <Link href="https://github.com/mri-Qbox-Brasil" target="_blank">
                <Github className="w-5 h-5 mr-2" />
                Ver no GitHub
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
              <Link href="https://discord.mriqbox.com.br" target="_blank">
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
            <div className="text-3xl font-bold text-brand mb-1">100%</div>
            <div className="text-sm text-muted-foreground">Gratuito</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">PT-BR</div>
            <div className="text-sm text-muted-foreground">Traduzido</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">Open</div>
            <div className="text-sm text-muted-foreground">Source</div>
          </Card>
          <Card className="p-6 text-center">
            <div className="text-3xl font-bold text-brand mb-1">Suporte</div>
            <div className="text-sm text-muted-foreground">Online</div>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Por que escolher MRI Qbox?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A melhor solução para criar servidores FiveM profissionais no Brasil
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Globe className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Tradução Completa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Framework 100% traduzida e adaptada para o português brasileiro, facilitando o desenvolvimento.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Shield className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Segurança & Performance</h3>
            <p className="text-muted-foreground leading-relaxed">
              Otimizado para máxima performance e segurança em colaboração com a equipe internacional.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Code2 className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Scripts de Qualidade</h3>
            <p className="text-muted-foreground leading-relaxed">
              Base sólida com scripts profissionais e bem documentados para acelerar seu desenvolvimento.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Comunidade Ativa</h3>
            <p className="text-muted-foreground leading-relaxed">
              Faça parte de uma comunidade crescente de desenvolvedores brasileiros apaixonados por FiveM.
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Download className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Fácil Instalação</h3>
            <p className="text-muted-foreground leading-relaxed">
              Instale com o txAdmin e comece a desenvolver em minutos com nossa documentação. Dúvidas? Acesse o discord
              da comunidade!
            </p>
          </Card>
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-brand" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Qbcore + Ox</h3>
            <p className="text-muted-foreground leading-relaxed">
              Melhor dos dois mundos combinados em uma framework poderosa e flexível.
            </p>
          </Card>
        </div>
      </section>

      {/* Community Section */}
      <section id="community" className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 md:p-12 bg-gradient-to-br from-brand/5 to-brand-accent/5 border-brand/20">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Junte-se à Comunidade</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                Entre no nosso Discord para suporte, compartilhar scripts, tirar dúvidas e colaborar com outros
                desenvolvedores brasileiros.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild className="text-base px-8">
                  <Link href="https://discord.mriqbox.com.br" target="_blank">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Discord
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
                  <Link href="https://github.com/mri-Qbox-Brasil" target="_blank">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-base px-8 bg-transparent">
                  <Link href="https://www.patreon.com/mriQboxBrasil" target="_blank">
                    Apoiar no Patreon
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 relative">
                <Image
                  src="https://assets.mriqbox.com.br/branding/logo96.png"
                  alt="MRI Qbox Brasil Logo"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              <span className="text-sm text-muted-foreground">© 2025 MRI Qbox Brasil. Open Source.</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Feito com{" "}
              <Link href="https://v0.dev" target="_blank" className="text-brand hover:underline">
                v0.dev
              </Link>
            </div>
            <div className="flex items-center gap-6">
              <Link
                href="https://github.com/mri-Qbox-Brasil"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </Link>
              <Link
                href="https://discord.mriqbox.com.br"
                target="_blank"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
