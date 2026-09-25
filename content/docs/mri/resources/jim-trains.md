---
title: Jim Trains
---

Faz trens de carga e metrô circularem pelo mapa, com blips ao vivo, paradas automáticas nas estações e um sistema opcional de passagem para o metrô.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Comandos](#comandos)
5. [Trens de carga](#trens-de-carga)
6. [Metrô e passagens](#metrô-e-passagens)
7. [Locais](#locais)
8. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
9. [Localização](#localização)
10. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `jim_bridge` | Sim | Declarado no manifest. Fornece notificações, drawText, blips, targets e a cobrança do jogador |
| `ox_lib` | Sim | Carregado via `@ox_lib/init.lua` |
| `qbx_core` | Sim | Carregado via `@qbx_core/modules/playerdata.lua` |
| `PolyZone` | Sim | Carregado como `client_script` |
| Script de target (`ox_target`, `qb-target`…) | Não | Só se `requireMetroTicket = true`. O `jim_bridge` detecta sozinho qual está rodando |

---

## Instalação

1. Copie a pasta `jim-trains` para `resources/`.
2. Adicione ao `server.cfg`, **depois** das dependências:
   ```
   ensure jim_bridge
   ensure jim-trains
   ```
3. Ajuste o `config.lua` conforme a seção abaixo.

Não há SQL, itens ou permissões ACE.

**Conflitos** — o recurso chama `SetRandomTrains(true)`, `SwitchTrainTrack` e `SetTrainTrackSpawnFrequency` nos tracks `0` e `3`. Não rode junto com outro script que também controle o spawn de trens.

---

## Configuração

Todas as opções ficam em `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Lan` | string | Sim | Idioma usado nos textos. Deve existir um arquivo correspondente em `locales/`. Padrão `"en"` |
| `Config.System.Debug` | bool | Sim | Ativa logs no console (parada/partida dos trens) e o `debugPoly` das zonas de compra |
| `Config.System.Notify` | string | Sim | Sistema de notificação usado pelo `jim_bridge`. Aceita `gta`, `ox`, `qb`, `esx`, `okok`, `lation` ou `red` |
| `Config.System.drawText` | string | Sim | Sistema de texto na tela usado pelo `jim_bridge`. Aceita `gta`, `ox`, `qb`, `esx`, `lation` ou `red` |
| `Config.General.ShowTrainBlips` | bool | Sim | Cria blips em tempo real seguindo cada trem no mapa |
| `Config.General.showStationBlips` | bool | Sim | Cria blips fixos nas 10 estações de metrô |
| `Config.General.requireMetroTicket` | bool | Sim | Exige passagem para andar de metrô. Com `false`, o metrô é gratuito e não há zonas de compra |
| `Config.General.chargeBank` | bool | Sim | `true` cobra do banco; `false` cobra do dinheiro vivo |
| `Config.General.chargeAmount` | number | Sim | Valor cobrado por passagem. Padrão `100` |
| `Config.General.seatPlayer` | bool | Sim | `true` senta o jogador à força num assento livre do metrô. `false` deixa o jogador andar dentro do trem |

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/getoffnext` | — | Alterna a intenção de descer na próxima parada. Mapeado por padrão na tecla **G** (`RegisterKeyMapping`), remapeável pelo jogador nas configurações do FiveM |

---

## Trens de carga

Ao iniciar, o recurso carrega os modelos `freight`, `freight2`, `freightcar`, `freightcar2`, `freightgrain`, `freightcont1`, `freightcont2`, `freighttrailer`, `tankercar` e `metrotrain`, liga os tracks `0` e `3` com frequência de spawn de 12000 e ativa trens aleatórios.

Todo trem detectado tem tratamento automático:

- O maquinista NPC fica invencível e não reage a eventos ao redor.
- O trem em si fica invencível e com as portas travadas (`SetVehicleDoorsLocked(train, 10)`).
- Trens de carga que chegam a até 15 metros de uma das paradas em `freightStops` param sozinhos: desaceleram até zero, ficam **40 segundos** parados e retomam até a velocidade 15. Esses tempos são fixos no `client/client.lua`.

Com `ShowTrainBlips = true`, cada trem ganha um blip que segue a entidade, gira conforme o heading e fica **azul** quando o trem está parado.

---

## Metrô e passagens

Com `requireMetroTicket = true`:

1. Zonas de target são criadas nas 17 máquinas de passagem listadas em `TicketPurchase` (opção "Buy Train Ticket").
2. Comprar debita `Config.General.chargeAmount` do banco ou do dinheiro vivo, conforme `chargeBank`. Sem saldo, a compra é recusada.
3. Entrar no metrô **sem passagem** teleporta o jogador para fora, na parada mais próxima de `MetroRemoveStops`.
4. Com passagem, o jogador é sentado automaticamente (se `seatPlayer = true`) e um texto na tela oferece descer na próxima parada com **G**.
5. Ao acionar o `/getoffnext` e o trem parar, o jogador é teleportado para a plataforma e a passagem é consumida — cada passagem vale uma viagem.

Os assentos `-1`, `0`, `1` e `5` são reservados (maquinista e cabine) e nunca são usados para o jogador.

Com `seatPlayer = false`, o jogador entra livremente e a passagem é consumida quando ele sai do trem por conta própria.

---

## Locais

Todas as coordenadas ficam em `shared/locations.lua`, em quatro tabelas:

| Tabela | Conteúdo |
|---|---|
| `MetroLocations` | 10 estações de metrô. Usadas para os blips fixos de estação |
| `MetroRemoveStops` | Pontos de plataforma (`vec4`, com heading) para onde o jogador é teleportado ao desembarcar ou ser removido do trem |
| `TicketPurchase` | 17 máquinas de passagem. Cada entrada tem `coords` (`vec4`, o `w` é o heading), `w` (largura) e `d` (profundidade) da zona |
| `freightStops` | 7 pontos onde os trens de carga param sozinhos |

Para adicionar uma nova máquina de passagem:

```lua
TicketPurchase = {
    { coords = vec4(115.64, -1725.99, 30.0, 50), w = 5.0, d = 2.05 },
}
```

---

## Entrypoints para outros recursos

O recurso **não** tem arquivo de servidor próprio nem exports. A cobrança usa um evento genérico registrado pelo `jim_bridge` em nome do recurso:

```lua
TriggerServerEvent('jim-trains:server:ChargePlayer', amount, moneyType)
```

`moneyType` é `"bank"` ou `"cash"`. O handler está em `jim_bridge/shared/playerfunctions.lua` — renomear a pasta do recurso muda o nome do evento junto.

As funções em `shared/function.lua` (`LoadTrainModels`, `isPedInTrain`, `putPlayerInSeat`, `putPedInSeat`, `getClosestCoord`, `removePlayerFromTrain`, `getClosest`, `getVehicleInDirection`, `isSeatRestricted`) são globais e ficam acessíveis dentro do próprio recurso, mas não são exportadas.

---

## Localização

Os textos ficam em `locales/`, carregados como `shared_scripts`. O idioma ativo é escolhido por `Config.Lan` no `config.lua` — **não** pela convar `ox:locale`.

- `en.lua` — inglês (único idioma incluído)

Para adicionar um idioma, crie `locales/<codigo>.lua` seguindo a estrutura do `en.lua` (tabela `Loc['<codigo>']` com as mesmas chaves) e defina `Config.Lan = "<codigo>"`.

Chaves disponíveis: `metrain`, `freight`, `buy`, `gettingoff`, `getoff`, `lsmetro`, `seating`, `welcome`, `noticket`, `arrived`, `already`, `purchased`, `nocash`.

---

## Estrutura de arquivos

```
jim-trains/
├── client/
│   └── client.lua        — spawn de trens, blips, parada nas estações, compra e uso de passagem, keybind G
├── shared/
│   ├── function.lua      — helpers: carregar modelos, detectar jogador no trem, sentar, teleportar para plataforma
│   └── locations.lua     — estações de metrô, plataformas, máquinas de passagem e paradas de carga
├── locales/
│   └── en.lua            — textos em inglês
├── config.lua            — idioma, sistema de notify/drawText, blips, passagem e cobrança
├── version.txt
├── README.md
└── fxmanifest.lua
```
