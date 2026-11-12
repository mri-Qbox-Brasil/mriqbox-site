---
title: "MRI Qnpc (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Criador de NPCs da MRI. Você coloca NPCs pela cidade direto do jogo, escolhe a roupa (modelo), a animação e o que acontece quando alguém interage: uma conversa com falas e respostas, um evento ou um comando.

## Instalação

1. Coloque a pasta `mri_Qnpc` em `resources/[mri]`.
2. Garanta no `server.cfg`, depois de `ox_lib`, `oxmysql` e `qbx_core`:

       ensure mri_Qnpc

As tabelas `mri_qnpc_npcs`, `mri_qnpc_progress` e `mri_qnpc_uses` são criadas sozinhas na primeira vez que o resource sobe.

### Vindo da v1

A v1 guardava os NPCs no arquivo `npcData.json`, dentro da pasta do resource. Antes de trocar a pasta, copie esse arquivo e coloque na pasta nova do `mri_Qnpc`. Na primeira vez que o resource sobe, os NPCs vão para o banco e o arquivo vira `npcData.imported.json`. NPC com o mesmo nome de um que já está no banco não é importado de novo.

O que muda na importação:

- Conversa da v1: vira a conversa nova, com as mesmas falas. "Ir para próximo diálogo" leva à fala seguinte, "Localização" marca o GPS e "Comando" roda o comando.
- NPC com evento: o evento continua sendo chamado no cliente. O target continua target e o texto na tela vira a tecla E.
- Emote do scully vira emote do rpemotes com o mesmo nome. Se o nome não existir no rpemotes, troque no painel.
- Emprego e cargo viram o acesso por grupo.

## Uso

- `/npc` abre o painel (só para quem tem a permissão `command.npc`, que o grupo `admin` já recebe).
- O painel também aparece como aba **NPCs** no mri_Qadmin e no item **NPC** do menu gerencial.
- **Novo NPC**: escolha o modelo e clique em **Posicionar no mundo**. O painel some e uma prévia do NPC segue onde você mira. As setas e a roda do mouse giram, **E** confirma e **Backspace** cancela.
- O editor fica em abas: **Aparência** (modelo, posição e animação), **Tipo e lugares** (NPC comum, que pode morrer ou guarda, o movimento e os outros lugares por horário), **Conversa** (interação, conversa e voz) e **Regras** (acesso, quando aparece e horário). Guarda só tem as duas primeiras; NPC de outro script tem Aparência e Conversa.
- No meio do painel fica o mapa da cidade com um pino por NPC (pessoa, escudo para guarda, código para NPC de outro script). Clicar no pino abre o NPC, e o selecionado mostra a rota com as paradas e um relógio em cada outro lugar por horário.
- **Presets de ped**: na galeria de modelos, a aba **Presets** guarda peds freemode montados do seu jeito. Dê um nome, escolha **Homem** ou **Mulher** e clique em **Vestir e salvar**: o painel some e o menu de aparência do mri_Qappearance abre em você, com rosto, cabelo, maquiagem, roupas, acessórios e tatuagens. Ao salvar, o preset fica gravado no banco e você volta a ser você (vida e colete também voltam). Escolha o preset na galeria para o NPC usar. **Mudar a aparência** abre o menu de novo e todos os NPCs com aquele preset mudam na hora; apagar o preset deixa esses NPCs com o freemode simples. Vale para NPC parado, com rota, guarda e NPC que pode morrer. Ao importar NPCs de outro servidor, o preset não vem junto.
- **Animação**: emote do catálogo do rpemotes (com objetos, como prancheta e café), cenário do GTA ou dicionário e clipe manuais.
- **Interação**: target ou tecla E por perto. Depois escolha o que acontece:
  - **Abrir conversa**: falas com até 4 respostas cada. Uma resposta pode levar para outra fala, encerrar, marcar um local no GPS, disparar um evento ou rodar um comando. **Variar a fala** dá até 3 outras versões da mesma fala, e uma delas é sorteada cada vez. Embaixo de cada resposta dá para ligar:
    - **Cobra**: dinheiro, banco ou item do ox_inventory. Quem não tem o suficiente vê o aviso e continua na conversa.
    - **Entrega**: dinheiro, banco ou item, até 10 coisas na mesma resposta (**Entregar mais uma coisa**). Se a mochila não tiver espaço pra tudo, nada é cobrado nem entregue. Cobra e Entrega juntos fazem uma loja ou uma troca ("me traz 5 peixes e te dou R$ 200"). O preço e o que a pessoa recebe aparecem ao lado da resposta.
    - **Entrega carro**: um carro sempre igual ou sorteado de uma lista (só carros e motos do qbx_core, com foto), com combustível e a opção de já entregar sentado. **Marcar vagas no mundo**: o painel some e um carro transparente segue a mira; setas ou rodinha giram, clique ou **E** marca cada vaga, Backspace desfaz, Enter conclui e Esc cancela. O carro sai na primeira vaga livre, entra na garagem do personagem (qbx_vehicles) e a chave vai pro jogador (mri_Qcarkeys ou qbx_vehiclekeys). Sem vaga livre, o jogador é avisado e não perde nada.
    - **Precisa ter item**: a resposta só aparece para quem tem o item (e a quantidade).
    - **Só para alguns empregos**: a resposta só aparece para quem tem um dos empregos ou gangues escolhidos.
    - **Tempo para repetir**: depois de escolher, a resposta some para aquele personagem por 10 min, 1 hora, 1 dia ou para sempre (**Uma vez por personagem**). **Uma vez por conta** vale pra conta inteira: outro personagem da mesma pessoa também não vê mais a resposta. O tempo fica gravado no banco e vale mesmo depois de reconectar. Ele é ligado à posição da resposta: mudar a ordem das respostas da fala zera os tempos dela. Num NPC salvo, **Quem já recebeu** lista quem escolheu a resposta (nome, placa do carro e data), com busca e **Liberar**, que deixa a pessoa escolher de novo.
    - **Lembrar**: escolhe em qual fala a próxima conversa com esse NPC começa, para aquele personagem. Serve para missão em etapas ("já te dei a encomenda, volta quando entregar") e para cumprimentar quem volta.

    Tudo isso é conferido e feito no servidor.
  - **Evento no cliente**, **Evento no servidor** ou **Comando**.
