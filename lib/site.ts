// Canonical host: GitHub Pages serves www and the apex redirects to it.
export const SITE_URL = "https://www.mriqbox.com.br"

// Pages are exported as route/index.html, so canonical URLs end with a slash to match what GitHub Pages serves.
export function absoluteUrl(path: string) {
  return `${SITE_URL}${path.endsWith("/") ? path : `${path}/`}`
}
