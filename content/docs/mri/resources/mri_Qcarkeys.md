---
title: "MRI Qcarkeys (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Chaves de veículo conferidas no servidor, para Qbox com `ox_inventory`.

## Como o jogador usa

| Tecla | O que faz |
| --- | --- |
| `L` | Tranca ou destranca o carro em que está ou o mais perto com chave, dentro do alcance do controle |
| `Z` | Liga ou desliga o motor (banco do motorista) |
| `H` | Ligação direta, quando está no banco do motorista sem chave |

As teclas se trocam nas configurações do FiveM (comandos `togglelocks` e `mri:engine`).

- **Chave de item** (`vehiclekey`): fica no inventário, com o modelo e a placa no tooltip. Vale enquanto o jogador carrega.
- **Chave temporária**: fica no servidor por personagem até o restart do resource. É o que carro de trabalho, frota da garagem e pegar a chave do NPC dão.
- **Chave no contato** (opção da aba Geral): ligar o motor com a chave de item tira a chave do bolso e a deixa no carro (statebag `keysIn`). Desligar pelo `Z` devolve a mesma chave a quem desliga. Sem registro de quem pôs a chave (carro tirado da garagem com a chave dentro), só o dono do carro em `player_vehicles` recebe a chave ao desligar; outra pessoa deixa a chave lá.
- **Ligação direta**: sem chave, o motorista aperta `H` e mexe nos fios (barra de progresso, alarme opcional). Dando certo, o motor liga sem chave; quando o motor desliga, precisa fazer de novo. A chance começa na "Chance no começo" e cresce com a XP da habilidade `hotwiring` (mri_Qrpg ou cw-rep) até a "Chance máxima", depois das tentativas escolhidas. Toda tentativa que termina a barra dá 1 de XP, dando certo ou não.
- **Lockpick**: o item `lockpick` ou `advancedlockpick` perto de um carro trancado arromba a porta; no banco do motorista sem chave, arromba a ignição e o motor liga sem chave, como na ligação direta: quando desliga, precisa arrombar de novo. A chance de quebrar é sorteada no servidor a cada uso.
- **Render motorista**: mirar arma de fogo num NPC dirigindo, a até 6 m, faz ele sair com as mãos para cima. Terminando a barra, ele entrega a chave (nenhuma, temporária ou item, pela aba Roubo). Arma mais pesada rende mais fácil; pistola rende metade das vezes; corpo a corpo e arremesso não rendem.
- **Pegar a chave do motorista**: tirar o NPC do banco e sentar no lugar dele procura a chave lá dentro (chave temporária).
- **Molho de chaves** (`keyring`): o botão "Juntar chaves" do item põe todas as chaves soltas num molho. O molho vazio some sozinho.

## Aba Chaves no mri_Qadmin

Abre para quem tem a ACE `command.givetempkeys` (o grupo admin ganha pelo comando). Tudo salva na hora em `data/settings.json` e vale para todos sem restart.

- **Geral**: chave no contato, liga ao acelerar, motor fica ligado ao sair, distância da chave (até onde o carro pode estar para um script entregar a chave), alcance do controle, farol só de fora, puxar jogador do carro, tipos que andam sem chave e empregos que dão chave.
- **Ligação direta**: liga e desliga, tempo, alarme, chance no começo, chance máxima e tentativas até o máximo. Sem o sistema de habilidades, a chance fica sempre na inicial.
- **Lockpick**: porta, ignição, minigame (a fechadura do `inside-lockpicking` só aparece com ele ligado), dificuldade e chance de quebrar de cada lockpick.
- **Roubo**: render com arma, que chave o assalto dá, tempo do assalto, pegar a chave do motorista (também vivo ou só morto) e carros de NPC trancados.

## Comandos

| Comando | Quem | O que faz |
| --- | --- | --- |
| `/givetempkeys [id] [placa]` | admin | Dá chave temporária. Sem id, para quem digitou; sem placa, a do carro em que o alvo está |
| `/removetempkeys [id] [placa]` | admin | Tira a chave temporária |
| `/givekeys` | admin ou empregos da aba Geral | Dá a chave de item do carro em que está |
| `/removekeys` | admin ou empregos da aba Geral | Tira a chave de item do carro em que está |

