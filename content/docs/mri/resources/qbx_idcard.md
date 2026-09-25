---
title: Qbx Idcard
---

Documentos de identidade em NUI: ao usar o item, o jogador exibe a carteira (com foto de mugshot) na tela — para si mesmo ou para o jogador mais próximo.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Metadata dos itens](#metadata-dos-itens)
5. [Exibir o documento](#exibir-o-documento)
6. [Emblemas (badges)](#emblemas-badges)
7. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
8. [Textos da UI](#textos-da-ui)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | Framework base. O bridge só carrega se `qbx_core` estiver iniciado |
| `ox_lib` | Sim | Callbacks, notify, version check |
| `ox_inventory` | Sim | Registro dos itens, metadata e `displayMetadata` |
| `MugShotBase64` | Sim | Gera a foto do personagem na primeira utilização do item |
| `oxmysql` | Sim | Declarado no `fxmanifest.lua` (`@oxmysql/lib/MySQL.lua`) |

---

## Instalação

1. Copie a pasta `qbx_idcard` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_idcard
   ```
3. Cadastre no `ox_inventory` um item para cada chave de `licenses` do `config/shared.lua`. Com o config padrão:
   - `id_card`
   - `driver_license`
   - `weaponlicense`
   - `lawyerpass`

   Os itens **não** precisam ser marcados como usáveis no `ox_inventory` — o recurso registra o `CreateUseableItem` de cada chave automaticamente no `qbx_core`.
4. Emita os documentos com metadata usando o export `CreateMetaLicense` (ver [Entrypoints](#entrypoints-para-outros-recursos)). Um item entregue sem metadata não abre a carteira.

---

## Configuração

O arquivo real é `config/shared.lua` — ele é enviado à NUI em runtime e sobrescreve os valores de `web/js/config.js` (que servem apenas de fallback).

### `idCardSettings`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `closeKey` | string | Sim | Tecla que fecha a carteira (valor de `KeyboardEvent.key`, ex.: `Escape`, `Backspace`) |
| `autoClose.status` | bool | Sim | Fecha a carteira sozinha após um tempo |
| `autoClose.time` | ms | Sim | Tempo até o fechamento automático quando `status = true` |

### `licenses[<item>]`

Uma entrada por item de documento. A chave é o nome do item no `ox_inventory`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `header` | string | Sim | Título exibido no topo da carteira |
| `background` | hex | Sim | Cor de fundo do cartão |
| `backgroundImage` | URL | Sim | Imagem de fundo do cartão |
| `prop` | string | Sim | Prop segurado pelo personagem na animação (ex.: `prop_franklin_dl`) |
| `badge` | string | Não | Nome do arquivo (sem extensão) em `web/badges/`. Se ausente, o emblema não é exibido |

---

## Metadata dos itens

O item só funciona com metadata. `CreateMetaLicense` preenche, a partir do `PlayerData`:

| Campo | Origem |
|---|---|
| `cardtype` | Nome do item |
| `citizenid` | `PlayerData.citizenid` |
| `firstname` / `lastname` | `PlayerData.charinfo` |
| `birthdate` | `PlayerData.charinfo.birthdate` |
| `sex` | `charinfo.gender` convertido para `M` / `F` |
| `nationality` | `PlayerData.charinfo.nationality` |
| `badge` | Emblema do documento (ou `'none'`) |
| `mugShot` | **Não** é preenchido na emissão |

A foto (`mugShot`) é gerada na **primeira vez** que o jogador usa o item: o servidor detecta a ausência de `mugShot`, pede a imagem base64 ao cliente (`MugShotBase64`) e grava na metadata do slot. A partir daí o uso do item abre a carteira normalmente.

O recurso também registra `ox_inventory:displayMetadata` para `firstname`, `lastname`, `nationality`, `birthdate` e `citizenid`, fazendo esses campos aparecerem no tooltip do inventário.

---

## Exibir o documento

Ao usar o item:

- O personagem toca a animação de segurar o documento com o prop configurado (3,5 segundos).
- O servidor busca o jogador mais próximo num raio de **2 metros**. Se houver alguém, a carteira abre **na tela dele**, e o portador recebe uma notificação informando que mostrou o documento. Se não houver ninguém por perto, a carteira abre para o próprio portador.
- A NUI fecha na tecla de `closeKey` ou automaticamente, se `autoClose.status = true`.

---

## Emblemas (badges)

Se a licença tiver o campo `badge`, a carteira exibe a imagem `web/badges/<badge>.png` junto com o **grade atual do job** do jogador (`PlayerData.job.grade.name`), capturado no momento em que a metadata é criada.

Para adicionar um emblema: coloque o PNG em `web/badges/` e aponte `badge = '<nome-do-arquivo>'` na licença. O arquivo `web/badges/examplebadge.png` serve de referência.

---

## Entrypoints para outros recursos

### `CreateMetaLicense` (servidor)

Cria o item com a metadata do jogador e entrega no inventário. Aceita uma string ou uma lista de itens.

```lua
exports.qbx_idcard:CreateMetaLicense(source, 'driver_license')
exports.qbx_idcard:CreateMetaLicense(source, {'id_card', 'driver_license'})
```

### `GetMetaLicense` (servidor)

Retorna a tabela de metadata que seria gerada para o documento, sem entregar item algum.

```lua
local metadata = exports.qbx_idcard:GetMetaLicense(source, 'id_card')
```

### Evento `um-idcard:server:sendData`

Disparado pelo `CreateUseableItem` ao usar o item. Pode ser chamado diretamente para forçar a exibição de um documento.

```lua
TriggerEvent('um-idcard:server:sendData', source, 'id_card', metadata)
```

---

## Textos da UI

Os rótulos dos campos da carteira ficam em `lang/global.js` (não usa `ox_lib` locale):

```javascript
export const Global = {
    lang_header: 'mri_Qbox Brasil',
    lang_lastname: 'Sobrenome',
    lang_firstname: 'Nome',
    lang_dob: 'Data de Nascimento',
    lang_sex: 'Gênero',
    lang_nat: 'Nacionalidade',
};
```

`lang_header` é o texto fixo do cabeçalho do cartão (nome do servidor). Os títulos por documento vêm de `licenses[<item>].header` no `config/shared.lua`.

---

## Estrutura de arquivos

```
qbx_idcard/
├── main/
│   ├── client.lua        — NUI, animação com prop, callbacks de mugshot e jogador próximo
│   ├── server.lua        — uso do item, geração do mugshot, envio dos dados à NUI
│   └── version.lua       — checagem de versão via ox_lib
├── bridge/
│   └── framework/
│       └── qbox.lua      — exports CreateMetaLicense/GetMetaLicense, registro dos itens usáveis
├── config/
│   └── shared.lua        — teclas, autoClose e definição das licenças
├── lang/
│   └── global.js         — rótulos dos campos da carteira
├── web/
│   ├── index.html        — markup da carteira
│   ├── css/style.css     — estilos
│   ├── js/main.js        — render da carteira, badge, autoClose, tecla de fechar
│   ├── js/config.js      — config de fallback da NUI (sobrescrito pelo config/shared.lua)
│   ├── js/fetchNui.js    — helper de NUI callback
│   ├── badges/           — imagens de emblema (examplebadge.png)
│   └── flags/            — imagens de bandeira
└── fxmanifest.lua
```
