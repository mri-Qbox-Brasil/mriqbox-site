// Inline rich text: plain string, inline code, bold text or an external link.
export type Inline = string | { code: string; plain?: boolean } | { strong: string } | { href: string; text: string }

export type RichText = Inline[]

export type LegalBlock = { paragraph: RichText } | { list: RichText[] }

export type LegalSection = { title: string; blocks: LegalBlock[] }

export type LegalDictionary = {
  meta: { title: string; description: string }
  back: string
  home: string
  crumb: string
  heading: string
  updated: string
  intro: RichText
  sections: LegalSection[]
}
