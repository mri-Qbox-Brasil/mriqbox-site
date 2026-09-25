---
title: CDN Fool
---

Pacote de assets (stream) com os modelos do carregador elétrico e do bico de recarga usados pelo `cdn-fuel`.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Modelos disponíveis](#modelos-disponíveis)
4. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `cdn-fuel` | Não | Recurso que consome estes modelos nos postos elétricos. O `cdn-fool` funciona como pacote de assets independente e não roda script algum |

---

## Instalação

1. Copie a pasta `cdn-fool` para `resources/`.
2. Adicione ao `server.cfg`, **antes** do recurso que usa os modelos:
   ```
   ensure cdn-fool
   ensure cdn-fuel
   ```
3. Não há SQL, configuração nem itens de inventário a adicionar. O recurso só declara `data_file 'DLC_ITYP_REQUEST'` para os dois `.ytyp` e faz stream dos `.ydr`.

---

## Modelos disponíveis

| Modelo | Arquivo | Uso |
|---|---|---|
| `electric_charger` | `stream/[electric_charger]/electric_charger.ydr` | Prop do carregador elétrico (poste/estação) |
| `electric_nozzle` | `stream/[electric_nozzle]/electric_nozzle.ydr` | Prop do bico/cabo de recarga que o jogador segura |

Cada modelo tem o `.ytyp` correspondente registrado no `fxmanifest.lua` via `data_file 'DLC_ITYP_REQUEST'`, o que permite spawná-los com `CreateObject` sem carregamento manual do typ.

---

## Estrutura de arquivos

```
cdn-fool/
├── stream/
│   ├── [electric_charger]/
│   │   ├── electric_charger.ydr       — modelo do carregador
│   │   └── electric_charger_typ.ytyp  — definição de tipo do carregador
│   └── [electric_nozzle]/
│       ├── electric_nozzle.ydr        — modelo do bico de recarga
│       └── electric_nozzle_typ.ytyp   — definição de tipo do bico
└── fxmanifest.lua                     — registra os dois .ytyp como DLC_ITYP_REQUEST
```