- **Rota**: em vez de ficar parado, o NPC anda. Clique em **Marcar rota no mundo**: o painel some, você mira e aperta **E** em cada parada (Backspace desfaz, Enter conclui) e vê a linha do caminho no chão. Se a última parada fica perto do início ele dá a volta; senão faz ida e volta. Escolha o que ele faz nas paradas (passa direto, para um pouco ou fica um tempo, com a animação) e se anda ou corre. Todos os jogadores veem o NPC no mesmo trecho. Quando alguém conversa com ele, ele para e segue depois.
- **Andar pela área**: a terceira opção do **Movimento**, ao lado de **Parado** e **Rota**. O NPC anda pela calçada até um ponto da área, para um tempo fazendo alguma coisa (mexe no celular, fuma, olha vitrine, toma café ou a animação que você escolheu) e segue para outro ponto, como um morador da região. Onde não tem calçada (parque, interior) ele fica no lugar. Escolha o tamanho (**Pequena** 10 m, **Média** 25 m ou **Grande** 50 m); o olho mostra a área no chão (Backspace volta). Cada jogador vê o NPC andando do seu jeito, então ele pode estar em pontos diferentes para duas pessoas. Quando alguém conversa com ele, ele para e segue depois. Guarda e NPC que pode morrer só ficam parados ou fazem rota.
- **Outros lugares por horário**: o mesmo NPC aparece em outro lugar em certas horas do jogo, com a mesma conversa e os mesmos usos. Clique em **Marcar lugar no mundo**, posicione como o NPC principal e escolha as horas (**Chega às**, **Sai às**) e se ele fica **Parado** ou **Anda pela área**. Dá até 6 lugares. Fora desses horários ele fica no lugar principal (ou some, se o lugar principal tiver **Horário**). Na troca de hora ele some com fade e aparece no outro lugar. Se dois lugares cobrem a mesma hora, vale o de cima. Guarda e NPC que pode morrer não têm outros lugares.
- **Fala por voz (IA)**: aparece com o mri_npctalk ligado. Escolha a personalidade (comerciante, policial, membro de gangue...) e escreva quem ele é. O jogador segura a tecla de falar do mri_npctalk (V) olhando para o NPC e conversa pelo microfone; o NPC responde com voz, no personagem, e lembra de cada personagem entre uma conversa e outra. A conversa do painel continua valendo. NPC do mri_Qnpc sem essa opção não fala por voz.
- **Quando aparece**: para missões. **Só depois de liberado** mostra o NPC só para quem foi liberado; **Até ser liberado** esconde dele depois. Libere pela conversa de outro NPC (resposta **Liberar NPC**, escolhendo qual) ou por script. O NPC aparece e some com fade na hora.
- **Horário**: o NPC fica no lugar principal só entre duas horas do relógio do jogo (ex.: 06:00 até 20:00, ou 20:00 até 06:00 para a noite). Fora do horário ele some com fade e volta na hora certa.
- **Zona segura** (aba Regras): em volta do NPC, num raio de 10, 20, 30 ou 50 m, ninguém atira, briga ou se machuca. Boa pra pontos onde muita gente chega junto.
- **Ajustes** (botão no topo): o webhook do Discord. Cada resposta que entrega alguma coisa vira uma mensagem no canal, com o jogador, o personagem e o que recebeu. O link fica só no servidor (`data/settings.json`).
- **Kit inicial**: o mri_Qnpc faz o que era o mri_Qstarterpack. Na primeira vez que sobe num servidor que tinha o starterpack (ou que ainda não tem nenhum NPC), ele cria o NPC **Kit inicial**, com a resposta **Quero meu kit** já montada: itens, dinheiro, uma BMX com 10 vagas e **Uma vez por conta**. Quem já tinha recebido o kit na tabela `tcd_starterpack` entra em **Quem já recebeu**, então ninguém pega outro. Depois disso é um NPC normal do painel. Tire a pasta do `mri_Qstarterpack` do servidor.
- **Prefeitura**: no lugar do `qbx_cityhall`. Na primeira vez que sobe com o `qbx_idcard` no servidor, o mri_Qnpc cria o NPC **Prefeitura** na praça de Legion com as respostas **Tirar RG**, **Tirar CNH** e **Tirar porte de arma** (R$ 50 cada). Todo documento do `qbx_idcard` (RG, CNH, porte de arma, OAB) entregue por uma resposta sai com os dados do personagem, e a resposta só aparece pra quem tem direito àquele documento (o porte depende da licença de arma liberada). Tire a pasta do `qbx_cityhall` do servidor.
- **Acesso**: limite a interação a empregos ou gangues, escolhidos na lista do servidor, com o cargo mínimo pelo nome.
- **Pastas**: no topo do editor, escolha uma pasta ou digite o nome de uma nova. A lista agrupa por pasta; clique no nome para recolher. O botão ao lado da pasta liga ou desliga todos os NPCs dela de uma vez (útil para evento de fim de semana). NPC desligado some do mundo e continua salvo; o botão **Ligado** do editor faz o mesmo para um NPC só.
- **Comportamento: Pode morrer**: o NPC continua conversando (target, tecla, conversa, cobrança), mas leva tiro e morre. Todos os jogadores veem o mesmo NPC. Quando alguém aponta uma arma para ele ou bate nele, ele **Põe as mãos pra cima** ou **Sai correndo**; passados 15 s sem ameaça, volta ao lugar ou à rota. Morto, some para todos (o corpo some em até 1 minuto) e volta depois do tempo escolhido (ou nunca). A resistência e os tempos são os mesmos presets do guarda. Não dá para usar **Quando aparece** nem **Horário** nele, e objetos de emote não aparecem. Serve para assalto a loja, alvo de missão ou o traficante da esquina.
- **Comportamento: Guarda**: o NPC fica armado no posto (ou faz ronda, se tiver rota), pode morrer e volta depois do tempo escolhido. Todos os jogadores veem o mesmo guarda, a mesma briga e a mesma morte. Escolha a arma (qualquer arma do ox_inventory), quando ataca (**Só se for atacado** ou **Quem chegar perto**), a área de guarda (**Ver no mundo** esconde o painel e desenha a área no chão; Backspace volta), quem ele deixa passar (empregos ou gangues, com cargo mínimo), o aviso antes de atacar (**Ataca na hora**, ou grita, aponta a arma e espera 5 ou 10 s para a pessoa sair; quem sai e volta em menos de 1 minuto não ganha outro aviso), a resistência (vida e colete), a pontaria e o tempo para voltar (ou nunca). Os números por trás de cada escolha (vida e colete de Fraco, Normal e Forte; pontaria; tamanho das áreas; tempos de respawn) ficam em **Ajustar presets**, valem para todos os guardas e são gravados em `data/guard.json`. Vida e colete novos valem para guarda que nascer ou renascer depois de salvar. Quem ataca um guarda vira alvo dos guardas da mesma pasta que estão perto (dentro da área de cada um). Depois da briga ele volta ao posto ou à ronda. O corpo some em até 1 minuto. Guarda não conversa nem tem target, e objetos de emote (prancheta, copo) não aparecem nele.
- **Exportar e importar**: o botão ao lado da busca copia os NPCs (todos ou de uma pasta) como texto. No outro servidor, cole em **Importar**: eles entram como NPCs novos, sem apagar nada. Uma resposta **Liberar NPC** que apontava para um NPC do servidor antigo precisa ser escolhida de novo.
- **Criados por scripts**: abaixo da lista aparecem os NPCs que outros scripts criaram (os dos empregos, por exemplo), com o script dono, o modelo e a primeira fala. Clique num deles para mudar modelo, posição, animação, nome, etiqueta e a forma de interagir (Target ou tecla E). A conversa e as respostas continuam sendo do script. A mudança vale para todos na hora, fica salva no banco e aparece como "editado"; "Voltar ao original" desfaz. O NPC é reconhecido pelo nome dentro do script: se uma atualização do script trocar o nome, a edição deixa de valer.

