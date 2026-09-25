---
title: MRI Qsafezones
---

Zonas seguras (greenzones) para FiveM: áreas onde tiro, colisão, dano e velocidade podem ser restringidos, definidas de forma permanente no config ou criadas em runtime por admins.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Zonas permanentes (`Config.GreenZones`)](#zonas-permanentes-configgreenzones)
6. [Zonas temporárias (admin)](#zonas-temporárias-admin)
7. [Comandos](#comandos)
8. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Zonas (`lib.zones.poly`, `lib.points`), TextUI, notificações, callbacks, `lib.addCommand` |
| `qbx_core` | Sim | Usa `@qbx_core/modules/lib.lua` (`qbx.math.round` no cálculo do raio do blip) |

Não usa banco de dados. As zonas permanentes vivem no `config.lua` e as temporárias existem apenas em memória.

---

## Instalação

1. Copie a pasta `mri_Qsafezones` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qsafezones
   ```
3. Edite `config.lua` para definir suas zonas permanentes em `Config.GreenZones` (o recurso já vem com a zona `hospital` de exemplo, ativa).
4. Dê permissão de admin aos grupos que devem poder criar zonas em runtime (ver [Permissões (ACE)](#permissões-ace)).

Não há SQL para importar. Não há conflito conhecido com outros recursos — os eventos e callbacks usam o prefixo `mri_Qsafezone:`.

---

## Permissões (ACE)

Os dois comandos são registrados via `lib.addCommand` com `restricted = 'group.admin'`. O `ox_lib` cria automaticamente as ACEs `command.<comando>` para o grupo indicado, então basta que o jogador pertença ao grupo `admin`:

```
add_principal identifier.license:<licenca_do_admin> group.admin
```

Para liberar os comandos a outro grupo, altere `restricted` em `server/main.lua` ou adicione a ACE manualmente:

```
add_ace group.moderator command.setzone allow
add_ace group.moderator command.clearzone allow
```

Os nomes das ACEs acompanham `Config.GreenzonesCommand` e `Config.GreenzonesClearCommand` — se você renomear os comandos, os nomes das ACEs mudam junto.

---

## Configuração

Arquivo: `config.lua`.

### Opções globais

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.EnableNotifications` | bool | Sim | Exibe notificação ao entrar e ao sair das zonas permanentes de `Config.GreenZones`. Não afeta as zonas temporárias |
| `Config.GreenzonesCommand` | string | Sim | Nome do comando que abre o diálogo de criação de zona temporária. Padrão: `setzone` |
| `Config.GreenzonesClearCommand` | string | Sim | Nome do comando que remove a zona temporária ativa. Padrão: `clearzone` |
| `Config.DebugPoly` | bool | Sim | Desenha o contorno das zonas poligonais para conferência visual. Só tem efeito em zonas com `usePoly = true` |
| `Config.GreenZones` | tabela | Sim | Lista de zonas permanentes, indexada por chave livre (ex.: `['hospital']`). Ver [Zonas permanentes](#zonas-permanentes-configgreenzones) |

### Textos das notificações (`Notifications`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Notifications.position` | string | Sim | Posição da notificação na tela (ex.: `center-left`, `top-right`) |
| `Notifications.greenzoneTitle` | string | Sim | Título da notificação de entrada e de saída |
| `Notifications.greenzoneIcon` | string | Sim | Ícone Font Awesome exibido na notificação |
| `Notifications.greenzoneEnter` | string | Sim | Texto exibido ao entrar em uma zona |
| `Notifications.greenzoneExit` | string | Sim | Texto exibido ao sair de uma zona |

---

## Zonas permanentes (`Config.GreenZones`)

Cada entrada de `Config.GreenZones` é uma zona que existe o tempo todo, criada na inicialização do client. Todos os campos abaixo são lidos por `client/main.lua`.

```lua
Config.GreenZones = {
    ['hospital'] = {
        usePoly = true,
        points = {
            vec3(299.2270, -584.6892, 43.2608),
            vec3(300.2270, -584.6892, 43.2608),
            vec3(300.2270, -585.6892, 43.2608),
            vec3(299.2270, -585.6892, 43.2608)
        },
        coords = vec3(299.2270, -584.6892, 43.2608),
        radius = 100.0,
        disablePlayerVehicleCollision = true,
        enableVehCollisionFX = false,
        enableSpeedLimits = false,
        setSpeedLimit = 30,
        removeWeapons = false,
        disableFiring = true,
        setInvincible = true,
        displayTextUI = true,
        textToDisplay = '**Área** Segura',
        backgroundColorTextUI = '#72E68F',
        textColor = '#2C2C2C',
        displayTextPosition = 'bottom-center',
        displayTextIcon = 'shield',
        blip = false,
        blipType = 'radius',
        enableSprite = false,
        blipSprite = 621,
        blipColor = 2,
        blipScale = 0.7,
        blipAlpha = 100,
        blipName = 'Hospital Greenzone'
    },
}
```

### Forma da zona

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `usePoly` | bool | Sim | `true` usa uma zona poligonal a partir de `points`; `false` usa um ponto circular a partir de `coords` + `radius` |
| `points` | array de `vec3` | Só se `usePoly = true` | Vértices do polígono, em ordem |
| `thickness` | number | Não | Espessura do polígono. Padrão: `2.0` |
| `minZ` / `maxZ` | number | Não | Limites verticais do polígono. Padrão: `0` e `100` |
| `coords` | `vec3` | Sim | Centro da zona. Usado pelo modo circular e sempre pelos blips |
| `radius` | number | Sim | Raio em metros no modo circular e raio do blip de raio. Precisa ser float (`100.0`, não `100`) |

### Regras aplicadas dentro da zona

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `disablePlayerVehicleCollision` | bool | Sim | Remove colisão entre jogadores e entre jogadores e veículos de outros jogadores |
| `enableVehCollisionFX` | bool | Sim | Deixa os outros jogadores e veículos semitransparentes (alpha 153) enquanto você está na zona. Só tem efeito junto com `disablePlayerVehicleCollision` |
| `enableSpeedLimits` | bool | Sim | Aplica limite de velocidade ao veículo do jogador dentro da zona |
| `setSpeedLimit` | number | Só se `enableSpeedLimits` | Limite em MPH (convertido internamente por `* 0.44`) |
| `removeWeapons` | bool | Sim | Remove a arma que o jogador tem em mãos ao entrar na zona |
| `disableFiring` | bool | Sim | Bloqueia disparo/soco e desativa drive-by dentro da zona |
| `setInvincible` | bool | Sim | Deixa o jogador invencível enquanto estiver na zona |

### TextUI

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `displayTextUI` | bool | Sim | Exibe TextUI persistente enquanto o jogador está na zona |
| `textToDisplay` | string | Só se `displayTextUI` | Texto do TextUI. Aceita markdown (`**negrito**`) |
| `backgroundColorTextUI` | string hex | Só se `displayTextUI` | Cor de fundo do TextUI |
| `textColor` | string hex | Só se `displayTextUI` | Cor do texto e do ícone |
| `displayTextPosition` | string | Só se `displayTextUI` | Posição na tela (ex.: `bottom-center`, `top-center`, `right-center`) |
| `displayTextIcon` | string | Só se `displayTextUI` | Ícone Font Awesome (ex.: `shield`, `shield-halved`) |

### Blip

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `blip` | bool | Sim | Cria blip no mapa para a zona |
| `blipType` | string | Só se `blip` | `radius` desenha o círculo de área; `normal` desenha apenas um ícone em `coords` |
| `enableSprite` | bool | Só se `blipType = 'radius'` | Adiciona também um ícone no centro do círculo. Com `blipType = 'normal'` o ícone é sempre desenhado |
| `blipSprite` | number | Só se houver sprite | ID do sprite ([lista](https://docs.fivem.net/docs/game-references/blips/)) |
| `blipColor` | number | Só se `blip` | ID da cor do blip |
| `blipScale` | number | Só se houver sprite | Tamanho do ícone (0.01 a 1.0) |
| `blipAlpha` | number | Só se `blipType = 'radius'` | Transparência do círculo (0 a 255) |
| `blipName` | string | Só se houver sprite | Nome exibido no mapa |

---

## Zonas temporárias (admin)

Além das zonas do config, um admin pode criar **uma** zona temporária em runtime com `/setzone`. Ela é criada na posição atual do admin, propagada para **todos os clients** conectados e vive apenas em memória — some no restart do recurso e é substituída se outra for criada.

O comando abre um `lib.inputDialog` com estes campos:

| Campo do diálogo | Tipo | Padrão | Efeito |
|---|---|---|---|
| Blip Name | texto (4 a 16 chars) | — | Nome do blip no mapa |
| Display Text | texto | — | Texto do TextUI exibido dentro da zona |
| Display Text Color | cor | `#ff5a47` | Cor de fundo do TextUI |
| Display Text Position | seleção | `top-center` | `right-center`, `left-center` ou `top-center` |
| Size (radius) | slider 1–100 | 10 | Raio da zona em metros |
| Disable Firing | checkbox | desmarcado | Bloqueia disparo dentro da zona |
| Everyone Invincible | checkbox | desmarcado | Torna todos invencíveis dentro da zona |
| Speed Limit (MPH) | slider 0–100, passo 10 | 0 | Limite de velocidade; `0` desativa o limite |
| Blip ID | número | 487 | Sprite do blip |
| Blip Color | número | 1 | Cor do blip |

A zona temporária é sempre circular (não aceita polígono) e não emite as notificações de entrada/saída — apenas o TextUI.

`/clearzone` pede confirmação em um `lib.alertDialog` e, ao confirmar, remove a zona, os blips, o TextUI, o limite de velocidade e a invencibilidade de todos os clients.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/setzone` | `group.admin` | Abre o diálogo de criação da zona temporária na posição atual do admin. Nome configurável em `Config.GreenzonesCommand` |
| `/clearzone` | `group.admin` | Remove a zona temporária ativa (com confirmação). Nome configurável em `Config.GreenzonesClearCommand` |

---

## Entrypoints para outros recursos

O recurso não expõe exports. Outros recursos podem, no entanto, disparar os eventos de client que o próprio comando de admin usa, para criar ou limpar a zona temporária em todos os jogadores.

### Criar a zona temporária

```lua
TriggerClientEvent('mri_Qsafezone:createAdminZone', -1,
    vec3(299.22, -584.68, 43.26), -- zoneCoords
    'Evento',                     -- zoneName (nome do blip)
    'Zona Segura',                -- textUI
    '#ff5a47',                    -- textUIColor
    'top-center',                 -- textUIPosition
    50,                           -- zoneSize (raio)
    true,                         -- disarm (bloqueia disparo)
    true,                         -- invincible
    0,                            -- speedLimit em MPH (0 = sem limite)
    487,                          -- blipID
    1                             -- blipColor
)
```

### Remover a zona temporária

```lua
TriggerClientEvent('mri_Qsafezone:deleteAdminZone', -1)
```

Ambos os eventos são `RegisterNetEvent` no client, ou seja, precisam ser disparados a partir do servidor. Como só existe um slot de zona temporária, um novo `createAdminZone` sobrescreve o anterior.

---

## Estrutura de arquivos

```
mri_Qsafezones/
├── client/
│   └── main.lua       — cria as zonas permanentes e seus blips, aplica as regras (colisão, tiro,
│                        invencibilidade, velocidade, TextUI), diálogos de admin e zona temporária
├── server/
│   └── main.lua       — registra /setzone e /clearzone (restritos a group.admin) e faz o broadcast
│                        de criação/remoção da zona temporária para todos os clients
├── config.lua         — Config.GreenZones (zonas permanentes), nomes dos comandos e textos das notificações
└── fxmanifest.lua
```
