---
title: Hookers
---

Recria a interação de prostitutas do GTA V single-player no FiveM: aborde um ped de prostituta com o carro, buzine para convidá-la, leve-a a um local isolado e escolha um serviço em um menu nativo.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Configuração](#configuração)
4. [Fluxo da interação](#fluxo-da-interação)
5. [Pagamento](#pagamento)
6. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
7. [Estrutura de arquivos](#estrutura-de-arquivos)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| gameBuild 2060+ | Sim | Declarado no `fxmanifest.lua`. Necessário pelo uso de `gameEventTriggered` |
| `qb-core` | Não | Só se `Config.Framework = "qbcore"` e `Config.PaymentEnabled = true` |
| `es_extended` | Não | Só se `Config.Framework = "esx"` e `Config.PaymentEnabled = true` |
| `ND_Core` | Não | Só se `Config.Framework = "ndcore"` e `Config.PaymentEnabled = true` |

Com `Config.PaymentEnabled = false` (padrão) o recurso é standalone: nenhum framework é necessário. O menu e a UI são desenhados com natives do jogo — não usa `ox_lib` nem NUI.

---

## Instalação

1. Copie a pasta `hookers` para `resources/`.
2. Garanta que o servidor roda em gameBuild 2060 ou superior:
   ```
   sv_enforceGameBuild 2060
   ```
3. Adicione ao `server.cfg`:
   ```
   ensure hookers
   ```
4. Para cobrar pelos serviços, abra o `config.lua`, defina `Config.PaymentEnabled = true` e ajuste `Config.Framework` para o framework do servidor.

Não há SQL, itens ou comandos.

---

## Configuração

Todas as opções ficam em `config.lua`, carregado como `shared_script`.

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `Config.MaxDistance` | number | Sim | Distância máxima (metros) entre o veículo e a prostituta para a interação ser detectada. Padrão `7.5` |
| `Config.MaxServices` | number | Sim | Quantos serviços a prostituta aceita antes de sair do veículo. Padrão `3` |
| `Config.MaxVehicleSpeed` | number | Sim | Velocidade máxima (m/s) do veículo para o script procurar prostitutas por perto e para considerar o local "isolado". Padrão `0.1`, ou seja, praticamente parado |
| `Config.PaymentEnabled` | bool | Sim | Ativa a cobrança pelos serviços. Padrão `false` |
| `Config.Framework` | string | Sim | Framework usado na cobrança: `"esx"`, `"qbcore"`, `"ndcore"` ou `"standalone"`. Só tem efeito com `PaymentEnabled = true` |
| `Config.Prices.SERVICE_BLOWJOB` | number | Sim | Preço do serviço oral. Padrão `50` |
| `Config.Prices.SERVICE_SEX` | number | Sim | Preço do serviço de sexo. Padrão `100` |
| `Config.Localization.InviteHooker` | string | Sim | Ajuda exibida ao encostar num ped elegível. Aceita tags de input (`~INPUT_VEH_HORN~`) |
| `Config.Localization.FindSecludedArea` | string | Sim | Ajuda exibida enquanto o local não é isolado o bastante |
| `Config.Localization.FindSecludedAreaFailed` | string | Sim | Aviso quando os 2 minutos para achar um local isolado esgotam |
| `Config.Localization.VehicleUnsuitable` | string | Sim | Ajuda exibida quando a classe do veículo está na blacklist |
| `Config.Localization.FrontSeatOccupied` | string | Sim | Ajuda exibida quando o banco do carona já está ocupado |
| `Config.Localization.NotEnoughMoney` | string | Sim | Notificação quando o pagamento falha por falta de dinheiro |
| `Config.HookerPedModels` | tabela `[hash] = true` | Sim | Modelos de ped tratados como prostitutas. Padrão: `s_f_y_hooker_01`, `_02` e `_03` |
| `Config.BlackListedVehicleClasses` | tabela `[classe] = true` | Sim | Classes de veículo que **não** podem pegar prostitutas. Padrão: motos (8), bicicletas (13), barcos (14), helicópteros (15), aviões (16), emergência (18), militar (19), trens (21) e open wheel (22) |

Os textos dos botões do menu (`Boquetão`, `Cavalgada`, `Dispensar`) e o título (`Serviços Disponíveis`) ficam **hardcoded** em `menu.lua`, não no config.

### Modelos de ped

As chaves de `Config.HookerPedModels` usam hashes de modelo (backtick):

```lua
Config.HookerPedModels = {
    [`s_f_y_hooker_01`] = true,
    [`s_f_y_hooker_02`] = true,
    [`s_f_y_hooker_03`] = true
}
```

Adicionar modelos comuns de NPC aqui faria o script tratar qualquer ped daquele modelo como prostituta.

---

## Fluxo da interação

1. Ao entrar em um veículo como motorista (evento nativo `CEventNetworkPlayerEnteredVehicle`), inicia-se a busca por peds elegíveis num raio de `Config.MaxDistance`.
2. O ped só é elegível se o modelo estiver em `Config.HookerPedModels`, não estiver ferido, não estiver andando/correndo, não estiver em um veículo e não for um jogador.
3. Se a classe do veículo estiver na blacklist, ou se o banco da frente estiver ocupado, o script exibe a ajuda correspondente e não prossegue.
4. Com o veículo praticamente parado, aparece a ajuda para **buzinar**. Buzinar faz a prostituta entrar no banco do carona.
5. Ela pede um local isolado. O jogador tem **2 minutos** (fixos no código) para chegar lá; passado o prazo, ela sai irritada.
6. Um local é considerado isolado quando o veículo está parado (velocidade `<= Config.MaxVehicleSpeed`) e nenhum ped a menos de 75 metros tem linha de visão para o veículo.
7. Chegando lá, as luzes do veículo se apagam, os controles de direção são bloqueados e o menu de serviços abre. Navegue com as setas cima/baixo, confirme com Enter (controle `201`) e cancele com Backspace/Esc (controle `202`).
8. As cenas usam o dicionário de animação `mini@prostitutes@sexnorm_veh` e as falas nativas de prostituta do jogo. As animações do jogador variam conforme o modelo seja `mp_f_freemode_01` (feminino) ou não.
9. Após `Config.MaxServices` serviços — ou se o jogador dispensar — a prostituta sai do veículo e o ciclo recomeça.

---

## Pagamento

Com `Config.PaymentEnabled = true`, antes de cada cena o cliente dispara `hookers:moneyCheck` e espera a resposta do servidor. O servidor cobra o valor de `Config.Prices[service]` em **dinheiro vivo** conforme o `Config.Framework`:

| Framework | Como cobra |
|---|---|
| `esx` | `xPlayer.getMoney()` / `xPlayer.removeMoney(cost)` |
| `qbcore` | `Player.Functions.GetMoney('cash')` / `RemoveMoney('cash', cost, "Hooker")` |
| `ndcore` | `character.cash` / `NDCore.Functions.DeductMoney(cost, source, "cash", "Hooker")` |
| `standalone` | Nenhuma cobrança. O bloco em `server.lua` está vazio para você preencher, e sempre responde "pago" |

Se o dinheiro for insuficiente, o cliente mostra `Config.Localization.NotEnoughMoney` e a interação termina.

> Não há suporte a QBox (`qbx_core`) nem `ox_inventory` no código atual. Em servidores QBox, o modo `qbcore` só funciona se houver bridge de `qb-core` compatível.

---

## Entrypoints para outros recursos

Os dois eventos são internos do fluxo de pagamento.

### `hookers:moneyCheck` (servidor)

```lua
TriggerServerEvent('hookers:moneyCheck', service)
```

`service` é a chave usada em `Config.Prices` (`SERVICE_BLOWJOB` ou `SERVICE_SEX`). O servidor tenta cobrar e responde ao cliente com `hookser:paymentReturn`.

### `hookser:paymentReturn` (cliente)

```lua
TriggerClientEvent('hookser:paymentReturn', source, true)
```

Recebe `true` (cobrado com sucesso) ou `false` (dinheiro insuficiente). O nome do evento contém um typo (`hookser`) presente no código original — mantenha a grafia ao integrar.

---

## Estrutura de arquivos

```
hookers/
├── client.lua      — detecção de peds, entrada no veículo, checagem de local isolado, cenas e falas
├── menu.lua        — menu nativo de serviços (DrawRect/DrawText), função OfferServices
├── server.lua      — evento hookers:moneyCheck e cobrança por framework
├── config.lua      — distâncias, preços, textos, modelos de ped e classes de veículo bloqueadas
├── README.md
└── fxmanifest.lua
```
