---
title: "MRI Qbanking (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Banco da cidade. O jogador abre o banco no balcão de uma agência ou usa um caixa eletrônico; ali vê a conta pessoal, as contas da empresa e da gangue (quando o cargo dele pode mexer no dinheiro) e as contas compartilhadas, deposita, saca, transfere, paga faturas e lê o extrato. O admin marca as agências no mundo, mexe no saldo de qualquer conta e ajusta o banco num painel que também vira aba no mri_Qadmin.

Substitui o `ps-banking` e responde pelos nomes `ps-banking`, `qb-banking`, `qb-management` e `Renewed-Banking`, então os scripts que chamam esses bancos funcionam sem mudança.

## Dependências

| Recurso | Obrigatório | Para quê |
|---|---|---|
| `ox_lib` | Sim | callbacks, locale e notificação |
| `oxmysql` | Sim | tabelas `mri_qbanking_*` |
| `qbx_core` | Sim | dinheiro (`cash` e `bank`), personagem, empregos e gangues |
| `ox_target` | Sim | balcão das agências e caixas eletrônicos (o `mri_Qinteract` atende por ele) |
| `mri_Qadmin` | Não | aba Banco no painel de admin |
| `mri_Qbox` | Não | item "Banco" no Gerenciamento do F10 |

## Instalação

1. Coloque a pasta `mri_Qbanking` em `resources/` e dê `ensure mri_Qbanking` no `server.cfg`.
2. **Tire a pasta do `ps-banking`** (e de `qb-banking`, `qb-management` ou `Renewed-Banking`, se tiver). O `provide` só responde pelos nomes quando o banco antigo não está rodando.
3. As tabelas são criadas sozinhas. Na primeira subida, o banco antigo (`ps_banking_*`) é importado, ver "Vindo do ps-banking".

Ao atualizar, mantenha `data/settings.json` (Ajustes) e `data/branches.json` (agências que você marcou).

## Permissão

O painel de admin e todas as ações dele pedem a ACE `command.banking`. Quem tem `command` liberado (o `group.admin` padrão) já entra:

```
add_ace group.admin command.banking allow
```

## Contas

| Conta | Quem usa | De onde vem o saldo |
|---|---|---|
| Pessoal | o próprio personagem | o `bank` do qbx_core: é o mesmo dinheiro do celular, do salário e das lojas |
| Empresa | quem está no emprego com cargo `bankAuth` ou `isboss` | conta do banco com o nome do emprego (`police`) |
| Gangue | quem está na gangue com cargo `bankAuth` ou `isboss` | conta com o nome da gangue |
| Compartilhada | o titular e as pessoas que ele deu acesso | conta aberta pelo jogador numa agência |

- Toda empresa e gangue do qbx_core ganha conta na subida, e as criadas depois (painel do mri_Qbossmenu, `CreateJobs`) ganham na hora. `unemployed` e `none` não têm conta.
- O acesso à conta da empresa vale pelo cargo **atual**: trocou de emprego ou de cargo, a conta some da lista sem ninguém mexer.
- O número da conta pessoal é o citizenid do personagem. É ele que se passa para receber transferência.

## No balcão

O jogador mira no balcão de uma agência (ox_target "Abrir o banco"). A janela fecha sozinha se ele se afastar.

- **Depositar**: dinheiro da carteira para a conta escolhida.
- **Sacar**: da conta escolhida para a carteira.
- **Transferir**: para uma pessoa (pelo número da conta, o nome aparece antes de enviar), para uma empresa (lista das empresas da cidade) ou para outra conta do próprio jogador. Aceita mensagem, que vai para o extrato dos dois lados. Quem recebe e está online leva uma notificação.
- **Extrato**: as movimentações da conta com busca, quem fez, mensagem e o saldo depois de cada uma. **Resumo**: quanto entrou e saiu em cada um dos últimos 7 dias.
- **Faturas**: as faturas em aberto do personagem, pagas pela conta pessoal, uma a uma ou todas de uma vez.
- **Conta compartilhada**: "Abrir conta compartilhada" pede só o nome (com a taxa e o limite dos Ajustes). Na aba Pessoas o titular dá acesso a quem está no balcão com ele (lista de quem está perto, sem digitar id), tira o acesso, renomeia e encerra a conta. Ao encerrar, o saldo vai para a conta pessoal do titular. Quem só usa pode sair da conta.

## Cartões

