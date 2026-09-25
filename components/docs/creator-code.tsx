"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface CreatorCodeProps {
  storeName: string
  storeLink: string
  storeImage: string
  code: string
  percentOff: number
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <button
      type="button"
      aria-label="Copiar código"
      onClick={() => {
        navigator.clipboard?.writeText(text).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 1500)
        })
      }}
      className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary"
    >
      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </button>
  )
}

export function CreatorCode({ storeName, storeLink, storeImage, code, percentOff }: CreatorCodeProps) {
  return (
    <Card className="overflow-hidden p-0">
      <a
        href={storeLink}
        target="_blank"
        rel="noreferrer"
        className="flex h-[150px] items-center justify-center bg-secondary transition-colors hover:bg-muted"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="self-center" width={150} src={storeImage} alt={storeName} />
      </a>
      <CardContent className="flex flex-col items-center gap-2 p-2">
        <p className="line-clamp-1 text-lg font-bold">{storeName}</p>
        <p className="flex items-center gap-1 text-sm">
          Code: <code className="font-bold">{code}</code>
          <CopyButton text={code} />
        </p>
        <p className="mt-4 self-end text-sm font-bold text-destructive-foreground">{percentOff}% off</p>
      </CardContent>
    </Card>
  )
}

type CreatorTuple = [string, string, string, number, string]

export function CreatorCodes({ data, className }: { data: CreatorTuple[]; className?: string }) {
  return (
    <div className={cn("mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4", className)}>
      {[...data]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([storeName, storeLink, code, percentOff, storeImage]) => (
          <CreatorCode
            key={storeName}
            storeName={storeName}
            storeLink={storeLink}
            code={code}
            percentOff={percentOff}
            storeImage={storeImage}
          />
        ))}
    </div>
  )
}

export default CreatorCode
