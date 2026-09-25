---
title: CW Racingapp
---

App de corridas em NUI: criar pistas com checkpoints, hospedar e entrar em corridas (sprint, voltas, eliminação, ranqueadas), com crypto próprio, crews, bounties de time trial e corridas automatizadas.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Tipos de usuário do app](#tipos-de-usuário-do-app)
5. [Configuração](#configuração)
6. [Comandos](#comandos)
7. [Criador de pistas](#criador-de-pistas)
8. [Racing Crypto e pagamentos](#racing-crypto-e-pagamentos)
9. [Corridas automatizadas](#corridas-automatizadas)
10. [Bounties](#bounties)
11. [ELO e ranqueadas](#elo-e-ranqueadas)
12. [Banco de dados](#banco-de-dados)
13. [Integrações](#integrações)
14. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
15. [Localização](#localização)
16. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `cw-performance` | Sim | Declarado em `dependencies`. Fornece as classes de veículo usadas em `Config.Classes` |
| `ox_lib` | Sim | Carregado via `@ox_lib/init.lua`. Keybinds, notify e input |
| `oxmysql` | Sim | Persistência de pistas, usuários e crews |
| `qbx_core` | Sim | Carregado via `@qbx_core/modules/playerdata.lua`. O bridge também suporta `qb-core`, `ox_core` e `es_extended`, detectados por `GetResourceState` |
| `ox_target` | Não | Só se `Config.UseOxTarget = true` (padrão) |
| `ox_inventory` | Não | Se `Config.Inventory = 'ox'` (padrão). Alternativa: `'qb'` |

O bridge (`bridge/client/` e `bridge/server/`) escolhe o framework sozinho: se `qbx_core` estiver rodando, o arquivo `qb.lua` se desativa.

---

## Instalação

1. Copie a pasta `cw-racingapp` para `resources/`.
2. Importe os SQLs:
   ```
   cw-racingapp.sql      -- tabelas race_tracks e racer_names
   cw-racingcrews.sql    -- tabela racing_crews
   default_tracks.sql    -- opcional: pistas de exemplo (ajuste os CITIZENID antes)
   ```
   > O `cw-racingapp.sql` recria a `race_tracks`. Se você já tem essa tabela de uma versão anterior, faça backup antes.
3. Cadastre o item `racing_gps` no seu inventário (o nome vem de `Config.ItemName.gps`) e copie `items/racing_gps.png` para a pasta de imagens do inventário. O item é registrado como usável pelo bridge e abre o app.
4. Adicione ao `server.cfg`:
   ```
   ensure cw-performance
   ensure cw-racingapp
   ```
5. Ajuste o `config.lua` — em especial `Config.Locale`, `Config.Inventory`, `Config.Payments` e `Config.Classes`.

---

## Permissões (ACE)

Os comandos administrativos são registrados como **restritos**, exigindo a ACE `command.<nome>`:

```
add_ace group.admin command.createracinguser allow
add_ace group.admin command.remracename allow
add_ace group.admin command.racingappcurated allow
```

> Todos esses comandos só são registrados quando `Config.Debug = true`. Com o debug desligado (padrão), eles não existem — nem para a ACE.

A permissão do que cada jogador pode fazer **dentro do app** não usa ACE: ela vem do tipo de usuário salvo na tabela `racer_names`.

---

## Tipos de usuário do app

Definidos em `Config.Permissions`. Cada racer name tem um tipo (`auth`) gravado no banco.

| Permissão | racer | creator | master | god |
|---|---|---|---|---|
| `join` — entrar em corridas | Sim | Sim | Sim | Sim |
| `records` — ver recordes | Sim | Sim | Sim | Sim |
| `setup` — montar corridas | Sim | Sim | Sim | Sim |
| `create` — criar pistas | Não | Sim | Sim | Sim |
| `control` — gerenciar usuários | Não | Não | Sim | Sim |
| `controlAll` — gerenciar todos os usuários | Não | Não | Não | Sim |
| `createCrew` — criar crews | Não | Não | Sim | Sim |
| `startRanked` — iniciar corridas ranqueadas | Não | Não | Sim | Sim |
| `startElimination` — iniciar eliminação | Não | Não | Sim | Sim |
| `startReversed` — iniciar pista invertida | Sim | Sim | Sim | Sim |
| `setupParticipation` — distribuir prêmio de participação | Não | Não | Não | Sim |
| `curateTracks` — marcar pista como curada | Não | Não | Sim | Sim |
| `handleBounties` — gerenciar bounties | Não | Não | Sim | Sim |
| `cancelAll` — cancelar qualquer corrida | Não | Não | Sim | Sim |
| `startAll` — iniciar qualquer corrida | Não | Não | Não | Sim |

Se `Config.AllowAnyoneToCreateUserInApp = true`, qualquer um cria o próprio usuário com o tipo `Config.BasePermission` (padrão `racer`). **Se o banco não tiver nenhum usuário, o primeiro criado vira `god` automaticamente.**

Usuários também podem ser comprados no NPC trader ou no laptop (veja `Config.Trader` e `Config.Laptop`).

---

## Configuração

Tudo em `config.lua`.

### Geral

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Debug` | bool | Sim | Logs de diagnóstico. **Também é o que habilita os comandos admin** |
| `Config.Locale` | tabela | Sim | Tabela de tradução ativa. Deve ser uma das variáveis de `locales/` (`TranslationsEN` ou `TranslationsPT`) |
| `Config.Inventory` | string | Sim | `'ox'` ou `'qb'` |
| `Config.PrimaryUiColor` | hex | Sim | Cor primária da UI. Padrão `#f07800` |
| `Config.ItemName.gps` | string | Sim | Nome do item que abre o app. Padrão `racing_gps` |
| `Config.HideMapInTablet` | bool | Sim | Esconde o mapa dentro do app |
| `Config.UseOxLibForKeybind` | bool | Sim | Usa `lib.addKeybind` (remapeável) em vez de `RegisterKeyMapping` |
| `Config.UseOxTarget` | bool | Sim | Usa `ox_target` no trader e no laptop |
| `Config.OxInput` | bool | Sim | Usa os inputs do `ox_lib` |
| `Config.OxLibNotify` | bool | Sim | Usa as notificações do `ox_lib` |

### Corridas

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.UseResetTimer` | bool | Sim | Liga o timer de reset da corrida |
| `Config.RaceResetTimer` | number (ms) | Sim | Tempo até uma corrida ser resetada. Padrão `300000` |
| `Config.TimeOutTimerInMinutes` | number | Sim | Timeout da corrida em minutos. Padrão `5` |
| `Config.KickTime` | number (ms) | Sim | Tempo parado até ser removido da corrida. Padrão `10 min` |
| `Config.JoinDistance` | number (m) | Sim | Distância máxima da largada para entrar numa corrida. Padrão `200` |
| `Config.NotifyRacers` | bool | Sim | Avisa quem estiver com o GPS de corrida quando uma corrida é hospedada |
| `Config.CheckDistance` | bool | Sim | Compara distâncias até os checkpoints para calcular posição. Custa performance com muitos corredores |
| `Config.PositionCheatBuffer` | number (m) | Sim | Folga antes da checagem de largada adiantada acusar cheat. Padrão `10.0` |
| `Config.CheckpointBuffer` | number (m) | Sim | Margem além do tamanho do checkpoint que ainda conta como passagem. Padrão `1.0` |
| `Config.Classes` | tabela | Sim | Classes de veículo permitidas. Devem existir no `cw-performance`. Padrão `C`, `B`, `A`, `S` |
| `Config.UseCustomClassSystem` | bool | Sim | Opt-in para sistema de classes próprio. Sem suporte do autor |
| `Config.Ghosting` | tabela | Sim | `Enabled`, `Timer` (0 = a corrida toda), `DistanceLoopTime`, `DeGhostDistance`, `Alpha` e as `Options` do seletor |
| `Config.QuickSetupDefaults` | tabela | Sim | Valores pré-preenchidos no setup rápido |
| `Config.Splits` | tabela | Sim | Divisão do prêmio: `three` (3 corredores) e `more` (4+). Chave = posição, valor = fração do bolo |
| `Config.Sounds` | tabela | Sim | Sons da contagem, checkpoint e chegada |
| `Config.HUDSettings` | tabela | Sim | `location` (`split`, `right` ou `left`) e `maxPositions` |
| `Config.Options.Laps` | lista | Sim | Opções de voltas. `-1` = eliminação, `0` = sprint |
| `Config.Options.BuyIns` | lista | Sim | Valores de inscrição oferecidos |

### Pistas e recordes

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.MaxCheckpoints` | number | Sim | Limite de checkpoints antes do aviso. Passar disso **pode travar os clientes** |
| `Config.MinimumCheckpoints` | number | Sim | Mínimo para salvar uma pista. Padrão `10` |
| `Config.MinTireDistance` / `MaxTireDistance` | number (m) | Sim | Tamanho mínimo e máximo de um checkpoint |
| `Config.MinTrackNameLength` / `MaxTrackNameLength` | number | Sim | Limites do nome da pista |
| `Config.LimitTracks` | bool | Sim | Limita pistas por citizenid |
| `Config.MaxCharacterTracks` | number | Sim | Máximo de pistas por citizenid. Padrão `2` |
| `Config.CustomAmountsOfTracks` | tabela | Sim | Limite customizado por citizenid |
| `Config.AllowCreateFromShare` | bool | Sim | Permite criar pista a partir de uma pista compartilhada |
| `Config.UseVehicleModelInsteadOfClassForRecords` | bool | Sim | Recordes por modelo de veículo em vez de por classe |
| `Config.LimitTopListTo` | number \| nil | Sim | Tamanho do ranking. `nil` lista todos |
| `Config.DontShowRankingsUnderZero` | bool | Sim | Esconde do ranking quem tem 0 ou menos |
| `Config.StartAndFinishModel` | string | Não | Prop da largada/chegada. Comente a linha para não usar props |
| `Config.CheckpointPileModel` | string | Não | Prop dos checkpoints. Comente a linha para não usar entidades |
| `Config.Buttons` | tabela | Sim | Teclas do criador de pistas |

### Nomes de corredor

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.UseNameValidation` | bool | Sim | Nomes de corredor únicos no servidor |
| `Config.MaxRacerNames` | number | Sim | Nomes por personagem. Padrão `2` |
| `Config.CustomAmounts` | tabela | Sim | Limite customizado por citizenid |
| `Config.MinRacerNameLength` / `MaxRacerNameLength` | number | Sim | Limites de tamanho do nome |
| `Config.AllowAnyoneToCreateUserInApp` | bool | Sim | Qualquer um cria usuário pelo app |
| `Config.AllowRacerCreationForAnyone` | bool | Sim | Qualquer um cria usuários com a permissão base |
| `Config.BasePermission` | string | Sim | Tipo criado por padrão. Deve existir em `Config.Permissions` |

### GPS e checkpoints

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.DoOffsetGps` | bool | Sim | Desloca levemente o ponto do GPS (melhora a rota) |
| `Config.IgnoreRoadsForGps` | bool | Sim | Experimental: GPS em linha reta. Não desenha a linha do último checkpoint até a chegada em corridas de volta |
| `Config.ShowGpsRoute` | bool | Sim | Padrão de exibição da rota |
| `Config.UseUglyWaypoint` | bool | Sim | Usa o waypoint padrão do GTA |
| `Config.UseDrawTextWaypoint` | bool | Sim | Desenha pilares nos próximos checkpoints |
| `Config.MarkAmountOfCheckpointsAhead` | number | Sim | Quantos checkpoints à frente marcar. Padrão `3` |
| `Config.DrawTextSetup` | tabela | Sim | Tipo, cores, alturas e tamanho do pilar |
| `Config.Gps.color` / `Config.Blips` | tabela | Sim | Cores e tamanhos dos blips |
| `Config.FlareTime` | number (ms) | Sim | Duração dos flares. Padrão `10000` |

### Trader e laptop

Dois pontos onde se compra um usuário do app.

| Campo | Tipo | Descrição |
|---|---|---|
| `active` | bool | Se o NPC / laptop aparece |
| `jobRequirement` | tabela | Exige job (ligado a `Config.AllowedJobs`) por tipo de usuário |
| `requireToken` | bool | Exige token cw |
| `model` | string | Modelo do ped (trader) ou da prop (laptop) |
| `animation` | string | Cenário do ped. Só no trader |
| `location` | vector4 | Onde fica |
| `moneyType` | string | Tipo de dinheiro cobrado |
| `racingUserCosts` | tabela | Preço de cada tipo: `racer`, `creator`, `master`, `god` |
| `useSlimmed` | bool | Menu enxuto, sem input de citizenid. Só no trader |

`Config.AllowedJobs` mapeia job → tipos de usuário que aquele job pode comprar. Só tem efeito com `jobRequirement` ativo.

---

## Comandos

### Cliente (sempre disponíveis)

| Comando | Permissão | Descrição |
|---|---|---|
| `/showroute` | — | Liga/desliga a rota do GPS |
| `/ignoreroads` | — | Liga/desliga o GPS em linha reta (ignora ruas) |
| `/basicwaypoint` | — | Alterna entre o waypoint padrão do GTA e o do script |

### Servidor (só com `Config.Debug = true`, restritos por ACE)

| Comando | Permissão | Descrição |
|---|---|---|
| `/createracinguser <tipo> <id> "<nome>"` | ACE `command.createracinguser` | Cria um usuário do app de graça (custo zerado) |
| `/remracename "<nome>"` | ACE `command.remracename` | Remove um racer name do banco |
| `/removeallracetracks` | ACE `command.removeallracetracks` | Apaga a tabela `race_tracks` inteira |
| `/racingappcurated "<track-id>" <true\|false>` | ACE `command.racingappcurated` | Marca ou desmarca uma pista como curada |
| `/cwdebugracing` | ACE `command.cwdebugracing` | Alterna o debug em runtime |
| `/cwracingapplist` | ACE `command.cwracingapplist` | Imprime no console pistas, corridas disponíveis, não terminadas e timers |
| `/createracingcrew <fundador> <citizenid> <crew>` | ACE | Cria uma crew |
| `/joinracingcrew <membro> <citizenid> <crew>` | ACE | Entra numa crew |
| `/leaveracingcrew <citizenid> <crew>` | ACE | Sai de uma crew |
| `/disbandracingcrew <crew>` | ACE | Desfaz uma crew |
| `/addwintocrew <crew>` | ACE | Soma uma vitória à crew |
| `/addracetocrew <crew>` | ACE | Soma uma corrida à crew |
| `/updateranking <crew> <valor>` | ACE | Ajusta o rank da crew |
| `/printracingcrews` | ACE | Imprime as crews no console |
| `/printinvites` | ACE | Imprime os convites ativos no console |

---

## Criador de pistas

Requer a permissão `create` (tipo `creator` ou superior). As teclas vêm de `Config.Buttons` e, com `Config.UseOxLibForKeybind = true`, são remapeáveis pelo jogador nas configurações do FiveM.

| Ação | Tecla padrão |
|---|---|
| Adicionar checkpoint | `INSERT` |
| Remover checkpoint | `DELETE` |
| Mover checkpoint | `HOME` |
| Salvar pista | `0` |
| Aumentar o checkpoint | `PAGEUP` |
| Diminuir o checkpoint | `PAGEDOWN` |
| Sair do criador | `9` |

Regras: mínimo de `Config.MinimumCheckpoints` (10) checkpoints; tamanho entre `MinTireDistance` e `MaxTireDistance`; nome entre `MinTrackNameLength` e `MaxTrackNameLength`. Passar de `Config.MaxCheckpoints` (60) gera aviso — e, na prática, pode travar os clientes.

---

## Racing Crypto e pagamentos

O recurso tem um crypto próprio (`Config.Payments.cryptoType`, padrão `RAC`), guardado na coluna `crypto` da tabela `racer_names`.

`Config.Payments` define qual moeda é usada em cada fluxo:

| Campo | Padrão | Uso |
|---|---|---|
| `useRacingCrypto` | `true` | Liga o crypto interno |
| `racing` | `racingcrypto` | Inscrições e prêmios das corridas |
| `automationPayout` | `racingcrypto` | Prêmios das corridas automatizadas |
| `participationPayout` | `racingcrypto` | Prêmios de participação |
| `bountyPayout` | `racingcrypto` | Prêmios de bounty |
| `createRacingUser` | `cash` | Compra de usuários no trader/laptop |
| `crypto` | `cash` | Moeda usada para comprar crypto |

`Config.Options` controla a conversão: `conversionRate` (dinheiro x taxa = crypto), `sellCharge` (% perdido na venda) e as flags `allowBuyingCrypto`, `allowSellingCrypto` e `allowTransferCrypto`. **Se as três forem `false`, não há como abrir o menu de crypto.**

### Prêmios de participação

São dois sistemas distintos:

- `Config.ParticipationTrophies` — **automático**. Só paga se as condições forem atendidas: `requireCurated`, `requireRanked`, `requireBuyIns` com `buyInMinimum`, `minimumOfRacers` (padrão 6) e `minumumRaceLength`. O valor por posição vem de `amount`.
- `Config.ParticipationAmounts` — **manual**, para quem tem a permissão `setupParticipation`. `positionBonuses` dá um bônus percentual extra ao pódio.

---

## Corridas automatizadas

`Config.AutomatedRaces` é a lista de corridas que o servidor hospeda sozinho, em rodízio.

```lua
{
    trackId = 'CW-7666',        -- id da pista (veja no app ou na tabela race_tracks)
    laps = 2,                   -- 0 = sprint, -1 = eliminação
    racerName = 'AutoMate',     -- nome do host
    maxClass = 'A',
    ghostingEnabled = false,
    ghostingTime = 0,
    buyIn = 1,
    ranked = true,
    reversed = false,
    participationMoney = 100,
    participationCurrency = Config.Payments.participationPayout,
    firstPerson = false
}
```

`Config.AutomatedOptions` controla o rodízio: `timeBetweenRaces` (ms entre corridas), `minimumParticipants` e os `payouts` extras (`participation`, `winner` e `perRacer`, que multiplica pelo número de corredores).

---

## Bounties

Time trials: bata o tempo alvo numa pista e classe específicas para receber o prêmio.

```lua
{
    trackId = 'CW-7666',
    maxClass = 'A',
    reversed = false,
    timeToBeat = 31787,   -- em ms
    extraTime = 5000,     -- folga aleatória somada ao alvo na geração
    price = 200,
    sprint = false,       -- exige que seja sprint
    rankRequired = 2,     -- opcional; senão usa defaultRankRequirement
}
```

`Config.BountiesOptions` define quantos bounties existem por vez (`minAmount` / `maxAmount`), se pode repetir pista (`allowMultipleOnSameTrack`) ou classe (`allowMultipleInSameClass`), o rank mínimo padrão (`defaultRankRequirement`) e o `consecutiveMultiplier` — quanto do prêmio original o jogador ganha ao bater o próprio tempo de novo (0.5 = 50%).

`Config.FirstBountiesGenerateStartTime` é o atraso (ms) até a primeira geração de bounties após o start do recurso.

---

## ELO e ranqueadas

Corridas ranqueadas movem o `ranking` do racer name. `Config.EloPunishments` define o que é descontado por comportamento ruim:

| Situação | Padrão |
|---|---|
| `leaving` — sair de uma corrida em andamento | -1 |
| `idling` — ficar parado e ser removido | -2 |
| `positionCheat` — largar à frente da linha | -1 |
| `cheeseing` — tentar burlar o percurso | -6 |

Só quem tem a permissão `startRanked` (`master` ou `god`) pode iniciar uma corrida ranqueada.

---

## Banco de dados

Três tabelas.

| Tabela | Conteúdo |
|---|---|
| `race_tracks` | Pistas: `name`, `checkpoints` (JSON), `metadata`, `records`, `creatorid`, `creatorname`, `distance`, `raceid`, `access`, `curated` |
| `racer_names` | Usuários do app: `citizenid`, `racername`, `races`, `wins`, `tracks`, `auth` (tipo), `crew`, `createdby`, `revoked`, `ranking`, `active`, `crypto` |
| `racing_crews` | Crews: `crew_name`, `members` (JSON), `wins`, `races`, `rank`, `founder_name`, `founder_citizenid` |

---

## Integrações

### cw-performance

Dependência declarada no manifest. É de onde vêm as classes de veículo (`C`, `B`, `A`, `S`…). Só use em `Config.Classes` classes que existam no `cw-performance`.

### ox_target

Com `Config.UseOxTarget = true`, o NPC trader e o laptop viram alvos do `ox_target`.

### ox_inventory / qb-inventory

Definido em `Config.Inventory`. O item `racing_gps` é registrado como usável pelo bridge do framework ativo e abre o app ao ser usado.

### ox_lib

Keybinds do criador de pistas (`Config.UseOxLibForKeybind`), notificações (`Config.OxLibNotify`) e diálogos de input (`Config.OxInput`).

---

## Entrypoints para outros recursos

### Exports de cliente

```lua
exports['cw-racingapp']:openRacingApp()               -- abre a UI
exports['cw-racingapp']:IsInRace()                    -- bool
exports['cw-racingapp']:IsInEditor()                  -- bool
exports['cw-racingapp']:joinRace(raceId)              -- bool; exige estar dirigindo
exports['cw-racingapp']:getAvailableTracks()          -- pistas visíveis para o usuário atual
exports['cw-racingapp']:getAvailableRaces()           -- corridas abertas
exports['cw-racingapp']:attemptSetupRace(setupData)   -- hospeda uma corrida
```

`attemptSetupRace` espera uma tabela com `track` (trackId), `laps`, `maxClass`, `ghostingOn`, `ghostingTime`, `buyIn`, `ranked`, `reversed`, `participationMoney`, `participationCurrency`, `firstPerson` e `silent`. Retorna `false` se o jogador não estiver ao volante ou se a classe do carro não for permitida.

### Exports de servidor

```lua
exports['cw-racingapp']:openRacingApp(source)                        -- abre a UI para um jogador
exports['cw-racingapp']:getRacerCrypto(racerName)                    -- saldo de crypto
exports['cw-racingapp']:hasEnoughCrypto(racerName, amount)           -- bool
exports['cw-racingapp']:addRacerCrypto(racerName, amount)            -- bool
exports['cw-racingapp']:removeCrypto(racerName, amount)              -- bool; false se não tiver saldo
exports['cw-racingapp']:getRacingUsersByCitizenId(citizenId)         -- lista de usuários
exports['cw-racingapp']:getRacingUsersBySrc(src)                     -- lista de usuários
```

---

## Localização

Os arquivos ficam em `locales/`, carregados como `shared_scripts`. Cada um define uma **variável global** (`TranslationsEN`, `TranslationsPT`), e `Config.Locale` aponta para a variável desejada — não é a convar `ox:locale` nem uma string:

```lua
Config.Locale = TranslationsPT
```

Idiomas incluídos: `en.lua` (`TranslationsEN`) e `pt-br.lua` (`TranslationsPT`). O padrão deste fork é português.

Para adicionar um idioma, crie `locales/<codigo>.lua` com uma variável global nova, adicione o arquivo aos `shared_scripts` do `fxmanifest.lua` e aponte `Config.Locale` para ela. Chaves ausentes caem no próprio nome da chave.

---

## Estrutura de arquivos

```
cw-racingapp/
├── bridge/
│   ├── client/           — qbox.lua, qb.lua, ox.lua, esx.lua: dados do jogador por framework
│   └── server/           — qbox.lua, qb.lua, ox.lua, esx.lua: dinheiro, citizenid, item usável
├── client/
│   ├── main.lua          — corrida, checkpoints, HUD, criador de pistas, NUI, keybinds, exports
│   ├── functions.lua     — helpers de cliente
│   └── classes.lua       — classes de veículo via cw-performance
├── server/
│   ├── main.lua          — corridas, setup, callbacks, comandos admin, export openRacingApp
│   ├── database.lua      — camada RADB: queries de pistas, usuários e crypto
│   ├── functions.lua     — callbacks de servidor e helper registerCommand
│   ├── crypto.lua        — saldo, compra, venda e transferência de RAC (exports)
│   ├── crews.lua         — crews e comandos de crew
│   ├── elo.lua           — ranking das corridas ranqueadas
│   └── bounties.lua      — geração e resgate de bounties
├── html/
│   ├── dist/             — build da UI (Vue) servida como ui_page
│   └── src/              — fonte da UI
├── locales/
│   ├── en.lua            — TranslationsEN
│   └── pt-br.lua         — TranslationsPT
├── items/
│   └── racing_gps.png    — imagem do item
├── config.lua            — toda a configuração
├── cw-racingapp.sql      — tabelas race_tracks e racer_names
├── cw-racingcrews.sql    — tabela racing_crews
├── default_tracks.sql    — pistas de exemplo (opcional)
├── README.md
├── LICENSE
└── fxmanifest.lua
```
