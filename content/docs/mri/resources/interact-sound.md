---
title: Interact Sound
---

Biblioteca de sons: outros recursos disparam eventos para tocar arquivos `.ogg` no ambiente NUI do jogador — para um jogador, para todos, ou para quem estiver por perto.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Sons disponíveis](#sons-disponíveis)
4. [Adicionar novos sons](#adicionar-novos-sons)
5. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
6. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| Framework que exponha `LocalPlayer.state.isLoggedIn` | Sim | O cliente só toca som se o statebag `isLoggedIn` estiver `true`. QBCore e QBox definem esse statebag no login |
| Internet no cliente | Sim | A página NUI carrega a biblioteca Howler.js de um CDN (`cdnjs.cloudflare.com`) |

Não usa `ox_lib`, banco de dados nem `ox_inventory`.

---

## Instalação

1. Copie a pasta `interact-sound` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure interact-sound
   ```
3. Não há SQL, itens, comandos, permissões nem arquivo de configuração.

O recurso não faz nada sozinho — ele só reage aos eventos que outros recursos disparam.

---

## Sons disponíveis

Os arquivos ficam em `client/html/sounds/` e são referenciados **sem a extensão** `.ogg`. Os 100 sons que acompanham o recurso:

| Categoria | Sons |
|---|---|
| Portas e fechaduras | `DoorOpen`, `DoorClose`, `doorbell`, `doorknock`, `knock_door`, `keydoors`, `jaildoor`, `houses_door_open`, `houses_door_close`, `houses_door_lock`, `houses_door_unlock`, `lock`, `unlock`, `lockpick`, `LockerOpen` |
| Algemas e polícia | `Cuff`, `Uncuff`, `handcuff`, `ziptie`, `jail`, `panic`, `panicbutton`, `Alert`, `security-alarm`, `speedcamera`, `metaldetector`, `metaldetected` |
| Veículos | `carbuckle`, `carunbuckle`, `seatbelt`, `seatbeltoff`, `beltalarm`, `towtruck`, `towtruck2`, `refuel`, `fuelstop`, `pickupnozzle`, `putbacknozzle`, `charging`, `chargestop`, `putbackcharger`, `airwrench`, `impactdrill` |
| Rádio | `radioclick`, `radiostatic1`, `radiostatic2`, `radiostatic3`, `pager` |
| Telefone | `cellcall`, `ringing`, `payphonestart`, `payphoneringing`, `payphoneend` |
| Lojas e máquinas | `Shop`, `Stash`, `StashOpen`, `vending_machine`, `SodaMachine`, `coffee_machine`, `watermachine`, `elevator-ding`, `liftSoundBellRing` |
| Assalto | `robberydraw`, `robberyglass`, `breaking_vitrine_glass`, `warehousealert`, `warehousealert2`, `monkeyopening`, `catclosing` |
| Médico | `heartmonbeat`, `heartmondead`, `ventilator` |
| Diversos | `hobbs1` a `hobbs10`, `lord`, `lord2`, `consume`, `deepfried`, `dice`, `demo`, `photo`, `nv`, `purge`, `rapell`, `timber`, `jumpland`, `tooshort`, `alreadyusing`, `shiftyclick`, `RumbleStart`, `BellStartEnd`, `Clothes1`, `carbuckle` |

Os nomes diferenciam maiúsculas de minúsculas.

---

## Adicionar novos sons

1. Coloque o arquivo `.ogg` em `client/html/sounds/`.
2. Nenhuma alteração no `fxmanifest.lua` é necessária — ele já usa o glob `client/html/sounds/*.ogg`.
3. Restart no recurso.

O nome do arquivo passa por uma sanitização no lado NUI que remove qualquer caractere fora de `a-z`, `A-Z`, `0-9`, `-` e `_`. Evite espaços, acentos e pontos no nome.

Sons em outros formatos que não `.ogg` não funcionam: o player monta o caminho como `./sounds/<nome>.ogg`.

Se o mesmo som já estiver tocando, a instância anterior é parada e descarregada antes de tocar de novo — não há sobreposição do mesmo arquivo.

---

## Entrypoints para outros recursos

O volume vai de `0.0` a `1.0`. Quando omitido, o padrão é `1.0` em `PlayOnOne` e `0.3` nos demais.

### Eventos de servidor

```lua
-- Toca para um jogador específico
TriggerEvent('InteractSound_SV:PlayOnOne', playerId, 'DoorOpen', 0.4)

-- Toca para o jogador que disparou o evento (usa o source)
TriggerServerEvent('InteractSound_SV:PlayOnSource', 'lockpick', 0.2)

-- Toca para todos os jogadores do servidor
TriggerEvent('InteractSound_SV:PlayOnAll', 'Alert', 0.5)

-- Toca para todos os jogadores dentro de maxDistance do jogador que disparou
TriggerServerEvent('InteractSound_SV:PlayWithinDistance', 8.5, 'robberyglass', 0.6)
```

| Evento | Argumentos | Descrição |
|---|---|---|
| `InteractSound_SV:PlayOnOne` | `clientNetId`, `soundFile`, `soundVolume` | Encaminha para o cliente informado |
| `InteractSound_SV:PlayOnSource` | `soundFile`, `soundVolume` | Encaminha para o `source` do evento |
| `InteractSound_SV:PlayOnAll` | `soundFile`, `soundVolume` | Encaminha para todos (`-1`) |
| `InteractSound_SV:PlayWithinDistance` | `maxDistance`, `soundFile`, `soundVolume` | Envia para todos, e cada cliente decide se toca com base na distância até o `source` |

`PlayWithinDistance` tem um **limite fixo de 300 metros** no servidor. Chamadas com `maxDistance` maior ou igual a `300` são ignoradas e geram um aviso no console com o nome do jogador.

### Eventos de cliente

```lua
TriggerEvent('InteractSound_CL:PlayOnOne', 'DoorOpen', 0.4)
TriggerEvent('InteractSound_CL:PlayOnAll', 'Alert', 0.5)
TriggerEvent('InteractSound_CL:PlayWithinDistance', coords, 8.5, 'robberyglass', 0.6)
```

| Evento | Argumentos | Descrição |
|---|---|---|
| `InteractSound_CL:PlayOnOne` | `soundFile`, `soundVolume` | Toca localmente. Volume padrão `1.0` |
| `InteractSound_CL:PlayOnAll` | `soundFile`, `soundVolume` | Idêntico ao anterior no cliente; existe para ser alvo do broadcast do servidor. Volume padrão `0.3` |
| `InteractSound_CL:PlayWithinDistance` | `otherPlayerCoords`, `maxDistance`, `soundFile`, `soundVolume` | Só toca se o jogador local estiver a menos de `maxDistance` de `otherPlayerCoords`. Volume padrão `0.3` |

Nenhum dos três toca som enquanto `LocalPlayer.state.isLoggedIn` for falso.

---

## Estrutura de arquivos

```
interact-sound/
├── client/
│   ├── main.lua              — recebe os eventos e repassa para a NUI via SendNUIMessage
│   └── html/
│       ├── index.html        — player NUI baseado em Howler.js, escuta a mensagem playSound
│       └── sounds/           — 100 arquivos .ogg (adicione os seus aqui)
├── server/
│   └── main.lua              — encaminha os eventos SV para os clientes; limite de 300m em PlayWithinDistance
├── README.md
├── LICENSE
└── fxmanifest.lua
```