Cada personagem tem um cartão de débito para a conta pessoal e um para cada conta compartilhada que usa (titular ou não). O banco emite sozinho, na primeira vez que a pessoa abre o banco ou o caixa, com um número de 16 dígitos só dela. Conta compartilhada que a pessoa deixa de usar leva o cartão junto.

Na tela **Cartões** do balcão o jogador vê os cartões desenhados e, em cada um:

- **Cadastrar senha** ou **Trocar senha**: 4 números, digitados duas vezes. A senha fica guardada com hash (bcrypt, pelo `GetPasswordHash` do servidor), nunca em texto.
- **Bloquear** e **Desbloquear**: cartão perdido não entra no caixa até ser desbloqueado no balcão.

No caixa, cartão com senha pede os 4 números no teclado da máquina. Depois de 3 erros seguidos o cartão bloqueia; cadastrar uma senha nova no balcão desbloqueia. Cartão sem senha entra direto, e o caixa lembra de cadastrar uma. Com **Exigir senha no caixa** ligado nos Ajustes, cartão sem senha não passa.

Contas de empresa e de gangue não têm cartão: são do balcão.

## Caixa eletrônico

Em qualquer ATM do mapa (`prop_atm_01`, `_02`, `_03` e `prop_fleeca_atm`). A câmera sai da vista do jogador e chega perto do caixa, enquadrando a tela, as teclas e a entrada do cartão, e o caixa se usa com o mouse, como um caixa de verdade:

