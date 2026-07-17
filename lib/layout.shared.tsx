import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

// Opções compartilhadas pelo layout dos docs (nav, links). O logo/nav definitivo
// no design do site entra na Fase 5.
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "MRI Qbox Brasil",
    },
    githubUrl: "https://github.com/mri-Qbox-Brasil",
    links: [
      {
        text: "Discord",
        url: "https://discord.mriqbox.com.br",
        external: true,
      },
    ],
  }
}
