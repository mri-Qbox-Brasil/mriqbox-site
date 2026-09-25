---
title: CW Driftchip
---

Item de inventário que liga e desliga os pneus de drift do veículo em que o jogador está, com o chip saindo de uma caixa.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Itens](#itens)
4. [Configuração](#configuração)
5. [Fluxo de uso](#fluxo-de-uso)
6. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
7. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qb-core` | Sim | Core object, `CreateUseableItem`, `Progressbar` e `Notify` |
| `oxmysql` | Sim | Carregado no `fxmanifest.lua` (`@oxmysql/lib/MySQL.lua`) |
| `ox_inventory` | Não | Usado quando `Config.UseOxInv = true`. Com `false`, o recurso usa o inventário do `qb-core` |

---

## Instalação

1. Copie a pasta `cw-driftchip` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure cw-driftchip
   ```
3. Registre os dois itens no inventário (ver [Itens](#itens)) e copie `images/driftchip.png` e `images/driftchipbox.png` para a pasta de imagens do seu inventário.
4. Ajuste `Config.UseOxInv` de acordo com o inventário do servidor.
5. Não há SQL a importar.

---

## Itens

O recurso usa dois itens. A caixa (`driftchipbox`) é consumida e vira um chip (`driftchip`).

### ox_inventory (`data/items.lua`)

```lua
["driftchip"] = {
    label = "Drift Chip",
    weight = 300,
    degrade = 21000,
    stack = true,
    close = true,
    allowArmed = true,
    description = "Use este item para habilitar ou desabilitar o modo drift",
},
["driftchipbox"] = {
    label = "Drift Chip Box",
    weight = 350,
    stack = true,
    close = true,
    allowArmed = true,
    description = "Contém um drift chip",
},
```

O `degrade` faz o chip ter validade (o valor de exemplo, `21000` minutos, dá cerca de duas semanas). Quando a `durability` do chip chega a `0`, o servidor recusa o uso e notifica o jogador. Esse gate de durabilidade só existe no caminho `ox_inventory`.

### qb-core (`shared/items.lua`)

```lua
["driftchip"] = {["name"] = "driftchip", ["label"] = "Drift chip", ["weight"] = 300, ["type"] = "item", ["image"] = "driftchip.png", ["unique"] = false, ["useable"] = true, ["shouldClose"] = false, ["combinable"] = nil, ["description"] = "Use este item para habilitar ou desabilitar o modo drift"},
["driftchipbox"] = {["name"] = "driftchipbox", ["label"] = "Drift chip Box", ["weight"] = 350, ["type"] = "item", ["image"] = "driftchipbox.png", ["unique"] = false, ["useable"] = true, ["shouldClose"] = false, ["combinable"] = nil, ["description"] = "Contém um drift chip"},
```

---

## Configuração

Arquivo: `config.lua` (shared).

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Debug` | bool | Sim | Valor inicial do modo debug no cliente e no servidor |
| `Config.DriftChipItem` | string | Sim | Nome do item do chip. Padrão: `driftchip` |
| `Config.DriftChipBoxItem` | string | Sim | Nome do item da caixa. Padrão: `driftchipbox` |
| `Config.UseOxInv` | bool | Sim | `true` para usar `ox_inventory` (add/remove item e checagem de durabilidade). `false` para usar o inventário do `qb-core` |
| `Config.ActivateTime` | número (ms) | Sim | Duração da barra de progresso ao ligar/desligar o modo drift. Padrão: `2000` |
| `Config.BoxTime` | número (ms) | Sim | Duração da barra de progresso ao abrir a caixa. Padrão: `2000` |

---

## Fluxo de uso

### Abrir a caixa

1. O jogador usa o item `driftchipbox`.
2. Barra de progresso de `Config.BoxTime` ms.
3. Ao concluir, o servidor remove a caixa e entrega um `driftchip`.

### Ligar/desligar o modo drift

1. O jogador usa o item `driftchip` dentro de um veículo.
2. Com `ox_inventory`, o servidor recusa se a `durability` do chip for `0`.
3. O veículo precisa estar parado — acima de `1.0` de velocidade o uso é recusado com notificação.
4. O motor é desligado, roda a barra de progresso de `Config.ActivateTime` ms, e ao concluir o recurso alterna `SetDriftTyresEnabled` no veículo e religa o motor.
5. Cancelar a barra de progresso deixa o motor desligado — o jogador precisa ligar de novo manualmente.

---

## Entrypoints para outros recursos

O recurso não expõe exports. A interação é por eventos.

### Eventos de cliente

```lua
-- Alterna o modo drift no veículo em que o jogador está.
-- Valida veículo e velocidade internamente.
TriggerClientEvent('cw-driftchip:client:toggleDrift', source)

-- Abre a barra de progresso da caixa; ao concluir dispara o evento de servidor.
TriggerClientEvent('cw-driftchip:client:openbox', source)

-- Liga/desliga o debug do cliente em runtime.
TriggerClientEvent('cw-driftchip:client:toggleDebug', source, true)
```

### Evento de servidor

```lua
-- Troca a caixa pelo chip no inventário do jogador. Disparado pelo cliente
-- ao concluir a barra de progresso de abrir a caixa.
TriggerServerEvent('cw-driftchip:server:openbox')
```

Ambos os itens são registrados como usáveis via `QBCore.Functions.CreateUseableItem`, então o inventário já os aciona sem configuração extra.

---

## Estrutura de arquivos

```
cw-driftchip/
├── client/
│   └── client.lua        — barras de progresso, validações e SetDriftTyresEnabled
├── server/
│   └── server.lua        — itens usáveis, troca caixa → chip, checagem de durabilidade
├── images/
│   ├── driftchip.png     — ícone do chip para o inventário
│   └── driftchipbox.png  — ícone da caixa para o inventário
├── config.lua            — nomes dos itens, inventário usado e tempos das progress bars
└── fxmanifest.lua        — declara ui_page 'html/index.html', mas o recurso não traz pasta html
```
