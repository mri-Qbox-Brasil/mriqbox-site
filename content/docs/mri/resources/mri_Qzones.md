---
title: "MRI Qzones (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Zonas com regras marcadas no mundo: área segura (sem tiro, sem dano), sem colisão entre jogadores, arma guardada e limite de velocidade. Tudo se cria e se edita no painel, com mapa, sem digitar coordenada.

Substitui o mri_Qsafezones: o `provide 'mri_Qsafezones'` responde pelo nome antigo e as zonas do `config.lua` antigo são importadas sozinhas no primeiro start.

## Dependências

| Recurso | Obrigatório | Para quê |
|---|---|---|
| `ox_lib` | Sim | Texto na tela, notificações, callbacks, comandos |
| `oxmysql` | Sim | Tabelas `mri_qzones_zones` e `mri_qzones_settings`, criadas sozinhas |
| `mri_Qadmin` | Não | Aba "Zonas" dentro do painel de admin |
| `ox_inventory` | Não | Guardar a arma de quem entra numa zona com "Guardar a arma" |

## Instalação

1. Coloque a pasta `mri_Qzones` em `resources/` e tire a pasta antiga `mri_Qsafezones` (o novo responde pelo nome dela).
2. `ensure mri_Qzones` no `server.cfg`, ou a categoria em que ele estiver.
3. No primeiro start as zonas do `mri_Qsafezones/config.lua` viram zonas do painel. Sem config antigo, nasce uma zona segura no Hospital Pillbox.

## Permissão

Tudo vale para quem tem a ACE `command.adminzones` (por padrão o `group.admin`, em `Config.Permissions`).

## Comandos

| Comando | O que faz |
|---|---|
| `/adminzones` | Abre o painel |
| `/setzone` | Abre o painel com uma zona temporária nova onde você está (mantido da v1) |
| `/clearzone` | Pede confirmação e apaga as zonas temporárias para todos (mantido da v1) |

## Painel

Lista com pastas à esquerda, mapa no meio e o editor da zona à direita. Cada pasta tem um interruptor que liga ou desliga todas as zonas dela. Zona desligada fica salva, mas sai do jogo.

- **Lugar**: círculo (mira no centro, a roda do mouse muda o tamanho) ou área de qualquer formato marcada canto a canto no chão ou na água. "Ir até lá" leva o admin até a zona. "Temporária" deixa a zona só na memória: some quando o servidor reinicia.
- **Regras**: sem tiro e sem briga (inclui tiro de dentro do carro), ninguém se machuca, guardar a arma, sem colisão entre jogadores (com a opção de deixar os outros transparentes) e limite de velocidade em km/h.
- **Aviso**: texto na tela enquanto o jogador está dentro (texto, ícone e posição; segue o tema da cidade) e notificação ao entrar e sair.
- **Mapa**: o que aparece no mapa do jogo (nada, a área, o ícone com o nome ou os dois), ícone, cor e transparência.
- **Ajustes**: posição da notificação e a posição do texto de uma zona nova.
- **Mostrar no mundo**: desenha as zonas no jogo para o admin conferir.

Quando o jogador está em mais de uma zona, as regras somam e vale o menor limite de velocidade.

## Para outros scripts

Servidor:

```lua
exports.mri_Qzones:GetZones()              -- todas as zonas, com as desligadas
exports.mri_Qzones:GetZone(id)
exports.mri_Qzones:SaveZone(zone)          -- ok, erro, zona
exports.mri_Qzones:RemoveZone(id)
exports.mri_Qzones:GetZonesAt(coords)      -- zonas ligadas que contêm o ponto
AddEventHandler('mri_Qzones:server:changed', function() end)
```

Cliente:

```lua
exports.mri_Qzones:GetCurrentZones()       -- { id, label, rules }[] onde o jogador está
exports.mri_Qzones:IsInZone(id?)           -- sem id: está em alguma zona
exports.mri_Qzones:IsInSafeZone()          -- numa zona sem tiro ou sem dano
AddEventHandler('mri_Qzones:client:entered', function(zone) end)
AddEventHandler('mri_Qzones:client:exited', function(zone) end)
```

O state bag `safeZone` do jogador (`Player(source).state.safeZone` no servidor) fica `true` enquanto ele está numa zona sem tiro ou sem dano.

Pacotes do Workshop: `InstallPackage(id, versão, zonas)`, `ListPackage(id)` e `RemovePackage(id)`, no mesmo formato dos outros resources da MRI. Reinstalar mantém a pasta e o liga e desliga que o admin escolheu.

## Vindo da v1 (mri_Qsafezones)

- As zonas do `config.lua` viram zonas do painel uma vez só. Um polígono de poucos metros (o exemplo antigo do hospital) vira o círculo do `radius` do config, como o arquivo descrevia.
- O limite de velocidade passou de MPH para km/h (convertido para a opção mais próxima).
- As cores fixas do texto na tela e da notificação saíram: seguem o tema da cidade.
- Os eventos `mri_Qsafezone:createAdminZone` e `mri_Qsafezone:deleteAdminZone` continuam funcionando para scripts que os disparam.
- Bloquear tiro e drive-by passava o ped onde a native pede o jogador; agora funciona.

## Licença

MIT com Commons Clause: pode usar, modificar e redistribuir, não pode vender. Veja `LICENSE`.
