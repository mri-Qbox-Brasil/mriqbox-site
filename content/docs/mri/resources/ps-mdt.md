---
title: PS MDT
---

Terminal de dados móvel (MDT) para polícia, EMS e judiciário: perfis civis, incidentes, relatórios, BOLOs, código penal, registro de veículos e armas, depósito, mugshots e controle de ponto.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Banco de dados](#banco-de-dados)
4. [Configuração](#configuração)
5. [Permissões por job e grade](#permissões-por-job-e-grade)
6. [Abrir o MDT](#abrir-o-mdt)
7. [Comandos](#comandos)
8. [Módulos](#módulos)
9. [Multas, prisão e serviço comunitário](#multas-prisão-e-serviço-comunitário)
10. [Registro de armas](#registro-de-armas)
11. [Mugshots](#mugshots)
12. [Ponto e leaderboard](#ponto-e-leaderboard)
13. [Webhooks do Discord](#webhooks-do-discord)
14. [Integrações](#integrações)
15. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
16. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qb-core` | Sim | O recurso usa `exports['qb-core']:GetCoreObject()` diretamente |
| `oxmysql` | Sim | Todas as tabelas `mdt_*` |
| `ps-dispatch` | Não | Chamados exibidos no MDT e alerta de parada de trânsito. Sem ele, a aba de chamados fica vazia |
| `ox_inventory` | Não | Imagens e registro automático de armas (`Config.InventoryForWeaponsImages`) |
| `pickle_prisons` | Não | Envio para a cadeia pela UI (`pickle_prisons:jailPlayer`) |
| `qb-communityservice` | Não | Serviço comunitário |
| `qb-banking` | Não | Deposita o valor da multa no cofre da sociedade (`Config.QBBankingUse`) |
| `qb-garage` | Não | Propriedades do veículo ao retirar do depósito |
| `cdn-fuel` (ou outro) | Não | Definido em `Config.Fuel`; usado ao retirar veículo do depósito |
| `wk_wars2x` | Não | Leitor de placas (`Config.UseWolfknightRadar`) |
| `ps-housing` / `qb-apartments` | Não | Endereço do civil no perfil |

---

## Instalação

1. Copie a pasta `ps-mdt` para `resources/`.
2. Importe o SQL:
   - `sql/qbox.sql` para servidores QBox
   - `sql/qbcore.sql` para QBCore
3. Adicione ao `server.cfg`:
   ```
   ensure ps-mdt
   ```
4. Cadastre o item `mdtcitation` no inventário — é o comprovante entregue ao civil multado.
5. Configure os webhooks e/ou o Fivemerr no topo de `server/main.lua` (linhas 18 a 33). Sem isso, mugshots e logs de ponto não funcionam.
6. Ajuste `Config.PoliceJobs`, `Config.AmbulanceJobs` e `Config.DojJobs` para os jobs do seu servidor.

**Conflitos** — não rode junto com outro MDT (`qb-mdt`, etc.). O recurso também intercepta o `QBCore:Client:SetDuty` para bater o ponto.

---

## Banco de dados

| Tabela | Conteúdo |
|---|---|
| `mdt_data` | Ficha do civil: informações, tags, galeria, foto de perfil, digital. Chave: `cid` + `jobtype` |
| `mdt_incidents` | Incidentes: título, detalhes, tags, oficiais e civis envolvidos, evidências |
| `mdt_convictions` | Acusações ligadas a um incidente: mandado, culpado, processado, multa e sentença |
| `mdt_reports` | Relatórios |
| `mdt_bolos` | BOLOs, com placa e indivíduo |
| `mdt_bulletin` | Quadro de avisos (10 últimos por jobtype) |
| `mdt_logs` | Log de ações no MDT (250 últimos por jobtype) |
| `mdt_vehicleinfo` | Ficha do veículo: informação, roubado, code 5, imagem, pontos |
| `mdt_weaponinfo` | Ficha da arma por número de série: dono, classe, modelo, imagem |
| `mdt_impound` | Veículos apreendidos: relatório vinculado, taxa, data |
| `mdt_clocking` | Ponto: entrada, saída e tempo total por `citizenid` |

As fichas usam a coluna `jobtype` (`police`, `ambulance` ou `doj`) para separar o que cada departamento enxerga.

---

## Configuração

Arquivo: `shared/config.lua`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.UsingPsHousing` | bool | Sim | Busca o endereço do civil no `ps-housing`. Padrão: `false` |
| `Config.UsingDefaultQBApartments` | bool | Sim | Busca o apartamento na tabela `apartments` do `qb-apartments`. Padrão: `true` |
| `Config.OnlyShowOnDuty` | bool | Sim | Só lista unidades em serviço no MDT. Padrão: `true` |
| `Config.FivemerrMugShot` | bool | Sim | Hospeda os mugshots no Fivemerr (imagens não expiram). Exige a API key em `server/main.lua` |
| `Config.MugShotWebhook` | bool | Sim | Hospeda os mugshots em um webhook do Discord. As imagens expiram. Tem precedência sobre o Fivemerr |
| `Config.UseCQCMugshot` | bool | Sim | Tira o mugshot automaticamente ao mandar o civil para a cadeia. Padrão: `false` |
| `Config.MugPhotos` | number | Sim | Quantas fotos por mugshot. `1` = frontal, `4` = frontal e perfis. Padrão: `1` |
| `Config.BillVariation` | bool | Sim | `true` debita a multa direto do banco do civil. `false` envia como fatura via comando `/bill` do qb-core. Padrão: `true` |
| `Config.QBBankingUse` | bool | Sim | Também credita a multa na conta da sociedade do job do oficial. Padrão: `false` |
| `Config.InventoryForWeaponsImages` | string | Sim | Inventário usado para as imagens das armas. Padrão: `ox_inventory` |
| `Config.RegisterWeaponsAutomatically` | bool | Sim | Registra no MDT toda arma comprada em loja do `ox_inventory`. Só funciona com `ox_inventory` |
| `Config.RegisterCreatedWeapons` | bool | Sim | Também registra armas criadas via `ox_inventory:AddItem` (precisam ter `serial` na metadata) |
| `Config.Fuel` | string | Sim | Recurso de combustível usado ao retirar do depósito. Padrão: `cdn-fuel` |
| `Config.sopLink` | table | Sim | Link do SOP por job. Aparece como botão no MDT |
| `Config.RosterLink` | table | Sim | Link do roster por job |
| `Config.PoliceJobs` | table | Sim | Jobs tratados como `police`: acesso total (incidentes, BOLOs, depósito) |
| `Config.AmbulanceJobs` | table | Sim | Jobs tratados como `ambulance` |
| `Config.DojJobs` | table | Sim | Jobs tratados como `doj` (advogado, juiz) |
| `Config.ImpoundLocations` | vector4[] | Sim | Pontos onde o veículo apreendido é entregue. Precisa bater com o `qb-policejob` |
| `Config.UseWolfknightRadar` | bool | Sim | Ativa a integração com o `wk_wars2x`. Padrão: `false` |
| `Config.WolfknightNotifyTime` | number | Sim | Duração da notificação de placa escaneada, em ms. Padrão: `5000` |
| `Config.PlateScanForDriversLicense` | bool | Sim | O leitor de placas também avisa se o dono não tem habilitação |
| `Config.LogPerms` | table | Sim | `job -> { grade = true }` que pode ver a aba de logs |
| `Config.RemoveIncidentPerms` | table | Sim | Quem pode apagar incidentes |
| `Config.RemoveReportPerms` | table | Sim | Quem pode apagar relatórios |
| `Config.RemoveWeaponsPerms` | table | Sim | Quem pode apagar registros de arma |
| `Config.PenalCodeTitles` | table | Sim | Os 10 títulos de categoria do código penal |
| `Config.PenalCode` | table | Sim | Crimes por categoria: `title`, `class`, `id`, `months`, `fine`, `color`, `description` |
| `Config.ColorNames` | table | Sim | Nomes das cores de veículo por índice do GTA |
| `Config.ColorInformation` | table | Sim | Cor "genérica" (usada na busca por cor) por índice |
| `Config.ClassList` | table | Sim | Nomes das classes de veículo |
| `Config.AllowedJobs` | table | (gerado) | União automática de `PoliceJobs`, `AmbulanceJobs` e `DojJobs`. Não edite manualmente |

`Config.MugShotWebhook` e `Config.FivemerrMugShot` são mutuamente exclusivos na prática: o código verifica o webhook primeiro e só cai no Fivemerr se ele estiver `false`.

---

## Permissões por job e grade

O acesso ao MDT é liberado para qualquer job presente em `Config.AllowedJobs` (a união dos três grupos). O servidor valida isso em `PermCheck` a cada operação sensível.

O tipo do job (`GetJobType`) define o que aparece:

| Tipo | Origem | Acesso |
|---|---|---|
| `police` | `Config.PoliceJobs` | Tudo: incidentes, acusações, BOLOs, depósito, armas |
| `ambulance` | `Config.AmbulanceJobs` | Fichas e relatórios com `jobtype = 'ambulance'` |
| `doj` | `Config.DojJobs` | Consulta de perfis e incidentes |

As quatro tabelas de permissão por grade (`LogPerms`, `RemoveIncidentPerms`, `RemoveReportPerms`, `RemoveWeaponsPerms`) usam o formato `job -> { [grade] = true }`. Por padrão, apenas o grade `4` de cada job tem essas permissões.

O recurso **não usa ACE** — tudo é baseado em job e grade.

---

## Abrir o MDT

O MDT abre pela tecla **M** (keybind padrão, remapeável nas configurações do FiveM). O comando registrado por trás dela é `/mriQ_mdt`.

Requisitos para abrir:
- O job precisa estar em `Config.AllowedJobs`.
- O personagem não pode estar morto, em last stand, algemado, nem com o menu de pause aberto.

Enquanto o MDT está aberto, o personagem segura um tablet (`prop_cs_tablet`) com animação.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/mriQ_mdt` | Job em `Config.AllowedJobs` | Abre o MDT. Ligado à tecla `M` por padrão |
| `/restartmdt` | Qualquer jogador | Fecha a NUI e libera o foco. Use se a interface travar |
| `/mdtleaderboard` | Job em `PoliceJobs` ou `AmbulanceJobs` | Envia ao Discord o ranking de horas de ponto |
| `/isfelon` | Qualquer jogador | Comando de debug: consulta o `cid` fixo `1998` e não retorna nada visível |

O comando `/registerweapon` (auto-registro da arma em mãos) existe no código mas está **comentado** em `client/main.lua`. Para habilitar, descomente o bloco.

---

## Módulos

| Aba | Função |
|---|---|
| Dashboard | Quadro de avisos, mandados ativos, últimos relatórios, chamados do `ps-dispatch`, unidades ativas |
| Perfis | Busca de civis por nome ou CID. Informações, tags, galeria, digital, foto, licenças, veículos, propriedades, condenações |
| Incidentes | Criação e edição de incidentes, com oficiais/civis envolvidos, evidências e acusações do código penal (multa e sentença) |
| Relatórios | Relatórios livres por tipo, com galeria e envolvidos |
| BOLOs | BOLOs por placa ou indivíduo. Consultados automaticamente pelo leitor de placas |
| Veículos | Ficha por placa: informações, marcado como roubado, code 5, pontos na carteira, imagem, apreensão |
| Armas | Ficha por número de série: dono, classe, modelo, imagem, notas |
| Depósito | Veículos apreendidos, com taxa e relatório vinculado. Retirada nos pontos de `Config.ImpoundLocations` |
| Chamados | Chamados do `ps-dispatch`, com anexo de unidades e marcação de waypoint |
| Logs | Últimas 250 ações registradas. Requer grade em `Config.LogPerms` |

Cada acusação lançada num incidente usa o código penal do config: `months` (sentença) e `fine` (multa) alimentam os valores recomendados (`recsentence` e `recfine`) na tabela `mdt_convictions`.

---

## Multas, prisão e serviço comunitário

**Multa** — lançada a partir de um incidente. O comportamento depende de `Config.BillVariation`:

- `true` — o servidor debita direto do banco do civil (`RemoveMoney('bank', ...)`) e entrega o item `mdtcitation` com os dados da multa. Há um anti-spam global de 60 segundos entre multas.
- `false` — executa o comando `/bill` do `qb-core`, mandando a fatura para o telefone do civil, e entrega o `mdtcitation`. A dívida pode ficar sem ser paga.

Se `Config.QBBankingUse` estiver ativo, o valor também é creditado na conta da sociedade do job do oficial via `qb-banking`.

**Prisão** — pela UI, dispara `pickle_prisons:jailPlayer` com o tempo da sentença. Se `Config.UseCQCMugshot` estiver ativo, o mugshot é tirado antes (com 5 segundos de espera).

**Serviço comunitário** — dispara `qb-communityservice:server:StartCommunityService` com a duração informada.

---

## Registro de armas

Cada arma é identificada pelo **número de série** e gravada em `mdt_weaponinfo`. Existem três caminhos:

1. **Automático na compra** — com `ox_inventory` e `Config.RegisterWeaponsAutomatically = true`, o recurso registra um hook `buyItem`: toda compra de item cujo nome comece com `WEAPON_` e tenha `serial` na metadata é registrada em nome do comprador, com a imagem do `ox_inventory`.
2. **Automático na criação** — com `Config.RegisterCreatedWeapons = true`, o mesmo vale para o hook `createItem` (armas dadas por outros recursos via `AddItem`, desde que tenham `serial` na metadata).
3. **Manual** — o oficial cria ou edita a ficha pela aba de Armas do MDT.

O export `CreateWeaponInfo` está disponível para registrar de fora (ver [Entrypoints](#entrypoints-para-outros-recursos)).

---

## Mugshots

O mugshot posiciona o civil contra um painel, tira `Config.MugPhotos` fotos e sobe as imagens. O destino depende do config:

- `Config.MugShotWebhook = true` — sobe para o webhook do Discord definido em `server/main.lua`. **As imagens expiram** — a foto do perfil quebra depois de um tempo.
- `Config.FivemerrMugShot = true` — sobe para o Fivemerr, usando a API key definida em `server/main.lua`. As imagens não expiram. É o caminho recomendado.

As URLs voltam para o servidor pelo evento `psmdt-mugshot:server:MDTupload` e são gravadas em `mdt_data.pfp` / `gallery`.

---

## Ponto e leaderboard

O ponto é batido automaticamente quando o jogador entra ou sai de serviço (evento `QBCore:Client:SetDuty`):

- **Entrada** — grava `clock_in_time` em `mdt_clocking` e posta no webhook de clock-in.
- **Saída** — calcula `total_time` (diferença em segundos) e posta o total no webhook.

O comando `/mdtleaderboard` envia o ranking completo por tempo total para o Discord. A aba de logs do MDT também exibe os 25 melhores.

---

## Webhooks do Discord

Definidos no topo de `server/main.lua`, **não no config**:

| Variável | Linha | Uso |
|---|---|---|
| `FivemerrMugShot` / `FivemerrApiKey` | 18–19 | Endpoint e chave da API do Fivemerr |
| `MugShotWebhook` | 25 | Webhook onde as imagens de mugshot são postadas |
| `ClockinWebhook` | 29 | Entradas e saídas de ponto, e o leaderboard |
| `IncidentWebhook` | 33 | Criação e edição de incidentes |

O recurso avisa no console (em vermelho) na inicialização se um webhook necessário estiver vazio.

---

## Integrações

### ps-dispatch

Os chamados do MDT vêm de `exports['ps-dispatch']:GetDispatchCalls()`. O cliente informa ao servidor se o dispatch está rodando (`ps-mdt:dispatchStatus`). Sem o `ps-dispatch`, a aba de chamados fica vazia, mas o resto do MDT funciona.

O alerta de parada de trânsito usa `exports['ps-dispatch']:CustomAlert` com o código `10-11`.

### wk_wars2x (Wolfknight Radar)

Com `Config.UseWolfknightRadar = true`, o recurso escuta `wk:onPlateScanned` e, ao escanear uma placa, notifica o oficial se houver:

- BOLO ativo para a placa;
- mandado ativo ligado à placa;
- (com `Config.PlateScanForDriversLicense`) dono sem habilitação.

Em qualquer um desses casos, a placa é travada no radar (`wk:togglePlateLock`).

O evento `ps-mdt:client:trafficStop` (só registrado com o Wolfknight ligado) dispara o alerta de parada de trânsito no dispatch, com cooldown de 15 segundos e exigência de estar em viatura.

### ox_inventory

Usado para as imagens das armas (`https://cfx-nui-ox_inventory/web/images/<item>.png`) e para os hooks de registro automático (`buyItem` e `createItem`).

### ps-housing / qb-apartments

O endereço exibido no perfil do civil vem de um dos dois, conforme `Config.UsingPsHousing` e `Config.UsingDefaultQBApartments`. Se o civil não tiver propriedade, o recurso avisa no console para desligar a flag correspondente.

### Depósito (qb-policejob)

Os pontos de `Config.ImpoundLocations` precisam ser os mesmos do `qb-policejob` — o menu do qb-policejob envia a localização escolhida no evento. Ao retirar um veículo, o recurso usa o `qb-garage` para as propriedades, `Config.Fuel` para o combustível e dispara `police:server:TakeOutImpound` e `vehiclekeys:client:SetOwner`.

---

## Entrypoints para outros recursos

### Export `CreateWeaponInfo` (servidor)

Registra ou atualiza a ficha de uma arma pelo número de série.

```lua
exports['ps-mdt']:CreateWeaponInfo(serial, imageurl, notes, owner, weapClass, weapModel)
```

`owner` é o `citizenid` do dono.

### Export `IsCidFelon` (servidor)

Verifica, via callback, se o `citizenid` tem alguma condenação por crime (`Felony`).

```lua
exports['ps-mdt']:IsCidFelon(citizenid, function(isFelon)
    print(isFelon)
end)
```

### Export `isRequestVehicle` (servidor)

Retorna `true` se o veículo estava na fila de retirada do depósito, e o remove da fila.

```lua
local ok = exports['ps-mdt']:isRequestVehicle(vehicleId)
```

### Evento `mdt:server:registerweapon`

Atalho para o `CreateWeaponInfo` a partir do cliente.

```lua
TriggerServerEvent('mdt:server:registerweapon', serial, imageurl, notes, owner, weapClass, weapModel)
```

### Evento `mdt:server:openMDT`

Abre o MDT para o jogador. Passa pelo `PermCheck` (job precisa estar em `Config.AllowedJobs`).

```lua
TriggerServerEvent('mdt:server:openMDT')
```

### Evento `ps-mdt:client:TakeOutImpound`

Spawna um veículo apreendido no ponto de depósito indicado, se o jogador estiver a até 15 metros.

```lua
TriggerClientEvent('ps-mdt:client:TakeOutImpound', src, data)
```

### Evento `cqc-mugshot:server:triggerSuspect`

Força o mugshot de um jogador (por `source`).

```lua
TriggerEvent('cqc-mugshot:server:triggerSuspect', targetSource)
```

### Evento `ps-mdt:client:trafficStop`

Dispara o alerta de parada de trânsito no dispatch. Só existe com `Config.UseWolfknightRadar = true`.

```lua
TriggerClientEvent('ps-mdt:client:trafficStop', src)
```

### Evento `ps-mdt:server:ClockSystem`

Bate o ponto do jogador (entrada ou saída, conforme o estado de serviço atual).

```lua
TriggerServerEvent('ps-mdt:server:ClockSystem')
```

---

## Estrutura de arquivos

```
ps-mdt/
├── client/
│   ├── main.lua           — abertura do MDT, keybind, todos os NUI callbacks, multas, parada de trânsito
│   ├── cl_impound.lua     — retirada de veículo do depósito, dano e combustível
│   └── cl_mugshot.lua     — câmera, painel e captura das fotos do mugshot; envio para a cadeia
├── server/
│   ├── main.lua           — eventos e callbacks do MDT, código penal, multas, armas, ponto, webhooks
│   ├── dbm.lua            — queries de leitura/escrita (perfis, licenças, veículos, propriedades)
│   └── utils.lua          — PermCheck, GetPlayerData, foto padrão, helpers de job
├── shared/
│   └── config.lua         — jobs, permissões por grade, código penal, cores, mugshot, depósito
├── ui/
│   ├── dashboard.html     — interface do MDT
│   ├── app.js             — lógica da interface
│   ├── style.css
│   └── img/               — brasões dos departamentos, fotos padrão, imagens do mapa
├── sql/
│   ├── qbox.sql           — schema para QBox
│   └── qbcore.sql         — schema para QBCore
└── fxmanifest.lua
```
