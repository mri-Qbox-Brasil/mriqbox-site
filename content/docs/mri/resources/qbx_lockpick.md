---
title: Qbx Lockpick
---

Minigame de lockpick em NUI: outros recursos abrem a tela passando um callback, e recebem de volta se o jogador conseguiu arrombar a fechadura.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Como jogar](#como-jogar)
4. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
5. [Ajustar a dificuldade](#ajustar-a-dificuldade)
6. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| — | — | Nenhuma. O recurso é somente cliente + NUI, sem framework |

A NUI carrega jQuery e GSAP (TweenMax) por CDN — o servidor precisa ter acesso à internet no cliente para o minigame renderizar.

---

## Instalação

1. Copie a pasta `qbx_lockpick` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_lockpick
   ```
3. O recurso não faz nada sozinho: ele precisa ser chamado por outro recurso (ver [Entrypoints](#entrypoints-para-outros-recursos)).

Não há arquivo de configuração, comandos, itens, SQL nem locales.

---

## Como jogar

| Controle | Ação |
|---|---|
| Mouse (movimento horizontal) | Gira o pino em busca do ponto de destravamento |
| `W` / `A` / `S` / `D` / setas esquerda e direita | Aplica pressão no cilindro |
| `ESC` | Fecha a tela |

Quanto mais longe o pino estiver do ponto correto, mais rápido ele toma dano ao pressionar o cilindro. Se o pino quebrar (vida chega a zero), o minigame termina em falha e o callback recebe `false`. Girar o cilindro até o fim com o pino na posição certa destrava, e o callback recebe `true`.

O ponto de destravamento é sorteado a cada rodada.

---

## Entrypoints para outros recursos

### Evento `qb-lockpick:client:openLockpick`

Único ponto de entrada. Abre a tela e chama o callback com o resultado.

```lua
TriggerEvent('qb-lockpick:client:openLockpick', function(success)
    if success then
        -- fechadura arrombada
    else
        -- o pino quebrou
    end
end)
```

O callback só é executado quando o minigame termina (sucesso ou pino quebrado). Fechar a tela com `ESC` **não** dispara o callback.

---

## Ajustar a dificuldade

Não há config: os parâmetros ficam no topo de `html/script.js`.

| Variável | Padrão | Descrição |
|---|---|---|
| `solvePadding` | `4` | Tolerância em graus em torno do ponto correto. Maior = mais fácil |
| `maxDistFromSolve` | `45` | Distância (em graus) a partir da qual o pino sofre dano máximo |
| `pinDamage` | `20` | Dano aplicado ao pino a cada tick de pressão errada |
| `pinHealth` | `100` | Vida do pino. Com o padrão, 5 ticks de dano máximo quebram o pino |
| `pinDamageInterval` | `150` | Intervalo (ms) entre os ticks de dano |
| `cylRotSpeed` | `3` | Velocidade de rotação do cilindro |
| `mouseSmoothing` | `2` | Suavização do movimento do mouse. Maior = pino mais lento |

---

## Estrutura de arquivos

```
qbx_lockpick/
├── client/
│   └── main.lua          — evento openLockpick, foco de NUI, callbacks de resultado e saída
├── html/
│   ├── index.html        — markup do minigame (jQuery e GSAP via CDN)
│   ├── script.js         — lógica do minigame: pino, cilindro, dano, sucesso/falha
│   ├── style.css         — estilos
│   └── reset.css         — reset de CSS
└── fxmanifest.lua
```
