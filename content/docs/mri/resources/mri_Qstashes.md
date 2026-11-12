---
title: "MRI Qstashes (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Baús do `ox_inventory` criados no jogo: o admin abre o painel, dá um nome, marca o lugar mirando no móvel e escolhe quem pode abrir. O baú passa a existir para todos na hora, sem restart.

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissão](#permissão)
4. [O painel](#o-painel)
5. [Criando um baú](#criando-um-baú)
6. [Acesso](#acesso)
7. [Baú por personagem](#baú-por-personagem)
8. [Log no Discord](#log-no-discord)
9. [Baús de jogador](#baús-de-jogador)
10. [Ajustes](#ajustes)
11. [Baús de outros scripts](#baús-de-outros-scripts)
12. [Vindo da v1](#vindo-da-v1)
13. [Banco de dados](#banco-de-dados)
14. [Exports e eventos](#exports-e-eventos)
15. [Configuração](#configuração)
16. [Localização](#localização)

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Callbacks, comando, locale, diálogo de senha |
| `oxmysql` | Sim | Tabelas `mri_qstashes_*` (veja [Banco de dados](#banco-de-dados)) |
| `ox_inventory` | Sim | Registro dos baús, abertura e hooks que conferem o acesso e mandam o log |
| `ox_target` | Sim | Cada baú é uma esfera do `ox_target` (1 m) em volta do ponto marcado |
| `qbx_core` | Para acesso por grupo e personagem, e para baús de jogador | Sem ele, baú com essas regras não abre para ninguém (aviso no console), e o item de baú de jogador não faz nada |
| `mri_Qadmin` | Não | Quando ligado, o painel aparece como a aba **Baús** |

## Instalação

1. Coloque a pasta `mri_Qstashes` em `resources/`.
2. No `server.cfg`, depois do `ox_inventory` e do `ox_target`: `ensure mri_Qstashes`.
3. Entre no jogo como admin e use `/stashes`.

Não há SQL para importar: as tabelas são criadas no primeiro start.

## Permissão

O painel, o comando e todas as ações do servidor usam a mesma ACE: `command.stashes`. O `ox_lib` dá essa ACE aos grupos de `Config.Permissions` (padrão `group.admin`).

## O painel

- **Lista** à esquerda, com busca pelo nome. O escudo amarelo indica baú com regra de acesso; a chave, baú com senha; as duas pessoas, baú por personagem. Embaixo, em **De outros scripts**, ficam os baús que outros resources criaram.
- **Mapa** no meio, com um pino por baú. Clique no pino para abrir o baú no editor.
- **Editor** à direita, em três abas:
  - **Baú**: objeto, posição no mundo, um baú por personagem, espaços, peso máximo e texto do olhinho.
  - **Acesso**: quem abre, item exigido e senha.
  - **Log**: webhook do Discord.
- **Mostrar zonas** desenha a área do olhinho de cada baú no jogo, para conferir a posição.

Admins também veem a opção **Editar baú (admin)** no olhinho de cada baú, que abre o painel já nele.

## Criando um baú

1. **Novo baú**: já vem com o nome "Baú 1" (o primeiro número livre); troque se quiser.
2. **Objeto** (opcional): escolha pela foto um cofre, armário ou caixa para ser o próprio baú. Em **Nenhum**, o baú fica num móvel que já existe no mapa.
3. **Marcar no mundo**: o painel some e a mira mostra onde o baú vai ficar.
   - Sem objeto, uma bolinha: mire no móvel onde o olhinho deve aparecer.
   - Com objeto, uma cópia transparente dele: mire no chão; setas e roda do mouse giram.
   - E (ou clique) marca; Backspace cancela.
   - Os outros baús aparecem em verde, com o nome, para não sobrepor.
4. Escolha espaços, peso e as regras de acesso.
5. **Criar baú**.

O objeto é criado em cada jogador, fora da rede (funciona com `sv_entityLockdown`), e o olhinho fica nele.

## Acesso

| Regra | Como funciona |
|---|---|
| Empregos e gangues | Escolhidos de lista, cada um com cargo mínimo. Basta estar em um deles |
| Personagens | Escolhidos de lista pelo nome. Basta ser um deles |
| Item exigido | O jogador precisa ter o item. O item não é gasto |
| Senha | Pedida ao abrir. Senha errada avisa e espera um pouco antes de deixar tentar de novo |

Sem nenhum grupo nem personagem, qualquer um abre. Grupos e personagens valem como "ou". Item e senha somam: com os dois, o jogador precisa ter o item **e** saber a senha, além de passar no acesso.

Tudo é conferido no servidor, no hook `openInventory` do `ox_inventory`, inclusive a distância. A senha certa libera aquele baú por alguns segundos só para quem digitou.

## Baú por personagem

Com **Um baú por personagem** ligado, o ponto é um só, mas cada personagem abre o seu baú, como um armário de vestiário. As regras de acesso valem igual. Só a staff consegue abrir o baú de outro personagem (o servidor recusa o pedido de qualquer outro jogador).

## Log no Discord

Cada baú pode ter seu webhook, na aba **Log**. Cada item guardado ou retirado gera uma mensagem com o baú, o personagem, o Discord, o Citizen ID, o item, a quantidade, as coordenadas e a metadata. O endereço do webhook nunca vai para os clientes.

## Baús de jogador

Na aba **Dos jogadores** o admin cria **tipos** de baú que os próprios jogadores colocam no mundo.

1. **Novo tipo**: já vem com o nome "Baú portátil 1".
2. **Item que coloca**: o item que o jogador usa para colocar o baú. Use um item feito só pra isso, sem efeito de comer ou beber: item com `consume` no `ox_inventory` não chama o baú. Cada item serve a um tipo só.
3. **Objeto**: escolhido pela foto; é o que aparece no mundo.
4. **Níveis** (até 5): cada um com espaços e peso. Do nível 2 em diante, o preço em dinheiro e, se quiser, um material com a quantidade.
5. **Criar tipo**.

No jogo:

- **Colocar**: o jogador usa o item e uma cópia transparente do objeto segue a mira, até 8 m dele. Setas e roda do mouse giram, E coloca, Backspace cancela. O item só é gasto quando ele confirma.
- **Olhinho do dono**: **Abrir baú**, **Melhorar baú** (mostra o próximo nível e o preço antes de cobrar; o dinheiro sai da carteira e, se não der, do banco) e **Recolher baú**. Recolher só vale com o baú vazio e devolve o item com o nível que ele tinha.
- Ninguém além do dono abre o baú. Admins veem **Editar baú (admin)**, que abre o painel nele.
- O objeto só existe perto do jogador (60 m) e fora da rede, então funciona com `sv_entityLockdown`.

No painel, o mapa mostra cada baú colocado. Clicando nele: dono, tipo, nível e capacidade, com **Ir até lá**, **Ver o que tem dentro** (de qualquer distância) e **Apagar o baú** (apaga com os itens). Um tipo com baús colocados não pode ser excluído. Tirar um nível deixa os baús que estavam nele no último que sobrar.

Quantos baús cada personagem pode ter colocados fica na aba **Ajustes**.

## Ajustes

A aba **Ajustes** guarda os padrões de baú novo (espaços, peso máximo e o texto do olhinho dos baús que não têm texto próprio) e quantos baús de jogador cada personagem pode colocar. Vale na hora, sem restart.

## Baús de outros scripts

Outros resources podem mostrar os baús deles no painel, pelo export `SetExternalStashes`. Eles aparecem na lista em **De outros scripts** e no mapa com o ícone de corrente, só para consulta: nome, quem abre, se é por personagem e o inventário do `ox_inventory`. Quem edita é o resource dono. Quando ele é uma aba do mri_Qadmin, o painel mostra o botão para abrir essa aba.

Na base da MRI, mandam os seus:

- **mri_Qbossmenu**: os baús de cada organização.
- **mri_Qbox**: os baús do `data/stashes.lua` do `ox_inventory`, editados no Editor do inventário.

Quando o resource dono para, os baús dele somem do painel.

## Vindo da v1

No primeiro start, se a tabela estiver vazia e houver um `data.json` da v1 na pasta do resource, os baús são importados:

- O id fica igual, então cada baú do `ox_inventory` (`mri_Qstashes<id>`) mantém os itens que já tinha.
- Emprego e gangue viram grupos, com o cargo da v1 como cargo mínimo nos dois.
- Citizen ID, item, senha, texto do olhinho e webhook passam como estavam. O lugar vira um ponto, como os baús novos.
- Baú salvo como caixa antes desta versão continua como caixa até alguém marcar de novo; aí vira ponto.

A importação roda uma vez só (fica marcada no banco). O `data.json` pode ser apagado depois.

Duas diferenças de comportamento em relação à v1: um baú com emprego e gangue juntos agora abre para quem está em um ou no outro (antes pedia os dois), e as regras de Citizen ID e de item, que a v1 não aplicava, passam a valer.

## Banco de dados

| Tabela | O que guarda |
|---|---|
| `mri_qstashes_stashes` | Um baú por linha: nome, posição (tamanho 0 = ponto), objeto, capacidade, acesso (JSON), por personagem, item, senha, texto do olhinho e webhook |
| `mri_qstashes_settings` | Os padrões da aba Ajustes e a marca da importação da v1 |
| `mri_qstashes_kinds` | Os tipos de baú de jogador: nome, item, objeto e níveis (JSON) |
| `mri_qstashes_placed` | Um baú de jogador colocado por linha: tipo, dono (Citizen ID), posição, direção e nível. O inventário dele é `mri_Qstashes_p<id>` |

Os itens de cada baú continuam na tabela do `ox_inventory`.

## Exports e eventos

Servidor:

```lua
exports.mri_Qstashes:GetStashes()            -- lista de baús (com senha e webhook)
exports.mri_Qstashes:GetStash(id)
exports.mri_Qstashes:SaveStash(stash)        -- sem id cria, com id edita; devolve ok, erro, baú
exports.mri_Qstashes:RemoveStash(id)         -- devolve ok, erro
exports.mri_Qstashes:GetInventoryId(id)      -- 'mri_Qstashes<id>', para usar no ox_inventory
exports.mri_Qstashes:SetExternalStashes(list, info) -- baús de outro resource no painel (abaixo)
```

`SetExternalStashes` troca a lista inteira do resource que chama:

```lua
exports.mri_Qstashes:SetExternalStashes({
    { id = 'police_stash_1', label = 'Arsenal', coords = vec3(452.3, -991.4, 30.7), groups = { 'police' }, personal = false },
}, { label = 'Organizações', plugin = 'bossmenu' }) -- plugin: id da aba do mri_Qadmin que edita, opcional
```

Formato do baú no `SaveStash`:

```lua
{
    label = 'Cofre da Polícia',
    coords = { x = 452.3, y = -991.4, z = 30.7 },
    size = { x = 1.5, y = 1.0, z = 2.0 },
    rot = 90.0,
    slots = 100,
    weight = 2000, -- kg
    access = { groups = { { name = 'police', grade = 2 } }, citizenids = {} },
    personal = false, -- true: um baú por personagem
    item = '',
    password = '',
    targetLabel = '',
    webhook = '',
}
```

Eventos de servidor:

| Evento | Quando | Dados |
|---|---|---|
| `mri_Qstashes:server:changed` | A lista de baús mudou | Nenhum |
| `mri_Qstashes:server:moved` | Um item entrou ou saiu de um baú | `{ id, label, access, personal, inventoryId, source, item, count, metadata, deposit }` |

O `moved` sai do hook `swapItems`, antes de a troca acontecer. O mri_Qbossmenu usa esse evento para contar as metas das organizações.

## Configuração

`config.lua` guarda só o que não vai para o painel:

| Campo | Padrão | Descrição |
|---|---|---|
| `Config.Permissions` | `{ 'group.admin' }` | Grupos que recebem a ACE `command.stashes` |
| `Config.Defaults` | 50 espaços, 1000 kg, 3 baús por jogador | Primeiros valores da aba Ajustes; depois do primeiro start, quem manda é o painel |
| `Config.Debug` | `false` | Começa com a área de cada baú desenhada |
| `Config.Distance` | `2.5` | Distância do olhinho até o baú |
| `Config.PropImages` | CDN da MRI | Onde o painel busca a foto de cada objeto (`<modelo>.webp`); vazio mostra um ícone |

## Localização

Textos do jogo e do painel em `locales/pt-br.json` e `locales/en.json`, pela convar `ox:locale`.
