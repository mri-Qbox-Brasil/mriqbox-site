import { ImageResponse } from "next/og"

export const dynamic = "force-static"
export const alt = "MRI Qbox Brasil — Framework FiveM Open Source"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#fafafa",
          background: "linear-gradient(135deg, #090b0a 0%, #0b1813 65%, #063326 100%)",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 18, height: 18, borderRadius: 999, background: "#00e699", boxShadow: "0 0 28px #00e699" }} />
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: 4, textTransform: "uppercase" }}>MRI Qbox Brasil</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24, maxWidth: 920 }}>
          <div style={{ fontSize: 72, lineHeight: 1.02, fontWeight: 900, letterSpacing: -3 }}>
            A base FiveM feita para ir além.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: "#a1a1aa" }}>
            Open source. Em português. Construída pela comunidade brasileira.
          </div>
        </div>

        <div style={{ display: "flex", gap: 18, fontSize: 21, color: "#00e699", fontWeight: 700 }}>
          <span>Qbox</span><span>•</span><span>QBCore</span><span>•</span><span>Ox</span><span>•</span><span>FiveM</span>
        </div>
      </div>
    ),
    size,
  )
}
