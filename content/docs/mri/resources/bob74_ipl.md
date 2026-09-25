---
title: Bob74 IPL
---

Carregador de IPLs: liga os interiores do GTA V e do GTA Online, corrige buracos no mapa e permite customizar mobília, estilo e props de cada interior.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Como funciona](#como-funciona)
4. [Configuração](#configuração)
5. [Interiores disponíveis](#interiores-disponíveis)
6. [Builds mínimas por DLC](#builds-mínimas-por-dlc)
7. [Observadores](#observadores)
8. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
9. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| — | — | O recurso é standalone e roda inteiramente no cliente. Não usa framework, banco de dados nem `ox_lib` |

O que ele exige não é outro recurso, e sim a **build do jogo**: cada DLC só carrega a partir de uma build mínima (ver [Builds mínimas por DLC](#builds-mínimas-por-dlc)). O `client.lua` já protege cada bloco com `if GetGameBuildNumber() >= <build> then`, então rodar numa build antiga não quebra nada — os interiores daquele DLC simplesmente não sobem.

---

## Instalação

1. Copie a pasta `bob74_ipl` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure bob74_ipl
   ```
3. Force a build do jogo compatível com os DLCs que quiser usar, no `server.cfg`:
   ```
   sv_enforceGameBuild 3717
   ```
4. Edite o `client.lua` para escolher quais interiores carregar (ver [Configuração](#configuração)).
5. **Conflitos** — não rode junto com outro loader de IPL (`gabz`, `ipl-loader`, etc.) que carregue os mesmos interiores. Dois recursos requisitando e removendo o mesmo IPL disputam o estado dele.

Não há SQL a importar.

---

## Como funciona

Cada interior é um objeto global Lua (`Michael`, `DiamondCasino`, `TunerGarage`…) definido no arquivo do seu DLC. Todos seguem o mesmo desenho:

```lua
DiamondCasino = {
    Ipl = {
        Building = {
            ipl = { "hei_dlc_windows_casino", "hei_dlc_casino_aircon", ... },
            Load   = function() EnableIpl(DiamondCasino.Ipl.Building.ipl, true)  end,
            Remove = function() EnableIpl(DiamondCasino.Ipl.Building.ipl, false) end
        },
        Main    = { ... },
        Garage  = { ... },
        Carpark = { ... }
    },

    LoadDefault = function()
        DiamondCasino.Ipl.Building.Load()
        DiamondCasino.Ipl.Main.Load()
        DiamondCasino.Ipl.Carpark.Load()
        DiamondCasino.Ipl.Garage.Load()
    end
}
```

O `client.lua` é a única coisa que você precisa editar: ele é uma lista de chamadas a `LoadDefault()` e `Enable()` dos interiores que devem subir. Comentar uma linha desliga aquele interior.

Interiores com mobília (casas, escritórios, clubhouses) expõem também tabelas de estilo — `Style`, `Wallpaper`, `Bed`, `Numbering`, `WallFloor`, `TVScreen`, entre outras, conforme o interior. Cada uma tem um `Set(...)` e um `Clear(...)` que ligam e desligam os *entity sets* do interior.

---

## Configuração

Não existe arquivo de config: a configuração **é o `client.lua`**. Cada linha dele chama um método do objeto do interior.

| Método | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `<Interior>.LoadDefault()` | função | Não | Carrega o interior com os IPLs e o estilo padrão do autor. É a chamada usada na maioria das linhas do `client.lua` |
| `<Interior>.Enable(bool)` | função | Não | Liga (`true`) ou desliga (`false`) o interior. Usada nos interiores que são simples chaves liga/desliga (Bahama Mamas, Pillbox, UFO, North Yankton, Red Carpet, carrier do heist, grafites) |
| `<Interior>.Ipl.<Parte>.Load()` | função | Não | Carrega só uma parte do interior (ex.: `DiamondCasino.Ipl.Garage.Load()`) |
| `<Interior>.Ipl.<Parte>.Remove()` | função | Não | Descarrega essa parte |
| `<Interior>.Style.Set(estilo, refresh)` | função | Não | Aplica um conjunto de mobília. Os valores válidos são as chaves da tabela `Style` daquele interior |
| `<Interior>.Style.Clear(refresh)` | função | Não | Remove todos os conjuntos de mobília do interior |
| `<Interior>.interiorId` | number | — | Id do interior no jogo. Usado internamente pelo `SetIplPropState` |

O parâmetro `refresh` de `Set`/`Clear` chama `RefreshInterior` no fim da operação. Ao aplicar várias mudanças em sequência, passe `false` em todas menos na última, para recarregar o interior uma única vez.

Exemplo — casa do Michael com a mobília bagunçada:

```lua
Michael.LoadDefault()
Michael.Style.Set(Michael.Style.moved, true)
```

Exemplo — Diamond Casino sem a garagem do cassino:

```lua
DiamondCasino.Ipl.Building.Load()
DiamondCasino.Ipl.Main.Load()
DiamondCasino.Ipl.Carpark.Load()
-- garagem não carregada
```

O casino vem **comentado por padrão** no `client.lua`. Para ligá-lo, descomente as linhas dentro do bloco `if GetGameBuildNumber() >= 2060`.

---

## Interiores disponíveis

### GTA V (single player)

`Michael`, `Franklin`, `FranklinAunt`, `Floyd`, `TrevorsTrailer`, `Simeon`, `BahamaMamas`, `PillboxHospital`, `ZancudoGates`, `Ammunations`, `LesterFactory`, `StripClub`, `CargoShip`, `Graffitis`, `UFO` (`Hippie`, `Chiliad`, `Zancudo`), `RedCarpet`, `NorthYankton`.

`gtav/base.lua` carrega os IPLs base que tapam buracos do mapa — não desligue.

### GTA Online

`GTAOApartmentHi1`, `GTAOApartmentHi2`, `GTAOHouseHi1` a `GTAOHouseHi8`, `GTAOHouseMid1`, `GTAOHouseLow1`.

### DLCs

| DLC | Objetos |
|---|---|
| High Life | `HLApartment1` a `HLApartment6` |
| Heists | `HeistCarrier`, `HeistYacht` |
| Executives & Other Criminals | `ExecApartment1`, `ExecApartment2`, `ExecApartment3` |
| Finance & Felony | `FinanceOffice1` a `FinanceOffice4`, `FinanceOrganization` |
| Bikers | `BikerCocaine`, `BikerCounterfeit`, `BikerDocumentForgery`, `BikerMethLab`, `BikerWeedFarm`, `BikerClubhouse1`, `BikerClubhouse2`, `BikerGang` |
| Import/Export | `ImportCEOGarage1` a `ImportCEOGarage4`, `ImportVehicleWarehouse` |
| Gunrunning | `GunrunningBunker`, `GunrunningYacht` |
| Smuggler's Run | `SmugglerHangar` |
| The Doomsday Heist | `DoomsdayFacility` |
| After Hours | `AfterHoursNightclubs` |
| Diamond Casino | `DiamondCasino`, `DiamondPenthouse`, `DiamondArcade`, `DiamondArcadeBasement` |
| Cayo Perico | `CayoPericoNightclub`, `CayoPericoSubmarine` |
| Los Santos Tuners | `TunerGarage`, `TunerMeetup`, `TunerMethLab` |
| The Contract | `MpSecurityStudio`, `MpSecurityBillboards`, `MpSecurityMusicRoofTop`, `MpSecurityGarage`, `MpSecurityOffice1` a `MpSecurityOffice4` |
| The Criminal Enterprises | `CriminalEnterpriseSmeonFix`, `CriminalEnterpriseVehicleWarehouse`, `CriminalEnterpriseWarehouse` |
| Los Santos Drug Wars | `DrugWarsFreakshop`, `DrugWarsGarage`, `DrugWarsLab`, `DrugWarsTrainCrash` |
| San Andreas Mercenaries | `MercenariesClub`, `MercenariesLab`, `MercenariesFixes` |
| The Chop Shop | `ChopShopCargoShip`, `ChopShopCartelGarage`, `ChopShopLifeguard`, `ChopShopSalvage` |
| Bottom Dollar Bounties | `SummerCarrier`, `SummerOffice` |
| Agents of Sabotage | `AgentsFactory`, `AgentsOffice`, `AgentsAirstrip`, `AgentsHangarDoor` |
| Money Fronts | `MoneyCarwash`, `MoneyOffice`, `MoneyConstruction` |
| A Safehouse in the Hills | `Mansion1`, `Mansion2`, `Mansion3`, `MansionBasement1` a `MansionBasement3` |

Nem todos os objetos existentes são chamados no `client.lua` padrão. `DiamondCasino`, `DiamondPenthouse`, `DiamondArcade` e `DiamondArcadeBasement` estão comentados; `BikerGang`, `FinanceOrganization`, `DrugWarsTrainCrash` e `MoneyConstruction` não aparecem no `client.lua`, mas existem como módulos e podem ser chamados.

---

## Builds mínimas por DLC

| DLC | Build mínima |
|---|---|
| Diamond Casino | 2060 |
| Cayo Perico Heist | 2189 |
| Los Santos Tuners | 2372 |
| The Contract | 2545 |
| The Criminal Enterprises | 2699 |
| Los Santos Drug Wars | 2802 |
| San Andreas Mercenaries | 2944 |
| The Chop Shop | 3095 |
| Bottom Dollar Bounties | 3258 |
| Agents of Sabotage | 3407 |
| Money Fronts | 3570 |
| A Safehouse in the Hills | 3717 |

Os DLCs anteriores ao casino não têm gate de build no `client.lua`.

---

## Observadores

Três threads em `lib/observers/` rodam o tempo todo no cliente:

| Arquivo | O que faz |
|---|---|
| `interiorIdObserver.lua` | Descobre em qual interior o jogador está e atualiza as flags de `Global` (ex.: `Global.Security.isInsideOffice1`). É o que alimenta os outros dois observadores |
| `officeSafeDoorHandler.lua` | Abre e fecha as portas do cofre dos escritórios conforme o estado configurado |
| `officeCullHandler.lua` | Corrige o culling dos escritórios do DLC The Contract enquanto o jogador está dentro deles |

---

## Entrypoints para outros recursos

### Exports gerais

```lua
-- Carrega (true) ou remove (false) um IPL, ou uma tabela de IPLs
exports.bob74_ipl:EnableIpl('vw_casino_main', true)
exports.bob74_ipl:EnableIpl({ 'hei_dlc_casino_aircon', 'vw_dlc_casino_door' }, false)

-- Tabela Global com o interior atual e as flags de "estou dentro de X"
local g = exports.bob74_ipl:GVariables()
if g.Security.isInsideOffice1 then end
print(g.currentInteriorId)

-- Textura de headshot de um ped (usada nos quadros e telas dos interiores)
local txd = exports.bob74_ipl:GetPedheadshotTexture(ped)
```

### Exports por interior

Cada interior expõe um export `Get<Nome>Object` que devolve o objeto Lua completo — com `interiorId`, a árvore de `Ipl` e as tabelas de estilo. É assim que outro recurso customiza um interior em runtime:

```lua
local michael = exports.bob74_ipl:GetMichaelObject()
michael.Style.Set(michael.Style.moved, true)

local casino = exports.bob74_ipl:GetDiamondCasinoObject()
casino.Ipl.Garage.Load()

local office = exports.bob74_ipl:GetFinanceOffice1Object()
```

O nome do export segue o nome do objeto. Os módulos mais antigos usam o sufixo `Object` (`GetMichaelObject`, `GetDiamondCasinoObject`, `GetFinanceOffice1Object`); os mais recentes não (`GetMansion1`, `GetMoneyOffice`, `GetAgentsFactory`, `GetCayoPericoNightclub`). Na dúvida, confira a primeira linha do arquivo do módulo.

---

## Estrutura de arquivos

```
bob74_ipl/
├── client.lua                       — configuração: quais interiores carregar e com qual estilo
├── lib/
│   ├── common.lua                   — EnableIpl, SetIplPropState, tabela Global, helpers de scaleform/headshot
│   └── observers/
│       ├── interiorIdObserver.lua   — detecta o interior atual e atualiza as flags de Global
│       ├── officeSafeDoorHandler.lua— portas do cofre dos escritórios
│       └── officeCullHandler.lua    — correção de culling nos escritórios do The Contract
├── gtav/                            — interiores do single player (Michael, Franklin, Simeon…) e o base.lua que tapa buracos do mapa
├── gta_online/                      — apartamentos e casas do GTA Online
├── gta_mpsum2/                      — The Criminal Enterprises
├── dlc_high_life/                   — apartamentos High Life
├── dlc_heists/                      — carrier e iate dos heists
├── dlc_executive/                   — penthouses da Eclipse Towers
├── dlc_finance/                     — escritórios de CEO
├── dlc_bikers/                      — clubhouses e laboratórios do MC
├── dlc_import/                      — garagens de CEO e armazém de veículos
├── dlc_gunrunning/                  — bunkers e iate
├── dlc_smuggler/                    — hangar
├── dlc_doomsday/                    — facility
├── dlc_afterhours/                  — nightclubs
├── dlc_casino/                      — cassino, penthouse e arcade (comentados no client.lua)
├── dlc_cayoperico/                  — ilha, nightclub e submarino
├── dlc_tuner/                       — garagem, meetup e meth lab
├── dlc_security/                    — The Contract: estúdio, escritórios, garagem
├── dlc_drugwars/                    — freakshop, garagem, lab, train crash
├── dlc_mercenaries/                 — club, lab e correções de mapa
├── dlc_chopshop/                    — cargo ship, garagem do cartel, salvage
├── dlc_bounties/                    — carrier e escritório
├── dlc_agents/                      — fábrica, escritório, pista de pouso, porta do hangar
├── dlc_money/                       — lava-jato, escritório, construção
├── dlc_mansions/                    — mansões e seus subsolos
├── stream/                          — 19 arquivos de colisão (.ybn), ymap e ytyp que corrigem buracos e props do mapa
└── fxmanifest.lua
```
