---
title: Qbx Garbagejob
---

Emprego de coletor de lixo: o jogador paga um depósito, retira um caminhão, percorre uma rota aleatória de lixeiras recolhendo sacos e recebe por saco entregue.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Fluxo do trabalho](#fluxo-do-trabalho)
5. [Comandos](#comandos)
6. [Integrações](#integrações)
7. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
8. [Localização](#localização)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | Framework base, `GetPlayer`, `Notify`, `qbx.spawnVehicle` |
| `ox_lib` | Sim | Callbacks, zonas, context menu, locale, animações |
| `ox_target` | Sim | Zonas de alvo nas lixeiras e no caminhão (quando `useTarget = true`) |
| `rep-talkNPC` | Sim | Cria o NPC "Seu Pedro" no depósito. O `client/main.lua` chama `exports['rep-talkNPC']:CreateNPC` sem checagem |
| `cw-rep` | Sim | Ganho de skill `garbage`. O `server/main.lua` chama `exports['cw-rep']:updateSkill` sem checagem |
| `mm_carkeys` | Não | Recebe `mm_carkeys:server:removevehiclekeys` ao devolver o caminhão |
| Recurso de chaves compatível com `vehiclekeys:client:SetOwner` | Não | Recebe o evento ao spawnar o caminhão |

---

## Instalação

1. Copie a pasta `qbx_garbagejob` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_garbagejob
   ```
3. Cadastre o job `garbage` no `qbx_core` (`shared/jobs.lua`). Somente jogadores com esse job veem o blip do depósito.
4. Se `giveItemReward` estiver ligado, garanta que o item de recompensa (`cryptostick` por padrão) exista no `ox_inventory`.
5. **Conflitos** — não rode junto com o `qb-garbagejob` original: os dois usam os eventos `qb-garbagejob:client:RequestRoute` / `qb-garbagejob:client:RequestPaycheck`.

---

## Configuração

### `config/shared.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `truckPrice` | number | Sim | Depósito cobrado do banco ao retirar o caminhão. Devolvido ao final se a rota for completada |
| `locations.main` | `{ label, coords }` | Sim | Depósito de lixo. Gera o blip do trabalho e é o destino de retorno |
| `locations.vehicle.label` | string | Sim | Nome do blip de retorno do caminhão |
| `locations.vehicle.coords` | array de `vec4` | Sim | Vagas de spawn do caminhão. A primeira vaga livre (sem veículo num raio de 2.5m) é usada |
| `locations.paycheck` | `{ label, coords }` | Não | Ponto de coleta do pagamento (definido no config, não referenciado pelo código atual) |
| `locations.trashcan` | array de `{ name, coords }` | Sim | Lixeiras sorteáveis. `name` aparece no blip da parada; `coords` é `vec4` |

### `config/client.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `useTarget` | bool | Sim | `true` usa `ox_target` para pegar/jogar o saco. `false` usa zonas com tecla `E` (`lib.showTextUI`) |
| `debugPoly` | bool | Não | Desenha as zonas de debug |
| `peds` | array de `{ model, coords }` | Sim | NPCs do depósito. `model` é o hash/nome do ped, `coords` é `vec4` |

### `config/server.lua`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `vehicle` | string | Sim | Modelo do caminhão de lixo spawnado (padrão `trash2`) |
| `giveItemReward` | bool | Sim | Habilita o drop aleatório de item por parada concluída |
| `itemRewardChance` | number | Sim | Limiar do sorteio: o item cai quando `math.random(100) >= itemRewardChance`. Valor menor = mais frequente |
| `itemRewardName` | string | Sim | Item entregue no drop (padrão `cryptostick`) |
| `minStops` | number | Sim | Mínimo de paradas da rota. O máximo é o número total de lixeiras cadastradas |
| `bagUpperWorth` | number | Sim | Valor máximo pago por saco |
| `bagLowerWorth` | number | Sim | Valor mínimo pago por saco |
| `minBagsPerStop` | number | Sim | Mínimo de sacos por parada |
| `maxBagsPerStop` | number | Sim | Máximo de sacos por parada |

---

## Fluxo do trabalho

1. O jogador com o job `garbage` fala com o NPC do depósito (`rep-talkNPC`) e escolhe "Trabalhar/Finalizar".
2. Em "Request Route", o servidor cobra `truckPrice` do banco e sorteia uma rota: `math.random(minStops, #trashcan)` paradas, cada uma com `math.random(minBagsPerStop, maxBagsPerStop)` sacos.
3. Um caminhão é spawnado numa vaga livre, com combustível cheio, reparado, placa `GBGE####` e chaves entregues ao jogador.
4. Em cada parada o jogador pega o saco na lixeira, leva até a traseira do caminhão e joga dentro. Quando os sacos da parada acabam, a próxima parada é marcada no GPS.
5. O pagamento é acumulado no servidor: por saco, `math.random(bagLowerWorth, bagUpperWorth)`. A cada parada concluída há chance de encontrar o item de recompensa.
6. Ao voltar ao depósito e coletar o pagamento, o caminhão é removido e o total (`pagamento + depósito`) cai no banco. Se o jogador encerrar antes de completar todas as paradas, **o depósito não é devolvido**.

O jogador também pode encadear rotas ("continuar trabalhando"): nesse caso o depósito não é recobrado nem devolvido entre rotas.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/cleargarbroutes <id>` | `group.admin` | Apaga a rota em andamento do jogador informado |

---

## Integrações

### rep-talkNPC

O NPC do depósito é criado via `exports['rep-talkNPC']:CreateNPC`, com nome "Seu Pedro", tag "LIXEIRO" e diálogo em português. As opções do diálogo abrem o menu do trabalho (`lib.registerContext`), com "Request Route" e "Collect Paycheck".

### cw-rep

Cada parada concluída e cada pagamento coletado chamam `exports['cw-rep']:updateSkill(source, 'garbage', 5)`, alimentando a skill `garbage` do sistema de reputação.

### mm_carkeys

Ao devolver o caminhão, o cliente dispara `mm_carkeys:server:removevehiclekeys` com a placa, removendo as chaves do jogador.

---

## Entrypoints para outros recursos

### Eventos de cliente

Abrem as ações do trabalho sem passar pelo NPC.

```lua
-- Pede uma nova rota (cobra o depósito e spawna o caminhão)
TriggerEvent('qb-garbagejob:client:RequestRoute')

-- Devolve o caminhão e coleta o pagamento
TriggerEvent('qb-garbagejob:client:RequestPaycheck')
```

### Evento de servidor

```lua
-- continue = true encadeia uma nova rota sem devolver o depósito
TriggerServerEvent('garbagejob:server:payShift', continue)
```

### Callbacks (`lib.callback`)

Usados internamente pelo cliente do próprio recurso:

- `garbagejob:server:newShift(continue)` — cria a rota, retorna `shouldContinue, nextStop, bagNum, totalNumberOfStops`
- `garbagejob:server:nextStop(currentStop, currentStopNum, currLocation)` — valida a distância (máx. 20m) e avança a parada
- `garbagejob:server:endShift()` — retorna a rota atual do jogador
- `garbagejob:server:spawnVehicle(coords)` — spawna o caminhão e cobra o depósito

---

## Localização

Strings via `ox_lib` locale, em `locales/`:

`ar`, `cs`, `de`, `en`, `es`, `fr`, `it`, `nl`, `pl`, `pt`, `pt-br`, `tr`

```
setr ox:locale "pt-br"
```

---

## Estrutura de arquivos

```
qbx_garbagejob/
├── client/
│   └── main.lua          — menu, NPC, zonas das lixeiras, animações, spawn/devolução do caminhão
├── server/
│   └── main.lua          — sorteio da rota, cálculo do pagamento, depósito, drop de item, comando admin
├── config/
│   ├── client.lua        — useTarget, debug, peds do depósito
│   ├── server.lua        — veículo, valores por saco, recompensa de item
│   └── shared.lua        — depósito, vagas do caminhão, lista de lixeiras
├── locales/              — ar, cs, de, en, es, fr, it, nl, pl, pt, pt-br, tr (.json)
└── fxmanifest.lua
```
