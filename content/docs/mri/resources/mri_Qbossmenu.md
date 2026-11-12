---
title: "MRI Qbossmenu (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

O painel de grupos da cidade. Num lugar só, a administração cria e edita empregos e gangues (cargos, baús, craftings, lojas, ponto de serviço, caixa registradora e alarme), e o chefe de cada organização cuida dos funcionários, do caixa, das metas, das candidaturas, do rádio e dos uniformes.

Ele substitui o `mri_Qjobsystem` e o `qbx_management`. Os dois saem da base, e quem usava os exports deles continua funcionando (ver [Compatibilidade](#compatibilidade)).

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Vindo do mri_Qjobsystem](#vindo-do-mri_qjobsystem)
4. [Comandos](#comandos)
5. [Painel da administração](#painel-da-administração)
6. [Painel da empresa e da gangue](#painel-da-empresa-e-da-gangue)
7. [Vestiários e uniformes](#vestiários-e-uniformes)
8. [Caixa da organização](#caixa-da-organização)
9. [Para outros scripts](#para-outros-scripts)
10. [Compatibilidade](#compatibilidade)
11. [Banco de dados](#banco-de-dados)
12. [Licença](#licença)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `qbx_core` | Sim | Empregos, gangues e cargos são registrados nele em tempo real |
| `ox_lib` | Sim | Callbacks, locale, comandos e o tema da suíte (`/uiconfig`) |
| `oxmysql` | Sim | Tabelas próprias `mri_qbossmenu_*` |
| `ox_target` | Sim | Pontos no mapa (o `mri_Qinteract` atende por esse nome) |
| `Renewed-Banking` | Sim | Caixa da organização. Na base MRI quem responde é o `ps-banking` |
| `ox_inventory` | Não | Baús, lojas, craftings e metas com entrega de item |
| `mri_Qstashes` | Não | Metas contadas pelo que entra nos baús dele liberados para a organização; os baús das organizações aparecem no painel de Baús |
| `mri_Qcrafting` | Não | As bancadas de fabricação das organizações aparecem no painel de Bancadas dele |
| `mri_Qappearance` | Não | Vestiários e uniformes: os vestiários marcados aqui vão pro appearance pela API do `illenium-appearance`, e ele cuida da tela e dos uniformes. Sem um appearance com vestiário, a aba Vestiários só guarda os lugares |
| `mm_radio` | Não | Canal de rádio da organização |
| `mri_Qadmin` | Não | Painel da administração como aba do admin |

---

## Instalação

1. Coloque a pasta `mri_Qbossmenu` em `resources/` e tire o `mri_Qjobsystem` e o `qbx_management` da pasta de resources. O `mri_Qbossmenu` responde pelo nome dos dois, e os três juntos brigam pelo mesmo nome.
2. Garanta que ele inicia depois do `qbx_core`, do banco e do alvo:
   ```
   ensure mri_Qbossmenu
   ```
3. Dê a permissão do painel a quem administra. Quem tem `command` (o grupo `admin` padrão) já pode:
   ```
   add_ace group.mod mri_Qbossmenu.admin allow
   ```

As tabelas são criadas sozinhas em toda subida (as que faltarem), então não há SQL para importar.

---

## Vindo do mri_Qjobsystem

Na primeira subida, se existir a tabela `mri_qjobsystem` e nenhuma definição ainda, o bossmenu importa todos os empregos e gangues dela (cargos, pontos, baús e craftings) e renomeia a tabela para `mri_qjobsystem_migrated`, pra importação não rodar duas vezes.

Pra desfazer, rode no console do servidor:

```
restaurarmigracao
```

Ele apaga as definições do bossmenu e devolve o nome `mri_qjobsystem` à tabela antiga. Tire a pasta do bossmenu antes de reiniciar, senão ele importa de novo.

O cofre antigo de cada grupo (o `balance` do Qjobsystem) vai pra conta do grupo no banco. Se a conta ainda não existe, ele tenta de novo quando alguém entra na cidade, e o console avisa quando o dinheiro passa.

Como o Qjobsystem, o bossmenu tira do `qbx_core` os grupos de exemplo do Qbox (`bcso`, `taxi`, `lostmc`...) que nenhuma definição do painel usa. A lista fica em `Config.FrameworkDefaultJobs` e `Config.FrameworkDefaultGangs`, e `Config.RemoveFrameworkDefaultGroups = false` mantém todos.

---

## Comandos

| Comando | Quem | O que faz |
|---|---|---|
| `/painelj` | Membro do emprego | Painel da empresa |
| `/painelg` | Membro da gangue | Painel da gangue |
| `/paineladmin` | Admin | Painel da administração |
| `/grupos` | Admin | Painel da administração direto na lista de empregos e gangues |
| `/open_jobs` e `/createjob` | Admin | Os mesmos do `/grupos`, com o nome antigo do mri_Qjobsystem (o F10 do `mri_Qbox` usa) |
| `/tablet` | Chefe ou recrutador | Abre o painel da empresa ou da gangue, e pergunta qual quando é dos dois (nome antigo do qbx_management) |
| `/resetapplicationstatus <id> <job>` | `group.admin` | Libera o jogador pra se candidatar de novo |
| `/fixjobmanager` | Qualquer um | Recria os pontos no mapa do próprio cliente |

Os nomes dos quatro primeiros ficam em `Config.Commands`.

---

## Painel da administração

Abre por `/paineladmin` ou pela aba "Painel de Grupos" do `mri_Qadmin` (permissão `mri_Qbossmenu.admin`). Ali se cria e edita cada emprego e gangue:

- nome, rótulo, tipo e categoria;
- cargos, com salário e as marcas de chefe (`isboss`), recrutador (`isrecruiter`) e acesso ao banco (`bankAuth`);
- pontos no mapa: painel do chefe, ponto de serviço, caixa registradora, alarme e candidatura;
- baús, vestiários, craftings e lojas, com itens, preços, licença e cargo mínimo.

Empregos e gangues ficam na mesma página, Organizações: a lista à esquerda filtra por Todos, Jobs ou Gangs e separa por categoria, e o detalhe à direita tem as abas Geral, Cargos, Locais, Baús, Vestiários, Bancadas e Lojas. "Selecionar" marca vários para mover de categoria juntos, e "Editar categorias" cria, renomeia e apaga categorias. A barra de salvar só aparece quando há alteração, e trocar de organização com alteração pendente pede confirmação.

Com o `mri_Qstashes` ligado, os baús das organizações também aparecem no painel de Baús dele (lista e mapa, em "De outros scripts"), com o botão para voltar a este painel. Eles continuam sendo editados aqui.

Do mesmo jeito, com o `mri_Qcrafting` ligado, as bancadas de fabricação das organizações (as lojas não) aparecem no painel de Bancadas dele, com o grupo que pode usar (nenhum, se for pública) e quantas receitas têm. Elas continuam sendo editadas aqui.

**Metas pelo baú.** Com `Config.Goals.stashIntegration` ligado, cada item guardado num baú do `mri_Qstashes` conta para as metas ativas daquele item nas organizações que têm acesso ao baú (os grupos da aba Acesso de lá). Com `syncWithdrawals`, retirar desconta. A contagem vem do evento `mri_Qstashes:server:moved`.

Salvar registra o grupo no `qbx_core` na hora, sem reiniciar nada. Na subida do servidor os grupos são registrados logo de cara, antes da limpeza do `qbx:cleanPlayerGroups`, então quem está num grupo criado pelo painel não perde o cargo.

**Alarme.** Quem é da organização aciona o alarme no ponto, confirma e o `ps-dispatch` avisa a polícia com a localização. Para quem vai o aviso fica em `Config.Alarm`:

```lua
Config.Alarm = {
    dispatch = 'ps-dispatch',
    jobs = { 'police' },
    recipientsLabel = 'a polícia',
}
```

**Ajustes.** A aba Ajustes do painel liga e desliga, para a cidade toda e na hora: tablet na mão, candidaturas e admin com acesso total no próprio emprego. As opções dos vestiários ficam nos Ajustes do appearance. O `config.lua` só dá os valores da primeira subida; depois vale o que está em `data/settings.json` (fica no servidor, fora do git, e o instalador mantém ao atualizar).

**Candidatura.** Só para empregos. Quem não é do emprego abre a ficha no ponto e a candidatura cai na página Candidaturas do painel da empresa. As perguntas ficam em `Config.ApplicationQuestions` (por emprego, ou `default`). `Config.ApplicationPoints` serve para pontos fixos extras e vem vazio.

---

## Painel da empresa e da gangue

Abre pelo ponto do chefe no mapa, por `/painelj` e `/painelg` ou pelo F9 do `mri_Qbox`. Mostra o que o cargo do jogador permite:

| Página | O que tem |
|---|---|
| Início | Resumo, aviso da organização e atalhos |
| Ranking | Tempo de serviço dos membros |
| Metas | Metas de entrega de item, com recompensa paga do caixa |
| Banco | Saldo, depósito, saque, pagamento a membro e histórico filtrado por pessoa |
| Funcionários | Contratar quem está perto (escolhido na lista), demitir, promover e permissões por pessoa |
| Ponto | Quem está em serviço, horas de cada um em 24 horas e 7 dias, turnos recentes e encerrar o turno de alguém (só empresa) |
| Avisos | Recados para todos ou para um cargo e acima, com histórico; quem está online recebe na hora |
| Candidaturas | Formulários enviados nos pontos de candidatura |
| Gestão de Organização | Cargos (com a folha de pagamento por cargo), uniformes (abre o vestiário do appearance), rádio, Discord e registro de ações |

O chefe (`isboss`) vê tudo. Os outros membros veem o que as permissões dadas a eles liberam. O recrutador (`isrecruiter`) vê os funcionários e contrata, como no qbx_management.

Mudou um cargo no painel (chefe, salário, acesso), quem está online naquele grupo recebe na hora, sem relogar. Com "Tablet na mão" ligado em Ajustes, o personagem segura um tablet enquanto o painel está aberto.

No crafting, o personagem faz a animação do item (`dict` e `anim`, ou um emote do rpemotes em `scully`) enquanto fabrica.

---

## Vestiários e uniformes

O vestiário é do appearance (mri_Qappearance ou outro que responda pela API do `illenium-appearance` com as exports de vestiário). O bossmenu marca onde ficam e diz quem gerencia; a tela, os uniformes e o "uniforme volta ao reconectar" são do appearance. Detalhes no `WARDROBES.md` do mri_Qappearance.

**Onde fica o vestiário.** A administração marca no mundo, na aba Vestiários da organização (plugin ou `/paineladmin`). Cada organização pode ter quantos quiser, com nome e, nos empregos, "Só em serviço" (o chefe sempre abre). Ao salvar, os vestiários vão na hora pro appearance, que mostra a zona e o target. No painel do appearance eles aparecem com cadeado, como "Marcado pelo mri_Qbossmenu".

**Quem gerencia.** O chefe e quem tem a permissão "Gerenciar uniformes" do cargo montam a roupa no vestiário, salvam como uniforme, escolhem os cargos que usam, editam e removem. Os membros provam e vestem os uniformes do seu cargo.

**No tablet.** O atalho Uniforme do Início e o botão "Abrir vestiário" da aba Uniformes (Gestão de Organização) abrem a tela do vestiário onde o jogador estiver, se o appearance deixar trocar fora do vestiário (Ajustes do appearance). O "Gerenciar roupas" que o appearance põe no menu do chefe não aparece aqui: esse atalho faz o mesmo.

**Uniformes antigos.** Os uniformes que o tablet salvava (tabela `mri_qbossmenu_org_outfits`) vão pro appearance uma vez, só com as roupas (sem rosto nem cabelo). A tabela antiga não é apagada.

---

## Caixa da organização

O dinheiro da organização fica no banco da cidade, na conta com o nome do emprego ou da gangue. O bossmenu fala com o banco pelo contrato do `Renewed-Banking` (`getAccountMoney`, `addAccountMoney`, `removeAccountMoney`), que o `ps-banking` atende na base MRI. Assim o banco, o celular e o painel mostram o mesmo saldo.

O `ps-banking` cria a conta da organização quando um chefe entra na cidade. Antes disso o saldo aparece zerado e o depósito pelo painel falha.

Com o `Renewed-Banking` original quem abre a conta é o próprio bossmenu (`CreateJobAccount`), na primeira vez que o grupo mexe com dinheiro. O banco sozinho só cria a conta dos grupos que já existiam quando ele subiu.

O histórico do painel (quem depositou, quem sacou e a observação) fica na tabela `mri_qbossmenu_transactions`.

O ponto conta o tempo em serviço: abre o turno quando a pessoa bate o ponto (ou entra na cidade já em serviço) e fecha quando ela sai de serviço, troca de emprego ou sai da cidade. Os turnos ficam 30 dias na tabela `mri_qbossmenu_shifts`.

---

## Para outros scripts

**Exports de servidor**

| Export | Comportamento |
|---|---|
| `AddFunds(groupName, amount, reason, actor, groupType)` | Põe dinheiro no caixa e lança no histórico do painel como Entrada. `actor` é o nome que aparece em "Por" (sem ele, o nome do script). `groupType` é `'job'` (padrão) ou `'gang'`. Devolve `true` se deu certo |
| `RemoveFunds(groupName, amount, reason, actor, groupType)` | Tira do caixa e lança como Saída. Devolve `false` sem saldo |
| `GetFunds(groupName, groupType)` | Saldo do caixa |

```lua
exports.mri_Qbossmenu:AddFunds('police', 500, 'Multa de trânsito', 'Agente Silva')
```

**Eventos de servidor**

Disparados com `TriggerEvent` depois que a mudança foi salva. Recebem uma tabela `{ group, groupType, citizenid, executor, grade }` (`executor` é o source de quem fez; `grade` não vem na demissão).

| Evento | Quando |
|---|---|
| `mri_Qbossmenu:server:memberHired` | Alguém foi contratado pelo painel |
| `mri_Qbossmenu:server:memberFired` | Alguém foi demitido |
| `mri_Qbossmenu:server:memberGradeChanged` | O cargo de alguém mudou |

```lua
AddEventHandler('mri_Qbossmenu:server:memberFired', function(data)
    print(('%s saiu de %s'):format(data.citizenid, data.group))
end)
```

---

## Compatibilidade

O `fxmanifest` declara `provides { 'qbx_management', 'mri_Qjobsystem' }`. `GetResourceState` pelos nomes antigos responde pelo bossmenu, e os exports abaixo continuam valendo.

**qbx_management (cliente)**

| Export | Comportamento |
|---|---|
| `OpenBossMenu(groupType)` | Abre o painel da empresa (`'job'`) ou da gangue (`'gang'`) do jogador. Com o nome de uma organização (ex.: `'police'`, usado pelo `/menu <job>` do `mri_Qbox`) abre o painel dela, e só admin entra em organização que não é a dele |
| `AddBossMenuItem(item)` / `AddGangMenuItem(item)` | Item no formato do menu de contexto do ox_lib, com `args.type` (`'Job'` ou `'Gang'`). Aparece em "Atalhos" na barra lateral do painel, só para o chefe. Devolve o id |
| `RemoveBossMenuItem(id)` / `RemoveGangMenuItem(id)` | Tira o item |

Também respondem o evento `qbx_management:client:OpenBossMenu`, os eventos do qb-core `qb-bossmenu:client:OpenMenu` e `qb-gangmenu:client:OpenMenu` (usados pelo jim_bridge e pelo mri_Qappearance, com `qbx:enablebridge` ligado) e os comandos `+tablet:job` e `+tablet:gang`, usados pelo F9 do `mri_Qbox`.

**qbx_management (servidor)**

| Contrato | Comportamento |
|---|---|
| `RegisterBossMenu(menuInfo)` | Cria um ponto do painel do chefe no mapa (`groupName`, `type`, `coords`, `size`, `rotation`) |
| callback `qbx_management:server:getPlayers` | Jogadores próximos com nome, citizenid, emprego e gangue |

**mri_Qjobsystem (cliente)**

| Export | Comportamento |
|---|---|
| `CheckPlayerIsbossByJobSystemData(groupType, playerData)` | `true` se o cargo atual é de chefe |
| `CheckPlayerIrecruiterByJobSystemData(groupType, playerData)` | `true` se o cargo atual é de recrutador |

---

## Banco de dados

Todas as tabelas usam o prefixo `mri_qbossmenu_`. As principais:

| Tabela | Guarda |
|---|---|
| `mri_qbossmenu_definitions` | Empregos e gangues criados no painel |
| `mri_qbossmenu_permissions` | Permissões dadas a cada funcionário |
| `mri_qbossmenu_transactions` | Histórico do caixa visto no painel |
| `mri_qbossmenu_applications` | Candidaturas |
| `mri_qbossmenu_goals` | Metas e seus registros (`_goal_logs`, `_goal_credits`) |
| `mri_qbossmenu_org_radios` / `_org_profiles` | Rádios e perfil da organização |
| `mri_qbossmenu_org_outfits` | Uniformes de versões antigas; lida uma vez pra levar pro appearance |
| `mri_qbossmenu_audit_logs` | Registro de ações da administração |
| `mri_qbossmenu_shifts` | Turnos em serviço (ponto), guardados por 30 dias |
| `mri_qbossmenu_announcements` | Avisos publicados no painel |

---

## Licença

O código deste recurso é MIT com Commons Clause: pode usar, modificar e redistribuir à vontade, mas não pode vender, nem a versão original nem uma modificada. Texto completo em [LICENSE](LICENSE).
