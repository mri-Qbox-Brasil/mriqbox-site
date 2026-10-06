---
title: MRI Qsoundfyapp
---

**Soundfy**: o streaming de música da cidade, no estilo do Spotify, para o [sd-phone](https://github.com/Samuels-Development/sd-phone) e o sd-tablet. Catálogo com busca e gêneros, artistas da cidade, playlists curadas pela administração, "Mais tocadas", curtidas e playlists dos jogadores, caixas de som e som do carro com som 3D, e faixas do YouTube.

A música continua tocando com o celular guardado e aparece no "Tocando agora" do sd-phone (tela de bloqueio, central de controle e ilha dinâmica).

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Funcionalidades](#funcionalidades)
4. [Caixas de som e carro](#caixas-de-som-e-carro)
5. [Músicas: hospedagem e licença](#músicas-hospedagem-e-licença)
6. [Painel de administração](#painel-de-administração)
7. [Migração do mri_Qboombox](#migração-do-mri_qboombox)
8. [Configuração](#configuração)
9. [Banco de dados](#banco-de-dados)
10. [Créditos](#créditos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `sd-phone` | Sim | App, "Tocando agora", galeria e o Bluetooth (deixe `configs/bluetooth.lua` com `Enabled = true`) |
| `ox_lib` | Sim | Callbacks, locale e avisos |
| `oxmysql` | Sim | Tabelas próprias `mri_qsoundfyapp_*` |
| `qbx_core` | Sim | Personagem (biblioteca e perfil de artista são por personagem) e item usável |
| `ox_inventory` | Sim | Item da caixa de som |
| `ox_target` | Sim | Pegar a caixa do chão (na base MRI quem atende é o `mri_Qinteract`) |
| `mri_props` | Sim | Modelo da caixa de som (`rojo_jblboombox`), no [pacote de addons da MRI](https://github.com/mri-Qbox-Brasil/addons) em `[props]/mri_props` |
| `mri_Qadmin` | Não | Painel de administração |
| `sd-tablet` | Não | O app aparece também no tablet, com layout de computador |

---

## Instalação

1. Coloque a pasta `mri_Qsoundfyapp` em `resources/` e garanta que ela inicia **depois** do `sd-phone`:
   ```
   ensure sd-phone
   ensure sd-tablet
   ensure mri_Qsoundfyapp
   ```
2. Tenha o item da caixa de som no `ox_inventory/data/items.lua` (a base MRI já traz o `speaker`):
   ```lua
   ['speaker'] = { label = 'Caixa de Som', weight = 475, stack = true, close = true },
   ```
3. Dê a permissão do painel a quem administra. O grupo `admin` padrão já tem, porque herda `command`:
   ```
   add_ace group.admin command.soundfy allow
   ```
4. Se o servidor usa o `mri_Qboombox`, importe as músicas dele pelo painel (veja [Migração](#migração-do-mri_qboombox)) e tire-o do `server.cfg`: os dois usam o mesmo item `speaker`.

As tabelas são criadas na primeira subida e o app já vem instalado no celular de todo mundo.

---

## Funcionalidades

- **Início:** tocadas recentemente, recomendadas para você (pelos gêneros e artistas que a pessoa mais ouve, curte e segue), playlists em destaque, "Mais tocadas", lançamentos e artistas populares.
- **Buscar:** músicas, artistas e playlists, navegação por gênero e, com o YouTube liberado, resultados do YouTube na mesma busca.
- **Sua Biblioteca:** músicas curtidas, histórico dos últimos 30 dias, playlists próprias (públicas ou privadas, com capa da galeria), playlists salvas e artistas seguidos.
- **Ajustes:** na Biblioteca, o "Som ao redor" regula só para você o volume das caixas e carros dos outros.
- **Player:** aleatório, repetir, fila, barra de tempo, mini-player e "Tocando agora". Continua com o celular guardado e com o app fechado.
- **Mais tocadas:** ranking das faixas mais ouvidas dos últimos 7 dias. Uma reprodução conta depois de 30 segundos ouvidos (ou metade da faixa), uma vez a cada 10 minutos por ouvinte.
- **Soundfy para Artistas:** qualquer personagem cria um perfil de artista (foto, capa e bio), envia faixas por link e acompanha reproduções, ouvintes do mês e seguidores. A faixa entra no ar depois de aprovada no painel (ou na hora, com a aprovação automática). Quando o admin aprova ou recusa, o artista recebe uma notificação no celular, com o motivo da recusa.
- **Tablet:** barra lateral, conteúdo e barra de player embaixo, como no computador.

A biblioteca e o perfil de artista são do **personagem**: trocar de chip não leva nada embora.

---

## Caixas de som e carro

A música do celular pode sair numa caixa de som ou no som do carro, e quem está perto ouve a mesma faixa, no mesmo ponto, mais baixo conforme se afasta.

- **Na mão:** use o item `speaker` e a caixa vai para a mão, tocando o que o seu celular toca, sem parear. Quem está perto ouve enquanto você anda. **X** guarda; entrar num veículo também guarda.
- **No chão:** com a caixa na mão, **G** coloca no chão. Ela fica conectada ao seu celular pelo Bluetooth (aparece em Ajustes > Bluetooth e na central), fica salva e volta depois de um reinício. Ao se afastar, o celular desconecta, pausa a música e avisa; ao voltar para perto, reconecta, avisa e continua a música de onde parou. Desconectou na mão: ela só reconecta depois que você se afastar e voltar. Mire na sua caixa com o target e escolha "Pegar caixa de som" para ela voltar à mão, com a música tocando. Caixa que fica muitos dias sem o dono por perto some do mapa e volta para o inventário dele (veja `speakerExpireDays`).
- **Outras pessoas:** quem quiser tocar na caixa dos outros mira nela com o target e escolhe "Conectar à caixa", ou pareia em **Ajustes > Bluetooth** do celular ("Caixa de som de Fulano"). Pareada, o celular conecta sozinho perto dela. Conectado, o Soundfy mostra "Tocando em Caixa de som de Fulano", o volume passa a ser o da caixa e o target mostra "Volume da caixa" e "Desconectar da caixa". Ao sair do alcance, a música pausa e o celular avisa; ao voltar, continua de onde parou. A caixa toca de um celular por vez.
- **Carro:** ao assumir o volante, o carro aparece no Bluetooth ("Som do carro ABC1234"). Pareado pela placa, ele reconecta sempre que você entrar nele. Dentro do carro o som é cheio; fora, abafado.
- Uma caixa toca um celular por vez. Ao perder a conexão, a música pausa.

---

## Músicas: hospedagem e licença

**Licença.** A licença de criador da Rockstar (PLA) proíbe usar música de terceiros no servidor, seja arquivo ou link do YouTube. Aprove só música própria dos jogadores ou com licença livre (Creative Commons). A responsabilidade é do dono do servidor.

**Hospedagem.** As faixas são links. Use um host do próprio servidor (Fivemanage, uma CDN sua) e libere o site no painel. Links de terceiros que não foram feitos para isso (Wikimedia, Discord) costumam bloquear depois de algumas reproduções ou expirar.

**YouTube.** Faixas do YouTube tocam num player escondido. Com "Aceitar YouTube" ligado no painel, artistas enviam links do YouTube e qualquer jogador busca no YouTube pelo app: o vídeo escolhido vira faixa do catálogo (artista com o nome do canal), para poder curtir, pôr em playlist e tocar nas caixas. A busca é feita pelo servidor, sem chave de API, com cache. A administração sempre pode criar faixas do YouTube. Vídeos com incorporação desativada não tocam (o teste de link avisa).

---

## Painel de administração

No mri_Qadmin aparece **Soundfy**, para quem tem a ACE `command.soundfy`.

- **Aprovação:** faixas enviadas pelos artistas, da mais antiga para a mais nova, com prévia de áudio. Aprovar ou recusar com motivo (o artista vê no estúdio).
- **Faixas:** busca, filtro por situação, editar, apagar e criar faixas do catálogo (arquivo ou YouTube).
- **Artistas:** criar artistas do catálogo (sem dono), editar, verificar e apagar.
- **Playlists curadas:** montar a lista, reordenar e escolher quais ficam em destaque no Início, em que ordem.
- **Configuração:** aprovação automática, YouTube, sites liberados, limites, caixas de som, gêneros e a migração do mri_Qboombox.

---

## Migração do mri_Qboombox

Em **Configuração > Migração do mri_Qboombox**, o botão importa:

- as músicas do Qboombox como faixas do YouTube aprovadas, com o canal virando artista do catálogo;
- as playlists de cada jogador como playlists **privadas** do personagem mais recente da mesma licença.

Pode rodar de novo: o que já veio é pulado. Depois de importar, tire o `mri_Qboombox` do `server.cfg`.

---

## Configuração

Tudo pelo painel, que grava em `data/config.json`.

| Campo | Padrão | O que faz |
|---|---|---|
| `autoApprove` | `false` | Faixas de artistas entram no ar sem fila |
| `allowYouTube` | `false` | YouTube liberado: artistas enviam links e jogadores buscam pelo app |
| `allowAnyHost` | `false` | Aceita qualquer site, desde que o link seja um arquivo de áudio |
| `allowedHosts` | `[]` | Sites liberados (ponto no começo libera os subdomínios) |
| `genres` | 10 gêneros | `id` em inglês, nome e cor |
| `maxPendingPerArtist` | `5` | Faixas na fila por artista |
| `maxTracksPerArtist` | `100` | Faixas por artista |
| `maxPlaylistTracks` | `300` | Músicas por playlist |
| `playCountSeconds` | `30` | Segundos ouvidos para contar uma reprodução |
| `chartDays` / `chartSize` | `7` / `50` | Janela e tamanho do "Mais tocadas" |
| `speakerItem` | `speaker` | Item da caixa de som (trocar pede reiniciar o resource) |
| `maxSpeakersPerPlayer` | `2` | Caixas colocadas por jogador |
| `speakerRange` | `25` | Até onde a caixa é ouvida (metros) |
| `carRange` | `12` | Até onde o som do carro é ouvido fora dele (metros) |
| `bluetoothRange` | `12` | Distância para o celular conectar na caixa (metros). Quem conectou pela caixa só desconecta 6 m depois disso |
| `speakerExpireDays` | `7` | Dias sem o dono passar perto até a caixa sumir e voltar para o inventário dele (`0` = nunca). Dono fora da cidade recebe o item quando entrar |

---

## Banco de dados

`mri_qsoundfyapp_accounts`, `mri_qsoundfyapp_artists`, `mri_qsoundfyapp_tracks`, `mri_qsoundfyapp_playlists`, `mri_qsoundfyapp_playlist_tracks`, `mri_qsoundfyapp_likes`, `mri_qsoundfyapp_follows`, `mri_qsoundfyapp_saved_playlists`, `mri_qsoundfyapp_plays` (só os últimos 30 dias) e `mri_qsoundfyapp_speakers`.

---

## Créditos

- Modelo da caixa de som (`rojo_jblboombox`): usado com permissão, distribuído no `mri_props`.
- Ideias de caixa na mão, busca no YouTube e volume do som ao redor vistas no rodz-som e no ShiroFy (código escrito do zero).
- Textos em pt-BR e inglês; o idioma segue o do celular.
