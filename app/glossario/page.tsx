import type { Metadata } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"
import { breadcrumb, jsonLd } from "@/lib/schema"

export const metadata: Metadata = {
  title: "Glossário FiveM & Qbox — termos técnicos de desenvolvimento de servidor",
  description:
    "Dicionário completo de termos usados no desenvolvimento de servidores FiveM com Qbox: ACE, NUI, callback, convar, ox_lib, recipe, txAdmin e mais. Para desenvolvedores brasileiros.",
  alternates: { canonical: "/glossario" },
  openGraph: {
    title: "Glossário FiveM & Qbox — termos técnicos",
    description: "Dicionário de termos de desenvolvimento FiveM em português.",
    type: "article",
  },
  twitter: { card: "summary_large_image", title: "Glossário FiveM & Qbox" },
}

const BREADCRUMB = breadcrumb([
  { name: "Início", path: "/" },
  { name: "Glossário", path: "/glossario" },
])

interface Term {
  term: string
  definition: string
  example?: string
}

const TERMS: { letter: string; items: Term[] }[] = [
  {
    letter: "A",
    items: [
      {
        term: "ACE Permissions",
        definition:
          "Sistema de permissões nativo do FXServer baseado em identifiers e princípios. Define quem pode rodar comandos administrativos ou acessar recursos restritos. Configurado no server.cfg via add_ace.",
        example: "add_ace identifier.fivem:SEU_ID command allow",
      },
      {
        term: "ambient",
        definition:
          "No GTA V, refere-se a NPCs/veículos espalhados pelo mapa automaticamente pelo engine. Em scripts de roleplay, geralmente é desejável reduzir ou desabilitar pra performance.",
      },
    ],
  },
  {
    letter: "C",
    items: [
      {
        term: "callback (lib.callback)",
        definition:
          "Mecanismo do ox_lib pra comunicação cliente-servidor com resposta assíncrona. Substitui o padrão antigo de TriggerServerEvent + TriggerClientEvent pra pares request/response.",
        example: "lib.callback.await('plugintest:server:getConfig', false)",
      },
      {
        term: "CEF (Chromium Embedded Framework)",
        definition:
          "Engine que renderiza a NUI no FiveM. Versão do Chromium relativamente antiga — algumas features CSS modernas não funcionam, como backdrop-filter:blur.",
      },
      {
        term: "Citizen.CreateThread",
        definition:
          "Função do FiveM pra rodar código async em loop. Padrão Lua pra qualquer comportamento contínuo (loops de renderização, polling de estado, etc).",
      },
      {
        term: "convar",
        definition:
          "Console variable do FXServer. Configuração global definida via server.cfg (setr foo bar) e lida via GetConvar('foo', 'default'). Pode ser shared entre resources.",
        example: "setr mri:color \"#00E699\"",
      },
    ],
  },
  {
    letter: "D",
    items: [
      {
        term: "DUI (Direct UI)",
        definition:
          "Sistema do FiveM pra renderizar páginas web como texturas no mundo 3D — usado pra waypoints, billboards, telas in-game. Diferente da NUI que cobre a tela inteira.",
      },
    ],
  },
  {
    letter: "E",
    items: [
      {
        term: "ESX",
        definition:
          "Framework FiveM clássica baseada em essentialmode. Concorrente histórica do QBCore. Hoje mantida via fork ESX Legacy. Catálogo gigante de scripts pagos.",
      },
    ],
  },
  {
    letter: "F",
    items: [
      {
        term: "fxmanifest.lua",
        definition:
          "Arquivo manifesto obrigatório em todo resource FiveM. Declara client_scripts, server_scripts, ui_page, files, dependências, versão do Lua e capabilities.",
      },
      {
        term: "FXServer",
        definition:
          "Servidor oficial do FiveM. Roda os scripts, gerencia conexões dos jogadores e expõe a API que os resources consomem. Costuma rodar embutido no txAdmin.",
      },
    ],
  },
  {
    letter: "G",
    items: [
      {
        term: "GPL-3.0",
        definition:
          "Licença open source copyleft forte usada pelo Qbox, QBCore, ox_inventory e MRI Qbox. Permite uso comercial mas exige que forks distribuídos mantenham o código aberto.",
      },
    ],
  },
  {
    letter: "L",
    items: [
      {
        term: "LGPL-3.0",
        definition:
          "Variante mais permissiva da GPL — usada pra bibliotecas (ox_lib, @mriqbox/ui-kit). Permite que projetos proprietários consumam a lib sem virar GPL eles mesmos; só modificações na lib precisam ser publicadas.",
      },
    ],
  },
  {
    letter: "N",
    items: [
      {
        term: "NUI (New UI)",
        definition:
          "Sistema do FiveM pra mostrar interface web sobre o jogo. Carrega HTML/CSS/JS via um iframe CEF. Pra comunicar Lua ↔ JS usa SendNUIMessage e RegisterNUICallback.",
      },
    ],
  },
  {
    letter: "O",
    items: [
      {
        term: "ox_lib",
        definition:
          "Biblioteca oficial da Overextended pra FiveM. Fornece menus, notify, input dialogs, callbacks tipados, locale system e dezenas de utilitários. Base de todo script Qbox moderno.",
      },
      {
        term: "ox_inventory",
        definition:
          "Sistema de inventário moderno da Overextended. Substituiu inventários legacy (qb-inventory, esx_inventory). Padrão atual em servidores Qbox/MRI.",
      },
      {
        term: "oxmysql",
        definition:
          "Driver MySQL oficial da Overextended pro FXServer. Substituiu o mysql-async legacy. Mais performático, queries promise-based.",
      },
    ],
  },
  {
    letter: "Q",
    items: [
      {
        term: "QBCore",
        definition:
          "Framework FiveM popular, base do Qbox. Modular, comunidade gigante, maior catálogo de scripts pagos no Tebex. Tecnicamente menos moderna que Qbox.",
      },
      {
        term: "Qbox",
        definition:
          "Fork moderno do QBCore mantido pela Overextended. Integração nativa com ox_lib, threading async, performance superior. Base do MRI Qbox.",
      },
    ],
  },
  {
    letter: "R",
    items: [
      {
        term: "recipe",
        definition:
          "Arquivo de receita do txAdmin que define todos os resources, configs e DB schema necessários pra subir um servidor automaticamente. MRI Qbox publica uma recipe oficial.",
      },
      {
        term: "resource",
        definition:
          "Unidade de código no FiveM — uma pasta com fxmanifest.lua e scripts Lua/UI. Carregada pelo FXServer via ensure foo no server.cfg.",
      },
      {
        term: "resmon",
        definition:
          "Resource Monitor — ferramenta in-game do FiveM (F8 → resmon) que mostra uso de CPU por resource. Crítico pra debug de performance.",
      },
    ],
  },
  {
    letter: "S",
    items: [
      {
        term: "scenario (GTA V)",
        definition:
          "Animação ambiente pré-fabricada do GTA V (ex: WORLD_HUMAN_SMOKING, WORLD_HUMAN_HANG_OUT_STREET). Usada via TaskStartScenarioInPlace pra dar vida aos peds.",
      },
      {
        term: "shadcn/ui",
        definition:
          "Biblioteca de componentes React copy-paste baseada em Radix + Tailwind. Padrão visual usado nas NUIs MRI via @mriqbox/ui-kit.",
      },
    ],
  },
  {
    letter: "T",
    items: [
      {
        term: "Tebex",
        definition:
          "Marketplace usado pela comunidade FiveM pra vender scripts, mapas, veículos e assets. Plataforma de pagamento + licenciamento via key.",
      },
      {
        term: "txAdmin",
        definition:
          "Painel web oficial pra gerenciar servidores FiveM. Geralmente já vem embutido no FXServer. Faz deploy de recipes, monitora resmon, oferece chat ao vivo com jogadores.",
      },
    ],
  },
  {
    letter: "V",
    items: [
      {
        term: "Vite",
        definition:
          "Build tool moderno pra apps web (HMR rápido, ESBuild). Usado pra buildar as NUIs React dos scripts MRI (mri_Qadmin, mri_Qspawn, etc).",
      },
    ],
  },
]

