---
title: MRI Qfps
---

Menu de desempenho do jogador: presets, todas as alavancas gráficas que um script consegue mexer, medição real de FPS com teste de preset, automação, filtros, mira customizada e hitmarker. O dono do servidor ajusta e acompanha tudo na aba **FPS** do mri_Qadmin.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Aba FPS no mri_Qadmin](#aba-fps-no-mri_qadmin)
4. [Como o jogador abre o menu](#como-o-jogador-abre-o-menu)
5. [Aba FPS: presets e ajuste fino](#aba-fps-presets-e-ajuste-fino)
6. [Teste de preset (Preview)](#teste-de-preset-preview)
7. [Aba Medir e contador na tela](#aba-medir-e-contador-na-tela)
8. [Aba GFX: filtros](#aba-gfx-filtros)
9. [Aba Mira](#aba-mira)
10. [Aba Acerto: hitmarker e som](#aba-acerto-hitmarker-e-som)
11. [Aba Auto: automação e limpeza](#aba-auto-automação-e-limpeza)
12. [O que nenhum script consegue](#o-que-nenhum-script-consegue)
13. [Persistência (KVP)](#persistência-kvp)
14. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
15. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | Locale, callbacks, notify e o `/uiconfig` da suíte |
| `mri_Qbox` | Não | Coloca a entrada "Desempenho" no menu do jogador (F9) |
| `mri_Qadmin` | Não | Aba **FPS** com jogadores e ajustes do servidor |

---

## Instalação

1. Baixe o release (já vem com a NUI compilada em `html/`) e coloque a pasta `mri_Qfps` em `resources/`.
2. `ensure mri_Qfps` no `server.cfg`.
3. Não há SQL. Ao atualizar, mantenha o `data/settings.json` (ajustes do painel).

---

## Aba FPS no mri_Qadmin

Visível pra quem tem a permissão `command.fps` (o `command` do grupo admin já cobre).

### Jogadores

Tabela com quem está online, do pior FPS pro melhor: ID, nome, FPS, 1% low, ping e preset. Cada jogador manda o próprio FPS a cada 30 segundos; linha apagada é quem acabou de entrar. Na coluna Preset, escolher um preset aplica no jogador na hora (ele recebe um aviso). "Aplicar a todos" faz o mesmo com todo mundo.

### Ajustes

Tudo vale na hora, sem restart. Os valores ficam em `data/settings.json`; na primeira vez vêm do `shared/config.lua`.

| Ajuste | Padrão | Efeito |
|---|---|---|
| Distância de renderização | Ligado | Deixa o jogador mudar a distância de renderização |
| Animação do ícone no F9 | Ligado | Ícone do "Desempenho" com a animação `fade` |
| Permitir o preset Médio, Baixo, Ultra baixo | Ligados | Preset travado aparece com cadeado; quem estava nele volta ao Padrão na hora |
| Travar as luzes da cidade | Desligado | Apagar a cidade à noite dá vantagem em RP; travado, fica no padrão |
| Permitir hitmarker | Ligado | Libera o marcador de acerto |
| Permitir som de acerto | Ligado | Libera o som de acerto |

---

## Como o jogador abre o menu

Pelo menu do jogador (F9), na entrada **Desempenho**. ESC, o X ou "Concluir" fecham. O painel tem tamanho fixo, tudo aplica na hora e o "Redefinir" do rodapé volta a aba aberta ao padrão.

---

## Aba FPS: presets e ajuste fino

Cada opção mostra duas barras: **verde** é quanto FPS costuma dar, **amarela** é quanto a imagem perde. Opção alterada fica marcada na cor de destaque. Em todas, "Padrão" (100%) é o padrão do jogo: quem nunca mexeu no menu não tem nenhuma native chamada.

### Presets

Um preset aplica e salva todos os valores abaixo. Mexer depois em qualquer linha deixa o menu em "personalizado".

| Opção | Padrão | Médio | Baixo | Ultra baixo |
|---|---|---|---|---|
| Distância de renderização | 1.0 | 0.8 | 0.5 | 0.1 |
| Detalhe de pessoas e carros | 100% | 75% | 50% | 25% |
| Marcas no chão | sim | sim | não | não |
| Água parada | não | não | não | sim |
| Corte de luzes | padrão | 0.5 (150 m) | 0.25 (100 m) | 0 (50 m) |
| Luzes da cidade | 100% | 75% | 50% | 25% |
| Brilho das lâmpadas | 100% | 75% | 50% | 25% |
| Luzes no horizonte | 100% | 75% | 50% | 25% |
| Faróis e luzes de carros | 100% | 100% | 50% | 25% |
| Sombras | padrão | leves (3.0) | desligadas | desligadas |
| Poças e reflexos | 100% | 50% | 25% | desligadas |
| Pós-processamento | 100% | 75% | 50% | desligado |

O Ultra baixo também limpa o ped do jogador (sujeira, molhado, sangue, dano visível) e sobras da tela (vidros, mensagens de ajuda, sirenes distantes), e repete isso quando o ped muda. Clima, radar, GPS e câmera não são tocados.

### Como cada opção funciona

| Opção | Native |
|---|---|
| Distância de renderização | `OverrideLodscaleThisFrame` a cada frame (só com o ajuste do painel ligado) |
| Detalhe de pessoas e carros | `SetPedLodMultiplier` e `SetVehicleLodMultiplier` em cada ped e carro novo, a cada 2 s; nunca no jogador nem no carro dele |
| Marcas no chão | `SetDisableDecalRenderingThisFrame` a cada frame quando desligado |
| Água parada | `WaterOverrideSetStrength` e as amplitudes de onda e ondulação |
| Corte de luzes | `SetLightsCutoffDistanceTweak` + `SetFlashLightFadeDistance`, nunca abaixo de 50 m |
| Luzes da cidade, brilho, horizonte, faróis, poças, pós | `SetVisualSettingFloat` sobre as chaves de `visualsettings.dat`, como fração do valor de fábrica (lido uma vez); 100% devolve o original. Faróis nunca abaixo de 15% pros do próprio carro não apagarem |
| Sombras | cascade shadows; 0 desliga sombras de corda, tracker e AO blob do ped |

---

## Teste de preset (Preview)

O botão **Testar no meu PC** de cada preset mede o ganho de verdade, onde o jogador está:

1. O menu fecha (a própria interface gasta GPU e falsearia o teste) e aparece "Medindo o FPS" no topo.
2. Mede 8 segundos com o que está aplicado.
3. Aplica o preset, espera 1,5 s pro streaming assentar e mede mais 8 segundos.
4. Volta ao que estava e reabre o menu com antes e depois (média e 1% low) e a diferença.
5. "Manter preset" aplica; "Deixar como estava" só fecha o resultado.

---

## Aba Medir e contador na tela

- **FPS agora**, com estado (excelente a partir de 90, bom 60, fraco 40, ruim abaixo), gráfico do último minuto, média, 1% low, 0.1% low, mínimo, máximo e frametime.
- O FPS vem do contador de frames do jogo (`GetFrameCount`), uma vez por segundo, quase de graça. Os lows usam o tempo de cada frame (`GetFrameTime`), coletado só enquanto alguém olha: menu aberto, contador com 1% low ligado ou Preview.
- **Contador na tela**: FPS pequeno num dos quatro cantos, com 1% low e frametime opcionais, colorido pelo estado. Some enquanto o menu está aberto.

---

## Aba GFX: filtros

Cada filtro é um card com uma prévia aproximada sobre um print do jogo; o efeito exato aparece no mundo ao lado do painel. Aplica `SetTimecycleModifier` (e, na Opção #4, `SetExtraTimecycleModifier`). Trocar de filtro limpa o extra do anterior. Quando outro script limpa o timecycle (desfoque de painel, tela de morte), o filtro volta em até meio segundo.

| ID | Rótulo |
|---|---|
| `default` | Padrão |
| `cinema` | Cinema |
| `yell_tunnel_nodirect` | Opção #2 |
| `tunnel` | Opção #3 |
| `MP_Powerplay_blend` | Opção #4 (extra `reflection_correct_ambient`) |

---

## Aba Mira

Mira desenhada na NUI no centro da tela, que esconde a mira do GTA (`HideHudComponentThisFrame(14)`) quando o jogador está armado e mirando, atirando ou segurando a mira. Fora de combate o loop dorme (500 ms desarmado, 50 ms armado). Com a aba aberta, a mira sendo editada aparece no centro da tela, no tamanho real.

Tudo em pixels de tela, como a mira estática do CS2. Uma função só (`CrosshairGlyph.tsx`) desenha a mira do jogo e as prévias.

| Campo | Opções |
|---|---|
| Linhas, ponto, círculo, estilo T | liga e desliga cada um |
| Comprimento | 4, 5, 6, 7, 10, 15 px |
| Abertura | 0, 2, 3, 4, 6, 8 px |
| Espessura | 1, 2, 3, 4 px |
| Tamanho do ponto | 2, 3, 4, 6 px |
| Raio do círculo | 6, 10, 16, 24 px |
| Contorno | 1 ou 2 px |
| Opacidade | 25%, 50%, 75%, 100% |
| Cor | amostras ou seletor |

Oito presets: Ponto, Cruz pequena, Cruz aberta, Cruz e ponto, Estilo T, Círculo, Círculo e cruz e Retícula fina.

---

## Aba Acerto: hitmarker e som

Quando o tiro do jogador acerta um ped (NPC ou jogador), aparece um X no centro da tela e toca um som. O jogo avisa pelo evento `CEventNetworkEntityDamage` no cliente de quem atirou, sem servidor nem loop.

| Acerto | Como sabe | Marcador |
|---|---|---|
| Corpo | qualquer dano do jogador | branco |
| Cabeça | último osso atingido é a cabeça (`GetPedLastDamageBone`, osso 31086) | amarelo |
| Kill | o evento marca o dano como fatal | vermelho e maior |

- Estilos: Clássico, Compacto e Anel.
- Som: um estalo de hitmarker gravado (`web/src/assets/hit.wav`, CC0, [freesound.org/s/570335](https://freesound.org/s/570335/)), tocado na NUI com volume baixo, médio ou alto. Na cabeça toca mais agudo e mais alto, na kill toca duas vezes, a segunda mais grave. Chumbinhos de escopeta tocam um som só.
- Botões Corpo, Cabeça e Kill testam pelo mesmo caminho de um tiro de verdade.
- Precisa estar liberado no mri_Qadmin; sem permissão, a aba fica apagada.

---

## Aba Auto: automação e limpeza

Corta onde ninguém está olhando: uma camada temporária por cima do preset do jogador, que nunca fica salva. O menu mostra o preset escolhido e avisa quando uma camada está por cima.

| Opção | Padrão | Efeito |
|---|---|---|
| Poupar no menu de pausa | Desligado | Com o mapa ou o menu aberto, o mundo atrás vai ao Ultra baixo; ao fechar volta tudo |
| Modo ausente | Desligado | Parado (sem mexer o mouse, andar ou apertar tecla; celular e outras janelas abertas contam como presença) por 2, 5, 10 ou 15 minutos, vai ao Ultra baixo; o primeiro movimento traz de volta |
| Aliviar em interiores | Desligado | Dentro de um interior, `SetAmbientPed/VehicleRangeMultiplierThisFrame(0.3)` simula menos gente lá fora |
| Boost automático | Desligado | Média de 10 s abaixo de 30, 45 ou 60 sobe um preset; acima de 75, 90 ou 120 desce um. 30 s entre mudanças, nunca um preset travado |
| Aviso de FPS baixo | Desligado | Avisa depois de 15 s seguidos abaixo de 20, 30 ou 40, no máximo a cada 2 minutos |
| Limpeza automática | Desligado | A cada 30, 60, 120 ou 300 s tira marcas, partículas e vidro quebrado num raio de 50, 100 ou 250 m. Nunca durante tiro ou briga; nada é apagado do mundo além disso |

A camada mais forte vence: Preview, ausente, pausa e boost automático, nessa ordem.

---

## O que nenhum script consegue

As opções gráficas do menu do GTA (texturas, qualidade de sombra, MSAA, resolução) não podem ser mudadas por script: o jogo só deixa ler. O mri_Qfps mexe no que dá pra mexer em tempo de jogo. Uso real de CPU, GPU e temperatura também não existe pra script, então o menu não mostra estimativa nenhuma.

---

## Persistência (KVP)

As preferências são do jogador, no KVP do cliente.

| Chave | Conteúdo |
|---|---|
| `mri_Qfps:Graphics` | Preset e todos os valores do ajuste fino, em JSON. As chaves da 1.0 (`PresetFps`, `LodDistance`, `LightsCutoff`, `ShadowsCutoff`) são lidas uma vez e apagadas |
| `mri_Qfps:Prefs` | Automação, limpeza e contador na tela |
| `mri_Qfps:TimecycleModifier` | Filtro ativo |
| `mri_Qfps:Crosshair` | Mira em JSON; as 12 chaves antigas são convertidas e apagadas no primeiro save |
| `mri_Qfps:Hitmarker` | Marcador, estilo, som e volume do acerto |

---

## Entrypoints para outros recursos

```lua
-- do servidor, abre o menu de um jogador
TriggerClientEvent('mri_Qfps:openFpsMenu', source)
```

O recurso não expõe exports.

---

## Estrutura de arquivos

```
mri_Qfps/
├── client/
│   ├── graphics.lua   presets, alavancas, camadas e o loop por frame
│   ├── metrics.lua    FPS, lows, contador na tela, Preview e relatório pro admin
│   ├── auto.lua       pausa, ausente, interiores, boost, aviso e limpeza
│   └── main.lua       menu, filtros, mira, acerto, F9 e callbacks da NUI
├── server/
│   ├── main.lua       permissão, cores da suíte e registro da aba no mri_Qadmin
│   ├── settings.lua   data/settings.json e GlobalState dos ajustes
│   └── report.lua     FPS dos jogadores e aplicar preset pelo admin
├── shared/
│   ├── config.lua     valores iniciais dos ajustes do painel
│   └── settings.lua   aplica os ajustes sobre o Config no servidor e nos clientes
├── data/settings.json ajustes salvos pelo painel
├── web/               fonte da NUI (React + Vite + Tailwind + @mriqbox/ui-kit)
├── html/              build da NUI
└── locales/           pt-br e en (Lua e NUI)
```
