"use client"

import Image from "next/image"
import { supportDictionary } from "@/components/support/dictionary"
import type { Locale } from "@/lib/i18n"
import { DATA_BRANCH_URL, useLiveData } from "@/lib/live-data"
import { parseSupporters, type Supporter } from "@/lib/supporters"

// Hidden while the list is empty, so a failed fetch never shows an empty wall.
export function LiveSupporters({ initial, locale }: { initial: Supporter[]; locale: Locale }) {
  const supporters = useLiveData(`${DATA_BRANCH_URL}/supporters.json`, initial, parseSupporters)
  const t = supportDictionary[locale].supporters
  if (!supporters.length) return null

  return (
    <section className="mt-16">
      <h2 className="text-2xl font-bold text-foreground mb-2">{t.title}</h2>
      <p className="text-sm text-muted-foreground mb-6">
        {supporters.length === 1
          ? t.countOne
          : t.countMany(supporters.length)}
      </p>
      <ul className="flex flex-wrap gap-3">
        {supporters.map((s, i) => (
          <li
            key={`${s.name}-${i}`}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4"
          >
            <Image
              src={s.avatar}
              alt=""
              width={28}
              height={28}
              unoptimized
              className="rounded-full"
            />
            <span className="text-sm text-foreground">{s.name}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-muted-foreground/70 mt-4">
        {t.note}
      </p>
    </section>
  )
}
