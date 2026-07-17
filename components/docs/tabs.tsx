import type { ComponentProps } from "react"
import { Tabs as FdTabs, Tab } from "fumadocs-ui/components/tabs"

// O Nextra usa <Tabs items={[...]}><Tabs.Tab>...</Tabs.Tab></Tabs>. O Fumadocs
// expõe Tab como componente separado; aqui reexpomos como Tabs.Tab para o MDX
// migrado (pares Lua/JS) continuar funcionando.
export const Tabs = Object.assign(
  function Tabs(props: ComponentProps<typeof FdTabs>) {
    return <FdTabs {...props} />
  },
  { Tab },
)

export { Tab }
