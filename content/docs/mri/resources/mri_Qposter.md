---
title: MRI Qposter
---

Pôsteres, outdoors e telões no mundo. Cada pôster mostra imagem, vídeo, YouTube ou uma imagem subida do PC, sozinha ou em revezamento, desenhada por DUI sobre quatro cantos marcados no jogo (numa parede ou em cima de um veículo). Tudo se faz pelo painel, que também vira aba no mri_Qadmin. Se o dono deixar, jogadores criam os próprios pôsteres pelo F9.

## Dependências

| Recurso | Obrigatório | Para quê |
|---|---|---|
| `ox_lib` | Sim | comando, callbacks e locale |
| `oxmysql` | Sim | tabela `mri_qposter_posters` |
| `qbx_core` | Para pôster de jogador | personagem, cobrança no banco e dono do veículo (`player_vehicles`) |
| `mri_Qadmin` | Não | aba Pôsteres dentro do painel de admin |
| `mri_Qbox` | Não | item "Outdoors e pôsteres" no Gerenciamento do F10 e "Meus pôsteres" no F9 |

## Instalação

1. Coloque a pasta `mri_Qposter` em `resources/` e dê `ensure mri_Qposter` no `server.cfg`.
2. A tabela é criada sozinha na primeira vez.
3. Vindo do `mri_Qdraw`: tire a pasta dele do servidor (ou o `ensure`). Na primeira vez que o mri_Qposter sobe com a tabela vazia, os pôsteres do `mri_Qdraw/data.json` entram com o mesmo número. Por isso a pasta antiga precisa existir nessa primeira subida; depois pode apagar.

Ao atualizar, mantenha a pasta `data/`: ali ficam os Ajustes (`data/settings.json`) e as imagens subidas do PC (`data/uploads/`).

## Permissão

O painel de admin e todas as ações nele pedem a ACE `command.poster`, a mesma do comando:

```
add_ace group.admin command.poster allow
```

## Abrir o painel

- `/poster`
- F10 > Gerenciamento > Outdoors e pôsteres (com o mri_Qbox)
- Aba Pôsteres no mri_Qadmin
- Jogador: F9 > Meus pôsteres, quando "Jogadores podem criar" está ligado nos Ajustes

## Painel

Lista à esquerda, mapa no meio e editor à direita. Clicar na lista ou no pino do mapa seleciona; o cartão do mapa leva até o pôster ("Ir até lá") ou marca o lugar de novo. Pôster em veículo não tem pino (ele anda).

**Aba Mídia**

- Uma linha por item: link direto de imagem (png, jpg, gif, webp), de vídeo (mp4, webm) ou do YouTube, ou **Subir imagem do PC**. A imagem do PC é reduzida no painel pra webp (até 2048 px; gif vira imagem parada) e fica no servidor.
- **Adicionar outro item** monta um revezamento: os itens trocam com um esmaecido, na mesma hora pra todo mundo (relógio do jogo). **Trocar a cada**: 5 s, 10 s, 15 s, 30 s, 1 min ou 5 min.
- **Som** (aparece com vídeo ou YouTube): ligado, toca o áudio perto do pôster. **Volume** e **Ouve até** (10, 20, 40 ou 80 m); o som diminui com a distância e some no limite. Pôster com som tocando não pausa nem fora da tela.

**Aba Visual**

| Opção | O que faz |
|---|---|
| Ajuste | Preencher (cobre e corta), Inteira (mostra toda, sobra transparente) ou Esticar |
| Formato | Retângulo, Arredondado (cantos redondos) ou Redondo (círculo ou elipse, na proporção do pôster) |
| Movimento | Parado, Zoom lento (aproxima e afasta) ou Deslizar (de um lado pro outro). Pausa junto com o vídeo quando longe |
| Nitidez | Mínima, Leve, Baixa, Média ou Alta: tamanho da textura de perto (128, 256, 512, 1024 ou 2048 px de lado). De longe ela baixa sozinha pro tamanho que o pôster ocupa na tela, sem serrilhar. Alta só em outdoor grande |
| Brilho | de 20% a 200%. Abaixo de 100% escurece o pôster; acima clareia a imagem (o branco estoura) |
| Mostrar no mundo | desligado, o pôster fica salvo mas some do mundo |

