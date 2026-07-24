"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X, Heart } from "lucide-react"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Navbar (Nexatlas style - Pill) */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] z-50 h-[64px] px-6 flex items-center justify-between bg-card/60 backdrop-blur-xl border border-white/5 rounded-full transition-all">
        <Link href="/" className="flex items-center gap-2">
          <Image src="https://assets.mriqbox.com.br/branding/logo96.png" alt="MRI Qbox Brasil Logo" width={24} height={24} className="object-contain" />
          <span className="font-semibold text-sm tracking-widest uppercase text-white sm:inline-block">MRI Qbox</span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/comecar" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Artifacts DB</Link>
          <Link href="/docs" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Documentação</Link>
          <Link href="/sobre" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Saber Mais</Link>
          <Link href="https://github.com/mri-Qbox-Brasil" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">GitHub</Link>
          <Link href="https://www.patreon.com/mriQboxBrasil" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-wider text-white hover:text-primary transition-colors">Apoiar</Link>
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop Discord Button */}
          <Link href="/discord" className="hidden md:flex text-[10px] sm:text-xs font-bold uppercase tracking-wider text-primary-foreground px-4 sm:px-6 py-2 sm:py-2.5 bg-primary hover:bg-primary/90 rounded-full transition-all items-center gap-2 hover:scale-105">
            Acesse o Discord
          </Link>
          
          {/* Mobile Hamburger Menu */}
          <button 
            className="md:hidden flex items-center justify-center p-2 rounded-full hover:bg-white/10 text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="fixed top-[90px] left-1/2 -translate-x-1/2 w-[90%] max-w-[1100px] z-40 bg-card/95 backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 shadow-2xl md:hidden animate-in slide-in-from-top-4 fade-in">
          <Link href="/comecar" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5">Artifacts DB</Link>
          <Link href="/docs" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5">Documentação</Link>
          <Link href="/sobre" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5">Saber Mais</Link>
          <Link href="https://github.com/mri-Qbox-Brasil" onClick={() => setIsOpen(false)} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5">GitHub</Link>
          <Link href="https://www.patreon.com/mriQboxBrasil" onClick={() => setIsOpen(false)} target="_blank" rel="noopener noreferrer" className="text-sm font-bold uppercase tracking-wider text-white hover:text-primary transition-colors py-2 border-b border-white/5 flex items-center justify-between">
            <span>Apoiar (Patreon)</span>
            <Heart className="w-4 h-4 text-rose-500" />
          </Link>
          <Link href="/discord" onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-wider text-primary-foreground px-6 py-3 bg-primary hover:bg-primary/90 rounded-xl transition-all flex items-center justify-center gap-2 mt-2 text-center">
            Acesse o Discord
          </Link>
        </div>
      )}
    </>
  )
}
