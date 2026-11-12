# Documentação (Fumadocs): notas

A documentação mora neste repo, sob `/docs` (Fumadocs). A migração do Nextra
(`docs-mriqbox`, hoje arquivado) está concluída.

---

## Como as docs de recursos se atualizam

**Fonte única de verdade: as receitas do `mriTxRecipe` (branch `main`).** Não há
catálogo à mão. Regras em `.release/ingest-docs.js`:

- ativo na `base.yaml` → publica (a lite é um pedaço da base);
- ativo só na `beta.yaml` → publica com "(beta)" no título e um aviso no topo,
  se a variável `DOCS_PUBLISH_BETA` deste repo não for `false` (vazia = ligada);
- fora das receitas (ou comentado), ou sem `MANUAL.md` → não publica e **a
  página é apagada**. Página escrita à mão aqui também some no próximo sync.

O `MANUAL.md` vem do `<repo>-source` quando ele tem o arquivo, senão do próprio
repo; a página sai com o nome do repo da receita. O título vem do nome do repo
(`mri_Qblips_v1` → "MRI Qblips v1").

Tudo roda em `.github/workflows/sync-all-docs.yml`:

- `repository_dispatch` `update-manual` (o `callable-repo-dispatch` do repo
  `workflows`, quando um `MANUAL.md` muda) → atualiza só aquele slug;
- `repository_dispatch` `recipe-updated` (o `callable-recipe-release`, a cada
  push na `main` do `mriTxRecipe`) → reconcilia tudo;
- toda segunda e via `workflow_dispatch` → reconcilia tudo (ou o CSV `only`).

Erro de API que não seja 404 aborta antes de escrever ou apagar. Usa o
`GH_TOKEN` da organização para ler receitas e manuais (há repo `-source`
privado) e o `GITHUB_TOKEN` (`contents: write`) para dar push.

## `docs.mriqbox.com.br`

Redirecionado na **Cloudflare** (Redirect Rules da zona `mriqbox.com.br`, 301):
`/qbox` → `https://docs.qbox.re` e o resto →
`https://www.mriqbox.com.br/docs/<caminho>`. O registro DNS `docs` precisa
continuar existindo e **proxied** (nuvem laranja) para as regras valerem.

---

## Notas / decisões

- **Build via `--webpack`:** o Turbopack do Next 16 não parseia as regras que o
  `fumadocs-mdx` injeta. `dev` e `build` usam `--webpack`.
- **`fumadocs-mdx` pinado em `15.1.1`:** a `15.2.0` puxa `yuku-analyzer` →
  `yuku-ast@0.6.5` (inexistente no npm). Não subir sem revalidar.
- **Busca:** Orama, sem Algolia, tokenizado em português. Na Vercel roda no
  servidor (o índice estático passou do limite de 19 MB por resposta
  pré-renderizada); no GitHub Pages (`output: export`) o índice é estático. O
  endpoint inclui o basePath (`/mriqbox-site/api/search` no GitHub Pages, raiz
  em produção) via `NEXT_PUBLIC_BASE_PATH`.
- **Labels da sidebar:** o `title` do frontmatter de cada página, gerado do nome
  do repo da receita.