**Aba Lugar**

- **Marcar os 4 cantos**: o painel some, você mira e atira (clique) ou aperta `E` em cada canto, nesta ordem: em cima à esquerda, em cima à direita, embaixo à esquerda, embaixo à direita. Quando falta só o último, a imagem já aparece no lugar. `Backspace` desfaz o último canto (sem nenhum, cancela) e `Esc` cancela.
- **Encaixar na parede**: a imagem segue a mira colada na superfície (parede, chão ou teto), já na proporção da imagem. Rodinha muda o tamanho (`Shift` + rodinha, mais rápido), `←` `→` inclinam, clique ou `E` coloca, `Backspace` ou `Esc` cancelam.
- **Em veículo**: marcando os 4 cantos (ou encaixando) em cima de um carro, o pôster fica preso nele pela placa e anda junto. O editor mostra "No veículo ABC 123". Pra soltar, marque de novo numa parede. Aparece onde o carro estiver, pra quem estiver perto.
- **Ir até lá** (só admin, pôster fixo): leva você pra frente do pôster.
- **Distância de exibição**: ligado, o pôster segue a distância dos Ajustes. Desligado, ele tem a sua: 25, 50, 100, 200, 400 ou 800 m (outdoor grande visto de longe, cartaz pequeno só de perto). O limite de pôsteres ao mesmo tempo continua valendo, e a pausa do vídeo por distância usa a do pôster.
- **Profundidade**: barra de 10 cm pra dentro a 60 cm pra fora da superfície, pra moldura saltada ou embutida. O mundo mostra enquanto você arrasta.

Qualquer mudança no editor aparece no mundo na hora, como prévia; só fica valendo depois de Salvar. O botão de copiar no topo do editor duplica o pôster (com o lugar) num novo.

Cancelar qualquer ferramenta mantém o lugar que já estava.

## Ajustes

Botão no topo (só admin). Valem na hora pra todo mundo e ficam em `data/settings.json`.

| Opção | O que faz |
|---|---|
| Aparece a partir de | distância em que os pôsteres começam a aparecer (25, 50, 100, 200 ou 400 m) |
| Pôsteres ao mesmo tempo | quantos aparecem de uma vez em volta de cada jogador (4, 8, 12 ou 16); os mais perto ganham |
| Jogadores podem criar | liga o "Meus pôsteres" no F9 |
| Preço de cada pôster | cobrado do banco ao criar (nada, $100, $500, $1.000 ou $5.000); editar e apagar não cobram |
| Pôsteres por personagem | 1, 2, 3, 5 ou 10 |
| Tamanho máximo de cada lado | 2, 4, 8 ou 16 m |
| Subir imagem do PC | desligado, jogador só usa link |
| Sites permitidos | lista de sites (ex.: `imgur.com`, vale pros subdomínios). Vazia: qualquer site. Só vale pra jogador |

## Pôster de jogador

- O jogador vê e mexe só nos dele, com o mesmo editor, sem Ajustes, sem "Ir até lá" e sem nitidez Alta.
- O servidor confere tudo ao salvar: limite por personagem, tamanho, sites permitidos, preço (devolve se o banco de dados falhar) e o lugar. Pôster fixo só se salva com o jogador a até 25 m dele; em veículo, só num carro que é dele (`player_vehicles`).
- O admin vê todos no painel, com o nome de quem criou, e pode editar ou apagar qualquer um. Editar como admin mantém o dono.

## Desempenho

