---
title: Mhacking
---

Biblioteca standalone de minigame de hacking em NUI, pensada para ser chamada por outros recursos via eventos.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Controles do minigame](#controles-do-minigame)
4. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
5. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| — | — | Standalone. O `fxmanifest.lua` não declara nenhuma dependência e o código não usa framework, inventário nem target |

---

## Instalação

1. Copie a pasta `mhacking` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mhacking
   ```
3. Inicie o `mhacking` **antes** dos recursos que dependem dele.
4. Não há SQL, itens de inventário nem arquivo de configuração — o comportamento é definido pelos parâmetros passados na chamada.

---

## Controles do minigame

A tela é dividida em dois blocos de código, controlados em paralelo:

| Bloco | Navegação | Confirmar |
|---|---|---|
| Esquerdo | `W` `A` `S` `D` | `ESPAÇO` |
| Direito | Setas direcionais | `ENTER` |

O minigame falha automaticamente se o jogador morrer enquanto o hack está aberto.

---

## Entrypoints para outros recursos

Todos os entrypoints são **eventos de cliente** (`TriggerEvent`), não exports. O recurso não expõe nada no servidor.

### Hack simples

Fluxo completo: abrir a NUI, rodar o minigame e fechar.

```lua
TriggerEvent('mhacking:show')
TriggerEvent('mhacking:start', 5, 30, function(success, remainingTime)
    TriggerEvent('mhacking:hide')

    if success then
        -- hack concluído; remainingTime vem em milissegundos
    end
end)
```

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `solutionlength` | number | Quantidade de blocos da solução |
| `duration` | number | Tempo limite, em segundos |
| `callback` | function | Recebe `(success: boolean, remainingtime: number)`. O `remainingtime` chega em milissegundos |

### Hack sequencial

`mhacking:seqstart` encadeia várias rodadas sem fechar a NUI entre elas, e cuida sozinho do `show` e do `hide`. Aceita number ou table em qualquer um dos dois primeiros parâmetros:

- ambos number: comporta-se como uma rodada única;
- `solutionlength` como table: uma rodada por item, compartilhando o tempo restante entre elas;
- `duration` como table: uma rodada por item, com tempo próprio;
- ambos como table: itera pela maior das duas tables, pareando os índices.

```lua
TriggerEvent('mhacking:seqstart', { 4, 6, 8 }, 60, function(success, remainingTime, isLast)
    if not success then
        -- falhou em alguma rodada
        return
    end

    if isLast then
        -- todas as rodadas concluídas
    end
end)
```

O callback recebe um terceiro argumento (`isLast`) indicando se aquela foi a última rodada da sequência.

### Mensagem na tela

Troca o texto exibido na NUI do hack.

```lua
TriggerEvent('mhacking:setmessage', 'ACESSANDO SERVIDOR...')
```

### Abrir e fechar manualmente

```lua
TriggerEvent('mhacking:show')  -- abre a NUI e captura o foco
TriggerEvent('mhacking:hide')  -- fecha a NUI e devolve o foco
```

---

## Estrutura de arquivos

```
mhacking/
├── mhacking.lua        — eventos show/hide/start/setmessage, callback da NUI e texto de ajuda
├── sequentialhack.lua  — evento mhacking:seqstart, encadeia várias rodadas
├── hack.html           — UI do minigame (HTML/CSS/JS)
├── phone.png           — imagem de fundo da UI
├── snd/                — efeitos sonoros (beep, correct, wrong, fail, finish, start)
└── fxmanifest.lua
```
