// app/admin/page.tsx
"use client"
import { useEffect, useState } from "react"
import { supabaseClient } from "../../lib/supabaseClient"
import StatCard from "../../components/StatCard"

export default function AdminDashboard() {
  const [orgs, setOrgs] = useState<any[]>([])

  useEffect(() => {
    fetchOrgs()
  }, [])

  const fetchOrgs = async () => {
    const { data } = await supabaseClient.from("organizations").select("*")
    setOrgs(data || [])
  }

  const toggleStatus = async (id: string, status: string) => {
    await supabaseClient.from("organizations").update({ status }).eq("id", id)
    fetchOrgs()
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Command Center</h1>
      <div className="grid grid-cols-3 gap-4">
        {orgs.map((org) => (
          <StatCard
            key={org.id}
            title={org.name}
            value={org.status}
            action={
              org.status === "active"
                ? () => toggleStatus(org.id, "inactive")
                : () => toggleStatus(org.id, "active")
            }
            actionLabel={org.status === "active" ? "Deactivate" : "Activate"}
          />
        ))}
      </div>
    </div>
  )
}
