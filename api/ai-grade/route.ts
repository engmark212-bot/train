import { NextResponse } from "next/server"
import OpenAI from "openai"
import { supabaseAdmin } from "../../../lib/supabaseAdmin"
import { getOrgDocuments } from "../../../lib/vector"
import { sendSlackNotification } from "../../../lib/workflow"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

const SYSTEM_PROMPT = `
You are Trainify AI, a corporate trainer & compliance auditor.
Use only the company documents.
Return structured JSON:
{
  "score": number (0-100),
  "strengths": string[],
  "weaknesses": string[],
  "policy_violations": string[],
  "improvement_advice": string,
  "risk_level": "low" | "medium" | "high"
}
`

export async function POST(req: Request) {
  const { scenario, answer, employeeId, orgId } = await req.json()
  const docs = await getOrgDocuments(orgId)
  const context = docs.map(d => d.file_url).join("\n\n")

  const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: `Scenario: ${scenario}\nAnswer: ${answer}\nDocuments: ${context}` }
    ]
  })

  const result = JSON.parse(completion.choices[0].message.content)

  await supabaseAdmin.from("training_sessions").insert({
    employee_id: employeeId,
    score: result.score,
    ai_transcript: result,
    completed_at: new Date()
  })

  await sendSlackNotification(
    process.env.SLACK_WEBHOOK!,
    `Employee ${employeeId} completed module '${scenario}' with score ${result.score}`
  )

  if(result.score < 70){
    await sendSlackNotification(
      process.env.SLACK_WEBHOOK!,
      `⚠️ ALERT: Employee ${employeeId} failed a critical module '${scenario}' (score: ${result.score})`
    )
  }

  return NextResponse.json(result)
}
