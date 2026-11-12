---
title: "MRI Qmapeditor (beta)"
---

> **Beta:** este resource está só na receita beta da MRI e ainda não faz parte da receita regular. Pode mudar sem aviso.

Spawner de objetos sincronizados: admins colocam props no mundo com preview e gizmo, organizados em projetos (cenas), e tudo é persistido no banco e replicado para todos os jogadores. A gestão é feita por uma **NUI moderna (React + `@mriqbox/ui-kit`)**, aberta pelo comando `/mapeditor` ou embutida como **plugin do `mri_Qadmin`**.

---

## Sumário

1. [Dependências](#dependências)
2. [Instalação](#instalação)
3. [Permissões (ACE)](#permissões-ace)
4. [Configuração](#configuração)
5. [Comandos](#comandos)
6. [Fluxo de uso](#fluxo-de-uso)
7. [Integração com o mri_Qadmin (plugin)](#integração-com-o-mri_qadmin-plugin)
8. [Banco de dados](#banco-de-dados)
9. [Renderização e streaming](#renderização-e-streaming)
10. [Entrypoints para outros recursos](#entrypoints-para-outros-recursos)
11. [Estrutura de arquivos](#estrutura-de-arquivos)
12. [Desenvolvimento (web)](#desenvolvimento-web)

---

## Dependências

| Recurso | Obrigatório | Observação |
|---|---|---|
| `ox_lib` | Sim | `lib.callback`, `lib.notify`, `lib.showTextUI`, `lib.raycast.cam`, `lib.addCommand`, `lib.addKeybind`, `lib.disableControls`, locale |
| `oxmysql` | Sim | Persistência dos objetos e das cenas |
| `qbx_core` | Sim | O client escuta `QBCore:Client:OnPlayerLoaded`/`OnPlayerUnload` para carregar e limpar os objetos |
| `mri_Qadmin` | Não | Quando presente, o painel aparece como plugin dentro do admin. Sem ele, o painel segue acessível via `/mapeditor` |

> O gizmo de edição é **próprio** (`client/lib/gizmo.lua`: `DrawGizmo` nativo do engine, portado do mri_mechanic). Não depende mais de `object_gizmo` nem de `fivem-freecam`.

---

## Instalação

1. Copie a pasta `mri_Qmapeditor` para `resources/`.
2. Adicione ao `server.cfg`:
   ```
   ensure mri_Qmapeditor
   ```
3. As tabelas são criadas automaticamente no `onResourceStart` (`CREATE TABLE IF NOT EXISTS`). O arquivo `sql.sql` contém o mesmo schema, caso prefira importar manualmente.
4. Vindo do `mri_Qobjects`: pare e remova o `mri_Qobjects` antes de ligar este. Na primeira vez que liga, com as tabelas novas vazias, o editor copia os projetos, props, props do mapa ocultos, luzes e prefabs das tabelas `synced_*` (mesmos ids). As tabelas antigas ficam intactas.

> A pasta `html/` já vem com a NUI buildada. Só é preciso rebuildar (`web/`) se você editar o front-end: veja [Desenvolvimento (web)](#desenvolvimento-web).

---

## Permissões (ACE)

Uma permissão só cobre tudo (abrir o painel, o plugin do mri_Qadmin e cada ação no servidor): a ACE `command.mapeditor`.

```
add_ace group.admin command allow   # já vem no permissions.cfg do Qbox
```

- O comando é registrado com `restricted = 'group.admin'` (`lib.addCommand`).
- O plugin do mri_Qadmin pede a mesma ACE em `requiredPerms`: um cargo do Qadmin com `command.mapeditor` vê o plugin e consegue usar.
- Todos os eventos e callbacks de mutação do servidor checam `IsPlayerAceAllowed(src, 'command.mapeditor')`. Quem não tem recebe um aviso e a ação é abortada.

O único callback sem gate é `objects:getAllObjects`: chamado por todo jogador ao logar para receber a lista de objetos a renderizar.

---

## Configuração

Arquivo `shared/config.lua`.

| Campo | Tipo | Descrição |
|---|---|---|
| `Config.imgSrv` | string | URL base das miniaturas dos props exibidas no painel. A imagem é montada como `Config.imgSrv .. <model> .. '.webp'`. Padrão: `https://mri-qbox-brasil.github.io/mri-assets/assets/` |
| `Config.Debug` | bool | Liga os avisos de diagnóstico da borracha e do pincel no F8 |

Cor de destaque e cor de fundo do painel vêm das convars da suíte MRI (`mri:color`, `mri:backgroundColor`) e atualizam em runtime.

---

## Comandos

| Comando | Permissão | Descrição |
|---|---|---|
| `/mapeditor` | `group.admin` | Abre o editor de mapa |

> O antigo `/objectdelete <id>` foi **removido**. A exclusão é feita pelo próprio painel (botão de lixeira no objeto) ou, se necessário, via evento de servidor `objects:server:removeObject`.

---

## Fluxo de uso

O spawner organiza os objetos em **projetos** (cenas). Um objeto sempre pertence a um projeto.

1. `/mapeditor` abre o painel em três colunas: projetos à esquerda, mapa no meio e o projeto escolhido à direita.
2. O botão **+** da lista cria um projeto; o nome se edita no topo da coluna da direita.
3. A coluna da direita tem as abas **Objetos**, **Ocultos** (props do mapa apagados) e **Luzes**. O mapa mostra tudo do projeto com um pino por item; clicar num pino seleciona e abre o cartão com **Ir até lá**.
4. **Adicionar objeto** entra no modo construção com o catálogo aberto. Prop de mod que não está no catálogo: digite o nome na busca e use **Colocar "nome"**.
5. Ao salvar, o objeto é gravado no banco, replicado para todos os clientes, e o painel reabre no projeto.

### Ações sobre um objeto

| Ação | Efeito |
|---|---|
| Editar | Fecha o painel e abre a edit cam voadora + **gizmo nativo interno** para reposicionar/rotacionar (mouse mexe o eixo, WASD voa, botão direito olha; `R` gira/move, `Q` local/mundo, `ENTER` salva, `BACK` cancela). Ao salvar, a nova pose é propagada; o painel reabre |
| Duplicar | Entra no modo construção com uma cópia do modelo seguindo a mira; `E` coloca |
| Ir até lá | Move o admin até as coordenadas do objeto (pelo cartão do mapa) |
| Excluir | Pede confirmação na própria linha e remove do banco e do mundo de todos (sem sair do painel) |
| Fixo no lugar | Chave na linha do objeto. Ligada (padrão), o prop não se mexe. Desligada, o prop fica **solto**: tem física, então porta e portão abrem e o `mri_Qdoorlock` consegue trancar (marque a porta pelo Qdoorlock como faria com uma porta do mapa). Portas e portões (modelo com `door` ou `gate` no nome) já nascem soltos. Cada jogador vê a física do seu lado, porque o prop é local |

### Ações sobre um projeto

| Ação | Efeito |
|---|---|
| Renomear | Campo de nome no topo da coluna da direita |
| Ligar e desligar | Chave na linha do projeto. Desligado, nada dele aparece na cidade (props, luzes, e os props do mapa apagados voltam), sem perder nada no banco. Ligar devolve tudo na hora, para todos. Abrir o modo construção, adicionar, editar ou duplicar num projeto desligado liga ele antes |
| Excluir projeto | Só fica habilitado quando o projeto está vazio: exclua todos os objetos antes |

### Modo debug

O interruptor **Mostrar IDs no mundo** no topo do painel desenha, num raio de 10 metros, o ID de cada objeto em texto 3D e aplica um contorno azul na entidade. É um toggle e não depende de config.

---

## Build Mode

O **Build Mode** é o editor imersivo (câmera voadora + HUD "viewfinder" flutuante sobre o mundo, sem painel dominando a tela). Entra pelo botão **Build Mode** de um projeto (no launcher `/mapeditor`). Todo o trabalho de objetos acontece in-world; a NUI é só um HUD-overlay (não rouba foco, exceto o catálogo).

**Três modos:**

| Modo | O que faz |
|---|---|
| **Explorar** | Voa e inspeciona. Mira num prop da cena → destaca; `E` seleciona |
| **Posicionando** | Um fantasma segue a mira; `E`/clique coloca (fica no modo pra colocar em série) |
| **Ajustando** | Gizmo nativo interno na entidade selecionada (`ENTER` do modo Explorar) |

**Controles:**

| Contexto | Tecla | Ação |
|---|---|---|
| Sempre | `WASD` / `SPACE`·`CTRL` / `SHIFT` | Voar / subir·descer / rápido |
| Sempre | `MOUSE` | Olhar |
| Sempre | `TAB` | Abrir/fechar catálogo |
| Sempre | `F` | Sair do Build Mode |
| Explorar | `E` / clique | Selecionar prop sob a mira |
| Selecionado | `ENTER` | Ajustar (gizmo) · `C` duplicar · `DEL` excluir · `ESC` desselecionar |
| Posicionando | `◄`·`►` / scroll | Girar · `G` 90° · `Z` no chão/na superfície · `E` colocar · `ESC` parar |
| Ajustando (gizmo) | `MOUSE ESQ` arrasta eixo · `R` girar/mover · `Q` local/mundo · `MOUSE DIR` gira câmera · `ENTER` salva · `BACK` cancela |

**Catálogo e ferramentas (`TAB`):** dois painéis nas laterais, com o mundo livre no meio.

- **Direita, catálogo:** busca, categorias (Recentes, Props, Interiores, Heists, Negócios, Diversos) e grade de miniaturas, lida de `data/objects.json` (~14,8k modelos). Miniaturas do `Config.imgSrv` (webp) e, pros ~1946 props cobertos, do `gtahash.ru` (`data/imagemap.json`); sem nenhuma, um ícone. Passar o mouse num prop mostra a **prévia 3D girando** no meio do espaço livre (luz da prévia no botão do topo).
- **Clique** pega o prop: ele segue a mira (scroll gira, `G` gira 90°, `Z` alterna chão e superfície), `E` ou clique coloca e os painéis voltam; `ESC` cancela. O gizmo fica pro ajuste fino depois: mira no prop e `E`. Com **Vários seguidos** ligado, `E` coloca quantos quiser e `ESC` termina (Shift+clique faz o mesmo sem ligar a chave).
- **Recentes** guarda os últimos 24 props colocados, por jogador (no navegador do jogo).
- Prop fora do catálogo (mod): a busca sem resultado oferece **Colocar "nome"**, que valida o modelo antes.
- **Esquerda, ferramentas:** câmera, seleção, edição, mundo e dados. A ferramenta abre as opções no próprio painel; Pincel e Substituir escolhem o prop clicando no catálogo.
- Ação no mundo esconde os painéis e, quando termina ou é cancelada, **eles voltam como estavam** (busca, categoria, ferramenta aberta).

**HUD:** nada no topo da tela (lá costuma ficar a logo do servidor). Na base, uma barra só com o projeto, a contagem de props e as teclas que fazem algo naquele momento: ajustar (E), duplicar (C) e excluir (DEL) só aparecem com a mira num prop do projeto; sem nada na mira, uma linha acima diz o que fazer. Projeto vazio abre o catálogo direto ao entrar. Holo-tag de telemetria segue o prop na mira (nome + XYZ/rotação ao vivo) e um pulso de "materialização" marca cada prop colocado. Accent temável via `mri:color`.

---


### Props do mapa

No modo construção, mirar num prop do próprio mapa (não do projeto) contorna ele em âmbar e a barra mostra **Prop do mapa**:

- `E` ou clique: **mover**. O prop do mapa é oculto e uma cópia igual entra no projeto, no mesmo lugar, e já abre no gizmo. Porta e portão entram soltos. `U` desfaz as duas coisas.
- `DEL`: **ocultar**, como a borracha.

Props de outros scripts e entidades de rede não são pegos.

## Integração com o mri_Qadmin (plugin)

Quando `mri_Qadmin` está rodando, o recurso se registra como plugin via `exports['mri_Qadmin']:RegisterPlugin` (id `mapeditor`, ícone `box`), e o painel aparece embutido num iframe (`cfx-nui-mri_Qmapeditor/html/index.html?embedded=1`).

- A NUI detecta o modo pelo query param `?embedded=1` (`useIsEmbedded`) e usa o bridge `postMessage` (`usePluginBridgeGuest`) para receber tema/locale/permissões do host.
- As ações que exigem ir ao mundo (adicionar/editar/duplicar/teleportar) pedem o fechamento do painel do Qadmin (`request-close`) e, ao terminar, reabrem o **painel standalone** do `mri_Qmapeditor` na mesma cena.
- Sem o Qadmin, tudo funciona igual via `/mapeditor`.

O registro é resiliente: thread com deadline de 10 s + re-registro no `onResourceStart` do `mri_Qadmin`. O shape do manifest espelha `web/src/plugin/types.ts`.

---

## Banco de dados

Tabelas com o prefixo `mri_qmapeditor_` (projetos, props, props do mapa ocultos, luzes e prefabs), criadas automaticamente na inicialização. Os projetos do `mri_Qobjects` (`synced_*`) são copiados uma vez, como explicado em [Instalação](#instalação).

```sql
CREATE TABLE `mri_qmapeditor_scenes` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `name` varchar(50) NOT NULL,
    `enabled` tinyint(1) NOT NULL DEFAULT 1,
    PRIMARY KEY (`id`) USING BTREE
);

CREATE TABLE `mri_qmapeditor_objects` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `model` varchar(50) NOT NULL,
    `x` varchar(50) NOT NULL,
    `y` varchar(50) NOT NULL,
    `z` varchar(50) NOT NULL,
    `rx` varchar(50) NOT NULL,
    `ry` varchar(50) NOT NULL,
    `rz` varchar(50) NOT NULL,
    `heading` int(11) NOT NULL,
    `sceneid` int(11) NOT NULL,
    `dynamic` tinyint(1) NOT NULL DEFAULT 0,
    PRIMARY KEY (`id`) USING BTREE,
    CONSTRAINT `FK_mri_qmapeditor_objects_scene` FOREIGN KEY (`sceneid`)
        REFERENCES `mri_qmapeditor_scenes` (`id`) ON UPDATE CASCADE ON DELETE CASCADE
);
```

A foreign key tem `ON DELETE CASCADE`: apagar uma cena apaga seus objetos no banco. Mesmo assim, o painel bloqueia a exclusão de projetos que ainda tenham objetos, para não deixar props órfãos renderizados no mundo até o próximo restart.

---

## Renderização e streaming

Os objetos não são entidades de rede: cada cliente cria a sua própria cópia local.

- No start do recurso, o servidor carrega todos os `mri_qmapeditor_objects` para a tabela global `ServerObjects` e envia para os clientes.
- Ao logar, cada jogador puxa a lista via callback `objects:getAllObjects`. `ClientObjects` guarda **todos** os objetos (o painel lê deste cache); o loop de streaming só cria/deleta o `handle`.
- Um loop no client roda a cada 1200 ms: objetos a menos de 300 metros são criados (`CreateObjectNoOffset`, congelados e não dinâmicos); além disso são deletados. Isso mantém a contagem de entidades baixa em mapas grandes.
- Ao parar o recurso ou ao deslogar o personagem, todas as entidades criadas são removidas.

Alterações feitas pelo painel (criar, mover, excluir) são transmitidas em broadcast (`-1`) e aparecem para todos os jogadores conectados imediatamente, sem restart.

---

## Entrypoints para outros recursos

O recurso não expõe exports. A superfície pública são eventos de rede: todos com gate de ACE `admin` no servidor, exceto onde indicado.

### Criar um objeto

```lua
-- callback: retorna o ID do objeto criado
local insertId = lib.callback.await('objects:server:newObject', 2000, {
    model = 'prop_barrier_work05',
    x = '0.000', y = '0.000', z = '0.000',
    rx = '0.000', ry = '0.000', rz = '0.000',
    heading = 0.0,
    sceneid = 1,
})

-- ou como evento, sem retorno
TriggerServerEvent('objects:server:newObject', data)
```

### Demais eventos de servidor

```lua
TriggerServerEvent('objects:server:updateObject', { insertId = 1, model = 'prop_x', x = '0', y = '0', z = '0', rx = '0', ry = '0', rz = '0' })
TriggerServerEvent('objects:server:removeObject', insertId)
TriggerServerEvent('objects:server:updateSceneName', sceneId, 'Novo nome')
TriggerServerEvent('objects:server:removeScene', sceneId)
```

### Callbacks de leitura

```lua
-- lista de todos os objetos (sem gate de ACE: usado no login de qualquer jogador)
local objects = lib.callback.await('objects:getAllObjects', false)

-- lista de cenas com contagem de objetos (requer ACE admin)
local scenes = lib.callback.await('objects:getAllScenes', 100)

-- cria uma cena e retorna true/false (requer ACE admin)
local ok = lib.callback.await('objects:newScene', 100, 'Nome do projeto')

-- checagem silenciosa de admin (usada pela NUI)
local isAdmin = lib.callback.await('mri_Qmapeditor:server:isAdmin', false)
```

---

## Estrutura de arquivos

```
mri_Qmapeditor/
├── client/
│   ├── main.lua      : comando/launcher, NUI callbacks (painel + build), bridge de tema
│   ├── build.lua     : BUILD MODE: câmera voadora, colocação fantasma, seleção, telemetria
│   ├── object.lua     : debug 3D, streaming (300 m), sync
│   ├── editor.lua    : sessão de edição no mundo (edit cam + gizmo), Editor.editEntity
│   └── lib/
│       └── gizmo.lua : gizmo NATIVO próprio (DrawGizmo), portado do mri_mechanic
├── server/
│   ├── main.lua      : eventos/callbacks de rede, gate de ACE, isAdmin, registro de plugin, convars
│   ├── objects.lua   : regras de CRUD, broadcast, criação das tabelas no boot
│   ├── db.lua        : queries oxmysql
│   └── commands.lua   : /mapeditor
├── shared/
│   └── config.lua    : Config.imgSrv e Config.Debug
├── locales/          : pt-br.json, en.json (consumidos pela NUI e pelo ox_lib)
├── data/
│   ├── objects.json  : lista de props do catálogo (~14,8k, filtrada do DurtyFree/gta-v-data-dumps)
│   └── imagemap.json : nome→pasta do gtahash.ru p/ thumbnails (2092 props, ~1946 batem)
├── web/              : fonte da NUI (React + @mriqbox/ui-kit + Vite): NÃO vai no release
│   └── src/build/    : Build Mode (HUD viewfinder, holo-tag, catálogo, bridge)
├── html/             : NUI buildada (ui_page): gerada por `pnpm build`
├── sql.sql           : schema das tabelas (referência; são criadas automaticamente)
└── fxmanifest.lua
```

---

## Desenvolvimento (web)

A NUI vive em `web/` e builda para `html/` (a pasta servida pelo `ui_page`).

```bash
cd web
pnpm install
pnpm dev      # dev server (browser, com mock data em utils/misc.ts)
pnpm build    # gera ../html/ (rode antes de commitar mudanças de UI)
```

- Estado/tema/locale: `src/hooks/` e `src/plugin/` (bridge com o Qadmin).
- Contrato de plugin: `src/plugin/types.ts` (deve bater 1:1 com `mri_Qadmin/web/src/plugin/types.ts`).
- Textos: `locales/*.json` são lidos em runtime pela NUI (`useLocales`): editar o JSON exige só restart do resource, sem rebuild.
```
