---
title: MRI Qpaintjob
---

Cabine de pintura para oficinas: o veículo é posicionado no ponto, o mecânico escolhe cor e acabamento, e as pistolas fixas na parede pintam o carro gradualmente com efeito de partícula.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Como funciona](#como-funciona)
5. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
6. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Declarado em `dependencies`; input dialog, notificações e Text UI |
| `qb-core` | Sim | `functions.lua` chama `exports['qb-core']:GetCoreObject()` para pegar o job do jogador e o veículo mais próximo |
| `ox_target` | Condicional | Necessário quando `Config.UseTarget = true` (padrão). Com `false`, o recurso usa marker + tecla **E** |

---

## Instalação

1. Copie a pasta `mri_Qpaintjob` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qpaintjob
   ```
3. Ajuste `Config.Locations` no `config.lua` com as posições da sua oficina e o job autorizado.
4. Se o servidor não usa `ox_target`, mude `Config.UseTarget` para `false`.

Não há SQL nem itens a cadastrar.

---

## Configuração

Tudo fica em `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.UseTarget` | bool | Sim | `true` cria uma esfera do `ox_target` no ponto de controle. `false` desenha um marker e abre com **E** |
| `Config.SprayModel` | string | Sim | Modelo do prop usado como pistola de pintura (padrão `prop_tool_nailgun`) |
| `Config.Locations` | tabela | Sim | Uma entrada por cabine de pintura |

### `Config.Locations[]`

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `control` | vec3 | Sim | Ponto de interação onde o mecânico abre o menu de pintura |
| `vehicle` | vec3 | Sim | Posição em que o veículo precisa estar. O carro é aceito se estiver a até **2 metros** daqui |
| `sprays[]` | tabela | Sim | Pistolas fixas da cabine. Cada uma tem `pos` (vec3), `rotation` (vector3) e `scale` (number) |
| `jobs` | tabela de strings, ou `false` | Sim | Jobs autorizados a usar a cabine. Com `false`, qualquer jogador pode usar |

A configuração que vem no repositório traz uma cabine ativa no **LS Customs de cima** (`-332.8, -144.77, 39.01`), restrita ao job `mechanic`, com 6 pistolas. Há uma segunda cabine (Bennys do centro) comentada no arquivo.

---

## Como funciona

1. O veículo é estacionado no ponto `vehicle` da cabine.
2. O mecânico (com o job listado em `jobs`) interage no ponto `control`. Se a cabine já estiver em uso por outra pessoa, a interação fica bloqueada — o estado "ocupado" é sincronizado entre todos os clientes.
3. Abre um formulário do `ox_lib` com três campos:

   | Campo | Opções |
   |---|---|
   | Opção | Primária ou Secundária |
   | Tipo | Normal, Metalic, Pearl, Matte, Metal, Chrome |
   | Cor | Seletor de cor (hex) |

4. O veículo é **congelado** e as pistolas da cabine começam a soltar partículas na cor escolhida.
5. A cor muda **gradualmente**: o RGB atual caminha 1 unidade por canal a cada 100 ms até chegar na cor escolhida. Quanto mais distante a cor original, mais demora.
6. Ao terminar, o veículo é descongelado, sai uma fumaça de acabamento (`scr_respray_smoke`) e a cabine é liberada.

A cor é aplicada com `SetVehicleCustomPrimaryColour` / `SetVehicleCustomSecondaryColour` e o acabamento com `SetVehicleModColor_1` / `SetVehicleModColor_2`. O recurso **não persiste nada** — quem grava as mods do veículo (garagem, oficina) precisa salvar as propriedades depois.

---

## Entrypoints para outros recursos

Os três eventos do servidor apenas retransmitem o estado para todos os clientes (`-1`). São usados internamente pelo cliente e não têm validação de job ou distância no servidor.

### Evento `bryan_paintjob:server:setLocationBusy`

Marca uma cabine como ocupada ou livre para todos os jogadores.

```lua
TriggerServerEvent('bryan_paintjob:server:setLocationBusy', locationId, true)
```

### Evento `bryan_paintjob:server:initalizePaint`

Inicia a pintura em todos os clientes que estejam a até 15 metros do ponto de controle da cabine.

```lua
TriggerServerEvent('bryan_paintjob:server:initalizePaint', locationId, VehToNet(vehicle), { r = 255, g = 0, b = 0 }, isPrimary)
```

### Evento `bryan_paintjob:server:stopPaint`

Encerra a pintura em andamento na cabine.

```lua
TriggerServerEvent('bryan_paintjob:server:stopPaint', locationId)
```

---

## Estrutura de arquivos

```
mri_Qpaintjob/
├── client.lua        — cria as pistolas, target/marker, formulário de cor, transição gradual de cor e partículas
├── server.lua        — retransmite os eventos de cabine ocupada, início e fim da pintura para todos os clientes
├── functions.lua     — ponte com o qb-core: job do jogador, veículo mais próximo, notificações
├── config.lua        — Config.UseTarget, Config.Locations (cabines e pistolas), Config.SprayModel
├── LICENSE
└── fxmanifest.lua
```