Salvar aplica na hora para todos os jogadores, sem reconectar.

## Eventos

- Evento no cliente: `TriggerEvent(nome, npcId)`.
- Evento no servidor: o servidor confere se o jogador está a menos de 10 m do NPC e se tem o grupo exigido, e só então chama `TriggerEvent(nome, source, npcId)`.
- Toda resposta que passa pelo servidor (cobra, entrega, tempo, lembrar, evento no servidor, liberar NPC) avisa quando dá certo:

```lua
AddEventHandler('mri_Qnpc:answered', function(src, npcId, nodeId, index) end)
```

- No cliente, quando uma conversa do painel fecha: `AddEventHandler('mri_Qnpc:dialogClosed', function(npcId, nodeId) end)` (`nodeId` é a última fala mostrada).

## Missões por script

Cada NPC com **Quando aparece** tem o próprio marcador, `npc_<id>` (o painel mostra o comando pronto). Cada jogador tem os seus, e eles zeram ao reconectar.

```lua
exports.mri_Qnpc:SetFlag(source, 'npc_12', true)   -- libera o NPC #12 para esse jogador; false desfaz
exports.mri_Qnpc:HasFlag(source, 'npc_12')
exports.mri_Qnpc:GetFlags(source)                  -- { npc_12 = true }
```

