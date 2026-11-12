---
title: "MRI Qelevators (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Sistema de elevadores por zonas: cada andar é uma box zone que teleporta o jogador (ou o veículo dele) para o andar escolhido, com acesso por grupos (cargo mínimo) e personagens, e senha opcional. Os elevadores são criados e editados num painel próprio, que também aparece como aba no mri_Qadmin.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Painel de elevadores](#painel-de-elevadores)
7. [Estrutura de um andar](#estrutura-de-um-andar)
8. [Banco de dados](#banco-de-dados)
9. [Uso pelo jogador](#uso-pelo-jogador)
10. [Logs administrativos](#logs-administrativos)
11. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
12. [Estrutura de arquivos](#estrutura-de-arquivos)
13. [Licença](#licença)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Box zones, textUI, menu de contexto, inputDialog, callbacks, locale |
| `oxmysql` | Sim | Persistência dos elevadores |
| `qbx_core` | Sim | Acesso do jogador (`HasGroup`), listas de empregos e gangues do painel e dados do admin nos logs |
| `InteractSound` | Não | Só para o som "Sino clássico" (`liftSoundBellRing`), que precisa estar na pasta de sons do InteractSound. Os outros sons são nativos do GTA |
| `mri_Qadmin` | Não | Mostra o painel como aba **Elevadores** no `/adm` |

---

## Instalação

1. Copie a pasta `mri_Qelevators` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qelevators
   ```
3. Não há SQL para importar: a tabela `mri_qelevators` é criada no primeiro start, e a coluna `password` é adicionada automaticamente em instalações antigas.
4. Se você já tinha elevadores em um `data/lift.lua`, coloque o arquivo antigo no lugar **antes** do primeiro start: ele é importado para o banco apenas enquanto a tabela estiver vazia. Depois disso o banco passa a ser a fonte da verdade e o `lift.lua` é ignorado.
5. Ajuste o webhook de log (veja [Logs administrativos](#logs-administrativos)).

---

## Permissões (ACE)

O acesso de admin é a ACE `command.elevador`. O `lib.addCommand` dá essa ACE a cada principal de `Config.Permissions` (padrão: `group.admin` e `group.mod`). A mesma ACE protege o comando, todas as escritas no servidor e a aba no mri_Qadmin.

Para liberar outro grupo, some o principal em `Config.Permissions` ou dê a ACE direto:

```
add_ace group.suporte command.elevador allow
```

---

## Configuração

Arquivo: `config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.Data` | tabela | Sim | Começa vazia; o servidor preenche com o banco e os clientes recebem pelo GlobalState. O `data/lift.lua` só entra no banco quando a tabela está vazia |
| `Config.Debug` | bool | Sim | Desenha as box zones, o nome do elevador/andar e uma seta com o heading de cada andar. No jogo, o botão **Mostrar zonas** do painel liga e desliga só para quem clicou |
| `Config.Permissions` | lista | Sim | Principais que recebem a ACE `command.elevador`. Padrão: `{'group.admin', 'group.mod'}` |
| `Config.Sounds` | lista | Sim | Sons de saída e de chegada oferecidos no painel. `interact` toca pelo InteractSound (o sino, padrão); `name`/`set` tocam um som do GTA (`PlaySoundFrontend`). O nome vem do locale `ui.sounds.<id>`; uma entrada própria pode trazer `label` |
| `Config.DefaultSettings` | tabela | Sim | Menu, sons de saída e chegada e marker de um elevador que nunca foi salvo com essas opções. `menu = 'context'` mantém o menu do ox_lib |
| `Config.MarkerDistance` | number | Sim | Distância (metros) em que os markers no chão aparecem. Padrão: 25 |

O webhook do Discord **não** está no config: ele é a constante `WEBHOOK` em `server/log.lua`.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/elevador` | `command.elevador` | Abre o painel de elevadores |

---

## Painel de elevadores

Abre pelo `/elevador`, pelo item **Elevador** do menu do mri_Qbox ou pela aba **Elevadores** do mri_Qadmin.

- À esquerda, a lista de elevadores com busca por nome do elevador ou do andar. O escudo marca elevador com andar de acesso restrito, a chave marca andar com senha.
- No meio, o mapa com um pino por andar (andares no mesmo prédio viram um pino só, com o número de andares). Passar o mouse mostra o elevador, os andares, quem tem acesso, senha e veículo; clicar abre o elevador. O selecionado fica destacado, com a linha ligando os andares distantes.
- À direita, o editor do elevador selecionado: nome e a lista de andares. A ordem dos andares é a ordem do menu do elevador (setas para subir e descer).
- Por andar: nome, acesso, senha e se leva veículo. O acesso junta **grupos** (empregos e gangues do qbx_core, quantos quiser, cada um com cargo mínimo) e **personagens** (escolhidos pelo nome na lista de personagens do servidor, guardados pelo citizenid). Sem nenhum dos dois, o andar é livre. Posição, direção e tamanho da zona não se digitam: são marcados no mundo.
- **Marcar andares no mundo** esconde o painel e desenha nos pés do personagem a caixa da zona (amarela) e uma seta com a direção de chegada. Os andares já marcados aparecem em verde, com o nome. Ande até o ponto e:
  - rodinha do mouse: largura e profundidade (0,5 m por passo);
  - `Shift` + rodinha: altura;
  - `E`: marca o andar ali e segue marcando o próximo (nome automático "Andar N", editável depois);
  - `Backspace`: volta ao painel com os andares marcados.
- **Reposicionar** faz o mesmo para um andar só: `E` grava a nova posição, direção e tamanho; `Backspace` cancela.
- Pela aba do mri_Qadmin funciona igual: o admin fecha durante a marcação e reabre na aba **Elevadores**, com a edição intacta.
- **Ir até lá** teleporta o admin para o andar, já na direção dele.
- **Menu do jogador**: **Clássico** (menu do ox_lib e caixa de senha, o padrão) , **Painel de elevador** (placa com display e botões redondos, teclado numérico para a senha) ou **Direto, sem menu** (só para elevador de 2 andares, como porta de MLO: o E leva direto para o outro ponto; com mais andares, usa o clássico).
- **Som de saída**: toca quando o jogador aperta E pra sair, antes da tela escurecer. Desligado por padrão.
- **Som de chegada**: liga ou desliga e escolhe o som do elevador; **Ouvir** toca o som para o admin.
- **Marker no chão**: liga ou desliga e escolhe tipo, cor e tamanho (seletor com prévia), além de **Flutuar** e **Girar**. Aparece em todos os andares do elevador.
- **Mostrar zonas** liga o modo debug só para o admin que clicou.

Nada vai para o servidor até **Salvar**. Trocar de elevador com alteração pendente pede para descartar ou continuar editando. O servidor rejeita nome vazio, nome de elevador repetido, andar sem nome e dois andares com o mesmo nome.

Salvar grava o elevador inteiro numa transação e atualiza o `GlobalState.mri_Qelevators_data` e o `GlobalState.mri_Qelevators_settings`. Os clientes reagem à mudança do state bag e reconstroem as zonas na hora, sem restart.

---

## Estrutura de um andar

Um elevador é apenas um nome com uma lista de andares. Cada andar é uma linha na tabela e uma box zone no mundo.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `label` | string | Sim | Nome do andar. Precisa ser único dentro do elevador |
| `coords` | `{x, y, z}` | Sim | Ponto de chegada e centro da zona |
| `size` | `{x, y, z}` | Sim | Tamanho da box zone (0.5 a 50 por lado) |
| `rot` | number | Sim | Heading aplicado ao jogador (ou ao veículo) ao chegar, e rotação da zona |
| `car` | bool | Sim | Se `true` e o jogador estiver em um veículo, o veículo é teleportado junto |
| `access` | tabela | Não | `{ groups = { { name, grade } }, citizenids = { ... } }`. Entra quem tiver um dos grupos (job, gang ou outro grupo do qbx_core) do `grade` pra cima, ou for um dos personagens. Listas vazias = livre |
| `job`, `gang` | string | Não | Formato antigo (um emprego e uma gangue). Ainda aceito no `data/lift.lua` e convertido em `access` |
| `password` | string | Não | Senha pedida antes de viajar. Vazio = sem senha |

---

## Banco de dados

Tabela `mri_qelevators`, criada automaticamente. Cada linha é **um andar**; o elevador é a coluna `name`, repetida entre os andares dele. A ordem dos andares é a do `id`.

| Coluna | Tipo | Descrição |
|---|---|---|
| `id` | INT AUTO_INCREMENT | Chave primária |
| `name` | VARCHAR(64) | Nome do elevador |
| `label` | VARCHAR(64) | Nome do andar |
| `x`, `y`, `z` | DOUBLE | Coordenadas do andar |
| `size_x`, `size_y`, `size_z` | DOUBLE | Tamanho da box zone |
| `rot` | DOUBLE | Heading |
| `car` | BOOLEAN | Elevador de veículo |
| `job`, `gang` | VARCHAR(64) | Formato antigo; lidos só quando `access` está vazio, gravados vazios |
| `access` | LONGTEXT | JSON com `groups` e `citizenids` (coluna criada sozinha em tabelas antigas) |
| `password` | VARCHAR(64) | Senha do andar |

Tabela `mri_qelevators_settings`, também criada automaticamente: uma linha por elevador, com `name` (chave) e `settings` (JSON com `menu`, `sound`, `departure` e `marker`). Elevador sem linha usa `Config.DefaultSettings`.

---

## Uso pelo jogador

1. Ao entrar na zona de um andar, aparece o textUI `[E] <andar> (<elevador>)`. Andares com senha mostram um cadeado. Se o elevador tiver marker, ele aparece no chão de cada andar.
2. `E` abre a escolha de andar no estilo do elevador:
   - **Clássico** (padrão): menu do ox_lib; o andar em que o jogador está aparece desabilitado; andar com senha pede a senha num diálogo.
   - **Direto** (2 andares): o textUI já mostra o destino e o E leva direto, pedindo a senha se o destino tiver.
   - **Painel de elevador**: placa com display do andar atual e um botão redondo por andar (as teclas 1 a 9 escolhem direto); andar com senha abre o teclado numérico, que também aceita o teclado físico.
3. Só aparecem andares a que o jogador tem acesso: andar sem grupo e sem personagem é livre; com algum, exige um dos grupos (do cargo mínimo pra cima, pelo `HasGroup` do qbx_core) ou ser um dos personagens.
4. A tela escurece, o jogador (e o veículo, se `car` estiver ligado) é teleportado, o som do elevador toca (se ligado) e a tela volta.

Acesso e senha são conferidos no servidor (`mri_Qelevators:server:travel`), que também exige o jogador perto de um andar do elevador. A senha nunca vai para os clientes: o `GlobalState` só diz se o andar tem senha (`locked`).

---

## Logs administrativos

Criar, editar e excluir elevador é registrado no console e enviado como embed para o Discord.

A URL do webhook está **hard-coded** na constante `WEBHOOK`, no topo de `server/log.lua`. Troque-a pela do seu servidor, ou deixe a string vazia para desativar o envio. O embed inclui nome, citizenid, primeiro identificador, IP e coordenadas do admin.

---

## Entrypoints para outros recursos

O recurso não expõe exports. O que dá para consumir de fora:

### GlobalState

Todos os elevadores ficam replicados em um state bag global; qualquer recurso no client pode ler, sem callback:

```lua
local elevadores = GlobalState.mri_Qelevators_data
-- elevadores['nome_do_elevador'] = { { label = ..., coords = ..., access = { groups, citizenids }, locked = true }, ... }
local opcoes = GlobalState.mri_Qelevators_settings
-- opcoes['nome_do_elevador'] = { menu, sound = { enabled, id }, departure = { enabled, id }, marker = { enabled, type, color, scale, bob, rotate } }
```

### Abrir o menu de um elevador

```lua
-- client: abre o painel de um elevador pelo nome (a lista de andares antiga também é aceita)
TriggerClientEvent('mri_Qelevators:client:lift', source, 'nome_do_elevador')
```

### Abrir o painel

```lua
-- server: abre o painel para um admin
TriggerClientEvent('mri_Qelevators:client:open', source)
```

### Callbacks do painel

Todos passam pela ACE `command.elevador`:

| Callback | Retorno |
|---|---|
| `mri_Qelevators:server:canManage` | `true` se o jogador pode gerenciar |
| `mri_Qelevators:server:list` | Lista `{ name, floors, settings }` ordenada por nome |
| `mri_Qelevators:server:save` | Recebe `{ originalName, name, floors, settings }`; devolve `{ ok, error?, elevator? }` |
| `mri_Qelevators:server:remove` | Recebe o nome; devolve `{ ok, error? }` |
| `mri_Qelevators:server:groups` | Empregos e gangues do qbx_core numa lista, cada um `{ value, label, kind, grades }` |
| `mri_Qelevators:server:characters` | Personagens do servidor, `{ value = citizenid, label = nome }` |

E o do jogador, sem ACE: `mri_Qelevators:server:travel` recebe `(elevador, índice do andar, senha?)` e devolve `{ ok, error?, floor? }` (`error`: `missing`, `too_far`, `forbidden`, `wrong_password`).

---

## Estrutura de arquivos

```
mri_Qelevators/
├── config.lua              : debug, permissões, sons, opções padrão e distância dos markers
├── shared/
│   └── access.lua          : quem pode usar o andar (grupos e citizenids)
├── data/
│   └── lift.lua            : elevadores de exemplo, importados só com a tabela vazia
├── client/
│   ├── main.lua            : sync pelo GlobalState, evento de abrir o menu e ciclo de vida
│   ├── elevator.lua        : zonas, textUI, menu (ox_lib, painel ou direto), senha, sons, markers e teleporte
│   ├── panel.lua           : painel de admin (NUI) e teleporte do admin
│   ├── placement.lua       : marcação dos andares no mundo (caixa, seta, rodinha e E)
│   └── draw.lua            : texto, caixa e seta em 3D
├── server/
│   ├── main.lua            : boot, GlobalState, comando, callbacks e plugin do mri_Qadmin
│   ├── storage.lua         : tabelas, migração e gravação no banco
│   ├── rules.lua           : validação de andares e opções
│   └── log.lua             : log das ações no console e no Discord
├── locales/                : textos (pt-br, en)
├── html/                   : build do painel
├── LICENSE
└── fxmanifest.lua
```

---

## Licença

O código deste recurso é MIT com Commons Clause: pode usar, modificar e redistribuir à vontade, mas não pode vender, nem a versão original nem uma modificada. Texto completo em [LICENSE](LICENSE).
