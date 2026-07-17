---
title: 🎮 Keybinds no FiveM
---

No **FiveM**, as *keybinds* (atalhos de teclado) permitem que você configure quais teclas executam determinadas ações em scripts ou recursos.
Isso garante que cada jogador possa personalizar os controles de acordo com a própria preferência.

---

## 🔑 Onde configurar as Keybinds?

1. Abra o **menu de configurações do FiveM**:

   * Pressione **ESC** → vá até **Configurações**.

2. Acesse a aba:

   * **Teclado**, depois **FiveM** (pode variar de acordo com o idioma do seu jogo).

3. Procure o nome do script:

   * Scripts que usam `RegisterKeyMapping` aparecem nessa lista automaticamente.
   * O nome exibido será definido pelo próprio script.

4. Selecione a ação e escolha a tecla desejada:

   * Clique no atalho → pressione a tecla que você quer usar → confirme.

---

## 🛠️ Como os scripts definem Keybinds?

Os desenvolvedores podem usar o evento **`RegisterKeyMapping`** para registrar uma *keybind*.
Exemplo simples em Lua:

```lua
-- Adiciona um comando /anim e vincula à tecla F3
RegisterCommand('anim', function()
    print("Executou a animação!")
end)

RegisterKeyMapping('anim', 'Executar animação', 'keyboard', 'F3')
```

Também pode ser feito usando `ox_lib`:

```lua
lib.addKeybind({
    name = 'anim',
    description = 'Executar animação',
    defaultKey = 'F3',
    onPressed = function()
        print("Executou a animação!")
    end
})
```

📌 Explicação:

* `'anim'`: comando que será chamado.
* `'Executar animação'`: descrição que aparece no menu de Keybinds.
* `'keyboard'`: tipo de entrada (`keyboard`, `pad_axis`, `mouse_button`, etc.).
* `'F3'`: tecla padrão definida (o usuário pode mudar depois no menu).

---

## 📂 Onde as alterações são salvas?

As configurações de teclas ficam salvas no seu **perfil do FiveM**, localizado em:

* Windows:

  ```
  %appdata%\CitizenFX
  ```

Isso significa que **mesmo que você entre em outros servidores**, suas keybinds personalizadas continuarão funcionando.

---

## 🧩 Resumo

* As *keybinds* servem para personalizar atalhos de scripts.
* Você pode alterá-las no menu **Configurações → Teclado → FiveM**.
* Os scripts que usam `RegisterKeyMapping` ou `ox_lib` aparecem automaticamente lá.
* Cada jogador pode definir suas próprias teclas sem precisar editar arquivos.
* Mesmo alterando no script, se ele já foi executado uma vez, não irá mudar para quem já jogou, será necessário cada um alterar manualmente. Para novos jogadores, vai ficar correto.