export default function GlossarioPage() {
  return (
    <div className="min-h-screen bg-background">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(BREADCRUMB) }} />
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href="/">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Link>
        </Button>

        <header className="mb-12">
          <h1 className="heading-mri text-4xl md:text-5xl mb-4">Glossário FiveM & Qbox</h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Dicionário dos termos técnicos mais usados no desenvolvimento de servidores FiveM com Qbox.
            Escrito pra desenvolvedores brasileiros que estão começando ou querem entender melhor o
            ecossistema.
          </p>
        </header>

        <nav className="mb-12 flex flex-wrap gap-2 text-sm">
          {TERMS.map((g) => (
            <a
              key={g.letter}
              href={`#${g.letter}`}
              className="w-8 h-8 flex items-center justify-center rounded-md bg-muted hover:bg-primary hover:text-primary-foreground transition-colors font-mono font-bold"
            >
              {g.letter}
            </a>
          ))}
        </nav>

        <section className="space-y-10">
          {TERMS.map((group) => (
            <div key={group.letter} id={group.letter} className="scroll-mt-20">
              <h2 className="heading-mri text-3xl text-primary mb-6">{group.letter}</h2>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <Card key={item.term} className="p-5">
                    <h3 className="text-lg font-bold text-foreground mb-2">{item.term}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.definition}</p>
                    {item.example && (
                      <pre className="mt-3 bg-muted p-3 rounded-md text-xs overflow-x-auto border border-border">
                        <code className="text-foreground font-mono">{item.example}</code>
                      </pre>
                    )}
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </section>

        <Card className="p-8 mt-16 text-center bg-gradient-to-br from-primary/5 to-primary-accent/5 border-primary/20">
          <h2 className="text-2xl font-bold mb-3">Faltou algum termo?</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Sugira no Discord oficial — adicionamos os mais pedidos no próximo deploy.
          </p>
          <Button asChild>
            <Link href="https://discord.mriqbox.com.br" target="_blank" rel="noopener noreferrer">
              Sugerir termo no Discord
            </Link>
          </Button>
        </Card>
      </div>
    </div>
  )
}
