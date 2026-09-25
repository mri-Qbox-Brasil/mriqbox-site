---
title: Qbx Smallresources
---

Coleção de mini-recursos independentes empacotados em um único resource: consumíveis e drogas, recuo de armas, empurrar veículo, elevadores, controle de cruzeiro, anti-AFK, limpeza de mundo e vários ajustes de HUD e de comportamento do GTA.

> O recurso está descontinuado no upstream e será desmembrado em recursos separados em versões futuras. Nenhum código novo será adicionado a ele.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Módulos](#módulos)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Teclas](#teclas)
7. [Itens utilizáveis](#itens-utilizáveis)
8. [Integrações](#integrações)
9. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
10. [Localização](#localização)
11. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Declarado no `fxmanifest`. Keybinds, zonas, menus, progressBar, locale, `lib.loadJson` |
| `qbx_core` | Sim | Declarado no `fxmanifest`. `CreateUseableItem`, `Notify`, `GetPermission`, statebags de fome/sede/estresse |
| `ox_inventory` | Sim, para o `qbx_consumables` | O callback `consumables:server:usedItem` chama `exports.ox_inventory:RemoveItem` sem verificação de existência |
| `scully_emotemenu` | Sim, para o baseado | O efeito do item `joint` chama `exports.scully_emotemenu:cancelEmote()` ao terminar |
| Recurso de HUD | Não | O baseado dispara `hud:server:RelieveStress`. Sem um HUD que escute, o evento é simplesmente ignorado |
| Recurso de lockpick | Não | Os itens `lockpick` e `advancedlockpick` disparam o evento `lockpicks:UseLockpick`, que precisa ser tratado por outro recurso |
| Recurso de cinto | Não | O `qbx_cruise` dispara `seatbelt:client:ToggleCruise` ao ligar e desligar o piloto automático |

O `fxmanifest` carrega **todos** os `*/client.lua` e `*/server.lua` por glob (`**/client.lua`), ou seja: todo módulo presente na pasta é carregado. Para desativar um módulo, apague ou renomeie a pasta dele.

---

## Instalação

1. Copie a pasta `qbx_smallresources` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_smallresources
   ```
3. Não há SQL.
4. Cadastre no seu inventário os itens consumíveis que você for usar (ver [Itens utilizáveis](#itens-utilizáveis)). O recurso registra apenas o *comportamento* dos itens; a definição deles é do `ox_inventory`.
5. Apague as pastas dos módulos que você não quer. Como o carregamento é por glob, não existe uma flag de "desligar módulo" no config.
6. **Conflitos** — desative equivalentes antigos (`qb-smallresources`) e qualquer recurso que já faça recuo de arma, empurrar veículo ou desabilitar dispatch. Note também que as teclas padrão de `qbx_tackle`, `qbx_teleports` e `qbx_vehiclepush` são todas **E** — ver [Teclas](#teclas).

---

## Módulos

| Módulo | Lado | O que faz |
|---|---|---|
| `qbx_afk` | Servidor | Expulsa jogadores parados no mesmo ponto por tempo demais, avisando com antecedência |
| `qbx_consumables` | Client + servidor | Comidas, bebidas, álcool, drogas e lockpicks. Gerencia fome, sede, estresse e efeitos visuais |
| `qbx_crouch` | Client | **Arquivo inteiramente comentado.** O agachar não faz nada na versão atual — o módulo é um esqueleto desativado |
| `qbx_cruise` | Client | Controle de cruzeiro (piloto automático de velocidade) em veículos terrestres |
| `qbx_disableservices` | Client | Desliga os serviços de dispatch da polícia, bombeiros e ambulância, e trava o nível de procurado |
| `qbx_editor` | Client | Comandos do Rockstar Editor (gravar, salvar e descartar clipes) |
| `qbx_entitiesblacklist` | Servidor | Impede o spawn de modelos de veículo e ped da blocklist, antes de a entidade existir |
| `qbx_flipvehicle` | Client | Desvira um veículo capotado, com barra de progresso |
| `qbx_hudcomponents` | Client | Esconde componentes do HUD nativo e desabilita controles |
| `qbx_ignore` | Client | Limpa o mundo: sem NPCs de polícia, sem sirenes ao longe, sem lixeiros, sem câmera cinemática ociosa |
| `qbx_itempickup` | Client | Impede pegar armas do chão pelo pickup nativo |
| `qbx_noshuff` | Client | Impede a troca automática de assento ao entrar no carro, e dá uma tecla para trocar de propósito |
| `qbx_recoils` | Client | Recuo de câmera por arma, calibrado por hash |
| `qbx_removeentities` | Client | Deleta objetos do mapa em coordenadas fixas |
| `qbx_stun` | Client | Aumenta o tempo no chão depois de levar taser (4 a 7 segundos) |
| `qbx_tackle` | Client + servidor | Derruba outro jogador com um carrinho, correndo |
| `qbx_teleports` | Client | Elevadores e passagens: menu de andares em pontos do mapa |
| `qbx_vehiclepush` | Client + servidor | Empurrar veículo quebrado ou sem combustível, com direção |
| `qbx_vehicleradio` | Client | Liga e desliga o rádio do veículo |

---

## Configuração

Cada módulo tem seu próprio `config.json` ou `config.lua` dentro da pasta dele. Os módulos `qbx_crouch`, `qbx_cruise`, `qbx_editor`, `qbx_stun` e `qbx_tackle` não têm config — o comportamento é fixo no código.

### qbx_afk (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `timeUntilAFKKick` | number | Sim | Segundos parado até o kick. Os avisos aparecem faltando 15, 10, 5, 2,5 e 1 minuto, e depois aos 30, 20 e 10 segundos |
| `ignoreGroupsForAFK` | table | Sim | Grupos de permissão isentos do kick, no formato `{"admin": true}`. Verificado via `exports.qbx_core:GetPermission` |

A detecção é por posição: se as coordenadas do ped não mudarem entre duas checagens (a cada 1 segundo), o contador corre.

### qbx_consumables (`config.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `defaultStressRelief.min` / `.max` | number | Sim | Faixa padrão de alívio de estresse, usada quando o consumível não define a sua |
| `consumables.food` | table | Sim | Mapa `nome do item` → definição. Cada entrada registra automaticamente um item usável |
| `consumables.drink` | table | Sim | Idem, para bebidas |
| `consumables.alcohol` | table | Sim | Idem, para bebidas alcoólicas |

Definição de um consumível:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `min` / `max` | number | Sim | Faixa de fome ou sede restaurada. O valor é sorteado entre os dois |
| `stressRelief.min` / `.max` | table | Não | Faixa de estresse aliviado. Valores negativos **aumentam** o estresse em vez de aliviar — é o caso do `coffee`, com `min = -10` |
| `anim.dict` / `.clip` / `.flag` | table | Não | Animação tocada durante o consumo. Sem ela, usa a animação padrão de comer ou beber |
| `prop.model` / `.bone` / `.pos` / `.rot` | table | Não | Prop anexado à mão durante o consumo |
| `alcoholLevel` | number | Não | Só em `alcohol`. Intensidade do efeito de embriaguez |

### qbx_disableservices (`config.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `maxWantedLevel` | number | Sim | Nível máximo de procurado. `0` desativa a estrela por completo |
| `enabledServices` | table | Sim | Um booleano por serviço de dispatch, do índice 1 ao 15 (viatura, helicóptero, bombeiros, SWAT, ambulância, gangues, barreira etc.). `false` desliga o serviço. No padrão, só o `[8] PoliceRoadBlock` fica ligado |

### qbx_entitiesblacklist (`config.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `blacklisted` | table | Sim | Mapa `hash do modelo` → `true`, na sintaxe de hash do Lua (`` [`RHINO`] = true ``). Aceita veículos e peds |

O módulo **só age se a convar `qbx:bucketlockdownmode` for diferente de `inactive`**, e sai silenciosamente se a blocklist estiver vazia. O bloqueio acontece no evento `entityCreating`, antes de a entidade existir de fato.

O próprio arquivo avisa: para bloquear entidades por *região*, prefira desabilitar os car generators via ymap — o handler de `entityCreating` é caro.

### qbx_flipvehicle (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `flipingTime` | number | Sim | Duração da barra de progresso, em ms |
| `maxDistance` | number | Sim | Distância máxima do veículo, em metros |

### qbx_hudcomponents (`config.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `disable.hudComponents` | array | Sim | IDs de componentes do HUD nativo a esconder (via `SetHudComponentSize` em zero) |
| `disable.controls` | array | Sim | IDs de controles desabilitados a cada frame. O padrão desabilita o `37` (roda de armas) |
| `disable.recticle` | bool | Sim | `true` esconde a mira central quando a câmera não está em primeira pessoa |

O código também lê `disable.displayAmmo`, mas o campo **não existe no config padrão** — ele só é escrito e lido pelos exports `SetDisplayAmmo` / `GetDisplayAmmo`, sem nenhum efeito sobre o HUD.

### qbx_ignore (`config.lua`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `disable.idleCamera` | bool | Sim | Desativa a câmera cinemática que entra sozinha com o jogador parado |
| `disable.ambience` | bool | Sim | Desativa sirenes e alarmes de carro distantes |
| `disable.headshots` | bool | Sim | `true` impede que headshots matem instantaneamente (`SetPedSuffersCriticalHits`) |
| `blacklisted.scenarioTypes` | array | Sim | Cenários de veículo desabilitados (ambulância, bombeiro, viatura, segurança, militar…) |
| `blacklisted.suppressedModels` | array | Sim | Modelos que o jogo não pode mais gerar como tráfego ambiente |
| `blacklisted.scenarioGroups` | array | Sim | Grupos de cenário desabilitados (aviões da LSA, Sandy, Grapeseed…) |

Independentemente do config, o módulo desliga o scanner da polícia, os caminhões de lixo, os policiais aleatórios e as sirenes distantes, e limpa os geradores de veículo em torno do hospital central, da Mission Row, da Pillbox, da base militar e da praia de nudismo.

### qbx_itempickup (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `disabledPickups` | array | Sim | Nomes de pickup (`PICKUP_WEAPON_*`) que o jogador não pode mais pegar do chão. O padrão cobre todas as armas do jogo base |

Uma lista vazia desliga o módulo.

### qbx_noshuff (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `shuffleSeatKey` | string | Sim | Tecla que troca de assento de propósito. Padrão: `O` |

A troca é recusada se o jogador estiver algemado ou de cinto.

### qbx_recoils (`config.lua`)

Tabela `hash da arma` → força do recuo. Os valores vão de `0.1` a `0.9` nas armas padrão; `0` desativa o recuo daquela arma. O arquivo já traz todas as armas do jogo, com as corpo a corpo, os arremessáveis e os utilitários comentados — descomente a linha para ativar o recuo de uma delas.

O recuo é aplicado empurrando o pitch da câmera enquanto o jogador atira, com curva mais agressiva em primeira pessoa. Não afeta drive-by.

### qbx_removeentities (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `objects` | array | Sim | Objetos do mapa a apagar. Cada entrada tem `coords` (array `[x, y, z]`) e `hash` (nome do modelo) |

A varredura roda a cada 5 segundos e apaga o objeto mais próximo daquele tipo, num raio de 2 metros das coordenadas.

### qbx_teleports (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `teleports` | array de arrays | Sim | Cada elemento é uma **passagem** (um "elevador") com seus andares. Passagens com menos de 2 andares são descartadas na inicialização |
| `teleports[][].coords` | array | Sim | `[x, y, z]` ou `[x, y, z, heading]`. Com 4 valores, o heading é aplicado na chegada |
| `teleports[][].drawText` | string | Sim | Texto do textUI e título do menu de andares |
| `teleports[][].allowVehicle` | bool | Não | `true` permite teleportar dentro do veículo |
| `teleports[][].ignoreGround` | bool | Não | `true` usa o `Z` exato do config. `false` (padrão) tenta encaixar o jogador no chão mais próximo |

Cada andar vira uma esfera de 2 metros de raio. O jogador entra na esfera, aperta a tecla e escolhe o andar de destino no menu — o andar atual aparece marcado e não é selecionável.

### qbx_vehiclepush (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `damageNeeded` | number | Sim | Saúde máxima do motor para o veículo ser empurrável. Com `1000.0` (padrão), qualquer carro pode ser empurrado |
| `blacklistedClasses` | array | Sim | Classes de veículo que não podem ser empurradas. O padrão bloqueia bicicletas, barcos, helicópteros e aviões |

Um veículo também fica empurrável quando o statebag `fuel` dele cai abaixo de 3, independentemente da saúde do motor. O assento do motorista precisa estar vazio.

### qbx_vehicleradio (`config.json`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `disableRadioByDefault` | bool | Sim | `true` começa com o rádio desligado em todo veículo em que o jogador entrar |
| `toggleCommand` | string | Sim | Nome do comando que alterna o rádio. Padrão: `togglevehradio` |
| `toggleKey` | string | Não | Tecla mapeada sobre o comando. Padrão: `F9` |

---

## Comandos

Nenhum comando do recurso é restrito por permissão.

| Comando | Permissão | Descrição |
|---|---|---|
| `/record` | Qualquer jogador | Começa a gravar no Rockstar Editor |
| `/clip` | Qualquer jogador | Para a gravação |
| `/saveclip` | Qualquer jogador | Para e salva o clipe |
| `/delclip` | Qualquer jogador | Para e descarta o clipe |
| `/editor` | Qualquer jogador | Sai da sessão e abre o Rockstar Editor |
| `/togglevehradio` | Qualquer jogador | Liga e desliga o rádio do veículo. Só funciona dentro de um. O nome vem de `toggleCommand` |

---

## Teclas

| Tecla padrão | Nome do keybind | Módulo | Ação |
|---|---|---|---|
| `E` | `tackle` | qbx_tackle | Solte a tecla correndo, perto de outro jogador, para derrubá-lo |
| `E` | `elevator_interact` | qbx_teleports | Abre o menu de andares no ponto do elevador. Também mapeado no D-pad direito do controle |
| `E` + `LSHIFT` | `push_vehicle_e` e `push_vehicle` | qbx_vehiclepush | Segure as duas para empurrar o veículo. `A` e `D` viram as rodas |
| `Y` | `toggle_cruise_control` | qbx_cruise | Liga o controle de cruzeiro na velocidade atual |
| `O` | `shuffleSeat` | qbx_noshuff | Troca para o próximo assento do veículo |
| `F9` | (mapeada sobre `/togglevehradio`) | qbx_vehicleradio | Liga e desliga o rádio |

As três teclas `E` coexistem porque os contextos são mutuamente exclusivos: correndo a pé perto de um jogador, parado numa esfera de elevador, ou agarrado a um carro com Shift. Ainda assim, todas são remapeáveis pelo jogador em **Configurações > Controles > FiveM**.

O controle de cruzeiro desliga sozinho ao frear, ao perder mais de 1,5 de velocidade sem estar curvando, ou ao sair do veículo. Ele recusa bicicletas, barcos, helicópteros, aviões e trens.

---

## Itens utilizáveis

Registrados via `exports.qbx_core:CreateUseableItem`. A definição do item em si (peso, imagem, descrição) pertence ao `ox_inventory`.

### Vindos do config (`qbx_consumables/config.lua`)

| Categoria | Itens padrão |
|---|---|
| Comida | `sandwich`, `tosti`, `twerks_candy`, `snikkel_candy` |
| Bebida | `water_bottle`, `kurkakola`, `coffee` |
| Álcool | `whiskey`, `beer`, `vodka` |

Para adicionar um item, basta acrescentar uma entrada na tabela certa — o usável é registrado automaticamente no boot.

### Fixos no código (`qbx_consumables/server.lua`)

| Item | Efeito |
|---|---|
| `joint` | Fumar. Alivia estresse a cada 10 segundos, por 6 ciclos, e então cancela o emote via `scully_emotemenu` |
| `cokebaggy` | Cocaína. Stamina e velocidade de corrida extras, com risco de tropeçar e surtos visuais |
| `crack_baggy` | Crack. Efeito visual pesado |
| `xtcbaggy` | Ecstasy |
| `oxy` | Oxicodona |
| `meth` | Metanfetamina |
| `lockpick` | Dispara `lockpicks:UseLockpick` com `false` (lockpick comum) |
| `advancedlockpick` | Dispara `lockpicks:UseLockpick` com `true` (lockpick avançado) |

Os dois itens de lockpick só fazem algo se outro recurso tratar o evento `lockpicks:UseLockpick`.

---

## Integrações

### ox_inventory

O `qbx_consumables` remove o item consumido chamando `exports.ox_inventory:RemoveItem` no callback `consumables:server:usedItem`. Os eventos `consumables:server:addHunger` e `addThirst` têm um caminho especial para chamadas vindas do `ox_inventory`: quando o recurso invocador é o `ox_inventory`, o valor recebido é tratado como **absoluto** (`set`) em vez de incremento, para acomodar a bridge QB do inventário.

### scully_emotemenu

O baseado (`joint`) chama `exports.scully_emotemenu:cancelEmote()` para encerrar a animação de fumar depois de 6 ciclos de alívio de estresse.

### HUD

O `qbx_consumables` grava fome, sede e estresse nos statebags `hunger`, `thirst` e `stress` do jogador — é daí que o HUD deve ler. O baseado também dispara `hud:server:RelieveStress` a cada ciclo, para HUDs que preferem consumir o evento.

### Recurso de cinto de segurança

O `qbx_cruise` dispara `seatbelt:client:ToggleCruise` sempre que o controle de cruzeiro liga ou desliga, para que o HUD do cinto acenda o indicador.

---

## Entrypoints para outros recursos

### qbx_consumables — servidor

Fome e sede vão de 0 a 100, onde **menor significa mais faminto ou mais sedento**. Os valores são clampeados nessa faixa.

```lua
exports.qbx_smallresources:SetHunger(source, 80)
exports.qbx_smallresources:AddHunger(source, 20)
exports.qbx_smallresources:SetThirst(source, 80)
exports.qbx_smallresources:AddThirst(source, 20)
```

As versões em camelCase (`setHunger`, `addHunger`, `setThirst`, `addThirst`) existem e funcionam, mas estão marcadas como deprecated no código.

Os mesmos valores também são acessíveis por evento de rede, a partir do client do próprio jogador:

```lua
TriggerServerEvent('consumables:server:setHunger', 80)
TriggerServerEvent('consumables:server:addHunger', 20)
TriggerServerEvent('consumables:server:setThirst', 80)
TriggerServerEvent('consumables:server:addThirst', 20)
```

### qbx_consumables — client

Efeitos visuais de droga, disponíveis para outros recursos reaproveitarem:

```lua
exports.qbx_smallresources:TrevorEffect()
exports.qbx_smallresources:AlienEffect()
exports.qbx_smallresources:MethBagEffect()
exports.qbx_smallresources:EcstasyEffect()
exports.qbx_smallresources:CrackBaggyEffect()
exports.qbx_smallresources:CokeBaggyEffect()
```

### qbx_flipvehicle — client

```lua
-- Sem argumentos, pega o veículo mais próximo dentro de maxDistance.
-- flipTest = true pula a barra de progresso e vira o carro na hora.
exports.qbx_smallresources:FlipVehicle(vehicle, flipTest)
```

O export `flipVehicle` (com minúscula) é o mesmo, mas está deprecated.

### qbx_hudcomponents — client

```lua
-- Todos aceitam um número ou um array de números.
exports.qbx_smallresources:AddDisableHudComponents({1, 2, 3})
exports.qbx_smallresources:RemoveDisableHudComponents(3)
local components = exports.qbx_smallresources:GetDisableHudComponents()

exports.qbx_smallresources:AddDisableControls({24, 25})
exports.qbx_smallresources:RemoveDisableControls(24)
local controls = exports.qbx_smallresources:GetDisableControls()

exports.qbx_smallresources:SetDisplayAmmo(true)
local displayAmmo = exports.qbx_smallresources:GetDisplayAmmo()
```

Serve para esconder o HUD durante cutscenes, minigames ou menus. As variantes em camelCase existem e estão deprecated.

### Statebags

| Statebag | Escopo | Descrição |
|---|---|---|
| `hunger` | Player | Nível de fome, 0 a 100. Escrito pelo `qbx_consumables` |
| `thirst` | Player | Nível de sede, 0 a 100 |
| `stress` | Player | Nível de estresse, 0 a 100 |
| `pushVehicle` | Entity | Direção do empurrão (`front`, `back`, `left`, `right`) ou `nil`. O `qbx_vehiclepush` usa para transferir o controle quando o dono da entidade muda no meio do empurrão |
| `fuel` | Entity | Lido, nunca escrito, pelo `qbx_vehiclepush`: abaixo de 3, o veículo fica empurrável mesmo com o motor intacto |

### Eventos

```lua
-- qbx_tackle: derruba o jogador alvo. O servidor valida a distância (2 metros).
TriggerServerEvent('tackle:server:TacklePlayer', targetServerId)

-- qbx_vehiclepush: grava a direção do empurrão no statebag do veículo.
TriggerServerEvent('qbx_vehiclepush:server:push', { direction = 'front', netId = netId })
```

---

## Localização

As notificações e os labels das barras de progresso são traduzidos via `ox_lib` locale. Os arquivos ficam em `locales/`:

`da.json`, `de.json`, `en.json`, `es.json`, `fr.json`, `nl.json`, `pl.json`, `pt-br.json`, `pt.json`, `ro.json`, `tr.json`, `zh-cn.json`

O locale ativo é definido pela convar `ox:locale` no `server.cfg`:

```
setr ox:locale "pt-br"
```

Os avisos de AFK são a exceção: estão fixos em inglês no `qbx_afk/server.lua`, fora do sistema de locale.

---

## Estrutura de arquivos

```
qbx_smallresources/
├── qbx_afk/
│   ├── server.lua        — detecção de inatividade por posição e kick
│   └── config.json       — tempo até o kick e grupos isentos
├── qbx_consumables/
│   ├── client.lua        — animações, props e efeitos visuais de droga
│   ├── server.lua        — registro dos usáveis, fome, sede e estresse
│   └── config.lua        — comidas, bebidas, álcool e alívio de estresse
├── qbx_crouch/
│   └── client.lua        — inteiramente comentado; não faz nada na versão atual
├── qbx_cruise/
│   └── client.lua        — controle de cruzeiro (tecla Y)
├── qbx_disableservices/
│   ├── client.lua        — desliga o dispatch e trava o nível de procurado
│   ├── config.lua        — serviços habilitados e nível máximo
│   └── readme.md
├── qbx_editor/
│   └── client.lua        — comandos do Rockstar Editor
├── qbx_entitiesblacklist/
│   ├── server.lua        — bloqueio de spawn via entityCreating
│   └── config.lua        — hashes de veículo e ped bloqueados
├── qbx_flipvehicle/
│   ├── client.lua        — desvirar veículo, com export
│   └── config.json       — duração e distância máxima
├── qbx_hudcomponents/
│   ├── client.lua        — esconde componentes do HUD e desabilita controles
│   └── config.lua        — componentes, controles e mira
├── qbx_ignore/
│   ├── client.lua        — limpeza de mundo: sem NPC de polícia, sem sirene distante
│   └── config.lua        — cenários, modelos e grupos bloqueados
├── qbx_itempickup/
│   ├── client.lua        — desabilita os pickups de arma do chão
│   ├── config.json       — lista de pickups desabilitados
│   └── readme.md
├── qbx_noshuff/
│   ├── client.lua        — trava a troca automática de assento (tecla O)
│   ├── config.json       — tecla de troca
│   └── readme.md
├── qbx_recoils/
│   ├── client.lua        — aplica o recuo de câmera ao atirar
│   ├── config.lua        — força do recuo por hash de arma
│   └── readme.md
├── qbx_removeentities/
│   ├── client.lua        — apaga objetos do mapa em coordenadas fixas
│   ├── config.json       — objetos a apagar
│   └── readme.md
├── qbx_stun/
│   ├── client.lua        — aumenta o tempo no chão após taser
│   └── readme.md
├── qbx_tackle/
│   ├── client.lua        — carrinho no jogador correndo (tecla E)
│   └── server.lua        — valida a distância e derruba o alvo
├── qbx_teleports/
│   ├── client.lua        — esferas de elevador e menu de andares (tecla E)
│   ├── config.json       — passagens e andares
│   └── readme.md
├── qbx_vehiclepush/
│   ├── client.lua        — empurrar veículo com direção (E + LSHIFT)
│   ├── server.lua        — sincroniza a direção no statebag do veículo
│   ├── config.json       — dano necessário e classes bloqueadas
│   └── readme.md
├── qbx_vehicleradio/
│   ├── client.lua        — liga e desliga o rádio do veículo (F9)
│   └── config.json       — comando, tecla e estado inicial
├── locales/              — 12 idiomas (.json)
└── fxmanifest.lua        — carrega todo */client.lua e */server.lua por glob
```
