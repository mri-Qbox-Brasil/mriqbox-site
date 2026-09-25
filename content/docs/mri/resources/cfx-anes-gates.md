---
title: Cfx Anes Gates
---

Registra portões e cancelas do mapa base no door system do GTA V para que abram e fechem automaticamente ao aproximar de um veículo.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Portões inclusos](#portões-inclusos)
5. [Como adicionar um portão](#como-adicionar-um-portão)
6. [Como funciona](#como-funciona)
7. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| — | — | Standalone. Só client scripts, sem framework, sem banco de dados |

---

## Instalação

1. Copie a pasta `cfx-anes-gates` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure cfx-anes-gates
   ```
3. Não há SQL, itens de inventário nem permissões.
4. **Conflitos** — se outro recurso já adiciona os mesmos props ao door system, os portões podem ser registrados duas vezes com hashes diferentes. O `Gate:New` chama `DoorSystemFindExistingDoor` antes de criar, então portas já registradas são reaproveitadas em vez de duplicadas; ainda assim, evite dois recursos ajustando `AutomaticRate` do mesmo portão.

---

## Configuração

Arquivo: `config/client.lua`. A tabela `Config` é lida na inicialização e depois zerada da memória (`Config = nil` + `collectgarbage()`), então alterações exigem restart do recurso.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.DefaultAutomaticDistance` | número | Sim | Distância padrão de acionamento automático, usada quando o grupo não define `options.distance`. Padrão: `1.5` |
| `Config.DefaultAutomaticRate` | número | Sim | Taxa padrão de abertura, usada quando o grupo não define `options.rate`. Padrão: `1.5` |
| `Config.Gates` | tabela | Sim | Mapa `[hash do modelo] = { options, locations }`. A chave usa backticks (`` [`prop_sec_barrier_ld_01a`] ``) |

### Campos de um grupo de portões

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `locations` | lista de `vector3` | Sim | Coordenadas de cada portão daquele modelo no mapa |
| `options` | tabela | Não | Se omitido, o grupo usa os padrões globais |
| `options.distance` | número | Não | Sobrescreve `DefaultAutomaticDistance` para este grupo |
| `options.rate` | número | Não | Sobrescreve `DefaultAutomaticRate` para este grupo. Manter em pelo menos `1.5` — abaixo disso o jogo tende a ignorar a distância configurada |
| `options.physicsController` | bool | Não | Liga o loop que reaplica distância e taxa enquanto a física do portão está carregada. Necessário em portões que "perdem" o ajuste após o primeiro set |

---

## Portões inclusos

| Modelo | Portões configurados | `physicsController` |
|---|---|---|
| `prop_sec_barrier_ld_01a` | 21 | Sim |
| `prop_sec_barrier_ld_02a` | 18 | Sim |
| `prop_railway_barrier_01` | 22 | Não |
| `prop_railway_barrier_02` | 8 | Não |

---

## Como adicionar um portão

1. Confirme que o prop é de fato uma porta. Modelos parecidos podem não funcionar como porta — por exemplo, `prop_sec_barier_02a` tem aparência de cancela mas não é reconhecido pelo door system; o equivalente funcional é `prop_sec_barrier_ld_02a`.
2. Levante as coordenadas do prop no mapa com o [CodeWalker](https://github.com/dexyfex/CodeWalker).
3. Adicione o `vector3` na lista `locations` do modelo correspondente em `config/client.lua`, ou crie uma nova entrada de modelo.
4. Comece com `physicsController = false`. Se o portão parar de responder ou perder o ajuste depois de um tempo, mude para `true`.
5. Restart do recurso.

---

## Como funciona

- Na inicialização, cada modelo vira um `GateGroup`, e cada coordenada vira um `Gate`.
- O `Gate:New` procura a porta existente com `DoorSystemFindExistingDoor`. Se não achar, registra uma nova com `AddDoorToSystem` usando um hash derivado do modelo e do índice (`_GATE_<modelo>_CONTROLLER_<n>`).
- O `Gate:Refresh` aplica `DoorSystemSetAutomaticDistance` e `DoorSystemSetAutomaticRate`. É essa combinação que faz o portão passar a operar sozinho.
- Grupos com `physicsController = true` rodam um loop a cada 2000 ms verificando `DoorSystemGetIsPhysicsLoaded`. Portões com física carregada entram no `GateController`, que reaplica distância e taxa a cada 100 ms. Portões sem física saem do controlador — assim o loop rápido só roda para o que está de fato perto do jogador.

---

## Estrutura de arquivos

```
cfx-anes-gates/
├── client/
│   ├── main.lua             — cria um GateGroup por modelo e libera o Config da memória
│   ├── gate.lua             — classe Gate: registra a porta no door system e aplica distância/taxa
│   ├── gate.group.lua       — classe GateGroup: agrupa portões por modelo e roda o loop de física
│   └── gate.controller.lua  — GateController: loop de 100 ms que reaplica os ajustes nos portões em alcance
├── config/
│   └── client.lua           — padrões globais e lista de modelos + coordenadas
└── fxmanifest.lua
```
