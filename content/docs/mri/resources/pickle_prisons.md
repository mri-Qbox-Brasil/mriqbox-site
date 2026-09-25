---
title: Pickle Prisons
---

Sistema prisional com múltiplas prisões, confisco de inventário, atividades de trabalho, lojas internas, itens coletáveis e fuga por túnel com sirene.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões](#permissões)
4. [Configuração](#configuração)
5. [Definição de uma prisão](#definição-de-uma-prisão)
6. [Atividades](#atividades)
7. [Lojas e coletáveis](#lojas-e-coletáveis)
8. [Fuga (breakout)](#fuga-breakout)
9. [Comandos](#comandos)
10. [Banco de dados](#banco-de-dados)
11. [Integrações](#integrações)
12. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
13. [Localização](#localização)
14. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | `skillCheck`, `inputDialog`, `showTextUI` |
| `mysql-async` | Sim | O `fxmanifest.lua` carrega `@mysql-async/lib/MySQL.lua`. Substitua por `@oxmysql/lib/MySQL.lua` se usar oxmysql |
| `qb-core` ou `es_extended` | Sim | Bridge automática. Sem um deles nada funciona |
| `ox_target` / `qb-target` / `qtarget` | Não | Só se `Config.UseTarget = true` |
| `ox_inventory` | Não | Bridge de inventário com suporte a metadata |
| `pickle_xp` | Não | Só se `Config.XPEnabled = true` |

---

## Instalação

1. Copie a pasta `pickle_prisons` para `resources/`.
2. Importe `_INSTALL/SQL/install.sql` (cria a tabela `pickle_prisons`).
3. Adicione os itens ao seu inventário. Os arquivos prontos ficam em `_INSTALL/Items/`:
   - `ox_inventory.lua` — colar em `ox_inventory/data/items.lua`
   - `qbcore.lua` — colar em `qb-core/shared/items.lua`
   - `esx_limit.sql` / `esx_weight.sql` — para ESX

   Os itens são `wood`, `metal`, `rope` e `shovel`. As imagens não vêm no repositório.
4. Adicione ao `server.cfg`:
   ```
   ensure ox_lib
   ensure pickle_xp   # opcional
   ensure pickle_prisons
   ```
5. Ajuste `config.lua` — no mínimo `Config.Language`, `Config.UseTarget` e as coordenadas da prisão.

> O `config.lua` do repositório vem com `Config.Debug = true`.

---

## Permissões

Não usa ACE. As permissões são por **job** (com nível mínimo) e por **grupo** do framework, definidas em `Config.Default.permissions` e opcionalmente sobrescritas por prisão.

| Ação | O que libera |
|---|---|
| `jail` | Prender jogadores (`/jail`, `/jailmenu`) |
| `unjail` | Soltar jogadores (`/unjail`) |
| `alert` | Ligar/desligar a sirene (`/startsiren`, `/stopsiren`) e receber o alerta de fuga. Também é o gate do `/jailmenu` |

```lua
permissions = {
    jail = {
        jobs = { ["police"] = 0, ["corrections"] = 0 },  -- ["job"] = nível mínimo
        groups = { "admin", "god" }
    },
    -- unjail, alert...
}
```

---

## Configuração

Arquivo: `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Debug` | bool | Não | Vem `true` no repositório |
| `Config.Language` | string | Sim | Idioma ativo. Deve existir em `locales/translations/` |
| `Config.RenderDistance` | number | Sim | Distância para exibir os models das interações |
| `Config.InteractDistance` | number | Sim | Raio de interação |
| `Config.UseTarget` | bool | Sim | `true` usa target (third-eye); `false` usa tecla + marker |
| `Config.NoModelTargeting` | bool | Não | Com target ligado, cria um prop invisível quando a interação não define model |
| `Config.Marker.enabled` | bool | Não | Desenha um marker quando não usa target e a interação não tem model |
| `Config.Marker.id` | number | Não | Tipo do marker do GTA V |
| `Config.Marker.scale` | number | Não | Escala do marker |
| `Config.Marker.color` | `{r,g,b,a}` | Não | Cor do marker |
| `Config.NavigationDisplay` | bool | Não | Ajuda o jogador a encontrar o ponto da atividade |
| `Config.ServeTimeOffline` | bool | Sim | `true` desconta o tempo offline da pena ao relogar |
| `Config.EnableSneakout` | bool | Sim | `true` liberta o preso que sair do raio da prisão; `false` o devolve à cela |
| `Config.XPEnabled` | bool | Sim | Liga as recompensas de XP via `pickle_xp` |
| `Config.XPCategories` | tabela | Só se `XPEnabled` | Categorias registradas no `pickle_xp` (`label`, `xpStart`, `xpFactor`, `maxLevel`) |
| `Config.Default.permissions` | tabela | Sim | Permissões padrão de `jail`, `unjail` e `alert` |
| `Config.Default.outfit` | tabela | Sim | Uniforme de presidiário (`male` e `female`), nos índices de roupa do seu servidor |
| `Config.Activities` | tabela | Sim | Catálogo de atividades — ver seção abaixo |
| `Config.UnrevokedItems` | array | Sim | Itens que **não** são confiscados ao prender |
| `Config.Breakout` | tabela | Sim | Configuração da fuga — ver seção abaixo |
| `Config.Alerts` | function | Sim | Função chamada em quem tem permissão `alert` quando a sirene liga/desliga |
| `Config.Prisons` | tabela | Sim | Prisões. A chave `"default"` é usada quando nenhuma outra é informada |

---

## Definição de uma prisão

Cada entrada de `Config.Prisons` aceita:

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `label` | string | Sim | Nome exibido em notificações |
| `coords` | vector3 | Sim | Centro da prisão, usado para medir o raio |
| `radius` | number | Sim | Sair desse raio devolve o preso à cela (ou o liberta, se `EnableSneakout`) |
| `permissions` | tabela / `nil` | Não | `nil` usa `Config.Default.permissions` |
| `outfit` | tabela / `nil` | Não | `nil` usa `Config.Default.outfit` |
| `blip` | tabela | Não | `label`, `coords`, `id`, `color`, `scale` |
| `hospital` | `{coords, heading}` | Sim | Para onde o preso vai ao morrer |
| `release` | `{coords, heading}` | Sim | Para onde o preso vai ao ser solto |
| `breakout` | tabela | Sim | Pontos `start`, `enter`, `leave` e `finish` do túnel de fuga |
| `activities` | array | Sim | Instâncias das atividades no mundo |
| `cells` | array | Sim | Celas (`coords`, `heading`, `size`). Uma é sorteada a cada vez que o preso é colocado na prisão |
| `stores` | array | Não | Lojas dentro da prisão |
| `lootables` | array | Não | Pontos de coleta de itens |

---

## Atividades

Uma atividade tem **seções**. O jogador fala com um NPC (ou marker) para iniciar, e o servidor sorteia ou avança para a próxima seção. Ao concluir uma seção, as recompensas dela são entregues e a próxima é escolhida.

O catálogo fica em `Config.Activities`. Cada seção tem `label`, `rewards` e uma função `process(data)` que roda no client, executa a animação/minigame e retorna `true` (concluiu) ou `false` (falhou).

As atividades que já vêm configuradas:

| Atividade | Seções | Recompensa |
|---|---|---|
| `workout` | `lift`, `situp`, `pushup`, `pullup` | 1000 de XP em `strength` por seção |
| `clean` | `sweep` | $5 por seção |
| `kitchen` | `stock`, `cook`, `toppings`, `delivery` | Só a seção `delivery` paga: $200 e 1000 de XP em `cooking` |

O posicionamento é feito em `Config.Prisons[x].activities`:

| Campo | Tipo | Descrição |
|---|---|---|
| `name` | string | Chave em `Config.Activities` |
| `model` | tabela | Model do NPC/prop que oferece a atividade |
| `coords` | vec4 / vector3 | Onde o NPC fica |
| `heading` | number | Só se `coords` for vector3 |
| `randomSection` | bool | `true` sorteia a seção; `false` percorre de cima para baixo |
| `sections` | array | Cada item tem `name` (chave da seção) e as coordenadas onde ela é executada |

Formatos aceitos em `rewards`: `{type = "item", name, amount}`, `{type = "cash", amount}`, `{type = "weapon", name, amount}` e `{type = "xp", name, amount}` (só com `Config.XPEnabled`).

---

## Lojas e coletáveis

### Lojas (`stores`)

Um NPC vende itens do `catalog`. Cada item tem `name`, `description`, `amount` e `required` — a lista de itens ou dinheiro cobrados. O servidor revalida o `required` antes de entregar.

```lua
{
    name = "shovel",
    description = "Maybe I could use this to escape...",
    amount = 1,
    required = {
        {type = "item", name = "wood", amount = 1},
        {type = "item", name = "metal", amount = 1},
        {type = "item", name = "rope", amount = 1},
    }
}
```

As lojas padrão são a "Prison Commissary" (hambúrguer e água por dinheiro) e o "Prison Plug" (canivete e pá, pagos com `wood`, `metal` e `rope`).

### Coletáveis (`lootables`)

Props no mundo que entregam itens e ficam em cooldown.

| Campo | Tipo | Descrição |
|---|---|---|
| `label` | string | Rótulo da interação |
| `coords` / `heading` | — | Posição do prop |
| `model` | tabela | `modelType = "prop"` e `hash` |
| `regenTime` | number (s) | Cooldown após a coleta |
| `rewards` | array | O que é entregue |

O cooldown é global (por coletável, não por jogador) e vive só em memória no servidor.

---

## Fuga (breakout)

Configurada em `Config.Breakout`:

| Campo | Tipo | Descrição |
|---|---|---|
| `alert` | bool | Liga a sirene e notifica quem tem permissão `alert` |
| `time` | number (s) | Janela em que o túnel fica aberto para outros presos entrarem |
| `model` | tabela | Prop que representa o buraco aberto |
| `required` | array | O que é consumido para cavar. Padrão: 1 `shovel` |
| `process` | function | Minigame de escavação executado no client |

Fluxo: o preso com a pá interage no ponto `breakout.start` e passa por três skill checks. Se conseguir, o servidor consome os itens, abre o túnel para todos por `Config.Breakout.time` segundos e dispara a sirene. Quem entrar no túnel (`breakout.enter`) é solto — **sem receber o inventário confiscado de volta** — e sai pelo ponto `breakout.leave` até o `breakout.finish`.

Sair do raio da prisão sem estar em uma fuga devolve o jogador à cela, a menos que `Config.EnableSneakout = true`.

---

## Comandos

Todos são registrados no servidor.

| Comando | Permissão | Descrição |
|---|---|---|
| `/jail [id] [minutos] [prisão?]` | `jail` | Prende um jogador. Sem o terceiro argumento, usa a prisão `default` |
| `/unjail [id]` | `unjail` | Solta um jogador e devolve o inventário confiscado |
| `/jailstatus [id?]` | Todos | Mostra o tempo restante e a prisão. Sem argumento, consulta a si mesmo |
| `/jailmenu` | `alert` | Abre um diálogo para escolher jogador próximo, prisão e tempo |
| `/startsiren [prisão]` | `alert` | Liga a sirene da prisão informada |
| `/stopsiren [prisão]` | `alert` | Desliga a sirene |

O tempo do `/jail` é decrementado de 1 em 1 a cada minuto, ou seja, o valor é em minutos.

---

## Banco de dados

Tabela `pickle_prisons`, criada por `_INSTALL/SQL/install.sql`:

| Coluna | Tipo | Descrição |
|---|---|---|
| `identifier` | varchar(46) | Identificador do jogador (`citizenid` no QBCore) |
| `prison` | varchar(50) | Chave da prisão em `Config.Prisons` |
| `time` | int | Tempo restante, em minutos |
| `inventory` | longtext | Inventário confiscado, em JSON |
| `sentence_date` | int | Timestamp Unix do início da pena, usado por `Config.ServeTimeOffline` |

O tempo restante é gravado no `playerDropped` e no `onResourceStop`.

---

## Integrações

### pickle_xp

Com `Config.XPEnabled = true`, o recurso registra as categorias de `Config.XPCategories` no `pickle_xp` no start e passa a entregar recompensas do tipo `xp`. Para usar outro sistema de XP, edite `bridge/xp/server.lua`.

### ox_inventory

Quando iniciado, é usado para confiscar e devolver o inventário preservando metadata. Sem ele, cai no inventário nativo do `qb-core` ou do `es_extended`.

### ND_Police

Ao ser preso, o client dispara `ND_Police:uncuffPed` para remover as algemas do jogador. Se o `ND_Police` não estiver no servidor, o evento simplesmente não é ouvido.

### Target (ox_target, qb-target, qtarget)

Com `Config.UseTarget = true`, as interações viram opções de third-eye. Cada um tem sua bridge em `bridge/target/`.

---

## Entrypoints para outros recursos

O recurso não expõe exports. Estes são os eventos e callbacks públicos.

```lua
-- Prende um jogador. Passa pela mesma validação de permissão do /jail.
TriggerServerEvent('pickle_prisons:jailPlayer', target, minutos, prisonIndex)

-- Solta um jogador.
TriggerServerEvent('pickle_prisons:unjailPlayer', target)

-- Solta o próprio jogador SEM devolver o inventário (usado pela fuga).
TriggerServerEvent('pickle_prisons:breakout')

-- Abre o diálogo de prender (o servidor dispara isso no /jailmenu).
TriggerClientEvent('pickle_prisons:jailDialog', source)
```

Eventos que o client dispara localmente e que outros recursos podem escutar:

```lua
-- O jogador entrou na prisão.
AddEventHandler('pickle_prisons:enterPrison', function() end)

-- O jogador saiu da prisão (solto, fugiu ou passou do raio com sneakout).
AddEventHandler('pickle_prisons:leavePrison', function() end)
```

O tempo de pena também é gravado no metadata do jogador com a chave `injail` (em minutos), o que permite que HUDs e outros recursos leiam o estado sem falar com o `pickle_prisons`.

---

## Localização

As strings ficam em `locales/translations/`, uma tabela `Language["<codigo>"]` por arquivo. Idiomas incluídos:

- `de.lua` — alemão
- `en.lua` — inglês
- `et.lua` — estoniano
- `pt-br.lua` — português do Brasil

O idioma ativo é escolhido pelo `Config.Language` (não pela convar `ox:locale`).

Atenção: os `label` das atividades, das lojas e dos coletáveis **não** passam pelo sistema de locale — eles são escritos direto no `config.lua`.

---

## Estrutura de arquivos

```
pickle_prisons/
├── config.lua                        — prisões, atividades, fuga, permissões, uniforme
├── core/
│   ├── client.lua                    — sistema de interações (marker/target), props, blips, WarpPlayer
│   └── shared.lua                    — utilitários compartilhados
├── modules/
│   ├── prison/
│   │   ├── client.lua                — celas, uniforme, raio da prisão, sirene, fuga, diálogo de prender
│   │   └── server.lua                — comandos, confisco de inventário, timer da pena, MySQL, sirene
│   ├── activities/
│   │   ├── client.lua                — interações das atividades e execução das seções
│   │   └── server.lua                — sorteio de seções e entrega de recompensas
│   ├── stores/
│   │   ├── client.lua                — NPCs e menu das lojas
│   │   └── server.lua                — validação e transação
│   └── lootables/
│       ├── client.lua                — props coletáveis e estado de cooldown
│       └── server.lua                — coleta e regeneração
├── bridge/
│   ├── qb/                           — qb-core: identifier, dinheiro, metadata, permissões, inventário fallback
│   ├── esx/                          — es_extended
│   ├── custom/                       — base para escrever a sua
│   ├── inventory/ox_inventory/       — inventário com metadata
│   ├── target/                       — ox_target, qb-target, qtarget
│   └── xp/                           — pickle_xp
├── locales/
│   ├── locale.lua                    — função _L
│   └── translations/                 — de, en, et, pt-br
├── nui/
│   ├── index.html                    — player de áudio da sirene
│   └── assets/                       — siren.mp3 e end_siren.mp3
├── _INSTALL/
│   ├── SQL/install.sql               — tabela pickle_prisons
│   └── Items/                        — itens para ox_inventory, qbcore e ESX
└── fxmanifest.lua
```
