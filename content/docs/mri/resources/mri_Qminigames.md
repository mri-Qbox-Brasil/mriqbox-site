---
title: MRI Qminigames
---

Biblioteca de três minigames em NUI (jogo da memória, campo minado e busca de texto em terminal) expostos como exports para outros recursos chamarem.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Minigames](#minigames)
4. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
5. [Build da interface](#build-da-interface)
6. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

Nenhuma. O `fxmanifest.lua` não declara `dependencies`, e os scripts do cliente usam apenas natives do FiveM e NUI — não há framework, inventário nem `ox_lib` envolvidos.

O recurso **não faz nada sozinho**: ele só existe para ser chamado por outros recursos. Toda a lógica de "o que acontece quando o jogador ganha ou perde" fica no recurso que chama o export.

---

## Instalação

1. Copie a pasta `mri_Qminigames` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qminigames
   ```
3. Garanta que ele inicia **antes** dos recursos que usam os exports.

---

## Minigames

### Memory Card

Jogo da memória. As cartas são exibidas por 5 segundos, embaralhadas e viradas para baixo depois de mais 3 segundos. O jogador precisa parear todas antes do tempo acabar.

- Vence quando todos os pares são encontrados.
- Perde se o timer expirar.
- **Esc** fecha o minigame e conta como derrota.
- O timer é opcional: sem ele, o minigame não expira.

### Mine Sweep

Campo minado com aposta. Cada célula segura aumenta o valor acumulado; cada bomba encontrada aproxima o jogador do limite de falha.

- O jogador pode sacar (**cash out**) a qualquer momento e leva o valor acumulado.
- Ao atingir o limite de bombas (`bombfail`), o saque é forçado.
- **Esc** fecha o minigame sem levar nada.

### Terminal

O jogador recebe um texto curto (ex.: `UX`) e precisa achar a ocorrência correspondente em uma lista de fragmentos (`HACK`, `404`, `CLI`, ...).

- Vence ao encontrar a correspondência correta.
- **Esc** fecha o minigame e conta como derrota.

---

## Entrypoints para outros recursos

Os três exports são **bloqueantes**: eles retornam só quando o jogador termina o minigame. Chame-os de dentro de uma thread.

### `MemoryCard`

```lua
-- time (opcional): duração em segundos
local success = exports['mri_Qminigames']:MemoryCard(360)

if success then
    -- venceu
end
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `time` | number | Não | Tempo limite em segundos. Sem valor, o minigame não expira |

Retorna `true` quando todos os pares são encontrados, `false` no timeout ou no Esc.

### `MineSweep`

```lua
local money = exports['mri_Qminigames']:MineSweep(12000, 12, 3, 'center')
print(money)
```

| Parâmetro | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `money` | number | Sim | Valor máximo que o jogador pode acumular. Sem ele, o export retorna imediatamente sem abrir nada |
| `bomb` | number | Sim | Quantidade de bombas no tabuleiro |
| `bombfail` | number | Sim | Quantas bombas o jogador pode encontrar antes do saque ser forçado |
| `position` | string | Não | Posição da interface na tela: `'left'`, `'right'` ou `'center'`. Padrão: `'left'` |

Retorna o **valor acumulado** (number) no cash out, ou `false` se o jogador apertar Esc.

### `OpenTerminal`

```lua
local success = exports['mri_Qminigames']:OpenTerminal()

if success then
    -- venceu
end
```

Sem parâmetros. Retorna `true` ao acertar, `false` no Esc.

---

## Build da interface

A pasta `web/` contém o código-fonte da UI (Svelte + Vite + Tailwind). Os arquivos servidos em runtime são os de `html/`, já compilados e versionados no repositório.

Só é preciso rebuildar se você alterar a UI:

```
cd web
pnpm install
pnpm build
```

---

## Estrutura de arquivos

```
mri_Qminigames/
├── client/
│   ├── memorycard.lua        — export MemoryCard: abre a NUI e aguarda a promise
│   ├── minesweep.lua         — export MineSweep: abre a NUI e aguarda a promise
│   └── terminal.lua          — export OpenTerminal: abre a NUI e aguarda a promise
├── html/                     — UI compilada (index.html, js/index.js, assets/index.css)
├── web/                      — código-fonte da UI em Svelte
│   ├── src/
│   │   ├── App.svelte        — roteia entre os três minigames conforme a mensagem NUI
│   │   └── lib/
│   │       ├── components/   — MemoryCard.svelte, Sweeper.svelte, MatchText.svelte
│   │       ├── store/        — estado de cada minigame
│   │       └── utils/        — fetchNui, useNuiEvent e utilitários
│   ├── vite.config.ts
│   └── package.json
├── LICENSE                   — Creative Commons BY-NC 4.0
└── fxmanifest.lua
```
