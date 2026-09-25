---
title: ND Police
---

Conjunto de ferramentas policiais para FiveM: algemas e abraçadeiras, escolta, evidências balísticas, GSR, escudo, spike strips, shotspotter, vestiários e apreensão de veículos.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Itens do ox_inventory](#itens-do-ox_inventory)
4. [Configuração](#configuração)
5. [Teclas](#teclas)
6. [Módulos](#módulos)
7. [Vestiários](#vestiários)
8. [Shotspotter](#shotspotter)
9. [Evidências](#evidências)
10. [Integrações](#integrações)
11. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
12. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Bridge, keybind, notificações, `progressBar`, `points`, context menus |
| `ox_target` | Sim | Todas as interações (escolta, GSR, evidências, spikes) |
| `ox_inventory` | Sim | Itens, armário de evidências e detecção da arma equipada |
| `ND_Core` | Um destes | Bridge preferida. Única que habilita a apreensão de veículos e o dispatch do shotspotter |
| `es_extended` | Um destes | Bridge alternativa (`bridge/esx/`) |
| `qbx_core` | Um destes | Bridge alternativa. **Atenção:** os arquivos em `bridge/qb/` chamam `exports["qb-core"]`, não `qbx_core` |
| `ND_GunAnims` | Sim, para o escudo | `client/shield.lua` chama `exports["ND_GunAnims"]` sem checar se o recurso existe |
| `ND_MDT` | Não | Recebe o dispatch do shotspotter na bridge do ND_Core |
| `ND_AppearanceShops` | Não | Salva a aparência ao trocar de uniforme no vestiário |
| `fivem-appearance` | Não | Usado junto com o `ND_AppearanceShops` |

A bridge é escolhida em runtime em `shared/bridge.lua`, conforme o framework encontrado iniciado. O mapeamento inclui `ox_core` e um fallback `standalone`, mas **as pastas `bridge/ox/` e `bridge/standalone/` não existem no repositório** — rodar com `ox_core` ou sem framework nenhum falha no `require`. Na prática, use `ND_Core`, `es_extended` ou `qb-core`.

---

## Instalação

1. Copie a pasta `ND_Police` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure ox_lib
   ensure ox_target
   ensure ox_inventory
   ensure ND_Police
   ```
3. Registre os itens no `ox_inventory` (ver seção abaixo).
4. Copie as imagens de `ND_Police/items/*.png` para `ox_inventory/web/images/`.
5. Ajuste `data/config.lua` — no mínimo o `policeGroups`, para bater com os jobs/grupos do seu servidor.
6. Não há SQL. O recurso não persiste nada em banco.

---

## Itens do ox_inventory

O arquivo `items/items.lua` traz os itens prontos. Cole o conteúdo em `ox_inventory/data/items.lua`.

| Item | Peso | Efeito |
|---|---|---|
| `cuffs` | 150 | Algema o alvo (export `ND_Police.cuff`) |
| `zipties` | 10 | Abraçadeira no alvo (export `ND_Police.ziptie`) |
| `handcuffkey` | 10 | Retira algemas (export `ND_Police.uncuff`) |
| `tools` | 800 | Serve para cortar abraçadeiras (evento `ND_Police:unziptie`). Também chama `ND_Core.hotwire` |
| `shield` | 8000 | Escudo policial (export `ND_Police.useShield`). Fica nas costas quando não está em uso |
| `spikestrip` | 500 | Spike strip (export `ND_Police.deploySpikestrip`) |
| `casing` | — | Cápsula deflagrada, gerada pelo sistema de evidências |
| `projectile` | — | Projétil, gerado pelo sistema de evidências |

Além disso, cada tipo de munição em `data/evidence.lua` referencia dois itens específicos, no formato `casing-ammo-<tipo>` e `projectile-ammo-<tipo>`. Eles precisam existir no `ox_inventory` para que a evidência possa ser coletada. Os tipos cobertos são: `22`, `38`, `41`, `44`, `45`, `50`, `380`, `9`, `rifle`, `rifle2`, `shotgun`, `sniper`, `heavysniper` e `musket`.

---

## Configuração

Arquivo: `data/config.lua`. Retorna uma tabela.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `policeGroups` | array de strings | Sim | Grupos/jobs considerados polícia. Libera as opções de target (teste de GSR, apreensão) e é o gate da apreensão no servidor |
| `clearGSR` | number (min) | Sim | Tempo até o resíduo de disparo sumir naturalmente |
| `clearGSRinWater` | number (min) | Sim | Tempo dentro d'água para lavar o resíduo |
| `minImpoundPrice` | number | Sim | Valor mínimo aceito na apreensão. O servidor rejeita fora da faixa |
| `maxImpoundPrice` | number | Sim | Valor máximo aceito na apreensão |
| `defaultImpoundPrice` | number | Sim | Valor sugerido no diálogo. Deve ficar entre o mínimo e o máximo |

Os grupos padrão são `lspd`, `sahp` e `bcso`.

---

## Teclas

| Tecla | Nome do keybind | Descrição |
|---|---|---|
| `X` | `handsup_Qmri` | Mãos ao alto. Segurar por ~2 segundos ajoelha o personagem |

Registrado via `lib.addKeybind`, então o jogador pode remapear em Configurações → Teclas → FiveM. Não funciona dentro de veículo, de paraquedas, com o jogador morto ou quando o state bag `blockHandsUp` está ativo (escolta e escudo ativam esse bloqueio).

O recurso **não registra nenhum comando de chat**.

---

## Módulos

### Algemas e abraçadeiras

Usar o item `cuffs` ou `zipties` com um alvo próximo aplica a algema. Existem dois modos: normal (com o alvo cooperando, mãos ao alto) e agressivo (o alvo é forçado, sincronizando ângulo e heading). O state bag `isCuffed` do jogador é marcado.

Para soltar: o policial usa o `handcuffkey`. O próprio preso pode cortar a abraçadeira com o item `tools` (evento `ND_Police:unziptie`).

Ao parar o recurso, os props de algema são limpos.

### Escolta

Opções de target em qualquer jogador algemado:

| Opção | Condição |
|---|---|
| Segurar braço | Alvo algemado e não preso a você |
| Soltar braço | Alvo algemado e preso a você |
| Colocar no veículo | Alvo algemado, preso a você, e há um veículo com assento livre a até 5 m |

Em veículos, a opção "Retirar do veículo" aparece quando há um jogador algemado ou morto por perto. O servidor valida a distância (máximo 5 m) antes de aplicar.

### Escudo

Usar o item `shield` com uma pistola na mão ativa o escudo: o personagem entra em modo furtivo, o disparo é bloqueado e o escudo fica preso ao braço. Sem arma de mão, uma notificação avisa. O escudo é desativado ao pressionar a tecla de tiro alternativa ou ao guardar a arma, voltando às costas.

Exige o `ND_GunAnims` para trocar a animação de mira.

### Spike strips

O item `spikestrip` abre um diálogo para escolher quantas faixas colocar (até 4, limitado pela quantidade no inventário). O servidor gasta a quantidade escolhida e cria os props alinhados na direção do jogador. Não pode ser usado dentro de veículo.

Para recolher, use o third-eye no prop `p_ld_stinger_s`: o servidor deleta o objeto e devolve 1 `spikestrip` — desde que o jogador esteja a pé, a até 5 m e com espaço no inventário.

### GSR

Ao disparar, o state bag `shot` do jogador é marcado com o horário. Um policial pode usar a opção de target "Teste GSR" em qualquer jogador para saber se ele atirou recentemente. O resíduo some sozinho depois de `clearGSR` minutos, ou depois de `clearGSRinWater` minutos dentro d'água.

### Apreensão de veículos

O evento `ND_Police:impoundVehicle` valida o preço (dentro da faixa configurada), o grupo policial e a distância (5 m), chama a bridge do framework e deleta o veículo. A opção de target que dispara isso está **comentada** em `client/main.lua` — para habilitar a apreensão pelo third-eye, descomente esse bloco.

Só a bridge do `ND_Core` implementa `impoundVehicle` de fato (marca o veículo como `impounded` e grava o preço de resgate no metadata). Nas outras bridges o veículo é apenas deletado.

---

## Vestiários

Definidos em `data/locker_rooms.lua`. Cada vestiário tem um ou mais `locations`, os `groups` que podem abrir o menu, e uma lista de `options` — cada opção com seu próprio `groups` e um preset de roupa vindo de `data/clothing.lua`.

```lua
menus["lspd"] = {
    title = "Locker room",
    groups = {"lspd"},
    locations = { vec3(458.14, -990.82, 30.69) },
    options = {
        { title = "SWAT (black)", groups = {"swat"}, clothing = options.lspd_swat },
    }
}
```

Um marker azul aparece no local para quem tem o grupo. Pressione **E** a menos de 1 m para abrir o menu. O menu também tem a opção "View saved outfits".

Os presets em `data/clothing.lua` usam `male`/`female` e listam componentes (`torso`, `leg`, `shoes`, `kevlar`, `badge`…) e props (`hat`, `glasses`…) com `drawable` e `texture`. O arquivo de configuração menciona o comando `/getclothing` para copiar a roupa atual — esse comando é do `ND_Core`, não deste recurso.

---

## Shotspotter

Configurado em `data/shotspotter.lua`.

| Campo | Tipo | Descrição |
|---|---|---|
| `debug` | bool | Mostra os shotspotters no mapa |
| `delay` | number (s) | Atraso até o disparo ser reportado |
| `cooldown` | number (s) | Tempo até o mesmo jogador poder acionar de novo |
| `radius` | number | Raio de detecção de cada shotspotter |
| `ignoredJobs` | array | Jobs/grupos que não acionam o alerta |
| `locations` | array de vec3 | Posições dos shotspotters (30 pontos por padrão) |
| `ignoredWeapons` | array de hashes | Armas que não acionam (granadas, taser, sinalizador, extintor…) |
| `suppresors` | array de hashes | Componentes de supressor. Arma suprimida não aciona |

O evento `ND_Police:shotspotter` chega ao servidor e é repassado à bridge. Só a bridge do `ND_Core` faz algo com isso: cria um dispatch no `ND_MDT`. Nas demais, `bridge.shotSpotter` é um stub vazio — é ali que você integra o dispatch do seu servidor.

---

## Evidências

Ao disparar, o client gera nós de evidência no mundo: cápsulas no chão perto do atirador e projéteis no ponto de impacto. Cada tipo de munição, definido em `data/evidence.lua`, mapeia para itens diferentes.

```lua
['ammo-9'] = {
    label = '9mm',
    weight = 2,
    projectile = 'projectile-ammo-9',
    casing = 'casing-ammo-9'
},
```

`casing = false` (munição de mosquete) ou `projectile = false` (cartucho de escopeta) desliga aquele tipo de evidência para essa munição.

Os nós aparecem como sphere zones do `ox_target` com a opção "Coletar", e todos os nós num raio de 1 m são recolhidos de uma vez. Armários de evidência são responsabilidade do `ox_inventory`, não deste recurso.

---

## Integrações

### ND_Core

Bridge preferida. É a única que implementa a apreensão de veículos (`setStatus("impounded")` e metadata `impoundReclaimPrice`) e o dispatch do shotspotter via `ND_MDT`. As permissões usam `player.groups`.

### ND_MDT

Recebe o dispatch do shotspotter (`createDispatch`) quando a bridge do `ND_Core` está ativa.

### ND_GunAnims

Necessário para o escudo: `getAimAnim` e `setAimAnim` trocam a animação de mira enquanto o escudo está levantado.

### ND_AppearanceShops e fivem-appearance

Se o `ND_AppearanceShops` estiver iniciado, trocar de uniforme no vestiário salva a aparência no servidor via `ND_AppearanceShops:updateAppearance`, lendo o ped com `exports["fivem-appearance"]:getPedAppearance`.

### qb-core / es_extended

Bridges alternativas. Fornecem apenas `notify` e a checagem de job (`PlayerData.job.name` contra o `policeGroups`). `impoundVehicle` não existe nelas — o veículo é apenas deletado — e `shotSpotter` é um stub vazio com um comentário pedindo a integração de dispatch.

---

## Entrypoints para outros recursos

### Exports do client

Todos são pensados para serem chamados pelo `ox_inventory` como `client.export` dos itens, mas funcionam como exports normais.

```lua
exports['ND_Police']:cuff(data, slot)              -- algema o alvo mais próximo
exports['ND_Police']:ziptie(data, slot)            -- abraçadeira no alvo mais próximo
exports['ND_Police']:uncuff(data, slot)            -- retira as algemas do alvo
exports['ND_Police']:useShield(data, slot)         -- ativa/desativa o escudo
exports['ND_Police']:hasShield(bool)               -- coloca/tira o escudo das costas
exports['ND_Police']:deploySpikestrip()            -- abre o diálogo de tamanho e coloca as faixas
```

### Eventos do servidor

```lua
TriggerServerEvent('ND_Police:deploySpikestrip', { size = 3, segment = { coordsA, coordsB } })
TriggerServerEvent('ND_Police:retrieveSpikestrip', netId)
TriggerServerEvent('ND_Police:setPlayerEscort', target, state, setIntoVeh, setIntoSeat)
TriggerServerEvent('ND_Police:gsrTest', target)
TriggerServerEvent('ND_Police:shotspotter', location, coords)
TriggerServerEvent('ND_Police:impoundVehicle', netId, impoundReclaimPrice)
TriggerServerEvent('ND_Police:removeFromVehicle', target)
```

### Eventos do client

```lua
-- Disparado pelo próprio recurso sempre que o jogador atira.
-- Os módulos de evidência e shotspotter escutam este evento.
AddEventHandler('ND_Police:playerJustShot', function(weaponData) end)

-- Retira as algemas do jogador local. Outros recursos disparam isso
-- (o pickle_prisons, por exemplo, ao prender o jogador).
TriggerEvent('ND_Police:uncuffPed')

-- Corta a abraçadeira. É o `client.event` do item `tools`.
TriggerEvent('ND_Police:unziptie')

-- Limpa os state bags isCuffed e isEscorted.
TriggerEvent('ND_Police:playerUnloaded')
```

### State bags

| State bag | Escopo | Significado |
|---|---|---|
| `isCuffed` | Player | O jogador está algemado |
| `isEscorted` | Player | O `source` de quem está escoltando, ou `false` |
| `shot` | Player | O jogador tem resíduo de disparo (GSR) |
| `lastShot` | Player | Horário do último disparo |
| `blockHandsUp` | LocalPlayer | Bloqueia a tecla de mãos ao alto (escolta, escudo) |

---

## Estrutura de arquivos

```
ND_Police/
├── shared/
│   └── bridge.lua              — detecta o framework e carrega a bridge correta
├── server/
│   ├── main.lua                — spikes, escolta, GSR, shotspotter, apreensão, retirar do veículo
│   ├── cuff.lua                — sincronização de algemas e abraçadeiras
│   └── evidence.lua            — coleta de cápsulas e projéteis
├── client/
│   ├── main.lua                — detecção de disparo (dispara ND_Police:playerJustShot)
│   ├── cuff.lua                — algemas, props, keybind de mãos ao alto, exports de itens
│   ├── escort.lua              — opções de target de escolta e colocar/retirar do veículo
│   ├── evidence.lua            — geração e coleta dos nós de evidência
│   ├── gsr.lua                 — decaimento do GSR e opção de target do teste
│   ├── spikes.lua              — colocar e recolher spike strips
│   ├── shield.lua              — escudo policial
│   ├── shotspotter.lua         — detecção por zona e alerta
│   └── locker_rooms.lua        — markers e menu dos vestiários
├── data/
│   ├── config.lua              — policeGroups, tempos de GSR, faixa de preço da apreensão
│   ├── clothing.lua            — presets de uniforme
│   ├── locker_rooms.lua        — vestiários, locais e opções por grupo
│   ├── shotspotter.lua         — zonas, cooldown, armas e supressores ignorados
│   └── evidence.lua            — munições e os itens de cápsula/projétil correspondentes
├── bridge/
│   ├── nd/                     — ND_Core (apreensão real + dispatch no ND_MDT)
│   ├── qb/                     — qb-core
│   └── esx/                    — es_extended
├── items/
│   ├── items.lua               — definições prontas para o ox_inventory
│   └── *.png                   — imagens dos itens
├── stream/
│   ├── cuffs_main.ytyp         — ytyp dos props de algema
│   ├── police_cuffs.ydr        — modelo da algema
│   └── police_zip_tie_positioned.ydr  — modelo da abraçadeira
├── audiodata/                  — dat54 dos sons de algemar
├── audiodirectory/             — cuff.wav, uncuff.wav, zip.wav, unzip.wav
└── fxmanifest.lua
```