- **Cartão**: a tela pede o cartão e a entrada do cartão pisca; clicando nela, o personagem põe o cartão (animação do caixa com o cartão na mão e o som de cartão). Ao sair, ele retira o cartão do mesmo jeito. Quem tem mais de um cartão escolhe qual nas teclas laterais; a entrada do cartão põe o primeiro que funciona.
- **Senha**: cartão com senha pede os 4 números no teclado do caixa (ver [Cartões](#cartões)).
- **Teclas laterais**: cada opção da tela fica na altura de uma tecla ao lado do vidro; clicar na tecla ou na opção faz o mesmo. A tecla sob o mouse acende e a opção na tela também.
- **Teclado**: os números digitam o valor; CANCEL volta (ou sai, no início), CLEAR apaga e ENTER confirma.
- **Dinheiro**: ao sacar, o contador de notas toca e o maço aparece na mão; ao depositar, a mão leva o maço até o caixa.
- A conta do cartão (pessoal ou compartilhada): saque e depósito com os três valores prontos dos Ajustes ou outro valor no teclado, e saldo com as últimas movimentações. Esc ou Backspace também saem (o cartão sai antes).

A tela é desenhada só no caixa em uso (os outros do mesmo modelo continuam normais). Os cantos do vidro e a posição de cada tecla e da entrada do cartão saíram dos arquivos do jogo, modelo por modelo, sem ajuste no jogo. O `prop_atm_01` não tem teclas laterais: lá as opções se tocam no vidro.

## Cobrar alguém

Com o sd-phone, quem cobra é o **app Serviços** do celular: o funcionário em serviço cobra pelo número do celular ou pelo id, e a pessoa paga na Carteira. Scripts de emprego podem cobrar sozinhos pelo export `CreateBill`.

A cobrança pelo olhinho vem **desligada** e se liga em Ajustes > Cobranças. Ligada, quem está **em serviço** num emprego da lista "Quem cobra" mira em outra pessoa a até 6 metros e escolhe **Cobrar** (ox_target). Na janela vai o valor (até o máximo por fatura dos Ajustes) e o motivo. A fatura chega para a pessoa com o nome da empresa e de quem cobrou (na Carteira do celular, com o sd-phone, ou numa agência sem ele) e o dinheiro cai na conta da empresa. O servidor confere de novo o emprego, o serviço, a distância e o valor, e espera 3 segundos entre uma cobrança e outra.

## Com o sd-phone

A Carteira do sd-phone é o banco no celular (saldo, transferência pelo número do celular, transferência agendada, faturas). O mri_Qbanking se encaixa nela pelo que o sd-phone já oferece, sem nada mudado nele:

- **Faturas de empresa vão para o celular**: a cobrança pelo olhinho e as que outros scripts criam (`CreateBill`) chegam na aba Faturas da Carteira de quem está online, e o pagamento cai na conta da empresa no banco. As que ficaram no banco (pessoa offline, ou vindas do ps-banking) passam para o celular quando a pessoa entra. Fatura de pessoa para pessoa continua no balcão.
- **Extrato no celular**: o que o banco faz (balcão, caixa eletrônico, transferências, faturas pagas, salário) aparece também na lista da Carteira.
- **Impostos valem no celular**: transferência pela Carteira paga o imposto de transferência, e fatura de empresa paga pelo celular paga o de fatura, os dois para o cofre do governo.
- **Número do celular no balcão**: a transferência aceita o número da conta ou o número do celular de quem vai receber.

Sem o sd-phone tudo continua no banco, como antes.

## Impostos

Desligados por padrão. Cada um vai de 0 a 10% nos Ajustes:

| Imposto | Sai de |
|---|---|
| Transferência | o que chega no destino (para outra pessoa ou empresa) |
| Fatura paga | o que a empresa (ou a pessoa) recebe |
| Depósito | o que entra na conta |
| Saque | o que vai para a carteira |

- Entre contas da mesma pessoa (pessoal, compartilhada dela, conta da empresa dela) não há imposto.
- **Empregos isentos**: quem trabalha neles não paga, e as faturas dessas empresas também não.
- **Cofre do governo**: uma conta de empresa (a Prefeitura, por exemplo) que recebe os impostos, com uma linha no extrato para cada um. Sem cofre, o imposto sai de circulação.
- A janela mostra o imposto e quanto chega antes de o jogador confirmar, e o extrato mostra o valor do imposto na linha.

## Painel de admin

F10 > Gerenciamento > Banco (com o mri_Qbox) ou a aba Banco no mri_Qadmin.

- **Economia**: dinheiro dos personagens (banco e carteira), dinheiro nas contas, impostos dos últimos 30 dias, faturas em aberto, média e mediana por personagem, faixas de riqueza, os 10 mais ricos e o gráfico do dinheiro na cidade nos últimos 30 dias. Personagens offline entram com o dinheiro do último salvamento. Saldo negativo ou acima de R$ 100 milhões fica de fora dos números e aparece em **Saldos suspeitos** para conferir.
- **Agências**: lista, mapa e editor. "Nova agência" já vem com nome; ela só passa a existir depois de "Marcar no mundo" (mira no balcão e aperta E ou clica). No mapa dá para arrastar o pino. Cada agência tem nome, "Aparece no mapa" e "Ir até lá". A lista que vem com o resource tem as 8 agências do jogo (Fleeca, Pacific Standard e Blaine County).
- **Contas**: todas as contas da cidade com filtro e busca, o extrato e o resumo de cada uma. Em Gerenciar, **Congelar conta**, e "Pôr dinheiro" e "Tirar dinheiro" com motivo, que fica no extrato com o nome do admin. Conta compartilhada mostra quem usa e pode ser encerrada.
- **Faturas**: todas as faturas em aberto da cidade, com busca. Dá para mudar valor e motivo, apagar uma, marcar várias e apagar de uma vez, ou perdoar todas de uma pessoa.
- **Registro**: tudo o que a administração fez no banco (ajuste de saldo, conta encerrada ou congelada, fatura mudada, apagada ou perdoada, agência e ajustes), com o nome do admin e a hora.
- **Ajustes**: valem na hora para todos.

### Conta congelada

Recebe dinheiro (depósito, transferência, fatura paga), mas não deixa sacar, transferir nem encerrar. Scripts que tiram dinheiro dela pelos exports (salário pago pela empresa, por exemplo) também recebem `false`. O ajuste do admin continua tirando. Quem usa a conta vê o aviso "Congelada" no banco.

## Ajustes

| Opção | Escolhas | Padrão |
|---|---|---|
| Agências no mapa | ligado ou desligado | ligado |
| Nome no mapa | texto | Banco |
| Valores prontos do caixa | Baixos (100, 500, 1.000), Médios (500, 2.000, 5.000), Altos (2.000, 5.000, 10.000) | Médios |
| Exigir senha no caixa | ligado ou desligado | desligado |
| Jogadores podem abrir conta compartilhada | ligado ou desligado | ligado |
| Contas compartilhadas por pessoa | 1, 2, 3 ou 5 | 2 |
| Taxa de abertura | sem taxa, 500, 1.000 ou 5.000 | sem taxa |
| Guardar extrato por | 30, 90 ou 180 dias, ou sempre | 90 dias |
| Imposto de transferência, fatura, depósito e saque | sem, 1, 2, 5 ou 10% | sem |
| Cofre do governo | nenhum ou uma conta de empresa | nenhum |
| Empregos isentos | lista dos empregos | nenhum |
| Empregos podem cobrar | ligado ou desligado | desligado |
| Quem cobra | lista dos empregos | Polícia, Hospital, Mecânica |
| Valor máximo por fatura | 1.000, 5.000, 10.000, 50.000 ou sem limite | 10.000 |
| Foto da economia | 30 min, 1 h ou 3 h | 1 h |

## Segurança

Tudo é conferido no servidor: se o jogador está no balcão de uma agência, se a conta é dele (ou do emprego e cargo dele), se tem saldo e se o valor é um número inteiro positivo. O caixa eletrônico só mexe na conta do cartão que entrou, depois da senha conferida no servidor. O histórico vem do servidor (das operações do banco e do evento `QBCore:Server:OnMoneyChange`), nunca do cliente.

## Vindo do ps-banking

Na primeira subida (marca `legacy_import` na tabela `mri_qbanking_meta`), sem apagar as tabelas antigas:

- Conta com nome de emprego ou gangue vira a conta da empresa ou gangue, com o mesmo saldo.
- As outras contas viram compartilhadas, com o mesmo titular e as mesmas pessoas. Conta sem titular e com saldo fica de fora e aparece um aviso no console.
- O histórico vem junto: o de conta de empresa vai para o extrato da empresa, o resto para o extrato pessoal de quem fez.
- Faturas em aberto vêm com quem paga, quem recebe e o valor.

O que muda em relação ao ps-banking:

- O acesso à conta da empresa é pelo cargo atual (`bankAuth`/`isboss`), não por uma lista de pessoas gravada na conta.
- Sem framework ESX e sem lb-phone: o banco é do Qbox.
- Taxa e limite de contas compartilhadas, agências e valores do caixa saem do `config.lua` e vão para o painel.

## Para outros recursos

Exports de servidor:

```lua
exports.mri_Qbanking:GetAccountBalance('police')                 -- saldo, 0 se não existe
exports.mri_Qbanking:AddAccountMoney('police', 5000, 'Multa paga')
exports.mri_Qbanking:RemoveAccountMoney('police', 5000, 'Compra') -- false sem saldo
exports.mri_Qbanking:GetAccount('police')                        -- id, holder, label, balance, users...
exports.mri_Qbanking:CreateGroupAccount('mechanic')              -- conta de emprego ou gangue
exports.mri_Qbanking:CreateSharedAccount(source, 'Família', 0)   -- id da conta nova
exports.mri_Qbanking:AddStatement('police', 500, true, 'Título') -- linha no extrato sem mover dinheiro (conta ou citizenid)
exports.mri_Qbanking:GetStatements('police')                     -- formato do Renewed-Banking
exports.mri_Qbanking:CreateBill({ citizenid = 'ABC123', title = 'Conserto', amount = 1500, account = 'mechanic' })
```

Na fatura, quem recebe é `account` (uma conta do banco) ou `recipient` (citizenid de quem recebe na conta pessoal). Quem paga leva notificação na hora se estiver online.

Pelos nomes antigos (o `provide` do manifest):

| Nome | Exports |
|---|---|
| `Renewed-Banking` | `getAccountMoney`, `addAccountMoney`, `removeAccountMoney`, `CreateJobAccount`, `handleTransaction`, `getAccountTransactions` |
| `qb-banking` | `AddMoney`, `RemoveMoney`, `GetAccount`, `GetAccountBalance`, `CreateJobAccount`, `CreateGangAccount`, `CreatePlayerAccount`, `CreateBankStatement`, `AddUserToAccountByHolder`, `RemoveUserFromAccountByHolder` |
| `qb-management` | `GetAccount` (saldo), `GetGangAccount`, `AddMoney`, `RemoveMoney`, `AddGangMoney`, `RemoveGangMoney` |
| `ps-banking` | os mesmos do qb-banking, mais `GetAccountById`, `GetAccountByHolder` e `createBill` |

Evento de servidor quando o saldo de uma conta muda: `mri_Qbanking:server:accountChanged` (nome, saldo, id).

## Licença

O código deste recurso é MIT com Commons Clause: pode usar, modificar e redistribuir à vontade, mas não pode vender, nem a versão original nem uma modificada. Texto completo em [LICENSE](LICENSE).
