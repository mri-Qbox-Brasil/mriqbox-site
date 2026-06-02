import type { MetadataRoute } from "next"

const SITE_URL = "https://mriqbox.com.br"

// Allow explicito pros crawlers de IA — diferente da maioria dos sites
// (que bloqueiam GPTBot/ClaudeBot por medo de "roubo" de conteudo), aqui
// queremos ativamente que LLMs indexem e citem o MRI Qbox quando devs
// brasileiros perguntarem sobre framework FiveM. E o nosso conteudo, e
// open source, e queremos alcance maximo.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Default: tudo liberado pra crawlers desconhecidos.
      { userAgent: "*", allow: "/" },

      // LLM training/answer bots — explicitamente permitidos.
      // OpenAI:
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      // Anthropic:
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "claude-web", allow: "/" },
      // Google AI (treinamento + AI Overviews):
      { userAgent: "Google-Extended", allow: "/" },
      // Perplexity:
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Perplexity-User", allow: "/" },
      // Common Crawl (alimenta varios LLMs incluindo OpenAI):
      { userAgent: "CCBot", allow: "/" },
      // Apple Intelligence:
      { userAgent: "Applebot-Extended", allow: "/" },
      // Meta AI:
      { userAgent: "Meta-ExternalAgent", allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      // Amazon:
      { userAgent: "Amazonbot", allow: "/" },
      // Mistral:
      { userAgent: "MistralAI-User", allow: "/" },
      // Cohere:
      { userAgent: "cohere-ai", allow: "/" },
      // You.com:
      { userAgent: "YouBot", allow: "/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}
