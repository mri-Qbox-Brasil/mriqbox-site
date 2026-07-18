"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { 
  Download, Database, Cpu, CheckCircle2, Loader2, Play, 
  Check, ShieldCheck, Folder, Key, ChevronRight, Settings, 
  Globe, Box, MousePointer2, AlertTriangle, FileCode, Palette, Heart
} from "lucide-react"
import { cn } from "@/lib/utils"

type TaskStatus = "pending" | "running" | "completed"

interface TaskDef {
  id: string
  name: string
  icon: React.ElementType
  startAt: number
  endAt: number
}

const tasksDef: TaskDef[] = [
  { id: "fxserver", name: "Downloading FXServer Artifacts", icon: Download, startAt: 0, endAt: 15 },
  { id: "base", name: "Deploying mri_qbox_server Base", icon: Cpu, startAt: 15, endAt: 45 },
  { id: "database", name: "Setting up MariaDB Database", icon: Database, startAt: 45, endAt: 75 },
  { id: "recipe", name: "Running Recipe Scripts", icon: Play, startAt: 75, endAt: 100 },
]

const sidebarSteps = [
  "Ambiente", "Versão do Artefato", "Receita", "Resumo",
  "Instalação", "Configuração", "Finalização"
]

interface TLine { delay: number; badge: string; bg: string; text: string }
const terminalLines: TLine[] = [
  { delay: 0,    badge: "resources",              bg: "#1a7a1a", text: "^2Scanning resources.^7" },
  { delay: 280,  badge: "resources",              bg: "#1a7a1a", text: "^2Found 183 resources.^7" },
  { delay: 600,  badge: "server",                 bg: "#555",    text: "Authenticating server license key..." },
  { delay: 1000, badge: "server",                 bg: "#555",    text: "Server license key authentication succeeded. Welcome!" },
  { delay: 1300, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for ox_lib" },
  { delay: 1550, badge: "resources",              bg: "#1a7a1a", text: "Started resource ox_lib" },
  { delay: 1750, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for oxmysql" },
  { delay: 1950, badge: "resources",              bg: "#1a7a1a", text: "Started resource oxmysql" },
  { delay: 2100, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for qbx_core" },
  { delay: 2300, badge: "script:qbx_core",        bg: "#1a5a8a", text: "^5[qbx_core] ^7[INFO] Stopping hardcap...^7" },
  { delay: 2500, badge: "resources",              bg: "#1a7a1a", text: "Started resource qbx_core" },
  { delay: 2700, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for ox_inventory" },
  { delay: 2900, badge: "resources",              bg: "#1a7a1a", text: "Started resource ox_inventory" },
  { delay: 3100, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for jim_bridge" },
  { delay: 3250, badge: "script:jim_bridge",      bg: "#7a1a9a", text: "^6Bridge^7: '^3ox_target^7' detected" },
  { delay: 3400, badge: "script:jim_bridge",      bg: "#7a1a9a", text: "^6Bridge^7: '^3qbx_core^7' detected" },
  { delay: 3550, badge: "script:jim_bridge",      bg: "#7a1a9a", text: "^6Bridge^7: '^3ox_lib^7' detected" },
  { delay: 3700, badge: "script:jim_bridge",      bg: "#7a1a9a", text: "^6Bridge^7: '^3ox_inventory^7' detected" },
  { delay: 3850, badge: "resources:jim_bridge",   bg: "#7a1a9a", text: "^3Warning: could not find file `shared/auth/*.lua`^7" },
  { delay: 4000, badge: "resources",              bg: "#1a7a1a", text: "Started resource jim_bridge (3 warnings)" },
  { delay: 4200, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for mri-Qfuel" },
  { delay: 4380, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri-Qfuel" },
  { delay: 4530, badge: "resources:mri-Qfuel-props:stream", bg: "#8a3a1a", text: "^4Asset mri-Qfuel-props/mtanker2+hi.ytd uses 19.5 MiB of physical memory.^7" },
  { delay: 4680, badge: "resources:mri-Qfuel-props:stream", bg: "#8a3a1a", text: "^4Asset mri-Qfuel-props/newage_fuel_b.ydr uses 24.0 MiB of physical memory.^7" },
  { delay: 4820, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri-Qfuel-props (3 warnings)" },
  { delay: 5000, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for mri_Qadmin" },
  { delay: 5180, badge: "script:mri_Qadmin",      bg: "#1a5a8a", text: "^5[mri_Qadmin] ^6[DEBUG] Recurso iniciado. Verificando/criando tabelas...^7" },
  { delay: 5330, badge: "script:mri_Qadmin",      bg: "#1a5a8a", text: "[mri_Qadmin] Resource FS bridge carregado." },
  { delay: 5480, badge: "script:mri_Qadmin",      bg: "#1a5a8a", text: "^5[mri_Qadmin] ^6[DEBUG] Carregando Sistema de Sincronizacao de Dados...^7" },
  { delay: 5620, badge: "script:mri_Qadmin",      bg: "#1a5a8a", text: "[mri_Qadmin] Resource index gerado em runtime: 183 resources." },
  { delay: 5780, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri_Qadmin" },
  { delay: 5950, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for mri_Qbox" },
  { delay: 6100, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri_Qbox" },
  { delay: 6250, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for mri_Qcarkeys" },
  { delay: 6400, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri_Qcarkeys" },
  { delay: 6600, badge: "citizen-scripting-core", bg: "#1a7a1a", text: "Creating script environments for mri_Qobjects" },
  { delay: 6750, badge: "resources",              bg: "#1a7a1a", text: "Started resource mri_Qobjects" },
  { delay: 7000, badge: "server",                 bg: "#555",    text: "^5[11.4.1-MariaDB] ^2Database server connection established!^0" },
  { delay: 7300, badge: "script:mri_Qadmin",      bg: "#1a5a8a", text: "^6FrameworkCache^7: ^2Cache Ready ^7(14.238s)" },
  { delay: 7600, badge: "script:ox_inventory",    bg: "#1a5a8a", text: "^5[ox_inventory] ^7[INFO] Inventory has loaded 530 items^7" },
  { delay: 7900, badge: "server",                 bg: "#555",    text: "^6FrameworkCache^7: ^4qbx^7_^4core^2 Loaded ^3901^2 Vehicles^7" },
  { delay: 8200, badge: "server",                 bg: "#555",    text: "^2Authenticated with cfx.re Nucleus: ^7https://deprecated-lerjmz7.users.cfx.re/" },
  { delay: 8600, badge: "resources",              bg: "#1a7a1a", text: "^2Server booted successfully. 183 resources loaded.^7" },
]

export function InstallerMockup() {
  const [globalStep, setGlobalStep] = useState(0)
  const [finalSubStep, setFinalSubStep] = useState(0)
  const [terminalVisible, setTerminalVisible] = useState(0)

  const [typedPath, setTypedPath] = useState("")
  const [typedServerName, setTypedServerName] = useState("")
  const targetPath = "C:\\mri_server"
  const targetServerName = "Meu Servidor FiveM"
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null)
  const [selectedRecipe, setSelectedRecipe] = useState<string | null>(null)
  const [installProgress, setInstallProgress] = useState(0)

  // Cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 }) // Hidden initially
  const [cursorClick, setCursorClick] = useState(false)
  const [isTypingActive, setIsTypingActive] = useState(false)

  // Container ref (the main content area — the cursor is positioned relative to this)
  const containerRef = useRef<HTMLDivElement>(null)

  // Clickable target refs per step
  const ref_s0_input   = useRef<HTMLDivElement>(null)
  const ref_s0_next    = useRef<HTMLDivElement>(null)
  const ref_s1_card    = useRef<HTMLDivElement>(null)
  const ref_s1_next    = useRef<HTMLDivElement>(null)
  const ref_s2_card    = useRef<HTMLDivElement>(null)
  const ref_s2_next    = useRef<HTMLDivElement>(null)
  const ref_s3_btn     = useRef<HTMLDivElement>(null)
  const ref_s5_input   = useRef<HTMLDivElement>(null)
  const ref_s5_btn     = useRef<HTMLDivElement>(null)
  const ref_s6_btn     = useRef<HTMLDivElement>(null)
  const terminalRef    = useRef<HTMLDivElement>(null) // auto-scroll terminal

  /** Auto-scroll terminal to bottom whenever a new line appears */
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [terminalVisible])

  /** Compute the center of an element as % of the container */
  const getCenter = useCallback((ref: React.RefObject<HTMLElement | null>): { x: number; y: number } | null => {
    if (!ref.current || !containerRef.current) return null
    const el = ref.current.getBoundingClientRect()
    const ct = containerRef.current.getBoundingClientRect()
    return {
      x: ((el.left + el.width  / 2 - ct.left) / ct.width)  * 100,
      y: ((el.top  + el.height / 2 - ct.top)  / ct.height) * 100,
    }
  }, [])

  useEffect(() => {
    // O mockup e exclusivo do desktop; nao execute a timeline quando ele esta
    // oculto pelo breakpoint mobile da pagina.
    if (window.matchMedia("(max-width: 767px)").matches) return

    let isActive = true
    const wait = (ms: number) => new Promise<void>(r => setTimeout(r, ms))

    const moveTo = async (ref: React.RefObject<HTMLElement | null>, speed = 900) => {
      if (!isActive) return
      await wait(80) // micro-wait for React to paint the element
      const pos = getCenter(ref)
      if (pos) setCursorPos(pos)
      await wait(speed)
    }

    const click = async () => {
      if (!isActive) return
      setCursorClick(true)
      await wait(120)
      setCursorClick(false)
      await wait(180)
    }

    const typeText = async (setter: (v: string) => void, target: string, speed = 65) => {
      for (let i = 0; i <= target.length; i++) {
        if (!isActive) return
        setter(target.slice(0, i))
        await wait(speed)
      }
    }

    const runTimeline = async () => {
      // ── RESET ──
      setGlobalStep(0)
      setFinalSubStep(0)
      setTerminalVisible(0)
      setTypedPath("")
      setTypedServerName("")
      setSelectedArtifact(null)
      setSelectedRecipe(null)
      setInstallProgress(0)
      setIsTypingActive(false)
      setCursorPos({ x: -100, y: -100 }) // hide off screen
      await wait(1600)
      if (!isActive) return

      // ── STEP 0: AMBIENTE ──
      await moveTo(ref_s0_input, 1000)   // glide to path input
      await click()
      setIsTypingActive(true)
      await wait(250)
      await typeText(setTypedPath, targetPath, 65)
      setIsTypingActive(false)
      await wait(700)

      await moveTo(ref_s0_next, 950)     // glide to Avançar
      await click()
      setGlobalStep(1)
      await wait(500)
      if (!isActive) return

      // ── STEP 1: ARTEFATO ──
      await moveTo(ref_s1_card, 1100)    // glide to Recomendado card
      await wait(350)
      await click()
      setSelectedArtifact("recommended")
      await wait(600)

      await moveTo(ref_s1_next, 950)     // glide to Avançar
      await click()
      setGlobalStep(2)
      await wait(500)
      if (!isActive) return

      // ── STEP 2: RECEITA ──
      await moveTo(ref_s2_card, 1100)    // glide to Qbox Base card
      await wait(350)
      await click()
      setSelectedRecipe("qbox")
      await wait(600)

      await moveTo(ref_s2_next, 950)     // glide to Avançar
      await click()
      setGlobalStep(3)
      await wait(500)
      if (!isActive) return

      // ── STEP 3: RESUMO ──
      // Drift over the summary rows (reading gesture) then settle on button
      await moveTo(ref_s3_btn, 1400)
      await wait(900)
      await click()
      setGlobalStep(4)
      await wait(500)
      if (!isActive) return

      // ── STEP 4: INSTALAÇÃO ──
      // Park the mouse in an idle corner while progress runs
      setCursorPos({ x: 85, y: 18 })
      for (let p = 0; p <= 100; p += (Math.random() * 2.5 + 0.5)) {
        if (!isActive) return
        setInstallProgress(Math.min(p, 100))
        await wait(100)
      }
      setInstallProgress(100)
      await wait(900)
      if (!isActive) return

      // ── STEP 5: CONFIGURAÇÃO ──
      setGlobalStep(5)
      setTypedServerName("")
      await wait(600)

      await moveTo(ref_s5_input, 1000)   // glide to server name input
      await click()
      await wait(250)
      await typeText(setTypedServerName, targetServerName, 60)
      await wait(500)

      await moveTo(ref_s5_btn, 950)      // glide to Finalizar
      await click()
      if (!isActive) return

      // ── STEP 6: FINALIZAÇÃO ──
      setGlobalStep(6)
      setFinalSubStep(0)
      await wait(1500)

      await moveTo(ref_s6_btn, 1000)     // glide to Iniciar Servidor
      await click()

      // Terminal
      setFinalSubStep(1)
      setTerminalVisible(0)
      for (let i = 0; i < terminalLines.length; i++) {
        if (!isActive) return
        await wait(terminalLines[i].delay - (i > 0 ? terminalLines[i - 1].delay : 0))
        setTerminalVisible(i + 1)
      }
      await wait(1500)

      setFinalSubStep(2)
      await wait(5000)

      if (isActive) runTimeline()
    }

    runTimeline()
    return () => { isActive = false }
  }, [getCenter])

  const getTaskStatus = (task: TaskDef): TaskStatus => {
    if (installProgress >= task.endAt) return "completed"
    if (installProgress >= task.startAt) return "running"
    return "pending"
  }

  const getTaskProgress = (task: TaskDef): number => {
    if (installProgress <= task.startAt) return 0
    if (installProgress >= task.endAt) return 100
    return ((installProgress - task.startAt) / (task.endAt - task.startAt)) * 100
  }

  return (
    <div className="w-full max-w-5xl mx-auto rounded-xl border border-white/10 bg-[#090b0a]/90 backdrop-blur-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-500 hover:border-primary/30 select-none">

      {/* Window chrome */}
      <div className="w-full h-10 border-b border-white/5 bg-[#0e1110] flex items-center px-4 gap-2 shrink-0">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="flex-1 text-center text-[11px] font-medium text-white/40 tracking-wider">
          MRI Qbox Server Installer
        </div>
      </div>

      <div className="flex h-[590px]">
        {/* Sidebar */}
        <div className="w-64 border-r border-white/5 bg-[#0c0f0e] p-6 flex flex-col shrink-0">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Cpu className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white">MRI Qbox Brasil</h2>
              <p className="text-[10px] font-mono text-white/40">1.23.2</p>
            </div>
          </div>
          <div className="flex flex-col gap-1 relative">
            <div className="absolute left-[11px] top-4 bottom-4 w-px bg-white/5" />
            {sidebarSteps.map((step, idx) => {
              const isA = globalStep === idx
              const past = globalStep > idx
              return (
                <div key={step} className="flex items-center gap-4 relative z-10 py-2">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all duration-500 bg-[#0c0f0e]",
                    isA ? "border-primary text-primary shadow-[0_0_10px_rgba(0,230,153,0.3)]" :
                    past ? "border-primary/50 text-primary/50" : "border-white/10 text-white/20"
                  )}>
                    {past ? <Check className="w-3 h-3" /> : <div className={cn("w-1.5 h-1.5 rounded-full", isA ? "bg-primary animate-pulse" : "bg-white/20")} />}
                  </div>
                  <span className={cn("text-sm font-semibold transition-colors duration-300", isA ? "text-white" : past ? "text-white/60" : "text-white/30")}>
                    {step}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* Main content — cursor is positioned relative to this div */}
        <div ref={containerRef} className="flex-1 bg-[#090b0a] flex flex-col relative overflow-hidden">

          {/* ── Cursor ── */}
          <div
            className="absolute z-50 pointer-events-none"
            style={{
              top:  cursorPos.y + "%",
              left: cursorPos.x + "%",
              transform: "translate(-2px, -2px)",
              transition: "top 900ms cubic-bezier(0.22,1,0.36,1), left 900ms cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <MousePointer2
              className={cn(
                "w-5 h-5 fill-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] transition-transform duration-100",
                cursorClick ? "scale-75" : "scale-100"
              )}
              style={{ filter: "drop-shadow(0 0 2px rgba(0,230,153,0.6))" }}
            />
          </div>

          {/* Top bar */}
          <div className="h-14 border-b border-white/5 px-8 flex items-center justify-between shrink-0 relative z-10">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest text-white/40">{sidebarSteps[globalStep]}</span>
            </div>
            <div className="px-3 py-1 rounded-full border border-primary/20 bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />Admin
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto relative z-10">

            {/* ── STEP 0: AMBIENTE ── */}
            {globalStep === 0 && (
              <div className="animate-in fade-in zoom-in-95 duration-500 max-w-xl mx-auto space-y-6 mt-2">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">Configure o Ambiente</h1>
                  <p className="text-sm text-white/40">Escolha onde o servidor será instalado e configure a conexão.</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Pasta Base</label>
                    <div ref={ref_s0_input} className={cn(
                      "flex items-center h-12 bg-black/40 border rounded-lg px-4 gap-3 transition-all duration-300 cursor-text",
                      isTypingActive ? "border-primary/60 shadow-[0_0_12px_rgba(0,230,153,0.12)]" : "border-white/10"
                    )}>
                      <Folder className="w-4 h-4 text-white/30 shrink-0" />
                      <span className="font-mono text-sm text-primary flex-1">
                        {typedPath}<span className={cn("opacity-0", isTypingActive && "opacity-100 animate-pulse")}>|</span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Conexão com Banco de Dados</label>
                    <div className="p-4 bg-black/40 border border-white/10 rounded-lg space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                        <span className="text-sm font-medium text-white">Instalar MariaDB automaticamente</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-1">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-white/40 uppercase">Usuário</label>
                          <div className="w-full h-10 bg-black/50 border border-white/5 rounded px-3 flex items-center text-sm font-mono text-white/60">root</div>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-white/40 uppercase">Senha</label>
                          <div className="flex items-center h-10 bg-black/50 border border-white/5 rounded px-3 gap-2">
                            <Key className="w-3.5 h-3.5 text-white/30" />
                            <span className="text-sm font-mono text-white/50">••••••••</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end pt-2">
                    <div ref={ref_s0_next} className={cn(
                      "px-6 py-2.5 font-bold uppercase text-xs tracking-wider rounded-lg flex items-center gap-2 transition-all duration-300 cursor-pointer",
                      typedPath === targetPath ? "bg-primary text-black shadow-[0_0_15px_rgba(0,230,153,0.3)]" : "bg-white/5 text-white/20 border border-white/5"
                    )}>
                      Avançar <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 1: ARTEFATO ── */}
            {globalStep === 1 && (
              <div className="animate-in fade-in slide-in-from-right-6 duration-400 max-w-2xl mx-auto space-y-6 mt-2">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tight uppercase text-white">Versão do FXServer</h2>
                  <p className="text-sm text-white/40">Selecione a versão dos artefatos do FiveM que deseja utilizar.</p>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60">Recomendações Oficiais</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div ref={ref_s1_card} className={cn(
                    "p-4 border rounded-xl bg-black/30 transition-all duration-300 cursor-pointer",
                    selectedArtifact === 'recommended' ? "border-primary ring-1 ring-primary/20 bg-primary/5" : "border-white/10"
                  )}>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">Recomendado</span>
                      {selectedArtifact === 'recommended' && <Check className="w-4 h-4 text-primary" />}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-white">10244</span>
                      <span className="px-1.5 py-0.5 rounded bg-primary/10 text-primary text-[8px] font-bold uppercase">Stable</span>
                    </div>
                  </div>
                  <div className="p-4 border border-white/10 rounded-xl bg-black/30 opacity-60">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-tight text-white/60">Mais Recente</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-black text-white">10250</span>
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-500 text-[8px] font-bold uppercase">Latest</span>
                    </div>
                    <div className="mt-3 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span className="text-[9px] text-amber-500/80">Pode conter instabilidades</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <div ref={ref_s1_next} className={cn(
                    "px-6 py-2.5 font-bold uppercase text-xs tracking-wider rounded-lg flex items-center gap-2 transition-all duration-300 cursor-pointer",
                    selectedArtifact !== null ? "bg-primary text-black shadow-[0_0_15px_rgba(0,230,153,0.3)]" : "bg-white/5 text-white/20 border border-white/5"
                  )}>
                    Avançar <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2: RECEITA ── */}
            {globalStep === 2 && (
              <div className="animate-in fade-in slide-in-from-right-6 duration-400 max-w-2xl mx-auto space-y-6 mt-2">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-black tracking-tight uppercase text-white">Receita do Servidor</h2>
                  <p className="text-sm text-white/40">Qual base você gostaria de instalar no seu servidor?</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div ref={ref_s2_card} className={cn(
                    "p-5 border rounded-xl transition-all duration-300 cursor-pointer",
                    selectedRecipe === 'qbox' ? "border-primary bg-primary/5 ring-1 ring-primary/20" : "border-white/10 bg-black/20"
                  )}>
                    <div className="w-10 h-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center mb-4">
                      <Box className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-base font-black text-white">MRI Qbox Base</h3>
                      {selectedRecipe === 'qbox' && <CheckCircle2 className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="text-[11px] text-white/50 leading-relaxed">Base robusta e moderna com Ox_Core, recursos otimizados e scripts nativos.</p>
                  </div>
                  <div className="p-5 border border-white/10 rounded-xl bg-black/20 opacity-40">
                    <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center mb-4">
                      <FileCode className="w-5 h-5 text-white/40" />
                    </div>
                    <h3 className="text-base font-black text-white mb-2">Plume ESX (Legacy)</h3>
                    <p className="text-[11px] text-white/50 leading-relaxed">Base ESX clássica. Sem as otimizações do ecossistema Qbox moderno.</p>
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <div ref={ref_s2_next} className={cn(
                    "px-6 py-2.5 font-bold uppercase text-xs tracking-wider rounded-lg flex items-center gap-2 transition-all duration-300 cursor-pointer",
                    selectedRecipe !== null ? "bg-primary text-black shadow-[0_0_15px_rgba(0,230,153,0.3)]" : "bg-white/5 text-white/20 border border-white/5"
                  )}>
                    Avançar <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3: RESUMO ── */}
            {globalStep === 3 && (
              <div className="animate-in fade-in slide-in-from-right-6 duration-400 max-w-xl mx-auto space-y-6 mt-2">
                <div className="text-center space-y-2 mb-4">
                  <h2 className="text-3xl font-black tracking-tight uppercase text-white">Resumo da Instalação</h2>
                  <p className="text-sm text-white/40">Revise suas escolhas antes de iniciar o deploy.</p>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3"><Folder className="w-4 h-4 text-white/40" /><span className="text-sm text-white/60">Pasta Base</span></div>
                    <span className="text-sm font-mono text-primary">C:\mri_server</span>
                  </div>
                  <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3"><Globe className="w-4 h-4 text-white/40" /><span className="text-sm text-white/60">Artefato FXServer</span></div>
                    <span className="text-sm font-bold text-white">10244 (Recomendado)</span>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3"><Box className="w-4 h-4 text-white/40" /><span className="text-sm text-white/60">Receita</span></div>
                    <span className="text-sm font-bold text-white">MRI Qbox Base</span>
                  </div>
                </div>
                <div className="pt-4 flex justify-center">
                  <div ref={ref_s3_btn} className="inline-flex px-10 py-4 bg-primary text-black font-black uppercase text-sm tracking-widest rounded-xl items-center gap-3 shadow-[0_0_30px_rgba(0,230,153,0.4)] cursor-pointer">
                    Iniciar Instalação <Play className="w-4 h-4 fill-black" />
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 4: INSTALAÇÃO ── */}
            {globalStep === 4 && (
              <div className="animate-in fade-in slide-in-from-right-6 duration-400 max-w-2xl mx-auto space-y-6 mt-2">
                <div className="space-y-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">Deploying Server</p>
                      <p className="text-sm font-medium text-white/50">Executando tarefas em background...</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black font-mono tracking-tighter text-primary">{Math.floor(installProgress)}</span>
                      <span className="text-sm font-bold text-primary/40">%</span>
                    </div>
                  </div>
                  <div className="relative h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="absolute top-0 left-0 h-full bg-primary transition-all duration-150 ease-linear shadow-[0_0_10px_rgba(0,230,153,0.5)]" style={{ width: installProgress + "%" }} />
                  </div>
                </div>
                <div className="space-y-2">
                  {tasksDef.map((task) => {
                    const status = getTaskStatus(task)
                    const lp = getTaskProgress(task)
                    const Icon = task.icon
                    return (
                      <div key={task.id} className={cn(
                        "flex flex-col gap-2 p-3 rounded-lg border transition-all duration-300",
                        status === 'running' ? "bg-primary/10 border-primary/30 shadow-sm" :
                        status === 'completed' ? "bg-white/5 border-transparent opacity-60" :
                        "bg-transparent border-white/5 opacity-40"
                      )}>
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-md flex items-center justify-center shrink-0",
                            status === 'running' ? "bg-primary text-black shadow-[0_0_15px_rgba(0,230,153,0.4)]" :
                            status === 'completed' ? "bg-primary/20 text-primary" : "bg-white/5 text-white/40"
                          )}>
                            {status === 'completed' ? <CheckCircle2 className="w-4 h-4" /> : status === 'running' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Icon className="w-4 h-4" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className={cn("text-xs font-bold uppercase tracking-tight truncate", status === 'running' ? "text-primary" : "text-white")}>{task.name}</h4>
                              <span className="text-[10px] font-mono text-white/40">{status === 'pending' ? 'WAITING' : status === 'completed' ? 'DONE' : Math.floor(lp) + "%"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="pl-11 pr-1">
                          <div className={cn("h-1 bg-white/5 rounded-full overflow-hidden", status === 'pending' ? "opacity-0" : "opacity-100")}>
                            <div className={cn("h-full transition-all duration-150", status === 'completed' ? 'bg-primary/50' : 'bg-primary')} style={{ width: lp + "%" }} />
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* ── STEP 5: CONFIGURAÇÃO ── */}
            {globalStep === 5 && (
              <div className="animate-in fade-in slide-in-from-right-6 duration-400 max-w-xl mx-auto space-y-5 mt-2">
                <div className="text-center space-y-2">
                  <h1 className="text-3xl font-black uppercase tracking-tight text-white">Configuração do Servidor</h1>
                  <p className="text-sm text-white/40">Quase lá! Defina os detalhes finais do seu ambiente.</p>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Nome do Servidor</label>
                    <div ref={ref_s5_input} className={cn(
                      "flex items-center h-12 bg-black/40 border rounded-lg px-4 gap-3 transition-all duration-300 cursor-text",
                      typedServerName.length > 0 && typedServerName.length < targetServerName.length
                        ? "border-primary/60 shadow-[0_0_12px_rgba(0,230,153,0.12)]" : "border-white/10"
                    )}>
                      <Globe className="w-4 h-4 text-white/30 shrink-0" />
                      <span className="text-sm flex-1 text-white">
                        {typedServerName || <span className="text-white/30">Meu Servidor FiveM</span>}
                        <span className={cn("opacity-0", typedServerName.length > 0 && typedServerName.length < targetServerName.length && "opacity-100 animate-pulse")}>|</span>
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Licença CFX.re</label>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-primary/70">Obter Chave ↗</span>
                    </div>
                    <div className="flex items-center h-12 bg-black/40 border border-white/10 rounded-lg px-4 gap-3">
                      <Key className="w-4 h-4 text-white/30 shrink-0" />
                      <span className="text-sm font-mono text-white/40 tracking-widest flex-1">••••••••••••••••••••••••••••••••••</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-white/60">Cor do Servidor (MRI)</label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 flex items-center h-12 bg-black/40 border border-white/10 rounded-lg px-4 gap-3">
                        <Palette className="w-4 h-4 text-white/30 shrink-0" />
                        <span className="text-sm font-mono text-primary">#00E699</span>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,230,153,0.4)] border-2 border-white/10">
                        <Check className="w-5 h-5 text-black font-black" />
                      </div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <div ref={ref_s5_btn} className={cn(
                      "w-full h-14 font-black uppercase text-sm tracking-widest rounded-xl flex items-center justify-center gap-3 transition-all duration-500 cursor-pointer",
                      typedServerName === targetServerName
                        ? "bg-primary text-black shadow-[0_0_25px_rgba(0,230,153,0.4)]"
                        : "bg-primary/20 text-primary/40 border border-primary/20"
                    )}>
                      Finalizar Configuração
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 6 sub0: SUCESSO ── */}
            {globalStep === 6 && finalSubStep === 0 && (
              <div className="animate-in zoom-in-95 fade-in duration-600 h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(0,230,153,0.3)]">
                  <Check className="w-12 h-12 text-primary" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-4">Sucesso!</h1>
                <p className="text-white/60 mb-8 leading-relaxed">O seu servidor foi instalado com sucesso e já está pronto para rodar!</p>
                <div ref={ref_s6_btn} className="px-8 py-3.5 bg-primary text-black font-black uppercase text-sm tracking-wider rounded-xl shadow-[0_0_20px_rgba(0,230,153,0.3)] cursor-pointer flex items-center gap-2">
                  <Play className="w-4 h-4 fill-black" />
                  Iniciar Servidor Agora
                </div>
              </div>
            )}

            {/* ── STEP 6 sub1: TERMINAL ── */}
            {globalStep === 6 && finalSubStep === 1 && (
              <div className="animate-in fade-in duration-400 h-full flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-black uppercase tracking-widest text-green-400/80">Console do Servidor</span>
                </div>
                <div ref={terminalRef} className="flex-1 bg-[#0d0f0e] border border-white/10 rounded-xl px-3 py-3 font-mono text-[10px] leading-5 flex flex-col gap-0.5 overflow-y-auto scroll-smooth pointer-events-none [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none' }}>
                  {terminalLines.slice(0, terminalVisible).map((line, i) => (
                    <div key={i} className="animate-in fade-in duration-200 flex items-start gap-2 min-w-0">
                      {/* Colored badge like FXServer console */}
                      <span
                        className="shrink-0 px-1 rounded text-[8px] font-bold text-white/90 whitespace-nowrap mt-[1px]"
                        style={{ backgroundColor: line.bg }}
                      >
                        {line.badge}
                      </span>
                      {/* Text with ^N color parsing */}
                      <span className="break-all">
                        {line.text.split(/(\^\d)/).reduce<React.ReactNode[]>((acc, part, pi, arr) => {
                          const colorMap: Record<string, string> = {
                            '0': '#ffffff', '1': '#ff4444', '2': '#44dd44', '3': '#dddd44',
                            '4': '#6688ff', '5': '#44dddd', '6': '#dd66ff', '7': '#cccccc',
                            '8': '#ff8844', '9': '#ffff88'
                          }
                          if (/^\^\d$/.test(part)) return acc
                          // find last ^N before this segment
                          let color = '#aaaaaa'
                          for (let j = pi - 1; j >= 0; j--) {
                            if (/^\^\d$/.test(arr[j])) { color = colorMap[arr[j][1]] || '#aaaaaa'; break }
                          }
                          if (part) acc.push(<span key={pi} style={{ color }}>{part}</span>)
                          return acc
                        }, [])}
                      </span>
                    </div>
                  ))}
                  {terminalVisible < terminalLines.length && (
                    <div className="flex items-center gap-2">
                      <span className="px-1 rounded text-[8px] font-bold text-white/30 bg-white/5">server</span>
                      <span className="text-white/30 animate-pulse">_</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ── STEP 6 sub2: OBRIGADO ── */}
            {globalStep === 6 && finalSubStep === 2 && (
              <div className="animate-in zoom-in-95 fade-in duration-700 h-full flex flex-col items-center justify-center text-center">
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Heart className="w-8 h-8 text-primary fill-primary" />
                  <Heart className="w-5 h-5 text-primary/50 fill-primary/50" />
                </div>
                <h1 className="text-4xl font-black uppercase tracking-tight text-white mb-3">Obrigado!</h1>
                <p className="text-xl text-primary font-bold mb-3">Por escolher a MRI Qbox</p>
                <p className="text-sm text-white/50 leading-relaxed max-w-xs">
                  A sua framework FiveM brasileira, open-source e feita com 💚 para a comunidade.
                </p>
                <div className="mt-8 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs font-bold text-primary">docs.mriqbox.com.br</span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
