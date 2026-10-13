// Gera o índice Pagefind após o `next build`, nos dois modos:
// - export (GITHUB_PAGES=true): indexa out/docs/** e escreve em out/pagefind.
// - Vercel (server): indexa o HTML pré-renderizado em .next/server/app e
//   escreve em public/pagefind (servido como estático pelo `next start` e
//   incluído no deploy da Vercel).
// Só docs/** entra no índice (idioma pt-br): as páginas de marketing dos
// locales (en/es/pt-pt) ficam fora, igual à busca Orama anterior.
import { execFileSync } from "node:child_process"

const isExport = process.env.GITHUB_PAGES === "true"

if (isExport) {
  execFileSync(
    "npx",
    ["pagefind", "--site", "out", "--glob", "docs/**/*.html"],
    { stdio: "inherit" },
  )
} else {
  execFileSync(
    "npx",
    [
      "pagefind",
      "--site",
      ".next/server/app",
      "--glob",
      "{docs.html,docs/**/*.html}",
      "--output-path",
      "public/pagefind",
    ],
    { stdio: "inherit" },
  )
}
