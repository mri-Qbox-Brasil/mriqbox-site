import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "MRI Qbox Brasil",
    short_name: "MRI Qbox",
    description: "Framework FiveM open source, gratuita e em português para servidores brasileiros.",
    start_url: "/",
    display: "standalone",
    background_color: "#09090b",
    theme_color: "#00e699",
    lang: "pt-BR",
    icons: [
      { src: "/icon.png", sizes: "460x460", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  }
}