No cliente, `exports.mri_Qnpc:SetFlag('npc_12', true)` muda só o que aquele jogador vê; recompensa e evento de servidor devem usar o export do servidor.

A memória de cada NPC (em que fala a conversa começa para o personagem) fica no banco e não zera ao reconectar. Outro script pode mudar a memória quando a missão avança:

```lua
exports.mri_Qnpc:SetStartNode(source, 12, 'n3')   -- a próxima conversa com o NPC #12 começa na fala n3; nil volta ao início
exports.mri_Qnpc:GetStartNode(source, 12)          -- 'n3' ou nil
```

## NPCs criados por script

Outro resource pode criar NPCs completos pelo mri_Qnpc, no mesmo formato do painel (modelo, posição, animação, interação, conversa, rota, guarda). Eles ficam só na memória: somem quando o resource que criou para, e ele cria de novo ao subir. No painel aparecem numa pasta com o nome do resource, só para consulta.

```lua
-- servidor
local id = exports.mri_Qnpc:CreateNpc({
    name = 'Instrutor',
    model = 'cs_hunter',
    coords = vec3(-679.3, 5834.1, 17.3),   -- altura do pé
    heading = 40.0,
    animation = { kind = 'scenario', scenario = 'WORLD_HUMAN_CLIPBOARD' },
    interaction = { mode = 'target', label = 'Falar com o instrutor', distance = 2.0 },
    action = { kind = 'client_event', name = 'meu_script:client:menu' },
})
exports.mri_Qnpc:UpdateNpc(id, { ... })    -- troca tudo; true ou false
exports.mri_Qnpc:RemoveNpc(id)
exports.mri_Qnpc:GetNpc(id)                -- qualquer NPC, do painel ou de script

-- um guarda
exports.mri_Qnpc:CreateNpc({
    name = 'Segurança', model = 's_m_m_highsec_01', coords = vec3(...), heading = 90.0,
    guard = { weapon = 'WEAPON_CARBINERIFLE', attack = 'intruders', area = 'medium', health = 'strong',
              accuracy = 'medium', respawn = 'short', warn = 'short', allow = { police = 0 } },
})
```

Para um NPC que pode morrer, troque `guard` por `killable = { reaction = 'cower', health = 'weak', respawn = 'short' }` (`reaction` `cower | flee`; `health` e `respawn` como no guarda).

Valores do guarda: `weapon` nome da arma do GTA (`WEAPON_PISTOL`; os antigos `pistol | smg | rifle | shotgun | bat | knife` continuam valendo); `attack` `attacked | intruders`; `warn` `none | short | long` (sem aviso, 5 s ou 10 s; só em `intruders`); `area` `small | medium | large`; `health` `weak | normal | strong`; `accuracy` `low | medium | high`; `respawn` `quick | short | medium | long | never`. Os números de cada um vêm dos presets do painel.