- Cada pôster aceso é um navegador. Só os mais perto acendem, até o limite dos Ajustes, e dentro da distância (com folga de 25 m pra não recarregar na beirada).
- Nada aparece ou some de repente: o pôster esmaece nos últimos 15% da distância (no mínimo 4 m), só aparece depois que a imagem ou o vídeo carregou, e some esmaecendo quando perde a vaga, é escondido ou apagado.
- A nitidez acompanha o tamanho na tela: textura sem mipmap serrilha e cintila quando fica grande demais pro que aparece. A conta é só o tamanho do pôster e a distância dele até a câmera (nada a ver com a distância de exibição): a textura nunca tem mais pixels que o pôster na tela, de 32 a 2048 px. Um outdoor de 12 m usa 512 a 25 m, 128 a 100 m e 32 a 400 m. A troca tem uma folga de 15% pra não ficar indo e voltando e acontece no máximo a cada 2 s; a nova carrega embaixo e a antiga esmaece por cima, sem piscar. A escolhida no Visual é o teto. Vídeo sem som recomeça na troca; pôster com som ligado não troca, pra não cortar o áudio.
- Apagado, o navegador volta pra um estoque e é reaproveitado pelo próximo pôster que acender.
- Vídeo, YouTube e movimento ficam pausados fora da tela ou longe (mais de 60% da distância), a não ser que o som esteja chegando em você.
- No revezamento só fica carregado o item da vez (o anterior sai depois do esmaecido).
- A imagem subida do PC vem do servidor uma vez por jogador (evento latente) e fica em memória enquanto ele joga.
- De longe o jogo troca o prédio por uma versão simplificada que fica na frente da parede. O pôster é puxado na direção da câmera conforme a distância, sem mudar de tamanho na tela, pra não sumir atrás dela.
- Vídeo, YouTube, movimento e nitidez Alta pesam mais.

## Sincronização

Criar, mudar ou apagar chega na hora pra todos os jogadores. A tabela `mri_qposter_posters` é a fonte da verdade. Imagem do PC que nenhum pôster usa mais é apagada na hora; uma subida e nunca salva sai na próxima vez que o recurso sobe (depois de 1 hora).

## Para outros recursos

Os eventos de servidor do `mri_Qdraw` continuam funcionando, com a mesma ACE `command.poster`:

```lua
-- cria um pôster (cantos: em cima à esquerda, em cima à direita, embaixo à esquerda, embaixo à direita)
TriggerServerEvent('rw_draw++:new', { Data = { Url = 'https://exemplo.com/imagem.jpg' }, Vertices = { tl, tr, bl, br } })

-- troca a imagem de um pôster
TriggerServerEvent('rw_draw++:img', id, 'https://exemplo.com/outra.jpg')
```

Exports de servidor (não checam permissão: quem chama decide):

```lua
exports.mri_Qposter:GetPosters()                      -- lista de pôsteres
exports.mri_Qposter:GetPoster(id)
exports.mri_Qposter:CreatePoster({ name, url, playlist, interval, fit, shape, motion, quality, corners, vehicle, distance, depth, brightness, sound, volume, soundRange }) -- id, ou nil e o erro
exports.mri_Qposter:SetPosterContent(id, url, fit, playlist) -- troca o que mostra (rodízio de anúncios); playlist é opcional
exports.mri_Qposter:SetPosterEnabled(id, true)
exports.mri_Qposter:DeletePoster(id)
```

Com `vehicle` (placa), os `corners` são deslocamentos a partir do veículo (`GetOffsetFromEntityGivenWorldCoords`).

No cliente, `exports.mri_Qposter:GetPosters()` devolve os pôsteres que esse jogador conhece.

## O que não tem

- Pôster dobrando numa quina (duas paredes) ou em polígono livre: faça dois pôsteres lado a lado.

## Licença

MIT com Commons Clause: pode usar, modificar e redistribuir, não pode vender. As imagens e vídeos mostrados são de quem os publicou.
