---
title: MRI Qjobcenter
---

Central de empregos com NPC e interface NUI: o jogador escolhe um trabalho da lista, é contratado na hora e pode marcar no GPS o local onde o trabalho começa.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Vagas](#vagas)
5. [Integrações](#integrações)
6. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
7. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qb-core` | Sim | `exports['qb-core']:GetCoreObject()`; contratação (`SetJob`) e notificações |
| `ox_lib` | Sim | Declarado no `fxmanifest.lua`; usado no modo `Config.Main.useTarget = 'lib'` (zonas e Text UI) |
| `qb-target` | Condicional | Necessário quando `useTarget = 'qb'` |
| `ox_target` | Condicional | Necessário quando `useTarget = 'ox'` |
| `pickle_waypoints` | Não | Usado pelo botão de marcar o local do trabalho no mapa |

Escolha **um** dos três modos de interação em `Config.Main.useTarget`. Com `'lib'`, nenhum recurso de target é necessário.

---

## Instalação

1. Copie a pasta `mri_Qjobcenter` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qjobcenter
   ```
3. Ajuste `Config.Main.useTarget` no `config.lua` para o target que o seu servidor usa (`'qb'`, `'ox'` ou `'lib'`).
4. Garanta que todos os `rank` listados em `Config.Jobs` existem como jobs no `qb-core` — o servidor chama `Player.Functions.SetJob(rank, 0)` sem validar contra a lista de jobs do core.

---

## Configuração

O `config.lua` roda **apenas no servidor** (está em `server_scripts`). O cliente recebe uma cópia do `Config` por evento, então mudanças exigem restart do recurso.

### `Config.Main`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `useTarget` | string | Sim | `'qb'` (qb-target), `'ox'` (ox_target) ou `'lib'` (zona + Text UI do ox_lib) |
| `Locations` | tabela | Sim | Um ou mais pontos de atendimento. A chave é livre (padrão: `"jobcenter"`) |

### `Config.Main.Locations[<chave>]`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `coords` | vector4 | Sim | Posição e heading do NPC. O servidor só aceita a seleção se o jogador estiver a menos de 3,5m daqui |
| `model` | string | Sim | Modelo do ped (padrão `s_m_m_armoured_01`) |
| `blip.toggle` | bool | Sim | Liga ou desliga o blip no mapa |
| `blip.sprite` | number | Sim | Sprite do blip |
| `blip.color` | number | Sim | Cor do blip |
| `blip.scale` | number | Sim | Escala do blip |
| `blip.label` | string | Sim | Nome do blip |

### `Config.Jobs[]`

Uma entrada por vaga exibida na interface.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `name` | string | Sim | Nome exibido no card e nas notificações |
| `image` | string | Sim | Caminho da imagem do card, relativo ao `html/` (ex.: `./img/taxi.jpg`) |
| `rank` | string | Sim | Nome do job no qb-core. É o valor passado para `SetJob` |
| `description` | string | Sim | Subtítulo do card |
| `instructions` | string | Sim | Texto longo com a descrição do trabalho |
| `paidActions` | tabela de strings | Sim | Lista de ações remuneradas exibida na interface |
| `location` | vec3 | Não | Local do trabalho. Sem isso, a marcação no GPS não funciona para a vaga |
| `tags` | tabela de strings | Sim | Etiquetas coloridas do card |
| `toggleDuty` | bool | Não | Presente apenas como comentário no `config.lua`; nenhum código do recurso lê esse campo |

### `Config.tagColors`

Lista de classes Tailwind aplicadas às tags dos cards, na ordem em que aparecem. Padrão: `bg-emerald-400`, `bg-cyan-400`, `bg-orange-400`.

### `Config.Licenses`

**Está inteiramente comentado no `config.lua`.** O `sv_main.lua` ainda tem o ramo que vende licenças (`data.type == 'license'`), mas ele depende de `Config.Licenses` existir. Enquanto o bloco estiver comentado, o fluxo de licenças não funciona.

---

## Vagas

As vagas que vêm configuradas por padrão:

| Vaga | `rank` | Local do trabalho |
|---|---|---|
| Reciclagem | `garbage` | `-313.84, -1522.82, 27.56` |
| Taxista | `taxi` | `896.22, -177.72, 74.7` |
| Caçador | `hunter` | `-679.28, 5834.25, 16.33` |
| Mineração | `mining` | `-596.74, 2090.99, 131.41` |
| Pescador | `fishing` | `-1492.99, -939.66, 10.21` |
| Fazendeiro | `farming` | `461.93, -696.86, 26.42` |
| Transportador | `cargo` | `-413.96, 6171.53, 30.48` |
| Caminhoneiro | `truckeroil` | `1721.87, -1557.67, 112.65` |

Existe uma nona vaga (`trucker`, Motorista de Caminhão) comentada no `config.lua`.

O ponto de atendimento padrão fica em `-269.19, -956.09, 31.22` (heading 206.34), com blip **desativado**.

---

## Integrações

### qb-target / ox_target / ox_lib

O modo é escolhido em `Config.Main.useTarget`:

- **`'qb'`** — `exports['qb-target']:AddTargetEntity` no ped, distância 1.5.
- **`'ox'`** — `exports.ox_target:addLocalEntity` no ped, distância 3.0.
- **`'lib'`** — `lib.zones.box` de 3x3x1 na posição do ped, com `lib.showTextUI('[E] City Hall')` e abertura no **E**.

### pickle_waypoints

Quando o jogador clica para marcar o local do trabalho, o servidor dispara `pickle_waypoints:addWaypoint` no cliente com o nome da vaga e o `location` configurado. Sem o `pickle_waypoints`, o jogador ainda recebe a notificação de sucesso, mas nenhum waypoint aparece.

---

## Entrypoints para outros recursos

### Evento `ss-jobcenter:server:openJobCenter` (servidor)

Abre a interface para o jogador que disparou o evento. É o evento usado pelos três modos de target.

```lua
TriggerServerEvent('ss-jobcenter:server:openJobCenter')
```

### Evento `ss-jobcenter:server:setup` (servidor)

Reenvia a configuração ao cliente, que recria os peds e as zonas. Disparado automaticamente no `QBCore:Client:OnPlayerLoaded` e no start do recurso.

```lua
TriggerServerEvent('ss-jobcenter:server:setup')
```

### Evento `ss-jobcenter:server:select` (servidor)

Processa a escolha feita na interface. O servidor exige que o jogador esteja a menos de 3,5m de um `Locations`.

```lua
-- contratar
TriggerServerEvent('ss-jobcenter:server:select', { type = 'job', job = 'taxi' })

-- marcar o local do trabalho no mapa
TriggerServerEvent('ss-jobcenter:server:select', { type = 'loc', job = 'taxi' })
```

Há ainda `type = 'license'`, que depende de `Config.Licenses` (comentado por padrão).

---

## Estrutura de arquivos

```
mri_Qjobcenter/
├── client/
│   └── cl_main.lua       — cria o ped e o target/zona, abre a NUI, encaminha as callbacks de seleção
├── server/
│   └── sv_main.lua       — envia o Config ao cliente, valida a distância, contrata (SetJob) e marca o waypoint
├── config.lua            — Config.Main (localização e modo de target), Config.Jobs (vagas), Config.tagColors
├── html/
│   ├── index.html        — interface da central de empregos
│   ├── script.js         — lógica da interface e callbacks NUI
│   ├── style.css         — estilos
│   └── img/              — imagens dos cards das vagas e das licenças
└── fxmanifest.lua
```
