import Image from "next/image"
import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared"

// Opções compartilhadas pelo layout dos docs.
//
// A doc roda no Fumadocs e o resto do site tem a navbar própria (pill), então
// o header muda de forma ao cruzar /docs. Para o usuário continuar no mesmo
// produto, o nav dos docs repete a identidade do site (logo + wordmark) e os
// mesmos destinos principais da navbar/footer.
export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2">
          <Image
            src="https://assets.mriqbox.com.br/branding/logo96.png"
            alt="MRI Qbox Brasil"
            width={22}
            height={22}
            className="object-contain"
          />
          <span className="font-semibold text-sm tracking-widest uppercase">MRI Qbox</span>
        </span>
      ),
      url: "/",
    },
    githubUrl: "https://github.com/mri-Qbox-Brasil",
    links: [
      { text: "Artifacts DB", url: "/comecar" },
      { text: "Saber Mais", url: "/sobre" },
      { text: "Compartilhar Tela", url: "https://tela.mriqbox.com.br", external: true },
      { text: "Discord", url: "/discord" },
    ],
  }
}