## Regras do servidor

O cliente nunca se dá chave. Pedido que vem do cliente (export de cliente, `vehiclekeys:client:SetOwner`, eventos antigos) só vale com um carro daquela placa perto do jogador (distância da aba Geral). A chave de item também sai quando o jogador é dono do carro em `player_vehicles` (copiar chave na garagem). Quem já tem chave temporária daquele carro não ganha item por pedido do cliente.

Trancar pelo controle confere o carro no alcance e a chave da placa (ou a chave no contato de quem está dentro). Assalto e pegar a chave têm intervalo de 10 s por jogador no servidor.

## Para outros resources

### Exports de servidor

```lua
exports.mri_Qcarkeys:GiveTempKeys(src, plate)      -- chave temporária
exports.mri_Qcarkeys:RemoveTempKeys(src, plate)
exports.mri_Qcarkeys:GiveKeyItem(src, plate)       -- item vehiclekey, entregue direto
exports.mri_Qcarkeys:RemoveKeyItem(src, plate)     -- tira do bolso ou do molho
exports.mri_Qcarkeys:HaveTemporaryKey(src, plate)  --> boolean
exports.mri_Qcarkeys:HavePermanentKey(src, plate)  --> boolean, inclui o molho
```

### Exports de cliente

```lua
exports.mri_Qcarkeys:GiveTempKeys(plate)     -- pede ao servidor, vale com o carro perto
exports.mri_Qcarkeys:RemoveTempKeys(plate)
exports.mri_Qcarkeys:GiveKeyItem(plate)      -- pede ao servidor: carro perto ou dono
exports.mri_Qcarkeys:RemoveKeyItem(plate)
exports.mri_Qcarkeys:HaveTemporaryKey(plate) --> boolean
exports.mri_Qcarkeys:HavePermanentKey(plate) --> boolean
exports.mri_Qcarkeys:StackKeys(slot)         -- botão do item: junta as chaves soltas no molho
```

### qbx_vehiclekeys

O resource faz `provide 'qbx_vehiclekeys'` e responde `GiveKeys`, `RemoveKeys`, `HasKeys` e `SetLockState` no servidor e `HasKeys` no cliente (vale também para carro com ligação direta ou chave no contato).

### Eventos aceitos

```lua
TriggerEvent('vehiclekeys:client:SetOwner', plate)                     -- cliente: chave temporária
TriggerEvent('qb-vehiclekeys:client:AddKeys', plate)                   -- cliente: chave temporária
TriggerServerEvent('qb-vehiclekeys:server:AcquireVehicleKeys', plate)  -- item vehiclekey
TriggerServerEvent('mm_carkeys:server:acquirevehiclekeys', plate)      -- item vehiclekey (1.x)
TriggerServerEvent('mm_carkeys:server:acquiretempvehiclekeys', plate)  -- chave temporária (1.x)
TriggerServerEvent('mm_carkeys:server:removevehiclekeys', plate)       -- tira o item (1.x)
TriggerEvent('lockpicks:UseLockpick', isAdvanced)                      -- cliente: usar lockpick
```

O statebag `keysIn` do veículo marca a chave no contato; outro resource pode escrever nele (a garagem guarda o carro com a chave dentro).

## Arquivos

```
config.lua            ACE do admin, nomes dos itens e da habilidade
shared/settings.lua   padrões da aba Ajustes
server/keys.lua       chaves temporárias, itens, checagens e exports
server/ignition.lua   chave no contato
server/locks.lua      trancar pelo controle
server/crime.lua      lockpick, assalto e pegar a chave
server/keyring.lua    molho de chaves
server/compat.lua     qbx_vehiclekeys, qb-vehiclekeys e 1.x
client/engine.lua     motor, Z e o laço do banco do motorista
client/hotwire.lua    ligação direta
web/                  aba do mri_Qadmin (build em html/)
```
