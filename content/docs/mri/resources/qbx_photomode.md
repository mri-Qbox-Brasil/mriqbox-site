---
title: Qbx Photomode
---

Modo fotografia: câmera livre com alcance limitado ao redor do personagem, com controle de FOV, roll e profundidade de campo por uma UI de sliders.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Controles](#controles)
7. [Ajustes de câmera (UI)](#ajustes-de-câmera-ui)
8. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
9. [Localização](#localização)
10. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Locale, `lib.addCommand`, `lib.callback`, `lib.addKeybind`, `lib.requestScaleformMovie`, `cache` |
| `qbx_core` | Não | Listado no README do upstream, mas o código não chama nenhum export do `qbx_core` |

---

## Instalação

1. Copie a pasta `qbx_photomode` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure qbx_photomode
   ```

Não há SQL nem itens de inventário.

---

## Permissões (ACE)

O comando de abrir a câmera é registrado com `lib.addCommand(..., { restricted = 'group.admin' })`. O `ox_lib` protege o comando pela ACE `command.<nome do comando>` — com a configuração padrão (`openCommand = 'cam'`), a ACE é `command.cam`.

Para liberar o comando a outro grupo:

```
add_ace group.mod command.cam allow
```

---

## Configuração

Arquivo: `config/client.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `maxDistance` | number | Sim | Distância máxima, em unidades GTA, que a câmera pode se afastar da posição em que o personagem estava ao abrir o modo. Padrão: `25` |
| `openKeybind` | string \| false | Sim | Tecla para abrir/fechar o modo fotografia. Quando `false` (padrão), nenhum keybind é registrado e só resta o comando |
| `openCommand` | string | Sim | Nome do comando de servidor que abre o modo fotografia. Padrão: `cam` |

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/cam` | `group.admin` (ACE `command.cam`) | Abre o modo fotografia; se já estiver aberto, fecha. O nome do comando vem de `openCommand` |

---

## Controles

Enquanto o modo fotografia está ativo, todos os controles normais são desabilitados e substituídos por estes (teclas padrão do GTA V; se o jogador remapeou os controles do jogo, mudam junto):

| Ação | Controle | Tecla padrão |
|---|---|---|
| Girar a câmera | Movimento do mouse | — |
| Frente / trás | 32 / 33 | `W` / `S` |
| Esquerda / direita | 34 / 35 | `A` / `D` |
| Subir / descer | 38 / 44 | `E` / `Q` |
| Mover mais rápido (2x) | 21 | `Shift` |
| Mover mais devagar (0,5x) | 210 | `Alt` |
| Mostrar/ocultar a UI e os botões de ajuda | 74 | `H` |
| Liberar o cursor do mouse para usar os sliders | 25 | Botão direito do mouse (só com a UI visível) |
| Sair do modo fotografia | 202 | `Backspace` |

A câmera é presa a uma esfera de raio `maxDistance` em volta do ponto onde o personagem estava ao abrir o modo — ao ultrapassar o limite, a posição é reprojetada para a borda.

---

## Ajustes de câmera (UI)

A UI (`html/`) envia os valores dos sliders para o cliente via callbacks NUI:

| Slider | Callback NUI | Efeito |
|---|---|---|
| Field of View | `onFovChange` | `SetCamFov` — faixa útil entre 7.6 e 79.5; abre em 43.55 |
| Roll | `onRollChange` | Rotaciona a câmera no eixo de rolagem |
| Depth of Field Start | `onDofStartChange` | `SetCamNearDof` |
| Depth of Field End | `onDofEndChange` | `SetCamFarDof` |
| Depth of Field Strength | `onDofStrengthChange` | `SetCamDofStrength` (valor do slider dividido por 100) |

O DOF usa o modo shallow (`SetCamUseShallowDofMode`) com multiplicador de distância focal fixo em 2.5.

---

## Entrypoints para outros recursos

### Callback `qbx_photomode:client:openCamera`

Alterna o modo fotografia de um jogador. É o mesmo caminho usado pelo comando `/cam`.

```lua
-- servidor
lib.callback('qbx_photomode:client:openCamera', source)
```

---

## Localização

Strings via `ox_lib` locale, em `locales/`:

- `en.json` — inglês
- `fr.json` — francês
- `pt-br.json` — português do Brasil

Idioma ativo pela convar:

```
setr ox:locale "pt-br"
```

As strings da UI (`ui.*`) são entregues ao NUI pelo callback `getLocales`; as demais alimentam o scaleform de botões instrucionais.

---

## Estrutura de arquivos

```
qbx_photomode/
├── client/
│   └── main.lua              — câmera livre, limite de distância, scaleform de botões, callbacks NUI
├── server/
│   └── main.lua              — comando restrito que dispara o callback de abertura
├── config/
│   └── client.lua            — maxDistance, openKeybind, openCommand
├── html/
│   ├── index.html            — UI de sliders
│   ├── main.js               — envio dos valores dos sliders para o cliente
│   ├── style.css
│   └── Oxygen-Regular.ttf
├── locales/
│   ├── en.json
│   ├── fr.json
│   └── pt-br.json
└── fxmanifest.lua
```
