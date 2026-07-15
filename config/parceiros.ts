/**
 * ╔══════════════════════════════════════════════════════════╗
 * ║            CONFIGURAÇÃO DE PARCEIROS - MRI Qbox          ║
 * ╠══════════════════════════════════════════════════════════╣
 * ║  Para adicionar um novo parceiro:                        ║
 * ║  1. Coloque a logo em: public/parceiros/nome.png         ║
 * ║  2. Adicione uma entrada no array abaixo                 ║
 * ╚══════════════════════════════════════════════════════════╝
 */

export interface Parceiro {
  /** Nome do parceiro (exibido como alt e tooltip) */
  name: string
  /**
   * Caminho da logo relativo à pasta /public
   * Exemplo: "/parceiros/fivem.png"
   */
  logo: string
  /** URL do site do parceiro — abre em nova aba ao clicar */
  url: string
}

const parceiros: Parceiro[] = [
  {
    name: "Central Cart",
    logo: "/parceiros/centralcart.webp",
    url: "https://www.centralcart.com/fivem",
  },
  {
    name: "New Age",
    logo: "/parceiros/newage.webp",
    url: "https://www.newageoficial.com/",
  },
  {
    name: "Wyze Host",
    logo: "/parceiros/wyzehost.webp",
    url: "https://www.wyzehost.com.br/",
  },
  {
    name: "Aprendiz FiveM",
    logo: "/parceiros/aprendizfivem.webp",
    url: "https://cursofivem.com.br/",
  },
  {
    name: "HaviHost",
    logo: "/parceiros/havichost.webp",
    url: "https://financeiro.havichostbrasil.com/aff.php?aff=93",
  },
]

export default parceiros
