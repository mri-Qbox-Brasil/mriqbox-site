import Link from "next/link"
import Image from "next/image"
import { Headphones, Mail, ArrowRight } from "lucide-react"

export default function DiscordPage() {
  return (
    <div className="h-screen max-h-screen overflow-hidden bg-background text-foreground font-sans relative flex flex-col">
      {/* Navbar (Nexatlas style - Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] z-50 h-[64px] px-6 flex items-center justify-between bg-card/60 backdrop-blur-xl border border-white/5 rounded-full transition-all">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="MRI Qbox Brasil Logo" width={24} height={24} className="object-contain" />
          <span className="font-semibold text-sm tracking-widest uppercase text-white">MRI Qbox</span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link href="/recursos" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Recursos</Link>
          <Link href="/comecar" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Como começar</Link>
          <Link href="https://docs.mriqbox.com.br" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Suporte</Link>
          <Link href="/sobre" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Saber Mais</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/discord" className="text-xs font-bold uppercase tracking-wider text-primary-foreground px-6 py-2.5 bg-primary hover:bg-primary/90 rounded-full transition-all flex items-center gap-2">
            Acesse o Discord
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-6 md:px-12 pt-[100px] pb-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Side: Copy and Buttons */}
        <div className="flex flex-col gap-5 max-w-xl">
          <div className="inline-flex items-center gap-2 py-1 px-4 rounded-full border border-primary/20 bg-primary/10 w-fit">
            <Headphones className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-primary tracking-widest uppercase">24/7 SUPPORT</span>
          </div>

          <h1 className="text-5xl lg:text-6xl font-extrabold text-white leading-[1.1] tracking-tight">
            Precisa de ajuda?<br />
            <span className="text-primary">Nós te ajudamos.</span>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            A forma mais rápida de resolver seu problema é entrando na nossa comunidade do Discord e abrindo um ticket de suporte. Nossa equipe está sempre pronta para ajudar!
          </p>

          <div className="flex flex-col sm:flex-row gap-3 mt-2">
            <Link href="https://discord.mriqbox.com.br" className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary/90 rounded-xl text-primary-foreground font-bold text-base transition-all">
              Entrar no Discord
            </Link>
            <Link href="mailto:contact@mriqbox.com.br" className="flex items-center justify-center gap-2 px-6 py-3.5 border border-white/10 hover:bg-white/5 rounded-xl text-white font-bold text-base transition-all">
              <Mail className="w-5 h-5" />
              Enviar Email
            </Link>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex flex-col gap-2 hover:border-primary/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-white/5 flex items-center justify-center text-white font-bold mb-1">1</div>
              <h3 className="text-lg font-bold text-white">Entre no servidor</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Use o botão acima para entrar no nosso servidor oficial do Discord.</p>
            </div>
            <div className="p-5 rounded-2xl bg-card border border-white/5 flex flex-col gap-2 hover:border-primary/50 transition-colors">
              <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold mb-1">2</div>
              <h3 className="text-lg font-bold text-white">Abra um ticket</h3>
              <p className="text-xs md:text-sm text-muted-foreground">Vá para o canal de suporte, abra um ticket e te ajudaremos.</p>
              <span className="text-[10px] font-bold text-primary mt-1 flex items-center gap-1">IR PARA O CANAL <ArrowRight className="w-3 h-3" /></span>
            </div>
          </div>
        </div>

        {/* Right Side: Discord Widget */}
        <div className="flex items-center justify-center lg:justify-end h-full">
          <div className="relative w-full max-w-[400px] h-[500px] max-h-[75vh] rounded-xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
            {/* MacOS like window header */}
            <div className="h-10 bg-[#202225] w-full flex items-center px-4 gap-2 border-b border-black/50 shrink-0">
              <div className="w-3 h-3 rounded-full bg-[#ED6A5E]"></div>
              <div className="w-3 h-3 rounded-full bg-[#F4BF4F]"></div>
              <div className="w-3 h-3 rounded-full bg-[#61C554]"></div>
              <span className="ml-auto text-[10px] text-white/50 font-semibold tracking-widest">LIVE STATUS</span>
            </div>
            {/* The actual iframe */}
            <iframe
              src="https://discord.com/widget?id=1210457748073091072&theme=dark"
              width="100%"
              height="100%"
              allowTransparency={true}
              frameBorder="0"
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              className="bg-[#2f3136] flex-1"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  )
}
