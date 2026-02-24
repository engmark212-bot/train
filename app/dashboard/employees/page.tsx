"use client"
import { useState } from "react"
import { supabaseClient } from "../../../lib/supabaseClient"

export default function EmployeeInvite() {
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const generateInvite = async () => {
    if(!email.endsWith("@company.com")){
      setMessage("Email must match company domain")
      return
    }
    const { data, error } = await supabaseClient
      .from("profiles")
      .insert({ email, role: "employee", org_id: "ORG_ID_HERE", is_verified: false })
    if(error) setMessage("Failed to create invite")
    else setMessage("Invite created. Employee can now sign up.")
  }

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2">Invite Employee</h2>
      <input
        type="email"
        placeholder="employee@company.com"
        value={email}
        onChange={e=>setEmail(e.target.value)}
        className="border p-2 rounded mr-2"
      />
      <button onClick={generateInvite} className="bg-blue-600 text-white p-2 rounded">Invite</button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  )
}
