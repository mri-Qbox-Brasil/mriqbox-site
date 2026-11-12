---
title: "MRI Qblips (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Gerenciador de blips do mapa com painel próprio. Cria, edita, duplica e apaga blips pelo jogo, com lista e mapa lado a lado com o editor, e grava tudo no banco. O painel segue o tema da suíte MRI e também abre como aba do mri_Qadmin.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Uso](#uso)
4. [Ícones próprios](#ícones-próprios)
5. [Legenda do mapa](#legenda-do-mapa)
6. [Destino e rota no asfalto](#destino-e-rota-no-asfalto)
7. [Para outros scripts](#para-outros-scripts)
8. [Permissão](#permissão)
9. [Blips por emprego ou gangue](#blips-por-emprego-ou-gangue)
10. [Convars](#convars)
11. [Banco de dados](#banco-de-dados)
12. [Painel no mri_Qadmin](#painel-no-mri_qadmin)
13. [Atualizando de versões antigas](#atualizando-de-versões-antigas)
14. [Licença](#licença)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `oxmysql` | Sim | Guarda os blips na tabela `mri_Qblips` |
| `ox_lib` | Sim | Callbacks, idioma e texto na tela ao marcar um blip |
| `qbx_core`, `qb-core` ou `es_extended` | Não | Só para blips restritos a emprego ou gangue |
| `mri_Qadmin` | Não | Abre o gerenciador como aba do painel admin |

---

## Instalação

1. Coloque a pasta `mri_Qblips` em `resources/`.
2. Garanta que ela inicia **depois** do `oxmysql` e do `ox_lib` no `server.cfg`:
   ```
   ensure oxmysql
   ensure ox_lib
   ensure mri_Qblips
   ```
3. A tabela é criada sozinha na primeira subida. O arquivo `db/blips.sql` traz um conjunto inicial de blips (lojas, armas, bebidas, pesca e petshop) e é opcional.

---

## Uso

O comando `/blip` abre o gerenciador.

- **Lista, mapa e editor lado a lado:** à esquerda, todos os blips, com busca por nome, ID ou sprite e filtros (ativos, desativados, restritos); no meio, o mapa (clique num blip para editá-lo); à direita, o editor.
- **Editor:** à direita, o blip selecionado. Ícone e cor (com busca e prévia), tamanho, opacidade, alcance curto, só no mapa grande, contorno, marcador, piscar, desativar, grupos e posição.
- **Posição:** digite as coordenadas, use **Minha posição**, arraste o marcador no mapa ou use **Marcar no jogo** (o painel some, você anda até o lugar e aperta **E**; **Backspace** cancela).
- **Atalhos da lista:** ir até o blip, duplicar e apagar (o apagar pede uma segunda confirmação).
- **Copiar e colar estilo:** leva ícone, cor, tamanho e exibição de um blip para outro.

Se você trocar de blip com alterações não salvas, o painel pergunta antes de descartar. As mudanças valem na hora para todos os jogadores online.

---

## Ícones próprios

Além dos ícones do GTA, dá para enviar imagens próprias pelo editor: na seção **Ícone**, aba **Próprios**, clique no botão de imagem e escolha um PNG, WEBP, JPG ou SVG. A imagem é reduzida para 64×64 e guardada no banco; ela vale na hora para todos os jogadores, sem reiniciar nada.

- Cabem até 32 ícones próprios.
- Use a cor branca no blip para a imagem manter as cores originais (o jogo tinge o ícone com a cor do blip).
- Para apagar um ícone, selecione-o na aba **Próprios** e use **Apagar ícone**. Só dá para apagar quando nenhum blip salvo o usa: troque o ícone desses blips antes.

Como funciona: o jogo desenha todos os ícones de blip a partir de uma folha de texturas. Cada jogador abre uma página escondida (DUI) que redesenha essa folha com os ícones próprios por cima de ícones de história e de modos online que servidores de RP não usam (famílias do Michael, Trevor e Franklin, golpes da história e personagens como Barry, Dom e Josh). A vaga de um ícone nunca é um sprite que algum blip salvo usa: se um blip passar a usar esse sprite, o ícone muda de vaga sozinho. Os ícones originais que viram vaga deixam de aparecer como eram, inclusive em blips criados por outros resources.

Só um resource por vez pode substituir essa folha. Se outro resource também trocar `blips_texturesheet_ng`, vale o que iniciar por último.

---

## Legenda do mapa

No mapa do menu de pausa, a lista nativa da direita dá lugar a uma legenda própria:

- **Onde você está:** bairro e rua no topo, e o aviso de GPS ativo.
- **Todos os blips do mapa**, inclusive os de outros resources, com o **nome real** que cada script deu, a quantidade e a distância até o mais próximo.
- **Clicar** num grupo destaca o blip no mapa e centraliza nele, como a lista do GTA faz.
- **Sobre o cartão vale o cursor do navegador**, leve e com a mãozinha nos botões; fora dele, o cursor do mapa.
- **Setas** percorrem os blips do grupo (1/6, 2/6...).
- **Clicar de novo** no grupo selecionado marca destino nele.
- **Busca** e ordem por **Mais perto** ou **Nome**.
- **Olho** mostra ou oculta o grupo no mapa e no minimapa. A escolha fica salva para o jogador; **Mostrar todos** desfaz.
- **Recolher** deixa só uma pílula com o total.

Os nomes reais vêm da tela do mapa do jogo com um canal nosso a mais (`stream/pause_menu_pages_map.gfx`), que deixa ler a lista do próprio jogo. Enquanto a legenda está na tela, a lista nativa fica escondida. Só um resource por servidor pode enviar esse arquivo.

Se a tela do mapa não responder (outro resource enviando o mesmo arquivo ou GTA V Enhanced), a legenda passa sozinha para o modo de varredura: lista todos os blips pelo tipo de ícone, com nomes de um dicionário em `locales/*.json` (chave `sprites`). Nesse modo, quem tem `command.blipcreator` renomeia um tipo direto na legenda (lápis, Enter salva, vazio volta ao padrão).

Para voltar à legenda nativa: no painel (`/blip` ou aba Blips do mri_Qadmin), engrenagem › **Legenda própria** desligada. Vale na hora para todos.

---

## Destino e rota no asfalto

O mri_Qblips faz o papel do antigo `pickle_waypoints` e vai além dele.

- **Marcador de destino:** quando você marca um destino no mapa, uma placa fica de pé no lugar, virada para a câmera, com a distância e o nome. Ela cresce com a distância para continuar legível de longe e some devagar quando você chega perto.
- **Rota no asfalto:** o caminho do GPS aparece pintado na rua, colado no chão (inclusive em ladeira e curva, sem pular para cima de viaduto), com o desenho correndo em direção ao destino.
- **Cor do destino:** o roxo padrão do GTA pode virar a cor da suíte (`mri:color`) ou uma cor escolhida. Quem decide é o admin, no botão de engrenagem do gerenciador (`/blip`), e vale para todos na hora.
- **Enviar destino:** no gerenciador, o botão de navegação manda o destino marcado no seu mapa para um jogador ou para todos, com um nome e a opção de sumir na chegada.

### Painel do jogador (F9 › Waypoints)

Cada jogador ajusta o próprio visual, guardado no computador dele. O mundo continua visível atrás do painel, então cada mudança aparece na hora na rua.

| Aba | Opções |
|---|---|
| Rota no asfalto | ligar ou desligar; estilo (seta, seta em relevo, seta dupla, flecha, traço, ponto, losango, lâmina, agulha, faixa, pulso); tamanho; espaçamento; movimento; opacidade; quanto da rota aparece à frente; cor do servidor ou cor própria |
| Destino | ligar ou desligar o marcador no próprio destino; estilo (checkpoint, compacto, feixe, pilar); tamanho; mostrar a distância; anel no chão perto do destino |

Pontos enviados por scripts aparecem sempre, mesmo com o marcador do próprio destino desligado.

Outro resource abre esse painel com o evento local `mri_Qblips:client:openStudio` ou o export `OpenGpsStudio`.

---

## Para outros scripts

Exports do lado do cliente:

| Export | O que faz |
|---|---|
| `AddDestination(label, coords, settings)` | Cria um ponto e devolve o id. `settings`: `icon` (URL da imagem), `color` (`{r, g, b}`), `blipId`, `blipColor`, `clearEnter` (some na chegada), `route` (liga o GPS até ele) |
| `RemoveDestination(id)` | Apaga o ponto |
| `GetDestination(id)` | Devolve nome, coordenadas e opções |
| `UpdateDestinationCoords(id, coords)` | Move o ponto |
| `UpdateDestinationSettings(id, settings)` | Troca ícone e cor |

Do servidor: `TriggerClientEvent('mri_Qblips:client:addDestination', source, label, coords, settings)`.

**Compatível com o pickle_waypoints:** o resource se apresenta como `pickle_waypoints` e responde aos exports `AddWaypoint`, `RemoveWaypoint`, `GetWaypoint`, `UpdateWaypointCoords`, `UpdateWaypointSettings` e ao evento `pickle_waypoints:addWaypoint`. Scripts feitos para ele funcionam sem mudança.

---

## Permissão

Só abre o gerenciador, salva blips, muda a cor do destino e envia destinos quem tem a ACE `command.blipcreator`:

```
add_ace group.admin command.blipcreator allow
```

O servidor confere a permissão em toda gravação, não só no comando.

---

## Blips por emprego ou gangue

Na seção **Acesso** do editor, adicione os empregos ou gangues que podem ver o blip e a nota mínima de cada um. Sem nenhum grupo, o blip aparece para todos.

Com `qbx_core` ou `qb-core` vale emprego e gangue; com `es_extended`, só emprego. O blip aparece ou some assim que o jogador muda de emprego ou de gangue.

---

## Convars

| Convar | Padrão | O que faz |
|---|---|---|
| `mri:color` | `#00E699` | Cor de destaque do painel (muda ao vivo) |
| `mri:backgroundColor` | vazio | Cor de fundo do painel (muda ao vivo) |
| `ox:locale` | `pt-br` | Idioma (`pt-br` ou `en`) |
| `mri_Qblips:customLegend` | `1` | Só o valor inicial da **Legenda própria**, até alguém salvar no painel |
| `mri_Qblips:legendLimit` | `90` | Só o valor inicial de **Blips na lista do jogo**, até alguém salvar no painel |

Tema, opacidade, fonte e arredondamento seguem o `/uiconfig` do ox_lib.

A legenda lateral do mapa grande do GTA aguenta só uns cem itens; acima disso, todos os blips do mapa ficam piscando. Com a legenda nativa, o painel (engrenagem › **Blips na lista do jogo**: 60, 90, 120 ou Todos) põe nela só os blips mais próximos do jogador. Nenhum blip some do mapa, só da lista lateral.

---

## Banco de dados

Tabela `mri_Qblips`, com `id`, `name` e `data` (JSON com coordenadas, sprite, cor, tamanho, grupos e opções de exibição), e tabela `mri_Qblips_icons` com os ícones próprios (nome, vaga e imagem). As duas são criadas automaticamente se não existirem.

---

## Painel no mri_Qadmin

Com o `mri_Qadmin` rodando, o gerenciador aparece como a aba **Blips** do painel, para quem tem `command.blipcreator`. O registro é automático, inclusive se o Qadmin reiniciar depois. Dentro do Qadmin a opção **Marcar no jogo** não aparece; use **Minha posição** ou o mapa.

---

## Atualizando de versões antigas

A versão 2 foi reescrita do zero. Basta trocar a pasta: a tabela e o formato gravado no banco continuam os mesmos, então os blips já criados carregam sem migração.

- O resource exige o `ox_lib`.
- O painel agora fica em `html/` (antes era `web/build/`). Apague a pasta antiga antes de copiar a nova.
- O resource envia um arquivo do jogo (`stream/`). Depois de atualizar, reinicie o servidor ou reconecte; reiniciar só o resource com jogadores dentro pode fechar o jogo deles.
- O comando `/blip` depende só da ACE `command.blipcreator`.
- A partir da 2.1, o mri_Qblips substitui o `pickle_waypoints`: tire o `ensure pickle_waypoints` do `server.cfg` e apague a pasta. Os scripts que usavam ele continuam funcionando.
- Instalações novas não trazem mais os blips de coleta seletiva e reciclagem no `db/blips.sql`. Quem já tem esses blips no banco pode apagá-los pelo próprio gerenciador.

---

## Licença

MIT com Commons Clause: uso e modificação livres, venda proibida. Veja o arquivo [LICENSE](LICENSE).
