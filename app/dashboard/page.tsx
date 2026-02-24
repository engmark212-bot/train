// app/dashboard/page.tsx
"use client"
import { useEffect, useState } from "react"
import { supabaseClient } from "../../lib/supabaseClient"

export default function OwnerDashboard() {
  const [org, setOrg] = useState<any>(null)

  useEffect(() => {
    fetchOrg()
  }, [])

  const fetchOrg = async () => {
    const { data: profile } = await supabaseClient.from("profiles").select("*").single()
    if (profile?.org_id) {
      const { data: orgData } = await supabaseClient
        .from("organizations")
        .select("*")
        .eq("id", profile.org_id)
        .single()
      setOrg(orgData)
    }
  }

  if (!org) return <p>Loading...</p>

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{org.name} Dashboard</h1>
      <p>Status: {org.status}</p>
      <p>Last Payment: {org.last_payment_date || "N/A"}</p>
      <p>Invoice #: {org.invoice_number || "N/A"}</p>
    </div>
  )
}