Quando um guarda morre, o servidor avisa (para recompensa, polícia ou missão):

```lua
AddEventHandler('mri_Qnpc:guardKilled', function(npcId, killer, info)
    -- killer: source de quem matou (nil se não foi um jogador); info: { name, folder, coords }
end)

-- um NPC com Pode morrer foi morto (mesmos argumentos)
AddEventHandler('mri_Qnpc:npcKilled', function(npcId, killer, info) end)

-- alguém apontou uma arma ou bateu num NPC com Pode morrer (uma vez por ameaça; bom para alerta de assalto)
AddEventHandler('mri_Qnpc:npcThreatened', function(npcId, src, info) end)

-- quando um guarda parte para cima de alguém (por exemplo, para chamar a polícia)
AddEventHandler('mri_Qnpc:guardEngaged', function(npcId, target, reason, info)
    -- reason: 'attacked' (foi atacado), 'intruder' (invadiu a área) ou 'help' (veio ajudar outro guarda da pasta)
end)
```

Para pôr respostas suas na conversa de um NPC do painel (cliente). É assim que o mri_questcreator oferece missões:

```lua
exports.mri_Qnpc:SetExtraTalk(12, {
    answers = {
        { label = 'Tem serviço?', next = 'offer' },
    },
    nodes = {
        { id = 'offer', text = 'Leva essa caixa pro porto.', answers = {
            { label = 'Fechado', onSelect = function() TriggerServerEvent('meu_script:accept') end },
            { label = 'Agora não' },
        } },
    },
})
exports.mri_Qnpc:SetExtraTalk(12, nil)   -- tira as suas respostas
```

As respostas aparecem na primeira fala da conversa do NPC #12, depois das dele, e o formato é o mesmo do `StartTalk`. Um NPC sem conversa abre uma fala curta ("Pois não?") com as suas respostas, a ação dele e "Até mais". Um NPC sem interação ganha a tecla E. Cada resource tem as próprias respostas, que somem quando ele para.

```lua
exports.mri_Qnpc:GetNpcPed(12)      -- cliente: o ped do NPC #12 perto do jogador, ou nil
exports.mri_Qnpc:GetNpcByPed(ped)   -- cliente: o NPC daquele ped, ou nil
exports.mri_Qnpc:ListNpcs()         -- servidor: todos os NPCs em forma curta (id, nome, modelo, pasta, tipo, quando aparece, falas)
```

Para abrir a conversa do mri_Qnpc num ped que o seu script já controla (cliente):

```lua
exports.mri_Qnpc:StartTalk(ped, {
    name = 'Seu Zé', tag = 'Transportador',
    nodes = {
        { id = 'start', text = 'Bom dia! Procurando trabalho?', answers = {
            { label = 'Quero trabalhar', next = 'job' },
            { label = 'Até mais' },                                   -- sem next nem onSelect: só fecha
        } },
        { id = 'job', text = 'Pega o caminhão ali atrás.', answers = {
            { label = 'Começar', onSelect = function() TriggerServerEvent('meu_script:start') end },
            { label = 'Ver de novo', close = false, onSelect = function() print('fica aberto') end },
        } },
    },
    onClose = function() end,
})
exports.mri_Qnpc:CloseTalk()
```

`StartTalk` devolve `false` se já houver uma conversa aberta. Resposta com `next` vai para outra fala; as outras rodam `onSelect` e fecham, a menos que tenham `close = false`.

## Substitui o rep-talkNPC

O mri_Qnpc faz o papel do `rep-talkNPC` (`provide 'rep-talkNPC'`). Scripts que chamam `exports['rep-talkNPC']:CreateNPC`, `changeDialog`, `updateMessage` ou o evento `rep-talkNPC:client:close` continuam funcionando sem mudar nada, agora com a conversa do mri_Qnpc (câmera no rosto, texto digitado, `**negrito**`).

Ao instalar, **apague a pasta `rep-talkNPC`**: os dois juntos disputam o mesmo nome.

## Dependências

- Obrigatórias: `ox_lib`, `oxmysql`, `qbx_core`.
- Opcionais: `rpemotes-reborn` (lista de emotes), `ox_target` (target; sem ele a interação vira tecla E), `mri_Qadmin` (aba no painel) e `mri_Qappearance` (presets de ped; sem ele os presets salvos continuam na lista, mas os NPCs aparecem com a roupa padrão).

## Licença

O código deste recurso é MIT com Commons Clause: pode usar, modificar e redistribuir à vontade, mas não pode vender, nem a versão original nem uma modificada. Texto completo em [LICENSE](LICENSE).
