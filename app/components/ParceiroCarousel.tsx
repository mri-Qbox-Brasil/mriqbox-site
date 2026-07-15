"use client"

import Image from "next/image"
import { useState } from "react"
import type { Parceiro } from "@/config/parceiros"

interface Props {
  parceiros: Parceiro[]
}

export function ParceiroCarousel({ parceiros }: Props) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [paused, setPaused] = useState(false)

  // Duplicate items 4 times to ensure it fills even ultrawide screens
  const items = [...parceiros, ...parceiros, ...parceiros, ...parceiros]

  return (
    <div
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHoveredIndex(null) }}
    >
      {/* Fade masks on left and right edges */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 z-10 bg-gradient-to-l from-background to-transparent" />

      <div
        className="flex w-max"
        style={{
          animation: "marquee 40s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {items.map((p, i) => {
          const isHovered = hoveredIndex === i
          // Since items are duplicated 4 times, we calculate the original index to highlight all copies of the same logo
          const originalIndex = i % parceiros.length
          const hoveredOriginal = hoveredIndex !== null ? hoveredIndex % parceiros.length : null
          
          const isThisHovered = hoveredOriginal === originalIndex
          const isOtherHovered = hoveredOriginal !== null && hoveredOriginal !== originalIndex

          return (
            <a
              key={`${p.name}-${i}`}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              title={p.name}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="flex items-center justify-center shrink-0 transition-all duration-400 pr-24"
              style={{
                filter: isThisHovered
                  ? "grayscale(0%) brightness(1.1) opacity(1)"
                  : isOtherHovered
                  ? "grayscale(100%) opacity(0.15)"
                  : "grayscale(100%) opacity(0.25)",
                transform: isThisHovered ? "scale(1.08)" : "scale(1)",
                transition: "filter 350ms ease, transform 350ms ease",
              }}
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={200}
                height={80}
                className="object-contain h-16 w-auto"
                draggable={false}
              />
            </a>
          )
        })}
      </div>

      <style jsx>{`
        @keyframes marquee {
          0%   { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  )
}
