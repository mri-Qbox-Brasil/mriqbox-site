# Follow-ups da migração da documentação (Fumadocs)

A documentação foi trazida para dentro do site (Fumadocs sob `/docs`, branch
`redesign`). O que segue depende de ações fora do código ou do **cutover para
produção** (quando `redesign` for mergeada na `main` e publicada na Vercel em
`mriqbox.com.br`).

Contexto: hoje a produção roda o site antigo na `main`, e a doc antiga continua
no ar em `docs.mriqbox.com.br` (projeto Nextra separado, repo `docs-mriqbox`).
A versão de dev está em `https://mri-qbox-brasil.github.io/mriqbox-site/docs`.

---

## 1. Cutover de produção (ao mergear `redesign` → `main`)

- [ ] **Redirect de domínio:** apontar `docs.mriqbox.com.br` → `mriqbox.com.br/docs`
      (301). Enquanto o redirect não existir, os links antigos ainda resolvem no
      Nextra atual, então não há pressa — mas depois do cutover o subdomínio deve
      redirecionar para não duplicar conteúdo.
- [ ] **Links restantes para `docs.mriqbox.com.br`:** na Fase 5 já trocamos o
      nav, o footer e os CTAs de instalação para `/docs`. Faltam trocar (foram
      deixados de propósito porque o subdomínio ainda está no ar):
  - `app/recursos/page.tsx` — os `docs:` de cada recurso (ex.: `/mri_qadmin`,
    `/mri_qspawn`, …) e o link "Documentação". **Atenção:** a estrutura de URL
    mudou; os recursos agora vivem em `/docs/mri/resources/<slug>` (slug com o
    case do repo, ex.: `mri_Qadmin`). Conferir slug a slug antes de trocar, e
    lembrar que alguns recursos ainda não têm página migrada (só entram quando o
    auto-sync rodar — ver item 2).
  - `app/comecar/page.tsx`, `app/por-que-mri/page.tsx`, `app/sobre/page.tsx` —
    links genéricos "ler a doc" → `/docs` (e `/docs/mri/instalacao` onde aponta
    para instalação).
  - `app/layout.tsx` — o `sameAs` do JSON-LD lista `https://docs.mriqbox.com.br`.
    Após o cutover, avaliar trocar por `https://mriqbox.com.br/docs` (o redirect
    mantém válido de qualquer forma).
  - Menções em **texto** (não são links, só cosmético): `app/comparativo/page.tsx`,
    `app/privacidade/page.tsx`, `app/components/InstallerMockup.tsx`,
    `app/por-que-mri/page.tsx`.
- [ ] **Arquivar o repo `docs-mriqbox`:** depois que o auto-sync estiver ativo
      aqui e o redirect no ar, o Nextra antigo pode ser arquivado.

---

## 2. Auto-sync dos `MANUAL.md` (pipeline já reescrito, falta ativar)

O pipeline foi portado para este repo:
- `.release/ingest-docs.js` — baixa `MANUAL.md` e publica em
  `content/docs/mri/resources/<slug>.md` (frontmatter title, H1 removido,
  `cfg`→`ini`) e regenera `content/docs/mri/resources/meta.json`.
- `.github/workflows/update-doc.yml` — incremental (`repository_dispatch:
  update-manual` + `workflow_dispatch`).
- `.github/workflows/sync-all-docs.yml` — lote/backfill (cron semanal +
  `workflow_dispatch`).

Para ativar:
- [ ] **Criar o secret `GH_TOKEN`** no repo `mriqbox-site` (Settings → Secrets
      and variables → Actions). Precisa de acesso de leitura aos repos de script
      (para baixar `MANUAL.md`) e de push neste repo. É o mesmo token usado hoje
      no `docs-mriqbox`.
- [ ] **Retargetar o `repository_dispatch`:** os repos de script hoje notificam
      o `docs-mriqbox`. Trocar o destino para `mriqbox-site`. Isso mora no repo
      `mri-Qbox-Brasil/workflows` (o callable de dispatch + o catálogo
      `docs-repos.json`), não em cada repo de script.
- [ ] **Branch de destino:** os workflows commitam no branch em que rodam. Para
      `repository_dispatch`/`schedule`, o GitHub roda no **branch default**.
      Portanto o auto-sync só publica de forma útil **após** o merge em `main`
      (ou trocar o default para `redesign` temporariamente, se quiser testar
      antes do cutover).
- [ ] **Testar:** rodar `sync-all-docs.yml` manualmente (`workflow_dispatch`)
      uma vez para o backfill e conferir o commit + build verdes.

---

## 3. Notas / decisões (para referência, não exigem ação)

- **Build via `--webpack`:** o Turbopack do Next 16 não parseia as regras que o
  `fumadocs-mdx` injeta. `dev` e `build` usam `--webpack`.
- **`fumadocs-mdx` pinado em `15.1.1`:** a `15.2.0` puxa `yuku-analyzer` →
  `yuku-ast@0.6.5` (inexistente no npm). Não subir sem revalidar.
- **Busca:** Orama estático (sem Algolia), índice tokenizado em português. O
  endpoint inclui o basePath (`/mriqbox-site/api/search` no GitHub Pages, raiz
  em produção) via `NEXT_PUBLIC_BASE_PATH`.
- **Labels da sidebar:** seguem os `_meta.ts` originais (viram o `title` do
  frontmatter e o H1 da página). Ajustar caso a caso se algum destoar.
- **Aviso de Node 20 nas actions:** o GitHub força Node 24; é só um aviso de
  deprecação, não quebra o build.
