import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"
import pdfParse from "pdf-parse"
import { embedDocument } from "../../../lib/vector"

export async function POST(req: Request) {
  const form = await req.formData()
  const file = form.get("file") as File
  const orgId = form.get("orgId") as string

  const { data, error } = await supabaseAdmin.storage
    .from("documents")
    .upload(`${orgId}/${file.name}`, file.stream())
  if (error) return NextResponse.json({ error }, { status: 500 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const text = (await pdfParse(buffer)).text

  await embedDocument(orgId, text, data.path)
  return NextResponse.json({ success: true, path: data.path })
}
