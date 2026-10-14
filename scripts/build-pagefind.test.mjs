import { test } from "node:test"
import assert from "node:assert/strict"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { mdxToHtml, urlFor } from "./build-pagefind.mjs"

const docs = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../content/docs")

test("urlFor segue as rotas do fumadocs (index, grupos, .md)", () => {
  assert.equal(urlFor(path.join(docs, "index.mdx")), "/docs")
  assert.equal(urlFor(path.join(docs, "guides/index.mdx")), "/docs/guides")
  assert.equal(urlFor(path.join(docs, "guides/keybinds.md")), "/docs/guides/keybinds")
  assert.equal(urlFor(path.join(docs, "mri/(extra)/x.mdx")), "/docs/mri/x")
})

test("mdxToHtml gera título, headings com id do fumadocs e ignora fences", () => {
  const { title, html } = mdxToHtml(`---
title: "Instalação"
description: Como instalar
---

<Steps>
    ### Baixe o **instalador**
</Steps>

## \`Config.Main.Locations[<chave>]\`

## nve_iced_alamo

## Título custom [#meu-id]

## Baixe o instalador

\`\`\`lua
-- # não é heading
exports.qbx_core:GetJob('police')
\`\`\`
`)
  assert.equal(title, "Instalação")
  assert.match(html, /<h1>Instalação<\/h1>/)
  assert.match(html, /<p>Como instalar<\/p>/)
  assert.match(html, /<h3 id="baixe-o-instalador">Baixe o instalador<\/h3>/)
  assert.match(html, /<h2 id="configmainlocationschave">Config\.Main\.Locations\[&lt;chave&gt;\]<\/h2>/)
  assert.match(html, /<h2 id="nve_iced_alamo">/)
  assert.match(html, /<h2 id="meu-id">Título custom<\/h2>/)
  assert.match(html, /<h2 id="baixe-o-instalador-1">/)
  assert.match(html, /<pre><code>-- # não é heading\nexports\.qbx_core:GetJob\('police'\)<\/code><\/pre>/)
  assert.doesNotMatch(html, /Steps/)
})
