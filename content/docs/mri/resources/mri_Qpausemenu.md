---
title: "MRI Qpausemenu (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

O menu de pausa da cidade no lugar do ESC. A câmera entra num retrato do personagem, com luz no rosto, fundo desfocado e câmera na mão, e ao lado aparece uma grade com o perfil, o local e a hora, as novidades da cidade e atalhos. Dentro da pausa há páginas com ranking, estatísticas, habilidades, propriedades, prêmio diário e resgate de códigos.

Tudo se ajusta pelo painel `/adminpausemenu`, que também aparece como aba dentro do mri_Qadmin, sem editar arquivo.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Teclas](#teclas)
4. [Grade e faixa](#grade-e-faixa)
5. [Páginas](#páginas)
6. [Painel de administração](#painel-de-administração)
7. [Para desenvolvedores](#para-desenvolvedores)
8. [Banco de dados](#banco-de-dados)
9. [Licença](#licença)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | Personagem, emprego, dinheiro e o tempo de sessão |
| `ox_lib` | Sim | Callbacks, locale e o tema da suíte (`/uiconfig`) |
| `oxmysql` | Sim | Tabelas próprias `mri_qpausemenu_*` |
| `ox_inventory` | Não | Itens dos prêmios e nome da arma nos confrontos |
| `cw-rep` | Não | Página Habilidades e o ranking de habilidades |
| `ps-housing` | Não | Página Propriedades |
| `mri_Qadmin` | Não | Painel como aba do admin |

Bloco que depende de um resource parado some sozinho da grade.

---

## Instalação

1. Coloque a pasta `mri_Qpausemenu` em `resources/` e garanta que ela inicia depois do `qbx_core`:
   ```
   ensure mri_Qpausemenu
   ```
2. Dê a permissão do painel a quem administra. Quem tem `command` (o grupo `admin` padrão) já pode:
   ```
   add_ace group.mod mri_Qpausemenu.admin allow
   ```

As tabelas são criadas na primeira subida. A grade padrão já vem com as páginas, o mapa e os atalhos dos resources da base MRI.

---

## Teclas

| Tecla | Teclado | Controle |
|---|---|---|
| Abrir a pausa | ESC | Start |
| Mapa do GTA direto | P | |
| Andar pela grade | Setas | Direcional |
| Escolher | Enter | A |
| Voltar e fechar | ESC ou Backspace | B |

A pausa não abre por cima de outra tela com foco (celular, inventário), durante tela preta ou troca de personagem. A tecla que fechou outra tela não abre a pausa em seguida.

Mapa, Configurações e Teclas do GTA abrem por cima e, ao fechar, voltam para a pausa.

---

## Grade e faixa

A grade fica à direita, em 3 colunas, dividida em grupos com título. A faixa é a coluna de botões redondos na borda: o primeiro flutua no topo e o último fica embaixo.

**Blocos especiais**

- **Perfil:** nome, emprego, gangue, dinheiro, telefone, CID, ID e tempo de sessão. Clicar abre o Perfil completo.
- **Local e hora:** rua, bairro, hora do jogo e clima.
- **Novidades:** a última nota de atualização; clicar abre todas.
- **Mapa:** bússola ao vivo e a distância até o destino marcado.

**Ações de um bloco**

| Ação | O que faz |
|---|---|
| Abrir página da pausa | Abre uma página no lugar da grade |
| Abrir link | Abre um site no navegador do jogador (Discord, regras, loja) |
| Comando | Fecha a pausa e roda o comando |
| Apertar tecla de outro script | Aperta e solta o comando de tecla (`+cmd` e `-cmd`) de outro resource |
| Evento no cliente / no servidor | Dispara o evento com a pausa fechada |
| Export | Chama `resource:funcao` |
| Abrir o mapa, Configurações do GTA, Lista de teclas do FiveM | Telas do GTA, voltando para a pausa |
| Fechar a pausa | Fecha |
| Desconectar (segurando) | Sai do servidor depois de segurar o botão |

Cada bloco pode ter ainda ícone, selo, tamanho (normal ou largo), a tecla que aparece no canto (lida da configuração do próprio jogador), o resource de que depende, empregos e gangues que veem, e "só staff".

---

## Páginas

Abrem dentro da pausa, no lugar da grade, e se navegam pelo teclado e pelo controle. O bloco de cada página mostra um dado ao vivo: sua posição no ranking, a proporção de abates por morte, o prêmio de hoje, a melhor habilidade.

- **Perfil completo:** nascimento, nacionalidade, tipo sanguíneo, telefone, tempo jogado, sessões, reputação nos empregos e licenças.
- **Estatísticas:**
  - abates e mortes;
  - distância de veículo e a pé;
  - a maior velocidade, com o nome do carro;
  - os últimos confrontos com a arma, que se desligam no painel.
- **Ranking:** horas jogadas, abates, distância e habilidades (soma do XP no cw-rep). Mostra o top da cidade e a sua posição mesmo fora dele. É recalculado a cada 5 minutos.
- **Habilidades:** nível e XP de cada habilidade e reputação do cw-rep.
- **Propriedades:** casas e apartamentos do ps-housing que são seus ou de que você tem a chave. "Marcar" põe o endereço no mapa.
- **Diário:** um prêmio por dia, em sequência. Perdeu um dia, a sequência volta pro primeiro. O prêmio só sai se couber na mochila.
- **Código:** resgate de códigos de eventos, lives e parcerias, com o histórico do que já foi resgatado.

**Como os números são contados**

- O tempo jogado é contado pelo servidor, do login à saída, e salvo a cada 5 minutos.
- Mortes e abates contam qualquer causa, sem depender do script de hospital. O servidor confere quem matou: precisa estar online e a menos de 400 m.
- A distância é medida no cliente e conferida no servidor, com teto pelo tempo passado. Teleporte não soma.

---

## Painel de administração

`/adminpausemenu`, ou a aba "Menu de pausa" no mri_Qadmin. Abas:

- **Menu:**
  - prévia da grade e da faixa, onde se arrastam blocos entre grupos e um clique edita o bloco;
  - grupos;
  - o que o perfil mostra e a moeda.
- **Páginas:**
  - quais rankings aparecem, quantos nomes e como os nomes saem (completo, nome e inicial, ou escondido);
  - liga e desliga os últimos confrontos;
  - os dias do Diário, até 14, cada um com dinheiro na mão, no banco e itens;
  - os códigos.
- **Novidades:** as notas de atualização da cidade.
- **Cena:** câmera, plano a pé e no veículo, filtro de cor, desfoque, câmera na mão, luzes, tablet na mão e os tempos de entrada e saída. Cada campo tem o seu reset.

**Testar** abre a pausa com o rascunho, sem salvar. Durante o teste, `[` e `]` trocam o filtro de cor na hora. **Salvar** grava e manda para todo mundo, sem restart.

**Códigos:**

- Salvam na hora, fora do botão Salvar.
- Têm de 3 a 32 letras, números, `_` ou `-`.
- Cada um dá dinheiro e itens, com limite de usos e prazo opcionais.
- Cada código vale uma vez por personagem.
- Depois de 5 tentativas erradas num minuto, o jogador espera.

---

## Tema de layout e câmera

Na aba da cena do painel, o **Tema de layout** escolhe onde o conteúdo fica: Lateral, Espelhado, Lista, Central ou Faixa. A câmera acompanha e deixa o personagem no lado livre. **Câmera muda nos momentos importantes** troca o plano ao abrir uma página e aproxima rápido ao resgatar ou comprar algo em telas que pedem isso; desligada, a câmera fica parada depois de entrar.

**Cores** escolhe entre **Normal** (botões com a cor de fundo e detalhes na cor de destaque) e **Invertido** (botões na cor de destaque e detalhes em contraste). O botão selecionado fica cheio e os outros um pouco apagados. O texto solto sobre o cenário não muda, e o tema global do jogador continua igual. Outro script lê a escolha com `exports.mri_Qpausemenu:GetInk()`.

## Para desenvolvedores

### Exports do cliente

```lua
exports.mri_Qpausemenu:IsOpen()
exports.mri_Qpausemenu:Open()
exports.mri_Qpausemenu:Close()

-- Bloco vindo de outro resource; section = 'rail' põe na faixa
exports.mri_Qpausemenu:AddItem({
    id = 'garage', label = 'Garagem', description = 'Seus veículos', icon = 'car', group = 'quick',
    action = { type = 'clientEvent', value = 'garage:open' },
})
exports.mri_Qpausemenu:RemoveItem('garage')

-- Tela de outro resource dentro da cena da pausa: Q e E passam para ela e Esc volta.
-- Ela chama HoldScene ao abrir e ReleaseScene ao fechar (com lado para voltar à pausa, sem lado para sair).
exports.mri_Qpausemenu:AddItem({
    id = 'character', label = 'Personagem', icon = 'user', carousel = true, replaces = 'skills',
    action = { type = 'overlay', value = 'mri_Qrpg:openFromPause' },
})
local delay = exports.mri_Qpausemenu:HoldScene()
exports.mri_Qpausemenu:ReleaseScene(1)

-- Selo, legenda ou barra num bloco enquanto a pausa está aberta; nil limpa
exports.mri_Qpausemenu:SetTile('phone', { badge = '3', caption = '3 mensagens', meter = 0.4 })
```

Eventos locais `mri_Qpausemenu:opened` e `mri_Qpausemenu:closed`, e o statebag `LocalPlayer.state.pauseMenu`, servem para esconder a HUD ou pausar outra tela.

### Páginas de outros resources

Uma página registrada aparece no seletor de páginas do painel. Um bloco com a ação "Abrir página da pausa" e o mesmo id abre ela.

```lua
-- servidor
exports.mri_Qpausemenu:RegisterPage('fishing_contest', {
    build = function(source)
        return {
            title = 'Torneio de pesca', subtitle = 'Termina domingo', icon = 'fish',
            sections = {
                { type = 'stats', items = { { label = 'Peixes', value = 12, icon = 'fish' } } },
                { type = 'list', title = 'Prêmios', items = {
                    { title = 'Vara de ouro', subtitle = '1º lugar', action = { id = 'claim', label = 'Resgatar', value = 'gold' } },
                } },
            },
        }
    end,
    action = function(source, action, value)
        if action ~= 'claim' then return { ok = false } end
        return { ok = true, message = 'Prêmio resgatado.' }
    end,
    live = function(source)
        return { value = '12', caption = 'peixes pescados' }
    end,
})
```

`RegisterClientPage(id, def)` faz o mesmo no cliente: `build()`, `action(action, value)` e `live()`, sem o `source`. `RemovePage` e `RemoveClientPage` tiram a página, que também sai sozinha quando o resource para.

- `action` devolve `{ ok, message? }`. Com `ok`, a página é montada de novo, a não ser que venha `data` com a página pronta.
- `live` devolve o dado do bloco: `value` (texto grande no lugar do ícone), `caption`, `badge` e `meter` (0 a 1).

**Seções**

| `type` | Campos |
|---|---|
| `stats` | `items`: `{ label, value, format?, icon?, hint?, tone? }` |
| `info` | `items`: `{ label, value, icon? }` |
| `progress` | `items`: `{ label, icon?, level?, value (0 a 1), caption? }` |
| `list` | `empty?`, `items`: `{ title, subtitle?, value?, icon?, tone?, time?, action? }` |
| `leaderboard` | `boards`: `{ id, label, format?, rows = { { rank, name, value, detail?, me? } }, me?, total? }` |
| `rewards` | `action`, `days`: `{ label, icon?, amount?, state = 'claimed' \| 'ready' \| 'locked' }`, `caption?`, `next?` |
| `redeem` | `action`, `placeholder?`, `hint?` (o texto digitado chega como `value`) |

Toda seção aceita `title`. `format` é `number`, `decimal`, `money`, `duration` (segundos), `distance` (metros), `speed`, `percent` ou `text`. `tone` é `primary`, `success`, `warning`, `error` ou `muted`. `time` é um horário Unix em segundos. Os ícones são os nomes do seletor de ícones do painel.

---

## Banco de dados

| Tabela | Guarda |
|---|---|
| `mri_qpausemenu_stats` | Por personagem: tempo jogado, sessões, abates, mortes, distâncias, maior velocidade |
| `mri_qpausemenu_kills` | Confrontos: quem matou, quem morreu, arma e hora |
| `mri_qpausemenu_daily` | Sequência do Diário e o dia do último resgate |
| `mri_qpausemenu_codes` | Códigos, prêmio, limite, usos e prazo |
| `mri_qpausemenu_code_uses` | Quem já resgatou cada código |

A configuração do painel fica em `data/settings.json` e as novidades em `data/patchnotes.json`.

---

## Licença

MIT com Commons Clause: use, altere e distribua à vontade, mas não venda o resource. Veja o [LICENSE](LICENSE).
