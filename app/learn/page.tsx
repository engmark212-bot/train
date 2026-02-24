// app/learn/page.tsx
"use client"
import { useState } from "react"
import RoleplayChat from "../../components/RoleplayChat"

export default function LearnPage() {
  const [scenario, setScenario] = useState("Sales Roleplay")
  const [answer, setAnswer] = useState("")

  const submitScenario = async () => {
    const res = await fetch("/api/ai-grade", {
      method: "POST",
      body: JSON.stringify({ scenario, answer, employeeId: "EMPLOYEE_ID", orgId: "ORG_ID" }),
    })
    const data = await res.json()
    console.log("AI Result:", data)
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Training Simulation</h1>
      <RoleplayChat scenario={scenario} answer={answer} setAnswer={setAnswer} submit={submitScenario} />
    </div>
  )
}
