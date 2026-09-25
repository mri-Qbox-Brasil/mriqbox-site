---
title: Qbx Density
---

Controla a densidade de NPCs e veículos ambiente do GTA V e reduz a agressividade das gangues contra o jogador.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Relacionamento com NPCs](#relacionamento-com-npcs)
5. [Desabilitadores de car generators](#desabilitadores-de-car-generators)
6. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
7. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | `lib.load` para carregar o config |

O recurso é apenas client-side. Não depende de framework, banco de dados nem inventário.

---

## Instalação

1. Copie a pasta `qbx_density` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_density
   ```

Não há SQL nem itens a cadastrar.

**Conflitos** — o recurso escreve os multiplicadores de densidade a cada frame. Qualquer outro recurso que chame `SetPedDensityMultiplierThisFrame`, `SetVehicleDensityMultiplierThisFrame` ou similares vai disputar o controle. Rode apenas um gerenciador de densidade por servidor.

---

## Configuração

Arquivo: `config/client.lua` (retorna uma tabela Lua). Todos os valores são multiplicadores entre `0.0` e `1.0`, onde `1.0` equivale à taxa de população do GTA Online e `0.0` remove completamente aquele tipo.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `parked` | number | Sim | Densidade de veículos estacionados. Padrão: `0.8` |
| `vehicle` | number | Sim | Densidade de veículos em trânsito. Padrão: `0.8` |
| `randomvehicles` | number | Sim | Densidade de veículos aleatórios. Padrão: `0.8` |
| `peds` | number | Sim | Densidade de pedestres comuns (civis). Padrão: `0.8` |
| `scenario` | number | Sim | Densidade de peds de cenário (motoqueiros, gangsters, NPCs parados). Padrão: `0.8` |

As alterações no arquivo exigem restart do recurso. Para mudar em runtime, use o export `SetDensity`.

---

## Relacionamento com NPCs

Na inicialização do cliente, o recurso define o relacionamento de vários grupos de NPC com o jogador para o nível `1` (respect), o que impede que ataquem o jogador espontaneamente:

- Gangues ambiente: `AMBIENT_GANG_HILLBILLY`, `AMBIENT_GANG_BALLAS`, `AMBIENT_GANG_MEXICAN`, `AMBIENT_GANG_FAMILY`, `AMBIENT_GANG_MARABUNTE`, `AMBIENT_GANG_SALVA`, `AMBIENT_GANG_LOST`
- Gangues numeradas: `GANG_1`, `GANG_2`, `GANG_9`, `GANG_10`
- Serviços e outros: `FIREMAN`, `MEDIC`, `COP`, `PRISONER`

Esse comportamento é fixo no código (`client/main.lua`) e não é configurável.

---

## Desabilitadores de car generators

A pasta `stream/car_gen_disablers/` contém 23 ymaps que removem os geradores de carro (car generators) de áreas específicas do mapa — principalmente aeroporto (`ap1_*`), Chumash/Cassino (`cs3_07_*`, `ch3_04_*`) e as variantes de heist (`hei_*`).

Eles são streamados automaticamente pelo recurso. Para desativar, remova os arquivos da pasta `stream/` e reinicie o recurso.

---

## Entrypoints para outros recursos

### Export `SetDensity` (cliente)

Altera um multiplicador de densidade em runtime, sem restart. O valor vale até o jogador reconectar ou o recurso reiniciar.

```lua
exports.qbx_density:SetDensity('peds', 0.2)
exports.qbx_density:SetDensity('vehicle', 0.0)
```

Tipos aceitos: `parked`, `vehicle`, `randomvehicles`, `peds`, `scenario`. Qualquer outro valor é ignorado silenciosamente.

---

## Estrutura de arquivos

```
qbx_density/
├── client/
│   └── main.lua                  — relacionamento das gangues, loop de densidade, export SetDensity
├── config/
│   └── client.lua                — multiplicadores de densidade
├── stream/
│   └── car_gen_disablers/        — 23 ymaps que desligam car generators de áreas específicas
└── fxmanifest.lua
```
