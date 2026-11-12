---
title: MRI Qhud
---

Manual completo do recurso **MRI HUD** para incorporação à documentação da MRI. Cobre instalação, configuração, uso in-game, temas/skins, o sistema de vitais custom e a **API de extensão** (eventos e exports) para integrar outros scripts.

> **Nome do resource:** nos exemplos o recurso se chama **`mri_Qhud`** (nome padrão, não deve ser renomeado). Em `exports['mri_Qhud']:...` e nos eventos, use o nome real da pasta caso seja diferente no seu servidor.

---

## Índice

1. [Visão geral](#1-visão-geral)
2. [Instalação e dependências](#2-instalação-e-dependências)
3. [Configuração](#3-configuração)
4. [Uso in-game](#4-uso-in-game)
5. [Temas e skins](#5-temas-e-skins)
6. [Sistema de vitais custom](#6-sistema-de-vitais-custom)
7. [API de extensão para outros resources](#7-api-de-extensão-para-outros-resources)
8. [Referência de eventos NUI](#8-referência-de-eventos-nui)
9. [Integração de estresse](#9-integração-de-estresse)
10. [Desenvolvimento do front-end](#10-desenvolvimento-do-front-end)
11. [Solução de problemas](#11-solução-de-problemas)

---

## 1. Visão geral

O MRI HUD é composto por:

- **Front-end (NUI):** aplicação React + Vite + TypeScript em `web/`, compilada para `html/` e carregada como `ui_page`. Estado gerenciado por stores Zustand.
- **Back-end (Lua):** `client/` (coleta dados do jogo e envia à NUI), `server/` (permissões, config global, vitais persistidos) e `shared/` (config).

### Fluxo de dados

- **Lua → NUI:** `SendNUIMessage({ action, topic, ... })`. A NUI escuta em `utils/eventHandler.ts` e roteia por `action`/`topic` para o store correspondente.
- **NUI → Lua:** `fetchNui(evento, dados)` → `RegisterNUICallback(evento, ...)`.
- **Outros resources → HUD:** via **exports** do `mri_Qhud` (que rodam no contexto do recurso e disparam o `SendNUIMessage`) ou via **eventos** `TriggerClientEvent('hud:client:...')`.

Arquitetura técnica detalhada: ver `ARCHITECTURE.md`. Contrato de eventos: `nui-events.json`.

---

## 2. Instalação e dependências

### Dependências

| Recurso | Obrigatório | Uso |
|---|---|---|
| qb-core / QBox | Sim | Framework, dados do jogador, metadata |
| ox_lib | Sim | Locales (i18n) |
| oxmysql | Sim | Config global persistida no banco |
| ps-buffs | Não | Buffs/enhancements opcionais |

### Passos

1. Copie a pasta `mri_Qhud` para `resources/`.
2. No `server.cfg`: `ensure mri_Qhud`.
3. Reinicie o servidor.

> Ordem dos scripts server (definida no `fxmanifest.lua`): `oxmysql` → `db.lua` → `main.lua` → `vitals.lua` → `settings.lua`.

---

## 3. Configuração

Os **defaults** ficam em `shared/config.lua`. O `shared/config.lua` é a **semente**: no primeiro boot o servidor copia os valores para o banco (`mri_hud_settings`) e **a partir daí o banco é a fonte de verdade**. Editar o `config.lua` depois disso não tem efeito, use o painel de config global (`/adminhud` ou a página **Servidor** do menu (tecla I), e o plugin **HUD** dentro do mri_Qadmin quando ele estiver instalado). Salvar ali aplica a todos os players na hora e sobrepõe ajustes locais.

Entram no banco:

- **todos** os `Config.X` primitivos (string / número / booleano);
- as tabelas `ServerLogo`, `StatusIcons`, `Positioning`, `MoneyAccounts`, `Odometer`, `RainDroplets`, `ColdFrost`, `SupernaturalVitals`, `SpeedLimits`, `StreetNames`, `ZoneNames` e `VehClassStress`.

Na aba **Ruas** do painel, limites de velocidade e nomes de rua e área se adicionam em pé no lugar, pelo botão "Adicionar a rua onde estou" (ou "a área"); o mapa de postais e o "Trocar também no jogo" valem na hora, sem restart.

As demais tabelas continuam **exclusivas do `config.lua`** e só mudam com restart do resource: `WhitelistedWeaponArmed`, `WhitelistedWeaponStress`, `FuelBlacklist` (carros elétricos para jogo anterior ao build 3258; do 3258 em diante o próprio jogo informa, e a HUD troca combustível por bateria), `Intensity`, `EffectInterval` e `DefaultThemes` (esta em `shared/config_defaults.lua`; declarar no `config.lua` sobrepõe).

> Para voltar um valor ao default do `config.lua`, apague a linha correspondente em `mri_hud_settings` e reinicie o resource, ela é semeada de novo.

### 3.1 Geral

| Campo | Tipo | Padrão | Descrição |
|---|---|---|---|
| `Config.OpenMenu` | string | `'I'` | Tecla que abre o menu de configurações |
| `Config.UseMPH` | boolean | `false` | Unidade padrão: `false` = km/h, `true` = MPH. Vale para quem ainda não escolheu no menu |
| `Config.MinimapFitX` / `Y` / `W` / `H` | number | `0` / `0` / `1` / `1` | Ajuste fino do contorno do minimapa (deslocamento em vh e multiplicador de tamanho). Gravado pelo editor de posições |
| `Config.CompassEnabled` | boolean | `true` | `false` esconde a bússola de todos (fita, Radar, ruas e localização) e tira as opções do menu. Também no painel Servidor (aba HUD, Elementos) |
| `Config.ShowServerId` / `Config.ShowPassport` | boolean | `true` / `true` | Mostram o ID do servidor e o passaporte do personagem, cada um com seu interruptor. Também no painel Servidor (aba HUD, Elementos) |
| `Config.ShowJob` / `Config.ShowGang` | boolean | `false` / `false` | Selos com o emprego e o cargo (apagado fora de serviço) e com a gangue e o cargo, ao lado do ID. Também no painel Servidor (aba HUD, Elementos) |
| `Config.ShowClock` | boolean | `false` | Hora da cidade ao lado do ID; cada jogador escolhe 24h ou 12h em I > Tela. Também no painel Servidor (aba HUD, Elementos) |
| `Config.ShowPostal` | boolean | `true` | Código do postal mais próximo junto da rua. Também no painel Servidor (aba HUD, Elementos) |
| `Config.PostalFile` | string | `'data/postals/new-postals.json'` | Mapa de postais: `new-postals.json` ou `ocrp-postals.json` (dados do [nearest-postal](https://github.com/DevBlocky/nearest-postal), MIT) |
| `Config.SpeedLimitSign` | boolean | `true` | Placa com o limite da rua ao lado do minimapa, só no carro; fica vermelha acima do limite. Peça `speedLimitHud` no editor. Também no painel Servidor (aba HUD, Elementos) |
| `Config.SpeedLimitDefault` | number | `60` | Limite em km/h das ruas fora de `Config.SpeedLimits` (`0` = sem placa nelas) |
| `Config.SpeedLimits` | table | vias expressas 110, rodovias 70 a 90, avenidas 70 | Limite em km/h por nome original da rua. Quem joga em MPH vê convertido para múltiplo de 5 |
| `Config.StreetNames` / `Config.ZoneNames` | table | `{}` | Nomes próprios: troca o nome da rua (pelo nome original) e da zona (pelo código do GTA, ex.: `AIRP`) |
| `Config.RenameInGame` | boolean | `false` | `true` aplica os nomes acima também no texto do jogo (mapa do pause e qualquer nome nativo), não só na HUD |
| `Config.SeatbeltAlarm` | boolean | `true` | `false` desliga o alarme do cinto para todos e esconde a opção do menu dos jogadores. Ligado, cada jogador escolhe em I > Veículo (vem desligado por padrão). Também no painel Servidor (aba Veículo) |
| `Config.WeaponHud` | boolean | `true` | Mostra a arma equipada abaixo do dinheiro (imagem e nome do ox_inventory, pente / reserva) e esconde a munição nativa do GTA. Peça `weaponHud` no editor de posições |
| `Config.VehicleEnabled` | boolean | `true` | Liga/desliga a parte de veículo da HUD |
| `Config.EngineCommand` | boolean | `false` | Liga o comando embutido de motor (`+engine`, tecla G) |
| `Config.IndicatorKeys` | table | `{ left = 'LEFT', right = 'RIGHT', hazards = 'UP' }` | Teclas da seta esquerda, seta direita e pisca-alerta (só o motorista; aparecem para todos). O jogador troca em Configurações > Teclas > FiveM. `false` desliga, a tabela inteira ou uma tecla |
| `Config.BoatAnchorKey` | string | `'J'` | Solta e recolhe a âncora do barco (motorista, quase parado); com ela solta aparece o selo `marineAnchor`. `false` desliga |

### 3.2 Estresse

| Campo | Padrão | Descrição |
|---|---|---|
| `Config.StressChance` | `0.1` | Chance de estresse ao atirar (0-1) |
| `Config.MinimumStress` | `50` | Nível mínimo para tremer a tela |
| `Config.MinimumSpeed` | `100` | Velocidade que gera estresse (com cinto) |
| `Config.MinimumSpeedUnbuckled` | `50` | Velocidade que gera estresse (sem cinto) |
| `Config.DisablePoliceStress` | `false` | Desativa estresse para o job `police` |
| `Config.VehClassStress` | tabela | Liga/desliga estresse por classe de veículo |
| `Config.Intensity` / `Config.EffectInterval` | tabelas | Curvas de blur/timeout por faixa de estresse |
| `Config.WhitelistedWeaponArmed` / `WhitelistedWeaponStress` | tabelas | Armas que não acionam modo armado/estresse |

### 3.3 Temas

O visual da HUD é definido por **temas** (menu **I → Aparência**). Um tema veste a HUD inteira numa família só: vitais, dinheiro, voz, velocímetro e bússola. A biblioteca fica no banco (`mri_hud_skin_presets`) e é editada pelo menu, não pelo `config.lua`.

| Campo | Padrão | Descrição |
|---|---|---|
| `Config.PlayerThemeChoice` | `true` | `true` = cada jogador escolhe entre os temas liberados; `false` = todos usam o padrão |
| `Config.DefaultTheme` | `0` | Id do tema padrão. O menu grava; `0` é resolvido na primeira migração |
| `Config.DefaultThemes` (em `shared/config_defaults.lua`) | 12 temas | Temas semeados no primeiro boot (Clássico, Clássico Digital, APEX, ZSX, Caminhão, Cinemático e as 6 paletas da sobrenatural) |

As chaves antigas (`PlayerHudSkin`, `VehicleHudTheme`, `VehicleHudVariant`, `ClassicSpeedo*`, `Supernatural*` de visual) saíram do `config.lua`. Num servidor que já tinha essas chaves no banco, a primeira inicialização cria o tema **Tema atual do servidor** com o mesmo visual e o define como padrão. Detalhes em [docs/TEMAS-E-SKINS.md](docs/TEMAS-E-SKINS.md).

### 3.4 Odômetro

O velocímetro exibe um odômetro (aparece na cápsula abaixo da velocidade no tema `sport`; ocultado quando o valor é 0). O HUD **só exibe**, a quilometragem vem de um provedor externo. Há suporte automático embutido:

| Campo | Valores | Padrão |
|---|---|---|
| `Config.Odometer.enabled` | boolean | `true` |
| `Config.Odometer.provider` | `'auto'` \| `'mri_mechanic'` \| `'jg-vehiclemileage'` \| `'none'` | `'auto'` |
| `Config.Odometer.interval` | ms entre leituras | `2000` |

- `'auto'` detecta o provedor rodando (prioriza `mri_mechanic`, depois `jg-vehiclemileage`) e funciona mesmo se o provedor iniciar depois do HUD.
- Os provedores retornam **km**; o HUD converte para **milhas** quando `Config.UseMPH = true`.
- `'none'` desliga a leitura automática, nesse caso qualquer script pode alimentar o odômetro manualmente pelo evento `mri_Qhud:client:setOdometer` (client) ou `TriggerClientEvent('mri_Qhud:client:setOdometer', src, distance)` (server).

### 3.5 Vitais custom (mana / sanidade)

```lua
Config.SupernaturalVitals = {
    enabled       = true,   -- liga o sistema server-side (regen + sync)
    regenInterval = 5000,   -- ms entre cada tick de regen
    mana     = { default = 100, max = 100, regen = 2 }, -- regen = pontos por tick (0 = sem regen)
    sanidade = { default = 100, max = 100, regen = 1 },
}
```

### 3.6 Ícones de status

Define quais ícones aparecem e em que ordem. Remova a entrada ou use `enabled = false` para ocultar:

```lua
Config.StatusIcons = {
    { id = "voice",  enabled = true },
    { id = "health", enabled = true },
    { id = "armor",  enabled = true },
    { id = "hunger", enabled = true },
    -- thirst, stress, oxygen, armed, parachute, harness, cruise, nitro, dev ...
}
```

### 3.7 Logo do servidor

```lua
Config.ServerLogo = {
    enabled = true,
    src     = "",   -- URL ou arquivo em html/; vazio usa a logo do servidor
    width   = 80,   -- px
    x       = 50,   -- posição horizontal (vw %)
    y       = 5,    -- posição vertical (vh %)
}
```

Com a imagem vazia (o padrão), a HUD mostra a logo do servidor: a convar `setr mri:logo "<url>"` do `server.cfg`, ou a logo da MRI quando ela não existe. Quem já tinha a logo da MRI salva no painel passa a seguir a convar também.

### 3.8 Modo de posicionamento

Controla o que pode ser reposicionado no editor de posições (por elemento: `canMove`, `canHide`, `canResize`):

```lua
Config.Positioning = {
    enabled = true,
    elements = {
        statusBar   = { canMove = true, canHide = true,  canResize = false },
        speedometer = { canMove = true, canHide = true,  canResize = true  },
        -- compassHud, moneyHud, minimap, fuelgauge, seatbelt, serverLogo,
        -- aircraftFuel, dynamicGauges ...
    },
}
```

> Elementos custom (orbs, digital, etc.) não precisam ser listados aqui, recebem permissões padrão (todas liberadas).

---

## 4. Uso in-game

| Ação | Padrão |
|---|---|
| Abrir/fechar menu de configurações | tecla **I** ou `/hud` |
| Painel de config **global** (admin) | `/adminhud` |
| Editor de posições (arrastar/ocultar/redimensionar) | menu **I → Layout → Abrir editor** (ESC sai) |
| Ver saldo em dinheiro | `/cash` |
| Ver saldo no banco | `/bank` |
| Alternar dev mode | `/dev` (admin) |

**Menu** (tecla I), em páginas na lateral: **Tela** (vitais sempre visíveis, minimapa, bússola, modo cinema, formato do relógio e desempenho: Suave, Normal ou Leve, que muda de quanto em quanto tempo a HUD atualiza), **Veículo** (unidade km/h ou MPH, motor/nitro, alertas de combustível, cinto e estol do avião), **Áudio** (sons e avisos), **Gráficos** (color grading + pós-processamento nativo), **Layout** (editor de posições, restaurar posições/configurações, reiniciar a HUD) e **Aparência** (galeria de temas; o admin também cria, edita, libera e escolhe o padrão). Admins veem também **Servidor**, com a config global. Passar o mouse numa opção mostra a explicação no painel da direita, ações destrutivas pedem para segurar o botão e cada página tem "Restaurar esta página".

**Painel de config global:** o mesmo painel em três lugares, com o mesmo backend, a página **Servidor** do menu (tecla I), o comando `/adminhud` (modal em tela cheia) e, quando o **mri_Qadmin** está instalado, o plugin **HUD** dentro dele. Nenhum dos três depende do Qadmin exceto o último: a HUD é totalmente autônoma. Admin-only, permissão QBCore `admin`, o nó `mri_Qhud.admin` concedido por grupo do Qadmin, ou ACE `command`. O que for salvo vale para **todos os players** e sobrepõe ajustes locais.

Abas do painel: **Geral** (jogadores escolhem o tema, logomarca e **Resetar HUD inteira**: apaga os temas criados, volta todas as configurações ao padrão de fábrica e limpa as preferências salvas de cada jogador; pede dois cliques), **Veículo** (HUD de veículo, unidade, odômetro), **Player** (vitais sobrenaturais, contas de dinheiro), **HUD** (ícones de status, permissões de posicionamento) e **Efeitos** (stress, chuva, congelamento).

**Bússola:** mostra a rua e o cruzamento (sem cruzamento, o nome da zona) e, com waypoint marcado, a distância em linha reta até ele (m/km, ou ft/mi com MPH). Onde a bússola fica é decisão do tema: as fitas ficam no topo e o Radar fica em volta do minimapa, com a zona, a rua e o waypoint numa peça própria ("Localização") no topo da tela.

**Contorno do minimapa:** o client mede onde o minimapa do GTA realmente fica e manda para a HUD; o contorno tracejado do editor, o anel do Radar e as barras do cine usam essa medida. Se o contorno não cobrir o mapa certinho, o admin ajusta no editor de posições (linha "Contorno do mapa": setas movem, - e + redimensionam, Shift anda mais rápido). O ajuste não move o minimapa, só o contorno, e vale para todos (`Config.MinimapFitX/Y/W/H`).

**Modo de posicionamento:** cada peça vira arrastável, com linhas-guia de alinhamento (ímã ao centro da tela e às bordas de outros elementos), botões de ocultar e de escala, e reset de posição.

---

## 5. Temas e skins

Cada tema pertence a uma família, e a família define o visual de todas as peças ao mesmo tempo:

- **Clássico**: vitais em ícones de status editáveis (forma, cor, tamanho) ou nas barras finas do **Cinemático**, dinheiro no estilo GTA ou do Cinemático, velocímetro **Padrão**, **Esportivo**, **Digital** (`ring`/`arc`/`linear`) ou um dos painéis **APEX**, **ZSX** e **Caminhão** do [Apex Speedometer](https://github.com/bragancaanderson89-dotcom/Apex-Speedometer) (Felipe Becker, usados com autorização), ou o velocímetro do **Cinemático**; bússola em fita clássica, digital ou cinemática, ou **Radar**: um anel em volta do minimapa com as direções girando, o rumo em graus em cima e o waypoint marcado no próprio anel. A zona, a rua e a distância do waypoint ficam numa peça separada ("Localização" no editor), no topo da tela. O Radar acompanha o minimapa no editor de posições e fica melhor com o minimapa redondo.
- **Sobrenatural** (bloqueada por enquanto, aparece como "Em breve"): reskin ocultista (Diablo II). Vitais em **orbes / anéis / barras / cristal / cálice** sobre painéis de pedra, em 6 paletas ou cores livres. No carro, um **relicário** (velocidade, giro e marcha em numeral romano), orbes de combustível e motor e o sigilo do cinto. Bússola gravada em pedra.
- **Cinemático**: barras finas de vida e colete alinhadas ao minimapa, rastro de dano, necessidades com medidor. No carro, velocidade grande com filete de giro e reservas discretas. Bússola de letras finas ou Radar.

Todos os velocímetros mostram as setas do carro (no clássico e no digital ficam apagadas no painel quando desligadas). Segue a cor de destaque da suíte.

No menu **I → Aparência** o jogador escolhe entre os temas liberados (se `PlayerThemeChoice` estiver ligado). Os temas que vêm com a HUD têm **Restaurar original** (no menu do card, segurando para confirmar, ou no editor, antes de salvar), que devolve o visual de fábrica. O admin personaliza qualquer tema num editor com prévia ao vivo (inclusive "Prévia do veículo" a pé), duplica para criar um novo, libera ou esconde dos jogadores e define o padrão do servidor. Salvar o tema padrão aplica para todos na hora. Todas as peças continuam reposicionáveis no editor de posições.

Outros resources podem trocar o tema pelo servidor:

```lua
exports['mri_Qhud']:ApplyTheme('Cinemático')    -- vira o tema padrão do servidor
exports['mri_Qhud']:ApplyTheme('Sangue', src)   -- só o player src, até relogar
exports['mri_Qhud']:ClearPlayerTheme(src)
local themes = exports['mri_Qhud']:GetThemes()  -- { { id, name, published, data } }
```

**Mapa de vitais na skin sobrenatural:**

| Vital | Fonte |
|---|---|
| Vida | `health` (HUD base) |
| Fome | `hunger` (HUD base) |
| Sede | `thirst` (HUD base) |
| Fôlego | stamina de sprint (client) |
| Mana | stat custom persistido (server) |
| Sanidade | stat custom persistido (server) |

---

## 6. Sistema de vitais custom

Três vitais além de vida/fome/sede:

- **Fôlego**, reflete a stamina de sprint (`GetPlayerSprintStaminaRemaining`). Client-side, sem persistência, atualizado automaticamente.
- **Mana** e **Sanidade**, **persistidos** em metadata QBCore (por personagem), **server-autoritativos**, com **regen automático** (`Config.SupernaturalVitals`). Sincronizados ao cliente via statebag, exatamente como fome/sede/stress.

Definidos no servidor por `server/vitals.lua`. O regen só grava enquanto o valor está abaixo do máximo (silencia quando cheio).

### 6.1 Export único (server-side)

```lua
exports['mri_Qhud']:AdjustVital(src, attribute, value, mode)
```

| Parâmetro | Descrição |
|---|---|
| `src` | server id do jogador |
| `attribute` | `'mana'` ou `'sanidade'` |
| `value` | magnitude (≥ 0); em `'set'` é o valor absoluto |
| `mode` | `'add'` (aumenta) \| `'remove'` (reduz) \| `'set'` (crava). Padrão `'add'` |

Retorna o **novo valor** (0..max), já com clamp, sync e persistência, dispensando um getter na maioria dos casos.

```lua
-- Exemplos
exports['mri_Qhud']:AdjustVital(src, 'mana', 25, 'remove')   -- lançar magia gasta 25
exports['mri_Qhud']:AdjustVital(src, 'sanidade', 10, 'add')  -- recupera 10
exports['mri_Qhud']:AdjustVital(src, 'mana', 100, 'set')     -- crava em 100
local mana = exports['mri_Qhud']:AdjustVital(src, 'mana', 0, 'add') -- só lê o atual
```

> **Fôlego** não tem export: é derivado da stamina automaticamente.

---

## 7. API de extensão para outros resources

Três mecanismos para injetar elementos na HUD. Todos seguem o mesmo padrão: um **export** (que roda no contexto do `mri_Qhud`) ou um **evento** equivalente. Cada elemento tem um `id` único e é **reposicionável/ocultável/redimensionável** no editor de posições.

### 7.1 Painéis dinâmicos

Ícone + título + valor (ou uma shape completa via `hudIconInfo`).

```lua
exports['mri_Qhud']:AddHudPanel({
    id = 'radiacao', title = 'Radiação', icon = 'radiation', value = '42%', isShowing = true,
})
exports['mri_Qhud']:UpdateHudPanel('radiacao', { value = '61%' })
exports['mri_Qhud']:RemoveHudPanel('radiacao')
```

Eventos equivalentes: `hud:client:AddPanel(panel)`, `hud:client:UpdatePanel(id, patch)`, `hud:client:RemovePanel(id)`.

### 7.2 Custom orbs (skin sobrenatural)

Orbe com **cor (hex), glifo e label livres**. Aparecem sempre (independem do skin ativo).

```lua
exports['mri_Qhud']:SetHudOrb({
    id = 'corrupcao',   -- obrigatório
    label = 'Corrupção',
    glyph = 'ᛟ',        -- runa/letra/emoji no centro
    color = '#c75b4a',  -- hex; alimenta o líquido e o brilho
    value = 66,         -- 0..maxValue
    size = 72,          -- px (≥70 = orbe grande)
    maxValue = 100,
    lowAt = 25,         -- pulsa alerta quando value ≤ lowAt (0 = nunca)
    left = 480, bottom = 300,  -- âncora default (px); usuário reposiciona no editor de posições
})
exports['mri_Qhud']:UpdateHudOrbValue('corrupcao', 40)  -- só o valor (barato)
exports['mri_Qhud']:RemoveHudOrb('corrupcao')
```

Só o `id` é obrigatório; o resto cai em defaults. Eventos: `hud:client:SetOrb(orb)`, `hud:client:UpdateOrbValue(id, value)`, `hud:client:RemoveOrb(id)`.

### 7.3 Elementos no cluster digital do veículo

Peças que encaixam no tema **digital** do veículo (só aparecem quando o tema digital está ativo e o cluster visível).

```lua
exports['mri_Qhud']:SetDigitalElement({
    id = 'nos',         -- obrigatório
    kind = 'bar',       -- 'bar' | 'pill' | 'text'
    label = 'NOS',
    value = 80,         -- bar: 0..100 · pill: aceso se >0 · text: número exibido
    text = '',          -- pill/text: texto (sobrepõe o número)
    color = '#a87fe0',  -- hex; "" = usa o accent do tema
    glow = true,
    left = 'calc(50% + 220px)', bottom = 108,  -- âncora default no cluster
})
exports['mri_Qhud']:UpdateDigitalElementValue('nos', 40)
exports['mri_Qhud']:RemoveDigitalElement('nos')
```

**Tipos (`kind`):**

| kind | Visual | Campo principal |
|---|---|---|
| `bar` | barra vertical (igual FUEL/ENG/TURBO) | `value` 0..100 |
| `pill` | pílula com ponto (igual BELT) | `text`, aceso se `value` > 0 |
| `text` | número grande + label (igual GEAR/RPM) | `value` / `text` |

Eventos: `hud:client:SetDigitalElement(el)`, `hud:client:UpdateDigitalElementValue(id, value)`, `hud:client:RemoveDigitalElement(id)`.

### 7.4 Exemplo de integração completa (magia + orbe de mana + NOS)

```lua
-- server: consome mana ao lançar magia
RegisterNetEvent('meuscript:castSpell', function()
    local src = source
    local mana = exports['mri_Qhud']:AdjustVital(src, 'mana', 20, 'remove')
    if mana <= 0 then
        TriggerClientEvent('QBCore:Notify', src, 'Mana insuficiente', 'error')
    end
end)

-- client: mostra uma orbe custom de "energia" e atualiza o valor
exports['mri_Qhud']:SetHudOrb({ id = 'energia', label = 'Energia', glyph = 'ᛉ', color = '#5fb87a', value = 100 })
CreateThread(function()
    while true do
        Wait(1000)
        exports['mri_Qhud']:UpdateHudOrbValue('energia', GetEnergiaAtual())
    end
end)
```

### 7.5 Esconder / mostrar a HUD inteira

Para ocultar a HUD toda temporariamente (cutscene, tela de morte, MDT, câmera
livre, etc.). Três caminhos equivalentes, `hide = true` esconde, `false` volta:

```lua
-- 1) export no client
exports['mri_Qhud']:HideHud(true)
exports['mri_Qhud']:HideHud(false)
local escondida = exports['mri_Qhud']:IsHudHidden()  -- lê o estado atual

-- 2) net event (server -> client)
TriggerClientEvent('hud:client:hideHud', src, true)

-- 3) statebag do player (server-side), persiste no player
Player(src).state:set('hideHud', true, true)
```

O próprio jogador também pode esconder pelo menu, em **I → Tela → Esconder HUD** (sem as barras pretas do Modo cinema). Esse motivo é separado do export: um script que chama `HideHud(false)` não reabre a HUD que o jogador escondeu.

A HUD também se esconde sozinha, sem ninguém pedir: antes do player logar
(`isLoggedIn` do Qbox), com o inventário aberto e enquanto houver uma **câmera de
script** renderizando, a tela estiver escurecida (fade) ou houver troca de
personagem (`player switch`). Isso cobre cutscenes, editores de personagem e telas
de spawn. Esconder é imediato; voltar espera ~1 s e confere de novo, para a HUD não
piscar quando um resource devolve a tela e outro já pega em seguida.

Enquanto escondida, somem os **elementos de HUD** (vitais, veículo, bússola,
dinheiro, etc.) e o **minimapa** nativo. Os **efeitos da aba Gráficos**
(color grading + efeitos de tela) **continuam valendo**, não fazem parte da HUD,
são o "look" do player.

### 7.6 Congelamento no frio (temperatura)

A tela vai congelando (gelo nas bordas) conforme a temperatura cai. Configurável
em `Config.ColdFrost` (`startC`, `fullC`, `inVehicle`, `interval`). A fonte da
temperatura é o `provider`:

- **`'mri_Qweather'`** (padrão): lê `exports.mri_Qweather:GetTemperatureData().celsius`.
- **`'custom'`** (ou qualquer outro valor): seu script de clima alimenta a
  temperatura em **°C**:

```lua
-- client
exports['mri_Qhud']:SetTemperature(-5.0)     -- °C
-- ou por evento (ex.: repassado do server)
TriggerEvent('mri_hud:client:setTemperature', -5.0)
```

Intensidade: `0` acima de `startC`, sobe até `1` (máximo) em `fullC`. Desligue
tudo com `Config.ColdFrost.enabled = false`.

### 7.7 ID e nível de procurado

Acima do dinheiro a HUD mostra o **ID do jogador** no servidor e, quando ele está
procurado, **estrelas de 1 a 5** (piscam quando o nível sobe). A peça se chama
"ID e procurado" no editor de posições (dá para mover, redimensionar e esconder).

O nível vem do statebag `wantedLevel` do player. A HUD não decide quem está
procurado: o script de polícia, MDT ou crime define o valor no **server**:

```lua
Player(src).state:set('wantedLevel', 3, true)  -- 0 a 5; 0 esconde as estrelas
```

O nível nativo do GTA não é usado (na base Qbox ele fica desligado pelo
`qbx_disableservices`).

Com o módulo **Passaporte** do mri_Qbox ligado, uma pílula **Passaporte** aparece ao lado do ID com o número fixo do personagem. Ela lê o statebag `passport` do player e some quando ele não existe (sem o mri_Qbox, módulo desligado ou sem personagem carregado). O ID e o passaporte têm interruptores separados no painel Servidor, aba HUD (`Config.ShowServerId` e `Config.ShowPassport`).

---

## 8. Referência de eventos NUI

Contrato completo em `nui-events.json`. Principais mensagens **Lua → NUI** (`SendNUIMessage`):

| action | topics | Uso |
|---|---|---|
| `hudtick` | `display`, `status` | Status do jogador (vida, armor, fome, sede, stress, voz, oxigênio…) |
| `car` | `display`, `status`, `speed` | HUD de veículo |
| `vitals` | `supernatural` | Vitais custom da skin (`folego`, `mana`, `sanidade`) |
| `panel` | `add`, `remove`, `update`, `list` | Painéis dinâmicos |
| `orb` | `set`, `value`, `remove`, `list`, `clear` | Custom orbs |
| `digitalelement` | `set`, `value`, `remove`, `list`, `clear` | Elementos custom do cluster digital |
| `gauge` | `set`, `value`, `remove`, `show`, `list`, `clear` | Gauges dinâmicos |
| `updatemoney` / `show` / `showconstant` |, | Dinheiro |
| `baseplate` / `update` | compass | Bússola |
| `hudconfig` |, | Config global (icons, serverLogo, positioning, dinheiro, unidade) |
| `themes` |, | Biblioteca de temas (`themes`, `defaultId`, `choice`, `admin`) |
| `forcedTheme` |, | Tema imposto só para este jogador (`data`; `null` limpa) |
| `setLocales` |, | Dicionário de tradução (ox_lib) |

> `orb` e `digitalelement` são normalmente disparados pelos exports da [seção 7](#7-api-de-extensão-para-outros-resources), não é preciso montar o `SendNUIMessage` na mão.

---

## 9. Integração de estresse

O HUD já expõe eventos de servidor para outros scripts ajustarem estresse (persistido em metadata):

```lua
TriggerServerEvent('hud:server:GainStress', amount)     -- ganha estresse
TriggerServerEvent('hud:server:RelieveStress', amount)  -- alivia estresse
```

O cliente também escuta `hud:client:UpdateStress(valor)` e o statebag `stress`.

---

## 10. Desenvolvimento do front-end

O front fica em `web/` (React + Vite + TypeScript). Stores Zustand em `web/src/stores/`, componentes em `web/src/components/`.

### Build

```bash
cd web
pnpm install
pnpm build      # gera html/ (carregado pelo FiveM) e seta debugMode=false
```

### Preview no navegador (sem FiveM)

```bash
cd web
pnpm dev   # dev server em http://localhost:5173, já com debugMode (HUD sempre visível + mocks)
```

Com `debugMode = true`, a HUD e o menu ficam sempre visíveis e valores animam automaticamente. Mocks de preview (incluindo uma orbe custom e um elemento digital) ficam em `web/src/debugMocks.ts`.

> Alterações apenas em **Lua/config/json** não precisam de build, basta reiniciar o resource. Alterações no **web** exigem `pnpm build`.

### Compatibilidade CEF (importante)

O Chromium do FiveM é antigo: **não** suporte `oklch()` nem `color-mix`. Use `rgb`/`rgba`/`hsl`/hex em qualquer estilo da HUD. `conic-gradient` é suportado.

---

## 11. Solução de problemas

| Sintoma | Causa provável / solução |
|---|---|
| Minimapa pisca com mapa custom | `ensure mri_Qhud` **antes** do recurso de mapa no `server.cfg` |
| Exports não funcionam | Confira o nome do resource em `exports['mri_Qhud']` (use o nome real da pasta) |
| Mana/sanidade travadas em 100 | `Config.SupernaturalVitals.enabled` deve ser `true`; verifique se `server/vitals.lua` carregou |
| Orbe custom não aparece | Envie ao menos `id`; confira se o valor foi setado; orbes aparecem em qualquer skin |
| Elemento digital não aparece | Só aparece com um tema clássico de velocímetro **Digital** ativo e dentro de um veículo |
| Menu com cantos pretos / borda estranha | Efeito antigo do CEF já corrigido no `Menu.tsx` (máscara alpha); rebuild do web |
| Cores inválidas in-game | Não use `oklch`/`color-mix` (ver seção 10) |
| Locales não traduzem | `ox_lib` atualizado e `qb_locale` setado no `server.cfg` |

---

*Mantido pela MRI Qbox Brasil. Base original: Project Sloth (ps-hud).*
