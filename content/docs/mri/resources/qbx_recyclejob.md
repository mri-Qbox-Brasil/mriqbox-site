---
title: Qbx Recyclejob
---

Emprego de reciclagem: o jogador entra no galpão, bate o ponto, coleta pacotes espalhados pelo interior e recebe materiais ao entregá-los.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Fluxo de uso](#fluxo-de-uso)
5. [Recompensas](#recompensas)
6. [Integrações](#integrações)
7. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
8. [Localização](#localização)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | `Notify` e módulo `lib` (cache do ped) |
| `ox_lib` | Sim | Locale, `lib.zones`, `lib.progressBar`, `lib.showTextUI` |
| `ox_inventory` | Sim | Entrega dos materiais (`AddItem`) |
| `ox_target` | Não | Alternativa às zonas com `[E]` quando a convar `UseTarget` está em `true` |

---

## Instalação

1. Copie a pasta `qbx_recyclejob` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_recyclejob
   ```
3. Cadastre no `ox_inventory` os itens de recompensa: `metalscrap`, `plastic`, `copper`, `iron`, `aluminum`, `steel`, `glass`, `cryptostick` e `rubber`.

Não há SQL. Não há restrição de emprego (`job`) no código — qualquer jogador pode bater o ponto.

---

## Configuração

### `config/client.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `useTarget` | bool | Sim | Lido da convar `UseTarget`. `true` usa `ox_target`; `false` usa zonas do `ox_lib` com tecla `E` |
| `debugPoly` | bool | Sim | Desenha as zonas para depuração |
| `outsideLocation` | vector4 | Sim | Porta de entrada do galpão, no mundo. Também é onde fica o blip |
| `insideLocation` | vector4 | Sim | Ponto de chegada no interior e local da saída |
| `dutyLocation` | vector4 | Sim | Ponto de bater o ponto (entrar/sair de serviço) |
| `dropLocation` | vector4 | Sim | Ponto de entrega do pacote |
| `drawPackageLocationBlip` | bool | Sim | Desenha um marker amarelo acima do pacote sorteado |
| `pickupActionDuration` | number (ms) | Sim | Duração da barra de progresso ao pegar o pacote. Padrão: `math.random(4000, 6000)`, avaliado uma vez no carregamento |
| `deliveryActionDuration` | number (ms) | Sim | Duração da barra de progresso ao entregar o pacote. Padrão: `5000` |
| `pickupLocations` | array de vector4 | Sim | Os 21 pontos onde os pacotes podem aparecer dentro do galpão |
| `warehouseObjects` | array de strings | Sim | Modelos de pilhas de caixa usados para decorar o interior (um sorteado por ponto de coleta) |
| `pickupBoxModel` | string | Sim | Modelo da caixa carregada pelo jogador. Padrão: `prop_cs_cardbox_01` |

### `config/server.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `maxItemsReceived` | number | Sim | Número máximo de sorteios de item por entrega (o real é `math.random(1, maxItemsReceived)`). Padrão: `5` |
| `minItemReceivedQty` | number | Sim | Quantidade mínima por item sorteado. Padrão: `2` |
| `maxItemReceivedQty` | number | Sim | Quantidade máxima por item sorteado. Padrão: `6` |
| `chanceItem` | string | Sim | Item raro sorteado com ~6% de chance por entrega. Padrão: `cryptostick` |
| `luckyItem` | string | Sim | Item bônus sorteado com 10% de chance por entrega (1 a 3 unidades). Padrão: `rubber` |
| `itemTable` | array de strings | Sim | Pool de materiais sorteados a cada entrega |

---

## Fluxo de uso

1. O jogador vai até `outsideLocation` (blip "Recycle Center", sprite 365) e entra — a tela escurece e ele é teleportado para o interior, que é montado com as pilhas de caixa.
2. Em `dutyLocation` ele bate o ponto. Ao entrar de serviço, um dos `pickupLocations` é sorteado e sinalizado.
3. Ele vai até o pacote, executa a animação e a barra de progresso, e passa a carregar a caixa no ombro.
4. Leva a caixa até `dropLocation` e entrega. Os materiais são creditados e um novo ponto de coleta é sorteado.
5. Sair de serviço ou sair do galpão derruba o pacote carregado e limpa as zonas.

---

## Recompensas

Por entrega, o servidor executa:

- De 1 a `maxItemsReceived` sorteios em `itemTable`, cada um com `minItemReceivedQty` a `maxItemReceivedQty` unidades.
- ~6% de chance (`math.random(1,100) < 7`) de receber 1x `chanceItem`.
- 10% de chance (dois dados de 1 a 10 coincidirem) de receber de 1 a 3 unidades de `luckyItem`.

---

## Integrações

### ox_target

Com a convar `UseTarget` em `true`, entrada, saída, ponto, coleta e entrega viram box zones do `ox_target`. Caso contrário, o recurso usa `lib.zones.box` com `lib.showTextUI` e a tecla `E`.

---

## Entrypoints para outros recursos

Todos os eventos abaixo são internos do recurso; o único evento de servidor é o que credita os materiais.

| Evento | Lado | Descrição |
|---|---|---|
| `qbx_recyclejob:client:target:enterLocation` | Cliente | Teleporta para o interior e monta as zonas |
| `qbx_recyclejob:client:target:exitLocation` | Cliente | Teleporta para fora e limpa o estado |
| `qbx_recyclejob:client:target:toggleDuty` | Cliente | Entra/sai de serviço |
| `qbx_recyclejob:client:target:pickupPackage` | Cliente | Coleta o pacote sorteado |
| `qbx_recyclejob:client:target:dropPackage` | Cliente | Entrega o pacote |
| `qbx_recycle:server:getItem` | Servidor | Credita os materiais da entrega (note o prefixo diferente: `qbx_recycle`, sem `job`) |

---

## Localização

Strings via `ox_lib` locale, em `locales/`:

`en`, `pt-br`, `es`, `fr`, `nl`, `cs`, `ar`

Idioma ativo pela convar:

```
setr ox:locale "pt-br"
```

O nome do blip ("Recycle Center") está fixo no cliente e não passa pelo locale.

---

## Estrutura de arquivos

```
qbx_recyclejob/
├── client/
│   └── main.lua          — blip, zonas/target, interior, coleta e entrega do pacote
├── server/
│   └── main.lua          — sorteio e entrega dos materiais
├── config/
│   ├── client.lua        — locais, zonas, modelos e durações
│   └── server.lua        — pool de itens, quantidades e chances
├── locales/
│   ├── en.json
│   └── ar / cs / es / fr / nl / pt-br .json
└── fxmanifest.lua
```
