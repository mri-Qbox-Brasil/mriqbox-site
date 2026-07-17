"use client"

import React, { useEffect, useState } from "react"
import { Github, Tag, FileText, Download, Package } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props {
  side?: "left" | "right"
  link?: string
  label?: string
  repo?: string
}

interface ReleaseInfo {
  tag_name: string
  published_at: string
  downloads: number
}

// Estilo de botão-link no design do site (verde de marca, tinta suave).
const BTN =
  "no-underline inline-flex items-center gap-2 rounded-md border border-primary/20 bg-primary/15 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary/25"
const ICON = "h-4 w-4 shrink-0"

function formatRelativeTime(iso: string) {
  const rtf = new Intl.RelativeTimeFormat("pt-BR", { numeric: "auto" })
  const diffMs = new Date(iso).getTime() - Date.now()
  const diffSec = Math.round(diffMs / 1000)
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 60 * 60 * 24 * 365],
    ["month", 60 * 60 * 24 * 30],
    ["day", 60 * 60 * 24],
    ["hour", 60 * 60],
    ["minute", 60],
    ["second", 1],
  ]
  for (const [unit, secs] of units) {
    if (Math.abs(diffSec) >= secs || unit === "second") {
      return rtf.format(Math.round(diffSec / secs), unit)
    }
  }
  return ""
}

function useLatestRelease(repo?: string) {
  const [release, setRelease] = useState<ReleaseInfo | null>(null)

  useEffect(() => {
    if (!repo) return

    const cacheKey = `gh-release:${repo}`
    try {
      const cached = sessionStorage.getItem(cacheKey)
      if (cached) {
        setRelease(JSON.parse(cached))
        return
      }
    } catch {}

    fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`)
      .then((r) => (r.ok ? r.json() : null))
      .then((releases) => {
        if (!Array.isArray(releases) || releases.length === 0) return
        const published = releases.filter((r: any) => !r.draft && !r.prerelease)
        const latest = published[0] ?? releases[0]
        const downloads = releases.reduce(
          (sum: number, r: any) =>
            sum + (r.assets ?? []).reduce((s: number, a: any) => s + (a.download_count ?? 0), 0),
          0,
        )
        const info: ReleaseInfo = {
          tag_name: latest.tag_name,
          published_at: latest.published_at,
          downloads,
        }
        setRelease(info)
        try {
          sessionStorage.setItem(cacheKey, JSON.stringify(info))
        } catch {}
      })
      .catch(() => {})
  }, [repo])

  return release
}

function LinkButton({
  icon,
  defaultLabel,
  label,
  link,
  side = "left",
}: Props & { icon: React.ReactNode; defaultLabel: string }) {
  return (
    <a href={link} target="_blank" rel="noreferrer" className={BTN}>
      {side === "left" && icon}
      {label || defaultLabel}
      {side === "right" && icon}
    </a>
  )
}

export function GhButton(props: Props) {
  return <LinkButton icon={<Github className={ICON} />} defaultLabel="Github" {...props} />
}

export function DocButton(props: Props) {
  return <LinkButton icon={<FileText className={ICON} />} defaultLabel="Documentação" {...props} />
}

export function ReleaseButton(props: Props) {
  return <LinkButton icon={<Tag className={ICON} />} defaultLabel="Releases" {...props} />
}

export function NpmButton(props: Props) {
  return <LinkButton icon={<Package className={ICON} />} defaultLabel="Pacote" {...props} />
}

export function DownloadButton(props: Props) {
  const release = useLatestRelease(props.repo)

  return (
    <a href={props.link} target="_blank" rel="noreferrer" className={cn(BTN, "items-start")}>
      <Download className={cn(ICON, "mt-0.5")} />
      <span className="flex flex-col leading-tight">
        <span>{props.label || "Download"}</span>
        {release && (
          <span className="text-xs font-normal opacity-75">
            {release.tag_name} · atualizado {formatRelativeTime(release.published_at)} ·{" "}
            {release.downloads.toLocaleString("pt-BR")} downloads
          </span>
        )}
      </span>
    </a>
  )
}

export default function Button(
  props: Props & { icon?: React.ReactNode; children?: React.ReactNode },
) {
  return (
    <LinkButton
      icon={props.icon}
      defaultLabel={typeof props.children === "string" ? props.children : "Button"}
      label={typeof props.children === "string" ? props.children : undefined}
      link={props.link}
      side={props.side}
    />
  )
}
