// app/api/admin-toggle-org/route.ts
import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"

export async function POST(req: Request) {
  const { orgId, status } = await req.json()
  const { data, error } = await supabaseAdmin
    .from("organizations")
    .update({ status })
    .eq("id", orgId)
  if (error) return NextResponse.json({ error }, { status: 500 })
  return NextResponse.json({ success: true, data })
}
