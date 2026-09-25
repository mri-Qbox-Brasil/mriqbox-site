---
title: ARS Hunting
---

Sistema de caça com zonas, spawn de animais, rastreador, isca, fogueira, loja e missões, integrado à progressão de skill do `cw-rep`.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Itens](#itens)
4. [Configuração](#configuração)
5. [Zonas de caça](#zonas-de-caça)
6. [Lojas](#lojas)
7. [Missões](#missões)
8. [Fogueira](#fogueira)
9. [Bloqueio de mira (AimBlock)](#bloqueio-de-mira-aimblock)
10. [Integrações](#integrações)
11. [Localização](#localização)
12. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Callbacks, context menus, input dialogs, locale, cache e `lib.versionCheck` |
| `oxmysql` | Sim | Carregado no `fxmanifest.lua` (`@oxmysql/lib/MySQL.lua`) |
| `qb-core` **ou** ESX | Sim | O bridge em `server/bridge/` detecta qual está rodando e só ativa o correspondente |
| `cw-rep` | Sim | **Esta fork depende do `cw-rep`.** O servidor chama `updateSkill(source, 'hunting'/'cooking', 5)` ao colher, cozinhar e concluir missão; a loja chama `getCurrentLevel('hunting')` para liberar itens com `levelmin` |
| `ox_inventory` | Sim na prática | `Config.ImagesPath` aponta para `nui://ox_inventory/web/images/`. Os ícones das lojas e missões vêm daí |
| `ox_target` ou `qb-target` | Não | Definido por `Config.Target`. Com `nil`, o recurso cai no modo DrawText + tecla |
| `rep-talkNPC` | Não | Só se `Config.npcTalk = true`. Cria o NPC "Seu Tião" com diálogo tutorial |
| `pickle_waypoints` | Não | Usado dentro do diálogo do `rep-talkNPC` para marcar a zona de caça e o Mestre da Caça no mapa |

---

## Instalação

1. Copie a pasta `ars_hunting` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure ars_hunting
   ```
3. Registre os itens no inventário. O repositório traz os blocos prontos:
   - `!INSTALLATION/ox_items.lua` — para o `ox_inventory` (`data/items.lua`)
   - `!INSTALLATION/qb_items.lua` — para o `qb-core` (`shared/items.lua`)
4. Copie as imagens de `!INSTALLATION/images/` para a pasta de imagens do inventário (`ox_inventory/web/images/`).
5. Registre a arma `WEAPON_MUSKET` e a munição `ammo-musket` no inventário se for manter esses itens na loja.
6. Não há SQL a importar. Os delays de missão são persistidos via KVP do próprio recurso.

---

## Itens

| Item | Uso |
|---|---|
| `animal_tracker` | Item usável. Rastreia um animal próximo, com chance de falha |
| `huntingbait` | Item usável. É consumido e coloca uma isca no chão que atrai animais |
| `campfire` | Item usável. É consumido e coloca a fogueira. Pode ser recolhido depois |
| `raw_meat` | Carne crua colhida do animal |
| `cooked_meat` | Resultado de cozinhar carne crua na fogueira |
| `skin_deer_ruined` / `skin_deer_low` / `skin_deer_medium` / `skin_deer_good` / `skin_deer_perfect` | Peles de veado, da mais comum para a mais rara |
| `deer_horn` | Drop extra raro do veado |

Os três primeiros são registrados como usáveis pelo bridge (`CreateUseableItem` no QBCore, equivalente no ESX). Os nomes vêm de `Config.TrackerItem`, `Config.BaitItem` e `Config.Campfire.campfireItem`.

---

## Configuração

Arquivo: `shared/config.lua`.

### Geral

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.npcTalk` | bool | Sim | Cria o NPC tutorial via `rep-talkNPC`. Requer o recurso instalado |
| `Config.Debug` | bool | Sim | Ativa logs de diagnóstico |
| `Config.Target` | string \| nil | Sim | `"ox_target"`, `"qb-target"` ou `nil` para desativar targeting e usar DrawText |
| `Config.SpawnDelay` | número (s) | Sim | Intervalo entre spawns de animais. Padrão: `1` |
| `Config.DeleteEntityRadius` | número (m) | Sim | Distância a partir da qual o animal é deletado. Padrão: `300.0` |
| `Config.ImagesPath` | string | Sim | Caminho NUI das imagens dos itens. Padrão: `nui://ox_inventory/web/images/` |

### Rastreamento

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.TrackerItem` | string | Sim | Item que dispara o rastreamento. Padrão: `animal_tracker` |
| `Config.TrackingDuration` | número (s) | Sim | Duração do rastreamento. Padrão: `60` |
| `Config.DelayBetweenTracks` | número (s) | Sim | Cooldown entre dois rastreamentos. Padrão: `120` |
| `Config.TrackingFailureChance` | número (1-100) | Sim | Chance de o rastreamento não encontrar nada. Padrão: `20` |

### Isca

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.BaitItem` | string | Sim | Item da isca. Padrão: `huntingbait` |
| `Config.BaitAttractionDistance` | número (m) | Sim | Raio em que a isca atrai animais. Padrão: `100.0` |
| `Config.BaitTimeLimit` | número (min) | Sim | Tempo até a isca sumir. Padrão: `2` |

### AimBlock

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.AimBlock.enable` | bool | Sim | Liga o bloqueio de tiro em jogadores e veículos com as armas listadas |
| `Config.AimBlock.global` | bool | Sim | `true` bloqueia no mapa inteiro; `false` só dentro das zonas de caça |
| `Config.AimBlock.weaponsToBlock` | lista de hashes | Sim | Armas afetadas. Usa backticks: `` `WEAPON_HEAVYSNIPER_MK2` ``. Padrão: sniper pesada MK2 e mosquete |

### Fogueira

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Campfire.enable` | bool | Sim | Liga o sistema de fogueira e registra o item como usável |
| `Config.Campfire.campfireItem` | string | Sim | Item da fogueira. Padrão: `campfire` |
| `Config.Campfire.items` | lista | Sim | Receitas. Cada entrada tem `label`, `give` (item produzido), `cookTime` (segundos) e `require` (lista de `{ label, item, quantity }`) |

---

## Zonas de caça

Configuradas em `Config.HuntingZones`, indexadas por nome. A zona incluída de fábrica é `CHILIAD_MOUNTAINS`, em `vec3(1125.88, 4622.2, 80.08)`, com veado (`a_c_deer`).

| Campo da zona | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `coords` | `vec3` | Sim | Centro da zona |
| `radius` | número | Sim | Raio da zona em metros |
| `maxSpawns` | número | Sim | Máximo de animais vivos ao mesmo tempo |
| `allowedWeapons` | lista de strings \| nil | Não | Armas permitidas dentro da zona. `nil` libera qualquer arma |
| `zone_radius.enable` | bool | Não | Desenha o círculo da zona no mapa |
| `zone_radius.color` | número | Não | Cor do círculo |
| `zone_radius.opacity` | número | Não | Opacidade do círculo (0-255) |
| `blip.enable` / `blip.name` / `blip.type` / `blip.scale` / `blip.color` | — | Não | Blip da zona no mapa |
| `animals` | lista | Sim | Animais que podem spawnar na zona |

### Campos de um animal

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `model` | string | Sim | Modelo do ped animal (ex.: `a_c_deer`) |
| `chance` | número (1-100) | Sim | Peso do animal no sorteio de spawn |
| `harvestTime` | número (s) | Sim | Duração da colheita |
| `harvestWeapons` | lista de strings | Sim | Armas que permitem esfolar (ex.: `WEAPON_DAGGER`, `WEAPON_KNIFE`) |
| `blip` | tabela | Não | Blip do animal no mapa |
| `marker` | tabela | Não | Marcador 3D sobre o animal, com `color = { r, g, b, a }` |
| `items.skins` | lista | Sim | Peles possíveis, cada uma com `item`, `chance` e `maxQuantity` |
| `items.meat` | lista | Sim | Carnes possíveis, mesmo formato |
| `items.extra` | lista | Sim | Drops raros, mesmo formato |

### Como o loot é sorteado

A cada colheita o servidor sorteia **uma** pele e **uma** carne: rola `1-100` e escolhe aleatoriamente entre os itens cuja `chance` seja maior ou igual ao valor rolado. Isso significa que `chance` mais alta = item mais comum. A quantidade entregue é aleatória entre `1` e `maxQuantity`.

Além disso, em 30% das colheitas o servidor sorteia também um item de `items.extra`. Cada colheita dá 5 pontos de skill `hunting` no `cw-rep` (10 se saiu o extra).

O servidor recusa a colheita se o jogador estiver a mais de 8 metros do animal.

---

## Lojas

Configuradas em `Config.Shops`, indexadas pelo nome exibido. A loja incluída é "Loja de Caçador", em `vec4(-679.28, 5834.25, 16.33, 132.58)`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `coords` | `vec4` | Sim | Posição e heading do ped da loja |
| `ped.enable` | bool | Sim | Spawna um ped no local |
| `ped.model` | string | Sim | Modelo do ped. Padrão: `s_m_m_ammucountry` |
| `blip.enable` / `blip.type` / `blip.scale` / `blip.color` | — | Não | Blip da loja |
| `useDrawText` | bool | Não | Só tem efeito com `Config.Target = nil`: exibe o texto 3D de interação |
| `items.sell` | lista | Não | O que o jogador pode vender. Cada entrada tem `item`, `price` e `label` |
| `items.buy` | lista | Não | O que o jogador pode comprar. Cada entrada tem `item`, `label`, `price`, e opcionalmente `description` e `levelmin` |

O `levelmin` é comparado com `exports["cw-rep"]:getCurrentLevel('hunting')`. Itens acima do nível do jogador aparecem na lista como desabilitados, com a descrição "Desbloqueia no LV X".

A quantidade de compra ou venda é digitada pelo jogador em um input dialog, e o preço final é `quantidade * price`. O servidor valida dinheiro (compra) e posse do item (venda) antes de concluir.

---

## Missões

O Mestre da Caça fica em `Config.HuntMaster` — `vector4(17.04, 3688.28, 38.68, 147.12)`, modelo `cs_fabien`. Também define `vehicleSpawn` e `vehicleDeposit`, usados por missões que exigem veículo.

| Campo da missão | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | string | Sim | Identificador único. É a chave do KVP de cooldown |
| `label` | string | Sim | Nome da missão no menu |
| `content` | string | Sim | Descrição exibida ao jogador |
| `icon` | string | Sim | Ícone FontAwesome |
| `image` | string | Sim | Imagem exibida no menu (normalmente `Config.ImagesPath .. "<item>.png"`) |
| `type` | string | Sim | `"item"` (entregar itens) ou `"animal"` (capturar e transportar um animal) |
| `delay` | número (min) | Sim | Cooldown até poder repetir a mesma missão. `0` = sem cooldown |
| `time` | número (min) | Sim | Tempo limite para concluir |
| `vehicle.enable` / `vehicle.model` | — | Sim | Spawna um veículo no `vehicleSpawn` do Mestre da Caça |
| `requirements` | lista | Só em `type = "item"` | Itens exigidos: `{ item, label, quantity }` |
| `rewards` | lista | Sim | Itens entregues ao concluir: `{ item, quantity }`. Use `item = "money"` para dinheiro |
| `animal` | string | Só em `type = "animal"` | Modelo do animal alvo (ex.: `a_c_boar`) |
| `spawns` | lista de `vec3` | Só em `type = "animal"` | Locais possíveis onde o animal aparece |
| `blip` | tabela | Só em `type = "animal"` | Blip do animal alvo |
| `attach` | tabela | Só em `type = "animal"` | `pos` e `rot` do animal quando carregado no ombro |
| `vehicleAttach` | tabela | Só em `type = "animal"` | `pos` e `rot` do animal quando colocado no veículo |

Missões incluídas: `mission_1` (10 peles prime), `mission_2` (5 chifres) e `mission_3` (capturar um javali e levá-lo de volta, com o `bodhi2`).

O cooldown de cada missão é gravado por jogador com `SetResourceKvp` usando a chave `<id>_<license>`, então sobrevive a restart do recurso. O servidor recusa a finalização se o jogador estiver a mais de 3 metros do Mestre da Caça. Concluir uma missão dá 5 pontos de skill `hunting`.

---

## Fogueira

Usar o item `campfire` consome o item e posiciona o prop `prop_beach_fire` no chão. Interagindo com ela, o jogador abre um menu com as receitas de `Config.Campfire.items`; a receita padrão transforma 1 `raw_meat` em 1 `cooked_meat` em 5 segundos. Cozinhar dá 5 pontos de skill `cooking` no `cw-rep`.

A fogueira pode ser recolhida (devolve o item), desde que o jogador esteja a menos de 4 metros dela.

---

## Bloqueio de mira (AimBlock)

Com `Config.AimBlock.enable = true`, ao equipar uma arma listada em `weaponsToBlock` o recurso passa a bloquear o disparo (`DisablePlayerFiring` e os controles de ataque) sempre que o jogador **não** estiver mirando livremente em um alvo válido — ou seja, quando estiver mirando em outro jogador, em um veículo, ou em um ped dentro de um veículo.

Na prática: as armas de caça só disparam contra animais. Com `global = false`, a restrição vale apenas dentro das zonas de caça.

---

## Localização

As strings são traduzidas via `ox_lib` locale. Arquivos em `locales/`:

- `en.json` — inglês
- `pt-br.json` — português do Brasil

O locale ativo vem da convar `ox:locale`:

```
setr ox:locale "pt-br"
```

Nota: os textos do NPC "Seu Tião" (em `client/hunting.lua`) e vários `label` de itens em `shared/config.lua` estão escritos direto em português no código, fora do sistema de locale.

---

## Estrutura de arquivos

```
ars_hunting/
├── client/
│   ├── modules/utils.lua   — helpers: drawText3D, notificação, validação de arma
│   ├── hunting.lua         — zonas, spawn e comportamento dos animais, colheita, rastreador, isca, NPC tutorial
│   ├── campfire.lua        — colocar/recolher fogueira e menu de cozinhar
│   ├── shops.lua           — peds das lojas, menu de compra/venda e gate de nível via cw-rep
│   ├── missions.lua        — menu do Mestre da Caça, missões de item e de animal, veículo e transporte
│   └── aimblock.lua        — loop que bloqueia disparo das armas de caça contra jogadores e veículos
├── server/
│   ├── bridge/esx.lua      — implementação do framework para ESX
│   ├── bridge/qb.lua       — implementação do framework para QBCore + itens usáveis
│   └── server.lua          — sorteio de loot, compra/venda, missões, KVP de cooldown, skills do cw-rep
├── shared/
│   └── config.lua          — zonas, animais, lojas, missões, fogueira, aimblock
├── locales/
│   ├── en.json
│   └── pt-br.json
├── !INSTALLATION/
│   ├── ox_items.lua        — bloco de itens para o ox_inventory
│   ├── qb_items.lua        — bloco de itens para o qb-core
│   └── images/             — imagens dos itens para a pasta do inventário
├── _icons/                 — ícones usados pelos menus do recurso
└── fxmanifest.lua
```
