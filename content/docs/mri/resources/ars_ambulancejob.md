---
title: ARS Ambulancejob
---

Emprego de paramédico com sistema de morte, ferimentos por parte do corpo, macas, chamados de emergência e log de mortes no Discord.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Itens](#itens)
4. [Configuração](#configuração)
5. [Hospitais](#hospitais)
6. [Sistema de ferimentos](#sistema-de-ferimentos)
7. [Paramédico NPC](#paramédico-npc)
8. [Editor de hospitais](#editor-de-hospitais)
9. [Deathlog no Discord](#deathlog-no-discord)
10. [Comandos](#comandos)
11. [Integrações](#integrações)
12. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
13. [Localização](#localização)
14. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Zonas, callbacks, comandos, progress bar, locale, `lib.load` do config |
| `oxmysql` | Sim | Carregado no `server_scripts` |
| `qb-core` **ou** `es_extended` | Sim | O framework é detectado em runtime. Sem um dos dois, a camada `Framework` não é criada |
| `ox_inventory` | Não | Detectado automaticamente (`Config.useOxInventory`). Habilita durabilidade dos itens, stash da bolsa médica e as lojas das farmácias |
| `ox_target` ou `qb-target` | Não | Interações com pacientes, macas, bolsa médica e o uso da adrenalina |
| `illenium-appearance` | Não | Vestiário do hospital. Ver `Config.clothingScript` |
| `mri_Qcarkeys` | Não | Entrega e remoção das chaves da ambulância. Ver `Config.giveVehicleKeys` |
| `qbx_management` | Não | Menu do patrão (bossmenu) |
| `pma-voice` | Não | Corta o mumble do jogador morto quando `Config.mumbleDisable = true` |
| `monitor` (txAdmin) | Não | Reage ao evento `txAdmin:events:healedPlayer` |

O fluxo da adrenalina no `client.lua` chama `ox_target` e `ox_inventory` diretamente, sem checar o estado do recurso — se o seu servidor não usa esses dois, remova aquele bloco.

---

## Instalação

1. Copie a pasta `ars_ambulancejob` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure ars_ambulancejob
   ```
3. Cadastre os itens de `!INSTALLATION/items.lua` no seu inventário e copie as imagens de `!INSTALLATION/images/` para a pasta de ícones do inventário.
4. Cadastre o job de paramédico no framework com um dos nomes de `Config.emsJobs` (padrão: `ambulance` e `ems`).
5. Configure o webhook do deathlog em `Config.Discord.Settings.Webhook` (ver [Deathlog no Discord](#deathlog-no-discord)).
6. **Conflitos** — o recurso substitui o sistema de morte e revive do framework. Ele escuta `hospital:client:Revive` e `qbx_medical:client:playerRevived` para se manter em sincronia, mas não deve rodar junto com outro ambulance job (`qb-ambulancejob`, ou o `qbx_medical` atuando como sistema de morte).

Não há SQL a importar.

---

## Itens

Os itens já vêm prontos em `!INSTALLATION/items.lua`.

| Item | Uso |
|---|---|
| `bandage` | Cura básica. Recupera 1/16 da vida máxima |
| `analgesic` | Recupera 1/20 da vida máxima |
| `medicalbag` | Coloca a bolsa médica no chão. Com `ox_inventory`, vira um stash de 10 slots e 50 kg |
| `defibrillator` | Reanimação feita pelo paramédico |
| `adrenaline` | Reanima um jogador caído pelo `ox_target`, sem exigir o job |
| `tweezers` | Trata ferimento de corte ou perfuração |
| `suturekit` | Trata ferimento de tiro |
| `burncream` | Trata queimadura |
| `icepack` | Trata contusão |
| `stretcher` | Maca |
| `emstablet` | Tablet do EMS: abre a lista de chamados de emergência |

Com `ox_inventory`, cada uso de um item de tratamento consome `Config.consumeItemPerUse` por cento da durabilidade, em vez de gastar o item inteiro.

---

## Configuração

Todas as opções ficam em `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.debug` | bool | Sim | Desenha as zonas dos hospitais e imprime logs de diagnóstico |
| `Config.useOxInventory` | bool | Sim | Preenchido automaticamente pelo estado do recurso `ox_inventory`. Não edite |
| `Config.clothingScript` | string \| false | Sim | `illenium-appearance`, `fivem-appearance`, `core`, ou `false` para desativar o vestiário |
| `Config.emsJobs` | string[] | Sim | Jobs que contam como paramédico. Padrão: `{"ambulance", "ems"}` |
| `Config.respawnTime` | number | Sim | Minutos até o jogador poder dar respawn sozinho. Padrão: `5` |
| `Config.waitTimeForNewCall` | number | Sim | Minutos de cooldown entre dois chamados do mesmo jogador. Padrão: `5` |
| `Config.reviveCommand` | string | Sim | Nome do comando de reviver. Padrão: `revive` |
| `Config.reviveAreaCommand` | string | Sim | Nome do comando de reviver em área. Padrão: `revivearea` |
| `Config.healCommand` | string | Sim | Nome do comando de curar. Padrão: `heal` |
| `Config.healAreaCommand` | string | Sim | Nome do comando de curar em área. Padrão: `healarea` |
| `Config.reviveAllCommand` | string | Sim | Nome do comando de reviver todos. Padrão: `reviveall` |
| `Config.adminGroup` | string[] | Sim | Grupos com acesso aos comandos administrativos e ao editor. Padrão: `{"admin", "mod", "support"}` |
| `Config.mumbleDisable` | bool | Sim | Desativa o mumble do jogador enquanto ele estiver morto |
| `Config.healthRegen` | bool | Sim | Quando `true`, zera a regeneração automática de vida do GTA |
| `Config.medicBagProp` | string | Sim | Prop da bolsa médica. Padrão: `xm_prop_x17_bag_med_01a` |
| `Config.medicBagItem` | string | Sim | Item da bolsa médica. Padrão: `medicalbag` |
| `Config.tabletItem` | string | Sim | Item do tablet do EMS. Padrão: `emstablet` |
| `Config.helpCommand` | string | Sim | Comando do chamado de emergência. Padrão: `911` |
| `Config.disableEMSCalls` | bool | Sim | Desativa os chamados de emergência |
| `Config.removeItemsOnRespawn` | bool | Sim | Limpa o inventário do jogador ao dar respawn |
| `Config.disableRespawnAnimation` | bool | Sim | Desativa a animação de levantar no respawn |
| `Config.keepItemsOnRespawn` | string[] | Sim | Itens preservados quando `removeItemsOnRespawn` está ligado. Ex.: `{ "money", "WEAPON_PISTOL" }` |
| `Config.baseInjuryReward` | number | Sim | Pagamento ao paramédico por ferimento tratado. Padrão: `150` |
| `Config.reviveReward` | number | Sim | Pagamento ao paramédico por reanimação. Padrão: `700` |
| `Config.paramedicTreatmentPrice` | number | Sim | Preço cobrado do jogador pelo tratamento com o NPC. Padrão: `4000` |
| `Config.allowAlways` | bool | Sim | `true` permite o tratamento pelo NPC mesmo com médicos online |
| `Config.ambulanceStretchers` | number | Sim | Macas disponíveis por ambulância. Padrão: `2` |
| `Config.consumeItemPerUse` | number | Sim | Porcentagem de durabilidade consumida por uso (só com `ox_inventory`). Padrão: `10` |
| `Config.npcReviveCommand` | string | Sim | Comando de socorro pelo NPC. Padrão: `socorro` |
| `Config.timeToWaitForCommand` | number | Sim | Minutos que o jogador espera, após morrer, para usar o comando de socorro. Padrão: `2` |
| `Config.minimumOnServiceForNPC` | number | Sim | Acima desse número de médicos online, o comando de socorro é bloqueado. Padrão: `3` |
| `Config.usePedToDepositVehicle` | bool | Sim | `false` faz o veículo sumir na hora, sem ped de devolução |
| `Config.extraEffects` | bool | Sim | Tremor de tela e efeito preto e branco ao morrer |
| `Config.ejectDeadFromVehicle` | bool | Sim | Ejeta o jogador morto do veículo em que estiver |
| `Config.emsVehicles` | tabela | Sim | Modelos com acesso aos props do EMS (cones etc.). Padrão: `ambulance`, `ambulance2` |
| `Config.animations` | tabela | Sim | `dict` e `clip` de `death_car`, `death_normal` e `get_up` |
| `Config.Discord.Settings` | tabela | Não | `Webhook`, `Name` e `Images` do deathlog |

### Funções de ponte

O `config.lua` termina com três funções que você adapta aos recursos do seu servidor.

| Função | Descrição |
|---|---|
| `Config.sendDistressCall(msg)` | Encaminha o chamado de emergência para um telefone (Quasar, GKS…). Vem vazia, com exemplos comentados |
| `Config.giveVehicleKeys(vehicle, plate)` | Entrega a chave da ambulância. Já ligada a `exports.mri_Qcarkeys:GiveKeyItem` |
| `Config.removeVehicleKeys(vehicle, plate)` | Remove a chave. Já ligada a `exports.mri_Qcarkeys:RemoveKeyItem` |

---

## Hospitais

Os hospitais ficam em `data/hospitals.lua`. Cada chave da tabela é um hospital — `pillbox` é o único que vem configurado.

| Bloco | Descrição |
|---|---|
| `paramedic` | `model` do ped e a lista `pos` de `vec4` onde ele aparece |
| `bossmenu` | `pos` e `min_grade` do menu do patrão |
| `zone` | `pos` e `size` da caixa que carrega os peds, a garagem e o vestiário |
| `blip` | `enable`, `name`, `type`, `scale`, `color` e `pos` do blip |
| `respawn` | Lista de leitos. Cada um tem `bedPoint`, `spawnPoint` e, opcionalmente, `isDeadRespawn` (leito usado quando o jogador morre) |
| `pharmacy` | Lojas. Cada uma tem `job` (restrita ao EMS), `grade`, `label`, `pos`, `blip` e a lista `items` (`name`, `label`, `icon`, `price`) |
| `garage` | Garagem do EMS: `pedPos`, `model`, `spawn`, `deposit`, `driverSpawnCoords` e a lista `vehicles` (`label`, `spawn_code`, `min_grade`, `modifications`). Vem comentada no `pillbox` |
| `clothes` | Vestiário: `enable`, `pos`, `model` do ped e os conjuntos de roupa por gênero e grade |

Com `ox_inventory`, as farmácias viram lojas de verdade (`RegisterShop`) no start do recurso, usando a chave da farmácia (ex.: `ems_shop_1`) como id da loja.

---

## Sistema de ferimentos

Quando o jogador leva dano, o osso atingido e a causa viram um ferimento. Os ossos ficam em `data/body_parts.lua` (indexados pelo id do osso do GTA) e as armas em `data/weapons.lua`, que mapeia cada `WEAPON_*` para uma mensagem de morte e uma causa (`shot`, `stabbed`, `beaten`…).

O item necessário para tratar depende da causa:

| Causa | Item |
|---|---|
| Tiro | `suturekit` |
| Corte ou perfuração | `tweezers` |
| Queimadura | `burncream` |
| Contusão | `icepack` |
| Demais casos | `bandage` |

Cada osso pode ter vários `levels` de gravidade: o texto exibido muda conforme o dano acumulado (`default`, `10`, `20`, `30`, `40`).

O paramédico recebe `Config.baseInjuryReward` por ferimento tratado e `Config.reviveReward` por reanimação.

---

## Paramédico NPC

Serve para o jogador não ficar preso quando não há paramédicos suficientes online.

- O ped fica nas coordenadas de `paramedic.pos` do hospital e trata quem chegar, cobrando `Config.paramedicTreatmentPrice`.
- Por padrão o tratamento só é oferecido quando não há médicos online. `Config.allowAlways = true` libera sempre.
- O comando `/socorro` (`Config.npcReviveCommand`) socorre o jogador caído. Ele só funciona quando os médicos online forem no máximo `Config.minimumOnServiceForNPC`, e o jogador precisa ter morrido há pelo menos `Config.timeToWaitForCommand` minutos.

---

## Editor de hospitais

O comando `/hospitaleditor` (restrito a `Config.adminGroup`) abre um editor em jogo para ajustar as coordenadas e os blocos do hospital, e **grava o resultado direto no `data/hospitals.lua`**.

O arquivo é reescrito no disco, então as mudanças sobrevivem a restarts — mas a formatação e os comentários do arquivo original são perdidos na regravação.

---

## Deathlog no Discord

Toda morte vira um embed enviado ao webhook, com o nome da vítima, os ids de Discord da vítima e do assassino (quando houver), a arma usada e o local.

```lua
Config.Discord = {
    Settings = {
        Webhook = 'https://discord.com/api/webhooks/...',   -- cole aqui o webhook do seu servidor
        Name = 'MRI QBOX - Deathlog',
        Images = 'https://i.imgur.com/QjLjjYZ.png'
    },
}
```

O `config.lua` versionado já traz um webhook preenchido. Troque pelo do seu servidor — quem tiver essa URL consegue postar no canal.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/revive [id]` | `Config.adminGroup` | Revive o jogador informado. Sem argumento, revive quem executou |
| `/revivearea [raio]` | `Config.adminGroup` | Revive todos os jogadores dentro do raio. Não funciona pelo console |
| `/heal [id]` | `Config.adminGroup` | Cura o jogador informado. Sem argumento, cura quem executou |
| `/healarea [raio]` | `Config.adminGroup` | Cura todos os jogadores dentro do raio. Não funciona pelo console |
| `/reviveall` | `Config.adminGroup` | Revive todos os jogadores do servidor |
| `/hospitaleditor` | `Config.adminGroup` | Abre o editor de hospitais |
| `/911 [mensagem]` | Todos | Abre um chamado de emergência para os paramédicos |
| `/socorro` | Todos | Pede resgate ao paramédico NPC. Só funciona com poucos médicos online |

Os nomes dos seis primeiros comandos vêm do `config.lua` e podem ser trocados. Os comandos restritos usam `lib.addCommand` com `restricted`, ou seja, a permissão é resolvida pelo ACE do `ox_lib` (`add_ace group.admin ...`).

---

## Integrações

### ox_inventory

Detectado automaticamente. Quando está presente: os itens de tratamento passam a gastar durabilidade em vez de serem consumidos por inteiro; a bolsa médica vira um stash (`medicalBag_<license>`), com um hook que impede guardar a própria bolsa dentro dela; e as farmácias de `data/hospitals.lua` são registradas como lojas do `ox_inventory`.

### ox_target / qb-target

O primeiro que estiver iniciado é usado. Cobre as interações com pacientes, macas, bolsa médica e o NPC. A opção "Usar Adrenalina" é registrada como `addGlobalPlayer` do `ox_target` e aparece em qualquer jogador caído, desde que você tenha o item `adrenaline` — ela não exige o job de paramédico.

### illenium-appearance

Define de onde vem o vestiário do hospital, via `Config.clothingScript`. O campo aceita também `fivem-appearance` e `core` (vestiário nativo do framework), ou `false` para desativar.

### mri_Qcarkeys

`Config.giveVehicleKeys` e `Config.removeVehicleKeys` já vêm ligadas ao `mri_Qcarkeys`. Ao tirar a ambulância da garagem a chave é entregue; ao devolvê-la, é removida.

### qbx_management

Usado no menu do patrão, acessível na coordenada `bossmenu.pos` do hospital por quem tem grade maior ou igual a `min_grade`.

### txAdmin

O recurso escuta `txAdmin:events:healedPlayer`. Curar um jogador (ou todos) pelo painel do txAdmin revive quem estiver morto e cura quem estiver vivo.

### pma-voice

Com `Config.mumbleDisable = true`, o jogador morto perde a voz até ser reanimado.

---

## Entrypoints para outros recursos

### Exports de cliente

```lua
-- O jogador local está morto?
local dead = exports.ars_ambulancejob:isDead()

-- Abre o chamado de emergência (mesmo fluxo do /911)
exports.ars_ambulancejob:createDistressCall()

-- Abre a lista de chamados (é o que o emstablet usa)
exports.ars_ambulancejob:openDistressCalls()

-- Registra manualmente uma morte no deathlog
exports.ars_ambulancejob:DeathLog()
```

Os exports `bandage` e `analgesic` existem para serem apontados como `client.export` na definição dos itens do `ox_inventory`; não são feitos para chamada direta por outros recursos.

### Callbacks de servidor

```lua
-- Estado de morte de um jogador
local status = lib.callback.await('ars_ambulancejob:getDeathStatus', false, targetServerId)

-- Ferimentos, estado e o que causou a morte
local data = lib.callback.await('ars_ambulancejob:getData', false, targetServerId)

-- Chamados de emergência abertos
local calls = lib.callback.await('ars_ambulancejob:getDistressCalls', false)

-- Quantidade de paramédicos online
local medics = lib.callback.await('ars_ambulancejob:getMedicsOnline', false)
```

### Eventos

```lua
-- Revive ou cura um jogador. É o que os comandos e o txAdmin disparam.
TriggerClientEvent('ars_ambulancejob:healPlayer', targetServerId, { revive = true })
TriggerClientEvent('ars_ambulancejob:healPlayer', targetServerId, { heal = true })

-- Abre a lista de chamados no cliente
TriggerClientEvent('ars_ambulancejob:openDistressCalls', source)

-- Notificação no padrão do recurso
TriggerClientEvent('ars_ambulancejob:showNotification', source, 'mensagem')

-- Coloca a bolsa médica no chão
TriggerClientEvent('ars_ambulancejob:placeMedicalBag', source)
```

O estado do jogador também fica exposto nos statebags: `Player(serverId).state.dead` e `Player(serverId).state.injuries`.

---

## Localização

As strings vêm do locale do `ox_lib` (`ox_libs { 'locale' }`). Os arquivos ficam em `locales/`:

- `de.json` — alemão
- `en.json` — inglês
- `fr.json` — francês
- `gr.json` — grego
- `it.json` — italiano
- `pt-br.json` — português do Brasil
- `sv.json` — sueco

O locale ativo é definido pela convar no `server.cfg`:

```
setr ox:locale "pt-br"
```

Parte dos textos do fluxo da adrenalina (`client.lua`) e do editor de hospitais está escrita em português direto no código, fora do sistema de locale.

---

## Estrutura de arquivos

```
ars_ambulancejob/
├── client.lua                        — zonas dos hospitais, itens bandage/analgesic, adrenalina via ox_target
├── server.lua                        — estado de morte, chamados, itens, stash da bolsa, lojas das farmácias
├── config.lua                        — todas as opções e as funções de ponte (chaves, telefone)
├── data/
│   ├── hospitals.lua                 — hospitais: zona, blip, leitos, farmácias, garagem, vestiário, NPC
│   ├── body_parts.lua                — ossos do GTA, rótulo e gravidade de cada ferimento
│   └── weapons.lua                   — mapa de arma para mensagem de morte e causa do ferimento
├── modules/
│   ├── commands/server.lua           — /revive, /revivearea, /heal, /healarea, /reviveall
│   ├── compatibility/
│   │   ├── frameworks/qb/            — camada Framework para qb-core
│   │   ├── frameworks/esx/           — camada Framework para es_extended
│   │   ├── target/ox_target.lua      — camada Target para ox_target
│   │   ├── target/qb-target.lua      — camada Target para qb-target
│   │   └── txadmin/server.lua        — reage ao txAdmin:events:healedPlayer
│   ├── death/client.lua              — morte, respawn, efeitos de tela, export isDead
│   ├── injuries/client.lua           — ferimentos por osso e tratamento com item
│   ├── stretcher/client.lua          — macas e transporte do paciente na ambulância
│   ├── paramedic/client.lua          — NPC de tratamento e comando /socorro
│   ├── survival/client.lua           — desliga a regeneração automática de vida
│   ├── deathlog/                     — captura da morte (client) e envio do embed pro Discord (server)
│   ├── hospital_editor/              — editor em jogo, grava data/hospitals.lua no disco
│   ├── job/client/
│   │   ├── main.lua                  — chamados de emergência, tratamento e recompensas
│   │   ├── garage.lua                — garagem do EMS e chaves da ambulância
│   │   ├── medical_bag.lua           — bolsa médica no chão e stash
│   │   ├── shops.lua                 — farmácias
│   │   ├── clothing.lua              — vestiário
│   │   └── bossmenu.lua              — menu do patrão
│   └── utils/client/                 — notificações, blips, helpers de item e debug de coordenadas
├── locales/                          — de, en, fr, gr, it, pt-br, sv
├── stream/prop_ld_binbag_01.ydr      — prop customizado
├── !INSTALLATION/
│   ├── items.lua                     — itens prontos para colar no inventário
│   └── images/                       — ícones dos itens
└── fxmanifest.lua
```
