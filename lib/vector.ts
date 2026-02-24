import OpenAI from "openai"
import { supabaseAdmin } from "./supabaseAdmin"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function embedDocument(orgId: string, text: string, fileName: string) {
  const embedding = await openai.embeddings.create({
    model: "text-embedding-3-large",
    input: text
  })

  const { data, error } = await supabaseAdmin.from("documents").insert({
    org_id: orgId,
    file_url: fileName,
    vector_id: JSON.stringify(embedding.data[0].embedding)
  })

  if (error) throw error
  return data
}

export async function getOrgDocuments(orgId: string) {
  const { data, error } = await supabaseAdmin
    .from("documents")
    .select("*")
    .eq("org_id", orgId)

  if (error) throw error
  return data
}
