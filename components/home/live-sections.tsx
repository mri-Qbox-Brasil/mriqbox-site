"use client"

import Image from "next/image"
import { Coffee } from "lucide-react"
import { Github } from "@/components/icons/github"
import { parseArtifactsDb, type ArtifactsDb } from "@/lib/artifacts-db"
import {
  DISCORD_INVITE_URL,
  TEAM_MEMBERS_URL,
  parseDiscordMemberCount,
  parseTeamMembers,
  type TeamMember,
} from "@/lib/community"
import type { Locale } from "@/lib/i18n"
import { DATA_BRANCH_URL, useLiveData } from "@/lib/live-data"
import type { MockupDictionary } from "./content"
import { InstallerMockup } from "./InstallerMockup"

export function TeamBadgeAvatars({ initial }: { initial: TeamMember[] }) {
  const members = useLiveData(TEAM_MEMBERS_URL, initial, parseTeamMembers)
  return members.slice(0, 4).map((member) => (
    <div key={member.login} className="relative w-6 h-6 rounded-full overflow-hidden border-2 border-background">
      <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
    </div>
  ))
}

export function TeamGrid({ initial, supportLabel }: { initial: TeamMember[]; supportLabel: string }) {
  const members = useLiveData(TEAM_MEMBERS_URL, initial, parseTeamMembers)
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
      {members.map((member) => (
        <div key={member.login} className="group flex h-full flex-col items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.015] p-5 transition-colors hover:border-primary/20 hover:bg-primary/[0.025]">
          <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 transition-colors group-hover:border-primary/50">
            <Image src={member.avatar_url} alt={member.login} fill className="object-cover" />
          </div>

          <div className="flex w-full flex-1 flex-col justify-end gap-2">
            <a href={member.html_url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-primary/20 bg-[#091811] px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-[#0d2218]">
              <Github className="w-4 h-4" />
              {member.login}
            </a>
            {member.kofi_username && (
              <a href={`https://ko-fi.com/${member.kofi_username}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-4 py-2 text-sm font-semibold text-white/65 transition-colors hover:border-primary/20 hover:bg-primary/5 hover:text-primary">
                <Coffee className="w-4 h-4" />
                {supportLabel}
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DiscordCount({ initial, locale }: { initial: number; locale: Locale }) {
  const count = useLiveData(DISCORD_INVITE_URL, initial, parseDiscordMemberCount)
  const value = new Intl.NumberFormat(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(count / 1000)
  return `+${value}k`
}

export function LiveInstallerMockup({ initial, t, className }: { initial: ArtifactsDb; t: MockupDictionary; className?: string }) {
  const artifacts = useLiveData(`${DATA_BRANCH_URL}/artifacts.json`, initial, parseArtifactsDb)
  return (
    <InstallerMockup
      t={t}
      className={className}
      recommendedArtifact={artifacts.recommendedArtifact}
      brokenArtifactsCount={artifacts.brokenArtifacts.length}
      artifactsSynced={artifacts.synced}
    />
  )
}
