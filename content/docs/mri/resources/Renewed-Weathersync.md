---
title: Renewed Weathersync
---

Sincronização de clima e hora do servidor via GlobalState, com fila de clima pré-construída no start, sequências climáticas e menu admin.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração de tempo (`config/time.lua`)](#configuração-de-tempo-configtimelua)
5. [Configuração de clima (`config/weather.lua`)](#configuração-de-clima-configweatherlua)
6. [Sequências climáticas](#sequências-climáticas)
7. [Comandos](#comandos)
8. [Menu admin de clima](#menu-admin-de-clima)
9. [Integrações](#integrações)
10. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
11. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | `lib.load`, `lib.class`, `lib.addCommand`, `lib.callback`, `lib.registerContext`, `lib.inputDialog` |
| `qb-core` / `qbx_core` | Não | Ativa a camada de compatibilidade `qb-weathersync` |
| `cd_easytime` | Não | Camada de compatibilidade, ativa por padrão (veja a convar `weather_disablecd`) |
| `nve_iced_alamo` | Não | Se presente, o IPL `alamo_ice` é carregado durante climas com neve |

---

## Instalação

1. Copie a pasta `Renewed-Weathersync` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure Renewed-Weathersync
   ```
3. **Conflitos** — o recurso declara `provide 'qb-weathersync'` e `provide 'cd_easytime'`. Remova ou desabilite o `qb-weathersync` e o `cd_easytime` originais; os dois seriam substituídos por este.
4. Se você **nunca usou** o `cd_easytime`, desligue a camada de compatibilidade dele adicionando ao `server.cfg`:
   ```
   setr weather_disablecd true
   ```

Não há SQL nem itens de inventário.

---

## Permissões (ACE)

Os comandos são registrados via `lib.addCommand` com `restricted = 'group.admin'`, o que gera as ACEs `command.<nome>`. Além disso, o servidor valida explicitamente:

- `command.weather` — alterar/remover eventos climáticos pelo menu admin (`Renewed-Weathersync:server:setWeatherType`, `Renewed-Weathersync:server:setEventTime`, `Renewed-Weather:server:removeWeatherEvent`) e o evento legacy `qb-weathersync:server:setWeather`.
- `command.time` — evento legacy `qb-weathersync:server:setTime`.

```
add_ace group.admin command.weather allow
add_ace group.admin command.time allow
```

---

## Configuração de tempo (`config/time.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `timeScale` | number (ms) | Sim | Milissegundos reais por minuto no jogo. `2000` = dia de 48 minutos |
| `useNightScale` | bool | Sim | Se `true`, usa `timeScaleNight` durante a noite |
| `timeScaleNight` | number (ms) | Sim | Escala de tempo aplicada durante a noite |
| `nightTime.beginning` | number (0–23) | Sim | Hora em que a noite começa |
| `nightTime.ending` | number (0–23) | Sim | Hora em que a noite termina |
| `useRealTime` | bool | Sim | Se `true`, ignora `timeScale`/`startUpTime` e usa a hora real do servidor (escala fixa de 60000 ms). **Desativa todos os comandos de tempo** |
| `startUpTime.hour` | number | Sim | Hora inicial ao subir o servidor |
| `startUpTime.minute` | number | Sim | Minuto inicial ao subir o servidor |

Ao reiniciar o recurso com o servidor no ar, a hora **não** é resetada: o valor atual do `GlobalState` prevalece sobre o config.

---

## Configuração de clima (`config/weather.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `useScheduledWeather` | bool | Sim | Se `true`, escuta `txAdmin:events:scheduledRestart` e força clima ruim antes do restart |
| `serverDuration` | number (horas) | Sim | Quantas horas o servidor roda antes de reiniciar. Define o tamanho da fila de clima gerada no start |
| `weatherCycletimer` | number (min) | Sim | Duração de cada evento de clima estático |
| `timeBetweenRain` | number (min) | Sim | Intervalo mínimo entre eventos de chuva |
| `rainAfterRestart` | number (min) | Sim | Quantos minutos após o restart antes que possa chover |
| `decemberSnow` | bool | Sim | Se `true` e o mês for dezembro, o clima fica travado em `XMAS` e todo o resto do config é ignorado |
| `useStaticWeather` | bool | Sim | Habilita a geração de eventos avulsos a partir de `staticWeather` |
| `staticWeather` | tabela `[CLIMA] = chance` | Sim | Chance (0.0–1.0) de cada tipo de clima entrar na fila em cada iteração |
| `useWeatherSequences` | bool | Sim | Habilita as sequências de `weatherSequences` |
| `weatherSequences` | array | Sim | Sequências encadeadas de clima (veja abaixo) |

Tipos de clima aceitos: `BLIZZARD`, `CLEAR`, `CLEARING`, `CLOUDS`, `EXTRASUNNY`, `FOGGY`, `NEUTRAL`, `OVERCAST`, `RAIN`, `SMOG`, `SNOW`, `SNOWLIGHT`, `THUNDER`, `XMAS`.

---

## Sequências climáticas

Cada entrada de `weatherSequences` é um roteiro de vários eventos em ordem (ex.: `CLOUDS` → `OVERCAST` → `RAIN` → `CLEARING` → `EXTRASUNNY`).

| Campo da sequência | Tipo | Descrição |
|---|---|---|
| `probability` | number (0.0–1.0) | Chance de a sequência entrar na fila em cada iteração do builder |
| `month` | number | Se definido, a sequência só é elegível nesse mês (ex.: `12` para neve) |
| `events` | array | Eventos da sequência, executados em ordem |

| Campo do evento | Tipo | Descrição |
|---|---|---|
| `weather` | string | Tipo de clima |
| `time` | number (min) | Duração do evento em minutos |
| `windSpeed` | number | Velocidade do vento (o cliente aplica `windSpeed / 2`) |
| `windDirection` | number (graus) | Direção do vento |

A fila inteira é construída **no start do recurso** (`server/weatherbuilder.lua`), até cobrir `serverDuration` horas. Sequências que contêm `RAIN` ou `THUNDER` respeitam `timeBetweenRain` e `rainAfterRestart`.

> Observação sobre o config padrão: `windDirection` aparece no nível da **sequência** e `HasSnow` no nível do **evento**, mas o construtor (`classes/weather.lua`) só lê `weather`, `time`, `windSpeed` e `windDirection` de cada evento. Ou seja, do jeito que o config vem, esses dois campos não têm efeito. Para direção de vento funcional, coloque `windDirection` dentro de cada evento.

---

## Comandos

Todos são `lib.addCommand` com `restricted = 'group.admin'`. Os comandos de tempo **só existem quando `useRealTime = false`**.

| Comando | Permissão | Descrição |
|---|---|---|
| `/time <hora> [minuto]` | `command.time` | Define a hora atual (hora 0–23, minuto 0–59; valores fora do range são clampados) |
| `/noon` | `command.noon` | Define o horário para 12:00 |
| `/morning` | `command.morning` | Define o horário para 09:00 |
| `/evening` | `command.evening` | Define o horário para 18:00 |
| `/night` | `command.night` | Define o horário para 23:00 |
| `/timescale <ms>` | `command.timescale` | Define os milissegundos por minuto de jogo. Valores `<= 2000` são ignorados |
| `/freezetime <0\|1>` | `command.freezetime` | Congela (`1`) ou descongela (`0`) o relógio |
| `/weather` | `command.weather` | Abre o menu admin com a previsão atual e a fila de clima |
| `/blackout` | `command.blackout` | Liga/desliga o apagão (luzes artificiais da cidade) |

---

## Menu admin de clima

O `/weather` envia a fila atual para o cliente e abre um menu de contexto do `ox_lib`:

- **Clima atual** — mostra o tipo e quantos minutos faltam.
- **Próximos climas** — mostra em quantos minutos cada evento começa e quanto dura.

Ao selecionar um evento da fila, é possível:

- **Mudar clima** — troca o tipo de clima do evento (se for o evento atual, aplica na hora).
- **Mudar duração** — slider de 1 a 120 minutos.
- **Remover o evento climático** — apaga o evento da fila.

Todas as três operações são validadas no servidor contra a ACE `command.weather`.

---

## Integrações

### qb-core / qbx_core (`qb-weathersync`)

Carregada automaticamente se `qb-core` **ou** `qbx_core` existirem. O recurso declara `provide 'qb-weathersync'` e reimplementa os exports e eventos do original, então recursos que dependem do `qb-weathersync` continuam funcionando sem alteração.

Exports não suportados (apenas imprimem um aviso no console): `nextWeatherStage`, `setDynamicWeather`.

Eventos de cliente respeitados: `qb-weathersync:client:DisableSync` e `qb-weathersync:client:EnableSync` (alternam o statebag `syncWeather` do jogador). `QBCore:Client:OnPlayerLoaded` reativa a sincronização.

### cd_easytime

Ativa por padrão. Reimplementa `exports.cd_easytime:GetWeather()` (cliente e servidor), retornando `{ weather, blackout, freeze }`, e escuta `cd_easytime:PauseSync`.

Para desligar: `setr weather_disablecd true` no `server.cfg`.

### vSync

Escuta o evento `vSync:toggle` no cliente, que liga/desliga a sincronização daquele jogador.

### txAdmin

Se `useScheduledWeather = true`, o servidor escuta `txAdmin:events:scheduledRestart` e sobrescreve o clima conforme a contagem regressiva: `OVERCAST` a 15 minutos, `RAIN` a 10 minutos, `THUNDER` a 5 minutos. A partir daí a fila normal fica congelada.

### nve_iced_alamo

Se o recurso existir, o IPL `alamo_ice` é solicitado quando o clima tem neve e removido quando ela acaba.

---

## Entrypoints para outros recursos

### GlobalState

O estado é replicado por `GlobalState`, então qualquer recurso pode ler ou escrever direto.

```lua
-- Ler
local weather = GlobalState.weather        -- { weather, time, windSpeed, windDirection, isRain }
local time    = GlobalState.currentTime    -- { hour, minute }
local scale   = GlobalState.timeScale      -- ms por minuto de jogo
local frozen  = GlobalState.freezeTime     -- bool
local dark    = GlobalState.blackOut       -- bool
local night   = GlobalState.isNight        -- bool

-- Escrever (server-side)
GlobalState.weather = { weather = 'THUNDER', time = 30 }
GlobalState.currentTime = { hour = 8, minute = 30 }
GlobalState.freezeTime = true
GlobalState.blackOut = true
```

O servidor tem `AddStateBagChangeHandler` para `currentTime`, `timeScale` e `freezeTime`, então escritas externas são absorvidas e replicadas corretamente.

### Statebag do jogador

```lua
-- Cliente: para de sincronizar o clima do servidor neste jogador
LocalPlayer.state:set('syncWeather', false, true)

-- Cliente: clima local usado enquanto syncWeather = false (padrão 'EXTRASUNNY')
LocalPlayer.state:set('playerWeather', 'RAIN', true)
```

### Exports de compatibilidade `qb-weathersync` (servidor)

```lua
exports['qb-weathersync']:setWeather('THUNDER')
exports['qb-weathersync']:setTime(8, 30)
exports['qb-weathersync']:setBlackout(true)
exports['qb-weathersync']:setTimeFreeze(true)

local blackout = exports['qb-weathersync']:getBlackoutState()
local frozen   = exports['qb-weathersync']:getTimeFreezeState()
local weather  = exports['qb-weathersync']:getWeatherState()
local dynamic  = exports['qb-weathersync']:getDynamicWeather()
local hour, minute = exports['qb-weathersync']:getTime()
```

### Eventos

```lua
-- Servidor (exigem ACE)
TriggerServerEvent('qb-weathersync:server:setWeather', 'RAIN')   -- ACE command.weather
TriggerServerEvent('qb-weathersync:server:setTime', 8, 30)       -- ACE command.time
TriggerServerEvent('Renewed-Weather:server:removeWeatherEvent', index) -- ACE command.weather

-- Cliente
TriggerClientEvent('qb-weathersync:client:DisableSync', src)
TriggerClientEvent('qb-weathersync:client:EnableSync', src)
TriggerClientEvent('cd_easytime:PauseSync', src, true)
TriggerClientEvent('vSync:toggle', src, false)
```

---

## Estrutura de arquivos

```
Renewed-Weathersync/
├── classes/
│   └── weather.lua              — classe ox_lib do evento climático (weather, time, windSpeed, windDirection, isRain)
├── client/
│   ├── admin.lua                — menu de contexto de gerenciamento de clima (/weather)
│   ├── time.lua                 — aplica hora e escala de tempo a partir do GlobalState
│   └── weather.lua              — aplica clima, vento, partículas de neve e blackout
├── server/
│   ├── time.lua                 — loop do relógio, statebags de tempo e comandos de hora
│   ├── weather.lua              — executa a fila de clima, callbacks admin, /weather, /blackout, txAdmin
│   └── weatherbuilder.lua       — constrói a fila de clima completa no start do recurso
├── compatability/
│   ├── qb/client.lua            — eventos qb-weathersync no cliente
│   ├── qb/server.lua            — exports e eventos qb-weathersync no servidor
│   ├── cd/client.lua            — export GetWeather e cd_easytime:PauseSync
│   ├── cd/server.lua            — export GetWeather no servidor
│   └── vsync/client.lua         — evento vSync:toggle
├── config/
│   ├── time.lua                 — escala de tempo, hora inicial, horário noturno
│   └── weather.lua              — sequências, climas estáticos, regras de chuva
└── fxmanifest.lua
```
