import type { Metadata } from "next"
import type { Locale } from "@/lib/i18n"
import { SUPPORT_PATHS, supportDictionary } from "@/components/support/dictionary"

export function supportMetadata(locale: Locale): Metadata {
  const { meta } = supportDictionary[locale]
  const path = SUPPORT_PATHS[locale]
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: { "pt-BR": SUPPORT_PATHS["pt-BR"], en: SUPPORT_PATHS.en, "x-default": SUPPORT_PATHS["pt-BR"] },
    },
    openGraph: {
      title: meta.title,
      description: meta.ogDescription,
      url: path,
      type: "website",
      locale: locale === "en" ? "en_US" : "pt_BR",
    },
    twitter: { card: "summary", title: meta.title },
  }
}
