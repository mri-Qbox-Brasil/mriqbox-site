---
title: MRI Qfleecaheist
---

Assalto aos 6 bancos Fleeca do mapa, com cutscene de abertura do cofre, minigame de furadeira a laser, carrinhos de loot e venda para um comprador.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Fluxo do assalto](#fluxo-do-assalto)
4. [Configuração](#configuração)
5. [Bancos](#bancos)
6. [Comandos](#comandos)
7. [Log no Discord](#log-no-discord)
8. [Integrações](#integrações)
9. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
10. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qb-core` | Sim | `exports['qb-core']:GetCoreObject()` no cliente e no servidor; callbacks, itens, dinheiro e notificações |
| `ox_inventory` | Sim | A furadeira usa `exports.ox_inventory:Search('count', item)` para checar drill e bag |
| `ps-dispatch` | Sim | O alerta policial chama `exports['ps-dispatch']:FleecaBankRobbery(1)` ao iniciar o assalto |
| `qb-log` | Não | Se presente, registra o reset do cenário no canal `heistreset` |

O `fxmanifest.lua` não declara `dependencies` — as dependências acima vêm dos exports chamados no código.

---

## Instalação

1. Copie a pasta `mri_Qfleecaheist` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qfleecaheist
   ```
3. Cadastre os itens usados pelo recurso no inventário:

   | Item | Uso |
   |---|---|
   | `drill` | Exigido para usar a furadeira nos pontos de drill |
   | `bag` | Exigido para pegar o loot (grab central, carrinhos e furadeira) |
   | `diamond` | Recompensa (carrinho de diamante e caixa-forte) |
   | `goldbar` | Recompensa (carrinho de ouro, grab central e caixa-forte) |
   | `cryptostick` | Recompensa aleatória na venda ao comprador |

   Os nomes de `drill`, `bag`, `diamond` e `goldbar` podem ser trocados em `config.lua`. O `cryptostick` está fixo no `server.lua`.
4. Troque o webhook do Discord em `server.lua` — veja [Log no Discord](#log-no-discord).

---

## Fluxo do assalto

1. **Início** — o jogador chega a até 10 metros do `scenePos` do banco e **atira** (`IsPedShooting`). O servidor checa a contagem de policiais em serviço e o cooldown do banco.
2. **Cutscene** — o NPC refém (`scenePed`) executa a cena sincronizada `mp_missheist_ruralbank`, o alerta é enviado à polícia via `ps-dispatch`, e as portas do cofre (`v_ilev_gb_teldr` e `hei_prop_heist_sec_door` / `v_ilev_gb_vauldr`) giram até o `doorHeading` configurado.
3. **Loot** — dentro do cofre, o jogador se aproxima dos pontos e pressiona **E**:
   - **Grab central** — pilha de ouro ou de dinheiro (sorteada por `grabReward`). Rende `multiGrabCount` de `goldTrolly` (15 barras) ou de `cashTrolly` (100.000 em dinheiro).
   - **Carrinhos** — cada carrinho é sorteado por `trollyReward` entre ouro, dinheiro e diamante. A animação dura cerca de 37 segundos e entrega o item correspondente.
   - **Furadeira** — abre o minigame de scaleform (`drilling.lua`). Se concluído, entrega a recompensa `lockbox` (20 unidades de ouro ou diamante, sorteado). Se falhar, o ponto volta a ficar disponível.
4. **Saída** — ao se afastar mais de 30 metros do banco depois de ter pego algum loot, um blip do comprador aparece no mapa.
5. **Venda** — chegando a até 15 metros do `buyerPos`, roda a cutscene `hs3f_all_drp3` e o servidor vende **todo** o `diamond` e o `goldbar` do inventário pelos `sellPrice` configurados.

---

## Configuração

Tudo fica em `config.lua`.

### `Config['FleecaMain']`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `requiredPoliceCount` | number | Sim | Mínimo de policiais **em serviço** para o assalto poder começar. `0` desativa a exigência |
| `requiredItems` | tabela | Sim | `[1]` = item da furadeira (`drill`), `[2]` = item da mochila (`bag`). A ordem importa: o código indexa por posição |
| `rewardItems.diamondTrolly.item` | string | Sim | Item entregue pelo carrinho de diamante |
| `rewardItems.diamondTrolly.count` | number | Sim | Quantidade entregue pelo carrinho |
| `rewardItems.diamondTrolly.sellPrice` | number | Sim | Preço unitário pago pelo comprador |
| `rewardItems.goldTrolly.item` | string | Sim | Item entregue pelo carrinho de ouro |
| `rewardItems.goldTrolly.count` | number | Sim | Quantidade entregue pelo carrinho |
| `rewardItems.goldTrolly.multiGrabCount` | number | Sim | Quantidade entregue pelo **grab central** quando ele sorteia ouro |
| `rewardItems.goldTrolly.sellPrice` | number | Sim | Preço unitário pago pelo comprador |
| `rewardItems.cashTrolly.item` | `nil` | Sim | Mantenha `nil` — é o que sinaliza ao servidor para dar dinheiro em vez de item |
| `rewardItems.cashTrolly.count` | number | Sim | Dinheiro entregue pelo carrinho de dinheiro |
| `rewardItems.cashTrolly.multiGrabCount` | number | Sim | Dinheiro entregue pelo **grab central** quando ele sorteia dinheiro |
| `rewardItems.lockbox` | function | Sim | Retorna a recompensa da furadeira. Padrão: 20 unidades de ouro ou diamante, sorteado |
| `grabReward` | function | Sim | Sorteia o modelo do grab central entre `goldbar` e `cash` |
| `trollyReward` | function | Sim | Sorteia o conteúdo de cada carrinho entre `goldbar`, `cash` e `diamond` |
| `finishHeist.buyerPos` | vector3 | Sim | Local do comprador onde o loot é vendido |

### `Config['FleecaHeist'][n]`

Uma entrada por banco. Todos os campos são obrigatórios.

| Campo | Tipo | Descrição |
|---|---|---|
| `scenePed.model` | string | Modelo do NPC da cena (padrão `csb_tomcasino`) |
| `scenePed.coords` | vector3 | Posição do NPC |
| `scenePed.heading` | number | Rotação do NPC |
| `scenePos` | vector3 | Ponto de referência do banco. Define onde o assalto pode ser iniciado (raio de 10m) e onde as portas são procuradas |
| `sceneRot` | vector3 | Rotação da cena sincronizada de abertura |
| `scenePedWalkCoords` | vector3 | Para onde o NPC caminha depois da cena |
| `doorHeading` | tabela `{n, n}` | Rotação final da porta externa `[1]` e da porta do cofre `[2]` |
| `grab.pos` | vector3 | Posição da pilha central de loot |
| `grab.heading` | number | Rotação da pilha central |
| `grab.loot` | bool | Estado de runtime — deixe `false` |
| `drills[]` | tabela | Pontos de furadeira: `coords`, `rotation` e `loot` |
| `trollys[]` | tabela | Pontos de carrinho: `coords`, `heading` e `loot` |
| `nextRob` | number | Cooldown do banco em **segundos** (padrão 3600 = 1 hora) |

### `Strings`

Tabela de textos exibidos ao jogador (`wait_nextheist`, `minute`, `need_item`, `police_alert`, `drill`, `grab_trolly`, `grab`, `deliver_to_buyer`, `buyer_blip`, `need_police`, `total_money`). Não há sistema de locales — edite direto no `config.lua`.

As tabelas `GrabCash`, `LaserDrill` e `Trolly` no fim do arquivo definem os dicionários de animação das cenas sincronizadas. Não devem ser alteradas.

---

## Bancos

| # | Local | Ponto de início (`scenePos`) | Cooldown |
|---|---|---|---|
| 1 | Great Ocean Highway | `-2958.70, 478.27, 14.70` | 3600s |
| 2 | Rockford Hills | `-1214.84, -336.37, 36.78` | 3600s |
| 3 | Alta Street | `-356.53, -52.27, 48.05` | 3600s |
| 4 | Legion Square | `308.60, -281.35, 53.16` | 3600s |
| 5 | Grapeseed | `1179.56, 2710.88, 37.09` | 3600s |
| 6 | Burton | `144.26, -1042.97, 28.37` | 3600s |

O cooldown é guardado em memória (`lastRob`) e **reseta quando o recurso reinicia**.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/pdfleeca` | Policial em serviço, ou permissão `god` do qb-core | Limpa o cenário do banco mais próximo (a até 20m): fecha as portas, remove o NPC e os props, e libera os pontos de loot |

---

## Log no Discord

O `server.lua` envia um embed via webhook em dois momentos: quando um assalto começa e quando um jogador vende o loot ao comprador.

```lua
discord = {
    ['webhook'] = 'https://discord.com/api/webhooks/...',
    ['name'] = 'rm_fleecaheist',
    ['image'] = 'https://cdn.discordapp.com/avatars/...'
}
```

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `webhook` | string | Sim | URL do webhook de destino |
| `name` | string | Sim | Nome de usuário exibido na mensagem |
| `image` | string | Sim | Avatar exibido na mensagem |

O valor que vem no repositório é o webhook do autor original. **Troque pelo seu antes de subir o recurso**, ou os logs do seu servidor vão para um Discord de terceiros.

---

## Integrações

### ps-dispatch

O alerta policial é enviado exclusivamente por `exports['ps-dispatch']:FleecaBankRobbery(1)`, chamado no início de cada assalto. O código de alerta interno (`fleecaheist:client:policeAlert`, que desenha um blip de raio) continua registrado, mas nada no recurso o dispara.

### qb-log

Ao usar `/pdfleeca` ou o evento `radialmenu:resetFleeca`, o recurso dispara `qb-log:server:CreateLog` no canal `heistreset`. Se o `qb-log` não estiver instalado, o evento simplesmente não é tratado.

### Radial menu

O evento de servidor `radialmenu:resetFleeca` faz o mesmo que `/pdfleeca`, mas **sem** o fallback de permissão `god` — só funciona para policial em serviço. Registre-o no seu menu radial para dar aos policiais a opção de limpar a cena.

---

## Entrypoints para outros recursos

### Evento `radialmenu:resetFleeca` (servidor)

Limpa o cenário do banco mais próximo do jogador. Exige job `police` em serviço.

```lua
TriggerServerEvent('radialmenu:resetFleeca')
```

### Evento `fleecaheist:client:nearBank` (cliente)

Dispara o reset a partir do cliente: procura um banco a até 20 metros e pede ao servidor para resetá-lo.

```lua
TriggerClientEvent('fleecaheist:client:nearBank', source)
```

### Callbacks de servidor

Registrados via `QBCore.Functions.CreateCallback`:

```lua
-- retorna true se há policiais em serviço suficientes
QBCore.Functions.TriggerCallback('fleecaheist:server:checkPoliceCount', function(ok) end)

-- retorna true se o banco `index` não está em cooldown (e marca o início do assalto)
QBCore.Functions.TriggerCallback('fleecaheist:server:checkTime', function(ok) end, index)

-- retorna se o jogador tem ao menos 1 unidade do item, e o label do item
QBCore.Functions.TriggerCallback('fleecaheist:server:hasItem', function(has, label) end, 'bag')
```

---

## Estrutura de arquivos

```
mri_Qfleecaheist/
├── client.lua        — início do assalto, cenas sincronizadas, portas do cofre, grab/carrinhos/furadeira, venda ao comprador
├── server.lua        — callbacks de polícia/cooldown/item, entrega e venda de recompensas, sync de estado, /pdfleeca, webhook do Discord
├── drilling.lua      — minigame de furadeira (scaleform, base do meta-hub)
├── config.lua        — Config.FleecaMain, Config.FleecaHeist (6 bancos), Strings e dicionários de animação
└── fxmanifest.lua
```
