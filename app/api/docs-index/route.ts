import { buildDocsIndex } from "@/lib/docs-index"

// Built once at build time (static on Vercel and in the GitHub Pages export).
export const revalidate = false
export const dynamic = "force-static"

export async function GET() {
  const chunks = await buildDocsIndex()
  return Response.json({ version: 1, generatedAt: new Date().toISOString(), chunks })
}
