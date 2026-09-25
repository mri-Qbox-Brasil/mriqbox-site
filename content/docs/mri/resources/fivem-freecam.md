---
title: Fivem Freecam
---

API de câmera livre para FiveM: outros recursos ligam, desligam e controlam a câmera via exports. Sem comandos e sem UI própria.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Controles](#controles)
5. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
6. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| — | — | Standalone. Não depende de framework, `ox_lib` nem banco de dados |

---

## Instalação

1. Copie a pasta `fivem-freecam` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure fivem-freecam
   ```
3. O recurso não faz nada sozinho — ele só expõe a API. Outro recurso precisa chamar `exports['fivem-freecam']:SetActive(true)` para a câmera entrar em ação.

Não há SQL, itens ou comandos para configurar.

Ao parar o recurso (`onResourceStop`), a câmera é desligada automaticamente e o controle volta para o jogador.

---

## Configuração

Os valores padrão ficam em `client/config.lua`. Como as tabelas são protegidas por metatable (`protect`), **só é possível ler ou escrever chaves que já existem** — usar uma chave desconhecida gera erro `Key ... is not supported.`

Editar o arquivo muda o padrão; os exports `Set*Setting` / `Set*Control` mudam o valor em runtime.

### Câmera (`CAMERA_SETTINGS`)

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `FOV` | number | Sim | Campo de visão aplicado ao **entrar** na freecam. Padrão `45.0`. Para mudar com a câmera já ativa, use o export `SetFov` |
| `ENABLE_EASING` | bool | Sim | Ativa a transição suave ao entrar e sair da freecam. Padrão `true` |
| `EASING_DURATION` | number (ms) | Sim | Duração da transição. Padrão `1000` |
| `KEEP_POSITION` | bool | Sim | Ao reentrar, retoma a última posição da freecam em vez da posição da câmera de gameplay. Padrão `false` |
| `KEEP_ROTATION` | bool | Sim | Ao reentrar, retoma a última rotação da freecam. Padrão `false` |

### Sensibilidade e velocidade (`KEYBOARD_CONTROL_SETTINGS` / `GAMEPAD_CONTROL_SETTINGS`)

| Campo | Tipo | Padrão teclado | Padrão gamepad | Descrição |
|---|---|---|---|---|
| `LOOK_SENSITIVITY_X` | number | `5` | `2` | Sensibilidade do pitch (olhar cima/baixo) |
| `LOOK_SENSITIVITY_Y` | number | `5` | `2` | Sensibilidade do yaw (olhar esquerda/direita) |
| `BASE_MOVE_MULTIPLIER` | number | `1` | `1` | Velocidade base de deslocamento |
| `FAST_MOVE_MULTIPLIER` | number | `10` | `10` | Multiplicador máximo ao segurar o controle de acelerar |
| `SLOW_MOVE_MULTIPLIER` | number | `10` | `10` | Divisor máximo ao segurar o controle de desacelerar |

A velocidade final é `BASE * fast / slow`, corrigida pelo frametime — o deslocamento não depende do FPS.

---

## Controles

Os mapeamentos usam IDs de controle do GTA V. Cada chave pode receber um ID único ou uma tabela de dois IDs (positivo e negativo, usada em `MOVE_Z`).

| Chave | Padrão teclado | Padrão gamepad | Função |
|---|---|---|---|
| `LOOK_X` | `INPUT_LOOK_LR` (1) | `INPUT_LOOK_LR` (1) | Girar a câmera na horizontal |
| `LOOK_Y` | `INPUT_LOOK_UD` (2) | `INPUT_LOOK_UD` (2) | Girar a câmera na vertical |
| `MOVE_X` | `INPUT_MOVE_LR` (30) | `INPUT_MOVE_LR` (30) | Mover para os lados |
| `MOVE_Y` | `INPUT_MOVE_UD` (31) | `INPUT_MOVE_UD` (31) | Mover para frente/trás |
| `MOVE_Z` | `{152, 153}` | `{152, 153}` | Subir/descer |
| `MOVE_FAST` | `INPUT_SPRINT` (21) | `INPUT_VEH_ACCELERATE` (71) | Acelerar |
| `MOVE_SLOW` | `INPUT_CHARACTER_WHEEL` (19) | `INPUT_VEH_BRAKE` (72) | Desacelerar |

O pitch é travado entre `-90` e `90` graus; yaw e roll dão a volta em `360`. O FOV é travado entre `0.0` e `90.0`.

Enquanto a freecam está ativa o controle do jogador é desligado (`SetPlayerControl`) e a câmera não atualiza com o menu de pausa aberto.

---

## Entrypoints para outros recursos

Todos os exports são **client-side**.

```lua
local Freecam = exports['fivem-freecam']
Freecam:SetActive(true)
```

### Estado

| Export | Assinatura | Descrição |
|---|---|---|
| `IsActive` | `bool` | Se a freecam está ativa |
| `SetActive` | `(bool active)` | Entra ou sai da freecam |
| `IsFrozen` | `bool` | Se a câmera está congelada |
| `SetFrozen` | `(bool frozen)` | Congela a câmera: os controles param de mover, mas `SetPosition`/`SetRotation` continuam funcionando |

### Posição, rotação e FOV

| Export | Assinatura | Descrição |
|---|---|---|
| `GetFov` | `float` | FOV atual |
| `SetFov` | `(float fov)` | Define o FOV atual (não altera o padrão de `CAMERA_SETTINGS.FOV`) |
| `GetPosition` | `vector3` | Posição atual |
| `SetPosition` | `(float x, float y, float z)` | Move a câmera; carrega o interior e trava o minimapa na coordenada |
| `GetRotation` | `vector3` | Rotação atual |
| `SetRotation` | `(float x, float y, float z)` | Define a rotação (com clamp aplicado) |
| `GetPitch` | `float` | Atalho para `GetRotation().x` |
| `GetRoll` | `float` | Atalho para `GetRotation().y` |
| `GetYaw` | `float` | Atalho para `GetRotation().z` |
| `GetMatrix` | `vecX, vecY, vecZ, pos` | Matriz de visão atual |
| `GetTarget` | `(float distance) -> vector3` | Ponto para onde a câmera olha, à distância informada |

### Configuração em runtime

| Export | Assinatura |
|---|---|
| `GetCameraSetting` / `SetCameraSetting` | `(string key)` / `(string key, value)` |
| `GetKeyboardSetting` / `SetKeyboardSetting` | `(string key)` / `(string key, value)` |
| `GetGamepadSetting` / `SetGamepadSetting` | `(string key)` / `(string key, value)` |
| `GetKeyboardControl` / `SetKeyboardControl` | `(string key)` / `(string key, int|table value)` |
| `GetGamepadControl` / `SetGamepadControl` | `(string key)` / `(string key, int|table value)` |

```lua
local Freecam = exports['fivem-freecam']
Freecam:SetCameraSetting('EASING_DURATION', 2500)
Freecam:SetKeyboardSetting('LOOK_SENSITIVITY_X', 3)
Freecam:SetGamepadControl('MOVE_FAST', 71)
```

### Eventos de cliente

| Evento | Quando dispara |
|---|---|
| `freecam:onEnter` | Ao entrar na freecam (após `SetActive(true)`) |
| `freecam:onExit` | Ao sair da freecam (após `SetActive(false)`) |
| `freecam:onTick` | A cada frame com a freecam ativa, depois das atualizações de posição e rotação. Não dispara com a câmera desligada. Nenhum argumento |

```lua
local Freecam = exports['fivem-freecam']

AddEventHandler('freecam:onTick', function()
    local target = Freecam:GetTarget(50.0)
    print(target)
end)
```

---

## Estrutura de arquivos

```
fivem-freecam/
├── client/
│   ├── utils.lua      — helpers: protect, clamp, EulerToMatrix, leitura de controles
│   ├── config.lua     — mapeamentos e settings padrão de teclado, gamepad e câmera
│   ├── camera.lua     — criação/destruição da cam, get/set de posição, rotação e FOV
│   ├── exports.lua    — registro de todos os exports
│   └── main.lua       — loop de input, freecam:onTick e cleanup em onResourceStop
├── docs/
│   ├── CONFIGURING.md — referência original de configuração (inglês)
│   ├── EVENTS.md      — referência original de eventos (inglês)
│   └── EXPORTS.md     — referência original de exports (inglês)
├── README.md
└── fxmanifest.lua
```
