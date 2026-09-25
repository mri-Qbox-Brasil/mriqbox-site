---
title: MRI Qvinewood
---

Permite editar em tempo real o texto e a cor da placa Vinewood, com persistência em arquivo JSON no próprio recurso.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Comandos](#comandos)
5. [Autorização](#autorização)
6. [Persistência](#persistência)
7. [Como funciona](#como-funciona)
8. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qb-core` | Não | Usado se `Config.Framework` for `qbcore` (ou detectado no `autodetect`) |
| `es_extended` | Não | Usado se `Config.Framework` for `esx` (ou detectado no `autodetect`) |

O recurso funciona em modo `standalone` sem nenhum framework — nesse caso a autorização é feita por identifier.

---

## Instalação

1. Copie a pasta `mri_Qvinewood` para `resources/`.
2. Adicione ao `server.cfg`, **depois** do framework:
   ```
   ensure mri_Qvinewood
   ```
3. Ajuste `Config.AuthorizedGroups` no `config.lua` para os grupos (ESX/QBCore) ou identifiers (standalone) que podem editar a placa.

Os modelos das letras (`a.ydr` … `z.ydr`) e o replace do mapa padrão são streamados pelo próprio recurso, sem passos extras. Não há SQL nem itens de inventário.

---

## Configuração

Arquivo: `config.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Framework` | string | Sim | `esx`, `qbcore`, `standalone` ou `autodetect` |
| `Config.Command` | string | Sim | Nome do comando que abre a NUI. Padrão: `vinewood` |
| `Config.AuthorizedGroups.group` | tabela de strings | Sim (ESX/QBCore) | Grupos autorizados a abrir e salvar |
| `Config.AuthorizedGroups.identifier` | tabela de strings | Sim (standalone) | Identifiers autorizados (ex.: `discord:123...`) |
| `Config.Locales` | tabela | Sim | Strings exibidas na NUI (`vinewood`, `sign`, `text`, `color`, `text_edited`, `type_text`) |
| `Config.FileName` | string | Sim | Arquivo de persistência. Padrão: `textSettings.json` |
| `Config.Coords` | tabela | Sim | Lista de posições das letras. Cada entrada tem `coordinate` (vector3) e `heading` (number) |

`Config.Coords` define quantos caracteres cabem na placa: **um caractere por entrada**. A configuração de fábrica traz 8 posições, então textos mais longos são truncados. Adicione ou remova entradas para mudar o limite.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/vinewood` | Autorizado em `Config.AuthorizedGroups` | Abre a NUI de edição de texto e cor da placa |

O nome do comando vem de `Config.Command`; alterá-lo muda o comando registrado.

---

## Autorização

A checagem acontece no servidor (`Authorized()` em `server.lua`) e depende do framework detectado:

- **ESX** — compara `xPlayer.getGroup()` com cada valor de `Config.AuthorizedGroups.group`.
- **QBCore** — chama `QBCore.Functions.HasPermission(source, grupo)` para cada valor de `Config.AuthorizedGroups.group`.
- **Standalone** — compara todos os identifiers do jogador com `Config.AuthorizedGroups.identifier`.

A mesma checagem protege tanto a abertura da NUI quanto o evento de salvar.

---

## Persistência

O estado da placa fica em `textSettings.json`, um array de dois elementos gravado com `SaveResourceFile`:

```json
[
    "mri qbox",
    "#ffffff"
]
```

| Índice | Descrição |
|---|---|
| `[1]` | Texto da placa (um caractere por posição de `Config.Coords`) |
| `[2]` | Cor em hexadecimal, com `#` |

Ao salvar pela NUI, o arquivo é reescrito e todos os clients recebem a atualização imediatamente. Ao entrar no servidor, o client pede o conteúdo atual e monta a placa.

---

## Como funciona

Cada caractere do texto vira um objeto próprio (`CreateObject`) posicionado na entrada correspondente de `Config.Coords`. Espaços em branco são pulados, deixando a posição vazia.

A cor é aplicada por substituição de textura em runtime: uma textura 4x4 é criada com a cor escolhida e registrada sobre `mainTexture`/`techdevontop` via `AddReplaceTexture`. O branco puro (`#FFFFFF`) é tratado como "sem cor" e chama `RemoveReplaceTexture`, devolvendo a textura original.

Ao parar o recurso, todos os objetos criados são deletados.

---

## Entrypoints para outros recursos

### Evento `ricky-vinewood:saveText` (servidor)

Salva um novo texto e cor no JSON e faz broadcast para todos os clients. Requer que o `source` esteja autorizado.

```lua
TriggerServerEvent('ricky-vinewood:saveText', { text = 'VINEWOOD', color = '#ff0000' })
```

### Evento `ricky-vinewood:loadText` (servidor)

Pede ao servidor o estado atual da placa; o servidor responde ao client com `ricky-vinewood:saveText`.

```lua
TriggerServerEvent('ricky-vinewood:loadText')
```

### Evento `ricky-vinewood:saveText` (client)

Recebe `{ texto, cor }` e reconstrói a placa. É como o servidor propaga as mudanças.

### Evento `ricky-vinewood:openNui` (client)

Abre a NUI de edição com o texto e a cor atuais. Disparado pelo servidor ao executar o comando.

---

## Estrutura de arquivos

```
mri_Qvinewood/
├── client.lua           — detecção de framework, NUI, criação dos objetos das letras, replace de textura
├── server.lua           — autorização, comando, leitura/escrita do textSettings.json, broadcast
├── config.lua           — framework, comando, grupos autorizados, locales da NUI, coordenadas das letras
├── textSettings.json    — estado persistido: [texto, cor]
├── web/
│   ├── index.html       — UI de edição (texto + cor)
│   ├── css/style.css
│   ├── js/script.js
│   ├── fonts/hollywood.ttf
│   └── img/             — container.png, notify.png
├── stream/
│   ├── [letters]/       — mainTexture.ytd, Techdevontop.ytyp e os modelos a.ydr … z.ydr
│   └── [replace_defaultmap]/ — substituição da placa original do mapa (ch2_03*)
└── fxmanifest.lua
```
