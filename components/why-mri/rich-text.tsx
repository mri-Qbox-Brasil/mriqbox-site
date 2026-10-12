import Link from "next/link"
import { ROUTES, type Locale, type RouteId } from "@/lib/i18n"

// Inline rich text kept as plain data so dictionaries stay serializable.
export type Segment =
  | string
  | { strong: string }
  | { highlight: string }
  | { link: string; route: RouteId }
  | { link: string; href: string }
export type Rich = Segment[]

const linkClass = "text-primary hover:underline"

function renderSegment(segment: Segment, locale: Locale, key: number) {
  if (typeof segment === "string") return segment
  if ("strong" in segment) {
    return (
      <strong key={key} className="text-foreground">
        {segment.strong}
      </strong>
    )
  }
  if ("highlight" in segment) {
    return (
      <strong key={key} className="text-primary">
        {segment.highlight}
      </strong>
    )
  }
  if ("route" in segment) {
    return (
      <Link key={key} href={ROUTES[segment.route][locale]} className={linkClass}>
        {segment.link}
      </Link>
    )
  }
  if (segment.href.startsWith("http")) {
    return (
      <a key={key} href={segment.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {segment.link}
      </a>
    )
  }
  return (
    <Link key={key} href={segment.href} className={linkClass}>
      {segment.link}
    </Link>
  )
}

export function RichText({ text, locale }: { text: Rich; locale: Locale }) {
  return <>{text.map((segment, i) => renderSegment(segment, locale, i))}</>
}
