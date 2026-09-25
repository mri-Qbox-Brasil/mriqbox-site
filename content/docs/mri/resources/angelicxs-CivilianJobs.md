---
title: Angelicxs CivilianJobs
---

## Introdução
O angelicxs-CivilianJobs é um sistema abrangente de empregos civis para FiveM com suporte a QBCore e ESX, contendo 7 tipos de empregos exclusivos com recompensas configuráveis, coleta de itens e integração com UI moderna.

## Empregos Disponíveis
1. **Motorista de Ônibus** (`bus-driver`): Rotas com paradas temporizadas, pagamento por distância
2. **Operador de Empilhadeira** (`forklift-driver`): Coleta e entrega de paletes, pagamento por distância
3. **Motorista de Táxi** (`taxi-driver`): Aceita solicitações de corrida, busca e deixa passageiros
4. **Mergulhador Scuba** (`scuba-diver`): Mergulha para recuperar caixotes com itens valiosos
5. **Salva-vidas (JetSki)** (`lifeguard`): Resgata civis em perigo na água
6. **Piloto de Helicóptero** (`heli-driver`): Missões de entrega prioritárias
7. **Coletor de Lixo** (`garbage-driver`): Coleta lixo de lixeiras, pagamento fixo com bônus de materiais

## Funcionalidades Principais
- Pagamentos flexíveis (distância ou valor fixo)
- Coleta de materiais junto com recompensas monetárias
- Suporte a ox_target, qb-menu ou NH-menu
- Totalmente configurável (pagamentos, rotas, NPCs, blips)
- Sistema anti-cheat com detecção de exploits e destruição de veículos
- Tradução padrão em português (Brasil)

## Dependências
| Dependência | Obrigatório | Notas |
|------------|----------|-------|
| qb-core / es_extended | Sim* | Apenas um framework necessário |
| ox_lib | Sim | UI, notificações, diálogos |
| ox_target | Não | Pontos de interação |
| qb-menu | Não | Alternativa para UI |
| nh-context / nh-keyboard | Não | Sistemas alternativos |

## Configuração
### Seleção de Framework (`config.lua`)
```lua
Config.UseESX = false
Config.UseQBCore = true
```

### Preferência de UI
```lua
Config.OXLib = true            -- Recomendado
Config.QBMenu = false
Config.NHMenu = false
Config.Use3DText = false
Config.UseThirdEye = true
Config.UsePedAsJobBoss = true
```

### Configurações de Emprego
```lua
Config.JobSettings = {
    ['bus-driver'] = {
        paymentType = 'distance',
        paymentAmount = 100,
        distanceMultiplier = 0.2,
        materialGain = true,
        materialList = {
            {name = 'rubber', min = 1, max = 2},
            {name = 'plastic', min = 1, max = 2},
        },
    },
}
```

### Habilitar/Desabilitar Empregos
```lua
Config.BusJobOn = true
Config.BusJobName = 'bus-driver'
Config.ForkliftJobOn = false
Config.ForkliftJobName = 'forklift-driver'
-- ... configure outros empregos
```

## Eventos
### Servidor
| Evento | Parâmetros | Descrição |
|-------|-------------|-------------|
| `angelicxs-CivilianJobs:Server:ClaimReward` | `jobName, rewardType, data` | Reivindicar recompensas |

### Cliente
| Evento | Parâmetros | Descrição |
|-------|-------------|-------------|
| `angelicxs-CivilianJobs:Notify` | `message, type` | Exibe notificação |
| `angelicxs-CivilianJobs:VehicleInitation` | `vehicle` | Inicializa veículo (chaves, combustível) |

## Integração de Veículos
```lua
RegisterNetEvent('angelicxs-CivilianJobs:VehicleInitation')
AddEventHandler('angelicxs-CivilianJobs:VehicleInitation', function(vehicle)
    TriggerEvent("vehiclekeys:client:SetOwner", GetVehicleNumberPlateText(vehicle))
    exports["cdn-fuel"]:SetFuel(vehicle, 100)
end)
```

## Códigos de Erro (Anti-Cheat)
| Código | Descrição |
|------|-------------|
| 012 | Múltiplos eventos de pagamento detectados (<1s) |
| 013 | Jogador removido por explotação |
| 007 | Erro detectado (possível injetor) |

## Solução de Problemas
- **Emprego não inicia**: Verifique se o framework selecionado em `config.lua` está correto.
- **UI não aparece**: Confira se o sistema de UI escolhido (ox_lib, qb-menu) está instalado.
- **Veículo não tem chaves**: Certifique-se de que o evento `VehicleInitation` está configurado para o seu sistema de chaves.
