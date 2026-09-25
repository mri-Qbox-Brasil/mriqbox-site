---
title: CW Performance
---

Calcula um índice de performance (PI) e uma classe (E até X) para qualquer veículo, a partir dos valores de handling, e expõe o resultado por export.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Comandos](#comandos)
5. [Cálculo do índice](#cálculo-do-índice)
6. [Display sobre os veículos](#display-sobre-os-veículos)
7. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
8. [Implementações de exemplo](#implementações-de-exemplo)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `oxmysql` | Sim | Declarado em `dependency` no `fxmanifest.lua` |
| `ox_lib` | Condicional | Necessário para `Config.AllowDrawTextDisplay` (keybind e busca de veículos próximos) e para `Config.NotifySystem = 'ox'`. A linha `'@ox_lib/init.lua'` vem **comentada** no `fxmanifest.lua` — descomente antes de usar essas funções |
| `qb-core` | Não | Só se `Config.NotifySystem = 'qb'`. O cálculo em si é agnóstico de framework |

---

## Instalação

1. Copie a pasta `cw-performance` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure cw-performance
   ```
3. Se for usar o display sobre os veículos ou as notificações do `ox_lib`, descomente a linha do `ox_lib` em `shared_scripts` no `fxmanifest.lua`:
   ```lua
   shared_scripts {
       'config.lua',
       '@ox_lib/init.lua',
   }
   ```
4. Ajuste `Config.NotifySystem` para o sistema de notificação do servidor (`ox`, `qb`, ou qualquer outro valor para cair no `print` de console).
5. Não há SQL nem itens de inventário.

---

## Configuração

Arquivo: `config.lua` (shared).

### Geral

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Debug` | bool | Sim | Imprime no console todos os scores parciais e o total a cada cálculo |
| `Config.UseCommand` | bool | Sim | Habilita o comando `/checkscore`. O comando é sempre registrado; com `false` ele apenas não faz nada |
| `Config.AdminOnly` | bool | Sim | Presente no config, mas **não é lido em nenhum lugar do código** — o `/checkscore` não tem gate de permissão na versão atual |
| `Config.NotifySystem` | string | Sim | `'ox'` usa `lib.notify`, `'qb'` usa `QBCore.Functions.Notify`, qualquer outro valor imprime no console |

### Classes

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.LowestClass` | string | Sim | Classe atribuída a veículos abaixo do menor limite de `Config.Classes`. Padrão: `E` |
| `Config.Classes` | tabela | Sim | Limite **inferior** de cada classe. Padrão: `D = 250`, `C = 350`, `B = 400`, `A = 600`, `S = 800`, `X = 1000`. Um carro com score 349 é `D`; com 351, é `C` |

### Ajuste do cálculo

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.AccelerationMagic.adjust` | número | Sim | Subtraído da aceleração bruta antes de normalizar. Padrão: `0.07` |
| `Config.AccelerationMagic.divide` | número | Sim | Divisor aplicado ao resultado anterior. Padrão: `0.6` |
| `Config.AccelerationMagic.negMulti` | número | Sim | Multiplicador do expoente na curva logística. Padrão: `-9` |
| `Config.AccelerationMagic.adjustTwo` | número | Sim | Desloca o centro da curva logística, achatando o impacto de acelerações muito altas. Padrão: `0.4` |
| `Config.Mods.awdDrivetrainHandling` | número | Sim | Declarado no config, mas o código usa `awdDrivetrainAcceleration` também para o bônus de handling — este campo não é lido |
| `Config.Mods.awdDrivetrainAcceleration` | número | Sim | Bônus aplicado a veículos AWD (`fDriveBiasFront` diferente de `0.0` e `1.0`), tanto na aceleração quanto no handling. Padrão: `0.1` |
| `Config.Mods.gearUpMultiplier` | número | Sim | Peso do `fClutchChangeRateScaleUpShift` no score de aceleração. Padrão: `0.9` |
| `Config.Mods.suspensionDivider` | número | Sim | Declarado no config, mas o divisor da suspensão está fixo em `4` no código — este campo não é lido |
| `Config.Mods.lowSpeedTractionLoss` | bool | Sim | Quando `true`, o `fLowSpeedTractionLossMult` influencia o handling. Padrão: `false` |
| `Config.Balance.acceleration` | número | Sim | Expoente do score de aceleração no total. Padrão: `1.3` |
| `Config.Balance.speed` | número | Sim | Expoente do score de velocidade. Padrão: `1.3` |
| `Config.Balance.handling` | número | Sim | Expoente do score de handling. Padrão: `1.3` |
| `Config.Balance.braking` | número | Sim | Expoente do score de freio. Padrão: `0.55` |
| `Config.Balance.ratingMultiplier` | número | Sim | Multiplica a soma final. Suba ou desça para mover o PI de todos os veículos de uma vez. Padrão: `16` |
| `Config.CheatMods.acceleration` | número | Sim | Somado ao valor de aceleração **exibido**. Não afeta o PI nem a classe |
| `Config.CheatMods.speed` | número | Sim | Idem, para velocidade |
| `Config.CheatMods.handling` | número | Sim | Idem, para handling |
| `Config.CheatMods.braking` | número | Sim | Idem, para freio |

### Display 3D (requer ox_lib)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.AllowDrawTextDisplay` | bool | Sim | Liga o display de classe/PI sobre os veículos. Com `false`, o arquivo `drawtextDisplaying.lua` retorna imediatamente |
| `Config.DrawTextSetup.height` | número | Sim | Altura do texto acima do veículo. Padrão: `2.0` |
| `Config.DrawTextSetup.distance` | número | Sim | Raio (em metros) dentro do qual os veículos recebem o rótulo. Padrão: `20.0` |
| `Config.DrawTextSetup.showPillar` | bool | Sim | Exibe o marcador vertical ligando o carro ao texto |
| `Config.DrawTextSetup.markerType` | número | Sim | Tipo de marker. `0` = cone, `1` = pilar. Padrão: `1` |
| `Config.DrawTextSetup.baseSize` | número | Sim | Espessura do pilar. Padrão: `0.04` |
| `Config.DrawTextSetup.defaultButton` | string | Não | Presente no config, mas **não é lido** — a tecla do keybind está fixa em `LMENU` (Alt esquerdo) em `client/drawtextDisplaying.lua` |
| `Config.ClassColors` | tabela | Sim | Cor RGBA de cada classe (`A`, `B`, `C`, `D`, `E`, `S`, `X`), usada no texto e no pilar |
| `Config.DrawTextAuthFunc` | função | Sim | Chamada ao pressionar e ao soltar o keybind. Retorne `false` para bloquear o display (por job, item, whatever). Padrão: retorna `true` |

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/checkscore` | Todos | Notifica a classe e o PI do veículo em que o jogador está. Não faz nada se `Config.UseCommand = false`. Fora de um veículo, notifica erro |

---

## Cálculo do índice

Todos os valores vêm do `CHandlingData` do veículo, via `GetVehicleHandlingFloat`, mais três natives (`GetVehicleAcceleration`, `GetVehicleEstimatedMaxSpeed`, `GetVehicleMaxBraking`).

| Score | Origem |
|---|---|
| Aceleração | `GetVehicleAcceleration` passado por uma curva logística (`Config.AccelerationMagic`), mais o bônus AWD e o `fClutchChangeRateScaleUpShift` ponderado por `gearUpMultiplier` |
| Velocidade | `GetVehicleEstimatedMaxSpeed / (fInitialDragCoeff + 2.0)` |
| Freio | `GetVehicleMaxBraking * 10.0` |
| Handling | `(fTractionCurveMax + média de fSuspensionForce, fSuspensionReboundDamp, fSuspensionCompDamp e fAntiRollBarForce) * fTractionCurveMin`, opcionalmente ajustado por `fLowSpeedTractionLossMult`, mais o bônus AWD |

O PI final é `floor((accel^Ba + speed^Bs + handling^Bh + braking^Bb) * ratingMultiplier)`, onde `B*` são os expoentes de `Config.Balance`. A classe é o maior limite de `Config.Classes` que o PI ultrapassa; abaixo do menor limite, cai em `Config.LowestClass`.

Motos não foram testadas pelo autor — o cálculo é pensado para carros.

---

## Display sobre os veículos

Com `Config.AllowDrawTextDisplay = true` e o `ox_lib` importado no `fxmanifest.lua`, o jogador pode **segurar** o `Alt esquerdo` (keybind `show_performance`, remapeável em Pausa > Configurações > Atalhos de teclado > FiveM) para ver a classe e o PI flutuando sobre todos os veículos dentro de `Config.DrawTextSetup.distance` metros, além do próprio veículo.

O texto é colorido segundo `Config.ClassColors` e, com `showPillar = true`, ganha um marcador vertical ligando o carro ao rótulo. O `Config.DrawTextAuthFunc` é consultado no press e no release — use-o para restringir o display a mecânicos, a quem porta um item específico, etc.

---

## Entrypoints para outros recursos

Todos os exports são do lado cliente.

```lua
-- Retorna os scores parciais, a letra da classe e o índice de performance.
-- info = { accel, speed, handling, braking, drivetrain }
-- drivetrain é o fDriveBiasFront: 0.0 = RWD, 1.0 = FWD, entre os dois = AWD.
local info, class, perfRating = exports['cw-performance']:getVehicleInfo(vehicle)

-- Retorna os valores brutos de handling usados no cálculo:
-- antiRoll, suspensionForce, reboundDamp, compDamp, gripLow, gripHigh,
-- lowSpeedTraction, camberStiffness, offroadGripLoss
local details = exports['cw-performance']:getVehicleDetails(vehicle)

-- Retorna a tabela Config.Classes (limite inferior de cada classe).
local classes = exports['cw-performance']:getPerformanceClasses()
```

### Eventos de cliente

```lua
-- Executa o mesmo que o /checkscore: notifica classe e PI do veículo atual.
TriggerClientEvent('cw-performance:client:CheckPerformance', source)

-- Liga/desliga o debug em runtime.
TriggerClientEvent('cw-performance:client:toggleDebug', source, true)
```

Exemplo de uso:

```lua
local vehicle = GetVehiclePedIsUsing(PlayerPedId())
local info, class, perfRating = exports['cw-performance']:getVehicleInfo(vehicle)
print('CLASSE', class)
print('PI', perfRating)
print('INFO', json.encode(info, { indent = true }))
```

---

## Implementações de exemplo

A pasta `implementations/` traz os arquivos de um app de celular (`qb-phone`) que exibe os scores do último veículo do jogador. Não é carregado pelo `fxmanifest.lua` — são arquivos para copiar manualmente para o recurso do celular, seguindo o `implementations/README.md`. O próprio autor marca essa implementação como datada e recomenda montar o display a partir do retorno de `getVehicleInfo`.

---

## Estrutura de arquivos

```
cw-performance/
├── client/
│   ├── client.lua                — cálculo do PI, exports, comando /checkscore e notificações
│   └── drawtextDisplaying.lua    — keybind e display 3D de classe/PI sobre veículos próximos (requer ox_lib)
├── implementations/
│   ├── README.md                 — passo a passo para instalar o app de celular no qb-phone
│   └── html/
│       ├── css/tuner.css         — estilos do app
│       ├── js/tuner.js           — lógica do app
│       └── img/RSL.png           — ícone do app
├── config.lua                    — classes, balanceamento, mods do cálculo e setup do display
└── fxmanifest.lua                — dependency oxmysql; import do ox_lib vem comentado
```
