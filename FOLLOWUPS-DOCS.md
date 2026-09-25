# Documentação (Fumadocs): notas

A documentação mora neste repo, sob `/docs` (Fumadocs). A migração do Nextra
(`docs-mriqbox`, hoje arquivado) está concluída.

---

## Como as docs de recursos se atualizam

- Cada repo de script chama o `callable-repo-dispatch.yml` do repo
  `mri-Qbox-Brasil/workflows`, que manda um `repository_dispatch`
  (`update-manual`) para cá quando o `MANUAL.md` muda.
- `.github/workflows/update-doc.yml` recebe o aviso e roda
  `.release/ingest-docs.js`: baixa o `MANUAL.md`, publica em
  `content/docs/mri/resources/<slug>.md` e regenera o `meta.json`.
- `.github/workflows/sync-all-docs.yml` reconcilia o catálogo inteiro
  (`docs-repos.json`, no repo `workflows`) toda segunda e via
  `workflow_dispatch`, como rede de segurança para avisos perdidos.
- Os dois usam o `GH_TOKEN` da organização para ler os manuais (há repo
  `-source` privado) e o `GITHUB_TOKEN` (`contents: write`) para dar push.

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
- **Labels da sidebar:** o `title` do frontmatter de cada página. Nos resources
  vem do `name` do catálogo.
- **`mri_Qadmin`, `mri_Qchat`, `mri_Qhud`:** estão no catálogo mas ainda não
  têm `MANUAL.md`. A página `mri_Qadmin.md` foi escrita à mão e o sync não a
  apaga.
